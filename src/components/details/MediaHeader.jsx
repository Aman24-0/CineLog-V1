import { Show } from 'solid-js';
import { Icon, formatRuntime, getSafeGenres } from '../../utils';

export function MediaHeader(props) {

  const handleShare = async () => {
    const title = props.movie?.title || props.movie?.name || 'Unknown Title';
    const isTv = props.movie?.media_type === 'tv';
    const typeIcon = isTv ? '📺' : '🎬';
    const releaseDate = props.movie?.release_date || props.details?.release_date || props.movie?.first_air_date || 'TBA';
    const imdb = props.movie?.imdbRating && props.movie.imdbRating !== '-'
      ? props.movie.imdbRating
      : (props.details?.vote_average ? props.details.vote_average.toFixed(1) : 'N/A');
    const rt = props.movie?.rtRating && props.movie.rtRating !== '-' ? `${props.movie.rtRating}%` : 'N/A';
    const genresList = props.details?.genres?.map(g => g.name) || getSafeGenres(props.movie) || [];
    const genres = genresList.length > 0 ? genresList.join(', ') : 'N/A';
    const overview = props.details?.overview || props.movie?.overview || 'No overview available.';
    const shareText = `${typeIcon} *${title}*\n\n📅 *Release:* ${releaseDate}\n⭐ *IMDb:* ${imdb}/10\n🍅 *Rotten Tomatoes:* ${rt}\n🏷️ *${genres}*\n\n📖 *Synopsis*\n${overview}\n\n📌 *Track your watch progress on CineLog:*\nhttps://cinlog.netlify.app`;

    if (navigator.share) {
      try {
        if (props.showToast) props.showToast('Preparing poster… ⏳', 'info', 2000);
        let shareData = { text: shareText };
        if (props.movie?.poster_path) {
          try {
            const response = await fetch(`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`);
            const blob = await response.blob();
            const file = new File([blob], 'poster.jpg', { type: 'image/jpeg' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) shareData.files = [file];
          } catch (imgErr) {
            console.log('Could not fetch image for sharing', imgErr);
          }
        }
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') console.log('Share failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        if (props.showToast) props.showToast('Details copied to clipboard! 📋', 'success');
      } catch {
        if (props.showToast) props.showToast('Could not copy to clipboard.', 'error');
      }
    }
  };

  const runtime = () => props.details?.runtime || props.details?.episode_run_time?.[0];
  const releaseYear = () => {
    const d = props.movie?.release_date || props.details?.release_date || props.movie?.first_air_date;
    return d || 'TBA';
  };
  const mediaTypeLabel = () => props.movie?.media_type === 'tv' ? 'SERIES' : 'MOVIE';
  const titleText = () => props.movie?.title || props.movie?.name || '';

  return (
    <>
      {/* ── BACKDROP / TRAILER AREA ─────────────────────────────── */}
      <div class="h-56 md:h-72 relative bg-black shrink-0 overflow-hidden" aria-label={`Backdrop for ${titleText()}`}>
        <Show
          when={!props.playTrailer}
          fallback={
            <iframe
              class="w-full h-full absolute inset-0 z-10"
              src={`https://www.youtube.com/embed/${props.trailerKey}?autoplay=1&rel=0`}
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
              title={`${titleText()} — Official Trailer`}
            />
          }
        >
          <Show
            when={props.movie?.backdrop_path}
            fallback={
              <div
                class="w-full h-full flex items-center justify-center"
                style="background: linear-gradient(145deg, #181818, #0e0e0e)"
                aria-hidden="true"
              >
                <Show
                  when={props.movie?.poster_path}
                  fallback={
                    <Icon name="movie" style="color: rgba(255,255,255,0.06); font-size: 56px" />
                  }
                >
                  {/* Blurred poster as ambient fill when no backdrop exists */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
                    class="backdrop-ambient"
                    onLoad={e => e.target.classList.add('img-loaded')}
                    alt=""
                    aria-hidden="true"
                  />
                </Show>
              </div>
            }
          >
            {/* Backdrop image — cinematic reveal */}
            <img
              src={`https://image.tmdb.org/t/p/original${props.movie?.backdrop_path}`}
              class="backdrop-img absolute inset-0"
              onLoad={e => e.target.classList.add('img-loaded')}
              alt=""
              aria-hidden="true"
            />
          </Show>

          {/* Cinematic gradient — always rendered over image */}
          <div class="backdrop-gradient" aria-hidden="true" />

          {/* Trailer play button */}
          <Show when={props.trailerKey}>
            <button
              onClick={() => props.setPlayTrailer(true)}
              class="absolute inset-0 flex items-center justify-center z-10 group"
              style="background: transparent"
              aria-label={`Play trailer for ${titleText()}`}
            >
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-200"
                style="
                  background: rgba(0,0,0,0.55);
                  backdrop-filter: blur(12px);
                  border-color: rgba(255,255,255,0.15);
                  box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.6);
                "
                aria-hidden="true"
              >
                <Icon name="play_arrow" fill class="text-white text-4xl" />
              </div>
              {/* Hover ring */}
              <div
                class="absolute w-16 h-16 rounded-full border-2 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                style="border-color: color-mix(in srgb, var(--p) 60%, transparent)"
                aria-hidden="true"
              />
            </button>
          </Show>

          {/* No video badge */}
          <Show when={!props.trailerKey}>
            <div
              class="absolute bottom-3 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5"
              aria-hidden="true"
            >
              <span class="type-caption text-gray-500">No Trailer Available</span>
            </div>
          </Show>
        </Show>
      </div>

      {/* ── TITLE ROW — pulled up over backdrop ─────────────────── */}
      <div class="px-6 md:px-8 -mt-16 relative z-10 flex justify-between items-start mb-3">
        <div class="pr-3 flex-1 min-w-0">
          {/* Title — clamp to prevent overflow */}
          <h2
            class="type-modal-title leading-tight"
            style="text-shadow: 0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word"
          >
            {titleText()}
          </h2>

          {/* Meta subtitle */}
          <p class="type-subtitle mt-1.5" aria-label={`${releaseYear()}, ${mediaTypeLabel()}${runtime() ? ', ' + formatRuntime(runtime()) : ''}`}>
            {releaseYear()}
            {' · '}
            {mediaTypeLabel()}
            <Show when={runtime()}>
              {' · '}{formatRuntime(runtime())}
            </Show>
          </p>
        </div>

        {/* Action buttons */}
        <div class="flex items-center gap-2 shrink-0 mt-1" role="group" aria-label="Actions">

          {/* Share */}
          <button
            onClick={handleShare}
            class="w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
            style="background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(8px); color: #9ca3af; box-shadow: 0 2px 8px rgba(0,0,0,0.4)"
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
              e.currentTarget.style.color = '#9ca3af';
            }}
            aria-label={`Share ${titleText()}`}
            title="Share"
          >
            <Icon name="share" class="text-sm" aria-hidden="true" />
          </button>

          {/* Edit toggle — only for vault items */}
          <Show when={!props.isPreview}>
            <button
              onClick={() => {
                if (props.isGuest) {
                  if (props.showToast) props.showToast('Sign in to edit! 🔒', 'info');
                  if (props.onLogin) props.onLogin();
                  return;
                }
                props.setIsEdit(!props.isEdit);
              }}
              class="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={props.isEdit
                ? 'background: var(--p); color: #000; border: 1px solid var(--p); box-shadow: 0 0 16px var(--p-glow), 0 4px 12px rgba(0,0,0,0.4)'
                : 'background: rgba(255,255,255,0.07); color: #9ca3af; border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(8px); box-shadow: 0 2px 8px rgba(0,0,0,0.4)'}
              aria-label={props.isEdit ? 'Exit edit mode' : 'Edit this entry'}
              aria-pressed={props.isEdit}
              title={props.isEdit ? 'Done editing' : 'Edit'}
            >
              <Icon name={props.isEdit ? 'check' : 'edit'} class="text-sm" aria-hidden="true" />
            </button>
          </Show>
        </div>
      </div>
    </>
  );
}
