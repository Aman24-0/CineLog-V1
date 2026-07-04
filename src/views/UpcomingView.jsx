import { createSignal, createEffect, createMemo, For, Show, onMount, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, cleanPlatform, TMDB_KEY, formatRuntime, SafeInfoRow } from '../utils';
import { PersonModal } from '../modals/PersonModal';

function UpcomingDetailsModal(props) {
  const [details, setDetails] = createSignal(props.movie);
  const [trailerKey, setTrailerKey] = createSignal(null);
  const [playTrailer, setPlayTrailer] = createSignal(false);
  const [ottPlatform, setOttPlatform] = createSignal('');
  const [personId, setPersonId] = createSignal(null);

  onMount(() => { document.body.style.overflow = 'hidden'; });
  onCleanup(() => { document.body.style.overflow = ''; });

  createEffect(() => {
    const mediaType = props.movie.media_type || 'movie';
    fetch(`https://api.themoviedb.org/3/${mediaType}/${props.movie.id}?api_key=${TMDB_KEY}&append_to_response=videos,credits,watch/providers`)
      .then(r => r.json())
      .then(d => {
        setDetails(d);
        const vids = d.videos ? d.videos.results : null;
        if (vids) {
          let t = vids.find(x => x.site === 'YouTube' && (x.type === 'Trailer' || x.type === 'Teaser')) || vids.find(x => x.site === 'YouTube');
          if (t) setTrailerKey(t.key);
        }
        const inProviders = d['watch/providers']?.results?.IN;
        let foundProviders = [];
        if (inProviders) {
          const providers = [...(inProviders.flatrate || []), ...(inProviders.free || []), ...(inProviders.ads || []), ...(inProviders.buy || [])];
          foundProviders = [...new Set(providers.map(p => cleanPlatform(p.provider_name)))].filter(Boolean);
        }
        if (foundProviders.length === 0 && d.networks) {
          foundProviders = [...new Set(d.networks.map(n => cleanPlatform(n.name)))].filter(Boolean);
        }
        if (foundProviders.length > 0) setOttPlatform(foundProviders.join(', '));
      })
      .catch(() => {});
  });

  const runtimeVal = () => details().runtime || details().episode_run_time?.[0] || 0;
  const titleText = () => details().title || details().name || '';

  const handleSetReminder = () => {
    const title = titleText();
    const date = props.movie.calc_date;
    if (!date) return props.showToast('Release date not confirmed yet!', 'info');

    const [year, month, day] = date.split('-');
    const startDate = `${year}${month}${day}`;
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${startDate}\nDTEND;VALUE=DATE:${startDate}\nSUMMARY:🍿 ${title} Release\nDESCRIPTION:Don't forget! ${title} is releasing today on CineLog.\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_release.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (props.showToast) props.showToast('Calendar reminder set! 📅', 'success');
  };

  return (
    <div
      class="fixed inset-0 flex items-center justify-center p-0 sm:p-4 z-[99999999] animate-fade-in"
      onClick={props.onClose}
      role="dialog"
      aria-modal="true"
      aria-label={titleText()}
    >
      <div class="absolute inset-0 bg-[#08090b] pointer-events-none" aria-hidden="true">
        <Show when={props.movie?.backdrop_path}>
          <img src={`https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`} class="backdrop-ambient" onLoad={e => e.target.classList.add('img-loaded')} alt="" />
        </Show>
        <div class="absolute inset-0 bg-black/80" />
      </div>

      <div
        class="w-full max-w-xl bg-[#08090b]/80 backdrop-blur-3xl sm:rounded-[2.5rem] rounded-t-[2.5rem] mt-10 sm:mt-0 overflow-hidden border border-white/10 relative h-[100vh] sm:h-auto max-h-[95vh] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-pop-in flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={props.onClose}
          class="absolute top-4 right-4 z-[100] bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all"
          aria-label="Close"
        >
          <Icon name="close" class="text-sm text-white" aria-hidden="true" />
        </button>

        <div class="overflow-y-auto hide-scrollbar w-full">
          {/* Backdrop / Trailer */}
          <div class="relative h-56 md:h-72 bg-black shrink-0">
            <Show
              when={!playTrailer()}
              fallback={
                <iframe
                  class="w-full h-full absolute inset-0 z-10"
                  src={`https://www.youtube.com/embed/${trailerKey()}?autoplay=1&rel=0`}
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                  title={`${titleText()} — Trailer`}
                />
              }
            >
              <Show
                when={details().backdrop_path}
                fallback={
                  <div class="w-full h-full flex items-center justify-center" style="background: #171921" aria-hidden="true">
                    <Icon name="movie" class="text-6xl text-gray-700" />
                  </div>
                }
              >
                <img src={`https://image.tmdb.org/t/p/original${details().backdrop_path}`} class="backdrop-img absolute inset-0" onLoad={e => e.target.classList.add('img-loaded')} alt="" aria-hidden="true" />
              </Show>
              <div class="backdrop-gradient" aria-hidden="true" />

              <Show
                when={trailerKey()}
                fallback={
                  <div class="absolute bottom-3 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5" aria-hidden="true">
                    <span class="type-caption text-gray-500">No Trailer Available</span>
                  </div>
                }
              >
                <button
                  onClick={() => setPlayTrailer(true)}
                  class="absolute inset-0 flex items-center justify-center z-10 group"
                  aria-label={`Play trailer for ${titleText()}`}
                >
                  <div class="w-16 h-16 backdrop-blur-md rounded-full flex items-center justify-center border group-hover:scale-110 transition-transform shadow-2xl" style="background: var(--p-dim); border-color: rgba(255,255,255,0.1)" aria-hidden="true">
                    <Icon name="play_arrow" fill class="text-white text-4xl" />
                  </div>
                </button>
              </Show>
            </Show>
          </div>

          {/* Content */}
          <div class="px-6 md:px-8 pb-28 sm:pb-8 -mt-16 relative z-10">
            <h2
              class="font-headline text-3xl text-white drop-shadow-md mb-2 leading-tight"
              style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden"
            >
              {titleText()}
            </h2>

            <p class="type-subtitle mt-1 mb-5 flex items-center gap-2 flex-wrap">
              {details().release_date || details().first_air_date}
              {' · '}
              {props.movie.media_type === 'tv' ? 'SERIES' : 'MOVIE'}
              <Show when={runtimeVal() > 0}>{' · '}{formatRuntime(runtimeVal())}</Show>
              <Show when={props.movie.media_type === 'movie'}>
                <span class="bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded">Theatrical</span>
              </Show>
            </p>

            <p class="text-gray-400 text-sm mb-6 leading-relaxed italic border-l-2 pl-3" style="border-color: color-mix(in srgb, var(--p) 30%, transparent)">
              {details().overview || 'No overview available.'}
            </p>

            <div class="glass-surface p-5 rounded-2xl border border-white/5 space-y-3 mb-6">
              <SafeInfoRow icon="format_list_bulleted" label="Genre" value={
                <span class="type-metadata text-gray-300">{(details().genres || []).map(g => g.name).join(', ') || 'N/A'}</span>
              } />

              <Show when={details()?.original_language}>
                <SafeInfoRow icon="language" label="Languages" value={
                  <div class="flex flex-col gap-1 mt-0.5">
                    <span class="type-metadata text-gray-200 flex items-center gap-2">
                      <span class="type-caption bg-white/10 px-1.5 py-0.5 rounded text-gray-400">Orig</span>
                      {details().original_language.toUpperCase()}
                    </span>
                    <Show when={details()?.spoken_languages?.length > 0 && details().spoken_languages.some(l => l.iso_639_1 !== details().original_language)}>
                      <span class="type-metadata text-gray-400 flex items-start gap-2 leading-tight">
                        <span class="type-caption px-1.5 py-0.5 rounded mt-0.5 shrink-0" style="background: var(--p-dim); color: var(--p); border: 1px solid color-mix(in srgb, var(--p) 20%, transparent)">Dub</span>
                        <span class="flex-1">{details().spoken_languages.filter(l => l.iso_639_1 !== details().original_language).map(l => l.english_name || l.name).join(', ')}</span>
                      </span>
                    </Show>
                  </div>
                } />
              </Show>

              <Show when={ottPlatform()}>
                <SafeInfoRow icon="connected_tv" label="Platform" value={
                  <span class="type-caption font-black uppercase tracking-widest border px-2 py-0.5 rounded" style="background: var(--p-dim); border-color: var(--p); color: var(--p)">{ottPlatform()}</span>
                } />
              </Show>
            </div>

            <Show when={details().credits || details().created_by}>
              <div class="mb-6">
                <p class="section-title !mt-0">Cast &amp; Crew</p>
                <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  <Show when={details().credits?.crew?.find(c => c.job === 'Director') || details().created_by?.[0]}>
                    {(dir) => {
                      const d = dir();
                      return (
                        <button
                          onClick={() => setPersonId(d.id)}
                          class="flex flex-col items-center min-w-[70px] shrink-0 group active:scale-95"
                          aria-label={`View ${d.name} — ${details().created_by ? 'Creator' : 'Director'}`}
                        >
                          <img
                            src={d.profile_path ? `https://image.tmdb.org/t/p/w200${d.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${d.name}&backgroundColor=171921`}
                            class="poster-img img-loaded w-16 h-16 rounded-full object-cover border-2 mb-2 bg-[#171921] group-hover:scale-105 transition-all"
                            style="border-color: var(--p2, #fff)"
                            onLoad={e => e.target.classList.add('img-loaded')}
                            alt={d.name}
                          />
                          <p class="type-caption text-center text-white truncate w-full group-hover:text-[color:var(--p)] transition-colors" style="font-size: 9px">{d.name}</p>
                          <p class="type-caption text-center mt-0.5" style="color: var(--p2, #fff)">{details().created_by ? 'Creator' : 'Director'}</p>
                        </button>
                      );
                    }}
                  </Show>
                  <For each={details().credits?.cast?.slice(0, 5)}>
                    {(c) => (
                      <button
                        onClick={() => setPersonId(c.id)}
                        class="flex flex-col items-center min-w-[70px] shrink-0 group active:scale-95"
                        aria-label={`View ${c.name} — ${c.character}`}
                      >
                        <img
                          src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}&backgroundColor=171921`}
                          class="poster-img w-16 h-16 rounded-full object-cover border border-white/10 mb-2 bg-[#171921]"
                          onLoad={e => e.target.classList.add('img-loaded')}
                          alt={c.name}
                        />
                        <p class="type-caption text-center text-white truncate w-full group-hover:text-[color:var(--p)] transition-colors" style="font-size: 9px">{c.name}</p>
                        <p class="type-caption text-center text-gray-500 truncate w-full mt-0.5" style="font-size: 7px">{c.character}</p>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            {/* Action buttons */}
            <div class="flex gap-3 mt-2">
              <button
                onClick={props.onAdd}
                class="flex-1 type-button py-4 px-5 rounded-xl active:scale-95 flex items-center justify-center gap-2 border"
                style="background: var(--p); color: #05060a; border-color: var(--p); box-shadow: 0 0 24px var(--p-glow); min-height: 52px"
                aria-label={`Add ${titleText()} to My Universe`}
              >
                <Icon name="add_circle" class="text-lg" aria-hidden="true" />
                Add to My Universe
              </button>
              <button
                onClick={handleSetReminder}
                class="type-button px-5 rounded-xl active:scale-95 flex items-center justify-center border bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all"
                style="min-height: 52px"
                aria-label="Set calendar reminder for release day"
                title="Set Calendar Reminder"
              >
                <Icon name="notification_add" class="text-xl" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Show when={personId()}>
        <PersonModal
          id={personId()}
          uid={props.uid}
          watchlist={props.watchlist}
          showToast={props.showToast}
          onClose={() => setPersonId(null)}
        />
      </Show>
    </div>
  );
}

/* ── Time Helpers ── */
const getDaysDiff = (dateStr) => {
  if (!dateStr) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
};

const getGroupInfo = (dateStr) => {
  const diff = getDaysDiff(dateStr);
  if (diff < 0)  return { label: 'Released', order: 0 };
  if (diff === 0) return { label: 'Today', order: 1 };
  if (diff === 1) return { label: 'Tomorrow', order: 2 };
  if (diff <= 6)  return { label: 'This Week', order: 3 };
  return { label: 'Upcoming', order: 4 };
};

export function UpcomingView(props) {
  const [activeTab, setActiveTab] = createSignal('Indian');
  const [mediaType, setMediaType] = createSignal('movie');
  const [lang, setLang] = createSignal('all');
  const [selectedDate, setSelectedDate] = createSignal(new Date().toISOString().split('T')[0]);
  const [movies, setMovies] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [fetchError, setFetchError] = createSignal(false);
  const [retryTick, setRetryTick] = createSignal(0);
  const [previewMovie, setPreviewMovie] = createSignal(null);

  const fetchJson = (url) => fetch(url).then(r => {
    if (!r.ok) throw new Error(`TMDB ${r.status}`);
    return r.json();
  });

  createEffect(() => {
    retryTick();
    setLoading(true);
    setFetchError(false);
    const dateObj = new Date(selectedDate());
    const startDate = dateObj.toISOString().split('T')[0];
    dateObj.setDate(dateObj.getDate() + 30);
    const endDate = dateObj.toISOString().split('T')[0];

    let mUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=popularity.desc`;
    let tUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&air_date.gte=${startDate}&air_date.lte=${endDate}&sort_by=popularity.desc&without_genres=10764,10767`;

    if (activeTab() === 'Indian') {
      mUrl += '&with_origin_country=IN';
      tUrl += '&with_origin_country=IN';
      if (lang() !== 'all') {
        mUrl += `&with_original_language=${lang()}`;
        tUrl += `&with_original_language=${lang()}`;
      }
    }

    Promise.all([
      fetchJson(mUrl + '&page=1'),
      fetchJson(mUrl + '&page=2'),
      fetchJson(tUrl + '&page=1'),
      fetchJson(tUrl + '&page=2')
    ]).then(async ([m1, m2, t1, t2]) => {
      let combinedMovies = [...(m1.results || []), ...(m2.results || [])].map(m => ({ ...m, media_type: 'movie', calc_date: m.release_date }));
      let tvBaseList = [...(t1.results || []), ...(t2.results || [])];

      const tvDetailsPromises = tvBaseList.slice(0, 25).map(t =>
        fetch(`https://api.themoviedb.org/3/tv/${t.id}?api_key=${TMDB_KEY}`).then(r => r.json()).catch(() => null)
      );
      const tvDetailsData = await Promise.all(tvDetailsPromises);

      let combinedTv = tvDetailsData.filter(Boolean).map(t => {
        let nextEp = t.next_episode_to_air;
        let d = nextEp ? nextEp.air_date : (t.first_air_date || startDate);
        let isReturning = !!nextEp;
        let epTag = nextEp ? `S${nextEp.season_number} E${nextEp.episode_number}` : 'New Drop';
        return { ...t, media_type: 'tv', title: t.name, release_date: t.first_air_date, calc_date: d, isReturning, epTag };
      });

      const vaultIds = new Set(props.watchlist().map(w => String(w.id)));
      combinedTv = combinedTv.filter(t => !t.isReturning || vaultIds.has(String(t.id)));

      if (activeTab() === 'International') {
        const isIndian = (item) => (item.origin_country || []).includes('IN') || ['hi', 'te', 'ta', 'ml', 'bn'].includes(item.original_language);
        combinedMovies = combinedMovies.filter(m => !isIndian(m));
        combinedTv = combinedTv.filter(t => !isIndian(t));
      }

      let resList = [...combinedMovies, ...combinedTv].filter(item => item.calc_date && item.poster_path);
      resList.sort((a, b) => new Date(a.calc_date) - new Date(b.calc_date));

      const unique = [];
      const seen = new Set();
      for (const item of resList) {
        if (!seen.has(item.id)) { seen.add(item.id); unique.push(item); }
      }
      setMovies(unique);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setFetchError(true);
    });
  });

  const groupedAndFilteredMovies = createMemo(() => {
    const filtered = movies().filter(m => m.media_type === mediaType());
    const groupMap = {};
    filtered.forEach(m => {
      const { label, order } = getGroupInfo(m.calc_date);
      if (!groupMap[label]) groupMap[label] = { label, order, items: [] };
      groupMap[label].items.push(m);
    });
    return Object.values(groupMap)
      .sort((a, b) => a.order - b.order)
      .map(g => { g.items.sort((a, b) => new Date(a.calc_date) - new Date(b.calc_date)); return g; });
  });

  const handleAdd = async (m) => {
    if (props.isGuest) { props.showToast('Sign in to add to Vault! 🔒', 'info'); if (props.onLogin) props.onLogin(); return; }
    if (props.watchlist().some(item => String(item.id) === String(m.id))) { props.showToast('Already in your Vault!', 'info'); return; }
    const endpoint = m.media_type === 'tv' ? 'tv' : 'movie';
    const detailRes = await fetch(`https://api.themoviedb.org/3/${endpoint}/${m.id}?api_key=${TMDB_KEY}`);
    const fullData = await detailRes.json();
    await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), {
      id: m.id,
      title: m.title || m.name,
      poster_path: m.poster_path,
      backdrop_path: m.backdrop_path,
      media_type: m.media_type,
      status: 'Planned',
      addedAt: serverTimestamp(),
      release_date: m.calc_date || '',
      region: activeTab() === 'Indian' ? 'Indian' : 'International',
      season: 1,
      episode: 0,
      totalEps: fullData.number_of_episodes || 0,
      runtime: fullData.runtime || fullData.episode_run_time?.[0] || 0
    });
    props.showToast('Added to Vault! 🍿', 'success');
    setPreviewMovie(null);
  };

  /* ── Tab/type toggle button helper ── */
  const TabBtn = (localProps) => (
    <button
      onClick={localProps.onClick}
      class="flex-1 py-2.5 rounded-xl type-caption font-bold transition-all active:scale-[0.97]"
      style={localProps.active
        ? 'background: var(--p); color: #05060a; box-shadow: 0 0 16px var(--p-glow)'
        : 'color: var(--muted)'}
      aria-pressed={localProps.active}
    >
      {localProps.label}
    </button>
  );

  return (
    <div class="pb-10 animate-fade-in" role="main">
      <h2 class="type-page-title text-white mb-6">Upcoming</h2>

      {/* ── Region filter ── */}
      <div
        class="flex gap-2 p-1.5 rounded-2xl mb-4 shadow-lg"
        style="background: var(--raised); border: 1px solid var(--border-active)"
        role="group"
        aria-label="Region filter"
      >
        <TabBtn label="Indian"        active={activeTab() === 'Indian'}        onClick={() => { setActiveTab('Indian'); setLang('all'); }} />
        <TabBtn label="International" active={activeTab() === 'International'} onClick={() => { setActiveTab('International'); setLang('all'); }} />
      </div>

      {/* ── Media type filter ── */}
      <div
        class="flex gap-2 p-1.5 rounded-2xl mb-4 shadow-lg"
        style="background: var(--raised); border: 1px solid var(--border-active)"
        role="group"
        aria-label="Media type filter"
      >
        <TabBtn label="Movies" active={mediaType() === 'movie'} onClick={() => setMediaType('movie')} />
        <TabBtn label="Series" active={mediaType() === 'tv'}    onClick={() => setMediaType('tv')} />
      </div>

      {/* ── Language filter (Indian only) ── */}
      <Show when={activeTab() === 'Indian'}>
        <div
          class="flex gap-2 overflow-x-auto hide-scrollbar mb-6 p-2 rounded-2xl"
          style="background: var(--raised); border: 1px solid var(--border-active)"
          role="group"
          aria-label="Language filter"
        >
          <For each={['all', 'hi', 'te', 'ta', 'ml']}>
            {(l) => (
              <button
                onClick={() => setLang(l)}
                class="px-4 py-2 rounded-xl type-caption font-bold uppercase tracking-widest whitespace-nowrap transition-all active:scale-95"
                style={lang() === l
                  ? 'background: var(--p); color: #05060a; box-shadow: 0 0 12px var(--p-glow)'
                  : 'color: var(--muted)'}
                aria-pressed={lang() === l}
                aria-label={l === 'all' ? 'All languages' : l.toUpperCase()}
              >
                {l === 'all' ? 'All' : l.toUpperCase()}
              </button>
            )}
          </For>
        </div>
      </Show>

      {/* ── Date picker ── */}
      <div class="flex justify-center mb-8">
        <div
          class="glass-surface p-2 pr-6 rounded-[2rem] flex items-center gap-4 border border-white/10 shadow-xl relative overflow-hidden"
          style="transition: border-color 200ms ease-out"
          onFocusWithin={e => { e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--p) 50%, transparent)'; }}
          onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
        >
          <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to right, var(--p-dim), transparent)" aria-hidden="true" />
          <div class="w-12 h-12 rounded-full flex items-center justify-center relative z-10" style="background: var(--p); box-shadow: 0 0 15px var(--p-glow)" aria-hidden="true">
            <Icon name="calendar_month" class="text-[#0c0e14] text-xl" />
          </div>
          <div class="flex flex-col relative z-10">
            <label for="upcoming-date" class="type-caption text-gray-400 mb-0.5">Scan Radar From</label>
            <input
              id="upcoming-date"
              type="date"
              value={selectedDate()}
              onInput={e => setSelectedDate(e.target.value)}
              class="bg-transparent border-none outline-none text-white font-black text-sm [color-scheme:dark] p-0 m-0 w-32"
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <Show
        when={!loading()}
        fallback={
          <div class="flex flex-col items-center gap-4 py-16 animate-fade-in" role="status" aria-live="polite">
            <Icon name="radar" class="text-5xl animate-spin" style="color: var(--p)" aria-hidden="true" />
            <span class="type-caption" style="color: var(--p)">Scanning Radar…</span>
          </div>
        }
      >
        <Show
          when={!fetchError()}
          fallback={
            <div class="text-center p-12 glass-surface rounded-[2rem] border border-white/5 flex flex-col items-center gap-4" role="alert">
              <Icon name="cloud_off" class="text-4xl opacity-50" style="color: var(--muted)" aria-hidden="true" />
              <p class="type-metadata text-gray-400 max-w-xs">
                TMDB is unreachable right now — this is on their end. Your data is safe. Try again in a moment.
              </p>
              <button
                type="button"
                onClick={() => setRetryTick(t => t + 1)}
                class="mt-1 px-6 py-3 rounded-xl type-caption active:scale-95 transition-all"
                style="background: var(--p-dim); color: var(--p); border: 1px solid color-mix(in srgb, var(--p) 30%, transparent)"
              >
                Retry
              </button>
            </div>
          }
        >
          <Show
            when={movies().filter(m => m.media_type === mediaType()).length > 0}
            fallback={
              <div class="empty-state py-16">
                <div class="empty-state-icon" aria-hidden="true">
                  <Icon name="event_busy" style="color: var(--muted); font-size: 36px" />
                </div>
                <p class="empty-state-title">Nothing Found</p>
                <p class="empty-state-body">No releases in this window. Try a different date or region.</p>
              </div>
            }
          >
            <div class="timeline-wrapper" role="feed" aria-label="Upcoming releases timeline">
              <div class="timeline-line" aria-hidden="true" />
              <For each={groupedAndFilteredMovies()}>
                {(group) => (
                  <div class="timeline-group" role="group" aria-label={group.label}>
                    <div class="timeline-group-header">
                      <div class="timeline-header-icon" aria-hidden="true">
                        <Icon name={
                          group.label === 'Released'  ? 'new_releases' :
                          group.label === 'Today'     ? 'today' :
                          group.label === 'Tomorrow'  ? 'event_upcoming' :
                          'date_range'
                        } class="text-xl" />
                      </div>
                      <span class="timeline-header-text">{group.label}</span>
                      <span class="timeline-header-count">{group.items.length} title{group.items.length !== 1 ? 's' : ''}</span>
                    </div>

                    <div class="timeline-items">
                      <For each={group.items}>
                        {(m) => {
                          const day = new Date(m.calc_date).getDate();
                          const month = new Date(m.calc_date).toLocaleString('default', { month: 'short' });
                          const diff = getDaysDiff(m.calc_date);
                          const countdownText = diff < 0 ? 'Released' : diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : `${diff} days`;
                          const pillClass = diff < 0 ? 'released-pill' : diff === 0 ? 'today-pill' : diff === 1 ? 'tomorrow-pill' : 'countdown-pill';

                          return (
                            <div
                              onClick={() => setPreviewMovie(m)}
                              onKeyDown={e => { if (e.key === 'Enter') setPreviewMovie(m); }}
                              class="timeline-item cursor-pointer group"
                              role="article"
                              tabIndex={0}
                              aria-label={`${m.title} — ${countdownText}`}
                            >
                              <div class="calendar-node" aria-hidden="true">
                                <div class="calendar-node-header">{month}</div>
                                <div class="calendar-node-body">{day}</div>
                              </div>

                              <div class="flex-1 upcoming-card p-3 rounded-[1.5rem] flex gap-4 animate-fade-up">
                                <Show
                                  when={m.poster_path}
                                  fallback={
                                    <div class="w-16 h-24 bg-[#171921] rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                                      <Icon name="movie" class="text-gray-600" />
                                    </div>
                                  }
                                >
                                  <div class="w-16 h-24 rounded-xl overflow-hidden relative shrink-0" style="background: #141414; box-shadow: var(--shadow-card)">
                                    <div class="poster-loading" aria-hidden="true" />
                                    <img
                                      src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                                      class="poster-img absolute inset-0 w-full h-full object-cover"
                                      onLoad={e => { e.target.classList.add('img-loaded'); e.target.previousSibling?.classList.add('hidden'); }}
                                      alt=""
                                      aria-hidden="true"
                                    />
                                  </div>
                                </Show>

                                <div class="flex-1 flex flex-col justify-center py-1 min-w-0">
                                  <p class="type-metadata font-bold text-gray-100 group-hover:text-white line-clamp-2">
                                    {m.title}
                                  </p>
                                  <div class="flex items-center gap-2 mt-2 flex-wrap">
                                    <span class={pillClass}>{countdownText}</span>
                                    <Show
                                      when={m.media_type === 'tv'}
                                      fallback={
                                        <span class="type-caption bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                                          <Icon name="theaters" class="text-[10px]" aria-hidden="true" /> Theatrical
                                        </span>
                                      }
                                    >
                                      <span class="type-caption border px-2 py-0.5 rounded flex items-center gap-1" style="background: var(--p-dim); color: var(--p); border-color: color-mix(in srgb, var(--p) 40%, transparent)">
                                        <Icon name="tv" class="text-[10px]" aria-hidden="true" /> {m.epTag || 'Series Drop'}
                                      </span>
                                    </Show>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </Show>

      <Show when={previewMovie()}>
        <Portal>
          <UpcomingDetailsModal
            movie={previewMovie()}
            onClose={() => setPreviewMovie(null)}
            onAdd={() => handleAdd(previewMovie())}
            uid={props.uid}
            watchlist={props.watchlist()}
            showToast={props.showToast}
          />
        </Portal>
      </Show>
    </div>
  );
}
