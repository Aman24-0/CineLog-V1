import { Show } from 'solid-js';
import { Icon, formatRuntime } from '../utils';

export const MovieCard = (props) => (
  <div onClick={props.onClick} class="group cursor-pointer animate-pop-in relative">
    <div class="aspect-[2/3] rounded-3xl overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.5)] group-hover:-translate-y-2 transition-all duration-300 border border-white/10 group-hover:border-[var(--primary)]/50 bg-[#171921]">
      <Show when={props.movie.poster_path} fallback={<div class="w-full h-full flex items-center justify-center skeleton-bg"><Icon name="movie" class="text-4xl text-gray-600"/></div>}>
        <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      </Show>
      <div class="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100 pointer-events-none"></div>
      
      <div class="absolute top-2 left-2 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[8px] font-black text-[var(--primary)] uppercase tracking-wider">{props.movie.status === 'Plan to Watch' ? 'Planned' : (props.movie.status || 'NEW')}</div>
      <Show when={props.movie.tag}>
         <div class="absolute top-2 right-2 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full text-[8px] font-black text-white uppercase tracking-wider shadow-lg max-w-[60px] truncate">{props.movie.tag}</div>
      </Show>
      
      <div class="absolute bottom-0 left-0 w-full p-3 flex flex-col justify-end">
        <h4 class="text-xs font-black truncate text-white drop-shadow-md mb-1 leading-tight">{props.movie.title || props.movie.name}</h4>
        <p class="text-[9px] text-gray-300 font-bold mb-1 flex items-center gap-1 drop-shadow-md whitespace-nowrap overflow-hidden">
            {(props.movie.release_date||'').split('-')[0] || 'N/A'} • {props.movie.media_type === 'tv' ? 'Series' : 'Movie'} <Show when={props.movie.runtime > 0}>• {formatRuntime(props.movie.runtime)}</Show>
        </p>

        <div class="grid grid-cols-3 gap-1 mt-1 w-full">
            <span class="text-[8px] py-1 rounded-md bg-black/60 border border-white/5 font-black text-[#f5c518] flex items-center justify-center gap-0.5 shadow-sm truncate"><Icon name="star" class="text-[10px]" fill/> {props.movie.imdbRating || '-'}</span>
            <span class="text-[8px] py-1 rounded-md bg-black/60 border border-white/5 font-black text-red-500 flex items-center justify-center gap-0.5 shadow-sm truncate">🍅 {props.movie.rtRating || '-'}</span>
            <span class="text-[8px] py-1 rounded-md bg-[var(--primary)]/20 border border-[var(--primary)]/20 font-black text-[var(--primary)] flex items-center justify-center gap-0.5 shadow-sm truncate"><Icon name="person" class="text-[10px]" fill/> {props.movie.rating || '-'}</span>
        </div>
      </div>
    </div>
  </div>
);
