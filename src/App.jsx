import { createSignal, onMount, onCleanup, createEffect, For, Show, createMemo, ErrorBoundary } from 'solid-js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, orderBy, doc, setDoc, deleteDoc, updateDoc, serverTimestamp, addDoc, writeBatch, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAvV2m7IAbDGSr0ZdFNv9Rnq9oUEAgufyI",
  authDomain: "watchlist-bcdfd.firebaseapp.com",
  projectId: "watchlist-bcdfd",
  storageBucket: "watchlist-bcdfd.firebasestorage.app",
  messagingSenderId: "479628005507",
  appId: "1:479628005507:web:12e0aa5b98977c82860bb6"
};

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// UTILITIES
const cleanPlatform = (p) => {
  if (!p) return null; const l = p.toLowerCase();
  if (l.includes('netflix')) return 'Netflix'; if (l.includes('prime') || l.includes('amazon')) return 'Amazon Prime Video';
  if (l.includes('hotstar') || l.includes('jio') || l.includes('disney')) return 'JioHotstar';
  if (l.includes('sony') || l.includes('liv')) return 'Sony LIV'; if (l.includes('zee')) return 'Zee5';
  if (l.includes('apple')) return 'Apple TV'; if (l.includes('crunchyroll')) return 'Crunchyroll';
  return p.trim();
};
const getSafeGenres = (m) => m?.genresList || (typeof m?.genres === 'string' ? m.genres.split(',') : []) || [];
const getSafePlatforms = (m) => [...new Set((m?.platformsList || []).map(cleanPlatform).filter(Boolean))];
const Icon = (props) => <span class={`material-symbols-outlined ${props.fill ? 'filled' : ''} ${props.class || ''}`}>{props.name}</span>;
const SafeInfoRow = (props) => <div class="grid grid-cols-[100px_1fr] items-center"><span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-2"><Icon name={props.icon} class="text-[14px]" /> {props.label}</span><div>{props.value}</div></div>;

const formatRuntime = (mins) => {
  if (!mins || mins <= 0) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}` : `${m}m`;
};

// MAIN COMPONENT
export default function App() {
  const [user, setUser] = createSignal(null);
  const [watchlist, setWatchlist] = createSignal([]);
  const [franchises, setFranchises] = createSignal([]);
  const [view, setView] = createSignal('dashboard');
  const [theme, setTheme] = createSignal(localStorage.getItem('cinelog_theme') || 'sage');
  const [loading, setLoading] = createSignal(true);
  const [activeVaultStatus, setActiveVaultStatus] = createSignal('all');
  
  const [searchModal, setSearchModal] = createSignal(false);
  const [detailsId, setDetailsId] = createSignal(null);
  const [settingsModal, setSettingsModal] = createSignal(false);
  const [statsModal, setStatsModal] = createSignal(false);
  const [userMenuOpen, setUserMenuOpen] = createSignal(false);
  const [toast, setToast] = createSignal({ show: false, msg: '' });

  const showToast = (msg) => { setToast({ show: true, msg }); setTimeout(() => setToast({ show: false, msg: '' }), 3000); };

  createEffect(() => { document.body.className = `theme-${theme()}`; localStorage.setItem('cinelog_theme', theme()); });

  createEffect(() => { view(); window.scrollTo(0, 0); });

  onMount(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        let wReady = false; let fReady = false;
        onSnapshot(query(collection(db, 'users', u.uid, 'watchlist'), orderBy('addedAt', 'desc')), (snap) => { 
            setWatchlist(snap.docs.map(d => ({ id: d.id, ...d.data() }))); 
            wReady = true; if(fReady) setLoading(false);
        });
        onSnapshot(collection(db, 'users', u.uid, 'franchises'), (snap) => { 
            setFranchises(snap.docs.map(d => ({ id: d.id, ...d.data() }))); 
            fReady = true; if(wReady) setLoading(false);
        });
      } else { setLoading(false); }
    });
  });

  const nukeCollection = async () => {
    if(confirm("DANGER: Entire Vault will be wiped. Sure?")) {
      showToast("Nuking Vault...");
      const snap = await getDocs(collection(db, 'users', user().uid, 'watchlist'));
      const docs = snap.docs;
      
      // Batch delete fix for >500 items
      for (let i = 0; i < docs.length; i += 500) {
        const batch = writeBatch(db);
        docs.slice(i, i + 500).forEach(d => batch.delete(d.ref));
        await batch.commit();
      }
      showToast("Vault wiped!"); setUserMenuOpen(false);
    }
  };

  return (
    <ErrorBoundary fallback={(err) => <div class="h-screen flex flex-col items-center justify-center p-10 text-center"><Icon name="error" class="text-red-500 text-6xl mb-4"/><h2 class="text-xl font-bold text-white mb-2">Something broke!</h2><p class="text-xs text-gray-500 mb-6">{err.toString()}</p><button onClick={()=>window.location.reload()} class="bg-red-500 text-white px-6 py-2 rounded-lg font-bold">Reload App</button></div>}>
    <div class="min-h-screen pb-28" onClick={() => setUserMenuOpen(false)}>
      <Show when={!loading()} fallback={<LoadingScreen />}>
        <Show when={user()} fallback={
          <div class="h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 class="text-5xl font-black font-headline text-[var(--primary)] mb-4 tracking-tighter">CINELOG</h1>
            <p class="text-gray-400 mb-10 text-sm">Ultimate Edition</p>
            <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} class="bg-[var(--primary)] text-black font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">Sign In with Google</button>
          </div>
        }>
          
          <header class="flex justify-between items-center p-6 pb-2 relative">
            <h2 class="text-2xl font-black font-headline text-[var(--primary)] tracking-tighter">Cinelog</h2>
            <div class="flex items-center gap-3">
              <button onClick={() => setSettingsModal(true)} class="text-gray-500 glass-surface p-2 rounded-full active:scale-95 transition-transform"><Icon name="palette" class="text-sm" /></button>
              <div class="relative">
                <img src={user().photoURL} onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen()); }} class="w-9 h-9 rounded-full border-2 border-[var(--primary)] cursor-pointer object-cover relative active:scale-95 transition-transform" />
                <Show when={userMenuOpen()}>
                  <div class="fixed inset-0 z-[90]" onClick={() => setUserMenuOpen(false)}></div>
                  <div class="absolute right-0 mt-3 w-48 glass-surface rounded-2xl shadow-2xl py-2 z-[100] animate-pop-in border border-white/10 overflow-hidden">
                    <button onClick={() => { setStatsModal(true); setUserMenuOpen(false); }} class="w-full text-left px-5 py-3 text-sm font-bold text-[var(--primary)] hover:bg-white/5 flex items-center gap-3"><Icon name="bar_chart" class="text-[18px]"/> Insights</button>
                    <div class="border-t border-white/5 my-1"></div>
                    <button onClick={() => { setView('sync'); setUserMenuOpen(false); }} class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"><Icon name="import_export" class="text-[18px]"/> Data Sync</button>
                    <button onClick={() => signOut(auth)} class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"><Icon name="logout" class="text-[18px]"/> Logout</button>
                    <div class="border-t border-white/5 my-1"></div>
                    <button onClick={nukeCollection} class="w-full text-left px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-3"><Icon name="delete_forever" class="text-[18px]"/> Nuke Vault</button>
                  </div>
                </Show>
              </div>
            </div>
          </header>

          <main class="p-6 max-w-7xl mx-auto relative">
            <Show when={view() === 'dashboard'}><Dashboard watchlist={watchlist} openMovie={setDetailsId} setView={setView} showToast={showToast} setActiveVaultStatus={setActiveVaultStatus} /></Show>
            <Show when={view() === 'watchlist'}><Vault watchlist={watchlist} openMovie={setDetailsId} activeStatus={activeVaultStatus()} onFilterChange={setActiveVaultStatus} /></Show>
            <Show when={view() === 'franchises'}><FranchisesView watchlist={watchlist} franchises={franchises} uid={user().uid} openMovie={setDetailsId} showToast={showToast} /></Show>
            <Show when={view() === 'upcoming'}><UpcomingView watchlist={watchlist} uid={user().uid} showToast={showToast} /></Show>
            <Show when={view() === 'sync'}><DataSync watchlist={watchlist} uid={user().uid} showToast={showToast} /></Show>
          </main>

          <div class="fixed bottom-6 left-0 w-full px-4 flex justify-center z-50 pointer-events-none">
            <nav class="glass-surface backdrop-blur-xl w-full max-w-md rounded-full flex justify-around items-center px-2 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto">
              <NavBtn icon="dashboard" label="Home" active={view()==='dashboard'} onClick={() => setView('dashboard')} />
              <NavBtn icon="visibility" label="Vault" active={view()==='watchlist'} onClick={() => setView('watchlist')} />
              <div class="relative -mt-8 mx-1">
                  <button onClick={() => setSearchModal(true)} class="bg-gradient-to-tr from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-[var(--primary)]/30 active:scale-95 transition-transform border-4 border-[#08090b]">
                      <Icon name="add" class="text-3xl font-black" />
                  </button>
              </div>
              <NavBtn icon="folder_special" label="Lists" active={view()==='franchises'} onClick={() => setView('franchises')} />
              <NavBtn icon="calendar_month" label="Upcoming" active={view()==='upcoming'} onClick={() => setView('upcoming')} />
            </nav>
          </div>

          <Show when={searchModal()}><SearchModal onClose={() => setSearchModal(false)} uid={user().uid} showToast={showToast} watchlist={watchlist()} /></Show>
          <Show when={detailsId()}><DetailsModal id={detailsId()} watchlist={watchlist()} franchises={franchises()} onClose={() => setDetailsId(null)} uid={user().uid} showToast={showToast} theme={theme} /></Show>
          <Show when={statsModal()}><InsightsModal watchlist={watchlist} onClose={() => setStatsModal(false)} /></Show>
          <Show when={settingsModal()}><SettingsModal currentTheme={theme()} setTheme={setTheme} onClose={() => setSettingsModal(false)} /></Show>
          
          <Show when={toast().show}>
            <div class="fixed bottom-28 left-1/2 -translate-x-1/2 glass-surface border border-[var(--primary)] text-white px-6 py-3 rounded-full shadow-2xl z-[999999] flex gap-2 items-center text-sm font-bold whitespace-nowrap animate-pop-in"><Icon name="check_circle" class="text-[var(--primary)]" fill /> {toast().msg}</div>
          </Show>
        </Show>
      </Show>
    </div>
    </ErrorBoundary>
  );
}

// SUB COMPONENTS
function LoadingScreen() {
  const posters = ["/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", "/RYMX2wcKCBAr24UyPD7xrmstKX.jpg", "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg", "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"];
  const gridItems = Array(72).fill(0).map((_, i) => posters[i % posters.length]);
  
  return (
    <div class="h-screen w-full flex items-center justify-center bg-[#0c0e14] overflow-hidden relative">
      <div class="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
        <div class="grid grid-cols-6 md:grid-cols-10 gap-3 transform -rotate-45 scale-[1.7] md:scale-150 w-[200vw] md:w-[150vw]">
          <For each={gridItems}>{src => (
            <img src={`https://image.tmdb.org/t/p/w200${src}`} class="w-20 h-28 md:w-24 md:h-36 object-cover rounded-lg shadow-2xl bg-[#171921]" />
          )}</For>
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-[#0c0e14]/10 via-[#0c0e14]/80 to-[#0c0e14] z-10"></div>
      <div class="relative z-20 flex flex-col items-center">
        <h1 class="text-5xl font-black font-headline text-[var(--primary)] mb-3 tracking-tighter">CINELOG</h1>
        <div class="flex items-center gap-2 text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest animate-pulse">
          <Icon name="hourglass_empty" class="text-sm animate-spin" /> Loading Universe...
        </div>
      </div>
    </div>
  );
}

const ThemeBtn = (props) => <button onClick={() => { props.set(props.id); props.onClose(); }} class={`w-full p-4 rounded-xl border ${props.curr===props.id?'border-[var(--primary)] bg-[var(--primary)]/10':'border-white/5 hover:bg-white/5'} flex gap-4 items-center transition-colors`}><div class="w-6 h-6 rounded-full shadow-lg" style={{background: props.hex}}></div><span class="font-bold">{props.name}</span></button>;
const NavBtn = (props) => <button onClick={props.onClick} class={`flex flex-col items-center gap-1 w-14 transition-colors ${props.active ? 'text-[var(--primary)]' : 'text-gray-500'}`}><Icon name={props.icon} fill={props.active} /><span class="text-[8px] font-bold uppercase tracking-wide">{props.label}</span></button>;

function SettingsModal(props) {
  onMount(() => document.body.style.overflow = 'hidden');
  onCleanup(() => document.body.style.overflow = '');
  const themes = [{id:'sage', n:'Sage (Classic)', h:'#b1a1ff'},{id:'matrix', n:'Matrix', h:'#00ff41'},{id:'netflix', n:'Netflix', h:'#e50914'},{id:'cyberpunk', n:'Cyberpunk', h:'#fce205'},{id:'interstellar', n:'Interstellar', h:'#38bdf8'},{id:'neonhorizon', n:'Neon Horizon', h:'#f472b6'},{id:'vibranium', n:'Vibranium', h:'#7c3aed'}];
  return (
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[999999]" onClick={props.onClose}>
      <div class="glass-surface w-full max-w-sm rounded-3xl p-6 border border-white/10 animate-pop-in" onClick={e=>e.stopPropagation()}>
        <div class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"><h3 class="font-bold text-lg flex items-center gap-2"><Icon name="palette" class="text-[var(--primary)]"/> Themes</h3><button onClick={props.onClose}><Icon name="close" class="text-gray-500 hover:text-white"/></button></div>
        <div class="space-y-2 max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar">
          <For each={themes}>{t => <ThemeBtn id={t.id} name={t.n} hex={t.h} curr={props.currentTheme} set={props.setTheme} onClose={props.onClose} />}</For>
        </div>
      </div>
    </div>
  );
}

const MovieCard = (props) => (
  <div onClick={props.onClick} class="group cursor-pointer animate-pop-in relative">
    <div class="aspect-[2/3] rounded-3xl overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.5)] group-hover:-translate-y-2 transition-all duration-300 border border-white/10 group-hover:border-[var(--primary)]/50 group-hover:shadow-[var(--primary)]/20 bg-[#171921]">
      <Show when={props.movie.poster_path} fallback={<div class="w-full h-full flex items-center justify-center skeleton-bg"><Icon name="movie" class="text-4xl text-gray-600"/></div>}>
        <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      </Show>
      <div class="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100 pointer-events-none"></div>
      <div class="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[8px] font-black text-[var(--primary)] uppercase tracking-wider shadow-lg">{props.movie.status === 'Plan to Watch' ? 'Planned' : (props.movie.status || 'NEW')}</div>
      <div class="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-wider shadow-lg">{props.movie.media_type === 'tv' ? 'SERIES' : 'MOVIE'}</div>
      <div class="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end">
        <h4 class="text-sm font-bold truncate text-white drop-shadow-md">{props.movie.title || props.movie.name}</h4>
        <Show when={props.movie.runtime && props.movie.runtime > 0}>
            <p class="text-[10px] text-gray-400 font-bold mt-1 flex items-center gap-1"><Icon name="schedule" class="text-[12px]"/> {formatRuntime(props.movie.runtime)}</p>
        </Show>
      </div>
    </div>
  </div>
);

function Dashboard(props) {
  const stats = createMemo(() => ({ total: props.watchlist().length, completed: props.watchlist().filter(m => m.status === 'Completed').length, watching: props.watchlist().filter(m => m.status === 'Watching').length, planned: props.watchlist().filter(m => m.status === 'Planned' || m.status === 'Plan to Watch').length }));
  return (
    <div class="animate-fade-in pb-4">
      <div onClick={() => { const p = props.watchlist().filter(m => m.status === 'Planned' || m.status === 'Plan to Watch'); if(p.length) { props.showToast("🎲 Picking random title..."); setTimeout(()=>props.openMovie(p[Math.floor(Math.random()*p.length)].id), 500); } else alert("Planned list is empty!"); }} class="bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] p-8 rounded-[2rem] mb-6 flex justify-between items-center shadow-2xl shadow-[var(--primary)]/20 cursor-pointer text-[#0c0e14] active:scale-95 transition-transform relative overflow-hidden group">
        <div class="relative z-10">
          <h2 class="text-3xl font-black font-headline flex items-center gap-2 mb-1"><Icon name="casino" fill class="text-3xl" /> What to Watch?</h2>
          <p class="text-[10px] font-bold uppercase tracking-widest opacity-80">Let the vault decide</p>
        </div>
        <Icon name="arrow_forward_ios" class="opacity-40 text-3xl relative z-10 group-hover:translate-x-2 transition-transform" />
        <div class="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 scale-150"><Icon name="casino" fill class="text-9xl" /></div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="glass-surface p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-end min-h-[120px] col-span-2 sm:col-span-1">
          <Icon name="inventory_2" class="absolute -right-4 -bottom-4 text-7xl text-white/5 group-hover:scale-110" fill />
          <p class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1 relative z-10">Total Titles</p>
          <h3 class="text-4xl font-headline font-black text-white relative z-10">{stats().total}</h3>
        </div>
        <div class="glass-surface p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-end min-h-[120px] col-span-2 sm:col-span-1 bg-gradient-to-br from-[var(--primary)]/5 to-transparent">
          <Icon name="done_all" class="absolute -right-4 -bottom-4 text-7xl text-[var(--primary)]/10" fill />
          <p class="text-[10px] text-[var(--primary)] opacity-80 uppercase font-bold tracking-widest mb-1 relative z-10">Completed</p>
          <h3 class="text-4xl font-headline font-black text-[var(--primary)] relative z-10">{stats().completed}</h3>
        </div>
        <div onClick={() => { props.setActiveVaultStatus('Watching'); props.setView('watchlist'); }} class="glass-surface p-5 rounded-[1.5rem] relative flex flex-col justify-center items-center text-center cursor-pointer active:scale-95">
          <h3 class="text-3xl font-headline font-black text-[var(--secondary)] relative z-10 mb-1">{stats().watching}</h3>
          <p class="text-[9px] text-gray-500 uppercase font-bold tracking-widest relative z-10">Watching</p>
        </div>
        <div onClick={() => { props.setActiveVaultStatus('Planned'); props.setView('watchlist'); }} class="glass-surface p-5 rounded-[1.5rem] relative flex flex-col justify-center items-center text-center cursor-pointer active:scale-95">
          <h3 class="text-3xl font-headline font-black text-gray-300 relative z-10 mb-1">{stats().planned}</h3>
          <p class="text-[9px] text-gray-500 uppercase font-bold tracking-widest relative z-10">Planned</p>
        </div>
      </div>
      
      <div class="flex justify-between items-end mb-5 px-1"><h3 class="text-xl font-bold font-headline">Recently Added</h3><button onClick={()=>{props.setActiveVaultStatus('all'); props.setView('watchlist');}} class="text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">View All <Icon name="chevron_right" class="text-[14px]"/></button></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4"><For each={props.watchlist().slice(0, 6)}>{(m) => <MovieCard movie={m} onClick={() => props.openMovie(m.id)} />}</For></div>
    </div>
  );
}

function Vault(props) {
  const [search, setSearch] = createSignal('');
  const [filters, setFilters] = createSignal({ type: 'all', status: props.activeStatus || 'all', region: 'all', genre: 'all', platform: 'all', sort: 'recent' });
  const [showFilter, setShowFilter] = createSignal(false);

  createEffect(() => { setFilters(f => ({...f, status: props.activeStatus || 'all'})); });

  const uniqueGenres = createMemo(() => [...new Set(props.watchlist().flatMap(m => getSafeGenres(m)))].filter(Boolean).sort());
  const uniquePlatforms = createMemo(() => [...new Set(props.watchlist().flatMap(m => getSafePlatforms(m)))].filter(Boolean).sort());

  const filtered = createMemo(() => {
    let f = props.watchlist();
    if(search()) f = f.filter(m => (m.title||m.name||'').toLowerCase().includes(search().toLowerCase()));
    if(filters().type !== 'all') f = f.filter(m => m.media_type === filters().type);
    if(filters().status !== 'all') f = f.filter(m => m.status === filters().status || (filters().status === 'Planned' && m.status === 'Plan to Watch'));
    if(filters().region !== 'all') f = f.filter(m => (m.region || 'International') === filters().region);
    if(filters().genre !== 'all') f = f.filter(m => getSafeGenres(m).includes(filters().genre));
    if(filters().platform !== 'all') f = f.filter(m => getSafePlatforms(m).includes(filters().platform));
    return f.sort((a, b) => {
      if(filters().sort === 'year_desc') return (parseInt(String(b.release_date||b.first_air_date||'').substring(0,4))||0) - (parseInt(String(a.release_date||a.first_air_date||'').substring(0,4))||0);
      if(filters().sort === 'rating_desc') return (b.rating||0) - (a.rating||0);
      if(filters().sort === 'title_asc') return (a.title||a.name||'').localeCompare(b.title||b.name||'');
      return (b.addedAt?.seconds||0) - (a.addedAt?.seconds||0);
    });
  });

  return (
    <div class="animate-fade-in pb-10">
      <div class="sticky top-0 z-40 bg-[#08090b]/80 backdrop-blur-2xl pt-4 pb-6 -mx-6 px-6 border-b border-white/5 mb-6">
        <div class="flex justify-between items-center mb-5">
            <h2 class="text-3xl font-headline font-black">Vault</h2>
            <button onClick={() => setShowFilter(true)} class="glass-surface px-4 py-2.5 rounded-full text-xs font-bold flex gap-2 border border-white/10 active:scale-95 transition-all shadow-lg"><Icon name="tune" class="text-sm"/> Filter</button>
        </div>
        <div class="flex items-center gap-3 glass-surface rounded-2xl px-5 py-4 relative border border-white/10 shadow-xl">
            <Icon name="search" class="text-gray-400" />
            <input value={search()} onInput={e => setSearch(e.target.value)} placeholder="Search your universe..." class="bg-transparent border-none w-full outline-none text-white text-sm" />
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4"><For each={filtered()}>{(m) => <MovieCard movie={m} onClick={() => props.openMovie(m.id)} />}</For></div>
      <Show when={showFilter()}><FilterModal filters={filters()} setFilters={setFilters} uniqueGenres={uniqueGenres()} uniquePlatforms={uniquePlatforms()} onClose={() => setShowFilter(false)} onFilterChange={props.onFilterChange} /></Show>
    </div>
  );
}

function FilterModal(props) {
  onMount(() => document.body.style.overflow = 'hidden');
  onCleanup(() => document.body.style.overflow = '');
  const FilterSel = (p) => <div class="grid grid-cols-[100px_1fr] items-center"><span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{p.label}</span><select value={p.val} onChange={e => p.set(e.target.value)} class="glass-surface p-2 rounded-lg text-xs text-white outline-none border border-white/5 focus:border-[var(--primary)]"><For each={p.opts}>{(o)=><option value={o.v||o}>{o.l||o}</option>}</For></select></div>;

  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-[999999] animate-fade-in" onClick={props.onClose}>
      <div class="glass-surface w-full max-w-sm rounded-t-[2rem] sm:rounded-[2rem] p-6 pb-32 sm:p-8 border border-white/10 shadow-2xl animate-pop-in bg-[#08090b]/95" onClick={e=>e.stopPropagation()}>
        <div class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"><h3 class="font-bold text-xl text-white flex items-center gap-2"><Icon name="tune" class="text-[var(--primary)]"/> Filters</h3><button onClick={props.onClose}><Icon name="close" class="text-gray-400"/></button></div>
        <div class="space-y-4 max-h-[50vh] overflow-y-auto hide-scrollbar">
          <FilterSel label="Status" val={props.filters.status} set={(v)=>{props.setFilters({...props.filters, status:v}); props.onFilterChange && props.onFilterChange(v);}} opts={[{l:'All',v:'all'},{l:'Planned',v:'Planned'},{l:'Watching',v:'Watching'},{l:'Completed',v:'Completed'}]} />
          <FilterSel label="Type" val={props.filters.type} set={(v)=>props.setFilters({...props.filters, type:v})} opts={[{l:'All', v:'all'}, {l:'Movies', v:'movie'}, {l:'Series', v:'tv'}]} />
          <FilterSel label="Region" val={props.filters.region} set={(v)=>props.setFilters({...props.filters, region:v})} opts={[{l:'All',v:'all'},{l:'Indian',v:'Indian'},{l:'International',v:'International'}]} />
          <FilterSel label="Genre" val={props.filters.genre} set={(v)=>props.setFilters({...props.filters, genre:v})} opts={[{l:'All Genres', v:'all'}, ...props.uniqueGenres.map(g=>({l:g, v:g}))]} />
          <FilterSel label="Platform" val={props.filters.platform} set={(v)=>props.setFilters({...props.filters, platform:v})} opts={[{l:'All Platforms', v:'all'}, ...props.uniquePlatforms.map(p=>({l:p, v:p}))]} />
          <FilterSel label="Sort By" val={props.filters.sort} set={(v)=>props.setFilters({...props.filters, sort:v})} opts={[{l:'Recently Added', v:'recent'}, {l:'Release Year', v:'year_desc'}, {l:'Rating', v:'rating_desc'}, {l:'Title (A-Z)', v:'title_asc'}]} />
        </div>
        <button onClick={props.onClose} class="w-full mt-6 bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-transform">Apply</button>
      </div>
    </div>
  );
}

function FranchisesView(props) {
  const [currentFolder, setCurrentFolder] = createSignal(null);
  const [sortMode, setSortMode] = createSignal('order');
  const [showAddModal, setShowAddModal] = createSignal(false);

  const subFolders = createMemo(() => props.franchises().filter(f => f.parentId === currentFolder()).sort((a,b) => a.name.localeCompare(b.name)));
  const currentMovies = createMemo(() => {
    let list = props.watchlist().filter(m => m.franchises && m.franchises[currentFolder()] !== undefined);
    return list.sort((a, b) => sortMode() === 'year' ? (parseInt(String(b.release_date||b.first_air_date||'').substring(0,4))||0) - (parseInt(String(a.release_date||a.first_air_date||'').substring(0,4))||0) : a.franchises[currentFolder()] - b.franchises[currentFolder()]);
  });
  
  const createFolder = async () => {
    const n = prompt("Folder Name:");
    if(n && n.trim()) {
      await addDoc(collection(db, 'users', props.uid, 'franchises'), { name: n.trim(), parentId: currentFolder(), createdAt: serverTimestamp() });
      props.showToast("Folder created!");
    }
  };
  
  const moveMovie = async (index, dir) => {
    let arr = [...currentMovies()]; if (index + dir < 0 || index + dir >= arr.length) return;
    const batch = writeBatch(db); [arr[index], arr[index+dir]] = [arr[index+dir], arr[index]];
    arr.forEach((m, i) => batch.update(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { [`franchises.${currentFolder()}`]: i + 1 }));
    await batch.commit();
  };

  return (
    <div class="pb-10 animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-headline font-black">Lists</h2>
        <Show when={!currentFolder()} fallback={<button onClick={() => setShowAddModal(true)} class="bg-[var(--primary)] text-[#0c0e14] px-4 py-2 rounded-full text-xs font-black">+ Movie</button>}>
          <button onClick={createFolder} class="bg-white/10 px-4 py-2 rounded-full text-xs font-bold">+ Folder</button>
        </Show>
      </div>

      <Show when={currentFolder()}><button onClick={() => setCurrentFolder(null)} class="mb-6 glass-surface px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase flex items-center gap-2">← Back</button></Show>
      
      <div class="flex flex-col gap-5 mb-10">
        <For each={subFolders()}>{(f) => {
          const movieCount = () => props.watchlist().filter(m => m.franchises && m.franchises[f.id] !== undefined).length;
          return (
            <div onClick={() => setCurrentFolder(f.id)} class="relative rounded-[2rem] cursor-pointer group shadow-2xl flex flex-col justify-end min-h-[120px] p-6 overflow-hidden border border-white/10 bg-[#171921]">
              <h3 class="font-black font-headline text-2xl text-white">{f.name}</h3>
              <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{movieCount()} titles</p>
              <button onClick={(e) => { e.stopPropagation(); confirm("Delete folder?") && deleteDoc(doc(db, 'users', props.uid, 'franchises', f.id)); }} class="absolute top-4 right-4 text-gray-500 hover:text-red-500"><Icon name="delete" /></button>
            </div>
          );
        }}</For>
      </div>

      <Show when={currentFolder()}>
        <div class="space-y-3">
          <For each={currentMovies()}>{(m, i) => (
            <div class="flex items-center gap-3 glass-surface p-3 rounded-[1.5rem] border border-white/5 shadow-lg group">
              <div class="flex flex-col items-center justify-center bg-white/5 rounded-xl p-1">
                <button onClick={() => moveMovie(i(), -1)} class={`text-gray-500 ${i()===0?'opacity-10':''}`}><Icon name="keyboard_arrow_up"/></button>
                <button onClick={() => moveMovie(i(), 1)} class={`text-gray-500 ${i()===currentMovies().length-1?'opacity-10':''}`}><Icon name="keyboard_arrow_down"/></button>
              </div>
              <div class="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => props.openMovie(m.id)}>
                <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} class="w-11 h-16 rounded-xl object-cover shadow-md shrink-0"/>
                <div><p class="font-bold text-sm text-gray-100 group-hover:text-[var(--primary)] transition-colors">{m.title || m.name}</p><p class="text-[10px] text-gray-500">{(m.release_date||'').split('-')[0]}</p></div>
              </div>
            </div>
          )}</For>
        </div>
      </Show>

      <Show when={showAddModal() && currentFolder()}>
        <AddToFolderModal uid={props.uid} folderId={currentFolder()} watchlist={props.watchlist} currentMovies={currentMovies} showToast={props.showToast} onClose={() => setShowAddModal(false)} />
      </Show>
    </div>
  );
}

function AddToFolderModal(props) {
  const [search, setSearch] = createSignal('');
  const available = createMemo(() => props.watchlist().filter(m => m.franchises?.[props.folderId] === undefined).filter(m => !search() || (m.title || m.name || '').toLowerCase().includes(search().toLowerCase())));

  const add = async (m) => {
    const nextOrder = props.currentMovies().length + 1;
    await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { [`franchises.${props.folderId}`]: nextOrder });
    props.showToast(`Added!`);
  };

  return (
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[999999]" onClick={props.onClose}>
      <div class="w-full max-w-lg bg-[#08090b] rounded-[2rem] border border-white/10 shadow-2xl animate-pop-in flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
        <div class="p-5 border-b border-white/5 flex justify-between items-center shrink-0"><h3 class="font-black text-lg">Add to Folder</h3><button onClick={props.onClose}><Icon name="close"/></button></div>
        <div class="p-4 shrink-0"><input value={search()} onInput={e => setSearch(e.target.value)} placeholder="Search vault..." class="w-full bg-white/5 p-3 rounded-xl outline-none border border-white/5 focus:border-[var(--primary)]" /></div>
        <div class="overflow-y-auto hide-scrollbar p-3 space-y-2"><For each={available()}>{(m) => (
          <div class="flex items-center gap-3 glass-surface p-3 rounded-2xl border border-white/5"><img src={`https://image.tmdb.org/t/p/w92${m.poster_path}`} class="w-10 h-14 rounded-xl object-cover"/><div class="flex-1 font-bold text-sm truncate">{m.title || m.name}</div><button onClick={() => add(m)} class="bg-[var(--primary)]/10 text-[var(--primary)] w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"><Icon name="add" /></button></div>
        )}</For></div>
      </div>
    </div>
  );
}

function UpcomingView(props) {
  const [activeTab, setActiveTab] = createSignal('Indian');
  const [mediaType, setMediaType] = createSignal('movie'); 
  const [lang, setLang] = createSignal('all');
  const [selectedDate, setSelectedDate] = createSignal(new Date().toISOString().split('T')[0]);
  const [movies, setMovies] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [previewMovie, setPreviewMovie] = createSignal(null);

  createEffect(() => {
    setLoading(true);
    const dateObj = new Date(selectedDate());
    const startDate = dateObj.toISOString().split('T')[0];
    dateObj.setDate(dateObj.getDate() + 30); 
    const endDate = dateObj.toISOString().split('T')[0];
    
    let mUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=popularity.desc`;
    let tUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&air_date.gte=${startDate}&air_date.lte=${endDate}&sort_by=popularity.desc`;
    
    if (activeTab() === 'Indian') {
        mUrl += '&with_origin_country=IN'; tUrl += '&with_origin_country=IN';
        if (lang() !== 'all') { mUrl += `&with_original_language=${lang()}`; tUrl += `&with_original_language=${lang()}`; }
    }
    
    Promise.all([fetch(mUrl).then(r=>r.json()), fetch(tUrl).then(r=>r.json())]).then(([m, t]) => { 
        let resList = [...(m.results||[]).map(x=>({...x, media_type:'movie', calc_date: x.release_date})), ...(t.results||[]).map(x=>({...x, media_type:'tv', title:x.name, calc_date: x.first_air_date}))];
        resList = resList.filter(x => x.calc_date && x.poster_path);
        resList.sort((a,b) => new Date(a.calc_date) - new Date(b.calc_date));
        setMovies(resList); setLoading(false); 
    }).catch(()=>setLoading(false));
  });

  const handleAdd = async (m) => {
    if(props.watchlist().some(item => String(item.id) === String(m.id))) return props.showToast("Already in vault!");
    const detailRes = await fetch(`https://api.themoviedb.org/3/${m.media_type}/${m.id}?api_key=${TMDB_KEY}`);
    const fullData = await detailRes.json();
    await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), {
      id: m.id, title: m.title, poster_path: m.poster_path, backdrop_path: m.backdrop_path, media_type: m.media_type, status: 'Planned', addedAt: serverTimestamp(),
      release_date: m.release_date || '', region: activeTab() === 'Indian' ? 'Indian' : 'International', season: 1, episode: 0, totalEps: fullData.number_of_episodes || 0, runtime: fullData.runtime || fullData.episode_run_time?.[0] || 0
    }); props.showToast("Added!"); setPreviewMovie(null);
  };

  return (
    <div class="pb-10 animate-fade-in">
      <h2 class="text-3xl font-headline font-black mb-6">Upcoming</h2>
      <div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4"><button onClick={()=>{setActiveTab('Indian'); setLang('all');}} class={`flex-1 py-2 rounded-xl text-xs font-bold ${activeTab()==='Indian'?'bg-[var(--primary)] text-[#0c0e14]':'text-gray-400'}`}>Indian</button><button onClick={()=>{setActiveTab('International'); setLang('all');}} class={`flex-1 py-2 rounded-xl text-xs font-bold ${activeTab()==='International'?'bg-[var(--primary)] text-[#0c0e14]':'text-gray-400'}`}>International</button></div>
      <div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4"><button onClick={()=>setMediaType('movie')} class={`flex-1 py-2 rounded-xl text-xs font-bold ${mediaType()==='movie'?'bg-[var(--secondary)] text-[#0c0e14]':'text-gray-400'}`}>Movies</button><button onClick={()=>setMediaType('tv')} class={`flex-1 py-2 rounded-xl text-xs font-bold ${mediaType()==='tv'?'bg-[var(--secondary)] text-[#0c0e14]':'text-gray-400'}`}>Series</button></div>

      <div class="glass-surface p-5 rounded-[2rem] mb-8 flex flex-col gap-3">
        <label class="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Select Start Date</label>
        <input type="date" value={selectedDate()} onInput={e => setSelectedDate(e.target.value)} class="bg-[#08090b] border border-white/10 p-4 rounded-xl outline-none text-white [color-scheme:dark]" />
      </div>

      <Show when={loading()} fallback={
          <div class="space-y-4">
            <For each={movies().filter(m => m.media_type === mediaType())}>{(m) => (
              <div onClick={() => setPreviewMovie(m)} class="flex items-center gap-4 glass-surface p-3 rounded-[1.5rem] border border-white/5 cursor-pointer hover:border-[var(--primary)]/30">
                <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} class="w-16 h-24 rounded-xl object-cover shadow-md bg-[#171921]" />
                <div class="flex-1">
                    <p class="text-[10px] text-[var(--primary)] font-black uppercase mb-1">{m.calc_date}</p>
                    <p class="font-bold text-sm text-gray-100 line-clamp-1">{m.title}</p>
                </div>
              </div>
            )}</For>
          </div>
      }><div class="text-center p-12 text-[var(--primary)] animate-pulse">Scanning Radar...</div></Show>

      <Show when={previewMovie()}><UpcomingDetailsModal movie={previewMovie()} onClose={() => setPreviewMovie(null)} onAdd={() => handleAdd(previewMovie())} /></Show>
    </div>
  );
}

function UpcomingDetailsModal(props) {
  const [details, setDetails] = createSignal(props.movie);
  const [trailerKey, setTrailerKey] = createSignal(null);
  const [playTrailer, setPlayTrailer] = createSignal(false);

  onMount(() => {
      fetch(`https://api.themoviedb.org/3/${props.movie.media_type}/${props.movie.id}?api_key=${TMDB_KEY}&append_to_response=videos`)
      .then(r=>r.json()).then(d=>{
          setDetails(d);
          const v = d.videos?.results; if(v){ let t = v.find(x=>x.site==='YouTube'&&(x.type==='Trailer'||x.type==='Teaser'))||v.find(x=>x.site==='YouTube'); if(t) setTrailerKey(t.key); }
      });
  });

  return (
      <div class="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[999999]" onClick={props.onClose}>
          <div class="w-full max-w-xl bg-[#0c0e14] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl animate-pop-in" onClick={e=>e.stopPropagation()}>
              <button onClick={props.onClose} class="absolute top-4 right-4 z-[100] bg-black/50 p-2.5 rounded-full"><Icon name="close"/></button>
              <div class="h-48 md:h-64 bg-black relative">
                  <Show when={!playTrailer()} fallback={<iframe class="w-full h-full" src={`https://www.youtube.com/embed/${trailerKey()}?autoplay=1`} frameborder="0" allowfullscreen></iframe>}>
                      <img src={`https://image.tmdb.org/t/p/original${details().backdrop_path}`} class="w-full h-full object-cover opacity-40" />
                      <Show when={trailerKey()}><button onClick={() => setPlayTrailer(true)} class="absolute inset-0 flex items-center justify-center"><Icon name="play_arrow" fill class="text-6xl text-[var(--primary)]"/></button></Show>
                  </Show>
              </div>
              <div class="p-6">
                  <h2 class="text-3xl font-black mb-2">{details().title || details().name}</h2>
                  <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{details().release_date || details().first_air_date}</p>
                  <p class="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-4">{details().overview}</p>
                  <button onClick={props.onAdd} class="w-full bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 shadow-lg shadow-[var(--primary)]/20">Add to Vault</button>
              </div>
          </div>
      </div>
  );
}

function DetailsModal(props) {
  const movie = createMemo(() => props.watchlist.find(m => String(m.id) === String(props.id)));
  const [details, setDetails] = createSignal({});
  const [isEdit, setIsEdit] = createSignal(false); const [trailerKey, setTrailerKey] = createSignal(null); const [playTrailer, setPlayTrailer] = createSignal(false);
  const [showPlayer, setShowPlayer] = createSignal(false); const [activeServer, setActiveServer] = createSignal('VidLink');
  const [form, setForm] = createSignal({ status: '', rating: '', watchDate: '', notes: '', region: '', season: 1, episode: 1, genres: '', platforms: '' });
  
  onMount(() => { document.body.style.overflow = 'hidden'; }); onCleanup(() => { document.body.style.overflow = ''; });
  const allAvailablePlatforms = createMemo(() => [...new Set(props.watchlist.flatMap(m => getSafePlatforms(m)))].filter(Boolean).sort());

  createEffect(() => { 
      if(movie()) { 
          setForm({ status: movie().status||'Planned', rating: movie().rating||'', watchDate: typeof movie().watchDate==='string'?movie().watchDate:'', notes: typeof movie().notes==='string'?movie().notes:'', region: movie().region||'International', season: movie().season||1, episode: movie().episode||1, genres: getSafeGenres(movie()).join(', '), platforms: getSafePlatforms(movie()).join(', ') }); 
          fetch(`https://api.themoviedb.org/3/${movie().media_type||'movie'}/${movie().id}?api_key=${TMDB_KEY}&append_to_response=videos`).then(r=>r.json()).then(d=>{ 
              setDetails(d);
              const v = d?.videos?.results; if(v){ let t = v.find(x=>x.site==='YouTube'&&x.type==='Trailer')||v.find(x=>x.site==='YouTube'&&x.type==='Teaser')||v.find(x=>x.site==='YouTube'); if(t) setTrailerKey(t.key); } 
          }).catch(()=>{}); 
      } 
  });

  const togglePlatform = (p) => { let curr = form().platforms.split(',').map(s=>s.trim()).filter(Boolean); if(curr.includes(p)) curr = curr.filter(x=>x!==p); else curr.push(p); setForm({...form(), platforms: curr.join(', ')}); };
  const saveChanges = async () => { await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)), { status: form().status, rating: parseFloat(form().rating)||0, watchDate: form().watchDate, notes: form().notes, region: form().region, season: parseInt(form().season)||1, episode: parseInt(form().episode)||1, genresList: form().genres.split(',').map(s=>s.trim()).filter(Boolean), platformsList: form().platforms.split(',').map(s=>cleanPlatform(s.trim())).filter(Boolean) }); props.showToast("Saved"); setIsEdit(false); };
  const progressPct = createMemo(() => movie()?.status === 'Completed' ? 100 : Math.min(((movie()?.episode||0) / (movie()?.totalEps||1)) * 100, 100));
  const getStreamUrl = (server) => { const id = movie().id; const s = movie().season || 1; const e = movie().episode || 1; if (server === 'VidLink') { return movie().media_type === 'tv' ? `https://vidlink.pro/tv/${id}/${s}/${e}?primaryColor=b1a1ff` : `https://vidlink.pro/movie/${id}?primaryColor=b1a1ff`; } return movie().media_type === 'tv' ? `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.me/embed/movie?tmdb=${id}`; };

  return (
    <div class="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center animate-fade-in" onClick={props.onClose}>
      <div class="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      <Show when={movie()}>
        <div class="w-full max-w-xl bg-[#08090b] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden border border-white/10 relative max-h-[90vh] shadow-2xl animate-pop-in flex flex-col" onClick={e=>e.stopPropagation()}>
          <button onClick={props.onClose} class="absolute top-4 right-4 z-[100] bg-black/50 p-2.5 rounded-full"><Icon name="close"/></button>
          <div class="overflow-y-auto hide-scrollbar">
              <div class="h-56 relative bg-black">
                <Show when={!playTrailer()} fallback={<iframe class="w-full h-full" src={`https://www.youtube.com/embed/${trailerKey()}?autoplay=1`} frameborder="0" allowfullscreen></iframe>}>
                  <img src={`https://image.tmdb.org/t/p/original${movie().backdrop_path}`} class="w-full h-full object-cover opacity-60" />
                  <Show when={trailerKey()}><button onClick={() => setPlayTrailer(true)} class="absolute inset-0 flex items-center justify-center"><Icon name="play_circle" fill class="text-6xl text-[var(--primary)]"/></button></Show>
                </Show>
              </div>
              <div class="p-6 -mt-10 relative z-10">
                <div class="flex justify-between items-start mb-2"><h2 class="text-3xl font-black drop-shadow-md">{movie().title || movie().name}</h2><button onClick={()=>setIsEdit(!isEdit())} class={`p-2 rounded-full border ${isEdit() ? 'bg-[var(--primary)] text-black' : 'text-gray-500'}`}><Icon name={isEdit()?'check':'edit'}/></button></div>
                <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-6">{(movie().release_date||'').split('-')[0]} • {movie().media_type}</p>
                
                <Show when={isEdit()} fallback={
                  <div class="animate-fade-in">
                    <div class="flex gap-2 mb-6"><button onClick={() => setShowPlayer(true)} class="flex-1 bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest active:scale-95 shadow-lg">Watch Now</button></div>
                    <div class="glass-surface p-5 rounded-2xl space-y-3 border border-white/5">
                        <SafeInfoRow icon="adjust" label="Status" value={<span class="text-[var(--primary)] font-black uppercase text-[10px]">{movie().status}</span>} />
                        <Show when={movie().media_type === 'tv'}><div class="grid grid-cols-[100px_1fr] items-center mb-3"><span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Progress</span><div class="w-full bg-white/5 h-1.5 rounded-full mt-1"><div class="h-full bg-[var(--primary)] transition-all" style={{width:`${progressPct()}%`}}></div></div></div></Show>
                        <SafeInfoRow icon="public" label="Region" value={<span class="text-xs font-bold">{movie().region || 'International'}</span>} />
                        <SafeInfoRow icon="connected_tv" label="Platform" value={<span class="text-xs font-bold text-[var(--secondary)]">{getSafePlatforms(movie()).join(', ') || 'N/A'}</span>} />
                        <SafeInfoRow icon="star" label="Rating" value={<span class="text-xs font-bold">{movie().rating ? `${movie().rating}/10` : 'Empty'}</span>} />
                    </div>
                  </div>
                }>
                  <div class="glass-surface p-6 rounded-2xl space-y-4 animate-fade-in">
                    <div class="grid grid-cols-2 gap-4"><div><label class="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Status</label><select value={form().status} onChange={e=>setForm({...form(), status: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-lg text-sm"><option value="Planned">Planned</option><option value="Watching">Watching</option><option value="Completed">Completed</option></select></div><div><label class="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Rating</label><input type="number" step="0.1" value={form().rating} onChange={e=>setForm({...form(), rating: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-lg text-sm"/></div></div>
                    <Show when={movie().media_type === 'tv'}><div class="grid grid-cols-2 gap-4"><div><label class="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Season</label><input type="number" value={form().season} onInput={e=>setForm({...form(), season: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-lg text-sm"/></div><div><label class="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Episode</label><input type="number" value={form().episode} onInput={e=>setForm({...form(), episode: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-lg text-sm"/></div></div></Show>
                    <div><label class="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Platforms</label><div class="flex flex-wrap gap-2"><For each={allAvailablePlatforms()}>{p => <button type="button" onClick={()=>togglePlatform(p)} class={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${form().platforms.includes(p) ? 'bg-[var(--secondary)] text-black' : 'bg-white/5'}`}>{p}</button>}</For></div></div>
                    <button onClick={saveChanges} class="w-full bg-[var(--primary)] text-[#0c0e14] font-black py-3 rounded-xl text-xs uppercase mt-2">Save Changes</button>
                    <button onClick={async () => { if(confirm("Delete?")) { await deleteDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id))); props.onClose(); } }} class="w-full text-red-500 text-xs font-bold mt-4">Delete Permanently</button>
                  </div>
                </Show>
              </div>
          </div>
        </div>
      </Show>
      <Show when={showPlayer()}><div class="fixed inset-0 bg-black z-[10000000] flex flex-col"><div class="p-4 flex justify-between bg-[#0c0e14]"><button onClick={() => setShowPlayer(false)}><Icon name="arrow_back"/></button><div class="flex gap-2"><button onClick={()=>setActiveServer('VidLink')} class={`px-3 py-1 rounded-lg text-xs ${activeServer()==='VidLink'?'bg-[var(--primary)] text-black':'bg-white/5'}`}>Server 1</button><button onClick={()=>setActiveServer('Vidsrc')} class={`px-3 py-1 rounded-lg text-xs ${activeServer()==='Vidsrc'?'bg-[var(--primary)] text-black':'bg-white/5'}`}>Server 2</button></div></div><iframe src={getStreamUrl(activeServer())} class="flex-1 w-full border-none" allowfullscreen ></iframe></div></Show>
    </div>
  );
}

function DataSync(props) {
  const [importLogs, setImportLogs] = createSignal([]);
  const exportData = (format) => {
    let dataStr, type, ext;
    if(format === 'json') { dataStr = JSON.stringify(props.watchlist(), null, 2); type = 'application/json'; ext = 'json'; }
    else { const headers = ['Title', 'Type', 'Status', 'Rating']; const rows = props.watchlist().map(m => [`"${m.title||m.name}"`, m.media_type, m.status, m.rating]); dataStr = [headers.join(','), ...rows.map(r=>r.join(','))].join('\n'); type = 'text/csv'; ext = 'csv'; }
    const blob = new Blob([dataStr], { type }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `cinelog.${ext}`; a.click();
  };

  const handleJSONUpload = async (e) => {
      const file = e.target.files[0]; if(!file) return;
      try {
          const data = JSON.parse(await file.text());
          for(let m of data) {
              await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { ...m, addedAt: serverTimestamp() });
              setImportLogs(prev => [...prev, { title: m.title || m.name, msg: 'Imported' }]);
          }
      } catch(e) { alert("Invalid JSON"); }
  };

  return (
    <div class="animate-fade-in pb-10">
      <h2 class="text-3xl font-headline font-bold mb-8">Data Sync</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="glass-surface rounded-3xl p-8 text-center border border-white/5">
          <Icon name="upload_file" class="text-5xl text-[var(--primary)] mb-4" />
          <h3 class="font-bold mb-4">Import Backup</h3>
          <input type="file" id="jsonInput" accept=".json" class="hidden" onChange={handleJSONUpload} />
          <button onClick={() => document.getElementById('jsonInput').click()} class="w-full bg-white/5 py-3 rounded-xl text-xs font-bold">Upload JSON</button>
        </div>
        <div class="glass-surface rounded-3xl p-8 text-center border border-white/5">
          <Icon name="download" class="text-5xl text-[var(--secondary)] mb-4" />
          <h3 class="font-bold mb-4">Export Vault</h3>
          <div class="flex gap-4"><button onClick={() => exportData('csv')} class="flex-1 bg-white/5 py-3 rounded-xl text-xs font-bold">CSV</button><button onClick={() => exportData('json')} class="flex-1 bg-[var(--secondary)] text-black py-3 rounded-xl text-xs font-bold">JSON</button></div>
        </div>
      </div>
      <Show when={importLogs().length > 0}><div class="mt-8 glass-surface p-6 rounded-2xl"><h4 class="font-bold mb-4">Logs</h4><div class="space-y-2"><For each={importLogs()}>{(l)=><div class="text-xs flex justify-between"><span>{l.title}</span><span class="text-green-500">{l.msg}</span></div>}</For></div></div></Show>
    </div>
  );
}

function SearchModal(props) {
  const [q, setQ] = createSignal(''); const [results, setResults] = createSignal([]); const [searching, setSearching] = createSignal(false);
  onMount(() => { document.body.style.overflow = 'hidden'; }); onCleanup(() => { document.body.style.overflow = ''; });
  
  createEffect(() => {
    const query = q(); if (query.length < 2) return setResults([]); setSearching(true);
    const t = setTimeout(async () => { try { const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${query}`); const data = await res.json(); setResults(data.results ? data.results.filter(r => r.media_type !== 'person') : []); } catch(e){} setSearching(false); }, 500);
    return () => clearTimeout(t);
  });

  const addMedia = async (m) => {
    if(props.watchlist.some(item => String(item.id) === String(m.id))) return props.showToast("Already in vault!");
    const res = await fetch(`https://api.themoviedb.org/3/${m.media_type}/${m.id}?api_key=${TMDB_KEY}&append_to_response=watch/providers`); const data = await res.json();
    await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), {
      id: m.id, title: m.title || m.name || '', poster_path: m.poster_path, backdrop_path: m.backdrop_path, media_type: m.media_type, status: 'Planned', addedAt: serverTimestamp(),
      platformsList: [...new Set((data['watch/providers']?.results?.IN?.flatrate || []).map(p => cleanPlatform(p.provider_name)))].filter(Boolean).slice(0,3), genresList: (data.genres || []).map(g => g.name),
      release_date: m.release_date || m.first_air_date || '', region: (data.origin_country?.includes('IN') ? 'Indian' : 'International'), season: 1, episode: 0, totalEps: data.number_of_episodes || 0, runtime: data.runtime || data.episode_run_time?.[0] || 0
    }); props.showToast("Added!"); props.onClose();
  };

  return (
    <div class="fixed inset-0 bg-black/70 backdrop-blur-md p-4 pt-20 z-[999999] flex justify-center items-start animate-fade-in" onClick={props.onClose}>
      <div class="w-full max-w-2xl glass-surface rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[75vh] border border-white/10" onClick={e=>e.stopPropagation()}>
        <div class="p-5 border-b border-white/5 flex gap-4 items-center bg-[#08090b]">
            <Icon name="search" class="text-[var(--primary)] text-2xl"/>
            <input autofocus value={q()} onInput={e=>setQ(e.target.value)} placeholder="Search everything..." class="bg-transparent border-none w-full outline-none text-white text-xl"/>
            <button onClick={props.onClose}><Icon name="close"/></button>
        </div>
        <div class="overflow-y-auto p-3 hide-scrollbar">
            <Show when={searching()}><div class="text-center p-12 text-[var(--primary)] animate-pulse uppercase text-[10px] font-bold">Scanning...</div></Show>
            <div class="space-y-2">
                <For each={results()}>{(r) => (
                    <div onClick={() => addMedia(r)} class="flex gap-4 p-3 glass-surface rounded-[1.5rem] border border-transparent hover:border-[var(--primary)]/30 cursor-pointer group transition-all">
                        <img src={`https://image.tmdb.org/t/p/w200${r.poster_path}`} class="w-14 h-20 rounded-xl object-cover shadow-md bg-[#171921]" />
                        <div class="flex-1 self-center">
                            <p class="font-bold text-base text-gray-100 group-hover:text-[var(--primary)]">{r.title || r.name}</p>
                            <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{r.media_type} • {(r.release_date || r.first_air_date || '').split('-')[0]}</p>
                        </div>
                        <button class="self-center bg-[var(--primary)]/10 text-[var(--primary)] w-10 h-10 rounded-full flex items-center justify-center"><Icon name="add" /></button>
                    </div>
                )}</For>
            </div>
        </div>
      </div>
    </div>
  );
}

function InsightsModal(props) {
  const stats = createMemo(() => {
    let mins = 0; const genres = {}; const comp = props.watchlist().filter(m => m.status === 'Completed');
    comp.forEach(m => { mins += (parseInt(m.runtime)||0) * (m.media_type==='tv' ? (parseInt(m.episode)||1) : 1); getSafeGenres(m).forEach(g => genres[g]=(genres[g]||0)+1); });
    const topG = Object.entries(genres).sort((a,b)=>b[1]-a[1]).slice(0,5);
    return { days: Math.floor(mins/1440), hours: Math.floor((mins%1440)/60), total: comp.length, topG, maxG: topG[0]?.[1]||1 };
  });

  return (
    <div class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[999999] animate-fade-in" onClick={props.onClose}>
      <div class="w-full max-w-lg bg-[#08090b] rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div class="flex justify-between items-center mb-8"><h2 class="text-3xl font-headline font-black">Insights</h2><button onClick={props.onClose}><Icon name="close"/></button></div>
        <div class="flex justify-center mb-10">
            <div class="w-48 h-48 flex items-center justify-center rounded-full border-8 border-[var(--primary)]/20 relative">
                <div class="text-center"><span class="text-5xl font-black font-headline text-white">{stats().days}d</span><div class="text-xl font-bold text-[var(--secondary)] mt-1">{stats().hours}h</div></div>
            </div>
        </div>
        <div class="glass-surface rounded-[1.5rem] p-6 border border-white/5">
            <h3 class="font-bold mb-5 flex items-center gap-2"><Icon name="pie_chart" class="text-[var(--primary)]"/> Top Genres</h3>
            <div class="space-y-4">
                <For each={stats().topG}>{([g, c]) => (
                    <div>
                        <div class="flex justify-between text-xs font-bold mb-1.5"><span>{g}</span><span>{c}</span></div>
                        <div class="w-full bg-white/5 h-2 rounded-full"><div style={{width: `${(c/stats().maxG)*100}%`}} class="h-full bg-[var(--primary)] rounded-full"></div></div>
                    </div>
                )}</For>
            </div>
        </div>
      </div>
    </div>
  );
}
