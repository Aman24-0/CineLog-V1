import { Show, For, createSignal } from 'solid-js';
import { Icon } from '../../utils';
import { saveDirectPlayUrl } from '../../services/watchlistService';

export function StreamingPanel(props) {
  const [isExtracting, setIsExtracting] = createSignal(null); // Tracks which server is being extracted

  // Category Filtering
  const multiList = () => props.availableServers.filter(s => s.type === 'multi');
  const orgList = () => props.availableServers.filter(s => s.type === 'org');

  // URL Generator for Extraction
  const getRawUrl = (srv) => {
    const id = props.movie?.id;
    const s = props.movie?.media_type === 'tv' ? (props.movie?.season || 1) : 1;
    const ep = props.movie?.media_type === 'tv' ? (props.movie?.episode || 1) : 1;
    const type = props.movie?.media_type === 'tv' ? 'tv' : 'movie';
    
    const urlTemplate = type === 'tv' ? srv.tvUrl : srv.movieUrl;
    if (!urlTemplate) return '';
    return urlTemplate
      .replace(/\{id\}|\[TMDB_ID\]/gi, id)
      .replace(/\{season\}|\[SEASON\]/gi, s)
      .replace(/\{episode\}|\[EPISODE\]/gi, ep);
  };

  // 🚀 THE MAGIC EXTRACTOR FUNCTION
  const handleExtract = async (e, srv) => {
    e.stopPropagation();
    if (isExtracting()) return;

    const targetUrl = getRawUrl(srv);
    if (!targetUrl) {
      if (props.showToast) props.showToast("Invalid URL template for this node.");
      return;
    }

    setIsExtracting(srv.id);
    if (props.showToast) props.showToast(`Extracting link from ${srv.name}... ⏳`);

    try {
      // Netlify function call
      const res = await fetch(`/.netlify/functions/extract?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();

      if (data.success && data.streamUrl) {
        // Success! Set the extracted URL to Direct Play
        props.setDirectPlayUrl(data.streamUrl);
        props.setActiveServer('DIRECT_PLAY');
        
        // Save permanently to Database
        if (props.uid && props.movie?.id) {
          await saveDirectPlayUrl(props.uid, props.movie.id, data.streamUrl);
        } else {
          localStorage.setItem(`cinelog_direct_url_${props.movie?.id}`, data.streamUrl);
        }
        
        if (props.showToast) props.showToast("✨ Stream Extracted & Saved!");
      } else {
        if (props.showToast) props.showToast("Extraction failed. Try another node.");
      }
    } catch (err) {
      console.error(err);
      if (props.showToast) props.showToast("Server error during extraction.");
    }
    
    setIsExtracting(null);
  };

  const Chip = (srv) => (
    <div class="flex items-center w-full rounded-xl transition-all overflow-hidden"
         style={props.activeServer === srv.id
          ? 'border: 1px solid var(--p); background: var(--p-dim); box-shadow: 0 0 10px var(--p-glow)'
          : 'border: 1px solid var(--border); background: var(--raised);'}>
      
      {/* Standard Server Play Button (Iframe Fallback) */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); props.setActiveServer(srv.id); }}
        class="flex-1 flex items-center gap-1.5 h-9 px-2 text-[9px] font-black uppercase tracking-widest active:scale-95 truncate"
        style={{ color: props.activeServer === srv.id ? 'var(--p)' : 'var(--muted)' }}>
        <Icon name={srv.icon || 'dns'} class="text-[13px] shrink-0" />
        <span class="truncate">{srv.name}</span>
      </button>

      {/* 🪄 Magic Extract Button */}
      <button
        type="button"
        onClick={(e) => handleExtract(e, srv)}
        title="Auto-Extract Direct Link"
        class="w-9 h-9 flex items-center justify-center border-l hover:bg-white/10 active:scale-95 transition-all shrink-0"
        style={{ "border-color": props.activeServer === srv.id ? 'var(--p)' : 'var(--border)' }}>
        <Show when={isExtracting() === srv.id} fallback={<Icon name="auto_fix_high" class="text-[14px] text-yellow-400 drop-shadow-md" />}>
          <Icon name="sync" class="text-[14px] animate-spin text-white" />
        </Show>
      </button>
    </div>
  );

  const GroupLabel = (label) => (
    <div class="flex items-center gap-2 mt-3 mb-1.5">
      <span class="text-[8px] font-black uppercase tracking-[0.18em] shrink-0" style="color: var(--muted)">{label}</span>
      <div class="flex-1 h-px" style="background: var(--border)" />
    </div>
  );

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div class="mb-6 bg-black/40 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/5 shadow-inner">
      <div class="flex justify-between items-center mb-3 px-1">
        <span class="text-[9px] uppercase font-black text-gray-400 tracking-widest flex items-center gap-1.5">
          <Icon name="router" class="text-[12px] text-[var(--p)]" /> Streaming Node
        </span>
      </div>
      <div class="pb-1">
        
        {/* Dynamic Categories with Magic Extractors */}
        <Show when={multiList().length > 0}>{GroupLabel('🌍 Multi Audio')}<div class="grid grid-cols-2 gap-1.5"><For each={multiList()}>{(srv) => <div>{Chip(srv)}</div>}</For></div></Show>
        <Show when={orgList().length > 0}>{GroupLabel('🎭 Org Audio')}<div class="grid grid-cols-2 gap-1.5"><For each={orgList()}>{(srv) => <div>{Chip(srv)}</div>}</For></div></Show>

        <Show when={multiList().length === 0 && orgList().length === 0}>
          <div class="text-center py-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest border border-dashed border-white/5 rounded-xl mb-3">
            No Servers Configured
          </div>
        </Show>

        <div class="flex items-center gap-2 mt-3">
          <button type="button" onClick={(e) => { e.stopPropagation(); props.setActiveServer('DIRECT_PLAY'); }}
            class="flex-1 flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95"
            style={props.activeServer === 'DIRECT_PLAY'
              ? 'border: 1px solid #3b82f6; background: rgba(59,130,246,0.15); color: #3b82f6; box-shadow: 0 0 10px rgba(59,130,246,0.3)'
              : 'border: 1px solid var(--border); background: var(--raised); color: var(--muted)'}>
            <Icon name="play_arrow" class="text-[13px] shrink-0" /> Direct Play
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); props.setIsEditingDirectUrl(!props.isEditingDirectUrl); }}
            class="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors shrink-0" title="Edit Custom URL">
            <Icon name="edit" class="text-[13px]" />
          </button>
        </div>
      </div>

      <Show when={props.isEditingDirectUrl}>
        <div class="flex gap-2 mt-1 px-1 mb-2 animate-fade-in">
          <input
            type="text"
            value={props.directPlayUrl}
            onInput={e => props.setDirectPlayUrl(e.target.value)}
            placeholder="Paste custom video URL here..."
            class="flex-1 bg-[#0c0e14] border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-[#3b82f6] transition-colors"
          />
          <button type="button" onClick={handleSaveUrl}
            class="bg-[#3b82f6] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
            Save
          </button>
        </div>
      </Show>

      <Show when={!props.isEditingDirectUrl && props.directPlayUrl && props.activeServer === 'DIRECT_PLAY'}>
        <div class="text-[9px] text-[#3b82f6] mt-1 px-2 truncate mb-2 animate-fade-in opacity-80">
          Link: {props.directPlayUrl}
        </div>
      </Show>

      <button type="button" onClick={handlePlayClick}
        class="w-full mt-3 font-black py-4 rounded-xl uppercase text-[11px] tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
        style="background: var(--p); color: #05060a; box-shadow: 0 0 24px var(--p-glow)">
        <Icon name="play_circle" fill class="text-[18px]" />
        {props.movie?.watchProgress && props.movie.watchProgress.currentTime > 0 ? 'Resume Movie' : 'Watch Now'}
      </button>
    </div>
  );
}
