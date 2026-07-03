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
    const shareText = `${typeIcon} *${title}*\n\n📅 *Release:* ${releaseDate}\n⭐ *IMDb:* ${imdb}/10\n🍅 *Rotten Tomatoes:* ${rt}\n🏷️ *${genres}*\n\n📖 *Synopsis*\n${overview}\n\n📌 *Track your watch progress on Cinelog:*\nhttps://cinlog.netlify.app`;

    if (navigator.share) {
      try {
        if (props.showToast) props.showToast("Preparing poster... ⏳");
        let shareData = { text: shareText };
        if (props.movie?.poster_path) {
          try {
            const response = await fetch(`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`);
            const blob = await response.blob();
            const file = new File([blob], 'poster.jpg', { type: 'image/jpeg' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) shareData.files = [file];
          } catch (imgErr) { console.log("Could not fetch image for sharing", imgErr); }
        }
        await navigator.share(shareData);
      } catch (err) { console.log("Share cancelled or failed", err); }
    } else {
      navigator.clipboard.writeText(shareText);
      if (props.showToast) props.showToast("Details copied to clipboard! 📋");
    }
  };

  return (
    <>
      {/* ── BACKDROP / TRAILER AREA ─────────────────────────────── */}
      <div class="h-56 md:h-72 relative bg-black shrink-0 overflow-hidden">
        <Show
          when={!props.playTrailer}
          fallback={
            <iframe
              class="w-full h-full absolute inset-0 z-10"
              src={`https://www.youtube.com/embed/${props.trailerKey}?autoplay=1&rel=0`}
              frameborder="0"
              allowfullscreen
            />
          }
        >
          <Show
            when={props.movie?.backdrop_path}
            fallback={
              /* No backdrop — styled placeholder with poster fallback */
              <div class="w-full h-full flex items-center justify-center"
                style="background: linear-gradient(145deg, #181818, #0e0e0e)">
                <Show when={props.movie?.poster_path} fallback={
                  <Icon name="movie" style="color: rgba(255,255,255,0.06); font-size: 56px" />
                }>
                  {/* Blurred poster as ambient fill when no backdrop exists */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
                    class="backdrop-ambient"
                    onLoad={e => e.target.classList.add('img-loaded')}
                    alt=""
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
            />
          </Show>

          {/* Cinematic gradient — always rendered over image */}
          <div class="backdrop-gradient" />

          {/* Trailer play button */}
          <Show when={props.trailerKey}>
            <button
              onClick={() => props.setPlayTrailer(true)}
              class="absolute inset-0 flex items-center justify-center z-10 group"
              style="background: transparent"
            >
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center border active:scale-95"
                style="
                  background: rgba(0,0,0,0.55);
                  backdrop-filter: blur(12px);
                  border-color: rgba(255,255,255,0.15);
                  box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.6);
                  transition: transform 220ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 220ms ease-out, border-color 220ms ease-out;
                "
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.12)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.12), 0 0 24px var(--p-glow), 0 12px 40px rgba(0,0,0,0.7)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.6)';
                }}
              >
                <Icon name="play_arrow" fill class="text-white text-4xl" />
              </div>
            </button>
          </Show>
        </Show>
      </div>

      {/* ── TITLE ROW — pulled up over backdrop ─────────────────── */}
      <div class="px-6 md:px-8 -mt-16 relative z-10 flex justify-between items-start mb-3">
        <div class="pr-3 flex-1 min-w-0">
          <h2 class="type-modal-title leading-tight"
            style="text-shadow: 0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)">
            {props.movie?.title || props.movie?.name}
          </h2>
          <p class="type-subtitle mt-1.5">
            {props.movie?.release_date || props.details?.release_date || 'N/A'}
            {' · '}
            {props.movie?.media_type === 'tv' ? 'SERIES' : 'MOVIE'}
            <Show when={props.details?.runtime || props.details?.episode_run_time?.[0]}>
              {' · '}{formatRuntime(props.details?.runtime || props.details?.episode_run_time?.[0])}
            </Show>
          </p>
        </div>

        {/* Action buttons */}
        <div class="flex items-center gap-2 shrink-0 mt-1">
          {/* Share */}
          <button
            onClick={handleShare}
            class="w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
            style="background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(8px); color: #9ca3af; box-shadow: 0 2px 8px rgba(0,0,0,0.4); transition: background 150ms ease-out, border-color 150ms ease-out, color 150ms ease-out"
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = '#9ca3af'; }}
            title="Share"
          >
            <Icon name="share" class="text-sm" />
          </button>

          {/* Edit toggle */}
          <Show when={!props.isPreview}>
            <button
              onClick={() => {
                if (props.isGuest) {
                  if (props.showToast) props.showToast("Sign in to edit! 🔒");
                  if (props.onLogin) props.onLogin();
                  return;
                }
                props.setIsEdit(!props.isEdit);
              }}
              class="w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
              style={props.isEdit
                ? 'background: var(--p); color: #000; border: 1px solid var(--p); box-shadow: 0 0 16px var(--p-glow), 0 4px 12px rgba(0,0,0,0.4)'
                : 'background: rgba(255,255,255,0.07); color: #9ca3af; border: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(8px); box-shadow: 0 2px 8px rgba(0,0,0,0.4)'}
            >
              <Icon name={props.isEdit ? 'check' : 'edit'} class="text-sm" />
            </button>
          </Show>
        </div>
      </div>
    </>
  );
}
