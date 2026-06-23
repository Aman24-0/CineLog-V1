// src/components/DirectPlayPlayer.jsx
import { onMount, onCleanup, Show } from "solid-js";

// Vidstack CSS & Components (Yeh import zaroori hain UI ke liye)
import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/video.css";
import "vidstack/player";
import "vidstack/player/layouts/default";
import "vidstack/player/ui";

export function DirectPlayPlayer(props) {
  let playerRef;

  onMount(() => {
    if (!playerRef) return;

    // 1. Resume from saved position
    if (props.startTime > 0) {
      playerRef.currentTime = props.startTime;
    }

    // 2. Save Progress (Continue Watching)
    const handleTimeUpdate = (event) => {
      if (props.onProgress) {
        props.onProgress({
          currentTime: event.detail.currentTime,
          duration: playerRef.duration || event.detail.duration || 0,
        });
      }
    };

    playerRef.addEventListener("time-update", handleTimeUpdate);

    onCleanup(() => {
      playerRef.removeEventListener("time-update", handleTimeUpdate);
    });
  });

  return (
    <media-player
      ref={playerRef}
      class="w-full h-full bg-black text-white outline-none"
      title={props.title}
      src={props.src}
      crossorigin="anonymous"
      playsinline
      autoplay
    >
      <media-provider>
        <Show when={props.poster}>
          <media-poster class="vds-poster object-cover" src={props.poster}></media-poster>
        </Show>
      </media-provider>
      
      {/* 🚀 Vidstack's Default Layout automatically includes:
          - Double Tap to Seek (Left/Right)
          - Long Press for 2x Speed
          - Fullscreen & PiP controls
          - Mobile optimized UI */}
      <media-video-layout></media-video-layout>
    </media-player>
  );
}
