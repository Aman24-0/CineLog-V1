import { createSignal, For, Show } from 'solid-js';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, getSafeGenres, getSafePlatforms, TMDB_KEY } from '../utils';

export function DataSync(props) {
  const [importLogs, setImportLogs] = createSignal([]);
  const exportData = (format) => {
    if(props.watchlist().length === 0) return alert("Vault is empty.");
    let dataStr, type, ext;
    if(format === 'json') { dataStr = JSON.stringify(props.watchlist(), null, 2); type = 'application/json'; ext = 'json'; }
    else { const headers = ['Title', 'Type', 'Status', 'Rating', 'Watch Date', 'Genres', 'Platforms', 'Region', 'Notes', 'Tags']; const rows = props.watchlist().map(m => [`"${(m.title||m.name||'').replace(/"/g, '""')}"`, m.media_type||'', m.status||'', m.rating||0, typeof m.watchDate === 'string' ? m.watchDate : '', `"${getSafeGenres(m).join(', ')}"`, `"${getSafePlatforms(m).join(', ')}"`, m.region||'', `"${(typeof m.notes==='string'?m.notes:'').replace(/"/g, '""')}"`, `"${m.tag||''}"`].join(',')); dataStr = [headers.join(','), ...rows].join('\n'); type = 'text/csv'; ext = 'csv'; }
    const blob = new Blob([dataStr], { type }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `cinelog_export.${ext}`; a.click(); props.showToast(`Exported as ${ext.toUpperCase()}`);
  };

  const handleJSONUpload = async (e) => {
      const file = e.target.files[0]; if(!file) return; setImportLogs([{id: Date.now(), title: 'System', msg: 'Reading JSON file...', type: 'success'}]);
      try { const text = await file.text(); const data = JSON.parse(text); if(!Array.isArray(data)) throw new Error("Invalid format");
          for(let i=0; i<data.length; i++) { const m = data[i]; const title = m.title || m.name; if(!title) continue;
              if(props.watchlist().some(w => String(w.id) === String(m.id) || (w.title||w.name||'').toLowerCase() === title.toLowerCase())) { setImportLogs(prev => [{id: Date.now()+i, title: title, msg: 'Already exists', type: 'success'}, ...prev]); continue; }
              if(m.id && m.media_type) { await setDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { ...m, addedAt: m.addedAt ? m.addedAt : serverTimestamp() }); setImportLogs(prev => [{id: Date.now()+i, title: title, msg: 'Imported', type: 'success'}, ...prev]); } else setImportLogs(prev => [{id: Date.now()+i, title: title, msg: 'Missing TMDB ID', type: 'error'}, ...prev]);
              await new Promise(r => setTimeout(r, 100)); 
          } props.showToast("JSON Import Finished");
      } catch(err) { setImportLogs(prev => [{id: Date.now(), title: 'System', msg: 'Failed to parse JSON', type: 'error'}, ...prev]); }
  };

  return (
    <div class="max-w-4xl mx-auto animate-fade-in pb-10">
      <h2 class="text-3xl font-headline font-black mb-2 drop-shadow-md">Data Sync</h2><p class="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8">Import or Export your universe securely</p>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="glass-surface rounded-[2rem] p-10 text-center shadow-xl border border-white/5">
          <Icon name="upload_file" class="text-5xl text-[var(--primary)] mb-4 opacity-80" />
          <h3 class="text-xl font-black mb-2">Import Vault</h3><p class="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-8">Restore from backup</p>
          <div class="flex gap-4"><input type="file" id="jsonInput" accept=".json" class="hidden" onChange={handleJSONUpload} /><button onClick={() => document.getElementById('jsonInput').click()} class="w-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-[var(--primary)] hover:text-[#0c0e14] transition-colors active:scale-95 shadow-lg">Upload JSON Backup</button></div>
        </div>
        <div class="glass-surface rounded-[2rem] p-10 text-center shadow-xl border border-white/5">
          <Icon name="download" class="text-5xl text-[var(--secondary)] mb-4 opacity-80" />
          <h3 class="text-xl font-black mb-2">Export Vault</h3><p class="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-8">Download {props.watchlist().length} titles</p>
          <div class="flex gap-4">
              <button onClick={() => exportData('csv')} class="flex-1 bg-white/5 border border-white/10 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors active:scale-95 shadow-sm">CSV</button>
              <button onClick={() => exportData('json')} class="flex-1 bg-[var(--secondary)] text-[#0c0e14] font-black py-4 rounded-xl text-[10px] uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-[var(--secondary)]/20">JSON</button>
          </div>
        </div>
      </div>
      <Show when={importLogs().length > 0}>
        <div class="glass-surface rounded-2xl p-6 border border-white/5 animate-pop-in">
          <div class="flex justify-between items-center mb-4"><h3 class="font-black text-sm">Import Logs</h3><button onClick={()=>setImportLogs([])} class="text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors active:scale-95"><Icon name="delete" class="text-[16px]"/></button></div>
          <div class="space-y-2 max-h-64 overflow-y-auto pr-2 hide-scrollbar"><For each={importLogs()}>{(l) => (<div class={`p-3 rounded-xl bg-[#0c0e14] border border-white/5 flex justify-between items-center ${l.type==='success'?'border-l-green-500':'border-l-red-500'} border-l-4 shadow-md`}><span class="text-xs font-bold truncate pr-4">{l.title}</span><span class={`text-[9px] uppercase font-black tracking-widest ${l.type==='success'?'text-green-500':'text-red-500'}`}>{l.msg}</span></div>)}</For></div>
        </div>
      </Show>
    </div>
  );
}
