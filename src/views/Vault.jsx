import { createSignal, createEffect, createMemo, For, Show, onMount, onCleanup } from 'solid-js';
import { Icon, getSafeGenres, getSafePlatforms } from '../utils';
import { MovieCard } from '../components/MovieCard';

const resolveTimelineDate = (m) => {
  if (m.watchDate && typeof m.watchDate === 'string' && m.watchDate.trim()) {
    const d = new Date(m.watchDate);
    if (!isNaN(d.getTime())) return d;
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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500)
      setDisplayLimit(prev => prev + 20);
  };
  onMount(() => window.addEventListener('scroll', handleScroll));
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
      <div class="sticky top-0 z-40 pt-4 pb-5 -mx-5 px-5 border-b mb-6"
        style="background: rgba(5,6,10,0.88); backdrop-filter: blur(24px); border-color: var(--border)">

        <div class="flex justify-between items-center mb-4">
          <h2 class="type-page-title text-white">VAULT</h2>

          <div class="flex items-center gap-3">
            <div class="flex p-1 rounded-full border shadow-sm" style="background: var(--surface); border-color: var(--border-active)">
              <button
                onClick={() => setViewMode('grid')}
                class={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${viewMode() === 'grid' ? 'text-[#0c0e14] shadow-[0_0_12px_var(--p-glow)]' : 'text-gray-500 hover:text-white'}`}
                style={viewMode() === 'grid' ? 'background: var(--p)' : ''}
                title="Grid View"
              >
                <Icon name="grid_view" class="text-sm sm:text-base" />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                class={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${viewMode() === 'timeline' ? 'text-[#0c0e14] shadow-[0_0_12px_var(--p-glow)]' : 'text-gray-500 hover:text-white'}`}
                style={viewMode() === 'timeline' ? 'background: var(--p)' : ''}
                title="Timeline View"
              >
                <Icon name="timeline" class="text-sm sm:text-base" />
              </button>
            </div>

            <button
              onClick={() => setShowFilter(true)}
              class="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full type-caption border active:scale-95"
              style="background: var(--surface); border-color: var(--border-active); color: var(--muted)"
            >
              <Icon name="tune" class="text-sm" />
              <span class="hidden sm:inline">Filter</span>
              {activeFilterCount() > 0 && (
                <span class="px-2 py-0.5 rounded-full type-caption text-black" style="background: var(--p)">
                  {activeFilterCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        <div
          class="flex items-center gap-3 rounded-xl px-4 py-3 border"
          style="background: var(--surface); border-color: var(--border)"
          onFocusIn={e  => { e.currentTarget.style.borderColor = 'var(--p)'; }}
          onFocusOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <Icon name="search" style="color: var(--dim)" />
          <input
            value={search()}
            onInput={e => { setSearch(e.target.value); setDisplayLimit(30); }}
            placeholder="Search movies, series, actors..."
            class="bg-transparent border-none w-full outline-none type-metadata text-white"
            style="color: var(--text)"
          />
          <Show when={search().length > 0 || activeFilterCount() > 0}>
            <button
              onClick={() => { setFilters({ type: 'all', status: 'all', region: 'all', genre: 'all', platform: 'all', sort: 'recent', tag: 'all' }); setSearch(''); setDisplayLimit(30); props.onFilterChange && props.onFilterChange('all'); }}
              class="type-caption px-3 py-1.5 rounded-full shrink-0 active:scale-95"
              style="background: rgba(255,45,85,0.15); border: 1px solid rgba(255,45,85,0.4); color: #ff2d55"
            >
              Clear
            </button>
          </Show>
        </div>
      </div>

      {/* ── Empty states ── */}
      <Show when={filtered().length === 0}>
        <Show when={props.isGuest} fallback={
          <div class="text-center p-12 animate-fade-in" style="color: var(--muted)">
            <Icon name="sentiment_dissatisfied" class="text-5xl mb-3" />
            <p class="type-metadata font-semibold">No titles match your filters.</p>
          </div>
        }>
          <div class="text-center p-12 animate-fade-in border rounded-[2rem] glass-surface" style="border-color: var(--border-active)">
            <Icon
