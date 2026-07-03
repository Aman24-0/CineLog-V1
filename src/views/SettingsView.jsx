import { For, Show, createMemo } from 'solid-js';

export function SettingsView(props) {
  const list = () => props.watchlist?.() || [];

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
            <Show when={props.user} fallback={
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
                onLoad={e => { e.target.style.opacity = '1'; }}
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
