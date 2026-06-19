import { createSignal } from 'solid-js';
import { Icon } from '../utils';

/**
 * Floating Action Button for opening the movie stream modal
 * Hidden on mobile to prevent overlap with bottom navigation/home bar
 */
export const MovieStreamFAB = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);
  
  return (
    // ✅ CHANGED: Added 'hidden sm:flex' to hide on mobile, show on tablet/desktop+
    <button
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      class="fixed bottom-8 left-8 z-[9999] group hidden sm:flex"
      title="Open movie search and streaming"
    >
      {/* Glow effect background */}
      <div
        class="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style="background: var(--p-glow); width: 120%; height: 120%; left: -10%; top: -10%"
      />
      
      {/* Main button */}
      <div
        class="relative w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-sm uppercase tracking-widest shadow-2xl transition-all duration-300 cursor-pointer active:scale-95"
        style={{
          background: `linear-gradient(135deg, var(--p), var(--p-dim))`,
          boxShadow: isHovered() ? '0 0 40px var(--p-glow), 0 8px 32px rgba(0,0,0,0.3)' : '0 0 20px var(--p-glow), 0 4px 16px rgba(0,0,0,0.2)',
          transform: isHovered() ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
        }}
      >
        <Icon name="play_circle" fill class="text-2xl" />
      </div>
      
      {/* Tooltip label */}
      <div
        class="absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-white opacity-0 pointer-events-none transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)',
          transform: isHovered() ? 'translateX(0) opacity-100' : 'translateX(-8px) opacity-0',
        }}
      >
        Watch Movies
      </div>
    </button>
  );
};
