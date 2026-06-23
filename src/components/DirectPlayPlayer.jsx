import { onMount, onCleanup } from "solid-js";

import videojs from "video.js";
import "video.js/dist/video-js.css";

export function DirectPlayPlayer(props) {
  let videoRef;
  let player;

  onMount(() => {
    player = videojs(videoRef, {
      controls: true,
      autoplay: true,
      responsive: true,
      fluid: true,
      preload: "auto",
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controlBar: {
        pictureInPictureToggle: true,
      },
      sources: [
        {
          src: props.src,
          type: "video/mp4",
        },
      ],
    });

    player.ready(() => {
      if (props.startTime > 0) {
        player.currentTime(props.startTime);
      }
    });

    player.on("timeupdate", () => {
      if (!props.onProgress) return;

      props.onProgress({
        currentTime: player.currentTime(),
        duration: player.duration(),
      });
    });
  });

  onCleanup(() => {
    if (player) {
      player.dispose();
    }
  });

  return (
    <div class="w-full h-full bg-black">
      <div data-vjs-player>
        <video
          ref={videoRef}
          class="video-js vjs-big-play-centered"
          playsinline
        />
      </div>
    </div>
  );
}
