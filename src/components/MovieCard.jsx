// src/components/MovieCard.jsx
import { createSignal, Show } from 'solid-js';
import { Icon, formatRuntime } from '../utils';

export const MovieCard = (props) => {
  const [imgLoaded, setImgLoaded] = createSignal(false);

  return (
    <div onClick={props.onClick} class="movie-card animate-fade-up">
      <div class="movie-card-inner">

        {/* Skeleton placeholder — visible until image loads */}
        <Show when={props.movie.poster_path && !imgLoaded()}>
          <div class="poster-loading" />
        </Show>

        <Show
          when={props.movie.poster_path}
          fallback={
            <div class="w-full h-full flex items-center justify-center skeleton-bg">
              <Icon name="movie" class="text-4xl" style="color: var(--dim)" />
            </div>
          }
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
            class={`w-full h-full object-cover transition-all duration-500 ${imgLoaded() ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        </Show>

        {/* Status badge */}
        <div class="absolute top-2 left-2 tag-chip" style="color: var(--p); z-index: 3">
          {props.movie.status === 'Plan to Watch' ? 'Planned' : (props.movie.status || 'NEW')}
        </div>

        {/* Tag / New season badge */}
        <Show when={props.movie.newSeasonAvailable} fallback={
          <Show when={props.movie.tag}>
            <div class="absolute top-2 right-2 tag-chip text-white max-w-[60px] truncate" style="z-index: 3">
              {props.movie.tag}
            </div>
          </Show>
        }>
          <div class="absolute top-2 right-2 tag-chip max-w-[88px] truncate"
            style="color: var(--p); background: rgba(0,0,0,0.72); border-color: var(--p); box-shadow: 0 0 14px var(--p-glow); z-index: 3">
            New Season
          </div>
        </Show>

        {/* Bottom info overlay */}
        <div class="absolute bottom-0 left-0 w-full p-3" style="z-index: 3">
          {/* Title */}
          <p class="type-card-title mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {props.movie.title || props.movie.name}
          </p>

          {/* Meta row */}
          <p class="type-subtitle mb-1.5">
            {(props.movie.release_date || props.movie.first_air_date || '').split('-')[0] || 'N/A'}
            {' · '}
            {props.movie.media_type === 'tv' ? 'Series' : 'Movie'}
            <Show when={props.movie.runtime > 0}>
              {' · '}{formatRuntime(props.movie.runtime)}
            </Show>
          </p>

          {/* Ratings row */}
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; width: 100%">
            <div style="display: flex; align-items: center; justify-content: center; gap: 2px; background: rgba(0,0,0,0.85); border: 1px solid rgba(245,197,24,0.5); border-radius: 6px; padding: 3px 2px">
              <Icon name="star" fill class="text-[9px]" style="color: #f5c518; font-size: 9px" />
              <span class="type-caption" style="color: #f5c518">{props.movie.imdbRating || '-'}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 2px; background: rgba(0,0,0,0.85); border: 1px solid rgba(255,100,100,0.5); border-radius: 6px; padding: 3px 2px">
              <span style="font-size: 9px">🍅</span>
              <span class="type-caption" style="color: #ff7070">{props.movie.rtRating || '-'}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 2px; background: rgba(0,0,0,0.85); border: 1px solid rgba(255,45,85,0.5); border-radius: 6px; padding: 3px 2px">
              <Icon name="person" fill class="text-[9px]" style="color: var(--p); font-size: 9px" />
              <span class="type-caption" style="color: var(--p)">{props.movie.rating || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
