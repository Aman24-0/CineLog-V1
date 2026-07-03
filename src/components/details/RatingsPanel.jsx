import { Icon } from '../../utils';

export function RatingsPanel(props) {
  return (
    // my-6 = 24px = 3×8 (was my-5 = 20px — not on grid)
    <div class="grid grid-cols-3 gap-3 my-6 w-full animate-fade-up">
      {/* IMDb */}
      <div class="bg-black/40 backdrop-blur-md border border-white/10 py-3 rounded-xl flex flex-col items-center justify-center text-center shadow-md">
        <div class="flex items-center gap-1 mb-1">
          <Icon name="star" fill class="text-[11px] text-[#f5c518]"/>
          <span class="type-metadata font-black text-white">{props.omdbData?.imdb || '-'}</span>
        </div>
        <span class="type-caption text-gray-500">IMDb</span>
      </div>

      {/* Rotten Tomatoes */}
      <div class="bg-black/40 backdrop-blur-md border border-white/10 py-3 rounded-xl flex flex-col items-center justify-center text-center shadow-md">
        <div class="flex items-center gap-1 mb-1">
          <span style="font-size: 11px">🍅</span>
          <span class="type-metadata font-black text-white">{props.omdbData?.rt || '-'}</span>
        </div>
        <span class="type-caption text-gray-500">RT</span>
      </div>

      {/* Personal rating */}
      <div class="backdrop-blur-md border py-3 rounded-xl flex flex-col items-center justify-center text-center shadow-md"
        style="background: var(--p-dim); border-color: color-mix(in srgb, var(--p) 20%, transparent)">
        <div class="flex items-center gap-1 mb-1">
          <Icon name="person" fill class="text-[11px]" style="color: var(--p)"/>
          <span class="type-metadata font-black" style="color: var(--p)">
            {props.movie?.rating ? `${props.movie.rating}/10` : '-'}
          </span>
        </div>
        <span class="type-caption" style="color: var(--p); opacity: 0.7">My Score</span>
      </div>
    </div>
  );
}
