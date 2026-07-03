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

  const handleSetReminder = () => {
    const title = details().title || details().name;
    const date = props.movie.calc_date;
    if (!date) return props.showToast("Release date not confirmed yet!");
    
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
    
    if (props.showToast) props.showToast("Calendar Reminder Set! 📅");
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center p-0 sm:p-4 z-[99999999] animate-fade-in" onClick={props.onClose}>
      <div class="absolute inset-0 bg-[#08090b] pointer-events-none">
        <Show when={props.movie?.backdrop_path}>
           <img src={`https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`} class="backdrop-ambient" onLoad={e => e.target.classList.add('img-loaded')} alt="" />
        </Show>
        <div class="absolute inset-0 bg-black/80"></div>
      </div>

      <div class="w-full max-w-xl bg-[#08090b]/80 backdrop-blur-3xl sm:rounded-[2.5rem] rounded-t-[2.5rem] mt-10 sm:mt-0 overflow-hidden border border-white/10 relative h-[100vh] sm:h-auto max-h-[95vh] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-pop-in flex flex-col" onClick={e => e.stopPropagation()}>
        <button onClick={props.onClose} class="absolute top-4 right-4 z-[100] bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all">
          <Icon name="close" class="text-sm text-white" />
        </button>

        <div class="overflow-y-auto hide-scrollbar w-full">
          <div class="relative h-56 md:h-72 bg-black shrink-0">
            <Show when={!playTrailer()} fallback={
              <iframe class="w-full h-full absolute inset-0 z-10" src={`https://www.youtube.com/embed/${trailerKey()}?autoplay=1&rel=0`} frameborder="0" allowfullscreen></iframe>
            }>
              <Show when={details().backdrop_path} fallback={
                <div class="w-full h-full flex items-center justify-center text-gray-700 bg-[#171921]"><Icon name="movie" class="text-6xl" /></div>
              }>
                <img src={`https://image.tmdb.org/t/p/original${details().backdrop_path}`} class="backdrop-img absolute inset-0" onLoad={e => e.target.classList.add('img-loaded')} alt="" />
              </Show>
              <div class="backdrop-gradient" />
              <Show when={trailerKey()} fallback={
                <div class="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 border border-white/5">No Video Available</div>
              }>
                <button onClick={() => setPlayTrailer(true)} class="absolute inset-0 flex items-center justify-center z-10 group">
                  <div class="w-16 h-16 backdrop-blur-md rounded-full flex items-center justify-center border group-hover:scale-110 transition-transform shadow-2xl" style="background: var(--p-dim); border-color: rgba(255,255,255,0.1)">
                    <Icon name="play_arrow" fill class="text-white text-4xl" />
                  </div>
                </button>
              </Show>
            </Show>
          </div>

          <div class="px-6 md:px-8 pb-32 sm:pb-8 -mt-16 relative z-10">
            <h2 class="text-3xl font-headline font-black drop-shadow-md mb-2 leading-tight">{details().title || details().name}</h2>
            <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 mb-6 flex items-center gap-2">
              {details().release_date || details().first_air_date} • {props.movie.media_type === 'tv' ? 'SERIES' : 'MOVIE'}
              <Show when={runtimeVal() > 0}> • {formatRuntime(runtimeVal())}</Show>
              <Show when={props.movie.media_type === 'movie'}>
                <span class="bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded ml-2">Theatrical</span>
              </Show>
            </p>
            
            <p class="text-gray-400 text-sm mb-6 leading-relaxed italic border-l-2 border-white/20 pl-3">{details().overview || 'No overview available.'}</p>
            
            <div class="glass-surface p-5 rounded-2xl border border-white/5 space-y-4 mb-6">
              <SafeInfoRow icon="format_list_bulleted" label="Genre" value={<span class="text-xs text-gray-300">{(details().genres || []).map(g => g.name).join(', ') || 'N/A'}</span>} />
              
              <Show when={details()?.original_language}>
                  <SafeInfoRow icon="language" label="Languages" value={
                      <div class="flex flex-col gap-1 mt-0.5">
                          <span class="text-xs text-gray-200 flex items-center gap-2">
                              <span class="text-[9px] bg-white/10 px-1.5 py-0.5 rounded uppercase tracking-widest font-black text-gray-400">Orig</span>
                              {details().original_language.toUpperCase()}
                          </span>
                          <Show when={details()?.spoken_languages?.length > 0 && details().spoken_languages.some(l => l.iso_639_1 !== details().original_language)}>
                              <span class="text-[11px] text-gray-400 font-bold flex items-start gap-2 leading-tight">
                                  <span class="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 px-1.5 py-0.5 rounded uppercase tracking-widest font-black mt-0.5">Dub</span>
                                  <span class="flex-1">{details().spoken_languages.filter(l => l.iso_639_1 !== details().original_language).map(l => l.english_name || l.name).join(', ')}</span>
                              </span>
                          </Show>
                      </div>
                  } />
              </Show>

              <Show when={ottPlatform()}>
                <SafeInfoRow icon="connected_tv" label="Platform" value={<span class="text-[10px] font-black uppercase tracking-widest border px-2 py-0.5 rounded" style="background: var(--p-dim); border-color: var(--p); color: var(--p)">{ottPlatform()}</span>} />
              </Show>
            </div>
            
            <Show when={details().credits || details().created_by}>
              <div class="mb-8">
                <h3 class="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Cast & Crew</h3>
                <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                  <Show when={details().credits?.crew?.find(c => c.job === 'Director') || details().created_by?.[0]}>
                    {(dir) => {
                      const d = dir();
                      return (
                        <div onClick={() => setPersonId(d.id)} class="flex flex-col items-center min-w-[70px] shrink-0 cursor-pointer group">
                          <img src={d.profile_path ? `https://image.tmdb.org/t/p/w200${d.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${d.name}&backgroundColor=171921`} class="poster-img img-loaded w-16 h-16 rounded-full object-cover border-2 mb-2 bg-[#171921] group-hover:scale-105 transition-all" style="border-color: var(--p2, #fff)" onLoad={e => e.target.classList.add('img-loaded')} />
                          <p class="text-[9px] font-black text-center text-white truncate w-full group-hover:text-[var(--p)] transition-colors">{d.name}</p>
                          <p class="text-[7px] font-black text-center uppercase tracking-widest mt-0.5" style="color: var(--p2, #fff)">{details().created_by ? 'Creator' : 'Director'}</p>
                        </div>
                      );
                    }}
                  </Show>
                  <For each={details().credits?.cast?.slice(0, 5)}>
                    {(c) => (
                      <div onClick={() => setPersonId(c.id)} class="flex flex-col items-center min-w-[70px] shrink-0 cursor-pointer group">
                        <img src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}&backgroundColor=171921`} class="poster-img w-16 h-16 rounded-full object-cover border border-white/10 mb-2 bg-[#171921]" onLoad={e => e.target.classList.add('img-loaded')} />
                        <p class="text-[9px] font-black text-center text-white truncate w-full group-hover:text-[var(--p)] transition-colors">{c.name}</p>
                        <p class="text-[7px] text-gray-500 text-center uppercase truncate w-full mt-0.5 font-bold">{c.character}</p>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            <div class="flex gap-2 mt-2">
                <button onClick={props.onAdd} class="flex-1 font-black py-4 px-5 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform flex items-center justify-center gap-2 border" style="background: var(--p); color: #05060a; border-color: var(--p); box-shadow: 0 0 24px var(--p-glow); min-height: 52px;">
                    <Icon name="add_circle" class="text-lg"/> Add to My Universe
                </button>
                <button onClick={handleSetReminder} class="font-black px-5 rounded-xl active:scale-95 transition-transform flex items-center justify-center border bg-white/5 border-white/10 hover:bg-white/10 text-white" style="min-height: 52px;" title="Set Calendar Reminder">
                    <Icon name="notification_add" class="text-xl"/>
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
  if (diff < 0) return { label: "Released", order: 0 };
  if (diff === 0) return { label: "Today", order: 1 };
  if (diff === 1) return { label: "Tomorrow", order: 2 };
  if (diff <= 6) return { label: "This Week", order: 3 };
  return { label: "Upcoming", order: 4 };
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

      const tvDetailsPromises = tvBaseList.slice(0, 25).map(t => fetch(`https://api.themoviedb.org/3/tv/${t.id}?api_key=${TMDB_KEY}`).then(r => r.json()).catch(() => null));
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
        if (!seen.has(item.id)) {
          seen.add(item.id);
          unique.push(item);
        }
      }
      setMovies(unique);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setFetchError(true);
    });
  });

  /* ── Grouped & Filtered Data ── */
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
      .map(g => {
        g.items.sort((a, b) => new Date(a.calc_date) - new Date(b.calc_date));
        return g;
      });
  });

  const handleAdd = async (m) => {
    if (props.isGuest) {
      props.showToast("Sign in to add to Vault! 🔒");
      if (props.onLogin) props.onLogin();
      return;
    }
    if (props.watchlist().some(item => String(item.id) === String(m.id))) return props.showToast("Already in vault!");
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
    props.showToast("Added to Vault");
    setPreviewMovie(null);
  };

  return (
    <div class="pb-10 animate-fade-in">
      <h2 class="text-3xl font-headline font-black drop-shadow-md mb-6">Upcoming</h2>
      
      {/* ── Filters ── */}
      <div class="flex gap-2 p-1.5 rounded-2xl mb-4 shadow-lg" style="background: var(--raised); border: 1px solid var(--border-active)">
        <button onClick={() => { setActiveTab('Indian'); setLang('all'); }} class="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all" style={activeTab() === 'Indian' ? 'background: var(--p); color: #05060a; box-shadow: 0 0 16px var(--p-glow)' : 'color: var(--muted)'}>Indian</button>
        <button onClick={() => { setActiveTab('International'); setLang('all'); }} class="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all" style={activeTab() === 'International' ? 'background: var(--p); color: #05060a; box-shadow: 0 0 16px var(--p-glow)' : 'color: var(--muted)'}>International</button>
      </div>
      <div class="flex gap-2 p-1.5 rounded-2xl mb-4 shadow-lg" style="background: var(--raised); border: 1px solid var(--border-active)">
        <button onClick={() => setMediaType('movie')} class="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all" style={mediaType() === 'movie' ? 'background: var(--p); color: #05060a; box-shadow: 0 0 16px var(--p-glow)' : 'color: var(--muted)'}>Movies</button>
        <button onClick={() => setMediaType('tv')} class="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all" style={mediaType() === 'tv' ? 'background: var(--p); color: #05060a; box-shadow: 0 0 16px var(--p-glow)' : 'color: var(--muted)'}>Series</button>
      </div>
      <Show when={activeTab() === 'Indian'}>
        <div class="flex gap-2 overflow-x-auto hide-scrollbar mb-6 p-2 rounded-2xl" style="background: var(--raised); border: 1px solid var(--border-active)">
          <For each={['all', 'hi', 'te', 'ta', 'ml']}>{(l) => (
            <button onClick={() => setLang(l)} class="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all" style={lang() === l ? 'background: var(--p); color: #05060a; box-shadow: 0 0 12px var(--p-glow)' : 'color: var(--muted)'}>{l === 'all' ? 'All' : l.toUpperCase()}</button>
          )}</For>
        </div>
      </Show>
      
      <div class="flex justify-center mb-8">
        <div class="glass-surface p-2 pr-6 rounded-[2rem] flex items-center gap-4 border border-white/10 focus-within:border-[var(--p)]/50 transition-colors shadow-xl relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r pointer-events-none" style="background: linear-gradient(to right, var(--p-dim), transparent)"></div>
          <div class="w-12 h-12 rounded-full flex items-center justify-center relative z-10" style="background: var(--p); box-shadow: 0 0 15px var(--p-glow)"><Icon name="calendar_month" class="text-[#0c0e14] text-xl" /></div>
          <div class="flex flex-col relative z-10">
            <span class="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-0.5">Scan Radar From</span>
            <input type="date" value={selectedDate()} onInput={e => setSelectedDate(e.target.value)} class="bg-transparent border-none outline-none text-white font-black text-sm [color-scheme:dark] p-0 m-0 w-32" />
          </div>
        </div>
      </div>

      {/* ── Timeline List ── */}
      <Show when={loading()} fallback={
        <Show when={fetchError()} fallback={
          <Show when={movies().filter(m => m.media_type === mediaType()).length > 0} fallback={
            <div class="text-center p-12 glass-surface rounded-[2rem] text-gray-500 text-sm font-bold border border-white/5 flex flex-col items-center gap-3">
              <Icon name="event_busy" class="text-4xl opacity-50" /> No releases found.
            </div>
          }>
            <div class="timeline-wrapper">
              <div class="timeline-line"></div>
              <For each={groupedAndFilteredMovies()}>
                {(group) => (
                  <div class="timeline-group">
                    <div class="timeline-group-header">
                      <div class="timeline-header-icon">
                        <Icon name={group.label === 'Released' ? 'new_releases' : group.label === 'Today' ? 'today' : group.label === 'Tomorrow' ? 'event_upcoming' : 'date_range'} class="text-xl" />
                      </div>
                      <span class="timeline-header-text">{group.label}</span>
                      <span class="timeline-header-count">{group.items.length} {group.items.length === 1 ? 'title' : 'titles'}</span>
                    </div>
                    
                    <div class="timeline-items">
                      <For each={group.items}>{(m) => {
                        const day = new Date(m.calc_date).getDate();
                        const month = new Date(m.calc_date).toLocaleString('default', { month: 'short' });
                        const diff = getDaysDiff(m.calc_date);
                        const countdownText = diff < 0 ? 'Released' : diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : `${diff} days left`;
                        const pillClass = diff < 0 ? 'released-pill' : diff === 0 ? 'today-pill' : diff === 1 ? 'tomorrow-pill' : 'countdown-pill';
                        
                        return (
                          <div onClick={() => setPreviewMovie(m)} class="timeline-item cursor-pointer group">
                            <div class="calendar-node">
                              <div class="calendar-node-header">{month}</div>
                              <div class="calendar-node-body">{day}</div>
                            </div>
                            <div class="flex-1 upcoming-card p-3 rounded-[1.5rem] flex gap-4 animate-fade-up">
                              <Show when={m.poster_path} fallback={<div class="w-16 h-24 bg-[#171921] rounded-xl flex items-center justify-center"><Icon name="movie" class="text-gray-600" /></div>}>
                                <div class="w-16 h-24 rounded-xl overflow-hidden relative shrink-0" style="background: #141414; box-shadow: var(--shadow-card); flex-shrink: 0">
                                  <div class="poster-loading" />
                                  <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} class="poster-img absolute inset-0 w-full h-full object-cover" onLoad={e => { e.target.classList.add('img-loaded'); e.target.previousSibling?.classList.add('hidden'); }} alt="" />
                                </div>
                              </Show>
                              <div class="flex-1 flex flex-col justify-center py-1 min-w-0">
                                <p class="font-bold text-sm text-gray-100 line-clamp-2">{m.title}</p>
                                <div class="flex items-center gap-2 mt-2 flex-wrap">
                                  <span class={pillClass}>{countdownText}</span>
                                  <Show when={m.media_type === 'tv'} fallback={
                                    <span class="text-[8px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded font-black uppercase tracking-widest flex items-center gap-1 w-max">
                                      <Icon name="theaters" class="text-[10px]"/> Theatrical
                                    </span>
                                  }>
                                    <span class="text-[8px] border px-2 py-1 rounded font-black uppercase tracking-widest flex items-center gap-1 w-max" style="background: var(--p-dim); color: var(--p); border-color: var(--p)">
                                      <Icon name="tv" class="text-[10px]"/> {m.epTag || 'Series Drop'}
                                    </span>
                                  </Show>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }}</For>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        }>
          <div class="text-center p-12 glass-surface rounded-[2rem] text-gray-500 text-sm font-bold border border-white/5 flex flex-col items-center gap-3">
            <Icon name="cloud_off" class="text-4xl opacity-50" />
            <span>TMDB server unavailable right now.<br />This is on their end, not the app — try again in a bit.</span>
            <button type="button" onClick={() => setRetryTick(t => t + 1)} class="mt-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all" style="background: var(--p-dim); color: var(--p); border: 1px solid var(--p)">Retry</button>
          </div>
        </Show>
      }>
        <div class="text-center p-12 flex flex-col items-center gap-4 animate-pulse font-bold text-sm tracking-widest uppercase" style="color: var(--p)">
          <Icon name="radar" class="text-5xl animate-spin" /> Scanning Radar...
        </div>
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
