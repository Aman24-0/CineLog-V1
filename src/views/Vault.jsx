import { createSignal, createEffect, createMemo, For, Show, onMount, onCleanup } from 'solid-js';
import { Icon, getSafeGenres, getSafePlatforms } from '../utils';
import { MovieCard } from '../components/MovieCard';

const resolveTimelineDate = (m) => {
  if (m.watchDate && typeof m.watchDate === 'string' && m.watchDate.trim()) {
    const d = new Date(m.watchDate); if (!isNaN(d.getTime())) return d;
  }
  if (m.seasonDates && typeof m.seasonDates === 'object') {
    const ends = Object.values(m.seasonDates).map(s => s?.end ? new Date(s.end) : null).filter(d => d && !isNaN(d.getTime()));
    if (ends.length > 0) return new Date(Math.max(...ends.map(d => d.getTime())));
    const starts = Object.values(m.seasonDates).map(s => s?.start ? new Date(s.start) : null).filter(d => d && !isNaN(d.getTime()));
    if (starts.length > 0) return new Date(Math.max(...starts.map(d => d.getTime())));
  }
  if (m.endDate)   { const d = new Date(m.endDate);   if (!isNaN(d.getTime())) return d; }
  if (m.startDate) { const d = new Date(m.startDate); if (!isNaN(d.getTime())) return d; }
  if (m.addedAt?.seconds) return new Date(m.addedAt.seconds * 1000);
  if (m.addedAt instanceof Date) return m.addedAt;
  if (typeof m.addedAt === 'string') { const d = new Date(m.addedAt); if (!isNaN(d.getTime())) return d; }
  return null;
};

export function Vault(props) {
  const [search, setSearch] = createSignal('');
  const defaultFilters = {
    type: 'all', status: props.activeStatus || 'all', region: 'all', genre: 'all',
    platform: 'all', sort: 'recent', tag: 'all',
    imdbMin: '', imdbMax: '', rtMin: '', rtMax: '', yearMin: '', yearMax: '', runtimeMin: '', runtimeMax: ''
  };
  const [filters, setFilters] = createSignal(defaultFilters);
  const [showFilter, setShowFilter] = createSignal(false);
  const [displayLimit, setDisplayLimit] = createSignal(20);
  const [viewMode, setViewMode] = createSignal('grid');

  createEffect(() => setFilters(f => ({ ...f, status: props.activeStatus || 'all' })));

  let prevViewMode = 'grid';
  createEffect(() => {
    const mode = viewMode();
    if (mode === 'timeline' && prevViewMode !== 'timeline') {
      setFilters({ type: 'all', status: 'Completed', region: 'all', genre: 'all', platform: 'all', sort: 'watch_desc', tag: 'all', imdbMin: '', imdbMax: '', rtMin: '', rtMax: '', yearMin: '', yearMax: '', runtimeMin: '', runtimeMax: '' });
    } else if (mode === 'grid' && prevViewMode === 'timeline') {
      setFilters({ type: 'all', status: props.activeStatus || 'all', region: 'all', genre: 'all', platform: 'all', sort: 'recent', tag: 'all', imdbMin: '', imdbMax: '', rtMin: '', rtMax: '', yearMin: '', yearMax: '', runtimeMin: '', runtimeMax: '' });
    }
    prevViewMode = mode;
  });

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) setDisplayLimit(prev => prev + 20);
  };
  onMount(() => window.addEventListener('scroll', handleScroll, { passive: true }));
  onCleanup(() => window.removeEventListener('scroll', handleScroll));

  const uniqueGenres    = createMemo(() => [...new Set(props.watchlist().flatMap(m => getSafeGenres(m)))].filter(Boolean).sort());
  const uniquePlatforms = createMemo(() => [...new Set(props.watchlist().flatMap(m => getSafePlatforms(m)))].filter(Boolean).sort());
  const uniqueTags      = createMemo(() => [...new Set(props.watchlist().map(m => m.tag).filter(Boolean))].sort());

  const filtered = createMemo(() => {
    let f = props.watchlist();
    if (search()) {
      const s = search().toLowerCase();
      f = f.filter(m => (m.title || m.name || '').toLowerCase().includes(s) || (m.castList && m.castList.some(c => c.toLowerCase().includes(s))));
    }
    if (filters().type !== 'all')     f = f.filter(m => m.media_type === filters().type);
    if (filters().status !== 'all')   f = f.filter(m => m.status === filters().status || (filters().status === 'Planned' && m.status === 'Plan to Watch'));
    if (filters().region !== 'all')   f = f.filter(m => (m.region || 'International') === filters().region);
    if (filters().genre !== 'all')    f = f.filter(m => getSafeGenres(m).includes(filters().genre));
    if (filters().platform !== 'all') f = f.filter(m => getSafePlatforms(m).includes(filters().platform));
    if (filters().tag !== 'all')      f = f.filter(m => m.tag === filters().tag);

    const inRange = (value, min, max) => {
      const n = Number(value);
      if (min !== '' && (isNaN(n) || n < Number(min))) return false;
      if (max !== '' && (isNaN(n) || n > Number(max))) return false;
      return true;
    };
    f = f.filter(m => {
      const year = parseInt(String(m.release_date || m.first_air_date || '').substring(0, 4)) || NaN;
      const rt   = Number(String(m.rtRating || '').replace('%', '')) || NaN;
      return inRange(m.imdbRating, filters().imdbMin, filters().imdbMax)
        && inRange(rt, filters().rtMin, filters().rtMax)
        && inRange(year, filters().yearMin, filters().yearMax)
        && inRange(m.runtime, filters().runtimeMin, filters().runtimeMax);
    });

    return f.sort((a, b) => {
      if (filters().sort === 'watch_desc' || filters().sort === 'watch_asc') {
        const dA = resolveTimelineDate(a), dB = resolveTimelineDate(b);
        const hasA = dA !== null, hasB = dB !== null;
        if (hasA && !hasB) return -1; if (!hasA && hasB) return 1; if (!hasA && !hasB) return 0;
        return filters().sort === 'watch_desc' ? dB.getTime() - dA.getTime() : dA.getTime() - dB.getTime();
      }
      if (filters().sort === 'year_desc')   return (parseInt(String(b.release_date || b.first_air_date || '').substring(0, 4)) || 0) - (parseInt(String(a.release_date || a.first_air_date || '').substring(0, 4)) || 0);
      if (filters().sort === 'rating_desc') return (b.rating || 0) - (a.rating || 0);
      if (filters().sort === 'title_asc')   return (a.title || a.name || '').localeCompare(b.title || b.name || '');
      return (b.addedAt?.seconds || 0) - (a.addedAt?.seconds || 0);
    });
  });

  const activeFilterCount = createMemo(() =>
    Object.entries(filters()).filter(([key, value]) => {
      if (key === 'sort') return value !== 'recent';
      return value !== 'all' && value !== '';
    }).length
  );

  const timelineItems = createMemo(() =>
    filtered().filter(m => m.status === 'Completed' && resolveTimelineDate(m) !== null)
  );

  const groupedTimeline = createMemo(() => {
    const list = timelineItems().slice(0, displayLimit());
    const groups = [];
    let currentGroup = null;
    list.forEach(m => {
      const dateObj   = resolveTimelineDate(m);
      const monthYear = !dateObj ? 'Unknown Date' : dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      if (!currentGroup || currentGroup.label !== monthYear) {
        currentGroup = { label: monthYear, items: [] };
        groups.push(currentGroup);
      }
      currentGroup.items.push(m);
    });
    return groups;
  });

  return (
    <div class="animate-fade-in pb-10">

      {/* ── Sticky toolbar ── */}
      <div
        class="sticky top-0 z-40 pt-4 pb-5 -mx-5 px-5 border-b mb-6"
        style="background: rgba(5,6,10,0.92); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-color: var(--border)"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="type-page-title text-white">VAULT</h2>
          <div class="flex items-center gap-3">
            <div
              class="flex p-1 rounded-full border shadow-sm"
              style="background: var(--surface); border-color: var(--border-active)"
              role="group" aria-label="View mode"
            >
              <button
                onClick={() => setViewMode('grid')}
                class={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${viewMode() === 'grid' ? 'text-[#0c0e14] shadow-[0_0_12px_var(--p-glow)]' : 'text-gray-500 hover:text-white'}`}
                style={viewMode() === 'grid' ? 'background: var(--p)' : ''}
                aria-label="Grid view" aria-pressed={viewMode() === 'grid'}
              >
                <Icon name="grid_view" class="text-sm" aria-hidden="true" />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                class={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${viewMode() === 'timeline' ? 'text-[#0c0e14] shadow-[0_0_12px_var(--p-glow)]' : 'text-gray-500 hover:text-white'}`}
                style={viewMode() === 'timeline' ? 'background: var(--p)' : ''}
                aria-label="Timeline view" aria-pressed={viewMode() === 'timeline'}
              >
                <Icon name="timeline" class="text-sm" aria-hidden="true" />
              </button>
            </div>
            <button
              onClick={() => setShowFilter(true)}
              class="flex items-center gap-2 px-4 py-2.5 rounded-full type-caption border active:scale-95 transition-all"
              style="background: var(--surface); border-color: var(--border-active); color: var(--muted)"
              aria-label={`Filter vault${activeFilterCount() > 0 ? ` — ${activeFilterCount()} active` : ''}`}
            >
              <Icon name="tune" class="text-sm" aria-hidden="true" />
              <span class="hidden sm:inline">Filter</span>
              {activeFilterCount() > 0 && (
                <span class="px-2 py-0.5 rounded-full type-caption text-black" style="background: var(--p)" aria-hidden="true">
                  {activeFilterCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        <div
          class="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all"
          style="background: var(--surface); border-color: var(--border)"
          onFocusIn={e  => { e.currentTarget.style.borderColor = 'var(--p)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--p-dim)'; }}
          onFocusOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <Icon name="search" style="color: var(--dim); flex-shrink: 0" aria-hidden="true" />
          <input
            value={search()}
            onInput={e => { setSearch(e.target.value); setDisplayLimit(30); }}
            placeholder="Search movies, series, actors…"
            class="bg-transparent border-none w-full outline-none type-metadata"
            style="color: var(--text)"
            aria-label="Search vault"
            type="search"
            autocomplete="off"
            spellcheck="false"
          />
          <Show when={search().length > 0 || activeFilterCount() > 0}>
            <button
              onClick={() => { setFilters({ ...defaultFilters, status: 'all' }); setSearch(''); setDisplayLimit(30); props.onFilterChange && props.onFilterChange('all'); }}
              class="type-caption px-3 py-1.5 rounded-full shrink-0 active:scale-95 transition-all"
              style="background: rgba(255,45,85,0.15); border: 1px solid rgba(255,45,85,0.4); color: #ff2d55"
              aria-label="Clear search and filters"
            >
              Clear
            </button>
          </Show>
        </div>
      </div>

      <div class="sr-only" aria-live="polite" aria-atomic="true">
        {filtered().length > 0 ? `${filtered().length} title${filtered().length !== 1 ? 's' : ''} found` : 'No titles found'}
      </div>

      {/* ── Empty states ── */}
      <Show when={filtered().length === 0}>
        <Show
          when={props.isGuest}
          fallback={
            <div class="empty-state py-16 animate-fade-in">
              <div class="empty-state-icon" aria-hidden="true">
                <Icon name="sentiment_dissatisfied" style="color: var(--muted); font-size: 36px" />
              </div>
              <p class="empty-state-title">No Matches</p>
              <p class="empty-state-body">No titles match your current filters. Try adjusting or clearing them.</p>
              <button
                onClick={() => { setFilters({ ...defaultFilters, status: 'all' }); setSearch(''); }}
                class="type-button px-6 py-3 rounded-full active:scale-95 mt-2"
                style="background: var(--raised); border: 1px solid var(--border-active); color: var(--muted)"
              >
                Clear Filters
              </button>
            </div>
          }
        >
          <div class="empty-state py-16 rounded-[2rem] border glass-surface" style="border-color: var(--border-active)">
            <div class="empty-state-icon" aria-hidden="true">
              <Icon name="video_library" fill style="color: var(--p); font-size: 36px" />
            </div>
            <p class="empty-state-title">Vault is Empty</p>
            <p class="empty-state-body">Sign in to start tracking movies and series.</p>
            <button
              onClick={props.onLogin}
              class="type-button px-8 py-3 rounded-full text-black shadow-lg active:scale-95 mt-2"
              style="background: var(--p); box-shadow: 0 0 16px var(--p-glow)"
            >
              Sign In to Begin
            </button>
          </div>
        </Show>
      </Show>

      {/* ── Grid view ── */}
      <Show when={viewMode() === 'grid' && filtered().length > 0}>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 animate-fade-in" role="list" aria-label="Vault grid">
          <For each={filtered().slice(0, displayLimit())}>
            {(m) => (
              <div role="listitem">
                <MovieCard movie={m} onClick={() => props.openMovie(m.id)} />
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* ── Timeline view ── */}
      <Show when={viewMode() === 'timeline' && timelineItems().length > 0}>
        <div class="relative space-y-10 animate-fade-in pb-10" role="feed" aria-label="Watch history timeline">
          <div
            class="absolute left-[1.25rem] top-5 bottom-5 w-0.5 -translate-x-px pointer-events-none"
            style="background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) calc(100% - 40px), transparent)"
            aria-hidden="true"
          />
          <For each={groupedTimeline()}>
            {(group) => (
              <div class="relative" role="group" aria-label={group.label}>
                <div
                  class="sticky z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full ml-10 mb-5"
                  style="top: 150px; background: var(--p); color: #0c0e14; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'Outfit', sans-serif; box-shadow: 0 0 15px var(--p-glow)"
                >
                  <Icon name="event" style="font-size: 14px; color: #0c0e14" aria-hidden="true" />
                  {group.label}
                </div>
                <div class="space-y-4 timeline-stagger">
                  <For each={group.items}>
                    {(m) => {
                      const dateObj = resolveTimelineDate(m);
                      const day     = dateObj ? dateObj.getDate() : '—';
                      return (
                        <div
                          class="relative flex items-center group cursor-pointer pl-10 pr-2 animate-timeline-in"
                          onClick={() => props.openMovie(m.id)}
                          onKeyDown={e => { if (e.key === 'Enter') props.openMovie(m.id); }}
                          role="article"
                          tabIndex={0}
                          aria-label={`${m.title || m.name}, ${dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'date unknown'}`}
                        >
                          <div
                            class="absolute left-[1.25rem] -translate-x-1/2 w-8 h-8 rounded-full bg-[#08090b] border-2 flex items-center justify-center shadow-lg z-10 transition-transform duration-200"
                            style="border-color: var(--p)"
                            aria-hidden="true"
                          >
                            <span style="color: #fff; font-size: 11px; font-weight: 800; font-family: 'Outfit', sans-serif">{day}</span>
                          </div>
                          <div class="upcoming-card w-full p-3 rounded-[1.5rem] flex gap-4">
                            <Show
                              when={m.poster_path}
                              fallback={
                                <div class="w-14 h-20 sm:w-16 sm:h-24 bg-[#171921] rounded-xl flex items-center justify-center shrink-0 border border-white/5" aria-hidden="true">
                                  <Icon name="movie" class="text-gray-600" />
                                </div>
                              }
                            >
                              <div class="w-14 h-20 sm:w-16 sm:h-24 rounded-xl overflow-hidden relative shrink-0" style="background: #141414; box-shadow: var(--shadow-raised)">
                                <div class="poster-loading" aria-hidden="true" />
                                <img
                                  src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                                  class="poster-img absolute inset-0 w-full h-full object-cover"
                                  onLoad={e => { e.target.classList.add('img-loaded'); e.target.previousSibling?.classList.add('hidden'); }}
                                  alt="" aria-hidden="true"
                                />
                              </div>
                            </Show>
                            <div class="flex-1 flex flex-col justify-center py-1 min-w-0 pr-2">
                              <p class="type-metadata font-bold text-gray-100 group-hover:text-white truncate">{m.title || m.name}</p>
                              <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                                <span class="type-caption bg-white/10 text-gray-300 px-2 py-0.5 rounded border border-white/5 shrink-0">{m.media_type === 'tv' ? 'Series' : 'Movie'}</span>
                                <Show when={m.status}>
                                  <span class="type-caption px-2 py-0.5 rounded shrink-0" style="color: var(--p); background: var(--p-dim); border: 1px solid color-mix(in srgb, var(--p) 20%, transparent)">
                                    {m.status === 'Plan to Watch' ? 'Planned' : m.status}
                                  </span>
                                </Show>
                              </div>
                              <Show when={m.rating || m.imdbRating}>
                                <div class="flex items-center gap-3 mt-2.5">
                                  <Show when={m.rating}>
                                    <span class="type-metadata font-black flex items-center gap-1" style="color: var(--p)">
                                      <Icon name="star" fill class="text-[12px]" aria-hidden="true" /> {m.rating}/10
                                    </span>
                                  </Show>
                                </div>
                              </Show>
                            </div>
                            <div class="hidden sm:flex self-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
                              <Icon name="chevron_right" class="text-2xl" style="color: var(--p)" />
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

      <Show when={viewMode() === 'timeline' && filtered().length > 0 && timelineItems().length === 0}>
        <div class="empty-state py-16 animate-fade-in">
          <div class="empty-state-icon" aria-hidden="true">
            <Icon name="event_busy" style="color: var(--muted); font-size: 36px" />
          </div>
          <p class="empty-state-title">No Dates Found</p>
          <p class="empty-state-body">Timeline shows completed titles with a Watch Date set. Add dates in the edit panel.</p>
        </div>
      </Show>

      <Show when={viewMode() === 'grid' && filtered().length > displayLimit()}>
        <div class="flex items-center justify-center gap-2 py-8 type-caption" style="color: var(--p)">
          <Icon name="progress_activity" class="animate-spin text-sm" aria-hidden="true" />
          <span>Loading more titles…</span>
        </div>
      </Show>

      {/* Filter modal */}
      <Show when={showFilter()}>
        <FilterModal
          filters={filters()}
          setFilters={(v) => { setFilters(v); setDisplayLimit(20); }}
          uniqueGenres={uniqueGenres()}
          uniquePlatforms={uniquePlatforms()}
          uniqueTags={uniqueTags()}
          onClose={() => setShowFilter(false)}
          onFilterChange={props.onFilterChange}
          onClear={() => { setFilters({ ...defaultFilters, status: 'all' }); props.onFilterChange && props.onFilterChange('all'); setDisplayLimit(20); }}
        />
      </Show>
    </div>
  );
}

function FilterModal(props) {
  onMount(() => document.body.style.overflow = 'hidden');
  onCleanup(() => document.body.style.overflow = '');

  return (
    <div
      class="fixed inset-0 flex items-end sm:items-center justify-center sm:p-4 z-[999999] animate-fade-in"
      style="background: rgba(0,0,0,0.75); backdrop-filter: blur(8px)"
      onClick={props.onClose}
      role="dialog" aria-modal="true" aria-label="Filter vault"
    >
      <div
        class="glass-surface w-full max-w-sm rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl modal-sheet-enter flex flex-col"
        style="border-color: var(--border-active); background: rgba(9,11,16,0.97); max-height: 90vh"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div class="w-12 h-1.5 rounded-full mx-auto mt-4 mb-2 sm:hidden flex-shrink-0" style="background: var(--border-active)" aria-hidden="true" />

        {/* Header */}
        <div class="flex justify-between items-center border-b px-6 pt-2 pb-4 flex-shrink-0" style="border-color: var(--border)">
          <h3 class="type-modal-title text-white flex items-center gap-2" style="font-size: 20px">
            <Icon name="tune" style="color: var(--p)" aria-hidden="true" /> Filters
          </h3>
          <button
            onClick={props.onClose}
            class="w-9 h-9 rounded-full hover:bg-white/5 active:scale-95 flex items-center justify-center"
            style="color: var(--muted)"
            aria-label="Close filters"
          >
            <Icon name="close" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable filter fields */}
        <div class="flex-1 overflow-y-auto hide-scrollbar px-6 py-4 space-y-4">
          <FilterSel label="Status"   val={props.filters.status}   set={(v) => { props.setFilters({ ...props.filters, status: v });   props.onFilterChange && props.onFilterChange(v); }} opts={[{ l: 'All', v: 'all' }, { l: 'Planned', v: 'Planned' }, { l: 'Watching', v: 'Watching' }, { l: 'Completed', v: 'Completed' }]} />
          <FilterSel label="Tags"     val={props.filters.tag}      set={(v) => props.setFilters({ ...props.filters, tag: v })}      opts={[{ l: 'All Tags', v: 'all' }, ...props.uniqueTags.map(t => ({ l: t, v: t }))]} />
          <FilterSel label="Type"     val={props.filters.type}     set={(v) => props.setFilters({ ...props.filters, type: v })}     opts={[{ l: 'All', v: 'all' }, { l: 'Movies', v: 'movie' }, { l: 'Series', v: 'tv' }]} />
          <FilterSel label="Region"   val={props.filters.region}   set={(v) => props.setFilters({ ...props.filters, region: v })}   opts={[{ l: 'All', v: 'all' }, { l: 'Indian', v: 'Indian' }, { l: 'International', v: 'International' }]} />
          <FilterSel label="Platform" val={props.filters.platform} set={(v) => props.setFilters({ ...props.filters, platform: v })} opts={[{ l: 'All Platforms', v: 'all' }, ...props.uniquePlatforms.map(p => ({ l: p, v: p }))]} />
          <FilterSel label="Genre"    val={props.filters.genre}    set={(v) => props.setFilters({ ...props.filters, genre: v })}    opts={[{ l: 'All Genres', v: 'all' }, ...props.uniqueGenres.map(g => ({ l: g, v: g }))]} />
          <RangeFilter label="IMDb"    min={props.filters.imdbMin}    max={props.filters.imdbMax}    setMin={v => props.setFilters({ ...props.filters, imdbMin: v })}    setMax={v => props.setFilters({ ...props.filters, imdbMax: v })}    minPlaceholder="0"    maxPlaceholder="10" />
          <RangeFilter label="RT %"    min={props.filters.rtMin}      max={props.filters.rtMax}      setMin={v => props.setFilters({ ...props.filters, rtMin: v })}      setMax={v => props.setFilters({ ...props.filters, rtMax: v })}      minPlaceholder="0"    maxPlaceholder="100" />
          <RangeFilter label="Year"    min={props.filters.yearMin}    max={props.filters.yearMax}    setMin={v => props.setFilters({ ...props.filters, yearMin: v })}    setMax={v => props.setFilters({ ...props.filters, yearMax: v })}    minPlaceholder="1990" maxPlaceholder="2026" />
          <RangeFilter label="Runtime" min={props.filters.runtimeMin} max={props.filters.runtimeMax} setMin={v => props.setFilters({ ...props.filters, runtimeMin: v })} setMax={v => props.setFilters({ ...props.filters, runtimeMax: v })} minPlaceholder="Min"  maxPlaceholder="Max" />
          <FilterSel label="Sort By"  val={props.filters.sort} set={(v) => props.setFilters({ ...props.filters, sort: v })} opts={[{ l: 'Recently Added', v: 'recent' }, { l: 'Watch Date ↓', v: 'watch_desc' }, { l: 'Watch Date ↑', v: 'watch_asc' }, { l: 'Release Year ↓', v: 'year_desc' }, { l: 'Rating ↓', v: 'rating_desc' }, { l: 'Title A–Z', v: 'title_asc' }]} />
        </div>

        {/*
          FIX: Action buttons — flex-shrink-0 keeps them pinned at bottom.
          padding-bottom uses env(safe-area-inset-bottom) so they clear the
          iPhone home indicator and the fixed bottom nav bar on any device.
        */}
        <div
          class="grid grid-cols-2 gap-3 px-6 pt-4 flex-shrink-0"
          style="
            border-top: 1px solid var(--border);
            padding-bottom: max(16px, calc(env(safe-area-inset-bottom, 0px) + 80px));
          "
        >
          <button
            onClick={props.onClear}
            class="w-full type-button py-4 rounded-xl"
            style="background: var(--raised); color: var(--muted); border: 1px solid var(--border)"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
          <button
            onClick={props.onClose}
            class="w-full type-button py-4 rounded-xl text-[#0c0e14]"
            style="background: var(--p); box-shadow: 0 0 20px var(--p-glow)"
            aria-label="Apply filters and close"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

const RangeFilter = (props) => (
  <div class="grid grid-cols-[90px_1fr] items-center gap-2">
    <span class="type-label">{props.label}</span>
    <div class="grid grid-cols-2 gap-2">
      <input value={props.min} onInput={e => props.setMin(e.target.value)} type="number" placeholder={props.minPlaceholder || 'Min'} aria-label={`${props.label} minimum`} class="w-full bg-[#0c0e14] border border-white/10 rounded-xl px-3 py-2 type-metadata text-white outline-none focus:border-[var(--p)]" />
      <input value={props.max} onInput={e => props.setMax(e.target.value)} type="number" placeholder={props.maxPlaceholder || 'Max'} aria-label={`${props.label} maximum`} class="w-full bg-[#0c0e14] border border-white/10 rounded-xl px-3 py-2 type-metadata text-white outline-none focus:border-[var(--p)]" />
    </div>
  </div>
);

const FilterSel = (props) => (
  <div class="grid grid-cols-[90px_1fr] items-center gap-2">
    <label class="type-label" for={`filter-${props.label.toLowerCase().replace(/\s/g, '-')}`}>{props.label}</label>
    <select id={`filter-${props.label.toLowerCase().replace(/\s/g, '-')}`} value={props.val} onChange={e => props.set(e.target.value)} class="w-full type-metadata text-white font-medium cursor-pointer">
      <For each={props.opts}>{(o) => <option value={o.v || o} class="bg-[#0c0e14]">{o.l || o}</option>}</For>
    </select>
  </div>
);
