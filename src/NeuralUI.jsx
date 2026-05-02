import { createSignal, createEffect, onMount, For, Show, createMemo } from 'solid-js';
import { Icon } from './utils';
import { AIRecommend } from './components/AIRecommend';

export const NeuralUI = (props) => {
  const [mx, setMx] = createSignal(0);
  const [my, setMy] = createSignal(0);
  const [rx, setRx] = createSignal(0);
  const [ry, setRy] = createSignal(0);

  let cursorRef, ringRef;

  onMount(() => {
    const handleMouseMove = (e) => {
      setMx(e.clientX);
      setMy(e.clientY);
      if (cursorRef) {
        cursorRef.style.left = `${e.clientX}px`;
        cursorRef.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    const animRing = () => {
      setRx(prev => prev + (mx() - prev) * 0.12);
      setRy(prev => prev + (my() - prev) * 0.12);
      if (ringRef) {
        ringRef.style.left = `${rx()}px`;
        ringRef.style.top = `${ry()}px`;
      }
      requestAnimationFrame(animRing);
    };
    animRing();

    return () => document.removeEventListener('mousemove', handleMouseMove);
  });

  const handleMouseEnter = () => {
    if (cursorRef && ringRef) {
      cursorRef.style.width = '14px';
      cursorRef.style.height = '14px';
      ringRef.style.width = '48px';
      ringRef.style.height = '48px';
      ringRef.style.borderColor = 'rgba(200,241,53,0.6)';
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef && ringRef) {
      cursorRef.style.width = '8px';
      cursorRef.style.height = '8px';
      ringRef.style.width = '32px';
      ringRef.style.height = '32px';
      ringRef.style.borderColor = 'rgba(200,241,53,0.4)';
    }
  };

  const stats = createMemo(() => {
    const wl = props.watchlist();
    return {
      total: wl.length,
      completed: wl.filter(m => m.status === 'Completed').length,
      watching: wl.filter(m => m.status === 'Watching').length,
      planned: wl.filter(m => m.status === 'Planned' || m.status === 'Plan to Watch').length,
      hours: Math.floor(wl.filter(m => m.status === 'Completed').reduce((acc, m) => acc + (parseInt(m.runtime) || 0), 0) / 60)
    };
  });

  const recentActivity = createMemo(() => {
    return props.watchlist().slice(0, 3);
  });

  const topRated = createMemo(() => {
    return [...props.watchlist()]
      .sort((a, b) => (parseFloat(b.imdbRating) || 0) - (parseFloat(a.imdbRating) || 0))
      .slice(0, 4);
  });

  const heroMovie = createMemo(() => {
    const watching = props.watchlist().filter(m => m.status === 'Watching');
    return watching.length > 0 ? watching[0] : props.watchlist()[0];
  });

  const handleRandomPick = () => {
    const p = props.watchlist().filter(m => m.status === 'Planned' || m.status === 'Plan to Watch');
    if(p.length) {
      props.showToast("🎲 Picking random title...");
      setTimeout(() => props.openMovie(p[Math.floor(Math.random()*p.length)].id), 500);
    } else {
      alert("Planned list is empty!");
    }
  };

  return (
    <div class="neural-root" onMouseMove={(e) => {
        if (e.target.closest('button, .mcard, .tab, .side-item, .ai-pick, .receipt-teaser, .hero, .stat-mini, .mood-chip')) {
            handleMouseEnter();
        } else {
            handleMouseLeave();
        }
    }}>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>

      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>

      <header>
        <div class="logo-wrap">
          <div class="logo-mark">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="#c8f135" />
              <path d="M2 23L16 30L30 23V9L16 16L2 9V23Z" fill="#c8f135" fill-opacity="0.3" />
            </svg>
          </div>
          <div class="logo-text">CINE<span>LOG</span><span class="logo-version">v4.0</span></div>
        </div>

        <div class="header-center">
          <div class={`tab ${props.view() === 'dashboard' ? 'active' : ''}`} onClick={() => props.setView('dashboard')}>DASHBOARD</div>
          <div class={`tab ${props.view() === 'watchlist' ? 'active' : ''}`} onClick={() => props.setView('watchlist')}>VAULT</div>
          <div class={`tab ${props.view() === 'franchises' ? 'active' : ''}`} onClick={() => props.setView('franchises')}>LISTS</div>
          <div class={`tab ${props.view() === 'upcoming' ? 'active' : ''}`} onClick={() => props.setView('upcoming')}>SOON</div>
        </div>

        <div class="header-right">
          <div class="status-pill">
            <div class="status-dot"></div>
            NEURAL_LINK
          </div>
          <img src={props.user().photoURL} class="avatar" onClick={props.onUserClick} />
        </div>
      </header>

      <div class="layout">
        <aside class="sidebar">
          <div class="sidebar-label">Interface</div>
          <div class={`side-item ${props.view() === 'dashboard' ? 'active' : ''}`} onClick={() => props.setView('dashboard')}>
            <span class="side-icon">⌂</span> Home
          </div>
          <div class={`side-item ${props.view() === 'watchlist' ? 'active' : ''}`} onClick={() => props.setView('watchlist')}>
            <span class="side-icon">◈</span> Vault
            <span class="side-badge">{stats().total}</span>
          </div>
          <div class={`side-item ${props.view() === 'franchises' ? 'active' : ''}`} onClick={() => props.setView('franchises')}>
            <span class="side-icon">≡</span> Lists
          </div>
          <div class={`side-item ${props.view() === 'upcoming' ? 'active' : ''}`} onClick={() => props.setView('upcoming')}>
            <span class="side-icon">◷</span> Soon
            <span class="side-badge hot">HOT</span>
          </div>

          <div class="sidebar-label">System</div>
          <div class="side-item" onClick={props.onSettingsClick}>
            <span class="side-icon">⚙</span> Settings
          </div>
          <div class="side-item" onClick={props.onStatsClick}>
            <span class="side-icon">✦</span> Insights
          </div>

          <div class="sidebar-footer">
            <div class="sf-label">DATA_INTEGRITY</div>
            <div class="sf-bar-wrap">
              <div class="sf-bar">
                <div class="sf-bar-top"><span>Storage</span><span>{Math.min(100, Math.floor(stats().total / 10))} %</span></div>
                <div class="sf-bar-track"><div class="sf-bar-fill" style={{ width: `${Math.min(100, Math.floor(stats().total / 10))}%`, background: 'var(--pulse)' }}></div></div>
              </div>
            </div>
          </div>
        </aside>

        <main class="content">
          <Show when={props.view() === 'dashboard'}>
            <div class="mood-bar">
              <div class="mood-label">ACTION //</div>
              <div class="mood-chip sel" onClick={handleRandomPick}>🎲 Random Pick</div>
              <div class="mood-chip" onClick={props.onSearchClick}>✚ Add New</div>
              <div class="mood-chip" onClick={() => { props.setActiveVaultStatus('Watching'); props.setView('watchlist'); }}>👀 Watching</div>
              <div class="mood-chip" onClick={() => { props.setActiveVaultStatus('Planned'); props.setView('watchlist'); }}>📌 Planned</div>
            </div>

            <Show when={heroMovie()}>
              <div class="hero" onClick={() => props.openMovie(heroMovie().id)}>
                <div class="hero-img" style={{ background: `linear-gradient(to right, rgba(4,6,10,0.97) 35%, rgba(4,6,10,0.5) 70%, rgba(4,6,10,0.2) 100%), url('https://image.tmdb.org/t/p/original${heroMovie().backdrop_path}') center/cover` }}></div>
                <div class="hero-body">
                  <div class="hero-eyebrow">
                    <div class="hero-dot"></div>
                    <div class="hero-eyebrow-text">{heroMovie().status === 'Watching' ? 'CONTINUE WATCHING' : 'FEATURED FROM VAULT'}</div>
                  </div>
                  <h1 class="hero-title">{heroMovie().title || heroMovie().name}</h1>
                  <div class="hero-meta">
                    <div class="hero-meta-item"><span>★</span> <span class="rating-val">{heroMovie().imdbRating || 'N/A'}</span></div>
                    <div class="hero-meta-sep">/</div>
                    <div class="hero-meta-item">{heroMovie().release_date?.split('-')[0]}</div>
                    <div class="hero-meta-sep">/</div>
                    <div class="hero-meta-item">{heroMovie().runtime} MIN</div>
                  </div>
                  <div class="hero-actions">
                    <button class="btn-solid">▶ PLAY NOW</button>
                    <button class="btn-ghost">✚ VAULT INFO</button>
                  </div>
                </div>
              </div>
            </Show>

            <div class="section">
              <div class="section-head">
                <div class="section-name">Recently Added</div>
                <div class="section-action" onClick={() => { props.setActiveVaultStatus('all'); props.setView('watchlist'); }}>VIEW ALL →</div>
              </div>
              <div class="movie-row">
                <For each={props.watchlist().slice(0, 8)}>
                  {(m) => (
                    <div class="mcard" onClick={() => props.openMovie(m.id)}>
                      <div class="mcard-img">
                        <img src={`https://image.tmdb.org/t/p/w300${m.poster_path}`} alt={m.title || m.name} />
                        <div class="mcard-badge">
                          <span class={`mbadge ${m.status === 'Completed' ? 'mbadge-done' : m.status === 'Watching' ? 'mbadge-wtch' : 'mbadge-plan'}`}>
                            {m.status === 'Completed' ? 'DONE' : m.status === 'Watching' ? 'WATCHING' : 'PLANNED'}
                          </span>
                          <span class="mcard-rating">★ {m.imdbRating || 'N/A'}</span>
                        </div>
                      </div>
                      <div class="mcard-title">{m.title || m.name}</div>
                      <div class="mcard-year">{m.release_date?.split('-')[0]}</div>
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div class="section">
                <AIRecommend watchlist={props.watchlist} />
            </div>

            <div class="section">
              <div class="section-head">
                <div class="section-name">Your Top Rated</div>
                <div class="section-action" onClick={() => { props.setActiveVaultStatus('all'); props.setView('watchlist'); }}>SEE MORE →</div>
              </div>
              <div class="movie-row">
                <For each={topRated()}>
                  {(m) => (
                    <div class="mcard" onClick={() => props.openMovie(m.id)}>
                      <div class="mcard-img">
                        <img src={`https://image.tmdb.org/t/p/w300${m.poster_path}`} alt={m.title || m.name} />
                        <div class="mcard-badge">
                          <span class={`mbadge ${m.status === 'Completed' ? 'mbadge-done' : m.status === 'Watching' ? 'mbadge-wtch' : 'mbadge-plan'}`}>
                            {m.status === 'Completed' ? 'DONE' : m.status === 'Watching' ? 'WATCHING' : 'PLANNED'}
                          </span>
                          <span class="mcard-rating">★ {m.imdbRating || 'N/A'}</span>
                        </div>
                      </div>
                      <div class="mcard-title">{m.title || m.name}</div>
                      <div class="mcard-year">{m.release_date?.split('-')[0]}</div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>

          <Show when={props.view() !== 'dashboard'}>
             <div class="section">
                <div class="section-head">
                    <div class="section-name" style="text-transform: uppercase;">{props.view()}</div>
                </div>
                {props.children}
             </div>
          </Show>
        </main>

        <aside class="right-panel">
          <div class="stats-grid">
            <div class="stat-mini" onClick={() => { props.setActiveVaultStatus('Completed'); props.setView('watchlist'); }}>
              <div class="stat-mini-val" style="color:var(--pulse)">{stats().completed}</div>
              <div class="stat-mini-lbl">WATCHED</div>
            </div>
            <div class="stat-mini" onClick={props.onStatsClick}>
              <div class="stat-mini-val">{stats().hours}</div>
              <div class="stat-mini-lbl">HOURS</div>
            </div>
            <div class="stat-mini" onClick={() => { props.setActiveVaultStatus('Planned'); props.setView('watchlist'); }}>
              <div class="stat-mini-val" style="color:var(--ember)">{stats().planned}</div>
              <div class="stat-mini-lbl">WATCHLIST</div>
            </div>
            <div class="stat-mini" onClick={() => { props.setActiveVaultStatus('all'); props.setView('watchlist'); }}>
              <div class="stat-mini-val" style="color:var(--frost)">{stats().total}</div>
              <div class="stat-mini-lbl">TOTAL</div>
            </div>
          </div>

          <div class="receipt-teaser" onClick={props.onStatsClick}>
            <div class="rt-title">Watchlist Receipt</div>
            <div class="rt-sub">Generate your shareable cinema year in review</div>
            <div class="rt-tag">NEW FEATURE</div>
          </div>

          <div class="activity-block">
            <div class="activity-title">RECENT ACTIVITY</div>
            <For each={recentActivity()}>
              {(m) => (
                <div class="act-item" onClick={() => props.openMovie(m.id)}>
                  <img class="act-img" src={`https://image.tmdb.org/t/p/w92${m.poster_path}`} alt="" />
                  <div class="act-body">
                    <div class="act-name">{m.title || m.name}</div>
                    <div class="act-time">Recently Added</div>
                  </div>
                  <span class={`act-badge ${m.status === 'Completed' ? 'mbadge-done' : m.status === 'Watching' ? 'mbadge-wtch' : 'mbadge-plan'}`} style={{
                    background: m.status === 'Completed' ? 'rgba(200,241,53,0.12)' : 'rgba(142,184,255,0.15)',
                    color: m.status === 'Completed' ? 'var(--pulse)' : 'var(--frost)',
                    'font-family': "'DM Mono',monospace",
                    'font-size': '8px',
                    padding: '2px 7px',
                    'border-radius': '5px'
                  }}>{m.status === 'Completed' ? 'DONE' : 'SAVED'}</span>
                </div>
              )}
            </For>
          </div>
        </aside>
      </div>

      <div class="bottom-nav">
        <div class={`bnav ${props.view() === 'dashboard' ? 'active' : ''}`} onClick={() => props.setView('dashboard')}><div class="bnav-ico">⌂</div>HOME</div>
        <div class={`bnav ${props.view() === 'watchlist' ? 'active' : ''}`} onClick={() => props.setView('watchlist')}><div class="bnav-ico">◈</div>VAULT</div>
        <div class={`bnav ${props.view() === 'franchises' ? 'active' : ''}`} onClick={() => props.setView('franchises')}><div class="bnav-ico">≡</div>LISTS</div>
        <div class={`bnav ${props.view() === 'upcoming' ? 'active' : ''}`} onClick={() => props.setView('upcoming')}><div class="bnav-ico">◷</div>SOON</div>
      </div>
      <button class="fab-mobile" onClick={props.onSearchClick}>+</button>
    </div>
  );
};
