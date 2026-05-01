import { createSignal, createEffect, onMount, ErrorBoundary, Show } from 'solid-js';
import { collection, onSnapshot, query, orderBy, writeBatch, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

import { db, auth } from './firebase';
import { Icon } from './utils';

// Components
import { LoadingScreen } from './components/LoadingScreen';
import { NeuralUI } from './NeuralUI';

// Views
import { Dashboard } from './views/Dashboard';
import { Vault } from './views/Vault';
import { FranchisesView } from './views/FranchisesView';
import { UpcomingView } from './views/UpcomingView';
import { DataSync } from './views/DataSync';

// Modals
import { DetailsModal } from './modals/DetailsModal';
import { SearchModal } from './modals/SearchModal';
import { InsightsModal, SettingsModal } from './modals/Modals';

export default function App() {
  const [user, setUser] = createSignal(null);
  const [watchlist, setWatchlist] = createSignal([]);
  const [franchises, setFranchises] = createSignal([]);
  const [view, setView] = createSignal('dashboard');
  const [theme, setTheme] = createSignal(localStorage.getItem('cinelog_theme') || 'sage');
  const [loading, setLoading] = createSignal(true);
  const [splashWait, setSplashWait] = createSignal(true); 
  const [activeVaultStatus, setActiveVaultStatus] = createSignal('all');
  
  const [searchModal, setSearchModal] = createSignal(false);
  const [detailsId, setDetailsId] = createSignal(null);
  const [previewSource, setPreviewSource] = createSignal(null); 
  const [settingsModal, setSettingsModal] = createSignal(false);
  const [statsModal, setStatsModal] = createSignal(false);
  const [userMenuOpen, setUserMenuOpen] = createSignal(false);
  const [toast, setToast] = createSignal({ show: false, msg: '' });

  const showToast = (msg) => { setToast({ show: true, msg }); setTimeout(() => setToast({ show: false, msg: '' }), 3000); };
  
  createEffect(() => { document.body.className = `theme-${theme()}`; localStorage.setItem('cinelog_theme', theme()); });
  createEffect(() => { view(); window.scrollTo(0, 0); });

  onMount(() => {
    setTimeout(() => setSplashWait(false), 3000);

    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        let wReady = false; let fReady = false;
        onSnapshot(query(collection(db, 'users', u.uid, 'watchlist'), orderBy('addedAt', 'desc')), (snap) => { 
            setWatchlist(snap.docs.map(d => ({ id: d.id, ...d.data() }))); wReady = true; if(fReady) setLoading(false);
        });
        onSnapshot(collection(db, 'users', u.uid, 'franchises'), (snap) => { 
            setFranchises(snap.docs.map(d => ({ id: d.id, ...d.data() }))); fReady = true; if(wReady) setLoading(false);
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
      <Show when={!loading() && !splashWait()} fallback={<LoadingScreen />}>
        <Show when={user()} fallback={
          <div class="h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 class="text-5xl font-black font-headline text-[var(--primary)] mb-4 tracking-tighter">CINELOG</h1>
            <p class="text-gray-400 mb-10 text-sm">Ultimate Edition</p>
            <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} class="bg-[var(--primary)] text-black font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">Sign In with Google</button>
          </div>
        }>
          <NeuralUI 
            user={user} 
            watchlist={watchlist} 
            view={view} 
            setView={setView} 
            openMovie={setDetailsId}
            onUserClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen()); }}
            onSettingsClick={() => setSettingsModal(true)}
            onStatsClick={() => setStatsModal(true)}
            onSearchClick={() => setSearchModal(true)}
          >
            <Show when={view() === 'watchlist'}><Vault watchlist={watchlist} openMovie={setDetailsId} activeStatus={activeVaultStatus()} onFilterChange={setActiveVaultStatus} /></Show>
            <Show when={view() === 'franchises'}><FranchisesView watchlist={watchlist} franchises={franchises} uid={user().uid} openMovie={setDetailsId} showToast={showToast} /></Show>
            <Show when={view() === 'upcoming'}><UpcomingView watchlist={watchlist} uid={user().uid} showToast={showToast} /></Show>
            <Show when={view() === 'sync'}><DataSync watchlist={watchlist} uid={user().uid} showToast={showToast} /></Show>
          </NeuralUI>

          <Show when={userMenuOpen()}>
            <div class="fixed inset-0 z-[90]" onClick={() => setUserMenuOpen(false)}></div>
            <div class="fixed top-16 right-6 w-48 glass-surface rounded-2xl shadow-2xl py-2 z-[100] animate-pop-in border border-white/10 overflow-hidden">
              <button onClick={() => { setStatsModal(true); setUserMenuOpen(false); }} class="w-full text-left px-5 py-3 text-sm font-bold text-[var(--primary)] hover:bg-white/5 flex items-center gap-3"><Icon name="bar_chart" class="text-[18px]"/> Insights</button>
              <div class="border-t border-white/5 my-1"></div>
              <button onClick={() => { setView('sync'); setUserMenuOpen(false); }} class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"><Icon name="import_export" class="text-[18px]"/> Data Sync</button>
              <button onClick={() => signOut(auth)} class="w-full text-left px-5 py-3 text-sm font-bold text-gray-300 hover:bg-white/5 flex items-center gap-3"><Icon name="logout" class="text-[18px]"/> Logout</button>
              <div class="border-t border-white/5 my-1"></div>
              <button onClick={nukeCollection} class="w-full text-left px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-3"><Icon name="delete_forever" class="text-[18px]"/> Nuke Vault</button>
            </div>
          </Show>

          <Show when={searchModal()}>
            <SearchModal
              onClose={() => setSearchModal(false)}
              uid={user().uid}
              showToast={showToast}
              watchlist={watchlist()}
              openPreview={(item, source) => {
                if (source !== 'fromPerson') setSearchModal(false);
                setPreviewSource(source || 'search');
                setDetailsId(`PREVIEW_${JSON.stringify(item)}`);
              }}
            />
          </Show>
          <Show when={detailsId()}>
            <DetailsModal
              id={detailsId()}
              watchlist={watchlist()}
              franchises={franchises()}
              onClose={() => {
                const src = previewSource();
                setDetailsId(null);
                setPreviewSource(null);
                if (src === 'fromPerson') setSearchModal(true);
              }}
              uid={user().uid}
              showToast={showToast}
              theme={theme}
            />
          </Show>
          <Show when={statsModal()}><InsightsModal watchlist={watchlist} onClose={() => setStatsModal(false)} /></Show>
          <Show when={settingsModal()}><SettingsModal currentTheme={theme()} setTheme={setTheme} onClose={() => setSettingsModal(false)} /></Show>
          
          <Show when={toast().show}>
            <div class="fixed bottom-28 left-1/2 -translate-x-1/2 glass-surface border border-[var(--primary)] text-white px-6 py-3 rounded-full shadow-2xl z-[999999] flex gap-2 items-center text-sm font-bold whitespace-nowrap animate-pop-in"><Icon name="check_circle" class="text-[var(--primary)]" fill /> {toast().msg}</div>
          </Show>
        </Show>
      </Show>
    </ErrorBoundary>
  );
}
