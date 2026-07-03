import { createMemo, createSignal, createEffect, For, Show } from 'solid-js';
import { Icon, formatRuntime } from '../utils';
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

      {/* ── FEATURED HERO ─────────────────────────────────────── */}
      <Show when={featuredItem()} fallback={
        <div class="featured-hero flex flex-col items-center justify-center text-center p-6">
          <Show when={props.isGuest} fallback={
            <p class="type-metadata text-gray-400">Add titles to your vault to get started</p>
          }>
            <p class="type-metadata text-gray-400 mb-4">Your cinematic universe starts here</p>
            <button onClick={props.onLogin} class="type-button px-6 py-2 rounded-full text-black active:scale-95" style="background: var(--p)">
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
                  class="backdrop-img absolute inset-0"
                  onLoad={e => e.target.classList.add('img-loaded')}
                  alt=""
                />
              </Show>

              <div class="backdrop-gradient" />

              {/* Random pick badge */}
              <Show when={plannedList().some(m => m.id === item().id)}>
                <div class="absolute top-4 left-4 lg:top-6 lg:left-6 z-10"
                  style="background: rgba(0,0,0,0.65); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); padding: 6px 12px; border-radius: 100px; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.5)">
                  <Icon name="casino" style="color: var(--p); font-size: 14px" />
                  <span class="type-caption text-white">Random Pick</span>
                </div>
              </Show>

              {/* Hero content */}
              <div class="absolute bottom-0 left-0 w-full p-4 lg:p-6 flex flex-col gap-2 z-10 overflow-hidden">
                <h2 class="font-headline text-3xl lg:text-5xl text-white leading-none"
                  style="text-shadow: 0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)">
                  {item().title || item().name}
                </h2>
                <div class="flex items-center gap-3 type-metadata text-gray-300">
                  <span>{(item().release_date || item().first_air_date || '').split('-')[0]}</span>
                  <Show when={item().imdbRating || item().rating}>
                    <span class="rating-pill">
                      <Icon name="star" fill style="color: #f5c518; font-size: 11px" />
                      {item().imdbRating || item().rating}
                    </span>
                  </Show>
                </div>
                <div class="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => props.openMovie(item().id)}
                    class="type-button bg-white text-black px-6 py-2.5 rounded-full flex items-center gap-2 active:scale-95"
                    style="box-shadow: 0 4px 16px rgba(0,0,0,0.6)"
                  >
                    <Icon name="play_arrow" fill class="text-xl" /> Play
                  </button>
                  <button
                    onClick={pickRandom}
                    class="type-button px-6 py-2.5 rounded-full flex items-center gap-2 active:scale-95"
                    style="background: rgba(255,255,255,0.10); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.20); color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.4)"
                  >
                    <Icon name="shuffle" class="text-xl" /> Shuffle
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Show>

      {/* ── GUEST HERO BANNER ──────────────────────────────────── */}
      <Show when={props.isGuest}>
        <div class="p-6 rounded-3xl border relative overflow-hidden animate-fade-up"
          style="background: linear-gradient(145deg, #181818, #111); border-color: rgba(255,255,255,0.08); box-shadow: var(--shadow-raised)">
          <div style="position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, var(--p-glow) 0%, transparent 70%); pointer-events: none" />
          <h3 class="font-headline text-3xl text-white mb-2 relative z-10">Welcome to Cinelog</h3>
          <p class="type-metadata text-gray-400 mb-5 max-w-sm relative z-10">
            Exploring in Preview Mode. Sign in to build your personal cinematic universe, track progress, and get recommendations.
          </p>
          <button
            onClick={props.onLogin}
            class="type-button px-6 py-3 rounded-full text-black active:scale-95 relative z-10"
            style="background: var(--p); box-shadow: 0 0 20px var(--p-glow), 0 4px 16px rgba(0,0,0,0.4)"
          >
            Start Building Vault
          </button>
        </div>
      </Show>

      {/* ── VAULT STATS GRID ───────────────────────────────────── */}
      <Show when={!props.isGuest && props.watchlist().length > 0}>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">

          <div onClick={() => { props.setActiveVaultStatus('all'); props.setView('watchlist'); }}
            class="stat-card p-4 flex flex-col items-center justify-center cursor-pointer group animate-fade-up">
            <Icon name="inventory_2" class="text-gray-600 group-hover:text-white mb-2 text-xl"
              style="transition: color 220ms ease-out" />
            <span class="type-stat text-white mb-1">{props.watchlist().length}</span>
            <span class="type-caption text-gray-500">Total Vault</span>
          </div>

          <div onClick={() => { props.setActiveVaultStatus('Watching'); props.setView('watchlist'); }}
            class="stat-card p-4 flex flex-col items-center justify-center cursor-pointer group animate-fade-up">
            <Icon name="play_circle" class="text-gray-600 group-hover:text-white mb-2 text-xl"
              style="transition: color 220ms ease-out" />
            <span class="type-stat text-white mb-1">{watchingCount()}</span>
            <span class="type-caption text-gray-500">Watching</span>
          </div>

          <div onClick={() => { props.setActiveVaultStatus('Planned'); props.setView('watchlist'); }}
            class="stat-card p-4 flex flex-col items-center justify-center cursor-pointer group animate-fade-up">
            <Icon name="bookmark" class="text-gray-600 group-hover:text-[color:var(--p)] mb-2 text-xl"
              style="transition: color 220ms ease-out" />
            <span class="type-stat mb-1" style="color: var(--p)">{plannedList().length}</span>
            <span class="type-caption text-gray-500">Planned</span>
          </div>

          <div onClick={() => { props.setActiveVaultStatus('Completed'); props.setView('watchlist'); }}
            class="stat-card p-4 flex flex-col items-center justify-center cursor-pointer group animate-fade-up">
            <Icon name="task_alt" class="text-gray-600 group-hover:text-white mb-2 text-xl"
              style="transition: color 220ms ease-out" />
            <span class="type-stat text-white mb-1">{completedCount()}</span>
            <span class="type-caption text-gray-500">Completed</span>
          </div>
        </div>
      </Show>

      {/* ── CONTINUE WATCHING ──────────────────────────────────── */}
      <Show when={continueWatchingList().length > 0}>
        <div class="animate-fade-up">
          <p class="section-title">Continue Watching</p>
          <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            <For each={continueWatchingList()}>
              {(m) => {
                const runtimeBasedDuration = Number(m.runtime) > 0 ? Number(m.runtime) * 60 : 0;
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
                    class="continue-card relative w-64 h-36 shrink-0 cursor-pointer group"
                  >
                    <Show when={bgImg} fallback={
                      <div class="w-full h-full flex items-center justify-center skeleton-bg">
                        <Icon name="movie" class="text-4xl text-gray-700" />
                      </div>
                    }>
                      <img
                        src={bgImg}
                        class="continue-card-img absolute inset-0"
                        onLoad={e => e.target.classList.add('img-loaded')}
                        alt=""
                      />
                    </Show>

                    <div class="continue-card-gradient" />

                    <div class="absolute inset-0 flex items-center justify-center z-10"
                      style="opacity: 0; transition: opacity 200ms ease-out"
                      ref={el => {
                        const card = el?.parentElement;
                        if (!card) return;
                        card.addEventListener('mouseenter', () => { el.style.opacity = '1'; });
                        card.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
                      }}
                    >
                      <div class="w-12 h-12 rounded-full flex items-center justify-center border"
                        style="background: rgba(0,0,0,0.60); backdrop-filter: blur(8px); border-color: color-mix(in srgb, var(--p2) 60%, transparent); box-shadow: 0 0 16px var(--p-glow)">
                        <Icon name="play_arrow" fill style="color: var(--p2); font-size: 24px" />
                      </div>
                    </div>

                    <div class="absolute bottom-0 left-0 w-full p-3.5 z-10">
                      <h4 class="type-card-title truncate mb-2">{m.title || m.name}</h4>
                      <div class="w-full h-1 rounded-full overflow-hidden mb-2"
                        style="background: rgba(255,255,255,0.12)">
                        <div
                          class="h-full rounded-full"
                          style={`width: ${pct}%; background: var(--p2); box-shadow: 0 0 6px var(--p-glow); transition: width 500ms ease-out`}
                        />
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="type-caption" style="color: rgba(255,255,255,0.55)">
                          {m.media_type === 'tv' ? `S${m.season || 1} E${m.episode || 1}` : 'Movie'}
                        </span>
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

      {/* ── RECENTLY ADDED ─────────────────────────────────────── */}
      <div class="animate-fade-up">
        <div class="flex justify-between items-center mb-4">
          <p class="section-title !mt-0 !mb-0">Recently Added</p>
          <button
            onClick={() => { props.setActiveVaultStatus('all'); props.setView('watchlist'); }}
            class="type-caption flex items-center gap-1 hover:text-white"
            style="color: var(--p); transition: color 150ms ease-out"
          >
            View All <Icon name="arrow_forward" class="text-xs" />
          </button>
        </div>
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
