import { createSignal, createEffect, createMemo, onMount, onCleanup, Show, For } from 'solid-js';
import { doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, cleanPlatform, getSafeGenres, getSafePlatforms } from '../utils';

import { PersonModal } from './PersonModal';
import { DirectPlayPlayer } from '../components/DirectPlayPlayer';

// Modular UI Components
import { MediaHeader } from '../components/details/MediaHeader';
import { RatingsPanel } from '../components/details/RatingsPanel';
import { StreamingPanel } from '../components/details/StreamingPanel';
import { TvTracker } from '../components/details/TvTracker';
import { CastCrewList } from '../components/details/CastCrewList';
import { InfoGrid } from '../components/details/InfoGrid';
import { EditForm } from '../components/details/EditForm';

// Hooks
import { useWatchProgress } from '../hooks/useWatchProgress';
import { useTmdbDetails } from '../hooks/useTmdbDetails';
import { useOmdbRatings } from '../hooks/useOmdbRatings';
import { useEpisodeTracking } from '../hooks/useEpisodeTracking';

const calculateDays = (start, end) => {
  if (!start || !end) return null;
  const d1 = new Date(start);
  const d2 = new Date(end);
  if (isNaN(d1) || isNaN(d2)) return null;
  if (d2 < d1) return 0;
  return Math.ceil(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
};

export function DetailsModal(props) {
  const isPreview  = createMemo(() => typeof props.id === 'string' && props.id.startsWith('PREVIEW_'));
  const isResume   = createMemo(() => typeof props.id === 'string' && props.id.startsWith('RESUME_'));
  const previewData = createMemo(() => {
    if (!isPreview()) return null;
    try { return JSON.parse(props.id.replace('PREVIEW_', '')); } catch { return null; }
  });
  const baseId = createMemo(() => {
    if (isPreview()) return previewData()?.id;
    if (isResume())  return props.id.replace('RESUME_', '');
    return props.id;
  });

  const [overrideItem, setOverrideItem] = createSignal(null);
  const movie = createMemo(() =>
    overrideItem() || (isPreview() ? previewData() : props.watchlist?.find(m => String(m.id) === String(baseId())))
  );

  const [isEdit,              setIsEdit]              = createSignal(false);
  const [playTrailer,         setPlayTrailer]         = createSignal(false);
  const [showPlayer,          setShowPlayer]          = createSignal(false);
  const [activeServer,        setActiveServer]        = createSignal(null);
  const [personId,            setPersonId]            = createSignal(null);
  const [omdbData,            setOmdbData]            = createSignal({ imdb: '-', rt: '-' });
  const [customServers,       setCustomServers]       = createSignal({});

  // ── NEW: holds the fully-resolved playback URL after IMDb/TMDB lookup.
  const [resolvedUrl, setResolvedUrl] = createSignal('');

  const [form, setForm] = createSignal({
    status: '', rating: '', watchDate: '', notes: '',
    region: '', season: 1, episode: 1, tag: '',
    platforms: '', genres: '', seasonDates: {},
  });

  const [watchProgress,       setWatchProgress]       = createSignal(null);
  const [contentDuration,     setContentDuration]     = createSignal(0);
  const [playerSessionStart,  setPlayerSessionStart]  = createSignal(null);
  const [playerStartProgress, setPlayerStartProgress] = createSignal(0);
  const [receivedRealProgress,setReceivedRealProgress]= createSignal(false);

  let autoPlayTriggered = false;
  let inferDurationSeconds = () => 0;

  const { details, trailerKey, richPlatforms, similarItems } = useTmdbDetails(movie, {
    uid:             props.uid,
    isGuest:         props.isGuest,
    isPreview,
    setForm,
    setContentDuration,
  });

  inferDurationSeconds = () => {
    const d    = details();
    const mins = d?.runtime || d?.episode_run_time?.[0] || movie()?.runtime || 0;
    const sec  = Number(mins) * 60;
    if (Number.isFinite(sec) && sec > 0) return sec;
    return movie()?.media_type === 'tv' ? 45 * 60 : 120 * 60;
  };

  useOmdbRatings(movie, setOmdbData, props.uid, isPreview, props.isGuest);

  const currentSeasonNumber  = createMemo(() => parseInt(form().season  || movie()?.season  || 1) || 1);
  const currentEpisodeNumber = createMemo(() => parseInt(form().episode || movie()?.episode || 1) || 1);

  const isCompleted = createMemo(() => !isPreview() && (form().status || movie()?.status) === 'Completed');

  const {
    primePlaybackProgress, handlePlayerMessages, hydrateSessionProgressFromElapsed, saveProgressToDb,
  } = useWatchProgress({
    movie, isPreview, isGuest: props.isGuest, uid: props.uid, activeServer, watchProgress, setWatchProgress,
    contentDuration, setContentDuration, playerSessionStart, setPlayerSessionStart, playerStartProgress,
    setPlayerStartProgress, receivedRealProgress, setReceivedRealProgress,
    currentSeasonNumber, currentEpisodeNumber, inferDurationSeconds, showToast: props.showToast,
  });

  const {
    selectedSeason, setSelectedSeason, seasonEpisodes, seasonsLoading, expandedEpisodes, setExpandedEpisodes,
    watchedEpisodes, tvSeasons, selectedSeasonEpisodes, episodeDocId, getEpisodesForSeason,
    loadWatchedEpisodes, fetchSeasonEpisodes, toggleEpisodeWatched, checkIfWatched
  } = useEpisodeTracking({
    movie, details, isPreview, isGuest: props.isGuest, uid: props.uid, activeServer, inferDurationSeconds,
    setForm, setWatchProgress, setPlayerStartProgress, showToast: props.showToast, onLogin: props.onLogin,
    currentSeasonNumber, currentEpisodeNumber, isCompleted
  });

  const getCurrentEpisode = () => {
    const season  = currentSeasonNumber();
    const episode = currentEpisodeNumber();
    return (
      getEpisodesForSeason(season).find(ep => Number(ep.episode_number) === episode) ||
      { season_number: season, episode_number: episode, name: `Episode ${episode}` }
    );
  };

  const availableServers = createMemo(() => {
    const custom = customServers();
    return Object.keys(custom).filter(key => custom[key].enabled !== false).map(key => ({
      id: key,
      name: custom[key].name || 'Custom Server',
      type: custom[key].type || 'multi',
      idMode: custom[key].idMode || 'TMDB',
      movieUrl: custom[key].movieUrl || '',
      tvUrl: custom[key].tvUrl || '',
      icon: 'dns'
    }));
  });

  createEffect(() => {
    const list = availableServers();
    if (list.length > 0 && !list.find(s => s.id === activeServer())) {
      setActiveServer(list[0].id);
    }
  });

  createEffect(() => {
    if (isResume() && movie() && !autoPlayTriggered) {
      autoPlayTriggered = true;
      const savedServer = movie().watchProgress?.server;
      if (savedServer && availableServers().find(s => s.id === savedServer)) {
        setActiveServer(savedServer);
      } else if (availableServers().length > 0) {
        setActiveServer(availableServers()[0].id);
      }
      setTimeout(() => {
        primePlaybackProgress();
        setShowPlayer(true);
      }, 200);
    }
  });

  onMount(async () => {
    if (!props.isGuest) {
      try {
        const userDoc = await getDoc(doc(db, 'users', props.uid || 'unknown'));
        setCustomServers(userDoc.data()?.customServers || {});
      } catch (e) {}
    }
  });

  createEffect(() => {
    if (movie()?.media_type !== 'tv') return;
    const seasons = tvSeasons();
    if (!seasons.length) return;
    const preferred = Number(movie().season || seasons[0].season_number || 1);
    const exists    = seasons.some(s => Number(s.season_number) === preferred);
    if (!selectedSeason()) setSelectedSeason(exists ? preferred : Number(seasons[0].season_number));
  });

  createEffect(() => {
    const seasonNumber = selectedSeason();
    if (movie()?.media_type === 'tv' && seasonNumber) fetchSeasonEpisodes(seasonNumber);
  });

  createEffect(() => {
    const m = movie();
    if (m?.media_type === 'tv' && !isPreview()) loadWatchedEpisodes();
  });

  createEffect(() => {
    const m = movie();
    if (!m?.id) return;
    // Reset resolved URL whenever the title changes
    setResolvedUrl('');
  });

  onMount(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('message', handlePlayerMessages);
  });
  onCleanup(() => {
    hydrateSessionProgressFromElapsed();
    saveProgressToDb();
    document.body.style.overflow = '';
    window.removeEventListener('message', handlePlayerMessages);
  });

  createEffect(() => {
    if (movie() && !isPreview() && !props.isGuest) {
      setForm({
        status:      movie().status      || 'Planned',
        rating:      movie().rating      || '',
        watchDate:   typeof movie().watchDate === 'string' ? movie().watchDate : '',
        notes:       typeof movie().notes     === 'string' ? movie().notes     : '',
        region:      movie().region      || 'International',
        season:      movie().season      || 1,
        episode:     movie().episode     || 1,
        tag:         movie().tag         || '',
        platforms:   getSafePlatforms(movie()).join(', '),
        genres:      getSafeGenres(movie()).join(', '),
        seasonDates: movie().seasonDates || {},
      });
    }
  });

  const allAvailablePlatforms = createMemo(() =>
    [...new Set((props.watchlist || []).flatMap(m => getSafePlatforms(m)))].filter(Boolean).sort()
  );

  const progressPct = createMemo(() => {
    if (isCompleted()) return 100;
    const loadedSeasonTotal = getEpisodesForSeason(currentSeasonNumber()).length;
    const total = Number(movie()?.totalEps) || loadedSeasonTotal || 1;
    return Math.min((currentEpisodeNumber() / total) * 100, 100);
  });

  const movieFranchises = createMemo(() =>
    props.franchises?.filter(f => movie()?.franchises?.[f.id] !== undefined).map(f => f.name).join(', ')
  );

  const togglePlatform = (p) => {
    let curr = form().platforms.split(',').map(s => s.trim()).filter(Boolean);
    curr = curr.includes(p) ? curr.filter(x => x !== p) : [...curr, p];
    setForm({ ...form(), platforms: curr.join(', ') });
  };

  const saveChanges = async () => {
    if (props.isGuest) { props.showToast("Sign in to save changes! 🔒"); if (props.onLogin) props.onLogin(); return; }
    const nextSeason   = parseInt(form().season)   || 1;
    const nextEpisode  = parseInt(form().episode)  || 1;
    const prevSeason   = parseInt(movie().season)  || 1;
    const prevEpisode  = parseInt(movie().episode) || 1;
    const episodeChanged = movie().media_type === 'tv' && (nextSeason !== prevSeason || nextEpisode !== prevEpisode);
    const updates = {
      status:       form().status,
      rating:       parseFloat(form().rating) || 0,
      watchDate:    form().watchDate,
      seasonDates:  form().seasonDates,
      notes:        form().notes,
      region:       form().region,
      season:       nextSeason,
      episode:      nextEpisode,
      tag:          form().tag,
      genresList:   form().genres.split(',').map(s => s.trim()).filter(Boolean),
      platformsList:form().platforms.split(',').map(s => cleanPlatform(s.trim())).filter(Boolean),
    };
    if (episodeChanged) {
      const inferred = inferDurationSeconds();
      updates.watchProgress = { currentTime: 0, duration: inferred || 0, server: activeServer() || null, updatedAt: new Date().toISOString(), season: nextSeason, episode: nextEpisode };
      setWatchProgress({ currentTime: 0, duration: inferred || 0 });
      setPlayerStartProgress(0);
    }
    await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)), updates);
    if (props.showToast) props.showToast("Saved");
    setIsEdit(false);
  };

  const addToVaultFromPreview = async () => {
    if (props.isGuest) { if (props.showToast) props.showToast("Sign in to add to Vault! 🔒"); if (props.onLogin) props.onLogin(); return; }
    const item = movie();
    if ((props.watchlist || []).some(w => String(w.id) === String(item.id))) { if (props.showToast) props.showToast("Already in Vault! 🍿"); return; }
    if (props.showToast) props.showToast("Adding to Vault...");
    try {
      const castNames = details().credits?.cast?.slice(0, 5).map(c => c.name) || [];
      const director  = details().credits?.crew?.find(c => c.job === 'Director')?.name || '';
      const castList  = [...castNames, director].filter(Boolean);
      await setDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), {
        id: String(item.id), title: item.title || item.name, media_type: item.media_type || 'movie',
        poster_path: item.poster_path, backdrop_path: item.backdrop_path,
        release_date: item.release_date || item.first_air_date || '',
        status: 'Planned', addedAt: new Date(), castList,
      });
      if (props.showToast) props.showToast("Added to Vault! 🍿");
      props.onClose();
    } catch { if (props.showToast) props.showToast("Error adding to vault."); }
  };

  const handleSimilarClick = (item) => {
    const normalizedItem = {
      ...item,
      media_type: item.media_type || (movie().media_type === 'tv' ? 'tv' : 'movie')
    };

    const inVault = (props.watchlist || []).some(w => String(w.id) === String(item.id));

    if (inVault) {
      const vaultItem = props.watchlist.find(w => String(w.id) === String(item.id));
      setOverrideItem(vaultItem);
    } else {
      setOverrideItem({ ...normalizedItem, _isPreviewOverride: true });
    }

    document.querySelector('.overflow-y-auto.hide-scrollbar.w-full')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isPreviewOverride = createMemo(() => !!overrideItem()?._isPreviewOverride);
  const effectiveIsPreview = createMemo(() => isPreview() || isPreviewOverride());

  const getStreamUrl = (serverId) => {
    if (!serverId) return '';
    return resolvedUrl();
  };

  return (
    <div class="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4 animate-fade-in overflow-hidden"
      style="background: rgba(0,0,0,0.85); backdrop-filter: blur(20px)"
      onClick={props.onClose}>
      
      <div class="relative w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-5xl bg-[#05060a] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/5 animate-pop-in"
        onClick={e => e.stopPropagation()}>

        <Show when={showPlayer()}>
          <DirectPlayPlayer
            url={getStreamUrl(activeServer())}
            title={movie()?.title || movie()?.name}
            onClose={() => {
              setShowPlayer(false);
              hydrateSessionProgressFromElapsed();
              saveProgressToDb();
            }}
            watchProgress={watchProgress()}
            setWatchProgress={setWatchProgress}
            mediaType={movie()?.media_type}
            season={currentSeasonNumber()}
            episode={currentEpisodeNumber()}
          />
        </Show>

        <div class="overflow-y-auto hide-scrollbar w-full flex-1">
          <MediaHeader 
            movie={movie()} 
            details={details()} 
            trailerKey={trailerKey()} 
            onClose={props.onClose} 
            playTrailer={playTrailer()}
            setPlayTrailer={setPlayTrailer}
            effectiveIsPreview={effectiveIsPreview()}
            addToVaultFromPreview={addToVaultFromPreview}
          />

          <div class="px-5 sm:px-10 pb-12 -mt-12 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div class="lg:col-span-8 space-y-8">
                <Show when={!isEdit()}>
                  <RatingsPanel movie={movie()} omdbData={omdbData()} />
                  
                  <Show when={movie()?.media_type === 'tv' && !effectiveIsPreview()}>
                    <TvTracker 
                      movie={movie()}
                      form={form()}
                      setForm={setForm}
                      progressPct={progressPct()}
                      tvSeasons={tvSeasons()}
                      selectedSeason={selectedSeason()}
                      setSelectedSeason={setSelectedSeason}
                      seasonsLoading={seasonsLoading()}
                      selectedSeasonEpisodes={selectedSeasonEpisodes()}
                      expandedEpisodes={expandedEpisodes()}
                      setExpandedEpisodes={setExpandedEpisodes}
                      checkIfWatched={checkIfWatched}
                      toggleEpisodeWatched={toggleEpisodeWatched}
                    />
                  </Show>

                  <div class="space-y-4">
                    <h4 class="type-caption text-gray-400 flex items-center gap-2">
                      <Icon name="notes" class="text-[14px]" style="color: var(--p)" /> Storyline
                    </h4>
                    <p class="text-gray-300 leading-relaxed text-sm sm:text-base font-medium opacity-80">
                      {details()?.overview || movie()?.overview || 'No overview available.'}
                    </p>
                  </div>

                  <CastCrewList details={details()} setPersonId={setPersonId} />
                </Show>

                <Show when={isEdit()}>
                  <EditForm 
                    form={form()} 
                    setForm={setForm} 
                    movie={movie()} 
                    allAvailablePlatforms={allAvailablePlatforms()}
                    togglePlatform={togglePlatform}
                    saveChanges={saveChanges}
                    setIsEdit={setIsEdit}
                    onDelete={() => {
                      if(confirm("Delete from Vault?")) {
                        deleteDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)));
                        props.onClose();
                      }
                    }}
                  />
                </Show>
              </div>

              <div class="lg:col-span-4 space-y-6">
                <StreamingPanel 
                  movie={movie()}
                  availableServers={availableServers()}
                  activeServer={activeServer()}
                  setActiveServer={setActiveServer}
                  showToast={props.showToast}
                  onServerResolved={(url) => setResolvedUrl(url)}
                  setShowPlayer={setShowPlayer}
                  inferDurationSeconds={inferDurationSeconds}
                  setContentDuration={setContentDuration}
                  setWatchProgress={setWatchProgress}
                  setPlayerStartProgress={setPlayerStartProgress}
                  setReceivedRealProgress={setReceivedRealProgress}
                  setPlayerSessionStart={setPlayerSessionStart}
                />

                <InfoGrid 
                  movie={movie()} 
                  details={details()} 
                  effectiveIsPreview={effectiveIsPreview()}
                  movieFranchises={movieFranchises()}
                  setIsEdit={setIsEdit}
                />

                <Show when={similarItems().length > 0}>
                  <div class="pt-4 border-t border-white/5">
                    <h4 class="type-caption text-gray-400 mb-4">Similar Titles</h4>
                    <div class="grid grid-cols-3 gap-3">
                      <For each={similarItems().slice(0, 6)}>{(item) => (
                        <button 
                          onClick={() => handleSimilarClick(item)}
                          class="aspect-[2/3] rounded-lg overflow-hidden border border-white/5 hover:border-[var(--p)] transition-all active:scale-95 group relative"
                        >
                          <img 
                            src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} 
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            alt=""
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                            <p class="text-[8px] font-bold text-white truncate">{item.title || item.name}</p>
                          </div>
                        </button>
                      )}</For>
                    </div>
                  </div>
                </Show>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Show when={personId()}>
        <PersonModal id={personId()} onClose={() => setPersonId(null)} />
      </Show>
    </div>
  );
}
