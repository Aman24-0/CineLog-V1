import { createMemo, createSignal, createEffect, For, Show } from 'solid-js';
import { Icon } from '../utils';
import { MovieCard } from '../components/MovieCard';

export function Dashboard(props) {

  const continueWatchingList = createMemo(() => {
    return props.watchlist()
      .filter(m => {
        if (!m.watchProgress || m.watchProgress.currentTime <= 0) return false;
        if (m.status !== 'Watching') return false;
        if (m.media_type !== 'tv') return true;
        const wpSeason  = parseInt(m.watchProgress.season  || 1);
        const wpEpisode = parseInt(m.watchProgress.episode || 1);
        const currentSeason  = parseInt(m.season  || 1);
        const currentEpisode = parseInt(m.episode || 1);
        return wpSeason === currentSeason && wpEpisode === currentEpisode;
      })
      .sort((a, b) => new Date(b.watchProgress.updatedAt).getTime() - new Date(a.watchProgress.updatedAt).getTime());
  });

  const plannedList    = createMemo(() => props.watchlist().filter(m => m.status === 'Planned' || m.status === 'Plan to Watch'));
  const watchingCount  = createMemo(() => props.watchlist().filter(m => m.status === 'Watching').length);
  const completedCount = createMemo(() => props.watchlist().filter(m => m.status === 'Completed').length);

  const [randomItem, setRandomItem] = createSignal(null);

  const pickRandom = () => {
    if (props.isGuest) {
      props.showToast("Sign in to shuffle your vault! 🔒");
      return props.onLogin();
    }
    const p = plannedList();
    if (p.length > 0) setRandomItem(p[Math.floor(Math.random() * p.length)]);
    else props.showToast("Planned list is empty! Add some titles first.");
  };

  createEffect(() => {
    const p = plannedList();
    if (p.length > 0 && !randomItem()) setRandomItem(p[Math.floor(Math.random() * p.length)]);
  });

  const featuredItem = createMemo(() => randomItem() || (props.watchlist().length > 0 ? props.watchlist()[0] : null));

  return (
    <div class="animate-fade-in pb-8 space-y-8">

      {/* ── FEATURED HERO ── */}
      <Show when={featuredItem()} fallback={
        <div class="featured-hero flex flex-col items-center justify-center text-center p-6 bg-[#141414]">
          <Show when={props.isGuest} fallback={
            <p class="type-metadata text-gray-400">Add titles to your vault to get started</p>
          }>
            <p class="type-metadata text-gray-400 mb-4">Your cinematic universe starts here</p>
            <button
              onClick={props.onLogin}
              class="type-button px-6 py-2 rounded-full text-black active:scale-95"
              style="background: var(--p);"
            >
              Sign In
            </button>
          </Show>
        </div>
      }>
        {(item) => {
          const bgImg = () => item().backdrop_path
            ? `https://image.tmdb.org/t/p/w780${item().backdrop_path}`
            : (item().poster_path ? `https://image.tmdb.org/t/p/w500${item().poster_path}` : '');

          return (
            <div class="featured-hero">
              <Show when={bgImg()}>
                <img
                  src={bgImg()}
                  class="w-full h-full object-cover animate-fade-in"
                  style="opacity: 0; transition: opacity 500ms ease-out"
                  onLoad={e => { e.target.style.opacity = '1'; }}
                />
              </Show>
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

              <Show when={plannedList().some(m => m.id === item().id)}>
                <div class="absolute top-4 left-4 lg:top-6 lg:left-6 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 z-10">
                  <Icon name="casino" class="text-sm" style="color: var(--p)" />
                  <span class="type-caption text-white">Random Pick</span>
                </div>
              </Show>

              <div class="absolute bottom-0 left-0 w-full p-4 lg:p-6 flex flex-col gap-2 z-10">
                <h2 class="font-headline text-3xl lg:text-5xl text-white leading-none drop-shadow-md">
                  {item().title || item().name}
                </h2>
                <div class="flex items-center gap-2 type-metadata text-gray-300">
                  <span>{(item().release_date || item().first_air_date || '').split('-')[0]}</span>
                  <Show when={item().imdbRating || item().rating}>
                    <span class="flex items-center gap-1">
                      <Icon name="star" class="text-xs text-yellow-500" />
                      {item().imdbRating || item().rating}
                    </span>
                  </Show>
                </div>
                <div class="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => props.openMovie(item().id)}
                    class="type-button bg-white text-black px-6 py-2.5 rounded-full flex items-center gap-2 active:scale-95"
                  >
                    <Icon name="play_arrow" fill class="text-xl" /> Play
                  </button>
                  <button
                    onClick={pickRandom}
                    class="type-button bg-black/40 backdrop-blur-md border border-white text-white px-6 py-2.5 rounded-full flex items-center gap-2 active:scale-95 hover:bg-white/10"
                  >
                    <Icon name="shuffle" class="text-xl" /> Shuffle
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Show>

      {/* ── GUEST HERO BANNER ── */}
      <Show when={props.isGuest}>
        <div class="bg-[#141414] p-6 rounded-3xl border border-white/10 relative overflow-hidden animate-fade-up">
          <h3 class="font-headline text-3xl text-white mb-2">Welcome to Cinelog</h3>
          <p class="type-metadata text-gray-400 mb-5 max-w-sm relative z-10">
            Exploring in Preview Mode. Sign in to build your personal cinematic universe, track progress, and get recommendations.
          </p>
          <button
            onClick={props.onLogin}
            class="type-button px-6 py-3 rounded-full text-black active:scale-95 relative z-10"
            style="background: var(--p);"
          >
            Start Building Vault
          </button>
        </div>
      </Show>

      {/* ── VAULT STATS GRID ── */}
      <Show when={!props.isGuest && props.watchlist().length > 0}>
        {/* 8px grid: gap-4 = 16px = 2×8; p-4 = 16px; rounded-[1.25rem] = 20px */}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {/* Total */}
          <div
            onClick={() => { props.setActiveVaultStatus('all'); props.setView('watchlist'); }}
            class="bg-[#141414] border border-white/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 hover:bg-[#1a1a1a] hover:border-white/10 group shadow-sm animate-fade-up"
          >
            <Icon name="inventory_2" class="text-gray-600 group-hover:text-white mb-2 text-xl" />
            <span class="type-stat text-white mb-1">{props.watchlist().length}</span>
            <span class="type-caption text-gray-500">Total Vault</span>
          </div>

          {/* Watching */}
          <div
            onClick={() => { props.setActiveVaultStatus('Watching'); props.setView('watchlist'); }}
            class="bg-[#141414] border border-white/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 hover:bg-[#1a1a1a] hover:border-white/10 group shadow-sm animate-fade-up"
          >
            <Icon name="play_circle" class="text-gray-600 group-hover:text-white mb-2 text-xl" />
            <span class="type-stat text-white mb-1">{watchingCount()}</span>
            <span class="type-caption text-gray-500">Watching</span>
          </div>

          {/* Planned */}
          <div
            onClick={() => { props.setActiveVaultStatus('Planned'); props.setView('watchlist'); }}
            class="bg-[#141414] border border-white/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 hover:bg-[#1a1a1a] hover:border-white/10 group shadow-sm animate-fade-up"
          >
            <Icon name="bookmark" class="text-gray-600 group-hover:text-[var(--p)] mb-2 text-xl" style="transition: color 220ms ease-out" />
            <span class="type-stat mb-1" style="color: var(--p)">{plannedList().length}</span>
            <span class="type-caption text-gray-500">Planned</span>
          </div>

          {/* Completed */}
          <div
            onClick={() => { props.setActiveVaultStatus('Completed'); props.setView('watchlist'); }}
            class="bg-[#141414] border border-white/5 rounded-[1.25rem] p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 hover:bg-[#1a1a1a] hover:border-white/10 group shadow-sm animate-fade-up"
          >
            <Icon name="task_alt" class="text-gray-600 group-hover:text-white mb-2 text-xl" />
            <span class="type-stat text-white mb-1">{completedCount()}</span>
            <span class="type-caption text-gray-500">Completed</span>
          </div>
        </div>
      </Show>

      {/* ── CONTINUE WATCHING ── */}
      <Show when={continueWatchingList().length > 0}>
        <div class="animate-fade-up">
          <p class="section-title">Continue Watching</p>
          {/* gap-4 = 16px = 2×8; pb-4 = 16px */}
          <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
            <For each={continueWatchingList()}>
              {(m) => {
                const runtimeBasedDuration = (Number(m.runtime) > 0 ? Number(m.runtime) * 60 : 0);
                const fallbackDuration = m.media_type === 'tv' ? 45 * 60 : 120 * 60;
                const effectiveDuration = Number(m.watchProgress.duration) > 0
                  ? Math.max(Number(m.watchProgress.duration), runtimeBasedDuration || 0)
                  : (runtimeBasedDuration || fallbackDuration);
                const pct = effectiveDuration > 0
                  ? Math.min(100, Math.max(0, (Number(m.watchProgress.currentTime || 0) / effectiveDuration) * 100))
                  : 0;
                const bgImg = m.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${m.backdrop_path}`
                  : (m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '');

                return (
                  <div
                    onClick={() => props.openMovie('RESUME_' + m.id)}
                    class="relative w-64 h-36 shrink-0 rounded-2xl overflow-hidden cursor-pointer group snap-start shadow-lg bg-[#111] border border-white/10"
                  >
                    <Show when={bgImg} fallback={
                      <div class="w-full h-full flex items-center justify-center skeleton-bg">
                        <Icon name="movie" class="text-4xl text-gray-700"/>
                      </div>
                    }>
                      <img
                        src={bgImg}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        style="opacity: 0; transition: opacity 400ms ease-out, transform 700ms ease-out"
                        onLoad={e => { e.target.style.opacity = '0.6'; }}
                        onMouseEnter={e => { e.target.style.opacity = '0.9'; }}
                        onMouseLeave={e => { e.target.style.opacity = '0.6'; }}
                      />
                    </Show>
                    <div class="absolute inset-0 bg-gradient-to-t from-[#000] via-[#000]/40 to-transparent pointer-events-none" />

                    {/* Play overlay */}
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <div class="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center border text-white" style="border-color: var(--p2)">
                        <Icon name="play_arrow" fill class="text-2xl" style="color: var(--p2)" />
                      </div>
                    </div>

                    {/* Info */}
                    <div class="p-4 absolute bottom-0 left-0 w-full z-10">
                      <h4 class="type-card-title truncate mb-2">{m.title || m.name}</h4>
                      <div class="w-full bg-black/50 h-1.5 rounded-full overflow-hidden shadow-inner border border-white/5">
                        <div
                          class="h-full rounded-full"
                          style={`background: var(--p2); width: ${pct}%; transition: width 500ms ease-out`}
                        />
                      </div>
                      <div class="flex justify-between items-center mt-2">
                        <span class="type-caption text-gray-300">{m.media_type === 'tv' ? `S${m.season||1} E${m.episode||1}` : 'Movie'}</span>
                        <span class="type-caption" style="color: var(--p2)">{Math.round(pct)}%</span>
                      </div>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </Show>

      {/* ── RECENTLY ADDED ── */}
      <div class="animate-fade-up">
        {/* gap-2 = 8px header; mb-4 = 16px */}
        <div class="flex justify-between items-center mb-4">
          <p class="section-title !mt-0 !mb-0">Recently Added</p>
          <button
            onClick={() => { props.setActiveVaultStatus('all'); props.setView('watchlist'); }}
            class="type-caption flex items-center gap-1 hover:text-white transition-colors"
            style="color: var(--p)"
          >
            View All <Icon name="arrow_forward" class="text-xs" />
          </button>
        </div>
        {/* gap-3 = 12px card gap; pb-4 = 16px */}
        <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-4 stagger">
          <For each={props.watchlist().slice(0, 10)}>
            {(m) => (
              <div class="w-[100px] sm:w-[130px] shrink-0">
                <MovieCard movie={m} onClick={() => props.openMovie(m.id)} />
              </div>
            )}
          </For>
        </div>
      </div>

    </div>
  );
}
