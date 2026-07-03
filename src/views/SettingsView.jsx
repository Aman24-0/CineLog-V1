import { For, Show, createMemo } from 'solid-js';
import { Icon, getSafeGenres } from '../utils';

const AchievementBadge = (props) => (
  <div
    class="flex flex-col items-center gap-2 w-[76px] shrink-0"
    style={{ opacity: props.unlocked ? 1 : 0.35 }}
  >
    <div
      class="w-14 h-14 rounded-2xl flex items-center justify-center relative"
      style={{
        background: props.unlocked ? 'var(--p-dim)' : 'var(--raised)',
        border: `1px solid ${props.unlocked ? 'color-mix(in srgb, var(--p) 40%, transparent)' : 'var(--border)'}`,
        'box-shadow': props.unlocked ? '0 0 16px var(--p-glow)' : 'none',
        transition: 'all 220ms ease-out'
      }}
    >
      <Icon name={props.icon} class="text-2xl" style={{ color: props.unlocked ? 'var(--p)' : 'var(--muted)' }} />
      <Show when={!props.unlocked}>
        <div
          class="absolute inset-0 flex items-center justify-center rounded-2xl"
          style="background: rgba(0,0,0,0.45)"
        >
          <Icon name="lock" class="text-xs" style="color: var(--muted)" />
        </div>
      </Show>
    </div>
    <span
      class="text-center leading-tight"
      style={{
        color: props.unlocked ? 'var(--text)' : 'var(--muted)',
        'font-size': '8px',
        'font-weight': 700,
        'letter-spacing': '0.04em',
        'font-family': "'Outfit', sans-serif",
        'max-width': '72px',
        'line-height': '1.3'
      }}
    >
      {props.name}
    </span>
  </div>
);

export function SettingsView(props) {
  const list = () => props.watchlist?.() || [];

  const completed = createMemo(() => list().filter(m => m.status === 'Completed'));
  const watching = createMemo(() => list().filter(m => m.status === 'Watching'));
  const planned = createMemo(() => list().filter(m => m.status === 'Planned' || m.status === 'Plan to Watch'));

  const completionPct = createMemo(() => {
    const total = list().length;
    if (total === 0) return 0;
    return Math.round((completed().length / total) * 100);
  });

  const favoriteGenre = createMemo(() => {
    const counts = {};
    completed().forEach(m => getSafeGenres(m).forEach(g => { counts[g] = (counts[g] || 0) + 1; }));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? { name: sorted[0][0], count: sorted[0][1] } : null;
  });

  const favoriteActor = createMemo(() => {
    const counts = {};
    completed().forEach(m => (m.castList || []).forEach(name => {
      if (name) counts[name] = (counts[name] || 0) + 1;
    }));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? { name: sorted[0][0], count: sorted[0][1] } : null;
  });

  const uniqueGenreCount = createMemo(() => {
    const set = new Set();
    list().forEach(m => getSafeGenres(m).forEach(g => set.add(g)));
    return set.size;
  });

  const tvCompleted = createMemo(() => completed().filter(m => m.media_type === 'tv').length);

  const memberSince = createMemo(() => {
    const timestamps = list()
      .map(m => {
        const ts = m.addedAt;
        if (!ts) return null;
        if (ts.seconds) return new Date(ts.seconds * 1000);
        if (ts instanceof Date) return ts;
        if (typeof ts === 'string') { const d = new Date(ts); return isNaN(d.getTime()) ? null : d; }
        return null;
      })
      .filter(Boolean);
    if (timestamps.length === 0) return null;
    return new Date(Math.min(...timestamps.map(d => d.getTime())));
  });

  const memberSinceText = createMemo(() => {
    if (!memberSince()) return null;
    return memberSince().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  const thisMonthCount = createMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return completed().filter(m => {
      if (!m.watchDate) return false;
      const d = new Date(m.watchDate);
      return !isNaN(d.getTime()) && d >= start && d <= now;
    }).length;
  });

  const achievements = createMemo(() => {
    const total = list().length;
    const comp = completed().length;
    const rated = completed().filter(m => Number(m.rating) > 0).length;
    const genres = uniqueGenreCount();
    const tvComp = tvCompleted();
    return [
      { id: 'first',     name: 'First Watch',  desc: 'Complete your first title',     icon: 'play_circle',      unlocked: comp >= 1 },
      { id: 'cinephile', name: 'Cinephile',    desc: 'Complete 25 titles',             icon: 'movie',            unlocked: comp >= 25 },
      { id: 'binge',     name: 'Binge Master',  desc: 'Complete 50 titles',             icon: 'fast_forward',     unlocked: comp >= 50 },
      { id: 'century',   name: 'Century Club',  desc: 'Complete 100 titles',            icon: 'military_tech',    unlocked: comp >= 100 },
      { id: 'collector', name: 'Collector',    desc: 'Add 100 to vault',             icon: 'inventory_2',      unlocked: total >= 100 },
      { id: 'hoarder',   name: 'Hoarder',     desc: 'Add 500 to vault',             icon: 'warehouse',        unlocked: total >= 500 },
      { id: 'critic',    name: 'Critic',       desc: 'Rate 10+ titles',              icon: 'rate_review',      unlocked: rated >= 10 },
      { id: 'explorer',  name: 'Explorer',     desc: 'Watch 10+ genres',             icon: 'explore',          unlocked: genres >= 10 },
      { id: 'series',    name: 'Series Fan',   desc: 'Complete 10 series',            icon: 'live_tv',          unlocked: tvComp >= 10 },
      { id: 'dedicated', name: 'Dedicated',    desc: 'Add 1000 to vault',            icon: 'workspace_premium', unlocked: total >= 1000 },
    ];
  });

  const unlockedCount = createMemo(() => achievements().filter(a => a.unlocked).length);

  const themes = [
    { id: 'pearl',       name: 'Pearl',       hex: '#ffffff' },
    { id: 'sage',        name: 'Sage',        hex: '#a8ff78' },
    { id: 'matrix',      name: 'Matrix',      hex: '#39ff14' },
    { id: 'netflix',     name: 'Netflix',     hex: '#ff2d55' },
    { id: 'cinematic',   name: 'Cinematic',   hex: '#FFD700' },
    { id: 'interstellar',name: 'Interstellar',hex: '#00c2ff' },
    { id: 'neonhorizon', name: 'Neon Horizon',hex: '#ff2af0' },
    { id: 'vibranium',   name: 'Vibranium',   hex: '#9d4edd' }
  ];

  return (
    <div class="pb-24 animate-fade-in px-5 max-w-2xl mx-auto">

      {/* ── BACK HEADER ── */}
      <div class="flex items-center gap-3 mb-6 pt-2">
        <button
          onClick={() => props.setView('dashboard')}
          class="p-2.5 rounded-full active:scale-95 border border-white/10"
          style="background: var(--raised)"
        >
          <Icon name="arrow_back" class="text-white text-sm" />
        </button>
        <h1 class="type-modal-title text-white">Profile &amp; Settings</h1>
      </div>

      {/* ═══════════════════════════════════════════════════════
         PROFILE CARD
         ═══════════════════════════════════════════════════════ */}
      <div class="relative rounded-3xl overflow-hidden mb-8 border animate-fade-up"
        style="background: var(--surface); border-color: var(--border)"
      >
        <div
          class="h-28 sm:h-32"
          style="background: linear-gradient(135deg, var(--p) 0%, var(--p2) 60%, var(--p) 100%); opacity: 0.18"
        />
        <div
          class="absolute top-0 left-0 right-0 h-28 sm:h-32 pointer-events-none"
          style="background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 40px 40px"
        />

        <div class="px-5 sm:px-6 -mt-12 pb-6 relative z-10">
          <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-5">
            <Show when={props.user?.photoURL} fallback={
              <div
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shrink-0 relative"
                style="background: var(--raised); border: 2px solid var(--border-active)"
              >
                <Icon name="person" class="text-3xl" style="color: var(--muted)" />
              </div>
            }>
              <img
                src={props.user.photoURL}
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 relative"
                style="border: 3px solid var(--p); box-shadow: 0 0 24px var(--p-glow), 0 8px 24px rgba(0,0,0,0.6); opacity: 0; transition: opacity 300ms ease-out"
                onLoad={[e => { e.target.style.opacity = '1'; }]}
                onError={[e => { e.target.style.opacity = '0'; e.target.style.display = 'none'; }]}
                alt=""
              />
            </Show>

            <div class="flex-1 min-w-0 text-center sm:text-left">
              <h2 class="font-black text-xl sm:text-2xl text-white leading-tight truncate">
                {props.user?.displayName || 'Guest'}
              </h2>
              <Show when={props.user?.email}>
                <p class="type-metadata text-gray-400 mt-0.5 truncate">{props.user.email}</p>
              </Show>
              <Show when={!props.user}>
                <p class="type-metadata text-gray-500 mt-0.5">Not signed in</p>
              </Show>
              <div class="flex items-center justify-center sm:justify-start gap-3 mt-2 flex-wrap">
                <Show when={memberSinceText()}>
                  <span
                    class="type-caption flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                    style="background: var(--p-dim); color: var(--p); border: 1px solid color-mix(in srgb, var(--p) 18%, transparent)"
                  >
                    <Icon name="calendar_today" style="font-size: 11px" />
                    {memberSinceText()}
                  </span>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
         ACHIEVEMENTS — Logged-in only
         ═══════════════════════════════════════════════════════ */}
      <Show when={props.user}>
        <div class="mb-8 animate-fade-up">
          <div class="flex justify-between items-end mb-4">
            <p class="section-title !mb-0">Achievements</p>
            <span class="type-caption" style="color: var(--p)">
              {unlockedCount()} / {achievements().length} Unlocked
            </span>
          </div>
          <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-2 stagger">
            <For each={achievements()}>
              {(a) => <AchievementBadge {...a} />}
            </For>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
           FAVORITES — Genre + Actor
           ═══════════════════════════════════════════════════════ */}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-fade-up">
          <div class="glass-surface rounded-2xl p-5 border border-white/5">
            <span class="type-label mb-3 flex items-center gap-1.5">
              <Icon name="category" style="font-size: 13px; color: var(--p)" /> Favorite Genre
            </span>
            <Show when={favoriteGenre()} fallback={
              <p class="type-metadata font-semibold" style="color: var(--muted)">No data yet</p>
            }>
              <div class="flex items-center gap-3">
                <div
                  class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style="background: var(--p-dim); border: 1px solid color-mix(in srgb, var(--p) 25%, transparent)"
                >
                  <Icon name="category" class="text-xl" style="color: var(--p)" />
                </div>
                <div class="min-w-0">
                  <p class="type-metadata font-bold text-white truncate">{favoriteGenre().name}</p>
                  <p class="type-caption" style="color: var(--muted)">{favoriteGenre().count} title{favoriteGenre().count === 1 ? '' : 's'} watched</p>
                </div>
              </div>
            </Show>
          </div>

          <div class="glass-surface rounded-2xl p-5 border border-white/5">
            <span class="type-label mb-3 flex items-center gap-1.5">
              <Icon name="person" style="font-size: 13px; color: var(--p2)" /> Favorite Actor
            </span>
            <Show when={favoriteActor()} fallback={
              <p class="type-metadata font-semibold" style="color: var(--muted)">No data yet</p>
            }>
              <div class="flex items-center gap-3">
                <div
                  class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style="background: color-mix(in srgb, var(--p2) 12%, transparent); border: 1px solid color-mix(in srgb, var(--p2) 25%, transparent)"
                >
                  <Icon name="person" class="text-xl" style="color: var(--p2)" />
                </div>
                <div class="min-w-0">
                  <p class="type-metadata font-bold text-white truncate">{favoriteActor().name}</p>
                  <p class="type-caption" style="color: var(--muted)">{favoriteActor().count} title{favoriteActor().count === 1 ? '' : 's'} watched</p>
                </div>
              </div>
            </Show>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
           ACTIVITY SUMMARY
           ═══════════════════════════════════════════════════════ */}
        <div class="glass-surface rounded-2xl p-5 border border-white/5 mb-8 animate-fade-up">
          <span class="type-label mb-4 flex items-center gap-1.5">
            <Icon name="insights" style="font-size: 13px; color: var(--p)" /> Activity
          </span>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="flex items-baseline gap-2 mb-1">
                <span class="type-stat text-white" style="font-size: 1.75rem">{thisMonthCount()}</span>
                <span class="type-caption" style="color: var(--muted)">this month</span>
              </div>
              <p class="type-caption" style="color: var(--dim)">Titles completed</p>
            </div>
            <div>
              <div class="flex items-baseline gap-2 mb-1">
                <span class="type-stat" style="color: var(--p); font-size: 1.75rem">{uniqueGenreCount()}</span>
                <span class="type-caption" style="color: var(--muted)">genres</span>
              </div>
              <p class="type-caption" style="color: var(--dim)">Explored</p>
            </div>
          </div>
        </div>
      </Show>

      {/* ═══════════════════════════════════════════════════════
         DIVIDER
         ═══════════════════════════════════════════════════════ */}
      <Show when={props.user}>
        <div class="flex items-center gap-4 my-8">
          <div class="flex-1 h-px" style="background: var(--border)" />
          <span class="type-caption shrink-0" style="color: var(--muted)">Settings</span>
          <div class="flex-1 h-px" style="background: var(--border)" />
        </div>
      </Show>

      {/* ═══════════════════════════════════════════════════════
         APPEARANCE
         ═══════════════════════════════════════════════════════ */}
      <p class="section-title">Appearance</p>
      <div class="flex gap-4 overflow-x-auto hide-scrollbar py-2 mb-6 stagger animate-fade-up">
        <For each={themes}>
          {(t) => (
            <div
              onClick={() => props.setTheme(t.id)}
              class="flex flex-col items-center gap-2 cursor-pointer group animate-fade-up shrink-0"
            >
              <div
                class={`w-12 h-12 rounded-full border-2 active:scale-95 ${props.theme === t.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'border-transparent group-hover:scale-105'}`}
                style={{ background: t.hex, transition: 'transform 220ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 220ms ease-out', ...(props.theme === t.id ? { 'box-shadow': `0 0 16px ${t.hex}66` } : {}) }}
              />
              <span class="type-caption text-gray-400 group-hover:text-white">{t.name}</span>
            </div>
          )}
        </For>
      </div>

      {/* ═══════════════════════════════════════════════════════
         GENERAL
         ═══════════════════════════════════════════════════════ */}
      <p class="section-title">General</p>
      <div class="flex flex-col gap-2 mb-6 stagger animate-fade-up">
        <div onClick={props.onServerSettings} class="settings-row">
          <Icon name="dns" class="text-gray-400 shrink-0" />
          <span class="flex-1 type-metadata text-white font-medium">Streaming Servers</span>
          <Icon name="chevron_right" class="text-gray-600 shrink-0" />
        </div>
        <div onClick={() => props.setView('sync')} class="settings-row">
          <Icon name="import_export" class="text-gray-400 shrink-0" />
          <span class="flex-1 type-metadata text-white font-medium">Data Sync</span>
          <Icon name="chevron_right" class="text-gray-600 shrink-0" />
        </div>
        <div onClick={() => props.setView('analytics')} class="settings-row">
          <Icon name="bar_chart" class="text-gray-400 shrink-0" />
          <span class="flex-1 type-metadata text-white font-medium">Insights</span>
          <Icon name="chevron_right" class="text-gray-600 shrink-0" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
         DANGER ZONE
         ═══════════════════════════════════════════════════════ */}
      <Show when={props.user}>
        <p class="section-title" style="color: #ff2d55">Danger Zone</p>
        <div class="flex flex-col gap-2 animate-fade-up">
          <button
            onClick={props.onLogout}
            class="w-full border border-white/20 text-white rounded-xl py-3 type-button active:scale-95 hover:bg-white/5"
          >
            Logout
          </button>
          <button
            onClick={props.onNuke}
            class="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 type-button active:scale-95 mt-1"
          >
            Nuke Vault
          </button>
        </div>
      </Show>
    </div>
  );
}
