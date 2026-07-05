import { createSignal, Show, For } from 'solid-js';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, TMDB_KEY, cleanPlatform } from '../utils';

export function DataSync(props) {
  const [isSyncing,   setIsSyncing]   = createSignal(false);
  const [progress,    setProgress]    = createSignal({ current: 0, total: 0, pct: 0 });
  const [syncLog,     setSyncLog]     = createSignal('');
  const [isImporting, setIsImporting] = createSignal(false);
  const [importStats, setImportStats] = createSignal({ total: 0, success: 0, skipped: 0 });
  const [errorLog,    setErrorLog]    = createSignal([]);
  let fileInputRef;

  const runDeepScan = async () => {
    const list  = props.watchlist();
    const total = list.length;

    if (total === 0) {
      props.showToast('Vault is empty — nothing to scan.', 'info');
      return;
    }
    if (total > 200) {
      props.showToast(`Large vault (${total} items). Deep Scan may take several minutes.`, 'info');
    }
    if (!confirm('Start Deep Scan?\nThis will check and update missing streaming platforms and genres for all saved titles. Your personal edits remain 100% untouched.')) return;

    setIsSyncing(true);
    let updatedCount = 0;

    for (let i = 0; i < total; i++) {
      const item = list[i];
      setSyncLog(`Scanning: ${item.title || item.name || ''}…`);
      setProgress({ current: i + 1, total, pct: Math.round(((i + 1) / total) * 100) });

      try {
        let fetchedPlatforms = [];
        let newGenres        = item.genresList || [];
        let newTotalEps      = item.totalEps   || 0;

        const tmdbRes = await fetch(`https://api.themoviedb.org/3/${item.media_type || 'movie'}/${item.id}?api_key=${TMDB_KEY}&append_to_response=watch/providers`);
        if (tmdbRes.ok) {
          const data = await tmdbRes.json();
          if (data.genres) data.genres.forEach(g => { if (!newGenres.includes(g.name)) newGenres.push(g.name); });
          if (data.number_of_episodes) newTotalEps = data.number_of_episodes;
          const providers = data['watch/providers']?.results?.IN || data['watch/providers']?.results?.US;
          if (providers) {
            [...(providers.flatrate || []), ...(providers.free || []), ...(providers.ads || [])].forEach(p => fetchedPlatforms.push(p.provider_name));
          }
        }

        const currentDbPlatforms = item.platformsList || [];
        let finalNames = new Set([...currentDbPlatforms]);
        fetchedPlatforms.forEach(p => { const cleaned = cleanPlatform(p); if (cleaned) finalNames.add(cleaned); });
        const mergedPlatforms = Array.from(finalNames);

        if (mergedPlatforms.length > currentDbPlatforms.length || newGenres.length > (item.genresList?.length || 0) || newTotalEps !== item.totalEps) {
          await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), {
            platformsList: mergedPlatforms, genresList: newGenres, totalEps: newTotalEps
          });
          updatedCount++;
        }
      } catch (e) {
        console.log('Error syncing:', item.id);
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setIsSyncing(false);
    setSyncLog(`Scan Complete! 🚀 Successfully updated ${updatedCount} titles.`);
    props.showToast(`Vault Repaired! ${updatedCount} items synced.`, 'success');
  };

  const exportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(props.watchlist()));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `Cinelog_Vault_Backup_${new Date().toLocaleDateString()}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    props.showToast('Backup Downloaded! 📥', 'success');
  };

  const importData = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedList = JSON.parse(event.target.result);
        if (!Array.isArray(importedList)) throw new Error('Invalid format. Expected an array.');

        setIsImporting(true);
        setImportStats({ total: importedList.length, success: 0, skipped: 0 });
        setErrorLog([]);

        const existingIds = new Set(props.watchlist().map(m => String(m.id)));

        for (let i = 0; i < importedList.length; i++) {
          const item = importedList[i];
          try {
            if (!item.id) throw new Error('Missing ID in object');
            if (existingIds.has(String(item.id))) throw new Error('Already exists in Vault');
            await setDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), item);
            existingIds.add(String(item.id));
            setImportStats(p => ({ ...p, success: p.success + 1 }));
          } catch (err) {
            setImportStats(p => ({ ...p, skipped: p.skipped + 1 }));
            setErrorLog(prev => [...prev, { title: item.title || item.name || 'Unknown', reason: err.message }]);
          }
        }

        setIsImporting(false);
        props.showToast('Import Finished! 📂', 'success');
        if (fileInputRef) fileInputRef.value = '';
      } catch (err) {
        setIsImporting(false);
        props.showToast('Failed to parse file. Is it a valid JSON?', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div class="animate-fade-in max-w-3xl mx-auto pb-10" role="main" aria-label="Data center">

      {/* Header */}
      <div class="flex items-center gap-3 mb-8 px-2">
        {/* FIX: var(--primary) → var(--p) */}
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center border"
          style="background: var(--p-dim); border-color: color-mix(in srgb, var(--p) 50%, transparent)"
          aria-hidden="true"
        >
          <Icon name="sync" style="color: var(--p)" aria-hidden="true" />
        </div>
        <div>
          <h2 class="text-3xl font-headline font-black drop-shadow-md text-white">Data Center</h2>
          <p class="type-caption text-gray-400 mt-1">Maintenance &amp; Backups</p>
        </div>
      </div>

      {/* Empty vault notice */}
      <Show when={props.watchlist().length === 0}>
        <div class="empty-state py-12 glass-surface rounded-[2rem] border border-white/5 mb-8 animate-fade-up">
          <div class="empty-state-icon" aria-hidden="true">
            <Icon name="inventory_2" style="color: var(--muted); font-size: 36px" />
          </div>
          <p class="empty-state-title">Vault is Empty</p>
          <p class="empty-state-body">Add titles to your vault before running a Deep Scan or creating a backup.</p>
        </div>
      </Show>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Vault Repair Engine ── */}
        <div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div class="absolute top-0 right-0 w-32 h-32 pointer-events-none" style="background: var(--p-glow); opacity: 0.08; filter: blur(50px); border-radius: 50%" aria-hidden="true" />

          <div>
            <h3 class="text-lg font-black text-white flex items-center gap-2 mb-2">
              <Icon name="build_circle" style="color: var(--p)" aria-hidden="true" /> Vault Repair Engine
            </h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-6">
              Runs a deep background scan across all saved titles. Fetches missing streaming platforms, genres, and episodes from external APIs. Your personal edits remain 100% untouched.
            </p>
          </div>

          <Show when={isSyncing()}>
            <div class="bg-black/50 p-4 rounded-2xl border border-white/5 mb-6" role="status" aria-live="polite" aria-label={`Scanning: ${progress().current} of ${progress().total} titles`}>
              <div class="flex justify-between items-center mb-2">
                <span class="type-caption flex items-center gap-1" style="color: var(--p)">
                  <Icon name="radar" class="text-[12px] animate-spin" aria-hidden="true" /> Scanning Network
                </span>
                <span class="type-caption font-black" style="color: var(--p)">{progress().current} / {progress().total}</span>
              </div>
              <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3 shadow-inner" role="progressbar" aria-valuenow={progress().pct} aria-valuemin={0} aria-valuemax={100}>
                <div class="h-full transition-all duration-300" style={{ width: `${progress().pct}%`, background: 'var(--p)', 'box-shadow': '0 0 12px var(--p-glow)' }} />
              </div>
              <p class="type-caption text-gray-300 font-bold truncate">{syncLog()}</p>
            </div>
          </Show>

          <Show when={!isSyncing() && syncLog().includes('Complete')}>
            <div class="border p-3 rounded-xl mb-6 flex items-center gap-2" style="background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.25); color: #4ade80" role="status">
              <Icon name="check_circle" class="text-[14px]" aria-hidden="true" />
              <span class="type-caption font-black">{syncLog()}</span>
            </div>
          </Show>

          <button
            disabled={isSyncing()}
            onClick={runDeepScan}
            class="w-full font-black py-4 rounded-xl type-caption transition-all flex items-center justify-center gap-2"
            style={isSyncing()
              ? 'background: var(--raised); color: var(--dim); cursor: not-allowed; border: 1px solid var(--border)'
              : 'background: var(--p); color: #05060a; box-shadow: 0 0 24px var(--p-glow)'}
            aria-label={isSyncing() ? 'Sync in progress, please wait' : 'Start deep scan of vault'}
            aria-busy={isSyncing()}
          >
            <Icon name={isSyncing() ? 'hourglass_empty' : 'radar'} class="text-[14px]" aria-hidden="true" />
            {isSyncing() ? 'Sync in Progress…' : 'Start Deep Scan'}
          </button>
        </div>

        {/* ── Local Backup & Restore ── */}
        <div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-start">
          <div>
            <h3 class="text-lg font-black text-white flex items-center gap-2 mb-2">
              {/* FIX: text-[var(--secondary)] → style color: var(--p2) */}
              <Icon name="download" style="color: var(--p2)" aria-hidden="true" /> Local Backup &amp; Restore
            </h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-6">
              Export your cinematic universe to a JSON file, or restore from a previous backup. Duplicate entries are automatically skipped.
            </p>
          </div>

          <div class="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <Icon name="folder_zip" class="text-3xl text-gray-500" aria-hidden="true" />
              <div>
                <h4 class="text-xs font-black text-white">Vault Size</h4>
                {/* FIX: text-[var(--secondary)] → style color: var(--p2) */}
                <p class="type-caption font-bold" style="color: var(--p2)">{props.watchlist().length} Titles</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-2">
            <button
              onClick={exportData}
              class="font-black py-3 rounded-xl type-caption transition-all flex items-center justify-center gap-1.5 active:scale-95"
              style="background: var(--p-dim); color: var(--p); border: 1px solid var(--p); box-shadow: 0 0 12px var(--p-glow)"
              aria-label="Export vault as JSON backup"
            >
              <Icon name="file_download" class="text-[14px]" aria-hidden="true" /> Export
            </button>

            <input type="file" accept=".json" class="hidden" ref={fileInputRef} onChange={importData} aria-hidden="true" />

            <button
              disabled={isImporting()}
              onClick={() => fileInputRef.click()}
              class="font-black py-3 rounded-xl type-caption transition-all flex items-center justify-center gap-1.5 active:scale-95"
              style={isImporting()
                ? 'background: var(--raised); color: var(--dim); cursor: not-allowed; border: 1px solid var(--border)'
                : 'background: rgba(255,120,196,0.12); color: var(--p2); border: 1px solid var(--p2)'}
              aria-label={isImporting() ? 'Import in progress, please wait' : 'Import vault from JSON backup'}
              aria-busy={isImporting()}
            >
              <Icon name={isImporting() ? 'hourglass_empty' : 'file_upload'} class="text-[14px]" aria-hidden="true" />
              {isImporting() ? 'Wait…' : 'Import'}
            </button>
          </div>

          <Show when={isImporting() || importStats().total > 0}>
            <div class="bg-black/50 p-4 rounded-2xl border border-white/5 mt-2 animate-fade-in" role="status" aria-live="polite" aria-label={`Import: ${importStats().success + importStats().skipped} of ${importStats().total} processed`}>
              <div class="flex justify-between items-center mb-2">
                <span class="type-caption flex items-center gap-1" style="color: var(--p)">
                  <Icon name={isImporting() ? 'cloud_sync' : 'cloud_done'} class="text-[12px]" aria-hidden="true" />
                  {isImporting() ? 'Importing…' : 'Complete'}
                </span>
                <span class="type-caption font-bold text-white">{importStats().success + importStats().skipped} / {importStats().total}</span>
              </div>
              <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3" role="progressbar" aria-valuenow={Math.round(((importStats().success + importStats().skipped) / Math.max(importStats().total, 1)) * 100)} aria-valuemin={0} aria-valuemax={100}>
                <div class="h-full rounded-full transition-all duration-300" style={{ width: `${((importStats().success + importStats().skipped) / Math.max(importStats().total, 1)) * 100}%`, background: 'var(--p)' }} />
              </div>
              <div class="flex gap-4 type-caption font-bold">
                <span style="color: #4ade80">Success: {importStats().success}</span>
                <span style="color: #f87171">Skipped: {importStats().skipped}</span>
              </div>
            </div>
          </Show>

          <Show when={errorLog().length > 0}>
            <div class="mt-4 p-4 rounded-2xl animate-fade-in border" style="background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.2)" role="log" aria-label="Import error log">
              <div class="flex justify-between items-center border-b pb-2 mb-2" style="border-color: rgba(248,113,113,0.2)">
                <span class="type-caption flex items-center gap-1" style="color: #f87171">
                  <Icon name="error" class="text-[14px]" aria-hidden="true" /> Skipped Log
                </span>
                <button
                  onClick={() => { setErrorLog([]); setImportStats({ total: 0, success: 0, skipped: 0 }); }}
                  class="type-caption px-2 py-1 rounded transition-all active:scale-95"
                  style="background: rgba(248,113,113,0.15); color: #f87171"
                  aria-label="Clear error log"
                >
                  Clear Log
                </button>
              </div>
              <div class="max-h-24 overflow-y-auto hide-scrollbar space-y-1">
                <For each={errorLog()}>{(err) => (
                  <div class="type-caption flex justify-between text-gray-300 border-b pb-1 mb-1 last:border-0" style="border-color: rgba(248,113,113,0.1)">
                    <span class="truncate pr-2 font-bold w-1/2">{err.title}</span>
                    <span class="truncate w-1/2 text-right" style="color: rgba(248,113,113,0.7)">{err.reason}</span>
                  </div>
                )}</For>
              </div>
            </div>
          </Show>
        </div>

      </div>
    </div>
  );
}
