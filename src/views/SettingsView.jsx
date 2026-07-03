// src/views/SettingsView.jsx
import { For, Show } from 'solid-js';
import { Icon } from '../utils';

export function SettingsView(props) {
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
    // pb-24 = 96px; px-5 = 20px; animate-fade-in
    <div class="pb-24 animate-fade-in px-5 max-w-2xl mx-auto">

      {/* Back header — gap-3 = 12px; mb-6 = 24px */}
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

      {/* ── ACCOUNT ── */}
      <p class="section-title">Account</p>
      {/* p-4 = 16px; mb-6 = 24px; rounded-2xl = 16px */}
      <div class="bg-[#141414] rounded-2xl border border-white/10 p-4 mb-6 animate-fade-up">
        <Show when={props.user} fallback={
          <div class="flex items-center justify-between">
            <span class="type-metadata text-gray-400">Not signed in</span>
            <button
              onClick={() => props.onLogin?.()}
              class="type-button px-4 py-2 rounded-full text-black active:scale-95"
              style="background: var(--p)"
            >
              Sign In
            </button>
          </div>
        }>
          {/* gap-4 = 16px */}
          <div class="flex items-center gap-4">
            <img
              src={props.user.photoURL}
              class="w-14 h-14 rounded-full object-cover border border-white/10"
              style="opacity: 0; transition: opacity 300ms ease-out"
              onLoad={e => { e.target.style.opacity = '1'; }}
            />
            <div class="flex-1">
              <p class="type-metadata font-black text-white text-lg">{props.user.displayName}</p>
              <p class="type-metadata text-gray-400">{props.user.email}</p>
            </div>
          </div>
        </Show>
      </div>

      {/* ── APPEARANCE ── */}
      <p class="section-title">Appearance</p>
      {/* gap-4 = 16px; pb-2 = 8px; mb-6 = 24px */}
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

      {/* ── GENERAL ── */}
      <p class="section-title">General</p>
      {/* gap-2 = 8px; mb-6 = 24px */}
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

      {/* ── DANGER ZONE ── */}
      <Show when={props.user}>
        <p class="section-title" style="color: #ff2d55">Danger Zone</p>
        {/* gap-2 = 8px */}
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
