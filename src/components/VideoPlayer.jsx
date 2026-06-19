import { createMemo, onCleanup, onMount } from 'solid-js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer(props) {
  let videoRef;
  let player;

  const streamUrl = createMemo(() => {
    if (!props.magnetLink) return null;

    // ✅ CRITICAL FIX: Construct the backend stream URL
    // Replace with your actual Render backend URL if different
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://cinelog-ultimate-backend.onrender.com';
    return `${BACKEND_URL}/api/stream?magnet=${encodeURIComponent(props.magnetLink)}`;
  });

  onMount(() => {
    const playableUrl = streamUrl();

    if (!playableUrl) {
      console.error('❌ No playable URL or magnet link provided to VideoPlayer');
      return;
    }

    console.log('🎬 Using Backend Stream URL:', playableUrl);

    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered', 'vjs-theme-city');
    videoRef.appendChild(videoElement);

    player = videojs(videoElement, {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      preload: 'metadata',
      sources: [{
        src: playableUrl,
        type: 'video/mp4', // We force MP4 as the backend streams it as such
      }],
      html5: {
        hls: {
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      },
    });

    // Debug Events
    player.on('error', () => {
      const error = player.error();
      console.error('❌ VIDEOJS ERROR:', error);
    });

    player.on('loadedmetadata', () => {
      console.log('✅ Metadata loaded. Duration:', player.duration());
    });

    player.on('waiting', () => {
      console.log('⏳ Buffering...');
    });

    player.on('playing', () => {
      console.log('▶️ Playing started.');
    });
  });

  onCleanup(() => {
    if (player) {
      player.dispose();
    }
  });

  return (
    <div class="w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
      <div ref={videoRef} class="w-full h-full" />
      {!streamUrl() && (
        <div class="p-8 text-center text-gray-300">
          <div class="mb-2 text-lg font-bold text-white">Unable to start playback</div>
          <p>No playable stream is available for this title. Please choose another source.</p>
        </div>
      )}
    </div>
  );
}
