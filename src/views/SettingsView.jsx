import { For, Show, createMemo } from 'solid-js';
import { Icon } from '../utils';

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
    { id: 'pearl',        name: 'Pearl',        hex: '#ffffff' },
    { id: 'sage',         name: 'Sage',         hex: '#a8ff78' },
    { id: 'matrix',       name: 'Matrix',       hex: '#39ff14' },
    { id: 'netflix',      name: 'Netflix',      hex: '#ff2d55' },
    { id: 'cinematic',    name: 'Cinematic',    hex: '#FFD700' },
    { id: 'interstellar', name: 'Interstellar', hex: '#00c2ff' },
    { id: 'neonhorizon',  name: 'Neon Horizon', hex: '#ff2af0' },
    { id: 'vibranium',    name: 'Vibranium',    hex: '#9d4edd' },
  ];

  const totalMovies = createMemo(() => list().filter(m => m.media_type !== 'tv').length);
  const totalSeries = createMemo(() => list().filter(m => m.media_type === 'tv').length);
  const avgRating   = createMemo(() => {
    const rated = list().filter(m => m.rating > 0);
    if (rated.length === 0) return null;
    return (rated.reduce((sum, m) => sum + Number(m.rating), 0) / rated.length).toFixed(1);
  });

  return (
    <div class="pb-24 animate-fade-in max-w-2xl mx-auto" role="main" aria-label="Profile and settings">

      {/* ── BACK HEADER ── */}
      <div class="flex items-center gap-3 mb-6 pt-2">
        <button
          onClick={() => props.setView && props.setView('dashboard')}
          class="w-10 h-10 rounded-full active:scale-95 border border-white/10 flex items-center justify-center"
          style="background: var(--raised)"
          aria-label="Back to home"
        >
          <Icon name="arrow_back" class="text-white text-sm" aria-hidden="true" />
        </button>
        <h1 class="type-modal-title text-white">Profile &amp; Settings</h1>
      </div>

      {/* ═══════════════════════════════════════
         PROFILE CARD
      ═══════════════════════════════════════ */}
      <div
        class="relative rounded-3xl overflow-hidden mb-6 border animate-fade-up"
        style="background: var(--surface); border-color: var(--border)"
        role="region"
        aria-label="Profile"
      >
        {/* Banner */}
        <div
          class="h-28 sm:h-32"
          style="background: linear-gradient(135deg, var(--p) 0%, var(--p2) 60%, var(--p) 100%); opacity: 0.18"
          aria-hidden="true"
        />
        <div
          class="absolute top-0 left-0 right-0 h-28 sm:h-32 pointer-events-none"
          style="background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 40px 40px"
          aria-hidden="true"
        />

        <div class="px-5 sm:px-6 -mt-12 pb-6 relative z-10">
          <div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-5">

            {/*
              AVATAR — FIX: No duplicate circle.
              Show renders ONLY ONE child at a time.
              The img starts at opacity:0 and fades in via onLoad.
              There is no wrapper div behind it — only the img itself.
            */}
            <Show
              when={props.user?.photoURL}
              fallback={
                <div
                  class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shrink-0"
                  style="background: var(--raised); border: 2px solid var(--border-active)"
                  aria-hidden="true"
                >
                  <Icon name="person" class="text-3xl" style="color: var(--muted)" />
                </div>
              }
            >
              <img
                src={props.user.photoURL}
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0"
                style="border: 3px solid var(--p); box-shadow: 0 0 24px var(--p-glow), 0 8px 24px rgba(0,0,0,0.6); opacity: 0; transition: opacity 300ms ease-out"
                onLoad={e => { e.target.style.opacity = '1'; }}
                onError={e => { e.target.style.display = 'none'; }}
                alt={props.user?.displayName || 'Profile photo'}
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
                    class="type-caption px-2 py-1 rounded-full"
                    style="background: var(--p-dim); color: var(--p); border: 1px solid color-mix(in srgb, var(--p) 20%, transparent)"
                  >
                    Since {memberSinceText()}
                  </span>
                </Show>
              </div>
            </div>
          </div>

          {/* Vault stats */}
          <Show when={list().length > 0}>
            <div class="grid grid-cols-3 gap-3 mt-5" role="list" aria-label="Vault statistics">
              <div class="text-center p-3 rounded-xl" style="background: var(--raised); border: 1px solid var(--border)" role="listitem">
                <p class="type-stat text-white" style="font-size: 1.5rem">{list().length}</p>
                <p class="type-caption text-gray-500 mt-1">Total</p>
              </div>
              <div class="text-center p-3 rounded-xl" style="background: var(--raised); border: 1px solid var(--border)" role="listitem">
                <p class="type-stat text-white" style="font-size: 1.5rem">{totalMovies()}</p>
                <p class="type-caption text-gray-500 mt-1">Movies</p>
              </div>
              <div class="text-center p-3 rounded-xl" style="background: var(--raised); border: 1px solid var(--border)" role="listitem">
                <Show
                  when={avgRating()}
                  fallback={
                    <>
                      <p class="type-stat text-white" style="font-size: 1.5rem">{totalSeries()}</p>
                      <p class="type-caption text-gray-500 mt-1">Series</p>
                    </>
                  }
                >
                  <p class="type-stat" style="font-size: 1.5rem; color: var(--p)">{avgRating()}</p>
                  <p class="type-caption text-gray-500 mt-1">Avg Score</p>
                </Show>
              </div>
            </div>
          </Show>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         THEME SELECTOR
      ═══════════════════════════════════════ */}
      <section class="mb-6 animate-fade-up" aria-labelledby="theme-heading">
        <p class="section-title" id="theme-heading">Appearance</p>
        <div class="grid grid-cols-1 gap-2" role="radiogroup" aria-labelledby="theme-heading">
          <For each={themes}>
            {(t) => {
              const isActive = () => props.theme === t.id;
              return (
                <button
                  onClick={() => props.setTheme(t.id)}
                  class="w-full p-4 rounded-2xl flex gap-4 items-center transition-all active:scale-[0.98]"
                  style={isActive()
                    ? 'border: 1px solid var(--p); background: var(--p-dim); color: var(--text)'
                    : 'border: 1px solid var(--border); background: var(--surface); color: var(--muted)'}
                  role="radio"
                  aria-checked={isActive()}
                  aria-label={`${t.name} theme${isActive() ? ' — active' : ''}`}
                >
                  <div
                    class="w-5 h-5 rounded-full shrink-0"
                    style={{ background: t.hex, 'box-shadow': `0 0 10px ${t.hex}66` }}
                    aria-hidden="true"
                  />
                  <span class="font-semibold text-sm flex-1 text-left">{t.name}</span>
                  <Show when={isActive()}>
                    <Icon name="check_circle" fill class="text-lg" style="color: var(--p)" aria-hidden="true" />
                  </Show>
                </button>
              );
            }}
          </For>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         GENERAL — RESTORED
         Links to Streaming Servers, Data Sync, Analytics
      ═══════════════════════════════════════ */}
      <Show when={props.user}>
        <section class="mb-6 animate-fade-up" aria-labelledby="general-heading">
          <p class="section-title" id="general-heading">General</p>
          <div class="flex flex-col gap-2">

            <button
              onClick={() => props.onServerSettings && props.onServerSettings()}
              class="settings-row w-full text-left"
              aria-label="Configure streaming servers"
            >
              <Icon name="dns" style="color: var(--muted)" aria-hidden="true" />
              <div class="flex-1">
                <p class="type-metadata text-white font-bold">Streaming Servers</p>
                <p class="type-caption text-gray-500 mt-0.5">Configure custom playback servers</p>
              </div>
              <Icon name="chevron_right" class="text-gray-600" aria-hidden="true" />
            </button>

            <button
              onClick={() => props.setView && props.setView('sync')}
              class="settings-row w-full text-left"
              aria-label="Open Data Sync"
            >
              <Icon name="import_export" style="color: var(--muted)" aria-hidden="true" />
              <div class="flex-1">
                <p class="type-metadata text-white font-bold">Data Sync</p>
                <p class="type-caption text-gray-500 mt-0.5">Backup, restore and repair your vault</p>
              </div>
              <Icon name="chevron_right" class="text-gray-600" aria-hidden="true" />
            </button>

            <button
              onClick={() => props.setView && props.setView('analytics')}
              class="settings-row w-full text-left"
              aria-label="Open Insights analytics"
            >
              <Icon name="bar_chart" style="color: var(--muted)" aria-hidden="true" />
              <div class="flex-1">
                <p class="type-metadata text-white font-bold">Insights</p>
                <p class="type-caption text-gray-500 mt-0.5">Your personal watch analytics</p>
              </div>
              <Icon name="chevron_right" class="text-gray-600" aria-hidden="true" />
            </button>

          </div>
        </section>
      </Show>

      {/* ═══════════════════════════════════════
         ACCOUNT ACTIONS
      ═══════════════════════════════════════ */}
      <Show when={props.user}>
        <section class="animate-fade-up" aria-labelledby="account-heading">
          <p class="section-title" id="account-heading">Account</p>
          <div class="space-y-2">
            <button
              onClick={props.onLogout}
              class="settings-row w-full text-left"
              aria-label="Sign out of your account"
            >
              <Icon name="logout" style="color: var(--muted)" aria-hidden="true" />
              <div class="flex-1">
                <p class="type-metadata text-white font-bold">Sign Out</p>
                <p class="type-caption text-gray-500 mt-0.5">Sign out of {props.user?.displayName || 'your account'}</p>
              </div>
              <Icon name="chevron_right" class="text-gray-600" aria-hidden="true" />
            </button>

            <button
              onClick={props.onNuke}
              class="settings-row w-full text-left"
              style="border-left-color: rgba(255,45,85,0.5)"
              aria-label="Delete all vault data — this is permanent"
            >
              <Icon name="delete_forever" style="color: rgba(255,45,85,0.7)" aria-hidden="true" />
              <div class="flex-1">
                <p class="type-metadata font-bold" style="color: rgba(255,45,85,0.85)">Delete Vault</p>
                <p class="type-caption text-gray-500 mt-0.5">Permanently erase all your data</p>
              </div>
              <Icon name="chevron_right" class="text-gray-600" aria-hidden="true" />
            </button>
          </div>
        </section>
      </Show>

    </div>
  );
}
