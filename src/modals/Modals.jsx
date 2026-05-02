import { createSignal, createMemo, onMount, onCleanup, For, Show } from 'solid-js';
import { Icon, getSafeGenres, getSafePlatforms } from '../utils';

/* ─── SETTINGS MODAL ─── */
const ThemeBtn = (props) => (
  <button
    onClick={() => { props.set(props.id); props.onClose(); }}
    class="w-full p-4 rounded-2xl flex gap-4 items-center transition-all"
    style={props.curr === props.id
      ? 'border: 1px solid var(--p); background: var(--p-dim); color: var(--text)'
      : 'border: 1px solid var(--border); background: var(--surface); color: var(--muted)'}
  >
    <div class="w-6 h-6 rounded-full shadow-lg shrink-0" style={{ background: props.hex, 'box-shadow': `0 0 12px ${props.hex}66` }} />
    <span class="font-semibold text-sm">{props.name}</span>
    <Show when={props.curr === props.id}>
      <Icon name="check_circle" fill class="ml-auto text-lg" style="color: var(--p)" />
    </Show>
  </button>
);

export function SettingsModal(props) {
  onMount(() => document.body.style.overflow = 'hidden');
  onCleanup(() => document.body.style.overflow = '');

  const themes = [
    { id: 'sage', n: 'Sage', h: '#a8ff78' },
    { id: 'matrix', n: 'Matrix', h: '#39ff14' },
    { id: 'netflix', n: 'Netflix', h: '#ff2d55' },
    { id: 'cyberpunk', n: 'Cyberpunk', h: '#ffe600' },
    { id: 'interstellar', n: 'Interstellar', h: '#00c2ff' },
    { id: 'neonhorizon', n: 'Neon Horizon', h: '#ff2af0' },
    { id: 'vibranium', n: 'Vibranium', h: '#9d4edd' },
  ];

  return (
    <div class="fixed inset-0 flex items-center justify-center p-4 z-[999999] animate-fade-in"
      style="background: rgba(0,0,0,0.85); backdrop-filter: blur(12px)"
      onClick={props.onClose}>
      <div class="glass-surface w-full max-w-sm rounded-3xl p-6 animate-pop-in"
        style="border-color: var(--border-active)"
        onClick={e => e.stopPropagation()}>
        <div class="flex justify-between items-center border-b pb-4 mb-5" style="border-color: var(--border)">
          <h3 class="font-bold text-lg flex items-center gap-2 text-white">
            <Icon name="palette" style="color: var(--p)" /> Themes
          </h3>
          <button onClick={props.onClose} class="p-2 rounded-full hover:bg-white/5" style="color: var(--muted)">
            <Icon name="close" />
          </button>
        </div>
        <div class="space-y-2 max-h-[65vh] overflow-y-auto hide-scrollbar">
          <For each={themes}>
            {t => <ThemeBtn id={t.id} name={t.n} hex={t.h} curr={props.currentTheme} set={props.setTheme} onClose={props.onClose} />}
          </For>
        </div>
      </div>
    </div>
  );
}

/* ─── INSIGHTS MODAL ─── */
export function InsightsModal(props) {
  const [showWrapped, setShowWrapped] = createSignal(false);
  onMount(() => document.body.style.overflow = 'hidden');
  onCleanup(() => document.body.style.overflow = '');

  const stats = createMemo(() => {
    let mins = 0;
    const genres = {}; const platforms = {};
    const comp = props.watchlist().filter(m => m.status === 'Completed');
    comp.forEach(m => {
      mins += (parseInt(m.runtime) || 0) * (m.media_type === 'tv' ? (parseInt(m.episode) || 1) : 1);
      getSafeGenres(m).forEach(g => genres[g] = (genres[g] || 0) + 1);
      getSafePlatforms(m).forEach(p => platforms[p] = (platforms[p] || 0) + 1);
    });
    const topG = Object.entries(genres).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topP = Object.entries(platforms).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return {
      days: Math.floor(mins / 1440),
      hours: Math.floor((mins % 1440) / 60),
      total: comp.length,
      topGenre: topG[0]?.[0] || 'N/A',
      topG, topP,
      maxG: topG[0]?.[1] || 1,
      maxP: topP[0]?.[1] || 1,
    };
  });

  return (
    <div class="fixed inset-0 flex items-center justify-center p-4 z-[999999] animate-fade-in"
      style="background: rgba(0,0,0,0.88); backdrop-filter: blur(12px)"
      onClick={props.onClose}>
      <div class="w-full max-w-lg rounded-[2.5rem] p-8 relative animate-pop-in overflow-hidden"
        style="background: rgba(9,11,16,0.98); border: 1px solid var(--border-active); max-height: 90vh; overflow-y: auto"
        onClick={e => e.stopPropagation()}>

        {/* Top glow */}
        <div style="position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:radial-gradient(circle,var(--p-glow,rgba(168,255,120,0.12)) 0%,transparent 70%);filter:blur(40px);pointer-events:none" />

        <div class="flex justify-between items-center mb-8 relative z-10">
          <h2 class="font-headline text-4xl text-white">INSIGHTS</h2>
          <button onClick={props.onClose} class="p-3 rounded-full hover:bg-white/5 glass-surface" style="color: var(--muted)">
            <Icon name="close" />
          </button>
        </div>

        {/* Watch Time Ring */}
        <div class="flex justify-center mb-8 relative z-10">
          <div class="relative w-48 h-48 flex items-center justify-center">
            <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" stroke-width="6" stroke-dasharray="276" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--p)" stroke-width="6"
                stroke-linecap="round" stroke-dasharray="276" stroke-dashoffset="55"
                style="filter: drop-shadow(0 0 8px var(--p))" />
            </svg>
            <div class="text-center relative z-10">
              <div class="label-mono mb-1" style="color: var(--muted)">Watch Time</div>
              <div class="font-headline text-5xl text-white">{stats().days}<span class="text-base" style="color: var(--muted)">d</span></div>
              <div class="font-headline text-2xl" style="color: var(--p2)">{stats().hours}<span class="text-xs" style="color: var(--muted)">h</span></div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowWrapped(true)}
          class="w-full font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest mb-8 flex items-center justify-center gap-2 text-black relative z-10"
          style="background: var(--p); box-shadow: 0 0 24px var(--p-glow)"
        >
          <Icon name="auto_awesome" /> Open Wrapped
        </button>

        {/* Genres */}
        <div class="glass-surface rounded-2xl p-5 relative z-10" style="border-color: var(--border-active)">
          <h3 class="font-bold mb-5 flex items-center gap-2 text-white">
            <Icon name="pie_chart" style="color: var(--p)" /> Favorite Vibes
          </h3>
          <div class="space-y-4">
            <For each={stats().topG}>
              {([g, c]) => (
                <div>
                  <div class="flex justify-between label-mono mb-1.5">
                    <span class="text-white">{g}</span>
                    <span style="color: var(--muted)">{c} titles</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-fill" style={{ width: `${(c / stats().maxG) * 100}%` }} />
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      {/* Wrapped overlay */}
      <Show when={showWrapped()}>
        <div class="fixed inset-0 flex items-center justify-center p-4 z-[9999999] animate-pop-in"
          style="background: rgba(0,0,0,0.97)"
          onClick={() => setShowWrapped(false)}>
          <div class="w-full max-w-sm h-[500px] rounded-[3rem] p-10 text-center flex flex-col justify-between relative overflow-hidden"
            style="background: linear-gradient(135deg, var(--raised) 0%, var(--surface) 100%); border: 1px solid var(--border-active)"
            onClick={e => e.stopPropagation()}>
            <div style="position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:radial-gradient(circle,var(--p-glow,rgba(168,255,120,0.2)) 0%,transparent 70%);filter:blur(30px);pointer-events:none" />
            <div class="relative z-10 mt-4">
              <div class="label-mono mb-4" style="color: var(--muted); letter-spacing: 0.3em">MY CINELOG WRAPPED</div>
              <h2 class="font-headline text-4xl text-white mb-8 leading-tight">
                I spent<br />
                <span class="px-3 py-1 rounded-xl inline-block mt-2 text-black" style="background: var(--p)">{stats().days} Days</span>
                <br />in another universe.
              </h2>
              <div class="glass-surface p-5 rounded-2xl text-left space-y-4" style="border-color: var(--border-active)">
                <div>
                  <div class="label-mono mb-1" style="color: var(--muted)">Masterpieces Finished</div>
                  <div class="font-headline text-3xl text-white">{stats().total} Titles</div>
                </div>
                <div>
                  <div class="label-mono mb-1" style="color: var(--muted)">Favorite Vibe</div>
                  <div class="font-headline text-3xl" style="color: var(--p)">{stats().topGenre}</div>
                </div>
              </div>
            </div>
            <button onClick={() => setShowWrapped(false)} class="mx-auto p-4 rounded-full glass-surface hover:bg-white/10 text-white relative z-10">
              <Icon name="close" />
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}
