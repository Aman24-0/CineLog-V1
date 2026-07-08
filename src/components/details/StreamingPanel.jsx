import { createSignal, Show, For } from 'solid-js';
import { Icon, TMDB_KEY } from '../../utils';

// ─────────────────────────────────────────────────────────────────────────────
// resolveStreamingUrl
//
// Determines which ID the server template needs, fetches the IMDb ID from TMDB
// /external_ids only when the server is in IMDb mode, applies season/episode
// placeholders for TV shows, and appends a resume-time parameter when the user
// has prior watch progress on the same server+episode.
//
// Returns the final playback URL, or '' on failure (with a toast already shown).
// ─────────────────────────────────────────────────────────────────────────────
export async function resolveStreamingUrl(server, movie, showToast, ctx = {}) {
  if (!server) return '';

  const mediaType = movie?.media_type === 'tv' ? 'tv' : 'movie';
  const template  = mediaType === 'tv' ? server.tvUrl : server.movieUrl;
  if (!template) return '';

  const tmdbId = movie?.id;
  const idMode = server.idMode || 'TMDB';
  const season  = ctx.season  ?? (mediaType === 'tv' ? (movie?.season  || 1) : 1);
  const episode = ctx.episode ?? (mediaType === 'tv' ? (movie?.episode || 1) : 1);

  let url = template;

  // 1) Always replace the TMDB id placeholders (TMDB-mode servers stop here).
  url = url.replace(/\{tmdb_id\}|\{id\}|\[TMDB_ID\]/gi, tmdbId);

  // 2) TV season/episode placeholders.
  if (mediaType === 'tv') {
    url = url.replace(/\{season\}|\[SEASON\]/gi, season)
             .replace(/\{episode\}|\[EPISODE\]/gi, episode);
  }

  // 3) IMDb-mode servers: fetch the IMDb id from TMDB /external_ids, then
  //    substitute {imdb_id}. If the template doesn't reference {imdb_id} we
  //    skip the network call entirely.
  if (idMode === 'IMDb' && /\{imdb_id\}/i.test(url)) {
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
      url = url.replace(/\{imdb_id\}/gi, imdbId);
    } catch (err) {
      console.error('[StreamingPanel] IMDb ID fetch failed:', err);
      if (showToast) showToast('Failed to fetch IMDb ID. Check your connection.', 'error');
      return '';
    }
  }

  // 4) Resume-time parameter — preserved from the original getStreamUrl logic
  //    so TMDB-mode servers keep working exactly as before.
  const wp = ctx.watchProgress || movie?.watchProgress;
  const canResume = wp && wp.server === server.id && wp.currentTime > 0 && (
    mediaType !== 'tv' || (
      parseInt(wp.season  || 1) === parseInt(season)  &&
      parseInt(wp.episode || 1) === parseInt(episode)
    )
  );
  if (canResume) {
    const t = Math.floor(wp.currentTime);
    url += url.includes('?') ? `&t=${t}&start=${t}&time=${t}` : `?t=${t}&start=${t}&time=${t}`;
  }

  return url;
}

export function StreamingPanel(props) {
  const [expanded, setExpanded] = createSignal(false);
  const [resolving, setResolving] = createSignal(false);

  const multiList = () => props.availableServers.filter(s => s.type === 'multi');
  const orgList   = () => props.availableServers.filter(s => s.type === 'org');
  const hasServerSelected = () => !!props.activeServer;

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

  const handleMainButtonClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!expanded()) { setExpanded(true); return; }

    if (!hasServerSelected()) {
      if (props.showToast) props.showToast('Select a server first');
      return;
    }

    const selectedServer = props.availableServers.find(s => s.id === props.activeServer);
    if (!selectedServer) return;

    // IMDb-aware: resolve the final URL (this fetches the IMDb id from TMDB
    // /external_ids when the server is in IMDb mode). TMDB-mode servers are
    // resolved synchronously inside the same function.
    setResolving(true);
    if (props.onResolvingChange) props.onResolvingChange(true);
    try {
      const url = await resolveStreamingUrl(selectedServer, props.movie, props.showToast, {
        season: props.currentSeasonNumber,
        episode: props.currentEpisodeNumber,
        watchProgress: props.movie?.watchProgress,
      });

      if (!url) {
        if (props.showToast) props.showToast('Could not resolve playback URL');
        return;
      }

      if (props.onServerResolved) props.onServerResolved(url);
      startPlayback();
      setExpanded(false);
    } finally {
      setResolving(false);
      if (props.onResolvingChange) props.onResolvingChange(false);
    }
  };

  return (
    <div class="mb-6 bg-black/40 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/5 shadow-inner">
      {/* Header row */}
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

      {/* Collapsible server list */}
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
        </div>
      </Show>

      {/* Primary action button */}
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
          <span
            class="w-4 h-4 border-2 rounded-full animate-spin"
            style="border-color: var(--muted); border-top-color: var(--p)"
          />
          Resolving Node…
        </Show>
      </button>
    </div>
  );
}
