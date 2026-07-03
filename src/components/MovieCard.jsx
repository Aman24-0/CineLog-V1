import { createSignal, Show } from 'solid-js';
import { Icon, formatRuntime } from '../utils';

export const MovieCard = (props) => {
  const [imgLoaded, setImgLoaded] = createSignal(false);

  return (
    <div onClick={props.onClick} class="movie-card animate-fade-up">
      <div class="movie-card-inner">

        <Show when={!imgLoaded()}>
          <div class={`poster-loading${imgLoaded() ? ' hidden' : ''}`}>
            <div style="
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              display: flex; flex-direction: column; align-items: center; gap: 8px;
              opacity: 0.12;
            ">
              <span class="material-symbols-outlined" style="font-size: 28px; color: white">movie</span>
            </div>
          </div>
        </Show>

        <Show
          when={props.movie.poster_path}
          fallback={
            <div class="w-full h-full flex flex-col items-center justify-center gap-2"
              style="background: linear-gradient(145deg, #1a1a1a, #111)">
              <Icon name="movie" style="color: rgba(255,255,255,0.08); font-size: 36px" />
              <span style="color: rgba(255,255,255,0.08); font-size: 8px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Azeret Mono', monospace">No Poster</span>
            </div>
          }
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
            class={`movie-card-inner img${imgLoaded() ? ' img-loaded' : ''}`}
            style="position: absolute; inset: 0; width: 100%; height: 100%"
            loading="lazy"
            onLoad={(e) => {
              setImgLoaded(true);
              e.target.classList.add('img-loaded');
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </Show>

        {/* Status badge — top-left */}
        <div class="tag-chip absolute top-2 left-2" style="color: var(--p); z-index: 3">
          {props.movie.status === 'Plan to Watch' ? 'Planned' : (props.movie.status || 'NEW')}
        </div>

        {/* Tag / New season badge — top-right */}
        <Show when={props.movie.newSeasonAvailable} fallback={
          <Show when={props.movie.tag}>
            <div class="tag-chip absolute top-2 right-2 max-w-[64px] truncate text-white" style="z-index: 3">
              {props.movie.tag}
            </div>
          </Show>
        }>
          <div
            class="tag-chip absolute top-2 right-2 max-w-[88px] truncate"
            style="color: var(--p); border-color: color-mix(in srgb, var(--p) 55%, transparent); box-shadow: 0 0 12px var(--p-glow); z-index: 3"
          >
            New Season
          </div>
        </Show>

        {/* Bottom info area — reduced padding for compact rating pills */}
        <div class="absolute bottom-0 left-0 w-full p-2" style="z-index: 3">

          {/* Title */}
          <p class="type-card-title mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
            {props.movie.title || props.movie.name}
          </p>

          {/* Year · Type · Runtime */}
          <p class="type-subtitle mb-1">
            {(props.movie.release_date || props.movie.first_air_date || '').split('-')[0] || 'N/A'}
            {' · '}
            {props.movie.media_type === 'tv' ? 'Series' : 'Movie'}
            <Show when={props.movie.runtime > 0}>
              {' · '}{formatRuntime(props.movie.runtime)}
            </Show>
          </p>

          {/* Compact rating pills — inline styles override .rating-pill defaults to fit narrow cards */}
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; width: 100%">

            {/* IMDb */}
            <div class="rating-pill justify-center" style="border-color: rgba(245,197,24,0.3); padding: 1px 2px; font-size: 7px; gap: 1px; border-radius: 4px">
              <Icon name="star" fill style="color: #f5c518; font-size: 6px" />
              <span style="color: #f5c518; font-size: 7px; font-weight: 700; line-height: 1; font-family: 'Outfit', sans-serif">
                {props.movie.imdbRating || '-'}
              </span>
            </div>

            {/* Rotten Tomatoes */}
            <div class="rating-pill justify-center" style="border-color: rgba(255,90,80,0.3); padding: 1px 2px; font-size: 7px; gap: 1px; border-radius: 4px">
              <span style="font-size: 6px; line-height: 1">🍅</span>
              <span style="color: #ff7878; font-size: 7px; font-weight: 700; line-height: 1; font-family: 'Outfit', sans-serif">
                {props.movie.rtRating || '-'}
              </span>
            </div>

            {/* Personal score */}
            <div class="rating-pill justify-center" style="border-color: color-mix(in srgb, var(--p) 35%, transparent); padding: 1px 2px; font-size: 7px; gap: 1px; border-radius: 4px">
              <Icon name="person" fill style="color: var(--p); font-size: 6px" />
              <span style="color: var(--p); font-size: 7px; font-weight: 700; line-height: 1; font-family: 'Outfit', sans-serif">
                {props.movie.rating || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
