import { createSignal, createEffect, createMemo, Show, For, onMount, onCleanup } from 'solid-js';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, TMDB_KEY } from '../utils';

export function PersonModal(props) {
  const [person,    setPerson]    = createSignal(null);
  const [credits,   setCredits]   = createSignal({ cast: [], crew: [] });
  const [activeTab, setActiveTab] = createSignal('movie');
  const [sortBy,    setSortBy]    = createSignal('popularity');
  const [loadError, setLoadError] = createSignal(false);

  onMount(() => { document.body.style.overflow = 'hidden'; });
  onCleanup(() => { document.body.style.overflow = ''; });

  createEffect(() => {
    if (!props.id) return;
    setPerson(null);
    setLoadError(false);
    fetch(`https://api.themoviedb.org/3/person/${props.id}?api_key=${TMDB_KEY}&append_to_response=combined_credits`)
      .then(r => { if (!r.ok) throw new Error('TMDB error'); return r.json(); })
      .then(data => {
        setPerson(data);
        setCredits(data.combined_credits || { cast: [], crew: [] });
      })
      .catch(() => setLoadError(true));
  });

  const displayList = createMemo(() => {
    if (!person()) return [];
    const isDirector = person().known_for_department === 'Directing';
    let rawList = isDirector
      ? credits().crew.filter(c => c.job === 'Director')
      : credits().cast;
    let filtered = rawList.filter(item => item.media_type === activeTab());

    const unique = []; const seen = new Set();
    filtered.forEach(item => { if (!seen.has(item.id)) { seen.add(item.id); unique.push(item); } });

    return unique.sort((a, b) => {
      if (sortBy() === 'popularity') return b.popularity - a.popularity;
      const dA = new Date(a.release_date || a.first_air_date || '1900-01-01').getTime();
      const dB = new Date(b.release_date || b.first_air_date || '1900-01-01').getTime();
      if (sortBy() === 'release_desc') return dB - dA;
      return dA - dB;
    });
  });

  const quickAddToVault = async (item, e) => {
    e.stopPropagation();
    if (props.isGuest) { props.showToast('Sign in to add to Vault! 🔒', 'info'); if (props.onLogin) props.onLogin(); return; }
    if ((props.watchlist || []).some(w => String(w.id) === String(item.id))) { return props.showToast('Already in Vault! 🍿', 'info'); }
    props.showToast('Adding to Vault…', 'info', 2000);
    try {
      const tmdbData = await (await fetch(
        `https://api.themoviedb.org/3/${item.media_type}/${item.id}?api_key=${TMDB_KEY}&append_to_response=credits`
      )).json();
      const castNames = tmdbData.credits?.cast?.slice(0, 5).map(c => c.name) || [];
      const director  = tmdbData.credits?.crew?.find(c => c.job === 'Director')?.name || '';
      await setDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), {
        id: String(item.id), title: item.title || item.name, media_type: item.media_type,
        poster_path: item.poster_path, backdrop_path: item.backdrop_path,
        release_date: item.release_date || item.first_air_date || '',
        status: 'Planned', addedAt: new Date(),
        castList: [...castNames, director].filter(Boolean)
      });
      props.showToast('Added to Vault! 🍿', 'success');
    } catch { props.showToast('Error adding to vault.', 'error'); }
  };

  const personName = () => person()?.name || 'Person';

  return (
    <div
      class="fixed inset-0 z-[9999999] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={props.onClose}
      role="dialog"
      aria-modal="true"
      aria-label={personName()}
    >
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none" aria-hidden="true" />

      <div
        class="w-full max-w-3xl lg:max-w-[800px] bg-[#111111] sm:rounded-[2.5rem] rounded-t-[2.5rem] border border-white/10 relative h-[90vh] flex flex-col overflow-hidden modal-sheet-enter"
        style="box-shadow: var(--shadow-float), 0 0 0 1px rgba(255,255,255,0.06)"
        onClick={e => e.stopPropagation()}
      >
        {/* FIX: aria-label on close button */}
        <button
          onClick={props.onClose}
          class="absolute top-4 right-4 z-50 bg-black/50 p-2.5 rounded-full hover:bg-black border border-white/10 active:scale-95 transition-all"
          aria-label={`Close ${personName()}`}
        >
          <Icon name="close" class="text-sm text-white" aria-hidden="true" />
        </button>

        {/* ── Loading state ── */}
        <Show when={!person() && !loadError()}>
          <div class="flex-1 flex items-center justify-center" role="status" aria-live="polite" aria-label="Loading person details">
            <div class="flex flex-col items-center gap-4">
              <Icon name="radar" style="color: var(--p); font-size: 48px" class="animate-spin" aria-hidden="true" />
              <span class="type-caption" style="color: var(--p)">Loading…</span>
            </div>
          </div>
        </Show>

        {/* ── Error state ── */}
        <Show when={loadError()}>
          <div class="flex-1 flex items-center justify-center p-8">
            <div class="empty-state">
              <div class="empty-state-icon" aria-hidden="true">
                <Icon name="cloud_off" style="color: var(--muted); font-size: 36px" />
              </div>
              <p class="empty-state-title">Failed to Load</p>
              <p class="empty-state-body">Could not fetch person details. Check your connection and try again.</p>
              <button
                onClick={props.onClose}
                class="type-button px-6 py-3 rounded-full mt-2 active:scale-95"
                style="background: var(--raised); border: 1px solid var(--border-active); color: var(--muted)"
              >
                Close
              </button>
            </div>
          </div>
        </Show>

        <Show when={person()}>
          {/* ── Person header ── */}
          <div class="flex gap-4 p-6 border-b border-white/5 shrink-0" style="background: linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)">
            <img
              src={person().profile_path
                ? `https://image.tmdb.org/t/p/w300${person().profile_path}`
                : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(person().name)}&backgroundColor=171921`}
              class="poster-img img-loaded w-28 h-40 object-cover rounded-xl border border-white/10 shrink-0"
              style="box-shadow: var(--shadow-raised)"
              onLoad={e => e.target.classList.add('img-loaded')}
              alt={person().name}
            />
            <div class="flex-1 overflow-hidden">
              <h2 class="text-2xl font-black text-white truncate">{person().name}</h2>
              <p class="type-caption mt-1 mb-2" style="color: var(--p)">
                {person().known_for_department}
                {person().birthday ? ` · ${person().birthday}` : ''}
                {person().deathday ? ` → ${person().deathday}` : ''}
              </p>
              <div class="h-20 overflow-y-auto hide-scrollbar text-xs text-gray-400 leading-relaxed pr-2">
                {person().biography || 'No biography available.'}
              </div>
            </div>
          </div>

          {/* ── Tab & Sort controls ── */}
          <div
            class="flex flex-wrap justify-between items-center p-4 border-b gap-3 shrink-0"
            style="background: var(--deep); border-color: var(--border)"
          >
            <div
              class="flex p-1 rounded-xl"
              style="background: var(--raised); border: 1px solid var(--border-active)"
              role="group"
              aria-label="Media type"
            >
              <button
                onClick={() => setActiveTab('movie')}
                class="px-4 py-1.5 rounded-lg type-caption transition-all"
                style={activeTab() === 'movie'
                  ? 'background: var(--p); color: #05060a; box-shadow: 0 0 12px var(--p-glow)'
                  : 'color: var(--muted)'}
                aria-pressed={activeTab() === 'movie'}
                aria-label="Show movies"
              >
                Movies
              </button>
              <button
                onClick={() => setActiveTab('tv')}
                class="px-4 py-1.5 rounded-lg type-caption transition-all"
                style={activeTab() === 'tv'
                  ? 'background: var(--p); color: #05060a; box-shadow: 0 0 12px var(--p-glow)'
                  : 'color: var(--muted)'}
                aria-pressed={activeTab() === 'tv'}
                aria-label="Show TV shows"
              >
                TV Shows
              </button>
            </div>

            <div class="flex items-center gap-2 bg-black/50 border border-white/5 rounded-xl px-3 py-1.5">
              <Icon name="sort" class="text-gray-500 text-[14px]" aria-hidden="true" />
              <label class="sr-only" for="person-sort">Sort filmography by</label>
              <select
                id="person-sort"
                value={sortBy()}
                onChange={e => setSortBy(e.target.value)}
                class="bg-transparent type-caption text-white outline-none cursor-pointer"
                style="font-weight: 700; letter-spacing: 0.1em"
              >
                <option value="popularity"   class="bg-[#111111]">Most Popular</option>
                <option value="release_desc" class="bg-[#111111]">Release (New → Old)</option>
                <option value="release_asc"  class="bg-[#111111]">Release (Old → New)</option>
              </select>
            </div>
          </div>

          {/* ── Filmography grid ── */}
          <div class="flex-1 overflow-y-auto p-4 hide-scrollbar" role="list" aria-label={`${personName()} filmography`}>
            <Show
              when={displayList().length > 0}
              fallback={
                <div class="empty-state py-16">
                  <div class="empty-state-icon" aria-hidden="true">
                    <Icon name="movie_off" style="color: var(--muted); font-size: 36px" />
                  </div>
                  <p class="empty-state-title">Nothing Found</p>
                  <p class="empty-state-body">
                    No {activeTab() === 'tv' ? 'TV show' : 'movie'} credits found for {personName()}.
                  </p>
                </div>
              }
            >
              <div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <For each={displayList()}>{(item) => {
                  const isSaved = () => (props.watchlist || []).some(w => String(w.id) === String(item.id));
                  const itemTitle = item.title || item.name || 'Untitled';
                  const itemYear  = (item.release_date || item.first_air_date || '').substring(0, 4);

                  return (
                    <div
                      class="relative group cursor-pointer animate-fade-in"
                      onClick={() => props.openPreview && props.openPreview(item, 'fromPerson')}
                      onKeyDown={e => { if (e.key === 'Enter') props.openPreview && props.openPreview(item, 'fromPerson'); }}
                      role="listitem"
                      tabIndex={0}
                      aria-label={`${itemTitle}${itemYear ? ` (${itemYear})` : ''}${isSaved() ? ' — in vault' : ''}`}
                    >
                      <Show
                        when={item.poster_path}
                        fallback={
                          <div class="w-full aspect-[2/3] rounded-xl border border-white/10 group-hover:border-[color:var(--p)] transition-all bg-[#171921] flex items-center justify-center text-center p-2" aria-hidden="true">
                            <span class="type-caption text-gray-500">No Poster</span>
                          </div>
                        }
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                          class="w-full aspect-[2/3] object-cover rounded-xl border border-white/10 group-hover:border-[color:var(--p)] transition-all"
                          loading="lazy"
                          alt=""
                          aria-hidden="true"
                        />
                      </Show>

                      {/* Overlay */}
                      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent rounded-xl flex flex-col justify-end p-2 pointer-events-none" aria-hidden="true">
                        <p class="type-caption text-white truncate leading-tight" style="font-size: 9px; font-weight: 800">{itemTitle}</p>
                        <p class="type-caption" style="color: var(--p); font-size: 8px">{itemYear}</p>
                      </div>

                      {/* Add / Saved badge */}
                      <Show when={!isSaved()}>
                        <button
                          onClick={(e) => quickAddToVault(item, e)}
                          class="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-[color:var(--p)] hover:text-[#0c0e14] hover:border-[color:var(--p)] transition-all active:scale-95 z-10 text-white shadow-lg"
                          aria-label={`Add ${itemTitle} to Vault`}
                          onClick:stopPropagation
                          onClickCapture={(e) => { e.stopPropagation(); quickAddToVault(item, e); }}
                        >
                          <Icon name="add" class="text-sm" aria-hidden="true" />
                        </button>
                      </Show>
                      <Show when={isSaved()}>
                        <div
                          class="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10"
                          style="background: var(--p); color: #0c0e14"
                          role="img"
                          aria-label="Already in Vault"
                        >
                          <Icon name="check" class="text-sm" aria-hidden="true" />
                        </div>
                      </Show>
                    </div>
                  );
                }}</For>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}
