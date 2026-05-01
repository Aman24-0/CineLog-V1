import { createMemo, For } from 'solid-js';
import { Icon } from '../utils';
import { MovieCard } from '../components/MovieCard';
import { AIRecommend } from '../components/AIRecommend';

export function Dashboard(props) {
  const stats = createMemo(() => ({ 
      total: props.watchlist().length, 
      completed: props.watchlist().filter(m => m.status === 'Completed').length, 
      watching: props.watchlist().filter(m => m.status === 'Watching').length, 
      planned: props.watchlist().filter(m => m.status === 'Planned' || m.status === 'Plan to Watch').length 
  }));

  return (
    <div class="animate-fade-in pb-4">
      <div onClick={() => { const p = props.watchlist().filter(m => m.status === 'Planned' || m.status === 'Plan to Watch'); if(p.length) { props.showToast("🎲 Picking random title..."); setTimeout(()=>props.openMovie(p[Math.floor(Math.random()*p.length)].id), 500); } else alert("Planned list is empty!"); }} class="bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] p-8 rounded-[2rem] mb-6 flex justify-between items-center shadow-2xl shadow-[var(--primary)]/20 cursor-pointer text-[#0c0e14] active:scale-95 transition-transform relative overflow-hidden group">
        <div class="relative z-10"><h2 class="text-3xl font-black font-headline flex items-center gap-2 mb-1"><Icon name="casino" fill class="text-3xl" /> What to Watch?</h2><p class="text-[10px] font-bold uppercase tracking-widest opacity-80">Let the vault decide</p></div>
        <Icon name="arrow_forward_ios" class="opacity-40 text-3xl relative z-10 group-hover:translate-x-2 transition-transform" />
        <div class="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 scale-150"><Icon name="casino" fill class="text-9xl" /></div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="glass-surface p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-end min-h-[120px] group hover:border-[var(--primary)]/30 transition-colors col-span-2 sm:col-span-1">
          <Icon name="inventory_2" class="absolute -right-4 -bottom-4 text-7xl text-white/5 group-hover:scale-110 transition-transform" fill />
          <p class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1 relative z-10">Total Titles</p>
          <h3 class="text-4xl font-headline font-black text-white relative z-10">{stats().total}</h3>
        </div>
        <div class="glass-surface p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-end min-h-[120px] group hover:border-[var(--primary)]/30 transition-colors col-span-2 sm:col-span-1 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
          <Icon name="done_all" class="absolute -right-4 -bottom-4 text-7xl text-[var(--primary)]/10 group-hover:scale-110 transition-transform" fill />
          <p class="text-[10px] text-[var(--primary)] opacity-80 uppercase font-bold tracking-widest mb-1 relative z-10">Completed</p>
          <h3 class="text-4xl font-headline font-black text-[var(--primary)] relative z-10">{stats().completed}</h3>
        </div>
        <div onClick={() => { props.setActiveVaultStatus('Watching'); props.setView('watchlist'); }} class="glass-surface p-5 rounded-[1.5rem] relative overflow-hidden flex flex-col justify-center items-center text-center group hover:border-white/10 transition-colors cursor-pointer active:scale-95">
          <Icon name="play_circle" class="absolute inset-0 m-auto text-6xl text-white/5 group-hover:scale-110 transition-transform" fill />
          <h3 class="text-3xl font-headline font-black text-[var(--secondary)] relative z-10 mb-1">{stats().watching}</h3>
          <p class="text-[9px] text-gray-500 uppercase font-bold tracking-widest relative z-10">Watching</p>
        </div>
        <div onClick={() => { props.setActiveVaultStatus('Planned'); props.setView('watchlist'); }} class="glass-surface p-5 rounded-[1.5rem] relative overflow-hidden flex flex-col justify-center items-center text-center group hover:border-white/10 transition-colors cursor-pointer active:scale-95">
          <Icon name="bookmark" class="absolute inset-0 m-auto text-6xl text-white/5 group-hover:scale-110 transition-transform" fill />
          <h3 class="text-3xl font-headline font-black text-gray-300 relative z-10 mb-1">{stats().planned}</h3>
          <p class="text-[9px] text-gray-500 uppercase font-bold tracking-widest relative z-10">Planned</p>
        </div>
      </div>
      
      <div class="flex justify-between items-end mb-5 px-1"><h3 class="text-xl font-bold font-headline">Recently Added</h3><button onClick={()=>{props.setActiveVaultStatus('all'); props.setView('watchlist');}} class="text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">View All <Icon name="chevron_right" class="text-[14px]"/></button></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4"><For each={props.watchlist().slice(0, 6)}>{(m) => <MovieCard movie={m} onClick={() => props.openMovie(m.id)} />}</For></div>

      {/* ── AI Recommendations ─────────────────────────────────────── */}
      <div class="mt-8 mb-4">
        <AIRecommend watchlist={props.watchlist} />
      </div>
    </div>
  );
}

