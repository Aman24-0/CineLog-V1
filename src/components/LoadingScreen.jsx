import { Icon } from '../utils';

export function LoadingScreen() {
  return (
    <div class="h-screen w-full flex items-center justify-center bg-[#08090b] overflow-hidden relative">
      
      {/* 1. Cinematic Mesh Gradients (Glowing Moving Orbs) */}
      <div class="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-[var(--primary)]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style="animation-duration: 4s;"></div>
      <div class="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-[var(--secondary)]/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style="animation-duration: 5s; animation-delay: 1s;"></div>
      
      {/* 2. Premium Micro-Dot Overlay (Sci-Fi Texture) */}
      <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-[#08090b]/40 via-transparent to-[#08090b]/80 pointer-events-none"></div>
      
      {/* 3. Central Glassmorphic Console */}
      <div class="relative z-20 flex flex-col items-center animate-pop-in">
        
        {/* Glowing Logo */}
        <div class="relative mb-10">
            <h1 class="text-6xl md:text-8xl font-black font-headline text-transparent bg-clip-text bg-gradient-to-br from-white via-[var(--primary)] to-[var(--secondary)] tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                CINELOG
            </h1>
        </div>
        
        {/* Sleek Progress Bar */}
        <div class="flex flex-col items-center gap-4 w-64">
            <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-inner relative border border-white/5">
                {/* Note: skeleton-bg animation already exists in your index.css */}
                <div class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent skeleton-bg opacity-80"></div>
            </div>
            
            <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                <Icon name="radar" class="text-[12px] animate-spin text-[var(--primary)] drop-shadow-[0_0_8px_var(--primary)]" />
                <span>Syncing Universe</span>
            </div>
        </div>

      </div>
      
    </div>
  );
}
