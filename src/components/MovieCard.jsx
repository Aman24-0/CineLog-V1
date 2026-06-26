// src/components/MovieCard.jsx
import { Show } from 'solid-js';
import { Icon, formatRuntime } from '../utils';

export const MovieCard = (props) => (
  <div onClick={props.onClick} class="movie-card animate-fade-up">
    <div class="movie-card-inner">
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
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </Show>

      {/* Gradient overlay */}
      <div class="absolute inset-0 pointer-events-none"
        style="background: linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)" />

      {/* Status badge */}
      <div class="absolute top-2 left-2 tag-chip" style="color: var(--p)">
        {props.movie.status === 'Plan to Watch' ? 'Planned' : (props.movie.status || 'NEW')}
      </div>

      {/* Tag / New season badge */}
      <Show when={props.movie.newSeasonAvailable} fallback={
        <Show when={props.movie.tag}>
          <div class="absolute top-2 right-2 tag-chip text-white max-w-[60px] truncate">
            {props.movie.tag}
          </div>
        </Show>
      }>
        <div class="absolute top-2 right-2 tag-chip max-w-[88px] truncate"
          style="color: var(--p); background: rgba(0,0,0,0.72); border-color: var(--p); box-shadow: 0 0 14px var(--p-glow)">
          New Season
        </div>
      </Show>

      {/* Bottom info */}
      <div class="absolute bottom-0 left-0 w-full p-3">

        {/* Title */}
        <p style="font-size: 12px; font-weight: 700; color: #ffffff; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 1px 8px rgba(0,0,0,1)">
          {props.movie.title || props.movie.name}
        </p>

        {/* Meta: year · type · runtime */}
        <p style="font-size: 8px; font-weight: 600; color: #cccccc; margin-bottom: 6px; letter-spacing: 0.08em; text-transform: uppercase; text-shadow: 0 1px 6px rgba(0,0,0,1)">
          {(props.movie.release_date || props.movie.first_air_date || '').split('-')[0] || 'N/A'}
          {' · '}
          {props.movie.media_type === 'tv' ? 'Series' : 'Movie'}
          <Show when={props.movie.runtime > 0}>
            {' · '}{formatRuntime(props.movie.runtime)}
          </Show>
        </p>

        {/* Ratings row — NO class, pure inline */}
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; width: 100%">

          {/* IMDb */}
          <div style="display: flex; align-items: center; justify-content: center; gap: 2px; background: rgba(0,0,0,0.82); border: 1px solid rgba(245,197,24,0.45); border-radius: 6px; padding: 3px 2px">
            <Icon name="star" fill class="text-[9px]" style="color: #f5c518; font-size: 9px" />
            <span style="font-size: 9px; font-weight: 700; color: #f5c518">{props.movie.imdbRating || '-'}</span>
          </div>

          {/* RT */}
          <div style="display: flex; align-items: center; justify-content: center; gap: 2px; background: rgba(0,0,0,0.82); border: 1px solid rgba(255,100,100,0.45); border-radius: 6px; padding: 3px 2px">
            <span style="font-size: 9px">🍅</span>
            <span style="font-size: 9px; font-weight: 700; color: #ff7070">{props.movie.rtRating || '-'}</span>
          </div>

          {/* User rating */}
          <div style="display: flex; align-items: center; justify-content: center; gap: 2px; background: rgba(0,0,0,0.82); border: 1px solid rgba(255,45,85,0.45); border-radius: 6px; padding: 3px 2px">
            <Icon name="person" fill class="text-[9px]" style="color: var(--p); font-size: 9px" />
            <span style="font-size: 9px; font-weight: 700; color: var(--p)">{props.movie.rating || '-'}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
);
