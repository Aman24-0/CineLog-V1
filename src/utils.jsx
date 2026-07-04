export const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY;

const TMDB_PROVIDER_CACHE_MS = 7 * 24 * 60 * 60 * 1000;

export const fetchTmdbWatchProviders = async (mediaType, id) => {
  if (!id || !TMDB_KEY) return null;
  const type = mediaType === 'tv' ? 'tv' : 'movie';
  const cacheKey = `tmdb_providers_${type}_${id}`;

  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached?.timestamp && Date.now() - cached.timestamp < TMDB_PROVIDER_CACHE_MS) return cached.data;
  } catch (e) {}

  try {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${TMDB_KEY}`);
    if (!res.ok) return null;
    const data = await res.json();
    try { localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data })); } catch (e) {}
    return data;
  } catch (e) {
    return null;
  }
};

export const cleanPlatform = (p) => {
  if (!p) return null;
  const l = p.toLowerCase();
  if (l.includes('netflix')) return 'Netflix';
  if (l.includes('prime') || l.includes('amazon')) return 'Amazon Prime Video';
  if (l.includes('hotstar') || l.includes('jio') || l.includes('disney')) return 'JioHotstar';
  if (l.includes('sony') || l.includes('liv')) return 'Sony LIV';
  if (l.includes('zee')) return 'Zee5';
  if (l.includes('apple')) return 'Apple TV';
  if (l.includes('crunchyroll')) return 'Crunchyroll';
  return p.trim();
};

export const getSafeGenres = (m) =>
  m?.genresList || (typeof m?.genres === 'string' ? m.genres.split(',').map(s => s.trim()).filter(Boolean) : []) || [];

export const getSafePlatforms = (m) =>
  [...new Set((m?.platformsList || []).map(cleanPlatform).filter(Boolean))];

export const formatRuntime = (mins) => {
  if (!mins || mins <= 0) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`;
};

/**
 * Icon component — wraps Material Symbols Outlined.
 * aria-hidden defaults to "true" since icons are decorative in most cases.
 * Pass aria-hidden={false} and aria-label when the icon has standalone meaning.
 */
export const Icon = (props) => {
  const {
    name,
    fill,
    class: extraClass,
    style,
    'aria-hidden': ariaHidden = 'true',
    'aria-label': ariaLabel,
    ...rest
  } = props;

  return (
    <span
      class={`material-symbols-outlined${fill ? ' filled' : ''}${extraClass ? ' ' + extraClass : ''}`}
      style={style}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      {...rest}
    >
      {name}
    </span>
  );
};

/**
 * SafeInfoRow — used in detail panels for label/value pairs.
 * Grid layout: fixed 100px label column, flexible value column.
 */
export const SafeInfoRow = (props) => (
  <div class="grid grid-cols-[100px_1fr] items-start py-1.5 gap-2">
    <span
      class="type-label flex items-center gap-1.5 pt-0.5"
      style="color: rgba(156,163,175,0.75); flex-shrink: 0"
    >
      <Icon name={props.icon} class="text-[14px]" style="flex-shrink: 0" aria-hidden="true" />
      {props.label}
    </span>
    <div class="text-sm font-semibold text-gray-200 min-w-0">
      {props.value}
    </div>
  </div>
);
