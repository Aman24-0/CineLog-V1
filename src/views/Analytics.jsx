import { createMemo, For, Show, onMount } from 'solid-js';
import { Icon, getSafeGenres } from '../utils';

/* ── SVG Donut Chart: Movies vs TV split ── */
function DonutChart(props) {
  const movieCount = createMemo(() => props.completed.filter(m => m.media_type !== 'tv').length);
  const tvCount = createMemo(() => props.completed.filter(m => m.media_type === 'tv').length);
  const total = movieCount() + tvCount();
  const movieRatio = total > 0 ? movieCount() / total : 0.5;
  const circumference = 2 * Math.PI * 45;

  return (
    <div class="glass-surface rounded-[1.5rem] p-5 border border-white/5 animate-fade-up">
      <h3 class="type-caption text-white mb-4 flex items-center gap-2" style="font-size: 11px; font-weight: 700">
        <Icon name="pie_chart" style="color: var(--p)" /> Media Split
      </h3>
      <div class="flex items-center justify-center py-4">
        <svg viewBox="0 0 120 120" class="w-28 h-28 sm:w-32 sm:h-32">
          <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12" />
          <circle
            cx="60" cy="60" r="45"
            fill="none"
            stroke="var(--p)"
            stroke-width="12"
            stroke-linecap="round"
            transform="rotate(-90 60 60)"
            class="animate-donut-fill"
            style={`stroke-dasharray: ${circumference}; --donut-offset: ${circumference * (1 - movieRatio)}`}
          />
          <text x="60" y="53" text-anchor="middle" style="fill: white; font-size: 20px; font-weight: 900; font-family: 'Bebas Neue', cursive">{movieCount()}</text>
          <text x="60" y="72" text-anchor="middle" style="fill: var(--muted); font-size: 8px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; font-family: 'Azeret Mono', monospace">MOVIES</text>
          <text x="60" y="90" text-anchor="middle" style="fill: var(--muted); font-size: 16px; font-weight: 900; font-family: 'Bebas Neue', cursive">{tvCount()}</text>
          <text x="60" y="104" text-anchor="middle" style="fill: var(--muted); font-size: 7px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; font-family: 'Azeret Mono', monospace">SHOWS</text>
        </svg>
      </div>
      <div class="flex justify-center gap-6 mt-3">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full" style="background: var(--p); box-shadow: 0 0 8px var(--p-glow)" />
          <span class="type-caption" style="color: var(--text); font-size: 11px">Movies</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full" style="background: var(--p2); box-shadow: 0 0 8px rgba(255,120,196,0.3)" />
          <span class="type-caption" style="color: var(--muted); font-size: 11px">Shows</span>
        </div>
      </div>
    </div>
  );
}

/* ── Rating Distribution Histogram ── */
function RatingDistribution(props) {
  const max = createMemo(() => Math.max(1, ...props.items.map(i => i.value)));

  return (
    <div class="glass-surface rounded-[1.5px] p-5 border border-white/5 animate-fade-up">
      <h3 class="type-caption text-white mb-5 flex items-center gap-2" style="font-size: 11px; font-weight: 700">
        <Icon name="star" style="color: var(--p)" /> {props.title}
      </h3>
      <Show when={props.items.length > 0} fallback={
        <p class="type-metadata text-gray-500 font-bold">No data yet.</p>
      }>
        <div class="flex flex-col gap-1.5">
          <For each={props.items}>{(item, idx) => {
            const pct = (item.value / max()) * 100;
            return (
              <div class="flex items-center gap-3 animate-fade-up" style={`animation-delay: ${idx() * 50}ms`}>
                <span class="type-caption w-8 text-right shrink-0" style="color: var(--muted)">{item.label}</span>
                <div class="flex-1 h-7 bg-white/5 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full animate-bar-grow"
                    style={{
                      width: `${pct}%`,
                      background: 'linear-gradient(90deg, var(--p), var(--p2))',
                      'box-shadow': '0 0 8px var(--p-glow)'
                    }}
                  />
                </div>
                <span class="type-caption w-6 text-right shrink-0" style="color: var(--p)">{item.value}</span>
              </div>
            );
          }</For>
        </div>
      </Show>
    </div>
  );
}

/* ── Monthly Trend Chart ── */
function MonthlyTrend(props) {
  const max = createMemo(() => Math.max(1, ...props.items.map(i => i.value)));
  const chartW = 380;
  const chartH = 105;
  const padX = 10;
  const padTop = 10;
  const padBot = 25;

  const points = createMemo(() => {
    const pts = [];
    for (let i = 0; i < props.items.length; i++) {
      const x = padX + (i * (chartW / (props.items.length - 1));
      const y = padTop + chartH - (props.items[i].value / max()) * chartH;
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  });

  const areaPoints = createMemo(() => `${padX},${padTop + chartH} ${points} ${padX + chartW},${padTop + chartH} ${padX + chartW},${padTop + chartH}`);

  return (
    <div class="glass-surface rounded-[1.5rem] p-5 border border-white/5 animate-fade-up">
      <h3 class="type-caption text-white mb-4 flex items-center gap-2" style="font-size: 11px; font-weight: 700">
        <Icon name="bar_chart" style="color: var(--p)" /> {props.title}
      </h3>
      <Show when={props.items.length > 0} fallback={
        <p class="type-metadata text-gray-500 font-bold">No data yet.</p>
      }>
        <div class="relative" style="height: 140px">
          <svg viewBox="0 0 400 140" class="w-full h-full" preserveAspectRatio="none" style="overflow: visible;">
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--p)" stop-opacity="0.35" />
                <stop offset="100%" stop-color="var(--p)" stop-opacity="0.02" />
              </linearGradient>
            </defs>

            {[25, 50, 75, 100].map(pct => (
              <line
                x1="10" y1={padTop + chartH * (1 - pct / 100)} x2="390" y2={padTop + chartH * (1 - pct / 100)}
                stroke="rgba(255,255,255,0.03)" stroke-width="1"
              />
            ))}

            <polygon points={areaPoints()} fill="url(#trendGradient)" class="animate-fade-in" />
            <polyline points={points()} fill="none" stroke="var(--p)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-fade-in" />
            <For each={props.items}>{(item, i) => {
              const x = padX + (i * (chartW / (props.items.length - 1));
              const y = padTop + chartH - (item.value / max()) * chartH;
              return (
                <circle cx={x} cy={y} r="2.5" fill="var(--p)" class="animate-fade-in" style={`animation-delay: ${i * 50}ms}`} />
              );
            }}</For>
            <For each={props.items}>{(item, i) => {
              const x = padX + (i * (chartW / (props.items.length - 1));
              return (
                <text x={x} y="136" text-anchor="middle" style="fill: var(--muted); font-size: 9px; font-weight: 700; font-family: 'Azeret Mono', monospace">{item.label}</text>
              );
            }</For>
          </svg>
        </div>
      </Show>
    </div>
  );
}

/* ── Actor Progress Rings ── */
function ActorRings(props) {
  const max = createMemo(() => Math.max(1, ...props.items.map(i => i.value)));
  const circumference = 2 * Math.PI * 24;

  return (
    <div class="glass-surface rounded-[1.5rem] p-5 border border-white/5 animate-fade-up">
      <h3 class="type-caption text-white mb-5 flex items-center gap-2" style="font-size: 11px; font-weight: 700">
        <Icon name="groups" style="color: var(--p)" /> {props.title}
      </h3>
      <Show when={props.items.length > 0} fallback={
        <p class="type-metadata text-gray-500 font-bold">No data yet.</p>
      }>
        <div class="grid grid-cols-5 gap-4 sm:grid-cols-5">
          <For each={props.items}>{(item, idx) => {
            const pct = (item.value / max()) * 100;
            const offset = circumference * (1 - pct / 100);
            const initials = item.label.split(' ').map(w => w[0]).join('');

            return (
              <div class="flex flex-col items-center gap-2 animate-fade-up" style={`animation-delay: ${idx() * 60}ms`}>
                <div class="relative">
                  <svg viewBox="0 0 56 56" class="w-12 h-12 sm:w-14 sm:h-14">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="5" />
                    <circle
                      cx="28" cy="28" r="24"
                      fill="none"
                      stroke="var(--p)"
                      stroke-width="5"
                      stroke-linecap="round"
                      class="animate-ring-fill"
                      style={`stroke-dasharray: ${circumference}; --ring-offset: ${offset}`}
                    />
                    <text x="28" y="31" text-anchor="middle" style="fill: white; font-size: 12px; font-weight: 800; font-family: 'Bebas Neue', cursive">{item.value}</text>
                  </svg>
                </div>
                <p class="type-caption text-gray-300 text-center truncate w-full" style="font-size: 8px">{item.label}</p>
              </div>
            );
          }</For>
        </div>
      </Show>
    </div>
  );
}

/* ── Director Bars ── */
function DirectorBars(props) {
  const max = createMemo(() => Math.max(1, ...props.items.map(i => i.value)));

  return (
    <div class="glass-surface rounded-[1.5rem] p-5 border border-white/5 animate-fade-up">
      <h3 class="type-caption text-white mb-5 flex items-center gap-2" style="font-size: 11px; font-weight: 700">
        <Icon name="movie_edit" style="color: var(--p)" /> {props.title}
      </h3>
      <Show when={props.items.length > 0} fallback={
        <p class="type-metadata text-gray-500 font-bold">No data yet.</p>
      }>
        <div class="space-y-3">
          <For each={props.items}>{(item, idx) => {
            const pct = (item.value / max()) * 100;
            const initials = item.label.split(' ').map(w => w[0]).join('');

            return (
              <div class="flex items-center gap-3 animate-fade-up" style={`animation-delay: ${idx() * 50}ms`}>
                <div
                  class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-black"
                  style="background: var(--p-dim); color: var(--p); border: 1px solid color-mix(in srgb, var(--p) 25%, transparent); box-shadow: 0 0 12px var(--p-glow)"
                >
                  {initials}
                </div>
                <div class="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full animate-bar-grow"
                    style={{
                      width: `${pct}%`,
                      background: 'var(--p)',
                      'box-shadow': '0 0 8px var(--p-glow)'
                    }}
                  />
                </div>
                <span class="type-caption w-6 text-right shrink-0" style="color: var(--p)">{item.value}</span>
              </div>
            );
          </For>
        </div>
      </Show>
    </div>
  );
}

/* ── Metric Card (EXISTING — UNCHANGED) ── */
function MetricCard(props) {
  return (
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

/* ── Bar List (kept for potential reuse) ── */
function BarList(props) {
  const max = createMemo(() => Math.max(1, ...props.items.map(i => i.value)));
  return (
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
              <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full animate-bar-grow"
                  style={{
                    width: `${(item.value / max()) * 100}%`,
                    background: 'var(--p)',
                    'box-shadow: 0 0 12px var(--p-glow)'
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

/* ── Main Component ── */
export function Analytics(props) {
  const completed = createMemo(() => props.watchlist().filter(m => m.status === 'Completed'));

  const completionPct = createMemo(() => {
    const total = props.watchlist().length;
    if (total === 0) return 0;
    return Math.round((completed().length / total) * 100);
  });

  const stats = createMemo(() => {
    const done = completed();
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
      if (name) {
        const bucket = idx >= 5 ? directorCounts : actorCounts;
        bucket[name] = (bucket[name] || 0) + 1;
      }
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

  const ratingBuckets = createMemo(() => {
    const buckets = Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}-${i + 2}`, value: 0 }));
    completed().forEach(m => {
      const r = Math.round(Number(m.rating) || 0);
      if (r >= 1 && r <= 10) buckets[r - 1].value++;
    });
    return buckets;
  });

  return (
    <div class="animate-fade-in pb-10 space-y-6">

      {/* Header */}
      <div>
        <div class="type-label mb-2" style="color: var(--p)">◈ Personal Analytics</div>
        <h2 class="type-page-title text-white">STATS</h2>
      </div>

      {/* Metric cards */}
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
        <MetricCard icon="movie"    label="Movies Watched" value={stats().movies} />
        <MetricCard icon="live_tv"  label="Shows Watched"  value={stats().shows}  />
        <MetricCard icon="schedule" label="Watch Time"     value={`${stats().hours}h`} />
        <MetricCard icon="star"     label="Avg Rating"     value={stats().avg}    sub="Your score" />
      </div>

      {/* Completion progress bar */}
      <Show when={props.watchlist().length > 0}>
        <div class="glass-surface rounded-2xl p-5 border border-white/5 animate-fade-up">
          <div class="flex justify-between items-center mb-3">
            <span class="type-label flex items-center gap-2">
              <Icon name="trending_up" style="font-size: 13px; color: var(--p)" /> Vault Completion
            </span>
            <span class="type-stat" style="color: var(--p); font-size: 1.75rem">{completionPct()}<span style="font-size: 0.9rem; color: var(--muted)">%</span></span>
          </div>
          <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full"
              style={{
                width: `${completionPct}%`,
                background: 'var(--p)',
                'box-shadow': '0 0 10px var(--p-glow)',
                transition: 'width 800ms var(--ease-smooth)'
              }}
            />
          </div>
          <p class="type-caption mt-2.5" style="color: var(--muted)">
            {completed().length} of {props.watchlist().length} titles completed
          </p>
        </div>
      </Show>

      {/* Charts — 2x2 grid: 6 distinct chart types */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DonutChart completed={completed} />
        <RatingDistribution items={ratingBuckets()} title="Rating Distribution" icon="star" />
        <BarList title="Genre Distribution" icon="donut_large" items={genreBars()} />
        <MonthlyTrend items={monthly()} title="Watched Per Month" icon="bar_chart" />
        <ActorRings items={people().actors} title="Top Actors" icon="groups" />
        <DirectorBars items={people().directors} title="Top Directors" icon="movie_edit" />
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
