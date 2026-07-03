import { createMemo, For, Show } from 'solid-js';
import { Icon, getSafeGenres } from '../utils';

const yearMonth = (date) => date ? date.slice(0, 7) : null;

function MetricCard(props) {
  return (
    // p-5 = 20px; rounded-[1.5rem] = 24px; mb-2 = 8px
    <div class="glass-surface rounded-[1.5rem] p-5 border border-white/5 relative overflow-hidden animate-fade-up">
      <Icon name={props.icon} class="absolute -right-3 -bottom-3 text-7xl pointer-events-none" style="color: var(--p); opacity: 0.05" />
      <div class="type-label mb-2" style="color: var(--muted)">{props.label}</div>
      <div class="type-stat text-white">{props.value}</div>
      <Show when={props.sub}>
        <p class="type-caption text-gray-500 mt-1">{props.sub}</p>
      </Show>
    </div>
  );
}

function BarList(props) {
  const max = createMemo(() => Math.max(1, ...props.items.map(i => i.value)));
  return (
    // p-5 = 20px; space-y-3 = 12px; mb-4 = 16px
    <div class="glass-surface rounded-[1.5rem] p-5 border border-white/5 animate-fade-up">
      <h3 class="type-caption text-white mb-4 flex items-center gap-2" style="font-size: 11px; font-weight: 700">
        <Icon name={props.icon} style="color: var(--p)" /> {props.title}
      </h3>
      <Show when={props.items.length > 0} fallback={
        <p class="type-metadata text-gray-500 font-bold">No data yet.</p>
      }>
        <div class="space-y-3">
          <For each={props.items}>{(item, idx) => (
            <div class="animate-fade-up" style={`animation-delay: ${idx() * 40}ms`}>
              <div class="flex justify-between type-caption mb-1.5">
                <span class="text-gray-300 truncate pr-3">{item.label}</span>
                <span style="color: var(--p)">{item.value}</span>
              </div>
              {/* Progress bar with grow animation on mount */}
              <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full animate-bar-grow"
                  style={{
                    width: `${(item.value / max()) * 100}%`,
                    background: 'var(--p)',
                    'box-shadow': '0 0 12px var(--p-glow)'
                  }}
                />
              </div>
            </div>
          )}</For>
        </div>
      </Show>
    </div>
  );
}

export function Analytics(props) {
  const completed = createMemo(() => props.watchlist().filter(m => m.status === 'Completed'));

  const stats = createMemo(() => {
    const done     = completed();
    const movies   = done.filter(m => m.media_type !== 'tv').length;
    const shows    = done.filter(m => m.media_type === 'tv').length;
    const totalMins = done.reduce((sum, m) =>
      sum + (Number(m.runtime) || 0) * (m.media_type === 'tv' ? Math.max(1, Number(m.episode) || 1) : 1), 0);
    const ratings  = done.map(m => Number(m.rating)).filter(r => r > 0);
    return {
      movies, shows,
      hours: Math.round(totalMins / 60),
      avg: ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '-'
    };
  });

  const genreBars = createMemo(() => {
    const counts = {};
    completed().forEach(m => getSafeGenres(m).forEach(g => counts[g] = (counts[g] || 0) + 1));
    return Object.entries(counts).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 8);
  });

  const people = createMemo(() => {
    const actorCounts = {}, directorCounts = {};
    completed().forEach(m => (m.castList || []).forEach((name, idx) => {
      if (!name) return;
      const bucket = idx >= 5 ? directorCounts : actorCounts;
      bucket[name] = (bucket[name] || 0) + 1;
    }));
    const top = (obj) => Object.entries(obj).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5);
    return { actors: top(actorCounts), directors: top(directorCounts) };
  });

  const monthly = createMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: d.toLocaleString('en-US', { month: 'short' }), value: 0 });
    }
    const byKey = new Map(months.map(m => [m.key, m]));
    completed().forEach(m => { const k = yearMonth(m.watchDate); if (byKey.has(k)) byKey.get(k).value += 1; });
    return months;
  });

  return (
    // space-y-6 = 24px = 3×8; pb-10 = 40px = 5×8
    <div class="animate-fade-in pb-10 space-y-6">

      {/* Header */}
      <div>
        <div class="type-label mb-2" style="color: var(--p)">◈ Personal Analytics</div>
        <h2 class="type-page-title text-white">STATS</h2>
      </div>

      {/* Metric cards — gap-3 = 12px */}
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
        <MetricCard icon="movie"    label="Movies Watched" value={stats().movies} />
        <MetricCard icon="live_tv"  label="Shows Watched"  value={stats().shows}  />
        <MetricCard icon="schedule" label="Watch Time"     value={`${stats().hours}h`} />
        <MetricCard icon="star"     label="Avg Rating"     value={stats().avg}    sub="Your score" />
      </div>

      {/* Charts — gap-4 = 16px = 2×8 */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarList title="Genre Distribution"  icon="donut_large"  items={genreBars()} />
        <BarList title="Watched Per Month"   icon="bar_chart"    items={monthly()} />
        <BarList title="Top Actors"          icon="groups"       items={people().actors} />
        <BarList title="Top Directors"       icon="movie_edit"   items={people().directors} />
      </div>

      <Show when={completed().length === 0}>
        <div class="text-center p-10 glass-surface rounded-[2rem] border border-white/5 animate-fade-up">
          <Icon name="analytics" class="text-5xl mb-3" style="color: var(--p)" />
          <p class="type-metadata font-bold text-gray-400">Mark titles as completed to unlock richer analytics.</p>
        </div>
      </Show>
    </div>
  );
}
