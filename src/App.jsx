import { createSignal, onMount, onCleanup, createEffect, For, Show, createMemo, ErrorBoundary } from 'solid-js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, orderBy, doc, setDoc, deleteDoc, updateDoc, serverTimestamp, addDoc, writeBatch, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

// 1. CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAvV2m7IAbDGSr0ZdFNv9Rnq9oUEAgufyI",
  authDomain: "watchlist-bcdfd.firebaseapp.com",
  projectId: "watchlist-bcdfd",
  storageBucket: "watchlist-bcdfd.firebasestorage.app",
  messagingSenderId: "479628005507",
  appId: "1:479628005507:web:12e0aa5b98977c82860bb6"
};
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 2. UTILS
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
const formatRuntime = (mins) => { if (!mins || mins <= 0) return null; const h = Math.floor(mins / 60); const m = mins % 60; return h > 0 ? `${h}h ${m > 0 ? m + 'm' : ''}` : `${m}m`; };
const Icon = (props) => <span class={`material-symbols-outlined ${props.fill ? 'filled' : ''} ${props.class || ''}`}>{props.name}</span>;
const SafeInfoRow = (props) => <div class="grid grid-cols-[100px_1fr] items-center"><span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-2 tracking-widest"><Icon name={props.icon} class="text-[14px]" /> {props.label}</span><div class="text-sm font-bold text-gray-200">{props.value}</div></div>;

// 3. MAIN APP
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
            <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} class="bg-[var(--primary)] text-black font-bold py-4 px-10 rounded-full shadow-lg">Sign In with Google</button>
          </div>
        }>
          
          <header class="flex justify-between items-center p-6 pb-2 relative">
            <h2 class="text-2xl font-black font-headline text-[var(--primary)] tracking-tighter">Cinelog</h2>
            <div class="flex items-center gap-3">
              <button onClick={() => setSettingsModal(true)} class="text-gray-500 glass-surface p-2 rounded-full"><Icon name="palette" class="text-sm" /></button>
              <div class="relative">
                <img src={user().photoURL} onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen()); }} class="w-9 h-9 rounded-full border-2 border-[var(--primary)] cursor-pointer" />
                <Show when={userMenuOpen()}>
                  <div class="absolute right-0 mt-3 w-48 glass-surface rounded-2xl shadow-2xl py-2 z-[100] animate-pop-in">
                    <button onClick={() => { setStatsModal(true); setUserMenuOpen(false); }} class="w-full text-left px-5 py-3 text-sm font-bold text-[var(--primary)] hover:bg-white/5 flex items-center gap-3"><Icon name="bar_chart" /> Insights</button>
                    <button onClick={() => { setView('sync'); setUserMenuOpen(false); }} class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"><Icon name="import_export" /> Data Sync</button>
                    <button onClick={() => signOut(auth)} class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"><Icon name="logout" /> Logout</button>
                    <div class="border-t border-white/5 my-1"></div>
                    <button onClick={nukeCollection} class="w-full text-left px-5 py-3 text-sm font-bold text-red-500 flex items-center gap-3"><Icon name="delete_forever" /> Nuke Vault</button>
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
            <nav class="glass-surface backdrop-blur-xl w-full max-w-md rounded-full flex justify-around items-center px-2 py-3 shadow-2xl pointer-events-auto">
              <NavBtn icon="dashboard" label="Home" active={view()==='dashboard'} onClick={() => setView('dashboard')} />
              <NavBtn icon="visibility" label="Vault" active={view()==='watchlist'} onClick={() => setView('watchlist')} />
              <div class="relative -mt-8 mx-1">
                  <button onClick={() => setSearchModal(true)} class="bg-gradient-to-tr from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-[var(--primary)]/30 border-4 border-[#08090b]">
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
            <div class="fixed bottom-28 left-1/2 -translate-x-1/2 glass-surface border border-[var(--primary)] text-white px-6 py-3 rounded-full shadow-2xl z-[999999] flex gap-2 items-center text-sm font-bold animate-pop-in"><Icon name="check_circle" class="text-[var(--primary)]" fill /> {toast().msg}</div>
          </Show>
        </Show>
      </Show>
    </div>
    </ErrorBoundary>
  );
}

// 4. SUB COMPONENTS
function LoadingScreen() {
  const posters = ["/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"];
  return (
    <div class="h-screen w-full flex items-center justify-center bg-[#0c0e14] overflow-hidden relative">
      <div class="relative z-20 flex flex-col items-center">
        <h1 class="text-5xl font-black font-headline text-[var(--primary)] mb-3 tracking-tighter">CINELOG</h1>
        <div class="flex items-center gap-2 text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest animate-pulse"><Icon name="hourglass_empty" class="text-sm animate-spin" /> Scanning Radar...</div>
      </div>
    </div>
  );
}

const ThemeBtn = (props) => <button onClick={() => { props.set(props.id); props.onClose(); }} class={`w-full p-4 rounded-xl border ${props.curr===props.id?'border-[var(--primary)] bg-[var(--primary)]/10':'border-white/5 hover:bg-white/5'} flex gap-4 items-center`}><div class="w-6 h-6 rounded-full" style={{background: props.hex}}></div><span class="font-bold">{props.name}</span></button>;
const NavBtn = (props) => <button onClick={props.onClick} class={`flex flex-col items-center gap-1 w-14 ${props.active ? 'text-[var(--primary)]' : 'text-gray-500'}`}><Icon name={props.icon} fill={props.active} /><span class="text-[8px] font-bold uppercase tracking-wide">{props.label}</span></button>;

function SettingsModal(props) {
  const themes = [{id:'sage', n:'Sage', h:'#b1a1ff'},{id:'matrix', n:'Matrix', h:'#00ff41'},{id:'netflix', n:'Netflix', h:'#e50914'},{id:'cyberpunk', n:'Cyberpunk', h:'#fce205'},{id:'interstellar', n:'Interstellar', h:'#38bdf8'},{id:'neonhorizon', n:'Neon Horizon', h:'#f472b6'},{id:'vibranium', n:'Vibranium', h:'#7c3aed'}];
  return (
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[999999]" onClick={props.onClose}>
      <div class="glass-surface w-full max-w-sm rounded-3xl p-6 animate-pop-in" onClick={e=>e.stopPropagation()}>
        <div class="flex justify-between items-center border-b border-white/5 pb-4 mb-4"><h3 class="font-bold text-lg">Themes</h3><button onClick={props.onClose}><Icon name="close"/></button></div>
        <div class="space-y-2 overflow-y-auto max-h-[60vh] hide-scrollbar"><For each={themes}>{t => <ThemeBtn id={t.id} name={t.n} hex={t.h} curr={props.currentTheme} set={props.setTheme} onClose={props.onClose} />}</For></div>
      </div>
    </div>
  );
}

// 5. MOVIE CARD (Rating & Runtime Fix)
const MovieCard = (props) => (
  <div onClick={props.onClick} class="group cursor-pointer animate-pop-in relative">
    <div class="aspect-[2/3] rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 group-hover:border-[var(--primary)]/50 transition-all bg-[#171921]">
      <Show when={props.movie.poster_path} fallback={<div class="w-full h-full flex items-center justify-center skeleton-bg"><Icon name="movie" class="text-4xl text-gray-600"/></div>}>
        <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      </Show>
      <div class="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/40 to-transparent"></div>
      
      <div class="absolute top-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[7px] font-black text-[var(--primary)] uppercase tracking-wider">{props.movie.status}</div>
      <div class="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[7px] font-black text-white uppercase tracking-wider">{props.movie.media_type === 'tv' ? 'SERIES' : 'MOVIE'}</div>
      
      <div class="absolute bottom-0 left-0 w-full p-3 flex flex-col">
        <h4 class="text-xs font-black truncate text-white leading-tight">{props.movie.title || props.movie.name}</h4>
        <p class="text-[8px] text-gray-400 font-bold mt-1 flex items-center gap-1">
            {props.movie.release_date?.split('-')[0] || 'N/A'} • {formatRuntime(props.movie.runtime) || '-'}
        </p>
        {/* Card Ratings Row */}
        <div class="flex gap-1.5 mt-2">
            <span class="text-[7px] font-black text-[#f5c518]">★ {props.movie.imdbRating || '-'}</span>
            <span class="text-[7px] font-black text-red-500">🍅 {props.movie.rtRating || '-'} %</span>
            <span class="text-[7px] font-black text-[var(--primary)]">S {props.movie.rating || '-'}</span>
        </div>
      </div>
    </div>
  </div>
);

// 6. DASHBOARD
function Dashboard(props) {
  const stats = createMemo(() => ({ total: props.watchlist().length, completed: props.watchlist().filter(m => m.status === 'Completed').length, watching: props.watchlist().filter(m => m.status === 'Watching').length, planned: props.watchlist().filter(m => m.status === 'Planned').length }));
  return (
    <div class="animate-fade-in">
      <div onClick={() => { const p = props.watchlist().filter(m => m.status === 'Planned'); if(p.length) props.openMovie(p[Math.floor(Math.random()*p.length)].id); }} class="bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] p-8 rounded-[2rem] mb-6 flex justify-between items-center shadow-2xl cursor-pointer text-[#0c0e14] active:scale-95 transition-transform overflow-hidden relative">
        <div class="relative z-10"><h2 class="text-2xl font-black font-headline">What to Watch?</h2><p class="text-[8px] font-black uppercase tracking-widest opacity-80">Let the vault decide</p></div>
        <Icon name="casino" fill class="text-5xl opacity-20 absolute -right-4 -bottom-4" />
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="glass-surface p-5 rounded-[2rem] min-h-[100px] flex flex-col justify-end col-span-2">
          <p class="text-[8px] text-gray-500 uppercase font-black tracking-widest">Vault Total</p>
          <h3 class="text-3xl font-headline font-black">{stats().total} Titles</h3>
        </div>
        <div class="glass-surface p-4 rounded-3xl text-center"><h3 class="text-xl font-black text-[var(--primary)]">{stats().watching}</h3><p class="text-[7px] text-gray-500 uppercase font-bold tracking-widest">Watching</p></div>
        <div class="glass-surface p-4 rounded-3xl text-center"><h3 class="text-xl font-black text-[var(--secondary)]">{stats().completed}</h3><p class="text-[7px] text-gray-500 uppercase font-bold tracking-widest">Finished</p></div>
      </div>
      
      <div class="flex justify-between items-end mb-4 px-1"><h3 class="text-lg font-black font-headline">Recent additions</h3><button onClick={()=>{props.setActiveVaultStatus('all'); props.setView('watchlist');}} class="text-[var(--primary)] text-[9px] font-black uppercase tracking-widest">View All</button></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4"><For each={props.watchlist().slice(0, 6)}>{(m) => <MovieCard movie={m} onClick={() => props.openMovie(m.id)} />}</For></div>
    </div>
  );
}

// 7. VAULT (Clear Filter & Tag Filter Fix)
function Vault(props) {
  const [search, setSearch] = createSignal('');
  const [filters, setFilters] = createSignal({ type: 'all', status: props.activeStatus || 'all', tag: 'all', sort: 'recent' });
  const [showFilter, setShowFilter] = createSignal(false);

  createEffect(() => setFilters(f => ({...f, status: props.activeStatus || 'all'})));

  const uniqueTags = createMemo(() => [...new Set(props.watchlist().map(m => m.tag).filter(Boolean))].sort());

  const filtered = createMemo(() => {
    let f = props.watchlist();
    if(search()) f = f.filter(m => (m.title||m.name||'').toLowerCase().includes(search().toLowerCase()));
    if(filters().status !== 'all') f = f.filter(m => m.status === filters().status);
    if(filters().tag !== 'all') f = f.filter(m => m.tag === filters().tag);
    return f.sort((a,b) => (b.addedAt?.seconds||0) - (a.addedAt?.seconds||0));
  });

  return (
    <div class="animate-fade-in pb-10">
      <div class="sticky top-0 z-40 bg-[#08090b]/80 backdrop-blur-2xl pt-4 pb-6 -mx-6 px-6 border-b border-white/5 mb-6">
        <div class="flex justify-between items-center mb-5"><h2 class="text-3xl font-headline font-black">Vault</h2><button onClick={() => setShowFilter(true)} class="glass-surface px-4 py-2.5 rounded-full text-[10px] font-black flex gap-2 border border-white/10 shadow-lg"><Icon name="tune" class="text-sm"/> Filter</button></div>
        <div class="flex items-center gap-3 glass-surface rounded-2xl px-5 py-3.5 relative border border-white/10 shadow-xl focus-within:border-[var(--primary)]/50 transition-colors">
            <Icon name="search" class="text-gray-500" />
            <input value={search()} onInput={e => setSearch(e.target.value)} placeholder="Search your universe..." class="bg-transparent border-none w-full outline-none text-white text-sm" />
            <Show when={search().length > 0 || filters().status !== 'all' || filters().tag !== 'all'}>
                <button onClick={() => { setSearch(''); setFilters({ type:'all', status:'all', tag:'all', sort:'recent'}); props.onFilterChange('all'); }} class="text-[8px] bg-red-500 text-black px-2 py-1 rounded-full font-black uppercase tracking-widest shrink-0">Clear</button>
            </Show>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4"><For each={filtered()}>{(m) => <MovieCard movie={m} onClick={() => props.openMovie(m.id)} />}</For></div>
      <Show when={showFilter()}><FilterModal filters={filters()} setFilters={setFilters} uniqueTags={uniqueTags()} onClose={() => setShowFilter(false)} onFilterChange={props.onFilterChange} /></Show>
    </div>
  );
}

function FilterModal(props) {
  const FilterSel = (p) => <div class="grid grid-cols-[100px_1fr] items-center"><span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{p.label}</span><select value={p.val} onChange={e => p.set(e.target.value)} class="glass-surface p-2 rounded-lg text-xs outline-none border border-white/5"><For each={p.opts}>{(o)=><option value={o.v||o}>{o.l||o}</option>}</For></select></div>;
  return (
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-[999999] animate-fade-in" onClick={props.onClose}>
      <div class="glass-surface w-full max-w-sm rounded-t-[2rem] p-6 pb-32 animate-pop-in" onClick={e=>e.stopPropagation()}>
        <div class="flex justify-between items-center border-b border-white/5 pb-4 mb-6"><h3 class="font-black text-xl flex items-center gap-2"><Icon name="tune" class="text-[var(--primary)]"/> Filters</h3><button onClick={props.onClose} class="bg-white/10 p-2 rounded-full"><Icon name="close"/></button></div>
        <div class="space-y-4">
          <FilterSel label="Status" val={props.filters.status} set={(v)=>{props.setFilters({...props.filters, status:v}); props.onFilterChange(v);}} opts={[{l:'All',v:'all'},{l:'Planned',v:'Planned'},{l:'Watching',v:'Watching'},{l:'Completed',v:'Completed'}]} />
          <FilterSel label="Tags" val={props.filters.tag} set={(v)=>props.setFilters({...props.filters, tag:v})} opts={[{l:'All Tags', v:'all'}, ...props.uniqueTags.map(t=>({l:t, v:t}))]} />
        </div>
        <button onClick={props.onClose} class="w-full mt-8 bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest">Apply</button>
      </div>
    </div>
  );
}

// 8. FRANCHISES (Folder Background & Sorting Fix)
function FranchisesView(props) {
  const [currentFolder, setCurrentFolder] = createSignal(null);
  const [sortMode, setSortMode] = createSignal('order');
  const [showAddModal, setShowAddModal] = createSignal(false);

  const subFolders = createMemo(() => props.franchises().filter(f => f.parentId === currentFolder()));
  const currentMovies = createMemo(() => {
    let list = props.watchlist().filter(m => m.franchises && m.franchises[currentFolder()] !== undefined);
    return list.sort((a, b) => sortMode() === 'year' 
      ? (parseInt(String(b.release_date||'').substring(0,4))||0) - (parseInt(String(a.release_date||'').substring(0,4))||0) 
      : a.franchises[currentFolder()] - b.franchises[currentFolder()]);
  });
  
  const createFolder = async () => {
    const n = prompt("Folder Name:");
    if(n && n.trim()) await addDoc(collection(db, 'users', props.uid, 'franchises'), { name: n.trim(), parentId: currentFolder(), createdAt: serverTimestamp() });
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
        <Show when={!currentFolder()} fallback={<button onClick={() => setShowAddModal(true)} class="bg-[var(--primary)] text-black px-4 py-2 rounded-full text-xs font-black">+ Movie</button>}>
          <button onClick={createFolder} class="bg-white/10 px-4 py-2 rounded-full text-xs font-bold">+ Folder</button>
        </Show>
      </div>

      <Show when={currentFolder()}><button onClick={() => setCurrentFolder(null)} class="mb-6 glass-surface px-4 py-1.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1">← Back</button></Show>
      
      <div class="grid grid-cols-1 gap-4 mb-8">
        <For each={subFolders()}>{(f) => {
          const first = () => props.watchlist().find(m => m.franchises?.[f.id] !== undefined);
          return (
            <div onClick={() => setCurrentFolder(f.id)} class="relative rounded-[2rem] cursor-pointer min-h-[140px] flex flex-col justify-end p-6 overflow-hidden border border-white/10 bg-[#171921]">
              <Show when={first()}>
                <img src={`https://image.tmdb.org/t/p/w500${first().backdrop_path}`} class="absolute inset-0 w-full h-full object-cover opacity-40"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </Show>
              <h3 class="font-black font-headline text-2xl text-white relative z-10">{f.name}</h3>
              <p class="text-[9px] text-gray-300 font-bold uppercase tracking-widest relative z-10 opacity-70">Collection • {props.watchlist().filter(m => m.franchises?.[f.id] !== undefined).length} titles</p>
              <button onClick={(e) => { e.stopPropagation(); if(confirm("Delete folder?")) deleteDoc(doc(db, 'users', props.uid, 'franchises', f.id)); }} class="absolute top-4 right-4 z-20 text-gray-500 hover:text-red-500"><Icon name="delete" class="text-sm"/></button>
            </div>
          );
        }}</For>
      </div>

      <Show when={currentFolder()}>
        <div class="flex justify-between items-center mb-4 px-2">
            <h3 class="font-black text-lg">Titles</h3>
            <select value={sortMode()} onChange={e => setSortMode(e.target.value)} class="bg-black border border-white/10 text-[9px] font-bold uppercase rounded-full px-3 py-1 outline-none">
                <option value="order">Custom</option>
                <option value="year">Release Year</option>
            </select>
        </div>
        <div class="space-y-3">
          <For each={currentMovies()}>{(m, i) => (
            <div class="flex items-center gap-3 glass-surface p-3 rounded-[1.5rem] border border-white/5 shadow-lg group">
              <Show when={sortMode() === 'order'}>
                  <div class="flex flex-col items-center justify-center bg-white/5 rounded-xl px-1">
                    <button onClick={() => moveMovie(i(), -1)} class={`text-gray-500 hover:text-white ${i()===0?'opacity-10':''}`}><Icon name="keyboard_arrow_up" class="text-lg"/></button>
                    <button onClick={() => moveMovie(i(), 1)} class={`text-gray-500 hover:text-white ${i()===currentMovies().length-1?'opacity-10':''}`}><Icon name="keyboard_arrow_down" class="text-lg"/></button>
                  </div>
              </Show>
              <div class="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => props.openMovie(m.id)}>
                <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} class="w-10 h-14 rounded-xl object-cover shadow-md shrink-0"/>
                <div class="truncate"><p class="font-bold text-sm text-gray-100 group-hover:text-[var(--primary)] truncate">{m.title || m.name}</p><p class="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">{(m.release_date||'').split('-')[0]}</p></div>
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
    props.showToast("Added to List");
  };
  return (
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[999999]" onClick={props.onClose}>
      <div class="w-full max-w-lg bg-[#08090b] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col max-h-[80vh] animate-pop-in" onClick={e => e.stopPropagation()}>
        <div class="p-5 border-b border-white/5 flex justify-between items-center"><h3 class="font-black text-lg">Add from Vault</h3><button onClick={props.onClose}><Icon name="close"/></button></div>
        <div class="p-4"><input value={search()} onInput={e => setSearch(e.target.value)} placeholder="Search your vault..." class="w-full bg-white/5 p-3 rounded-xl outline-none border border-white/5 focus:border-[var(--primary)] text-sm" /></div>
        <div class="overflow-y-auto hide-scrollbar p-3 space-y-2"><For each={available()}>{(m) => (
          <div class="flex items-center gap-3 glass-surface p-3 rounded-2xl border border-white/5"><img src={`https://image.tmdb.org/t/p/w92${m.poster_path}`} class="w-10 h-14 rounded-xl object-cover"/><div class="flex-1 font-bold text-sm truncate">{m.title || m.name}</div><button onClick={() => add(m)} class="bg-[var(--primary)]/10 text-[var(--primary)] w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"><Icon name="add" /></button></div>
        )}</For></div>
      </div>
    </div>
  );
}

// 9. UPCOMING RADAR (Timeline & Language Fix)
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
    
    Promise.all([
        fetch(mUrl + '&page=1').then(r=>r.json()), fetch(mUrl + '&page=2').then(r=>r.json()),
        fetch(tUrl + '&page=1').then(r=>r.json()), fetch(tUrl + '&page=2').then(r=>r.json())
    ]).then(([m1, m2, t1, t2]) => { 
        let resList = [...(m1.results||[]), ...(m2.results||[])].map(x=>({...x, media_type:'movie', calc_date: x.release_date}));
        let tvList = [...(t1.results||[]), ...(t2.results||[])].map(x=>({...x, media_type:'tv', title:x.name, calc_date: x.first_air_date}));
        
        let combined = [...resList, ...tvList].filter(x => x.calc_date && x.poster_path);
        combined.sort((a,b) => new Date(a.calc_date) - new Date(b.calc_date));
        setMovies(combined); setLoading(false); 
    }).catch(()=>setLoading(false));
  });

  const handleAdd = async (m) => {
    if(props.watchlist().some(item => String(item.id) === String(m.id))) return props.showToast("Already in vault!");
    const detailRes = await fetch(`https://api.themoviedb.org/3/${m.media_type}/${m.id}?api_key=${TMDB_KEY}`);
    const fullData = await detailRes.json();
    await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), {
      id: m.id, title: m.title || m.name, poster_path: m.poster_path, backdrop_path: m.backdrop_path, media_type: m.media_type, status: 'Planned', addedAt: serverTimestamp(),
      release_date: m.calc_date || '', region: activeTab() === 'Indian' ? 'Indian' : 'International', season: 1, episode: 0, totalEps: fullData.number_of_episodes || 0, runtime: fullData.runtime || fullData.episode_run_time?.[0] || 0
    }); props.showToast("Added to Vault"); setPreviewMovie(null);
  };

  return (
    <div class="pb-10 animate-fade-in">
      <h2 class="text-3xl font-headline font-black mb-6">Upcoming</h2>
      <div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4">
        <button onClick={()=>{setActiveTab('Indian'); setLang('all');}} class={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${activeTab()==='Indian'?'bg-[var(--primary)] text-[#0c0e14]':'text-gray-500'}`}>Indian</button>
        <button onClick={()=>{setActiveTab('International'); setLang('all');}} class={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${activeTab()==='International'?'bg-[var(--primary)] text-[#0c0e14]':'text-gray-500'}`}>International</button>
      </div>
      
      {/* Language Filters (Indian Only) */}
      <Show when={activeTab() === 'Indian'}>
        <div class="flex gap-2 overflow-x-auto hide-scrollbar mb-4 py-1">
            <For each={['all', 'hi', 'te', 'ta', 'ml']}>{(l) => (
                <button onClick={()=>setLang(l)} class={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${lang()===l?'bg-[var(--secondary)] text-[#0c0e14]':'bg-white/5 text-gray-500'}`}>{l === 'all' ? 'All' : l.toUpperCase()}</button>
            )}</For>
        </div>
      </Show>

      <div class="flex gap-2 glass-surface p-1.5 rounded-2xl mb-4">
        <button onClick={()=>setMediaType('movie')} class={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${mediaType()==='movie'?'bg-[var(--secondary)] text-[#0c0e14]':'text-gray-400'}`}>Movies</button>
        <button onClick={()=>setMediaType('tv')} class={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${mediaType()==='tv'?'bg-[var(--secondary)] text-[#0c0e14]':'text-gray-400'}`}>Series</button>
      </div>

      <div class="glass-surface p-5 rounded-[2rem] mb-8 flex flex-col gap-3">
        <label class="text-[9px] uppercase font-black text-gray-500 tracking-widest">Select Scan Start</label>
        <input type="date" value={selectedDate()} onInput={e => setSelectedDate(e.target.value)} class="bg-[#08090b] border border-white/10 p-4 rounded-xl outline-none text-white [color-scheme:dark] font-bold" />
      </div>

      <Show when={loading()} fallback={
          <div class="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
            <For each={movies().filter(m => m.media_type === mediaType())}>{(m) => (
              <div onClick={() => setPreviewMovie(m)} class="relative flex items-center gap-6 group cursor-pointer animate-pop-in">
                <div class="w-2.5 h-2.5 rounded-full bg-[var(--primary)] glow-primary relative z-10 shrink-0 ml-[16px]"></div>
                <div class="flex-1 flex gap-4 glass-surface p-3 rounded-[1.5rem] border border-white/5 hover:border-[var(--primary)]/30 transition-all shadow-lg">
                  <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} class="w-16 h-24 rounded-xl object-cover shadow-md bg-[#171921]" />
                  <div class="flex-1 flex flex-col justify-center">
                    <p class="text-[9px] text-[var(--primary)] font-black uppercase mb-1">{new Date(m.calc_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})}</p>
                    <p class="font-bold text-sm text-gray-100 group-hover:text-[var(--primary)] leading-tight">{m.title}</p>
                  </div>
                </div>
              </div>
            )}</For>
          </div>
      }><div class="text-center p-12 text-[var(--primary)] animate-pulse uppercase text-[10px] font-black tracking-widest">Scanning Radar...</div></Show>

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
      <div class="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[999999] animate-fade-in" onClick={props.onClose}>
          <div class="w-full max-w-xl bg-[#0c0e14] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl animate-pop-in" onClick={e=>e.stopPropagation()}>
              <button onClick={props.onClose} class="absolute top-4 right-4 z-[100] bg-black/50 p-2.5 rounded-full"><Icon name="close"/></button>
              <div class="h-48 md:h-64 bg-black relative">
                  <Show when={!playTrailer()} fallback={<iframe class="w-full h-full" src={`https://www.youtube.com/embed/${trailerKey()}?autoplay=1`} frameborder="0" allowfullscreen></iframe>}>
                      <img src={`https://image.tmdb.org/t/p/original${details().backdrop_path}`} class="w-full h-full object-cover opacity-40" />
                      <Show when={trailerKey()}><button onClick={() => setPlayTrailer(true)} class="absolute inset-0 flex items-center justify-center animate-pulse"><div class="w-16 h-16 bg-[var(--primary)]/30 backdrop-blur-md rounded-full flex items-center justify-center border border-[var(--primary)]/50"><Icon name="play_arrow" fill class="text-white text-4xl"/></div></button></Show>
                  </Show>
              </div>
              <div class="p-6">
                  <h2 class="text-3xl font-black mb-2 leading-tight">{details().title || details().name}</h2>
                  <p class="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-4">{details().release_date || details().first_air_date} • {props.movie.media_type.toUpperCase()}</p>
                  <p class="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-4">{details().overview}</p>
                  <button onClick={props.onAdd} class="w-full bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-xs uppercase tracking-widest active:scale-95 shadow-lg shadow-[var(--primary)]/20">Add to Vault</button>
              </div>
          </div>
      </div>
  );
}

// 10. DETAILS MODAL (Space Fix, Ratings, Tags, Servers, Cast & Crew)
function DetailsModal(props) {
  const movie = createMemo(() => props.watchlist.find(m => String(m.id) === String(props.id)));
  const [details, setDetails] = createSignal({});
  const [isEdit, setIsEdit] = createSignal(false); 
  const [trailerKey, setTrailerKey] = createSignal(null); 
  const [playTrailer, setPlayTrailer] = createSignal(false);
  const [showPlayer, setShowPlayer] = createSignal(false); 
  const [activeServer, setActiveServer] = createSignal('VidLink');
  
  const [omdbData, setOmdbData] = createSignal({ imdb: '-', rt: '-' });
  const [form, setForm] = createSignal({ status: '', rating: '', watchDate: '', notes: '', region: '', season: 1, episode: 1, tag: '' });
  
  onMount(() => { document.body.style.overflow = 'hidden'; }); onCleanup(() => { document.body.style.overflow = ''; });

  createEffect(() => { 
      if(movie()) { 
          setForm({ status: movie().status||'Planned', rating: movie().rating||'', watchDate: movie().watchDate||'', notes: movie().notes||'', region: movie().region||'International', season: movie().season||1, episode: movie().episode||1, tag: movie().tag||'' }); 
          
          // TMDB & Credits Fetch
          fetch(`https://api.themoviedb.org/3/${movie().media_type||'movie'}/${movie().id}?api_key=${TMDB_KEY}&append_to_response=videos,credits`).then(r=>r.json()).then(d=>{ 
              setDetails(d);
              const v = d?.videos?.results; if(v){ let t = v.find(x=>x.site==='YouTube'&&x.type==='Trailer')||v.find(x=>x.site==='YouTube'&&x.type==='Teaser')||v.find(x=>x.site==='YouTube'); if(t) setTrailerKey(t.key); } 
          });

          // OMDb Ratings Fetch
          const title = movie().title || movie().name;
          fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_KEY}`).then(r=>r.json()).then(d=>{
              if(d.Response === 'True') {
                  const rt = d.Ratings?.find(r=>r.Source === 'Rotten Tomatoes')?.Value || '-';
                  setOmdbData({ imdb: d.imdbRating || '-', rt: rt });
                  // Sync ratings back to Firestore if missing
                  updateDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)), { imdbRating: d.imdbRating || '-', rtRating: rt.replace('%','') });
              }
          });
      } 
  });

  const saveChanges = async () => { await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)), { status: form().status, rating: parseFloat(form().rating)||0, watchDate: form().watchDate, notes: form().notes, region: form().region, season: parseInt(form().season)||1, episode: parseInt(form().episode)||1, tag: form().tag }); props.showToast("Saved"); setIsEdit(false); };
  const progressPct = createMemo(() => movie()?.status === 'Completed' ? 100 : Math.min(((movie()?.episode||0) / (movie()?.totalEps||1)) * 100, 100));
  const getStreamUrl = (server) => { const id = movie().id; const s = movie().season || 1; const e = movie().episode || 1; if (server === 'VidLink') { return movie().media_type === 'tv' ? `https://vidlink.pro/tv/${id}/${s}/${e}?primaryColor=b1a1ff` : `https://vidlink.pro/movie/${id}?primaryColor=b1a1ff`; } return movie().media_type === 'tv' ? `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.me/embed/movie?tmdb=${id}`; };

  return (
    <div class="fixed inset-0 z-[999999] flex items-end sm:items-center justify-center animate-fade-in" onClick={props.onClose}>
      <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
      <Show when={movie()}>
        <div class="w-full max-w-xl bg-[#08090b] rounded-t-[2.5rem] overflow-hidden border border-white/10 relative max-h-[95vh] shadow-2xl animate-pop-in flex flex-col" onClick={e=>e.stopPropagation()}>
          
          <button onClick={props.onClose} class="absolute top-4 right-4 z-[100] bg-black/50 p-2.5 rounded-full"><Icon name="close"/></button>
          
          <div class="overflow-y-auto hide-scrollbar pt-0">
              {/* Cover Image & Trailer Button */}
              <div class="h-60 relative bg-black shrink-0">
                <Show when={!playTrailer()} fallback={<iframe class="w-full h-full" src={`https://www.youtube.com/embed/${trailerKey()}?autoplay=1`} frameborder="0" allowfullscreen></iframe>}>
                  <img src={`https://image.tmdb.org/t/p/original${movie().backdrop_path}`} class="w-full h-full object-cover opacity-60" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#08090b] to-transparent"></div>
                  <Show when={trailerKey()}><button onClick={() => setPlayTrailer(true)} class="absolute inset-0 flex items-center justify-center group"><div class="w-16 h-16 bg-[var(--primary)]/30 backdrop-blur-md rounded-full flex items-center justify-center border border-[var(--primary)]/50 group-hover:scale-110 transition-transform"><Icon name="play_arrow" fill class="text-white text-4xl"/></div></button></Show>
                </Show>
              </div>

              <div class="px-6 pb-28 -mt-10 relative z-10">
                {/* Header Info */}
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h2 class="text-3xl font-black drop-shadow-md leading-tight">{movie().title || movie().name}</h2>
                        <p class="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-1">
                            {movie().release_date || details().release_date} • {movie().media_type.toUpperCase()} • {formatRuntime(details().runtime || details().episode_run_time?.[0])}
                        </p>
                    </div>
                    <button onClick={()=>setIsEdit(!isEdit())} class={`p-3 rounded-full border transition-all ${isEdit() ? 'bg-[var(--primary)] text-black border-[var(--primary)]' : 'glass-surface text-gray-400'}`}><Icon name={isEdit()?'check':'edit'}/></button>
                </div>
                
                {/* Triple Ratings Row (Prominent Top) */}
                <div class="flex gap-2 my-5">
                    <div class="rating-pill text-[#f5c518]"><Icon name="star" fill class="text-xs"/> {omdbData().imdb} <span class="text-[7px] opacity-40">IMDB</span></div>
                    <div class="rating-pill text-red-500">🍅 {omdbData().rt} <span class="text-[7px] opacity-40">RT</span></div>
                    <div class="rating-pill text-[var(--primary)]"><Icon name="person" fill class="text-xs"/> {movie().rating}/10 <span class="text-[7px] opacity-40">SAGE</span></div>
                </div>

                <Show when={isEdit()} fallback={
                  <div class="animate-fade-in">
                    {/* Watch Servers */}
                    <div class="flex gap-2 mb-6">
                        <button onClick={() => { setShowPlayer(true); setActiveServer('VidLink'); }} class="flex-1 bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 shadow-lg flex items-center justify-center gap-2"><Icon name="play_circle" fill/> VidLink</button>
                        <button onClick={() => { setShowPlayer(true); setActiveServer('Vidsrc'); }} class="flex-1 bg-[#10b981] text-[#0c0e14] font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 shadow-lg flex items-center justify-center gap-2"><Icon name="backup" fill/> Vidsrc</button>
                    </div>

                    <p class="text-gray-400 text-sm mb-8 leading-relaxed italic line-clamp-3">"{details().overview || 'No overview available'}"</p>
                    
                    {/* Progress Bar for TV */}
                    <Show when={movie().media_type === 'tv'}>
                        <div class="glass-surface p-5 rounded-2xl border border-white/5 mb-6">
                            <div class="flex justify-between items-center mb-3">
                                <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Progress: S{movie().season} E{movie().episode}</span>
                                <button onClick={async () => { let n = (parseInt(movie().episode)||0)+1; await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id)), {episode: n}); }} class="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-lg text-[10px] font-black border border-[var(--primary)]/20">+1 EP</button>
                            </div>
                            <div class="w-full h-1.5 bg-black rounded-full overflow-hidden"><div class="h-full bg-[var(--primary)] glow-primary transition-all" style={{width: `${progressPct()}%`}}></div></div>
                        </div>
                    </Show>

                    {/* Cast & Crew (BookMyShow Style) */}
                    <Show when={details().credits}>
                        <div class="mb-8">
                            <h3 class="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Cast & Crew</h3>
                            <div class="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
                                <For each={details().credits.cast.slice(0, 8)}>{(c) => (
                                    <div class="flex flex-col items-center min-w-[70px] shrink-0">
                                        <img src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`} class="w-14 h-14 rounded-full object-cover border border-white/10 mb-2 shadow-lg" />
                                        <p class="text-[9px] font-black text-center text-white truncate w-full">{c.name}</p>
                                        <p class="text-[7px] text-gray-500 text-center uppercase truncate w-full font-bold">Actor</p>
                                    </div>
                                )}</For>
                                <For each={details().credits.crew.filter(x=>x.job==='Director').slice(0,2)}>{(c) => (
                                    <div class="flex flex-col items-center min-w-[70px] shrink-0">
                                        <img src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`} class="w-14 h-14 rounded-full object-cover border border-[var(--secondary)] mb-2 shadow-lg" />
                                        <p class="text-[9px] font-black text-center text-white truncate w-full">{c.name}</p>
                                        <p class="text-[7px] text-[var(--secondary)] text-center uppercase font-black">Director</p>
                                    </div>
                                )}</For>
                            </div>
                        </div>
                    </Show>

                    {/* Info Rows */}
                    <div class="glass-surface p-5 rounded-2xl space-y-4 border border-white/5">
                        <SafeInfoRow icon="adjust" label="Status" value={movie().status} />
                        <SafeInfoRow icon="public" label="Region" value={movie().region} />
                        <SafeInfoRow icon="format_list_bulleted" label="Genre" value={getSafeGenres(movie()).slice(0,2).join(', ')} />
                        <Show when={movie().tag}><SafeInfoRow icon="label" label="Tag" value={<span class="tag-chip">{movie().tag}</span>} /></Show>
                        <Show when={movie().notes}><div class="border-t border-white/5 pt-3 mt-3"><p class="text-[8px] uppercase font-black text-gray-500 tracking-widest mb-1">Notes</p><p class="text-xs text-gray-300 italic">"{movie().notes}"</p></div></Show>
                    </div>

                    <button onClick={async () => { if(confirm("Delete permanently?")) { await deleteDoc(doc(db, 'users', props.uid, 'watchlist', String(movie().id))); props.onClose(); } }} class="mt-8 text-red-500/40 hover:text-red-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1 mx-auto"><Icon name="delete" class="text-sm"/> Remove from Universe</button>
                  </div>
                }>
                  {/* Edit Form */}
                  <div class="glass-surface p-6 rounded-2xl space-y-4 animate-fade-in mt-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block">Status</label><select value={form().status} onChange={e=>setForm({...form(), status: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-xl text-sm outline-none"><option value="Planned">Planned</option><option value="Watching">Watching</option><option value="Completed">Completed</option></select></div>
                        <div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block">Tag</label><input placeholder="e.g. Theatre" value={form().tag} onInput={e=>setForm({...form(), tag: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-xl text-sm outline-none"/></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block">Rating</label><input type="number" step="0.1" value={form().rating} onChange={e=>setForm({...form(), rating: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-xl text-sm outline-none"/></div>
                        <div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block">Region</label><select value={form().region} onChange={e=>setForm({...form(), region: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-xl text-sm outline-none"><option>International</option><option>Indian</option></select></div>
                    </div>
                    <div><label class="text-[9px] uppercase font-black text-gray-500 mb-1 block">Notes</label><textarea value={form().notes} onInput={e=>setForm({...form(), notes: e.target.value})} class="w-full bg-[#0c0e14] border border-white/10 p-2 rounded-xl text-sm outline-none" rows="2"></textarea></div>
                    <button onClick={saveChanges} class="w-full bg-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest shadow-lg">Save Universe Changes</button>
                  </div>
                </Show>
              </div>
          </div>
        </div>
      </Show>

      {/* Fullscreen Video Player */}
      <Show when={showPlayer()}>
        <div class="fixed inset-0 bg-black z-[10000000] flex flex-col animate-fade-in">
          <div class="p-4 flex justify-between items-center bg-[#0c0e14] border-b border-white/5">
            <button onClick={() => setShowPlayer(false)} class="p-2 bg-white/5 rounded-full"><Icon name="arrow_back"/></button>
            <div class="flex gap-2">
                <button onClick={()=>setActiveServer('VidLink')} class={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase ${activeServer()==='VidLink'?'bg-[var(--primary)] text-black':'bg-white/5'}`}>VidLink</button>
                <button onClick={()=>setActiveServer('Vidsrc')} class={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase ${activeServer()==='Vidsrc'?'bg-[var(--primary)] text-black':'bg-white/5'}`}>Vidsrc</button>
            </div>
          </div>
          <iframe src={getStreamUrl(activeServer())} class="flex-1 w-full border-none" allowfullscreen ></iframe>
        </div>
      </Show>
    </div>
  );
}

// 11. INSIGHTS MODAL (Infinity Ring & Wrapped)
function InsightsModal(props) {
  const [showWrapped, setShowWrapped] = createSignal(false);
  const stats = createMemo(() => {
    let mins = 0; const genres = {}; const comp = props.watchlist().filter(m => m.status === 'Completed');
    comp.forEach(m => { mins += (parseInt(m.runtime)||0) * (m.media_type==='tv' ? (parseInt(m.episode)||1) : 1); getSafeGenres(m).forEach(g => genres[g]=(genres[g]||0)+1); });
    const topG = Object.entries(genres).sort((a,b)=>b[1]-a[1]).slice(0,5);
    return { days: Math.floor(mins/1440), hours: Math.floor((mins%1440)/60), total: comp.length, topG, maxG: topG[0]?.[1]||1, topGenre: topG[0]?.[0] || 'N/A' };
  });

  return (
    <div class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-[999999] animate-fade-in" onClick={props.onClose}>
      <div class="w-full max-w-lg bg-[#08090b] rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden animate-pop-in" onClick={e=>e.stopPropagation()}>
        <div class="flex justify-between items-center mb-8"><h2 class="text-3xl font-headline font-black">Insights</h2><button onClick={props.onClose}><Icon name="close"/></button></div>
        
        {/* Infinity Ring UI */}
        <div class="flex justify-center mb-10 relative">
            <svg class="w-48 h-48 -rotate-90">
                <circle cx="96" cy="96" r="88" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12" />
                <circle cx="96" cy="96" r="88" fill="none" stroke="var(--primary)" stroke-width="12" stroke-dasharray="552" stroke-dashoffset="150" stroke-linecap="round" class="glow-primary" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-5xl font-black font-headline text-white">{stats().days}<span class="text-sm opacity-40">d</span></span>
                <span class="text-xl font-bold text-[var(--secondary)]">{stats().hours}<span class="text-[10px] opacity-40 uppercase">hrs</span></span>
            </div>
        </div>

        <button onClick={() => setShowWrapped(true)} class="w-full bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest mb-8 active:scale-95 transition-transform">Open Wrapped</button>
        
        <div class="glass-surface rounded-[1.5rem] p-6 border border-white/5">
            <h3 class="font-bold mb-5 flex items-center gap-2"><Icon name="pie_chart" class="text-[var(--primary)]"/> Favorite Vibes</h3>
            <div class="space-y-4">
                <For each={stats().topG}>{([g, c]) => (
                    <div>
                        <div class="flex justify-between text-[10px] font-black uppercase mb-1.5 text-gray-400"><span>{g}</span><span>{c} titles</span></div>
                        <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div style={{width: `${(c/stats().maxG)*100}%`}} class="h-full bg-[var(--primary)] glow-primary"></div></div>
                    </div>
                )}</For>
            </div>
        </div>
      </div>
      
      {/* Wrapped UI */}
      <Show when={showWrapped()}>
        <div class="fixed inset-0 bg-black/98 flex items-center justify-center p-4 z-[9999999] animate-pop-in" onClick={() => setShowWrapped(false)}>
          <div class="bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[#0c0e14] w-full max-w-sm h-[500px] rounded-[3rem] p-10 text-center flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div>
                <h4 class="text-white/60 font-black uppercase text-[9px] mb-4 tracking-widest">Cinelog Wrapped 2026</h4>
                <h2 class="text-4xl font-black font-headline text-white mb-8 leading-tight">I spent <br/><span class="text-[#0c0e14] bg-white px-3 py-1 mt-2 inline-block rounded-lg">{stats().days} Days</span><br/> in another world.</h2>
                <div class="bg-black/30 backdrop-blur-md p-6 rounded-3xl text-left space-y-4">
                    <div><p class="text-[8px] font-black uppercase text-white/50">Masterpieces Finished</p><p class="text-2xl font-black text-white">{stats().total} Titles</p></div>
                    <div><p class="text-[8px] font-black uppercase text-white/50">Primary Mood</p><p class="text-2xl font-black text-[var(--secondary)]">{stats().topGenre}</p></div>
                </div>
            </div>
            <button onClick={() => setShowWrapped(false)} class="text-white bg-black/20 p-4 rounded-full mx-auto"><Icon name="close"/></button>
          </div>
        </div>
      </Show>
    </div>
  );
}

// 12. DATA SYNC
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
      try { const data = JSON.parse(await file.text()); for(let m of data) { await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { ...m, addedAt: serverTimestamp() }); setImportLogs(prev => [...prev, { title: m.title || m.name, msg: 'Imported' }]); } } catch(e) { alert("Invalid JSON"); }
  };
  return (
    <div class="animate-fade-in pb-10">
      <h2 class="text-3xl font-headline font-black mb-8">Data Sync</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="glass-surface rounded-3xl p-8 text-center border border-white/5"><Icon name="upload_file" class="text-5xl text-[var(--primary)] mb-4" /><h3 class="font-bold mb-4">Import Backup</h3><input type="file" id="jsonInput" accept=".json" class="hidden" onChange={handleJSONUpload} /><button onClick={() => document.getElementById('jsonInput').click()} class="w-full bg-white/5 py-3 rounded-xl text-[10px] font-black uppercase">Upload JSON</button></div>
        <div class="glass-surface rounded-3xl p-8 text-center border border-white/5"><Icon name="download" class="text-5xl text-[var(--secondary)] mb-4" /><h3 class="font-bold mb-4">Export Vault</h3><div class="flex gap-4"><button onClick={() => exportData('csv')} class="flex-1 bg-white/5 py-3 rounded-xl text-[10px] font-black uppercase">CSV</button><button onClick={() => exportData('json')} class="flex-1 bg-[var(--secondary)] text-[#0c0e14] py-3 rounded-xl text-[10px] font-black uppercase">JSON</button></div></div>
      </div>
    </div>
  );
}

// 13. SEARCH MODAL
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
    }); props.showToast("Added to Vault"); props.onClose();
  };
  return (
    <div class="fixed inset-0 bg-black/70 backdrop-blur-md p-4 pt-20 z-[999999] flex justify-center items-start animate-fade-in" onClick={props.onClose}>
      <div class="w-full max-w-2xl glass-surface rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[75vh] border border-white/10 animate-pop-in" onClick={e=>e.stopPropagation()}>
        <div class="p-6 flex gap-4 items-center bg-[#08090b]"><Icon name="search" class="text-[var(--primary)] text-2xl"/><input autofocus value={q()} onInput={e=>setQ(e.target.value)} placeholder="Search everything..." class="bg-transparent border-none w-full outline-none text-white text-xl font-medium"/><button onClick={props.onClose}><Icon name="close"/></button></div>
        <div class="overflow-y-auto p-4 hide-scrollbar">
            <Show when={searching()}><div class="text-center p-12 text-[var(--primary)] animate-pulse uppercase text-[10px] font-black">Scanning database...</div></Show>
            <div class="space-y-3">
                <For each={results()}>{(r) => (
                    <div onClick={() => addMedia(r)} class="flex gap-4 p-3 glass-surface rounded-3xl border border-transparent hover:border-[var(--primary)]/30 cursor-pointer group transition-all">
                        <img src={`https://image.tmdb.org/t/p/w200${r.poster_path}`} class="w-14 h-20 rounded-2xl object-cover shadow-md bg-[#171921]" />
                        <div class="flex-1 self-center"><p class="font-black text-base text-gray-100 group-hover:text-[var(--primary)] leading-tight">{r.title || r.name}</p><p class="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-1">{r.media_type} • {(r.release_date || '').split('-')[0]}</p></div>
                        <button class="self-center bg-[var(--primary)]/10 text-[var(--primary)] w-10 h-10 rounded-full flex items-center justify-center shadow-lg"><Icon name="add" /></button>
                    </div>
                )}</For>
            </div>
        </div>
      </div>
    </div>
  );
}
