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
      {/* Backdrop / Trailer area */}
      <div class="h-56 md:h-72 relative bg-black shrink-0">
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
              <div class="w-full h-full flex items-center justify-center text-gray-700 bg-[#171921]">
                <Icon name="movie" class="text-6xl"/>
              </div>
            }
          >
            <img
              src={`https://image.tmdb.org/t/p/original${props.movie?.backdrop_path}`}
              class="w-full h-full object-cover"
              style="opacity: 0; transition: opacity 500ms ease-out"
              onLoad={e => { e.target.style.opacity = '0.6'; }}
            />
          </Show>
          <div class="absolute inset-0 bg-gradient-to-t from-[#08090b]/90 via-[#08090b]/40 to-transparent pointer-events-none" />
          <Show when={props.trailerKey}>
            <button
              onClick={() => props.setPlayTrailer(true)}
              class="absolute inset-0 flex items-center justify-center z-10 group"
            >
              <div class="w-16 h-16 backdrop-blur-md rounded-full flex items-center justify-center border group-hover:scale-110 active:scale-95 shadow-2xl" style="background: var(--p-dim); border-color: rgba(255,255,255,0.1); transition: transform 220ms cubic-bezier(0.34,1.56,0.64,1)">
                <Icon name="play_arrow" fill class="text-white text-4xl"/>
              </div>
            </button>
          </Show>
        </Show>
      </div>

      {/* Title row — pulled up over the backdrop */}
      {/* -mt-16 stays; px-6 md:px-8 = consistent 24px/32px horizontal rhythm */}
      <div class="px-6 md:px-8 -mt-16 relative z-10 flex justify-between items-start mb-3">
        <div class="pr-3 flex-1 min-w-0">
          {/* Modal title: Outfit 900, 24px */}
          <h2 class="type-modal-title drop-shadow-md leading-tight">
            {props.movie?.title || props.movie?.name}
          </h2>
          {/* Subtitle: Azeret Mono 9px uppercase */}
          <p class="type-subtitle mt-1.5">
            {props.movie?.release_date || props.details?.release_date || 'N/A'}
            {' · '}
            {props.movie?.media_type === 'tv' ? 'SERIES' : 'MOVIE'}
            <Show when={props.details?.runtime || props.details?.episode_run_time?.[0]}>
              {' · '}{formatRuntime(props.details?.runtime || props.details?.episode_run_time?.[0])}
            </Show>
          </p>
        </div>

        {/* Action buttons: 8px gap */}
        <div class="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            class="w-10 h-10 rounded-full border flex items-center justify-center text-gray-400 hover:text-white border-white/10 bg-black/40 backdrop-blur-md active:scale-95 shadow-lg hover:border-white/30"
            title="Share"
          >
            <Icon name="share" class="text-sm"/>
          </button>

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
              class="w-10 h-10 rounded-full border flex items-center justify-center active:scale-95 shadow-lg"
              style={props.isEdit
                ? 'background: var(--p); color: #000; border-color: var(--p); box-shadow: 0 0 12px var(--p-glow)'
                : 'background: rgba(255,255,255,0.05); color: #9ca3af; border-color: rgba(255,255,255,0.1); backdrop-filter: blur(8px)'}
            >
              <Icon name={props.isEdit ? 'check' : 'edit'} class="text-sm"/>
            </button>
          </Show>
        </div>
      </div>
    </>
  );
}
