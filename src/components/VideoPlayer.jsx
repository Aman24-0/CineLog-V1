import { createEffect, onMount, onCleanup, createSignal } from 'solid-js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

/**
 * Video.js player component with auto-play and elegant controls
 */
export const VideoPlayer = (props) => {
  let videoRef;
  let playerInstance;
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  onMount(() => {
    // Initialize Video.js player
    playerInstance = videojs(videoRef, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      width: '100%',
      height: '100%',
      fluid: true,
      controlBar: {
        children: [
          'playToggle',
          'volumePanel',
          'currentTimeDisplay',
          'timeDivider',
          'durationDisplay',
          'progressControl',
          'remainingTimeDisplay',
          'playbackRateMenuButton',
          'fullscreenToggle',
        ],
      },
      sources: [
        {
          src: props.videoUrl,
          type: props.videoUrl.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4',
        },
      ],
      poster: props.poster,
    });

    // Handle fullscreen changes
    playerInstance.on('fullscreenchange', () => {
      setIsFullscreen(playerInstance.isFullscreen());
    });

    // Cleanup on unmount
    onCleanup(() => {
      if (playerInstance) {
        playerInstance.dispose();
      }
    });
  });

  // Update video source when props change
  createEffect(() => {
    if (playerInstance && props.videoUrl) {
      playerInstance.src({
        src: props.videoUrl,
        type: props.videoUrl.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4',
      });
      playerInstance.play();
    }
  });

  return (
    <div
      class="w-full bg-black rounded-2xl overflow-hidden"
      style={{
        aspectRatio: '16 / 9',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      <video
        ref={videoRef}
        class="video-js vjs-default-skin"
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {/* Custom overlay with movie info */}
      {!isFullscreen() && (
        <div
          class="absolute inset-0 pointer-events-none flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          style={{
            opacity: '0.8',
          }}
        >
          <h2 class="font-headline text-2xl text-white mb-2">
            {props.movieTitle}
          </h2>
          <p class="text-sm text-gray-300">
            {props.source === 'demo' ? '🎬 Demo Video' : '🎥 Now Playing'}
          </p>
        </div>
      )}

      <style>{`
        .video-js .vjs-control-bar {
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(12px);
        }

        .video-js .vjs-button > .vjs-icon-placeholder {
          font-size: 1.2em;
        }

        .video-js .vjs-progress-control {
          height: 8px;
        }

        .video-js .vjs-progress-holder {
          height: 8px;
        }

        .video-js .vjs-play-progress {
          background-color: var(--p);
          box-shadow: 0 0 10px var(--p-glow);
        }

        .video-js .vjs-load-progress {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .video-js .vjs-mouse-display {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .video-js:hover .vjs-control-bar {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
