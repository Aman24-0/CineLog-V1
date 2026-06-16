import { createSignal } from 'solid-js';
import { Icon } from '../utils';

/**
 * Movie result card displayed in search results
 * Shows poster, title, year, overview, and watch button
 */
export const MovieResultCard = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      class="group rounded-2xl overflow-hidden border transition-all duration-300 animate-pop-in"
      style={{
        borderColor: isHovered() ? 'var(--p)' : 'var(--border)',
        background: 'rgba(14,16,24,0.6)',
        backdropFilter: 'blur(12px)',
        transform: isHovered() ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered() ? '0 20px 40px rgba(0,0,0,0.4), 0 0 30px var(--p-glow)' : '0 4px 12px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div class="relative overflow-hidden bg-[#171921] aspect-[2/3]">
        {props.movie.poster ? (
          <>
            <img
              src={props.movie.poster}
              alt={props.movie.title}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div class="w-full h-full flex items-center justify-center">
            <Icon name="movie" class="text-5xl text-gray-600" />
          </div>
        )}

        {/* Rating Badge */}
        {props.movie.rating > 0 && (
          <div
            class="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white flex items-center gap-1 backdrop-blur-md"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid var(--border)',
            }}
          >
            <Icon name="star" fill class="text-[10px] text-yellow-400" />
            {props.movie.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div class="p-4">
        {/* Title and Year */}
        <h3 class="font-black text-sm text-white line-clamp-2 mb-1">
          {props.movie.title}
        </h3>
        <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">
          {props.movie.year}
        </p>

        {/* Overview */}
        <p class="text-xs text-gray-300 line-clamp-3 mb-4 leading-relaxed">
          {props.movie.overview}
        </p>

        {/* Watch Button */}
        <button
          onClick={() => props.onWatch(props.movie)}
          disabled={props.isLoading}
          class="w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: props.isLoading ? 'rgba(255,255,255,0.1)' : 'var(--p)',
            color: props.isLoading ? 'var(--dim)' : '#05060a',
            boxShadow: props.isLoading ? 'none' : '0 0 20px var(--p-glow)',
          }}
        >
          {props.isLoading ? (
            <>
              <Icon name="hourglass_empty" class="text-sm animate-spin" />
              Scraping...
            </>
          ) : (
            <>
              <Icon name="play_arrow" fill class="text-sm" />
              Watch
            </>
          )}
        </button>
      </div>
    </div>
  );
};
