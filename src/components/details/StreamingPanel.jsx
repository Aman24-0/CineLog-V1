import { createSignal, Show, For } from 'solid-js';
import { Icon } from '../../utils';
import { saveDirectPlayUrl } from '../../services/watchlistService';

export function StreamingPanel(props) {
  const [expanded, setExpanded] = createSignal(false);

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
    // mt-4 = 16px = 2×8; mb-2 = 8px = 1×8
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

  const handleMainButtonClick = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!expanded()) { setExpanded(true); return; }
    if (!hasServerSelected()) { if (props.showToast) props.showToast("Select a server first"); return; }
    startPlayback();
    setExpanded(false);
  };

  const handleSaveUrl = async (e) => {
    e.stopPropagation();
    const url = props.directPlayUrl;
    const uid = props.uid;
    const movieId = props.movie?.id;
    if (uid && movieId) {
      try {
        await saveDirectPlayUrl(uid, movieId, url);
        if (props.showToast) props.showToast("URL saved for this movie!");
      } catch (err) {
        console.error('Save failed:', err);
        if (props.showToast) props.showToast("Save failed. Try again.");
      }
    } else {
      localStorage.setItem(`cinelog_direct_url_${movieId}`, url);
      if (props.showToast) props.showToast("URL saved locally!");
    }
    props.setIsEditingDirectUrl(false);
  };

  return (
    // mb-6 = 24px = 3×8; p-4 = 16px = 2×8
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

          {/* Direct Play row */}
          <div class="flex items-center gap-2 mt-4">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); props.setActiveServer('DIRECT_PLAY'); }}
              class="flex-1 flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl type-caption transition-all active:scale-95"
              style={props.activeServer === 'DIRECT_PLAY'
                ? 'border: 1px solid #3b82f6; background: rgba(59,130,246,0.15); color: #3b82f6; box-shadow: 0 0 10px rgba(59,130,246,0.3)'
                : 'border: 1px solid var(--border); background: var(--raised); color: var(--muted)'}
            >
              <Icon name="play_arrow" class="text-[13px] shrink-0" /> Direct Play
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); props.setIsEditingDirectUrl(!props.isEditingDirectUrl); }}
              class="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white shrink-0"
              title="Edit Custom URL"
            >
              <Icon name="edit" class="text-[13px]" />
            </button>
          </div>
        </div>

        {/* URL editor */}
        <Show when={props.isEditingDirectUrl}>
          <div class="flex gap-2 mt-2 px-1 mb-2 animate-fade-in">
            <input
              type="text"
              value={props.directPlayUrl}
              onInput={e => props.setDirectPlayUrl(e.target.value)}
              placeholder="Paste custom video URL here..."
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
        </Show>

        <Show when={!props.isEditingDirectUrl && props.directPlayUrl && props.activeServer === 'DIRECT_PLAY'}>
          <div class="type-caption text-[#3b82f6] mt-1 px-2 truncate mb-2 animate-fade-in" style="opacity: 0.8">
            Link: {props.directPlayUrl}
          </div>
        </Show>
      </Show>

      {/* Primary action button — mt-3 = 12px */}
      <button
        type="button"
        onClick={handleMainButtonClick}
        class="w-full mt-3 type-button py-4 rounded-xl active:scale-95 flex items-center justify-center gap-2"
        style={
          expanded() && !hasServerSelected()
            ? 'background: rgba(255,255,255,0.08); color: var(--muted); box-shadow: none;'
            : 'background: var(--p); color: #05060a; box-shadow: 0 0 24px var(--p-glow)'
        }
      >
        <Icon name="play_circle" fill class="text-[18px]" />
        {props.movie?.watchProgress && props.movie.watchProgress.currentTime > 0 ? 'Resume Movie' : 'Watch Now'}
      </button>
    </div>
  );
}
