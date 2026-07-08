import { createSignal, createEffect, createMemo, onMount, onCleanup, Show, For } from 'solid-js';
import { doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, cleanPlatform, getSafeGenres, getSafePlatforms } from '../utils';

import { PersonModal } from './PersonModal';

import { MediaHeader } from '../components/details/MediaHeader';
import { RatingsPanel } from '../components/details/RatingsPanel';
import { StreamingPanel, resolveStreamingUrl } from '../components/details/StreamingPanel';
import { TvTracker } from '../components/details/TvTracker';
import { CastCrewList } from '../components/details/CastCrewList';
import { InfoGrid } from '../components/details/InfoGrid';
import { EditForm } from '../components/details/EditForm';

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

  // IMDb-aware streaming: holds the fully-resolved playback URL after IMDb/TMDB
  // lookup. Set by StreamingPanel (on Watch Now) and re-set when the user
  // switches servers from inside the fullscreen player.
  const [resolvedUrl, setResolvedUrl] = createSignal('');
  const [resolving, setResolving]     = createSignal(false);

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
    uid: props.uid, isGuest: props.isGuest, isPreview, setForm, setContentDuration,
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
      id: key, name: custom[key].name || 'Custom Server', type: custom[key].type || 'multi',
      idMode: custom[key].idMode || 'TMDB',
      movieUrl: custom[key].movieUrl || '', tvUrl: custom[key].tvUrl || '', icon: 'dns'
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
      setTimeout(() => { primePlaybackProgress(); setShowPlayer(true); }, 200);
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

  // IMDb-aware: when the active server changes inside the fullscreen player,
  // re-resolve the playback URL (TMDB servers are sync; IMDb servers fetch
  // the external_ids endpoint first).
  const handlePlayerServerChange = async (serverId) => {
    setActiveServer(serverId);
    const server = availableServers().find(s => s.id === serverId);
    if (!server) { setResolvedUrl(''); return; }
    setResolving(true);
    try {
      const url = await resolveStreamingUrl(server, movie(), props.showToast, {
        season: currentSeasonNumber(),
        episode: currentEpisodeNumber(),
        watchProgress: movie()?.watchProgress,
      });
      setResolvedUrl(url);
    } finally {
      setResolving(false);
    }
  };

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
    if (props.isGuest) { props.showToast('Sign in to save changes! 🔒'); if (props.onLogin) props.onLogin(); return; }
    const nextSeason   = parseInt(form().season)   || 1;
    const nextEpisode  = parseInt(form().episode)  || 1;
    const prevSeason   = parseInt(movie().season)  || 1;
    const prevEpisode  = parseInt(movie().episode) || 1;
    const episodeChanged = movie().media_type === 'tv' && (nextSeason !== prevSeason || nextEpisode !== prevEpisode);
    const updates = {
      status: form().status, rating: parseFloat(form().rating) || 0,
      watchDate: form().watchDate, seasonDates: form().seasonDates,
      notes: form().notes, region: form().region,
      season: nextSeason, episode: nextEpisode, tag: form().tag,
      genresList:    form().genres.split(',').map(s => s.trim()).filter(Boolean),
      platformsList: form().platforms.split(',').map(s => cleanPlatform(s.trim())).filter(Boolean),
    };
    if (episodeChanged) {
      const inferred = inferDurationSeconds();
      updates.watchProgress = { currentTime: 0, duration: inferred || 0, server: activeServer() || null, updatedAt: new Date().toISOString(), season: nextSeason, episode: nextEpisode };
      setWatchProgress({ currentTime: 0, duration: inferred || 0 });
      setPlayerStartProgress(0);
    }
    await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)), updates);
    if (props.showToast) props.showToast('Saved ✓', 'success');
    setIsEdit(false);
  };

  const addToVaultFromPreview = async () => {
    if (props.isGuest) { if (props.showToast) props.showToast('Sign in to add to Vault! 🔒'); if (props.onLogin) props.onLogin(); return; }
    const item = movie();
    if ((props.watchlist || []).some(w => String(w.id) === String(item.id))) { if (props.showToast) props.showToast('Already in Vault! 🍿'); return; }
    if (props.showToast) props.showToast('Adding to Vault...');
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
      if (props.showToast) props.showToast('Added to Vault! 🍿', 'success');
      props.onClose();
    } catch { if (props.showToast) props.showToast('Error adding to vault.', 'error'); }
  };

  const handleSimilarClick = (item) => {
    const normalizedItem = { ...item, media_type: item.media_type || (movie().media_type === 'tv' ? 'tv' : 'movie') };
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

  const titleText = () => movie()?.title || movie()?.name || 'Details';

  return (
    <div
      class="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={props.onClose}
      role="dialog"
      aria-modal="true"
      aria-label={titleText()}
    >
      <div class="absolute inset-0 bg-[#08090b] overflow-hidden pointer-events-none">
        <Show when={movie()?.backdrop_path}>
          <img src={`https://image.tmdb.org/t/p/w500${movie().backdrop_path}`} class="backdrop-ambient" onLoad={e => e.target.classList.add('img-loaded')} alt="" aria-hidden="true" />
        </Show>
        <div class="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      <Show when={movie()}>
        <div
          class="w-full max-w-xl lg:max-w-[800px] bg-[#08090b]/80 backdrop-blur-3xl rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden border relative max-h-[95vh] modal-sheet-enter flex flex-col"
          style="border-color: rgba(255,255,255,0.09); box-shadow: var(--shadow-float), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={props.onClose}
            class="absolute top-4 right-4 z-[100] bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full hover:bg-black/80 active:scale-95 transition-all"
            aria-label={`Close ${titleText()}`}
          >
            <Icon name="close" class="text-sm text-white" aria-hidden="true" />
          </button>

          <div class="overflow-y-auto hide-scrollbar w-full">
            <MediaHeader
              movie={movie()} details={details()} playTrailer={playTrailer()} setPlayTrailer={setPlayTrailer}
              trailerKey={trailerKey()} isPreview={effectiveIsPreview()} isGuest={props.isGuest}
              isEdit={isEdit()} setIsEdit={setIsEdit} showToast={props.showToast} onLogin={props.onLogin}
            />

            <div class="px-6 md:px-8 pb-28 relative z-10">
              <RatingsPanel omdbData={omdbData()} movie={movie()} />

              <Show when={isEdit()} fallback={
                <div class="animate-fade-in">
                  <Show when={!effectiveIsPreview()}>
                    <StreamingPanel
                      availableServers={availableServers()} activeServer={activeServer()} setActiveServer={setActiveServer}
                      showToast={props.showToast}
                      movie={movie()} inferDurationSeconds={inferDurationSeconds} setContentDuration={setContentDuration}
                      setWatchProgress={setWatchProgress} setPlayerStartProgress={setPlayerStartProgress}
                      setReceivedRealProgress={setReceivedRealProgress} setPlayerSessionStart={setPlayerSessionStart}
                      setShowPlayer={setShowPlayer}
                      onServerResolved={setResolvedUrl}
                      onResolvingChange={setResolving}
                      currentSeasonNumber={currentSeasonNumber()}
                      currentEpisodeNumber={currentEpisodeNumber()}
                    />
                  </Show>

                  <p class="type-metadata text-gray-400 mb-6 leading-relaxed italic border-l-2 pl-3" style="border-color: color-mix(in srgb, var(--p) 30%, transparent)">
                    "{details().overview || (typeof movie().overview === 'string' ? movie().overview : 'No overview available.')}"
                  </p>

                  <Show when={movie().media_type === 'tv'}>
                    <TvTracker
                      movie={movie()} tvSeasons={tvSeasons()} selectedSeason={selectedSeason()} setSelectedSeason={setSelectedSeason}
                      seasonsLoading={seasonsLoading()} selectedSeasonEpisodes={selectedSeasonEpisodes()}
                      episodeDocId={episodeDocId} watchedEpisodes={watchedEpisodes()} expandedEpisodes={expandedEpisodes()}
                      setExpandedEpisodes={setExpandedEpisodes} toggleEpisodeWatched={toggleEpisodeWatched}
                      isCompleted={isCompleted()} currentSeasonNumber={currentSeasonNumber()} currentEpisodeNumber={currentEpisodeNumber()}
                      progressPct={progressPct()} getCurrentEpisode={getCurrentEpisode} checkIfWatched={checkIfWatched}
                      isPreviewMode={effectiveIsPreview()}
                    />
                  </Show>

                  <CastCrewList credits={details().credits} setPersonId={setPersonId} />

                  <InfoGrid
                    movie={movie()} isPreview={effectiveIsPreview()} details={details()}
                    genresText={details().genres ? details().genres.map(g => g.name).join(', ') : (getSafeGenres(movie()).join(', ') || 'N/A')}
                    richPlatforms={richPlatforms()} movieFranchises={movieFranchises()} similarItems={similarItems()}
                    onSimilarClick={handleSimilarClick} calculateDays={calculateDays}
                  />

                  <Show when={effectiveIsPreview()}>
                    <button
                      onClick={addToVaultFromPreview}
                      class="w-full mt-6 type-button py-4 px-5 rounded-xl active:scale-95 flex items-center justify-center gap-2 border"
                      style="background: var(--p); color: #05060a; border-color: var(--p); box-shadow: 0 0 24px var(--p-glow); min-height: 52px"
                      aria-label="Add to My Universe"
                    >
                      <Icon name="add_circle" class="text-lg" aria-hidden="true" /> Add to My Universe
                    </button>
                  </Show>

                  <Show when={!effectiveIsPreview()}>
                    <div class="mt-8 flex justify-end">
                      <button
                        onClick={async () => {
                          if (props.isGuest) { if (props.showToast) props.showToast('Sign in to edit vault! 🔒'); if (props.onLogin) props.onLogin(); return; }
                          if (confirm('Permanently delete?')) {
                            await deleteDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)));
                            if (props.showToast) props.showToast('Deleted');
                            props.onClose();
                          }
                        }}
                        class="type-caption text-red-500/50 hover:text-red-500 flex items-center gap-1 mx-auto active:scale-95"
                        aria-label={`Remove ${titleText()} from Universe`}
                      >
                        <Icon name="delete" class="text-sm" aria-hidden="true" /> Remove from Universe
                      </button>
                    </div>
                  </Show>
                </div>
              }>
                <EditForm
                  form={form()} setForm={setForm} movie={movie()}
                  allAvailablePlatforms={allAvailablePlatforms} togglePlatform={togglePlatform} saveChanges={saveChanges}
                />
              </Show>
            </div>
          </div>
        </div>
      </Show>

      {/* Fullscreen Player */}
      <Show when={showPlayer()}>
        <div class="fixed inset-0 bg-black z-[10000000] flex flex-col animate-fade-in" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Video player">
          <div class="p-4 flex justify-between items-center bg-[#0c0e14] border-b border-white/5 shadow-xl">
            <div class="flex items-center gap-3 overflow-hidden pr-2 flex-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  hydrateSessionProgressFromElapsed();
                  saveProgressToDb();
                  setPlayerSessionStart(null);
                  setPlayerStartProgress(0);
                  setShowPlayer(false);
                }}
                class="p-2 bg-white/5 hover:bg-white/10 rounded-full active:scale-95 transition-all shrink-0"
                aria-label="Exit player and save progress"
              >
                <Icon name="arrow_back" class="text-sm" aria-hidden="true" />
              </button>
              <h3 class="font-bold text-sm text-white truncate max-w-[150px]">{movie().title || movie().name}</h3>
            </div>
            <div class="flex gap-2 shrink-0">
              <Show when={availableServers().length > 1}>
                <div class="relative bg-white/5 border border-white/10 rounded-xl px-2 py-1.5 flex items-center gap-1 hover:bg-white/10 transition-colors">
                  <Icon name="router" class="text-gray-400 text-[14px]" aria-hidden="true" />
                  <select
                    value={activeServer()}
                    onChange={(e) => { e.stopPropagation(); handlePlayerServerChange(e.target.value); }}
                    class="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer pr-4 pl-1"
                    style="color: var(--p)"
                    aria-label="Select streaming server"
                  >
                    <For each={availableServers()}>
                      {(srv) => <option value={srv.id} class="bg-[#0c0e14] text-white">{srv.name}</option>}
                    </For>
                  </select>
                  <Icon name="expand_more" class="text-gray-400 text-[14px] absolute right-1 pointer-events-none" aria-hidden="true" />
                </div>
              </Show>
            </div>
          </div>

          <div class="flex-1 bg-black w-full h-full relative">
            <Show
              when={resolvedUrl() && !resolving()}
              fallback={
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="flex flex-col items-center gap-3">
                    <div class="w-10 h-10 border-2 border-[var(--p)] border-t-transparent rounded-full animate-spin" />
                    <p class="type-caption text-gray-400">Resolving Node…</p>
                  </div>
                </div>
              }
            >
              <iframe src={resolvedUrl()} class="w-full h-full border-none relative z-10" allowfullscreen title={`${movie().title || movie().name} — Stream`} />
            </Show>
          </div>
        </div>
      </Show>

      <Show when={personId()}>
        <PersonModal
          id={personId()} uid={props.uid} watchlist={props.watchlist}
          showToast={props.showToast} onClose={() => setPersonId(null)}
          openPreview={(item) => {
            setPersonId(null);
            if (props.openPreview) props.openPreview(item, 'fromPerson');
            else { props.onClose(); if (props.showToast) props.showToast(`Search for ${item.title || item.name} to view details!`); }
          }}
        />
      </Show>
    </div>
  );
}
