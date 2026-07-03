import { createSignal, createEffect, createMemo, For, Show, onMount, onCleanup } from 'solid-js';
import { doc, setDoc, serverTimestamp, collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, cleanPlatform, TMDB_KEY } from '../utils';
import { PersonModal } from './PersonModal';

/* ── Recent Searches Storage ── */
const RECENT_KEY = 'cinelog-recent-searches';
const MAX_RECENT = 8;

const loadRecent = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
  catch { return []; }
};
const saveRecent = (query) => {
  if (!query || query.length < 2) return;
  const recent = loadRecent().filter(r => r.toLowerCase() !== query.toLowerCase());
  recent.unshift(query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
};
const clearRecentStorage = () => {
  localStorage.removeItem(RECENT_KEY);
};

/* ── Quick Suggestions ── */
const QUICK_SUGGESTIONS = [
  'Marvel', 'Christopher Nolan', 'Anime', 'K-Drama',
  'Sci-Fi', 'Horror', 'Oscar Winners', 'Studio Ghibli',
  'Shah Rukh Khan', 'Breaking Bad'
];

export function SearchModal(props) {
  const [q, setQ] = createSignal(props.initialQuery || '');
  const [results, setResults] = createSignal([]);
  const [searching, setSearching] = createSignal(false);
  const [personId, setPersonId] = createSignal(null);
  const [recentSearches, setRecentSearches] = createSignal(loadRecent());
  const [highlightedIdx, setHighlightedIdx] = createSignal(-1);

  let inputRef = null;

  onMount(() => {
    document.body.style.overflow = 'hidden';
    if (inputRef) inputRef.focus();
  });
  onCleanup(() => { document.body.style.overflow = ''; });

  /* ── Fuzzy Match (Did You Mean) ── */
  const editDistance = (a, b) => {
    const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return dp[a.length][b.length];
  };

  const didYouMean = () => {
    const query = q().toLowerCase().trim();
    if (query.length < 3 || results().length > 0) return '';
    const ranked = props.watchlist.map(m => m.title || m.name || '').filter(Boolean)
      .map(title => ({ title, score: editDistance(query, title.toLowerCase()) }))
      .sort((a, b) => a.score - b.score);
    return ranked[0]?.score <= Math.max(2, Math.floor(query.length / 3)) ? ranked[0].title : '';
  };

  /* ── TMDB Search (debounced 350ms) ── */
  createEffect(() => {
    const query = q();
    if (query.length < 2) { setResults([]); setSearching(false); return; }
    setSearching(true);
    setHighlightedIdx(-1);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`);
        const data = await res.json();
        const filtered = (data.results || []).filter(r => r.media_type === 'movie' || r.media_type === 'tv' || r.media_type === 'person');
        setResults(filtered);
        if (filtered.length > 0) {
          saveRecent(query.trim());
          setRecentSearches(loadRecent());
        }
      } catch(e) {}
      setSearching(false);
    }, 350);
    return () => clearTimeout(t);
  });

  /* ── Grouped Results (flat list with headers for rendering + keyboard nav) ── */
  const groupedResults = createMemo(() => {
    const res = results();
    const movies = res.filter(r => r.media_type === 'movie');
    const tv = res.filter(r => r.media_type === 'tv');
    const people = res.filter(r => r.media_type === 'person');

    const flat = [];
    if (movies.length > 0) {
      flat.push({ type: 'header', label: 'Movies', icon: 'movie', count: movies.length });
      movies.forEach(m => flat.push({ type: 'item', data: m }));
    }
    if (tv.length > 0) {
      flat.push({ type: 'header', label: 'Series', icon: 'tv', count: tv.length });
      tv.forEach(t => flat.push({ type: 'item', data: t }));
    }
    if (people.length > 0) {
      flat.push({ type: 'header', label: 'People', icon: 'person', count: people.length });
      people.forEach(p => flat.push({ type: 'item', data: p }));
    }
    return flat;
  });

  const selectableIndices = createMemo(() =>
    groupedResults().map((item, i) => item.type === 'item' ? i : -1).filter(i => i >= 0)
  );

  /* ── Scroll highlighted into view ── */
  createEffect(() => {
    const idx = highlightedIdx();
    if (idx >= 0) {
      requestAnimationFrame(() => {
        const el = document.querySelector(`[data-search-idx="${idx}"]`);
        if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    }
  });

  /* ── Keyboard Navigation ── */
  const handleKeyDown = (e) => {
    const selectables = selectableIndices();

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectables.length === 0) return;
      const currentPos = selectables.indexOf(highlightedIdx());
      const nextPos = currentPos < selectables.length - 1 ? currentPos + 1 : 0;
      setHighlightedIdx(selectables[nextPos]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectables.length === 0) return;
      const currentPos = selectables.indexOf(highlightedIdx());
      const prevPos = currentPos > 0 ? currentPos - 1 : selectables.length - 1;
      setHighlightedIdx(selectables[prevPos]);
    } else if (e.key === 'Enter') {
      if (highlightedIdx() >= 0) {
        e.preventDefault();
        const entry = groupedResults()[highlightedIdx()];
        if (entry?.type === 'item') selectItem(entry.data);
      } else if (selectables.length > 0) {
        e.preventDefault();
        const entry = groupedResults()[selectables[0]];
        if (entry?.type === 'item') selectItem(entry.data);
      }
    } else if (e.key === 'Escape') {
      if (q().length > 0) {
        setQ('');
        if (inputRef) inputRef.focus();
      } else {
        props.onClose();
      }
    }
  };

  const selectItem = (item) => {
    if (item.media_type === 'person') {
      setPersonId(item.id);
    } else {
      const isSaved = props.watchlist.some(w => String(w.id) === String(item.id));
      if (!isSaved) props.openPreview(item);
    }
  };

  const handleSuggestionClick = (text) => {
    setQ(text);
    if (inputRef) { inputRef.value = text; inputRef.focus(); }
  };

  const handleClearRecent = () => {
    clearRecentStorage();
    setRecentSearches([]);
  };

  /* ── Universe Detection ── */
  const detectUniverse = (media, detailData) => {
    const title = (media?.title || media?.name || '').toLowerCase();
    const overview = (detailData?.overview || '').toLowerCase();
    const collectionName = (detailData?.belongs_to_collection?.name || '').toLowerCase();
    const studios = (detailData?.production_companies || []).map(c => (c.name || '').toLowerCase()).join(' ');
    const blob = `${title} ${overview} ${collectionName} ${studios}`;
    if (blob.includes('marvel') || blob.includes('avengers') || blob.includes('iron man') || blob.includes('captain america') || blob.includes('thor') || blob.includes('guardians of the galaxy') || blob.includes('black panther') || blob.includes('doctor strange') || blob.includes('ant-man') || blob.includes('captain marvel') || blob.includes('wanda') || blob.includes('spider-man'))
      return { key: 'mcu', name: 'Marvel Cinematic Universe' };
    if (blob.includes('dc') || blob.includes('batman') || blob.includes('superman') || blob.includes('wonder woman') || blob.includes('aquaman') || blob.includes('flash') || blob.includes('justice league'))
      return { key: 'dceu', name: 'DC Universe' };
    return null;
  };

  /* ── Add to Vault ── */
  const addMedia = async (m, e) => {
    if (e) e.stopPropagation();
    if (props.isGuest) { props.showToast("Sign in to add to Vault! 🔒"); if (props.onLogin) props.onLogin(); return; }
    if (props.watchlist.some(item => String(item.id) === String(m.id))) return props.showToast("Already in Vault! 🍿");
    props.showToast("Adding to Vault...");
    try {
      const res = await fetch(`https://api.themoviedb.org/3/${m.media_type}/${m.id}?api_key=${TMDB_KEY}&append_to_response=watch/providers,credits`);
      const data = await res.json();
      const castNames = data.credits?.cast?.slice(0, 5).map(c => c.name) || [];
      const director = data.credits?.crew?.find(c => c.job === 'Director')?.name || '';
      const castList = [...castNames, director].filter(Boolean);

      await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), {
        id: m.id, title: m.title || m.name || '', poster_path: m.poster_path, backdrop_path: m.backdrop_path,
        media_type: m.media_type, status: 'Planned', addedAt: serverTimestamp(), castList,
        platformsList: [...new Set((data['watch/providers']?.results?.IN?.flatrate || []).map(p => cleanPlatform(p.provider_name)))].filter(Boolean).slice(0, 3),
        genresList: (data.genres || []).map(g => g.name), release_date: m.release_date || m.first_air_date || '',
        region: data.origin_country?.includes('IN') ? 'Indian' : 'International',
        season: 1, episode: 0, totalEps: data.number_of_episodes || 0,
        runtime: data.runtime || data.episode_run_time?.[0] || 0
      });

      if (m.media_type === 'movie' && data?.belongs_to_collection?.id) {
        const universe = detectUniverse(m, data);
        const franchisesRef = collection(db, 'users', props.uid, 'franchises');
        const frSnap = await getDocs(franchisesRef);
        let folder = null;
        if (universe?.key) folder = frSnap.docs.find(d => (d.data().universeKey||null)===universe.key) || frSnap.docs.find(d => (d.data().name||'').toLowerCase()===universe.name.toLowerCase());
        if (!folder) folder = frSnap.docs.find(d => (d.data().tmdbCollectionId||null)===data.belongs_to_collection.id);
        if (!folder) { const byName = frSnap.docs.find(d => (d.data().name||'').toLowerCase()===(data.belongs_to_collection.name||'').toLowerCase()); folder = byName; }
        let folderId = folder?.id;
        if (!folderId) {
          const created = await addDoc(franchisesRef, { name: universe?.name||data.belongs_to_collection.name, parentId: null, tmdbCollectionId: data.belongs_to_collection.id, universeKey: universe?.key||null, createdAt: serverTimestamp() });
          folderId = created.id;
        } else if (universe?.key) {
          await setDoc(doc(db, 'users', props.uid, 'franchises', folderId), { universeKey: universe.key, name: universe.name }, { merge: true });
        }
        const collRes = await fetch(`https://api.themoviedb.org/3/collection/${data.belongs_to_collection.id}?api_key=${TMDB_KEY}`);
        const coll = await collRes.json();
        const ordered = (coll.parts||[]).slice().sort((a,b) => (new Date(a.release_date||0).getTime()||0)-(new Date(b.release_date||0).getTime()||0));
        const watchSnap = await getDocs(collection(db, 'users', props.uid, 'watchlist'));
        const existing = new Set(watchSnap.docs.map(d => String(d.id)));
        for (let i = 0; i < ordered.length; i++) {
          const part = ordered[i];
          const partRef = doc(db, 'users', props.uid, 'watchlist', String(part.id));
          const basePayload = { id: part.id, title: part.title||'', poster_path: part.poster_path||null, backdrop_path: part.backdrop_path||null, media_type:'movie', status:'Planned', addedAt: serverTimestamp(), release_date: part.release_date||'', region:'International', season:1, episode:0, totalEps:0, runtime:0, franchises:{ [folderId]: i+1 }};
          if (existing.has(String(part.id))) await setDoc(partRef, { franchises: { [folderId]: i+1 } }, { merge: true });
          else await setDoc(partRef, basePayload, { merge: true });
        }
      }
      props.showToast("Added to Vault! 🍿");
      props.onClose();
    } catch(err) { props.showToast("Error adding to vault."); }
  };

  const handleOpenPreview = (item) => { setPersonId(null); setTimeout(() => props.openPreview(item, 'fromPerson'), 50); };

  return (
    <div
      class="fixed inset-0 p-4 pt-20 sm:pt-24 z-[999999] flex justify-center items-start animate-fade-in"
      style="background: rgba(0,0,0,0.88); backdrop-filter: blur(8px)"
      onClick={props.onClose}
    >
      <div
        class="animate-pop-spring w-full max-w-2xl mx-auto rounded-[1.75rem] overflow-hidden flex flex-col max-h-[75vh] border shadow-2xl"
        style="background: #111; border-color: rgba(255,255,255,0.12); box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 40px var(--p-glow)"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Search Input ── */}
        <div class="px-5 py-4 border-b flex gap-3 items-center" style="border-color: rgba(255,255,255,0.07)">
          <Icon name="search" style="color: var(--p); font-size: 22px" />
          <input
            ref={inputRef}
            autofocus
            value={q()}
            onInput={e => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies, series, actors..."
            class="bg-transparent border-none w-full outline-none text-white font-medium placeholder-gray-600"
            style="font-family: 'Outfit', sans-serif; font-size: 18px"
          />
          <Show when={searching()}>
            <div class="w-5 h-5 border-2 rounded-full animate-spin shrink-0" style="border-color: var(--p); border-top-color: transparent" />
          </Show>
          <Show when={q().length > 0 && !searching()}>
            <button
              onClick={() => { setQ(''); if (inputRef) inputRef.focus(); }}
              class="text-gray-500 hover:text-white active:scale-95 p-1.5 rounded-full hover:bg-white/5"
            >
              <Icon name="backspace" class="text-sm"/>
            </button>
          </Show>
          <button
            onClick={props.onClose}
            class="bg-white/10 hover:bg-white/20 active:scale-95 p-2 rounded-full ml-1"
          >
            <Icon name="close" class="text-white text-sm"/>
          </button>
        </div>

        {/* ── Content Area ── */}
        <div class="overflow-y-auto hide-scrollbar flex-1">

          {/* ── IDLE STATE: Recent + Suggestions ── */}
          <Show when={!searching() && q().length < 2}>
            <div class="p-5 animate-fade-in">
              <Show when={recentSearches().length > 0}>
                <div class="mb-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="search-group-label">
                      <Icon name="history" style="font-size: 13px; color: var(--muted)" /> Recent
                    </span>
                    <button onClick={handleClearRecent} class="type-caption hover:text-white transition-colors" style="color: var(--muted)">Clear</button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <For each={recentSearches()}>{(term) => (
                      <button onClick={() => handleSuggestionClick(term)} class="recent-chip">
                        {term}
                      </button>
                    )}</For>
                  </div>
                </div>
              </Show>

              <div>
                <span class="search-group-label">
                  <Icon name="bolt" style="font-size: 13px; color: var(--p)" /> Quick Search
                </span>
                <div class="flex flex-wrap gap-2 mt-3">
                  <For each={QUICK_SUGGESTIONS}>{(term) => (
                    <button onClick={() => handleSuggestionClick(term)} class="recent-chip" style="border-color: color-mix(in srgb, var(--p) 20%, transparent)">
                      {term}
                    </button>
                  )}</For>
                </div>
              </div>

              <Show when={recentSearches().length === 0}>
                <div class="text-center mt-8 opacity-30">
                  <Icon name="movie_filter" class="text-5xl mb-2" style="color: var(--muted)" />
                  <p class="type-caption">Type to search across movies, series & actors</p>
                </div>
              </Show>
            </div>
          </Show>

          {/* ── LOADING STATE: Skeleton ── */}
          <Show when={searching()}>
            <div class="p-3 space-y-1">
              <For each={[
                { poster: true, w1: '75%', w2: '40%' },
                { poster: true, w1: '60%', w2: '35%' },
                { poster: false, w1: '70%', w2: '45%' },
                { poster: true, w1: '80%', w2: '30%' }
              ]}>{(s) => (
                <div class="search-skeleton-row">
                  <Show when={s.poster} fallback={
                    <div class="w-12 h-12 rounded-full skeleton-bg shrink-0" />
                  }>
                    <div class="w-14 h-20 rounded-xl skeleton-bg shrink-0" />
                  </Show>
                  <div class="flex-1 flex flex-col justify-center gap-2.5 py-1">
                    <div class="h-4 rounded skeleton-bg" style={`width: ${s.w1}`} />
                    <div class="h-3 rounded skeleton-bg" style={`width: ${s.w2}`} />
                  </div>
                </div>
              )}</For>
            </div>
          </Show>

          {/* ── RESULTS STATE: Grouped ── */}
          <Show when={!searching() && results().length > 0}>
            <div class="p-3 stagger">
              <For each={groupedResults()}>{(entry, idx) => {
                /* ── GROUP HEADER ── */
                if (entry.type === 'header') {
                  return (
                    <div class="search-group-header animate-fade-in">
                      <Icon name={entry.icon} style="font-size: 14px; color: var(--p)" />
                      <span>{entry.label}</span>
                      <span class="search-group-count">{entry.count}</span>
                      <div class="flex-1 h-px" style="background: var(--border)" />
                    </div>
                  );
                }

                /* ── ITEM ROW ── */
                const item = entry.data;
                const isHighlighted = highlightedIdx() === idx();
                const isSaved = props.watchlist.some(w => String(w.id) === String(item.id));

                /* ── PERSON RESULT ── */
                if (item.media_type === 'person') {
                  return (
                    <div
                      data-search-idx={idx()}
                      onClick={() => setPersonId(item.id)}
                      class={`flex items-center gap-4 p-3 rounded-[1.5rem] border cursor-pointer group animate-fade-up ${isHighlighted ? 'search-highlight' : 'border-transparent'}`}
                      style={!isHighlighted ? "transition: background 150ms ease-out, border-color 150ms ease-out" : undefined}
                      onMouseEnter={e => { if (!isHighlighted) { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='color-mix(in srgb, var(--p) 25%, transparent)'; }}}
                      onMouseLeave={e => { if (!isHighlighted) { e.currentTarget.style.background=''; e.currentTarget.style.borderColor='transparent'; }}}
                    >
                      <img
                        src={item.profile_path
                          ? `https://image.tmdb.org/t/p/w92${item.profile_path}`
                          : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(item.name)}&backgroundColor=171921`}
                        class="poster-img w-12 h-12 rounded-full object-cover border border-white/10 shrink-0"
                        onLoad={e => e.target.classList.add('img-loaded')}
                      />
                      <div class="flex-1 min-w-0">
                        <p class="type-metadata font-black text-gray-100 line-clamp-1 search-item-title">{item.name}</p>
                        <p class="type-caption mt-0.5" style="color: var(--p)">
                          {item.known_for_department === 'Directing' ? '[DIRECTOR]' : '[ACTOR]'}
                        </p>
                      </div>
                      <Icon name="chevron_right" class="text-gray-500 group-hover:text-[var(--p)] shrink-0" style="transition: color 150ms ease-out"/>
                    </div>
                  );
                }

                /* ── MOVIE / TV RESULT ── */
                return (
                  <div
                    data-search-idx={idx()}
                    onClick={() => !isSaved && props.openPreview(item)}
                    class={`flex gap-4 p-3 rounded-[1.5rem] border group animate-fade-up ${isSaved ? 'opacity-60' : 'cursor-pointer'} ${isHighlighted ? 'search-highlight' : 'border-transparent'}`}
                    style={!isHighlighted ? "transition: background 150ms ease-out, border-color 150ms ease-out" : undefined}
                    onMouseEnter={e => { if (!isHighlighted && !isSaved) { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='color-mix(in srgb, var(--p) 25%, transparent)'; }}}
                    onMouseLeave={e => { if (!isHighlighted) { e.currentTarget.style.background=''; e.currentTarget.style.borderColor='transparent'; }}}
                  >
                    <Show when={item.poster_path} fallback={
                      <div class="w-14 h-20 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 bg-[#171921] shrink-0">
                        <Icon name="movie" class="text-gray-600"/>
                      </div>
                    }>
                      <div class="w-14 h-20 rounded-xl overflow-hidden relative shrink-0" style="background: #141414; box-shadow: var(--shadow-card)">
                        <div class="poster-loading" />
                        <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} class="poster-img absolute inset-0 w-full h-full object-cover" onLoad={e => { e.target.classList.add('img-loaded'); e.target.previousSibling?.classList.add('hidden'); }} alt="" />
                      </div>
                    </Show>
                    <div class="flex flex-col justify-center flex-1 py-1 min-w-0">
                      <p class="type-metadata font-black text-gray-100 line-clamp-1 search-item-title">{item.title || item.name}</p>
                      <div class="flex items-center gap-2 mt-1.5">
                        <span class="type-caption bg-white/10 text-gray-300 px-2 py-0.5 rounded border border-white/5">
                          {item.media_type === 'tv' ? 'Series' : 'Movie'}
                        </span>
                        <span class="type-caption text-gray-500">
                          {(item.release_date || item.first_air_date || '').split('-')[0]}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Show when={isSaved} fallback={
                        <button
                          onClick={(e) => addMedia(item, e)}
                          class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 active:scale-90"
                          style="transition: background 150ms ease-out, color 150ms ease-out, border-color 150ms ease-out"
                          onMouseEnter={e => { e.currentTarget.style.background='var(--p)'; e.currentTarget.style.color='#08090b'; e.currentTarget.style.borderColor='var(--p)'; e.currentTarget.style.boxShadow='0 0 12px var(--p-glow)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color=''; e.currentTarget.style.borderColor=''; e.currentTarget.style.boxShadow=''; }}
                        >
                          <Icon name="add" class="text-xl"/>
                        </button>
                      }>
                        <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background: var(--p-dim)">
                          <Icon name="check_circle" fill class="text-xl" style="color: var(--p)"/>
                        </div>
                      </Show>
                    </div>
                  </div>
                );
              }}</For>
            </div>
          </Show>

          {/* ── EMPTY STATE ── */}
          <Show when={!searching() && q().length >= 2 && results().length === 0}>
            <div class="text-center p-12 animate-fade-in" style="color: var(--muted)">
              <Icon name="sentiment_dissatisfied" class="text-5xl mb-3 opacity-30"/>
              <p class="type-metadata font-bold">No results found in this universe.</p>
              <Show when={didYouMean()}>
                <button
                  onClick={() => setQ(didYouMean())}
                  class="mt-3 type-caption inline-block"
                  style="color: var(--p)"
                >
                  Did you mean <strong class="text-white">{didYouMean()}</strong>?
                </button>
              </Show>
              <div class="mt-6">
                <span class="search-group-label justify-center">
                  <Icon name="bolt" style="font-size: 12px; color: var(--p)" /> Try Instead
                </span>
                <div class="flex flex-wrap gap-2 mt-3 justify-center">
                  <For each={QUICK_SUGGESTIONS.slice(0, 6)}>{(term) => (
                    <button onClick={() => handleSuggestionClick(term)} class="recent-chip" style="border-color: color-mix(in srgb, var(--p) 20%, transparent)">
                      {term}
                    </button>
                  )}</For>
                </div>
              </div>
            </div>
          </Show>
        </div>
      </div>

      <Show when={personId()}>
        <PersonModal
          id={personId()}
          watchlist={props.watchlist}
          onClose={() => setPersonId(null)}
          openPreview={handleOpenPreview}
          showToast={props.showToast}
          uid={props.uid}
          isGuest={props.isGuest}
          onLogin={props.onLogin}
        />
      </Show>
    </div>
  );
}
