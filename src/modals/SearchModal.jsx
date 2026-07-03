// src/modals/SearchModal.jsx
import { createSignal, createEffect, For, Show, onMount, onCleanup } from 'solid-js';
import { doc, setDoc, serverTimestamp, collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, cleanPlatform, TMDB_KEY } from '../utils';
import { PersonModal } from './PersonModal';

export function SearchModal(props) {
  const [q, setQ]           = createSignal(props.initialQuery || '');
  const [results, setResults] = createSignal([]);
  const [searching, setSearching] = createSignal(false);
  const [personId, setPersonId]   = createSignal(null);

  onMount(()   => { document.body.style.overflow = 'hidden'; });
  onCleanup(() => { document.body.style.overflow = ''; });

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

  createEffect(() => {
    const query = q();
    if (query.length < 2) return setResults([]);
    setSearching(true);
    const t = setTimeout(async () => {
      try {
        const res  = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults((data.results || []).filter(r => r.media_type === 'movie' || r.media_type === 'tv' || r.media_type === 'person'));
      } catch(e) {}
      setSearching(false);
    }, 500);
    return () => clearTimeout(t);
  });

  const detectUniverse = (media, detailData) => {
    const title          = (media?.title || media?.name || '').toLowerCase();
    const overview       = (detailData?.overview || '').toLowerCase();
    const collectionName = (detailData?.belongs_to_collection?.name || '').toLowerCase();
    const studios        = (detailData?.production_companies || []).map(c => (c.name || '').toLowerCase()).join(' ');
    const blob           = `${title} ${overview} ${collectionName} ${studios}`;
    if (blob.includes('marvel') || blob.includes('avengers') || blob.includes('iron man') || blob.includes('captain america') || blob.includes('thor') || blob.includes('guardians of the galaxy') || blob.includes('black panther') || blob.includes('doctor strange') || blob.includes('ant-man') || blob.includes('captain marvel') || blob.includes('wanda') || blob.includes('spider-man'))
      return { key: 'mcu', name: 'Marvel Cinematic Universe' };
    if (blob.includes('dc') || blob.includes('batman') || blob.includes('superman') || blob.includes('wonder woman') || blob.includes('aquaman') || blob.includes('flash') || blob.includes('justice league'))
      return { key: 'dceu', name: 'DC Universe' };
    return null;
  };

  const addMedia = async (m, e) => {
    if (e) e.stopPropagation();
    if (props.isGuest) { props.showToast("Sign in to add to Vault! 🔒"); if (props.onLogin) props.onLogin(); return; }
    if (props.watchlist.some(item => String(item.id) === String(m.id))) return props.showToast("Already in Vault! 🍿");
    props.showToast("Adding to Vault...");
    try {
      const res  = await fetch(`https://api.themoviedb.org/3/${m.media_type}/${m.id}?api_key=${TMDB_KEY}&append_to_response=watch/providers,credits`);
      const data = await res.json();
      const castNames = data.credits?.cast?.slice(0, 5).map(c => c.name) || [];
      const director  = data.credits?.crew?.find(c => c.job === 'Director')?.name || '';
      const castList  = [...castNames, director].filter(Boolean);

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
        const universe      = detectUniverse(m, data);
        const franchisesRef = collection(db, 'users', props.uid, 'franchises');
        const frSnap        = await getDocs(franchisesRef);
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
        const coll    = await collRes.json();
        const ordered = (coll.parts||[]).slice().sort((a,b) => (new Date(a.release_date||0).getTime()||0)-(new Date(b.release_date||0).getTime()||0));
        const watchSnap = await getDocs(collection(db, 'users', props.uid, 'watchlist'));
        const existing  = new Set(watchSnap.docs.map(d => String(d.id)));
        for (let i = 0; i < ordered.length; i++) {
          const part    = ordered[i];
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
    // Full-screen overlay — animate-fade-in on backdrop; modal animates separately
    <div
      class="fixed inset-0 p-4 pt-20 sm:pt-24 z-[999999] flex justify-center items-start animate-fade-in"
      style="background: rgba(0,0,0,0.88); backdrop-filter: blur(8px)"
      onClick={props.onClose}
    >
      {/* Modal card — pop-spring entrance; p-0 content styled below */}
      <div
        class="animate-pop-spring w-full max-w-2xl mx-auto rounded-[1.75rem] overflow-hidden flex flex-col max-h-[75vh] border shadow-2xl"
        style="background: #111; border-color: rgba(255,255,255,0.12); box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 40px var(--p-glow)"
        onClick={e => e.stopPropagation()}
      >

        {/* Search input row — px-5 = 20px; py-4 = 16px; gap-3 = 12px */}
        <div class="px-5 py-4 border-b flex gap-3 items-center" style="border-color: rgba(255,255,255,0.07)">
          <Icon name="search" style="color: var(--p); font-size: 22px" />
          <input
            autofocus
            value={q()}
            onInput={e => setQ(e.target.value)}
            placeholder="Search movies, series, actors..."
            class="bg-transparent border-none w-full outline-none text-white font-medium placeholder-gray-600"
            style="font-family: 'Outfit', sans-serif; font-size: 18px"
          />
          <Show when={q().length > 0}>
            <button
              onClick={() => setQ('')}
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

        {/* Results area — p-3 = 12px */}
        <div class="overflow-y-auto p-3 hide-scrollbar">

          {/* Searching spinner */}
          <Show when={searching()}>
            <div class="flex flex-col items-center justify-center p-12 gap-4 opacity-50">
              <Icon name="radar" class="animate-spin text-5xl" style="color: var(--p)"/>
              <p class="type-caption" style="color: var(--p)">Scanning Database...</p>
            </div>
          </Show>

          {/* No results */}
          <Show when={!searching() && q().length >= 2 && results().length === 0}>
            <div class="text-center p-12 animate-fade-in" style="color: var(--muted)">
              <Icon name="sentiment_dissatisfied" class="text-5xl mb-3 opacity-30"/>
              <p class="type-metadata font-bold">No results found in this universe.</p>
              <Show when={didYouMean()}>
                <button
                  onClick={() => setQ(didYouMean())}
                  class="mt-4 type-caption"
                  style="color: var(--p)"
                >
                  Did you mean <strong class="text-white">{didYouMean()}</strong>?
                </button>
              </Show>
            </div>
          </Show>

          {/* Result list — space-y-1 = 4px */}
          <div class="space-y-1 stagger">
            <For each={results()}>{(item) => {

              // ── PERSON RESULT ──
              if (item.media_type === 'person') {
                return (
                  <div
                    onClick={() => setPersonId(item.id)}
                    class="flex items-center gap-4 p-3 rounded-[1.5rem] border border-transparent cursor-pointer group animate-fade-up"
                    style="transition: background 150ms ease-out, border-color 150ms ease-out"
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='color-mix(in srgb, var(--p) 25%, transparent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.borderColor='transparent'; }}
                  >
                    <img
                      src={item.profile_path
                        ? `https://image.tmdb.org/t/p/w92${item.profile_path}`
                        : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(item.name)}&backgroundColor=171921`}
                      class="poster-img w-12 h-12 rounded-full object-cover border border-white/10 shrink-0"
                      onLoad={e => { e.target.classList.add('img-loaded'); }}
                      onMouseEnter={e => { e.target.style.borderColor = 'var(--p)'; }}
                      onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                    <div class="flex-1 min-w-0">
                      <p class="type-metadata font-black text-gray-100 group-hover:text-white line-clamp-1"
                        onMouseEnter={e => { e.target.style.color = 'var(--p)'; }}
                        onMouseLeave={e => { e.target.style.color = ''; }}
                      >{item.name}</p>
                      <p class="type-caption mt-0.5" style="color: var(--p)">
                        {item.known_for_department === 'Directing' ? '[DIRECTOR]' : '[ACTOR]'}
                      </p>
                    </div>
                    <Icon name="chevron_right" class="text-gray-500 group-hover:text-[var(--p)] shrink-0" style="transition: color 150ms ease-out"/>
                  </div>
                );
              }

              // ── MOVIE / TV RESULT ──
              const isSaved = props.watchlist.some(w => String(w.id) === String(item.id));
              return (
                <div
                  onClick={() => !isSaved && props.openPreview(item)}
                  class={`flex gap-4 p-3 rounded-[1.5rem] border border-transparent group animate-fade-up ${isSaved ? 'opacity-60' : 'cursor-pointer'}`}
                  style="transition: background 150ms ease-out, border-color 150ms ease-out"
                  onMouseEnter={e => { if (!isSaved) { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='color-mix(in srgb, var(--p) 25%, transparent)'; }}}
                  onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.borderColor='transparent'; }}
                >
                  {/* Poster */}
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

                  {/* Info */}
                  <div class="flex flex-col justify-center flex-1 py-1 min-w-0">
                    <p class="type-metadata font-black text-gray-100 line-clamp-1"
                      style="transition: color 150ms ease-out"
                      onMouseEnter={e => { if (!isSaved) e.target.style.color = 'var(--p)'; }}
                      onMouseLeave={e => { e.target.style.color = ''; }}
                    >{item.title || item.name}</p>
                    {/* gap-2 = 8px; mt-1.5 = 6px */}
                    <div class="flex items-center gap-2 mt-1.5">
                      <span class="type-caption bg-white/10 text-gray-300 px-2 py-0.5 rounded border border-white/5">
                        {item.media_type === 'tv' ? 'Series' : 'Movie'}
                      </span>
                      <span class="type-caption text-gray-500">
                        {(item.release_date || item.first_air_date || '').split('-')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Action button */}
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
