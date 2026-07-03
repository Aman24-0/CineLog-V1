import { onMount, onCleanup } from 'solid-js';
import { Icon } from '../utils';

export function LoadingScreen() {
  onMount(()   => { document.body.style.overflow = 'hidden'; });
  onCleanup(() => { document.body.style.overflow = ''; });

  return (
    <div
      class="fixed inset-0 flex items-center justify-center overflow-hidden"
      style="width: 100vw; height: 100vh; background: var(--void); z-index: 9999999; overscroll-behavior: none"
    >
      {/* Grid overlay */}
      <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px);background-size:60px 60px;pointer-events:none" />

      {/* Ambient glow orb */}
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;height:400px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,var(--p-glow,rgba(168,255,120,0.12)) 0%,transparent 70%);animation:glowPulse 3s ease-in-out infinite" />

      {/* Center content — pop-spring entrance */}
      <div class="relative z-10 flex flex-col items-center animate-pop-spring" style="text-align:center">

        {/* Logo mark */}
        <div class="mb-8 relative">
          {/* Icon box */}
          <div
            class="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto relative"
            style="background: var(--raised); border: 1px solid var(--border-active); box-shadow: 0 0 40px var(--p-glow, rgba(168,255,120,0.15)); animation: glowPulse 2.5s ease-in-out infinite"
          >
            <Icon name="movie_filter" fill class="text-4xl" style="color: var(--p)" />
            {/* Outer ring */}
            <div style="position:absolute;inset:-1px;border-radius:24px;border:1px solid var(--p);opacity:0.4" />
          </div>

          {/* Wordmark */}
          <h1 class="font-headline text-7xl text-white leading-none tracking-wide">
            CINE<span style="color: var(--p)">LOG</span>
          </h1>
          {/* Tagline */}
          <div class="type-label mt-2" style="letter-spacing: 0.3em; color: var(--muted)">ULTIMATE EDITION</div>
        </div>

        {/* Progress bar — w-64 = 256px; space-y-3 = 12px */}
        <div class="w-64 space-y-3">
          <div class="progress-bar">
            <div class="progress-bar-fill skeleton-bg" style="width: 100%" />
          </div>
          <div class="flex items-center justify-center gap-2 type-label" style="color: var(--p)">
            <Icon name="radar" class="text-xs animate-spin" style="color: var(--p)" />
            Syncing Universe
          </div>
        </div>

        {/* Corner decorators */}
        <div style="position:absolute;top:-60px;left:-80px;width:40px;height:40px;border-left:2px solid var(--p);border-top:2px solid var(--p);opacity:0.3;border-radius:4px 0 0 0" />
        <div style="position:absolute;top:-60px;right:-80px;width:40px;height:40px;border-right:2px solid var(--p);border-top:2px solid var(--p);opacity:0.3;border-radius:0 4px 0 0" />
        <div style="position:absolute;bottom:-60px;left:-80px;width:40px;height:40px;border-left:2px solid var(--p);border-bottom:2px solid var(--p);opacity:0.3;border-radius:0 0 0 4px" />
        <div style="position:absolute;bottom:-60px;right:-80px;width:40px;height:40px;border-right:2px solid var(--p);border-bottom:2px solid var(--p);opacity:0.3;border-radius:0 0 4px 0" />
      </div>
    </div>
  );
}
