// src/components/DirectPlayPlayer.jsx
import { onMount, onCleanup, createSignal, Show } from "solid-js";

export function DirectPlayPlayer(props) {
  let videoRef;
  let progressTimer;

  const [showError, setShowError] = createSignal(false);
  let lastKnownTime = props.startTime || 0;

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

    // Error detector
    const handleError = () => {
      const err = videoRef.error;
      if (!err) return;
      if (err.code === 2 || err.code === 3 || err.code === 4) {
        setShowError(true);
      }
    };
    videoRef.addEventListener("error", handleError);

    // Time tracker — crash hone pe wahi se resume
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
        src={props.url}
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

      {/* Error Overlay */}
      <Show when={showError()}>
        <div class="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50 animate-pop-in p-6 text-center backdrop-blur-lg">
          <span class="material-symbols-outlined text-6xl text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">error</span>
          <h3 class="text-white font-black text-xl mb-2 uppercase tracking-widest">Stream Error</h3>
          <p class="text-gray-400 text-xs max-w-xs mb-8 font-bold leading-relaxed">
            This stream is currently unavailable. Please try a different streaming node or try again later.
          </p>
        </div>
      </Show>
    </div>
  );
}
