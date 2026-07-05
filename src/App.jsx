import { createSignal, createEffect, onMount, onCleanup, ErrorBoundary, Show } from 'solid-js';
import { collection, onSnapshot, query, orderBy, writeBatch, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import { Icon } from './utils';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './views/Dashboard';
import { Vault } from './views/Vault';
import { FranchisesView } from './views/FranchisesView';
import { UpcomingView } from './views/UpcomingView';
import { DataSync } from './views/DataSync';
import { Analytics } from './views/Analytics';
import { SettingsView } from './views/SettingsView';
import { DetailsModal } from './modals/DetailsModal';
import { SearchModal } from './modals/SearchModal';
import { ServerSettingsModal } from './modals/ServerSettingsModal';
import { SettingsModal } from './modals/Modals';
import { useModalState } from './hooks/useModalState';
import { useMicrointeractions } from './hooks/useMicrointeractions';

/* ── Bottom nav + sidebar nav button ── */
const NavBtn = (props) => (
  <button
    onClick={props.onClick}
    class="flex flex-col lg:flex-row items-center lg:justify-start justify-center gap-1 lg:gap-4 flex-1 lg:flex-none h-full lg:h-auto relative lg:w-full lg:px-4 lg:py-3 lg:rounded-xl lg:hover:bg-white/5 transition-all"
    style={props.active ? 'color: var(--p)' : 'color: #555'}
    aria-label={props.label}
    aria-current={props.active ? 'page' : undefined}
  >
    {props.active && (
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-b-full lg:hidden"
        style="background: var(--p)"
        aria-hidden="true"
      />
    )}
    <Icon name={props.icon} fill={props.active} aria-hidden="true" />
    <span class="text-[10px] lg:text-[10px] font-medium lg:font-bold lg:uppercase lg:tracking-[0.2em]" aria-hidden="true">
      {props.label}
    </span>
  </button>
);

/* ── Guest prompt shown when a signed-in feature is accessed ── */
const GuestPrompt = (props) => (
  <div class="h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-pop-in" role="region" aria-label="Sign in required">
    <div
      class="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 mx-auto"
      style="background: var(--raised); border: 1px solid var(--border-active); box-shadow: 0 0 40px var(--p-glow)"
      aria-hidden="true"
    >
      <Icon name="lock" fill class="text-5xl" style="color: var(--p)" />
    </div>
    <h2 class="font-headline text-5xl text-white mb-2">Sign In Required</h2>
    <p class="text-sm text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
      Create an account or sign in to build custom lists, track progress, and back up your vault.
    </p>
    <button
      onClick={props.onLogin}
      class="font-bold py-4 px-10 rounded-full shadow-lg text-sm text-black uppercase tracking-widest active:scale-95 transition-all"
      style="background: var(--p); box-shadow: 0 0 30px var(--p-glow)"
    >
      Sign In with Google
    </button>
  </div>
);

export default function App() {
  const [user, setUser] = createSignal(null);
  const [watchlist, setWatchlist] = createSignal([]);
  const [franchises, setFranchises] = createSignal([]);
  const [view, setView] = createSignal('dashboard');
  const storedTheme = localStorage.getItem('cinelog_theme');
  const [theme, setTheme] = createSignal(storedTheme || 'sage');
  const [loading, setLoading] = createSignal(true);
  const [splashWait, setSplashWait] = createSignal(true);
  const [showScrollTop, setShowScrollTop] = createSignal(false);

  const {
    searchModal, setSearchModal, searchInitialQuery, setSearchInitialQuery,
    detailsId, setDetailsId, previewSource, setPreviewSource,
    settingsModal, setSettingsModal, serverSettingsModal, setServerSettingsModal
  } = useModalState();

  const { toasts, showToast, notifyError } = useMicrointeractions();

  const handleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => showToast('Signed in successfully! 🎬', 'success', 2500))
      .catch(() => notifyError('Sign in failed. Please try again.'));
  };

  createEffect(() => {
    document.body.className = `theme-${theme()}`;
    localStorage.setItem('cinelog_theme', theme());
  });

  createEffect(() => {
    view();
    window.scrollTo(0, 0);
  });

  onMount(() => {
    setTimeout(() => setSplashWait(false), 3000);

    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });

    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        let wReady = false; let fReady = false;
        onSnapshot(query(collection(db, 'users', u.uid, 'watchlist'), orderBy('addedAt', 'desc')), (snap) => {
          setWatchlist(snap.docs.map(d => ({ id: d.id, ...d.data() }))); wReady = true; if (fReady) setLoading(false);
        });
        onSnapshot(collection(db, 'users', u.uid, 'franchises'), (snap) => {
          setFranchises(snap.docs.map(d => ({ id: d.id, ...d.data() }))); fReady = true; if (wReady) setLoading(false);
        });
      } else {
        setWatchlist([]); setFranchises([]); setLoading(false);
      }
    });

    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  const nukeCollection = async () => {
    if (!user()) return;
    if (!confirm('This will permanently delete your entire Vault. Are you sure?')) return;
    if (prompt('Type DELETE to confirm') !== 'DELETE') { showToast('Cancelled. Vault is safe.', 'info'); return; }
    showToast('Nuking Vault...', 'info', -1);
    const snap = await getDocs(collection(db, 'users', user().uid, 'watchlist'));
    const docs = snap.docs;
    for (let i = 0; i < docs.length; i += 500) {
      const batch = writeBatch(db);
      docs.slice(i, i + 500).forEach(d => batch.delete(d.ref));
      await batch.commit();
    }
    showToast('Vault wiped! 💥', 'success');
  };

  /* ── Toast icon map ── */
  const toastIcon = (type) => {
    if (type === 'success') return <Icon name="check_circle" fill style="color: #4ade80; flex-shrink: 0" />;
    if (type === 'error')   return <Icon name="error" fill style="color: #ff6b6b; flex-shrink: 0" />;
    if (type === 'action')  return <Icon name="star" fill style="color: var(--p); flex-shrink: 0" />;
    return <Icon name="info" fill style="color: var(--p); flex-shrink: 0" />;
  };

  const toastBorder = (type) => {
    if (type === 'error') return '#ff6b6b';
    return 'var(--p)';
  };

  return (
    <ErrorBoundary fallback={() => (
      <div class="h-screen flex items-center justify-center p-10 text-center" role="alert">
        <div class="glass-surface rounded-[2rem] p-8 border max-w-md w-full"
          style="background: var(--raised); border-color: var(--border-active); box-shadow: 0 0 40px var(--p-glow)">
          <div class="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto"
            style="background: var(--p-dim); border: 1px solid var(--border-active)" aria-hidden="true">
            <Icon name="warning" class="text-5xl" style="color: var(--p)" />
          </div>
          <h2 class="font-headline text-4xl text-white mb-3">Something went wrong</h2>
          <p class="text-sm mb-8 leading-relaxed" style="color: var(--muted)">
            An unexpected error occurred. Please reload the app to continue.
          </p>
          <button onClick={() => window.location.reload()}
            class="px-8 py-3.5 rounded-full font-bold text-black text-sm uppercase tracking-widest active:scale-95 transition-all"
            style="background: var(--p); box-shadow: 0 0 24px var(--p-glow)">
            Reload App
          </button>
        </div>
      </div>
    )}>
      <div class="cinelog-root min-h-screen pb-32 lg:pb-0 lg:pl-64">
        <Show when={!loading() && !splashWait()} fallback={<LoadingScreen />}>

          {/* ── STICKY HEADER ── */}
          <header
            class="sticky top-0 z-[100] flex justify-between items-center px-5 lg:px-6 py-3.5"
            style="background: rgba(0,0,0,0.96); border-bottom: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(16px)"
          >
            <div class="flex items-center gap-3">
              <button
                class="flex items-center gap-2 active:scale-95 transition-transform hover:scale-105"
                onClick={() => window.location.reload()}
                aria-label="CineLog — Reload app"
              >
                <div class="w-8 h-8 rounded-xl flex items-center justify-center"
                  style="background: var(--p-dim); border: 1px solid var(--border-active)" aria-hidden="true">
                  <Icon name="movie_filter" fill class="text-sm" style="color: var(--p)" />
                </div>
                <h2 class="font-headline text-2xl text-white leading-none" aria-hidden="true">
                  CINE<span style="color: var(--p)">LOG</span>
                </h2>
              </button>
            </div>

            <div class="flex items-center gap-3">
              <Show
                when={user()}
                fallback={
                  <button
                    onClick={handleLogin}
                    class="px-5 py-2 rounded-full font-bold text-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                    style="background: var(--p); box-shadow: 0 0 16px var(--p-glow)"
                    aria-label="Sign in with Google"
                  >
                    Sign In
                  </button>
                }
              >
                <button
                  onClick={() => setView('settings')}
                  aria-label={`Open profile settings for ${user()?.displayName || 'account'}`}
                  class="active:scale-95 transition-all hover:scale-110 rounded-full"
                  style="box-shadow: 0 0 0 2px transparent; transition: box-shadow 150ms ease-out"
                  onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--p)'}
                  onBlur={e => e.currentTarget.style.boxShadow = '0 0 0 2px transparent'}
                >
                  <img
                    src={user().photoURL}
                    class="w-9 h-9 rounded-full object-cover"
                    style="border: 2px solid var(--p)"
                    alt={user()?.displayName || 'Profile'}
                  />
                </button>
              </Show>
            </div>
          </header>

          {/* ── MAIN CONTENT ── */}
          <main class="p-5 max-w-2xl lg:max-w-none lg:px-12 mx-auto relative z-10" id="main-content">
            <Show when={view() === 'dashboard'}>
              <Dashboard
                watchlist={watchlist} openMovie={setDetailsId} setView={setView}
                showToast={showToast} setActiveVaultStatus={() => {}}
                isGuest={!user()} onLogin={handleLogin}
              />
            </Show>
            <Show when={view() === 'watchlist'}>
              <Vault
                watchlist={watchlist} openMovie={setDetailsId}
                activeStatus="all" onFilterChange={() => {}}
                isGuest={!user()} onLogin={handleLogin}
              />
            </Show>
            <Show when={view() === 'franchises'}>
              <Show when={user()} fallback={<GuestPrompt onLogin={handleLogin} />}>
                <FranchisesView
                  watchlist={watchlist} franchises={franchises}
                  uid={user().uid} openMovie={setDetailsId} showToast={showToast}
                />
              </Show>
            </Show>
            <Show when={view() === 'analytics'}>
              <Show when={user()} fallback={<GuestPrompt onLogin={handleLogin} />}>
                <Analytics watchlist={watchlist} />
              </Show>
            </Show>
            <Show when={view() === 'upcoming'}>
              <UpcomingView
                watchlist={watchlist} uid={user()?.uid}
                showToast={showToast} isGuest={!user()} onLogin={handleLogin}
              />
            </Show>
            <Show when={view() === 'sync'}>
              <Show when={user()} fallback={<GuestPrompt onLogin={handleLogin} />}>
                <DataSync watchlist={watchlist} uid={user().uid} showToast={showToast} />
              </Show>
            </Show>
            <Show when={view() === 'settings'}>
              <SettingsView
                user={user()} watchlist={watchlist}
                theme={theme()} setTheme={setTheme}
                onLogout={() => signOut(auth)}
                onNuke={nukeCollection}
                uid={user()?.uid}
                showToast={showToast}
                setView={setView}
                onServerSettings={() => setServerSettingsModal(true)}
              />
            </Show>
          </main>

          {/* ── DESKTOP SIDEBAR NAV ── */}
          <nav class="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-black border-r border-white/10 z-40 flex-col pt-24 px-6 gap-2" aria-label="Main navigation">
            <NavBtn icon="dashboard"      label="Home"     active={view() === 'dashboard'}  onClick={() => setView('dashboard')} />
            <NavBtn icon="visibility"     label="Vault"    active={view() === 'watchlist'}  onClick={() => setView('watchlist')} />
            <NavBtn icon="search"         label="Search"   active={searchModal()}            onClick={() => { setSearchInitialQuery(''); setSearchModal(true); }} />
            <NavBtn icon="folder_special" label="Lists"    active={view() === 'franchises'} onClick={() => setView('franchises')} />
            <NavBtn icon="calendar_month" label="Upcoming" active={view() === 'upcoming'}   onClick={() => setView('upcoming')} />
          </nav>

          {/* ── MOBILE BOTTOM NAV ── */}
          <nav class="fixed bottom-0 left-0 w-full z-[100] flex lg:hidden bottom-nav-bar h-16" aria-label="Main navigation">
            <NavBtn icon="dashboard"      label="Home"     active={view() === 'dashboard'}  onClick={() => setView('dashboard')} />
            <NavBtn icon="visibility"     label="Vault"    active={view() === 'watchlist'}  onClick={() => setView('watchlist')} />
            <NavBtn icon="search"         label="Search"   active={searchModal()}            onClick={() => { setSearchInitialQuery(''); setSearchModal(true); }} />
            <NavBtn icon="folder_special" label="Lists"    active={view() === 'franchises'} onClick={() => setView('franchises')} />
            <NavBtn icon="calendar_month" label="Upcoming" active={view() === 'upcoming'}   onClick={() => setView('upcoming')} />
          </nav>

          {/* ── MODALS ── */}
          <Show when={searchModal()}>
            <SearchModal
              onClose={() => { setSearchModal(false); setSearchInitialQuery(''); }}
              uid={user()?.uid} initialQuery={searchInitialQuery()}
              showToast={showToast} watchlist={watchlist()}
              isGuest={!user()} onLogin={() => { setSearchModal(false); handleLogin(); }}
              openPreview={(item, source) => {
                setPreviewSource(source || 'search');
                setDetailsId(`PREVIEW_${JSON.stringify(item)}`);
              }}
            />
          </Show>

          <Show when={detailsId()}>
            <DetailsModal
              id={detailsId()} watchlist={watchlist()} franchises={franchises()}
              onClose={() => { setDetailsId(null); setPreviewSource(null); }}
              uid={user()?.uid} showToast={showToast} theme={theme}
              isGuest={!user()} onLogin={() => { setDetailsId(null); handleLogin(); }}
            />
          </Show>

          <Show when={settingsModal()}>
            <SettingsModal currentTheme={theme()} setTheme={setTheme} onClose={() => setSettingsModal(false)} />
          </Show>

          <Show when={serverSettingsModal()}>
            <ServerSettingsModal uid={user()?.uid} showToast={showToast} onClose={() => setServerSettingsModal(false)} />
          </Show>

          {/* ── SCROLL TO TOP ── */}
          <Show when={showScrollTop()}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              class="fixed right-5 lg:right-8 w-11 h-11 rounded-full flex items-center justify-center z-[80] animate-pop-in hover:scale-110 active:scale-90"
              style="background: var(--p); color: #000; box-shadow: 0 0 20px var(--p-glow); bottom: calc(4rem + 24px)"
              aria-label="Scroll to top"
            >
              <Icon name="keyboard_arrow_up" class="text-2xl font-black" aria-hidden="true" />
            </button>
          </Show>

          {/* ── TOASTS ── */}
          <Show when={toasts().length > 0}>
            <div
              class="fixed inset-x-0 pointer-events-none flex flex-col items-center gap-3 px-4 z-[10000000]"
              style="bottom: calc(4rem + 24px)"
              role="status" aria-live="polite" aria-atomic="false"
            >
              {toasts().map((toast) => (
                <div
                  class={`glass-surface px-5 py-3 rounded-full shadow-2xl flex gap-2.5 items-center text-sm font-bold whitespace-nowrap toast-${toast.type} border pointer-events-auto`}
                  style={`border-color: ${toastBorder(toast.type)}; color: var(--text); max-width: min(calc(100vw - 32px), 400px)`}
                  role="alert"
                >
                  {toastIcon(toast.type)}
                  <span class="truncate">{toast.msg}</span>
                </div>
              ))}
            </div>
          </Show>

        </Show>
      </div>
    </ErrorBoundary>
  );
}
