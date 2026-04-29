import { createSignal, Show } from 'solid-js';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, TMDB_KEY, cleanPlatform } from '../utils';

// Constants for API Check
const WATCHMODE_KEY = "QQQ2oiV5GK9fIM0sjEfgHwMTjGtusEYSy6I8TIfp";

export function DataSync(props) {
  const [isSyncing, setIsSyncing] = createSignal(false);
  const [progress, setProgress] = createSignal({ current: 0, total: 0, pct: 0 });
  const [syncLog, setSyncLog] = createSignal('');

  // 🛠️ The Deep Scan & Repair Engine
  const runDeepScan = async () => {
    if(!confirm("Start Deep Scan?\nThis will check and update missing streaming platforms and genres for all your saved movies. Your personal ratings, status, and tags will NOT be disturbed.")) return;

    setIsSyncing(true);
    const list = props.watchlist();
    const total = list.length;
    let updatedCount = 0;

    for (let i = 0; i < total; i++) {
      const item = list[i];
      setSyncLog(`Scanning: ${item.title || item.name}...`);
      setProgress({ current: i + 1, total, pct: Math.round(((i + 1) / total) * 100) });

      try {
          let fetchedPlatforms = [];
          let newGenres = item.genresList || [];
          let newTotalEps = item.totalEps || 0;

          // 1. TMDB Scan (Fetch Genres, Episodes, and Fallback Platforms)
          const tmdbRes = await fetch(`https://api.themoviedb.org/3/${item.media_type||'movie'}/${item.id}?api_key=${TMDB_KEY}&append_to_response=watch/providers`);
          if (tmdbRes.ok) {
              const data = await tmdbRes.json();
              
              // Safe update Genres and Episodes
              if (data.genres) {
                  data.genres.forEach(g => { if(!newGenres.includes(g.name)) newGenres.push(g.name); });
              }
              if (data.number_of_episodes) {
                  newTotalEps = data.number_of_episodes;
              }

              const providers = data['watch/providers']?.results?.IN || data['watch/providers']?.results?.US;
              if (providers) {
                  const raw = [...(providers.flatrate||[]), ...(providers.free||[]), ...(providers.ads||[])];
                  raw.forEach(p => fetchedPlatforms.push(p.provider_name));
              }
          }

          // 2. WatchMode Scan (Deep API check for Indian/US OTT sources)
          const wmType = item.media_type === 'tv' ? 'tv' : 'movie';
          const wmRes = await fetch(`https://api.watchmode.com/v1/title/${wmType}-${item.id}/sources/?apiKey=${WATCHMODE_KEY}&regions=IN,US`);
          if (wmRes.ok) {
              const wmSources = await wmRes.json();
              if (Array.isArray(wmSources)) {
                  wmSources.forEach(s => {
                      if (s.type === 'sub' || s.type === 'free') fetchedPlatforms.push(s.name);
                  });
              }
          }

          // 3. Clean, Deduplicate & Merge with existing manual data
          const currentDbPlatforms = item.platformsList || [];
          let finalNames = new Set([...currentDbPlatforms]);

          fetchedPlatforms.forEach(p => {
              const cleaned = cleanPlatform(p);
              if (cleaned) finalNames.add(cleaned);
          });

          const mergedPlatforms = Array.from(finalNames);

          // 4. Update Database safely (ONLY if there is new data)
          if (mergedPlatforms.length > currentDbPlatforms.length || newGenres.length > (item.genresList?.length || 0) || newTotalEps !== item.totalEps) {
              await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), {
                  platformsList: mergedPlatforms,
                  genresList: newGenres,
                  totalEps: newTotalEps
              });
              updatedCount++;
          }

      } catch (e) {
          console.log("Error syncing:", item.id);
      }

      // Safe Delay to prevent API Rate Limit Bans (300ms)
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setIsSyncing(false);
    setSyncLog(`Scan Complete! 🚀 Successfully updated ${updatedCount} titles.`);
    props.showToast(`Vault Repaired! ${updatedCount} items synced.`);
  };

  // 📦 Standard JSON Export
  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props.watchlist()));
    const dn = document.createElement('a');
    dn.setAttribute("href", dataStr);
    dn.setAttribute("download", `Cinelog_Vault_Backup_${new Date().toLocaleDateString()}.json`);
    document.body.appendChild(dn);
    dn.click();
    dn.remove();
    props.showToast("Backup Downloaded!");
  };

  return (
    <div class="animate-fade-in max-w-3xl mx-auto pb-10">
      <div class="flex items-center gap-3 mb-8 px-2">
          <div class="w-10 h-10 bg-[var(--primary)]/20 rounded-full flex items-center justify-center border border-[var(--primary)]/50">
              <Icon name="sync" class="text-[var(--primary)]" />
          </div>
          <div>
              <h2 class="text-3xl font-headline font-black drop-shadow-md">Data Center</h2>
              <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Maintenance & Backups</p>
          </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* DEEP SCAN & REPAIR CARD */}
          <div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-between">
              <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-[50px] rounded-full pointer-events-none"></div>
              
              <div>
                  <h3 class="text-lg font-black text-white flex items-center gap-2 mb-2"><Icon name="build_circle" class="text-[var(--primary)]" /> Vault Repair Engine</h3>
                  <p class="text-xs text-gray-400 leading-relaxed mb-6">Runs a deep background scan across all saved titles. Fetches missing streaming platforms, genres, and episodes from external APIs. Your personal edits remain 100% untouched.</p>
              </div>

              <Show when={isSyncing()}>
                  <div class="bg-black/50 p-4 rounded-2xl border border-white/5 mb-6 animate-pulse">
                      <div class="flex justify-between items-center mb-2">
                          <span class="text-[9px] font-black uppercase text-[var(--primary)] tracking-widest flex items-center gap-1"><Icon name="radar" class="text-[12px] animate-spin"/> Scanning Network</span>
                          <span class="text-[10px] font-bold text-white">{progress().current} / {progress().total}</span>
                      </div>
                      <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                          <div class="h-full bg-[var(--primary)] transition-all duration-300" style={{ width: `${progress().pct}%` }}></div>
                      </div>
                      <p class="text-[10px] text-gray-500 font-bold truncate">{syncLog()}</p>
                  </div>
              </Show>

              <Show when={!isSyncing() && syncLog().includes('Complete')}>
                  <div class="bg-green-500/10 border border-green-500/30 p-3 rounded-xl mb-6 text-[10px] font-black text-green-400 tracking-widest uppercase flex items-center gap-2">
                      <Icon name="check_circle" class="text-[14px]" /> {syncLog()}
                  </div>
              </Show>

              <button disabled={isSyncing()} onClick={runDeepScan} class={`w-full font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-transform shadow-lg flex items-center justify-center gap-2 ${isSyncing() ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] text-[#0c0e14] hover:scale-[1.02] active:scale-95 shadow-[var(--primary)]/20'}`}>
                  {isSyncing() ? 'Sync in Progress...' : 'Start Deep Scan'}
              </button>
          </div>

          {/* BACKUP & EXPORT CARD */}
          <div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-between">
              <div>
                  <h3 class="text-lg font-black text-white flex items-center gap-2 mb-2"><Icon name="download" class="text-[var(--secondary)]" /> Local Backup</h3>
                  <p class="text-xs text-gray-400 leading-relaxed mb-6">Export your entire cinematic universe to a secure JSON file. Keep it safe in your local storage to prevent data loss or for migrating to a different account.</p>
              </div>

              <div class="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center gap-4 mb-6">
                  <Icon name="folder_zip" class="text-3xl text-gray-500" />
                  <div>
                      <h4 class="text-xs font-black text-white">Vault Size</h4>
                      <p class="text-[10px] font-bold text-[var(--secondary)] uppercase tracking-widest">{props.watchlist().length} Titles</p>
                  </div>
              </div>

              <button onClick={exportData} class="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                  <Icon name="file_download" class="text-[14px]" /> Export JSON File
              </button>
          </div>

      </div>
    </div>
  );
}
