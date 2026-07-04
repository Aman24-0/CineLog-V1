import { Icon } from '../../utils';

export function RatingsPanel(props) {
  const imdbScore = () => props.omdbData?.imdb || '—';
  const rtScore   = () => props.omdbData?.rt   || '—';
  const myScore   = () => props.movie?.rating  ? `${props.movie.rating}/10` : '—';

  return (
    <div
      class="grid grid-cols-3 gap-3 my-6 w-full animate-fade-up"
      role="group"
      aria-label="Ratings"
    >
      {/* IMDb */}
      <div
        class="bg-black/40 backdrop-blur-md border border-white/10 py-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-md"
        role="img"
        aria-label={`IMDb score: ${imdbScore()}`}
      >
        <div class="flex items-center gap-1.5 mb-1.5" aria-hidden="true">
          <Icon name="star" fill class="text-[13px] text-[#f5c518]" />
          <span class="type-metadata font-black text-white">{imdbScore()}</span>
        </div>
        <span class="type-caption text-gray-500">IMDb</span>
      </div>

      {/* Rotten Tomatoes */}
      <div
        class="bg-black/40 backdrop-blur-md border border-white/10 py-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-md"
        role="img"
        aria-label={`Rotten Tomatoes score: ${rtScore()}`}
      >
        <div class="flex items-center gap-1.5 mb-1.5" aria-hidden="true">
          <span style="font-size: 13px; line-height: 1" aria-hidden="true">🍅</span>
          <span class="type-metadata font-black text-white">{rtScore()}</span>
        </div>
        <span class="type-caption text-gray-500">RT</span>
      </div>

      {/* Personal rating */}
      <div
        class="backdrop-blur-md border py-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-md"
        style="background: var(--p-dim); border-color: color-mix(in srgb, var(--p) 20%, transparent)"
        role="img"
        aria-label={`My score: ${myScore()}`}
      >
        <div class="flex items-center gap-1.5 mb-1.5" aria-hidden="true">
          <Icon name="person" fill class="text-[13px]" style="color: var(--p)" />
          <span class="type-metadata font-black" style="color: var(--p)">{myScore()}</span>
        </div>
        <span class="type-caption" style="color: var(--p); opacity: 0.65">My Score</span>
      </div>
    </div>
  );
}
