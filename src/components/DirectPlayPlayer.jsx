// src/components/DirectPlayPlayer.jsx
import { onMount, onCleanup } from "solid-js";

export function DirectPlayPlayer(props) {
  let videoRef;
  let progressTimer;

  onMount(() => {
    if (!videoRef) return;

    // ✅ Screen Orientation unlock karo — landscape allow hoga
    const unlockOrientation = async () => {
      try {
        // Modern API
        if (screen.orientation?.unlock) {
          screen.orientation.unlock();
        }
        // Purana Android WebView fallback
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
        try {
          await screen.orientation?.lock?.('landscape');
        } catch (e) {
          // Browser ne allow nahi kiya — theek hai
        }
      } else {
        try {
          screen.orientation?.unlock?.();
        } catch (e) {}
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreen);

    const handleLoadedMetadata = () => {
      if (props.startTime > 0) {
        videoRef.currentTime = props.startTime;
      }
    };
    videoRef.addEventListener("loadedmetadata", handleLoadedMetadata);

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
      // Page se bahar jaane pe portrait restore karo
      try { screen.orientation?.unlock?.(); } catch (e) {}
    });
  });

  return (
    <div class="w-full h-full bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={props.src}
        poster={props.poster}
        controls
        autoPlay
        // ✅ playsInline HATA DIYA — yahi portrait lock karta tha
        // playsInline  ← removed
        preload="metadata"
        class="w-full max-h-screen bg-black"
        style="object-fit: contain"
      >
        {props.subtitleUrl && (
          <track kind="subtitles" src={props.subtitleUrl} srclang="en" label="English" default />
        )}
        {props.hindiSubtitleUrl && (
          <track kind="subtitles" src={props.hindiSubtitleUrl} srclang="hi" label="Hindi" />
        )}
      </video>
    </div>
  );
}
