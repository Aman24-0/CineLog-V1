// src/components/DirectPlayPlayer.jsx
import { onMount, onCleanup, createSignal, createEffect } from "solid-js";

export function DirectPlayPlayer(props) {
  let videoRef;
  let progressTimer;

  // Smart Engine Signals
  const [isRefreshing, setIsRefreshing] = createSignal(false);
  const [showError, setShowError] = createSignal(false);
  let lastKnownTime = props.startTime || 0;

  // 🪄 JAB NAYA LINK AAYE TOH WAHI SE RESUME KARO
  createEffect(() => {
    if (props.src && isRefreshing()) {
      setIsRefreshing(false);
      setShowError(false);
      if (videoRef) {
        videoRef.load();
        videoRef.currentTime = lastKnownTime; // Exact wahi se start
        videoRef.play().catch(e => console.log("Auto-play prevented", e));
      }
    }
  });

  onMount(() => {
    if (!videoRef) return;

    // ✅ Screen Orientation unlock (Landscape allow)
    const unlockOrientation = async () => {
      try {
        if (screen.orientation?.unlock) screen.orientation.unlock();
        if (screen.lockOrientation) screen.lockOrientation('any');
        if (screen.mozLockOrientation) screen.mozLockOrientation('any');
        if (screen.msLockOrientation) screen.msLockOrientation('any');
      } catch (e) {
        console.log('Orientation unlock skipped:', e.message);
      }
    };
    unlockOrientation();

    // ✅ Fullscreen pe auto landscape
    const handleFullscreen = async () => {
      if (document.fullscreenElement) {
        try { await screen.orientation?.lock?.('landscape'); } catch (e) {}
      } else {
        try { screen.orientation?.unlock?.(); } catch (e) {}
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreen);

    // Initial Resume Time Set
    const handleLoadedMetadata = () => {
      if (lastKnownTime > 0) videoRef.currentTime = lastKnownTime;
    };
    videoRef.addEventListener("loadedmetadata", handleLoadedMetadata);

    // 🚀 THE SMART BRAIN: ERROR DETECTOR
    const handleError = () => {
      const err = videoRef.error;
      if (!err) return;

      // Codes: 2 (Network Error), 3 (Decode Error), 4 (Src Not Supported/403 Expired)
      if (err.code === 2 || err.code === 3 || err.code === 4) {
        console.warn("Stream Expired or Network Error! Initiating Auto-Fix...");
        
        if (props.onAutoRefresh) {
          setIsRefreshing(true);
          props.onAutoRefresh(); // Backend extractor ko dobara hit karo
        } else {
          setShowError(true); // Agar auto-refresh set nahi hai, toh user ko batao
        }
      }
    };
    videoRef.addEventListener("error", handleError);

    // Har second time track karo taaki crash hone pe wahi se chalu ho
    const handleTimeUpdate = () => {
       if (videoRef.currentTime > 0) lastKnownTime = videoRef.currentTime;
    };
    videoRef.addEventListener("timeupdate", handleTimeUpdate);

    progressTimer = setInterval(() => {
      if (props.onProgress && !videoRef.paused && !videoRef.ended) {
        props.onProgress({
          currentTime: videoRef.currentTime || 0,
          duration: videoRef.duration || 0,
        });
      }
    }, 3000);

    onCleanup(() => {
      clearInterval(progressTimer);
      document.removeEventListener('fullscreenchange', handleFullscreen);
      videoRef.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoRef.removeEventListener("error", handleError);
      videoRef.removeEventListener("timeupdate", handleTimeUpdate);
      try { screen.orientation?.unlock?.(); } catch (e) {}
    });
  });

  return (
    <div class="w-full h-full bg-black flex items-center justify-center relative">
      <video
        ref={videoRef}
        src={props.src}
        poster={props.poster}
        controls
        autoPlay
        preload="metadata"
        class="w-full max-h-screen bg-black"
        style="object-fit: contain"
      >
        {props.subtitleUrl && <track kind="subtitles" src={props.subtitleUrl} srclang="en" label="English" default />}
        {props.hindiSubtitleUrl && <track kind="subtitles" src={props.hindiSubtitleUrl} srclang="hi" label="Hindi" />}
      </video>

      {/* 🪄 AUTO-REFRESH LOADING OVERLAY */}
      <Show when={isRefreshing()}>
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in">
          <span class="material-symbols-outlined text-5xl text-[#3b82f6] animate-spin mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">sync</span>
          <h3 class="text-white font-black tracking-widest uppercase text-sm mb-1">Stream Expired... Auto-Fixing</h3>
          <p class="text-gray-400 text-xs font-bold uppercase tracking-widest">Extracting a fresh link in background ⏳</p>
        </div>
      </Show>

      {/* FALLBACK ERROR OVERLAY (If Auto-refresh is missing) */}
      <Show when={showError() && !isRefreshing()}>
        <div class="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50 animate-pop-in p-6 text-center backdrop-blur-lg">
          <span class="material-symbols-outlined text-6xl text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">error</span>
          <h3 class="text-white font-black text-xl mb-2 uppercase tracking-widest">Stream Expired</h3>
          <p class="text-gray-400 text-xs max-w-xs mb-8 font-bold leading-relaxed">
            The direct link token has expired. Close the player and click the 🪄 Magic Wand icon on your server to generate a new permanent link.
          </p>
        </div>
      </Show>
    </div>
  );
}
