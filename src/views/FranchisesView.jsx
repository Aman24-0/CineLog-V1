import { createSignal, createMemo, For, Show, onMount, onCleanup } from 'solid-js';
import { doc, updateDoc, deleteDoc, writeBatch, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon } from '../utils';

function AddToFolderModal(props) {
  const [search, setSearch] = createSignal('');
  onMount(() => { document.body.style.overflow = 'hidden'; }); onCleanup(() => { document.body.style.overflow = ''; });
  const available = createMemo(() => { const q = search().toLowerCase(); return props.watchlist().filter(m => m.franchises?.[props.folderId] === undefined).filter(m => !q || (m.title || m.name || '').toLowerCase().includes(q)); });

  const addToFolder = async (m) => {
    const nextOrder = props.currentMovies().length + 1;
    await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { [`franchises.${props.folderId}`]: nextOrder });
    props.showToast(`Added!`);
  };

  return (
    <div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[999999] animate-fade-in" onClick={props.onClose}>
      <div class="w-full max-w-lg bg-[#08090b]/97 rounded-[2rem] border border-white/10 shadow-2xl animate-pop-in overflow-hidden flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
        <div class="p-5 border-b border-white/5 flex justify-between items-center shrink-0"><h3 class="font-black text-lg text-white flex items-center gap-2"><Icon name="playlist_add" class="text-[var(--primary)]"/> Vault se Add karo</h3><button onClick={props.onClose} class="bg-white/5 p-2 rounded-full active:scale-95 hover:bg-white/10 transition-all"><Icon name="close" class="text-gray-400"/></button></div>
        <div class="p-4 border-b border-white/5 shrink-0"><div class="flex items-center gap-3 glass-surface rounded-2xl px-4 py-3 border border-white/10 focus-within:border-[var(--primary)]/50 transition-colors"><Icon name="search" class="text-gray-500 text-sm shrink-0"/><input autofocus value={search()} onInput={e => setSearch(e.target.value)} placeholder="Movie ya series dhundo..." class="bg-transparent border-none w-full outline-none text-white text-sm font-medium placeholder-gray-600"/></div></div>
        <div class="overflow-y-auto hide-scrollbar p-3 space-y-2">
          <Show when={available().length === 0}><div class="text-center py-12 text-gray-500"><Icon name="check_circle" class="text-4xl mb-2 opacity-30"/><p class="text-sm font-bold">Saari movies folder mein hain already!</p></div></Show>
          <For each={available()}>{(m) => (
            <div class="flex items-center gap-3 glass-surface p-3 rounded-2xl border border-white/5 hover:border-[var(--primary)]/30 transition-all group">
              <Show when={m.poster_path} fallback={<div class="w-10 h-14 bg-white/5 rounded-xl shrink-0 flex items-center justify-center"><Icon name="movie" class="text-gray-600 text-sm"/></div>}><img src={`https://image.tmdb.org/t/p/w92${m.poster_path}`} class="w-10 h-14 rounded-xl object-cover shrink-0 bg-[#171921]"/></Show>
              <div class="flex-1 min-w-0"><p class="font-bold text-sm text-white truncate">{m.title || m.name}</p><p class="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest">{(m.release_date || m.first_air_date || '').split('-')[0]} • {m.media_type === 'tv' ? 'Series' : 'Movie'}</p></div>
              <button onClick={() => addToFolder(m)} class="w-9 h-9 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-[#0c0e14] transition-all active:scale-95 shrink-0"><Icon name="add" class="text-lg"/></button>
            </div>
          )}</For>
        </div>
      </div>
    </div>
  );
}

export function FranchisesView(props) {
  const [currentFolder, setCurrentFolder] = createSignal(null);
  const [sortMode, setSortMode] = createSignal('order');
  const [showAddModal, setShowAddModal] = createSignal(false);

  const subFolders = createMemo(() => props.franchises().filter(f => f.parentId === currentFolder()).sort((a,b) => a.name.localeCompare(b.name)));
  const currentMovies = createMemo(() => {
    let list = props.watchlist().filter(m => m.franchises && m.franchises[currentFolder()] !== undefined);
    return list.sort((a, b) => sortMode() === 'year' ? (parseInt(String(b.release_date||b.first_air_date||'').substring(0,4))||0) - (parseInt(String(a.release_date||a.first_air_date||'').substring(0,4))||0) : a.franchises[currentFolder()] - b.franchises[currentFolder()]);
  });
  
  const createFolder = async () => { const n = prompt("Folder Name:"); if(n && n.trim()) { await addDoc(collection(db, 'users', props.uid, 'franchises'), { name: n.trim(), parentId: currentFolder(), createdAt: serverTimestamp() }); props.showToast("Folder created!"); } };
  const moveMovie = async (index, dir) => { let arr = [...currentMovies()]; if (index + dir < 0 || index + dir >= arr.length) return; const batch = writeBatch(db); [arr[index], arr[index+dir]] = [arr[index+dir], arr[index]]; arr.forEach((m, i) => batch.update(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { [`franchises.${currentFolder()}`]: i + 1 })); await batch.commit(); };
  const removeFromFolder = async (m) => { if(!confirm(`"${m.title || m.name}" ko folder se hatayein?`)) return; const updated = { ...m.franchises }; delete updated[currentFolder()]; await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(m.id)), { franchises: updated }); props.showToast("Removed from folder"); };

  return (
    <div class="pb-10 animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-headline font-black drop-shadow-md">Lists</h2>
        <Show when={!currentFolder()} fallback={<button onClick={() => setShowAddModal(true)} class="bg-[var(--primary)] text-[#0c0e14] px-4 py-2 rounded-full text-xs font-black border border-[var(--primary)] active:scale-95 transition-all shadow-lg flex items-center gap-1"><Icon name="playlist_add" class="text-[16px]"/> Add Movie</button>}>
          <button onClick={createFolder} class="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/5 hover:bg-white/20 active:scale-95 transition-all shadow-lg flex items-center gap-1"><Icon name="add" class="text-[16px]"/> Folder</button>
        </Show>
      </div>

      <Show when={currentFolder()}><button onClick={() => setCurrentFolder(null)} class="mb-6 glass-surface px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest w-max active:scale-95 transition-transform"><Icon name="arrow_back" class="text-[14px]"/> Back</button></Show>
      
      <Show when={subFolders().length > 0}>
        <div class="flex flex-col gap-5 mb-10">
          <For each={subFolders()}>{(f) => {
            const firstMovie = () => props.watchlist().find(m => m.franchises && m.franchises[f.id] !== undefined);
            const bgImage = () => firstMovie()?.backdrop_path ? `https://image.tmdb.org/t/p/w500${firstMovie().backdrop_path}` : 'none';
            const movieCount = () => props.watchlist().filter(m => m.franchises && m.franchises[f.id] !== undefined).length;
            return (
              <div onClick={() => setCurrentFolder(f.id)} class="relative rounded-[2rem] cursor-pointer group hover:-translate-y-1 transition-all shadow-2xl flex flex-col justify-end min-h-[160px] overflow-hidden border border-white/10 bg-[#171921]">
                <Show when={bgImage() !== 'none'}><img src={bgImage()} class="absolute inset-0 w-full h-full object-cover z-0"/><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div></Show>
                <div class="relative z-20 p-6 sm:p-8 w-full h-full flex flex-col justify-end">
                  <div class="w-full pr-12"><p class="text-[10px] text-[var(--primary)] font-bold uppercase tracking-widest mb-1 opacity-90 drop-shadow-md">Collection</p><h3 class="font-black font-headline text-2xl sm:text-3xl text-white leading-tight drop-shadow-lg">{f.name}</h3><p class="text-[10px] text-gray-300 mt-1 font-bold">{movieCount()} titles</p></div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); confirm("Delete folder?") && deleteDoc(doc(db, 'users', props.uid, 'franchises', f.id)); }} class="absolute top-4 right-4 z-30 text-white hover:text-red-500 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/20 rounded-full backdrop-blur-md transition-all active:scale-95"><Icon name="delete" class="text-[18px]"/></button>
                <Show when={bgImage() === 'none'}><Icon name="folder" class="absolute right-6 top-1/2 -translate-y-1/2 text-white/5 text-8xl pointer-events-none z-10" fill /></Show>
              </div>
            );
          }}</For>
        </div>
      </Show>

      <Show when={currentFolder()}>
        <div class="flex justify-between items-end mb-4 px-2">
          <h3 class="font-bold text-xl font-headline">Titles <span class="text-[var(--primary)] text-sm">({currentMovies().length})</span></h3>
          <select value={sortMode()} onChange={e => setSortMode(e.target.value)} class="bg-[#08090b] text-[var(--primary)] text-[10px] font-bold uppercase outline-none border border-white/10 rounded-full px-3 py-1.5 shadow-lg">
            <option value="order">Sort: Custom</option>
            <option value="year">Sort: Year</option>
          </select>
        </div>
        <Show when={currentMovies().length === 0}><div class="text-center py-16 opacity-40"><Icon name="video_library" class="text-5xl text-[var(--primary)] mb-3"/><p class="text-sm font-bold text-gray-300">Folder empty hai</p><p class="text-[11px] text-gray-500 mt-1">"Add Movie" button se vault se add karo</p></div></Show>
        <div class="space-y-3">
          <For each={currentMovies()}>{(m, i) => (
            <div class="flex items-center gap-3 glass-surface p-3 rounded-[1.5rem] border border-white/5 shadow-lg group hover:border-white/20 transition-all">
              <Show when={sortMode() === 'order'}>
                <div class="flex flex-col items-center justify-center bg-white/5 rounded-xl p-1 shrink-0"><button onClick={() => moveMovie(i(), -1)} class={`text-gray-500 hover:text-white ${i()===0?'opacity-20 pointer-events-none':''}`}><Icon name="keyboard_arrow_up" class="text-[18px]"/></button><span class="text-[10px] font-black text-[var(--primary)]">{i()+1}</span><button onClick={() => moveMovie(i(), 1)} class={`text-gray-500 hover:text-white ${i()===currentMovies().length-1?'opacity-20 pointer-events-none':''}`}><Icon name="keyboard_arrow_down" class="text-[18px]"/></button></div>
              </Show>
              <div class="flex-1 flex items-center gap-3 cursor-pointer min-w-0" onClick={() => props.openMovie(m.id)}>
                <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} class="w-11 h-16 rounded-xl object-cover shadow-md shrink-0"/>
                <div class="min-w-0"><p class="font-bold text-sm text-gray-100 group-hover:text-[var(--primary)] transition-colors truncate">{m.title || m.name}</p><p class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{(m.release_date||m.first_air_date||'').split('-')[0]}</p></div>
              </div>
              <button onClick={() => removeFromFolder(m)} class="w-8 h-8 rounded-full text-gray-600 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all active:scale-95 shrink-0"><Icon name="remove_circle" class="text-[18px]"/></button>
            </div>
          )}</For>
        </div>
      </Show>
      <Show when={showAddModal() && currentFolder()}><AddToFolderModal uid={props.uid} folderId={currentFolder()} watchlist={props.watchlist} currentMovies={currentMovies} showToast={props.showToast} onClose={() => setShowAddModal(false)} /></Show>
    </div>
  );
}
