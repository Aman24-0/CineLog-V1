import { createSignal, Show, For } from 'solid-js';
import { Icon } from '../../utils';
import { saveDirectPlayUrl } from '../../services/watchlistService';
import { TMDB_KEY } from '../../utils';

// ─────────────────────────────────────────────────────────────────────────────
// resolveDirectPlayUrl
// Determines which ID the template needs, fetches IMDb ID from TMDB only when
// required, and returns the final playback URL.
//
// Cases:
//   - Template contains {tmdb_id}  → replace with TMDB numeric ID (no fetch)
//   - Template contains {imdb_id}  → fetch /external_ids from TMDB, get imdb_id
//   - Template is a plain URL      → return as-is
// ─────────────────────────────────────────────────────────────────────────────
async function resolveDirectPlayUrl(template, movie, showToast) {
  if (!template) return '';

  const tmdbId    = movie?.id;
  const mediaType = movie?.media_type === 'tv' ? 'tv' : 'movie';

  // Case 1: template uses {tmdb_id} → simple replace, no network call
  if (template.includes('{tmdb_id}')) {
    return template.replace(/\{tmdb_id\}/gi, tmdbId);
  }

  // Case 2: template uses {imdb_id} → fetch from TMDB external_ids
  if (template.includes('{imdb_id}')) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${tmdbId}/external_ids?api_key=${TMDB_KEY}`
      );
      if (!res.ok) throw new Error(`TMDB external_ids ${res.status}`);
      const data = await res.json();
      const imdbId = data.imdb_id;
      if (!imdbId) {
        if (showToast) showToast('IMDb ID not found for this title on TMDB.', 'error');
        return '';
      }
      return template.replace(/\{imdb_id\}/gi, imdbId);
    } catch (err) {
      console.error('[DirectPlay] IMDb ID fetch failed:', err);
      if (showToast) showToast('Failed to fetch IMDb ID. Check your connection.', 'error');
      return '';
    }
  }

  // Case 3: plain URL — return unchanged
  return template;
}

export function StreamingPanel(props) {
  const [expanded,   setExpanded]   = createSignal(false);
  const [resolving,  setResolving]  = createSignal(false); // loading state for IMDb fetch

  const multiList = () => props.availableServers.filter(s => s.type === 'multi');
  const orgList   = () => props.availableServers.filter(s => s.type === 'org');
  const hasServerSelected = () => !!props.activeServer;

  // Detect what kind of Direct Play template the user has saved
  const directPlayTemplate = () => props.directPlayUrl || '';
  const needsImdbResolve   = () => directPlayTemplate().includes('{imdb_id}');
  const isDirectPlayActive = () => props.activeServer === 'DIRECT_PLAY';

  const Chip = (srv) => (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); props.setActiveServer(srv.id); }}
      class="flex items-center justify-center gap-1.5 w-full h-9 px-2 rounded-xl type-caption transition-all active:scale-95"
      style={props.activeServer === srv.id
        ? 'border: 1px solid var(--p); background: var(--p-dim); color: var(--p); box-shadow: 0 0 10px var(--p-glow)'
        : 'border: 1px solid var(--border); background: var(--raised); color: var(--muted)'}
    >
      <Icon name={srv.icon || 'dns'} class="text-[13px] shrink-0" />
      <span class="truncate">{srv.name}</span>
    </button>
  );

  const GroupLabel = (label) => (
    <div class="flex items-center gap-2 mt-4 mb-2">
      <span class="type-caption shrink-0" style="color: var(--muted)">{label}</span>
      <div class="flex-1 h-px" style="background: var(--border)" />
    </div>
  );

  const startPlayback = () => {
    if (!props.movie?.watchProgress || props.movie.watchProgress.currentTime === 0) {
      const inferred = props.inferDurationSeconds();
      if (inferred > 0) props.setContentDuration(inferred);
      props.setWatchProgress({ currentTime: 0, duration: inferred });
    } else {
      if (props.movie.watchProgress.duration) props.setContentDuration(props.movie.watchProgress.duration);
      props.setWatchProgress(props.movie.watchProgress);
    }
    props.setPlayerStartProgress(props.movie.watchProgress?.currentTime || 0);
    props.setReceivedRealProgress(false);
    props.setPlayerSessionStart(Date.now());
    props.setShowPlayer(true);
  };

  // ─── WATCH NOW handler ───────────────────────────────────────────────────
  // For Direct Play + {imdb_id} template: fetch IMDb ID first, pass resolved
  // URL to parent via onDirectPlayResolved, then start playback.
  // For everything else: existing behaviour, completely unchanged.
  // ────────────────────────────────────────────────────────────────────────
  const handleMainButtonClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!expanded()) {
      setExpanded(true);
      return;
    }

    if (!hasServerSelected()) {
      if (props.showToast) props.showToast('Select a server first');
      return;
    }

    // Direct Play + IMDb template → resolve before playback
    if (isDirectPlayActive() && needsImdbResolve()) {
      if (!directPlayTemplate()) {
        if (props.showToast) props.showToast('Paste a URL template in Direct Play first.');
        return;
      }
      setResolving(true);
      const resolved = await resolveDirectPlayUrl(directPlayTemplate(), props.movie, props.showToast);
      setResolving(false);
      if (!resolved) return; // error already toasted inside resolveDirectPlayUrl
      // Pass resolved URL to DetailsModal so the player iframe gets the right src
      props.onDirectPlayResolved(resolved);
      startPlayback();
      setExpanded(false);
      return;
    }

    // Direct Play + {tmdb_id} or plain URL — still resolve (no-op for plain URLs)
    if (isDirectPlayActive() && directPlayTemplate().includes('{tmdb_id}')) {
      const resolved = resolveDirectPlayUrl(directPlayTemplate(), props.movie, props.showToast);
      // resolveDirectPlayUrl is async but {tmdb_id} branch is synchronous-ish;
      // await to keep consistent
      const url = await resolved;
      props.onDirectPlayResolved(url);
      startPlayback();
      setExpanded(false);
      return;
    }

    // All other servers — existing behaviour
    startPlayback();
    setExpanded(false);
  };

  const handleSaveUrl = async (e) => {
    e.stopPropagation();
    const url     = props.directPlayUrl;
    const uid     = props.uid;
    const movieId = props.movie?.id;
    if (uid && movieId) {
      try {
        await saveDirectPlayUrl(uid, movieId, url);
        if (props.showToast) props.showToast('URL saved!');
      } catch (err) {
        console.error('Save failed:', err);
        if (props.showToast) props.showToast('Save failed. Try again.');
      }
    } else {
      localStorage.setItem(`cinelog_direct_url_${movieId}`, url);
      if (props.showToast) props.showToast('URL saved locally!');
    }
    props.setIsEditingDirectUrl(false);
  };

  // Human-readable label showing what kind of template is saved
  const templateHint = () => {
    const t = directPlayTemplate();
    if (!t) return null;
    if (t.includes('{imdb_id}')) return '🎬 IMDb ID template';
    if (t.includes('{tmdb_id}')) return '🎬 TMDB ID template';
    return null;
  };

  return (
    <div class="mb-6 bg-black/40 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/5 shadow-inner">
      {/* Header row — unchanged */}
      <div class="flex justify-between items-center mb-3 px-1">
        <span class="type-caption text-gray-400 flex items-center gap-1.5">
          <Icon name="router" class="text-[12px]" style="color: var(--p)" /> Streaming Node
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded()); }}
          class="w-6 h-6 flex items-center justify-center rounded-lg text-gray-500 hover:text-white"
          style="transition: color 150ms ease-out"
        >
          <Icon name={expanded() ? 'expand_less' : 'expand_more'} class="text-[16px]" />
        </button>
      </div>

      {/* Collapsible server list — unchanged */}
      <Show when={expanded()}>
        <div class="pb-1 collapse-enter">
          <Show when={multiList().length > 0}>
            {GroupLabel('🌍 Multi Audio')}
            <div class="grid grid-cols-2 gap-2">
              <For each={multiList()}>{(srv) => <div>{Chip(srv)}</div>}</For>
            </div>
          </Show>
          <Show when={orgList().length > 0}>
            {GroupLabel('🎭 Org Audio')}
            <div class="grid grid-cols-2 gap-2">
              <For each={orgList()}>{(srv) => <div>{Chip(srv)}</div>}</For>
            </div>
          </Show>
          <Show when={multiList().length === 0 && orgList().length === 0}>
            <div class="text-center py-4 type-caption text-gray-500 border border-dashed border-white/5 rounded-xl mb-3">
              No Servers Configured
            </div>
          </Show>

          {/* Direct Play row — unchanged layout, new template hint */}
          <div class="flex items-center gap-2 mt-4">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); props.setActiveServer('DIRECT_PLAY'); }}
              class="flex-1 flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl type-caption transition-all active:scale-95"
              style={isDirectPlayActive()
                ? 'border: 1px solid #3b82f6; background: rgba(59,130,246,0.15); color: #3b82f6; box-shadow: 0 0 10px rgba(59,130,246,0.3)'
                : 'border: 1px solid var(--border); background: var(--raised); color: var(--muted)'}
            >
              <Icon name="play_arrow" class="text-[13px] shrink-0" /> Direct Play
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); props.setIsEditingDirectUrl(!props.isEditingDirectUrl); }}
              class="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white shrink-0"
              title="Edit URL Template"
            >
              <Icon name="edit" class="text-[13px]" />
            </button>
          </div>

          {/* URL editor — updated placeholder text to mention both ID types */}
          <Show when={props.isEditingDirectUrl}>
            <div class="flex gap-2 mt-2 px-1 mb-2 animate-fade-in">
              <input
                type="text"
                value={props.directPlayUrl}
                onInput={e => props.setDirectPlayUrl(e.target.value)}
                placeholder="https://example.com/play/{imdb_id}  or  /movie/{tmdb_id}"
                class="flex-1 bg-[#0c0e14] border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-[#3b82f6]"
              />
              <button
                type="button"
                onClick={handleSaveUrl}
                class="bg-[#3b82f6] hover:bg-blue-600 text-white px-4 py-2 rounded-lg type-button"
              >
                Save
              </button>
            </div>
            {/* Helper text showing supported placeholders */}
            <p class="type-caption text-gray-600 px-2 mb-2" style="font-size: 9px; line-height: 1.5">
              Supported: <span class="text-blue-400">{'{imdb_id}'}</span> · <span class="text-blue-400">{'{tmdb_id}'}</span>
            </p>
          </Show>

          {/* Saved URL preview — shows template hint when IMDb/TMDB template detected */}
          <Show when={!props.isEditingDirectUrl && directPlayTemplate() && isDirectPlayActive()}>
            <div class="flex items-center gap-2 mt-1 px-2 mb-2 animate-fade-in">
              <Show when={templateHint()}>
                <span
                  class="type-caption px-2 py-0.5 rounded shrink-0"
                  style="background: rgba(59,130,246,0.15); color: #3b82f6; border: 1px solid rgba(59,130,246,0.3); font-size: 9px"
                >
                  {templateHint()}
                </span>
              </Show>
              <span class="type-caption text-[#3b82f6] truncate" style="opacity: 0.7; font-size: 9px">
                {directPlayTemplate()}
              </span>
            </div>
          </Show>
        </div>
      </Show>

      {/* Primary WATCH NOW button */}
      <button
        type="button"
        onClick={handleMainButtonClick}
        disabled={resolving()}
        class="w-full mt-3 type-button py-4 rounded-xl active:scale-95 flex items-center justify-center gap-2"
        style={
          resolving()
            ? 'background: rgba(255,255,255,0.06); color: var(--muted); box-shadow: none; cursor: wait'
            : expanded() && !hasServerSelected()
              ? 'background: rgba(255,255,255,0.08); color: var(--muted); box-shadow: none;'
              : 'background: var(--p); color: #05060a; box-shadow: 0 0 24px var(--p-glow)'
        }
      >
        <Show
          when={resolving()}
          fallback={
            <>
              <Icon name="play_circle" fill class="text-[18px]" />
              {props.movie?.watchProgress && props.movie.watchProgress.currentTime > 0 ? 'Resume Movie' : 'Watch Now'}
            </>
          }
        >
          {/* Loading spinner while fetching IMDb ID */}
          <span
            class="w-4 h-4 border-2 rounded-full animate-spin"
            style="border-color: var(--muted); border-top-color: var(--p)"
          />
          Fetching IMDb ID…
        </Show>
      </button>
    </div>
  );
}
