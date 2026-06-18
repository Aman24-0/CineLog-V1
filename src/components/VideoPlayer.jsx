// src/components/VideoPlayer.jsx
import { createEffect, onMount, onCleanup, createSignal } from 'solid-js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoPlayer = (props) => {
  let videoRef;
  let playerInstance = null;
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  const isTorrent = () => {
    if (!props.videoUrl) return false;
    const url = props.videoUrl.toLowerCase();
    return url.startsWith('magnet:') || url.includes('.torrent');
  };

  // 🚀 Backend ke stream URL ko generate karna
  const getPlayableUrl = () => {
    if (isTorrent()) {
      // Backend (Render) URL automatically use hoga, localhost dev ke liye
      const backendUrl = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://cinelog-0py8.onrender.com');
      return `${backendUrl}/api/stream?magnet=${encodeURIComponent(props.videoUrl)}`;
    }
    return props.videoUrl;
  };

  const getVideoType = () => {
    return 'video/mp4'; // Hamara backend stream hamesha mp4 return karta hai
  };

  const initializePlayer = () => {
    if (!videoRef) return;

    if (playerInstance) {
      playerInstance.dispose();
      playerInstance = null;
    }

    const streamUrl = getPlayableUrl();

    playerInstance = videojs(videoRef, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      fluid: true,
      responsive: true,
      sources: [{ src: streamUrl, type: getVideoType() }],
      poster: props.poster,
    });

    playerInstance.on('fullscreenchange', () => {
      setIsFullscreen(playerInstance.isFullscreen());
    });
  };

  onMount(() => {
    initializePlayer();
    onCleanup(() => {
      if (playerInstance) playerInstance.dispose();
    });
  });

  createEffect(() => {
    const streamUrl = getPlayableUrl();
    if (streamUrl && playerInstance) {
      playerInstance.src({ src: streamUrl, type: getVideoType() });
      playerInstance.load();
      playerInstance.play().catch(e => console.warn("Autoplay block:", e));
    }
  });

  return (
    <div class="w-full bg-black rounded-2xl overflow-hidden relative" style={{ "aspect-ratio": '16 / 9', "box-shadow": '0 20px 60px rgba(0,0,0,0.5)' }}>
      
      <div data-vjs-player class="w-full h-full">
        <video ref={videoRef} class="video-js vjs-default-skin vjs-big-play-centered w-full h-full" playsinline />
      </div>

      {!isFullscreen() && (
        <div class="absolute inset-x-0 bottom-0 pointer-events-none flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" style={{ opacity: '0.9' }}>
          <h2 class="font-headline text-2xl text-white mb-1 shadow-sm">{props.movieTitle}</h2>
          <p class="text-xs font-semibold tracking-wider uppercase text-gray-400">
             🎥 Now Streaming Live
          </p>
        </div>
      )}

      <style>{`
        .video-js .vjs-control-bar { background-color: rgba(5, 6, 10, 0.8) !important; backdrop-filter: blur(16px); }
        .video-js .vjs-play-progress { background-color: var(--p) !important; box-shadow: 0 0 12px var(--p-glow); }
        .video-js .vjs-big-play-button { background-color: rgba(0, 0, 0, 0.5) !important; border-color: var(--p) !important; border-radius: 50% !important; width: 2.5em !important; height: 2.5em !important; margin-top: -1.25em !important; margin-left: -1.25em !important;}
        .video-js:hover .vjs-big-play-button { background-color: var(--p) !important; color: black !important; }
      `}</style>
    </div>
  );
};
