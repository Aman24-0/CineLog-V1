import { createSignal, For, Show, onMount, onCleanup } from 'solid-js';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon } from '../utils';

export function ServerSettingsModal(props) {
  const [servers, setServers] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [expandedId, setExpandedId] = createSignal(null);
  
  // Edit State
  const [editingId, setEditingId] = createSignal(null);
  const [editData, setEditData] = createSignal({ name: '', type: 'multi', idMode: 'TMDB', movieUrl: '', tvUrl: '' });
  
  // Add Form State
  const [showAddForm, setShowAddForm] = createSignal(false);
  const [newServer, setNewServer] = createSignal({ name: '', type: 'multi', idMode: 'TMDB', movieUrl: '', tvUrl: '' });

  onMount(async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', props.uid));
      const userData = userDoc.data();
      let loadedServers = [];

      if (userData?.customServers) {
        Object.keys(userData.customServers).forEach(key => {
          loadedServers.push({
            id: key,
            name: userData.customServers[key].name || 'Unnamed Node',
            type: userData.customServers[key].type || 'multi',
            idMode: userData.customServers[key].idMode || 'TMDB',
            movieUrl: userData.customServers[key].movieUrl || '',
            tvUrl: userData.customServers[key].tvUrl || '',
            enabled: userData.customServers[key].enabled !== false,
            icon: 'dns'
          });
        });
      }
      setServers(loadedServers);
    } catch (err) {
      console.error('Error loading server settings:', err);
    }
    setLoading(false);
  });

  onMount(() => document.body.style.overflow = 'hidden');
  onCleanup(() => document.body.style.overflow = '');

  const saveServerSettings = async () => {
    try {
      const customServers = {};
      servers().forEach(s => {
        customServers[s.id] = {
          name: s.name,
          type: s.type,
          idMode: s.idMode || 'TMDB',
          movieUrl: s.movieUrl,
          tvUrl: s.tvUrl,
          enabled: s.enabled !== false
        };
      });
      
      try {
        await updateDoc(doc(db, 'users', props.uid), { customServers });
      } catch (e) {
        await setDoc(doc(db, 'users', props.uid), { customServers });
      }
      
      props.showToast('Server settings saved!');
      setTimeout(() => props.onClose(), 500);
    } catch (err) {
      console.error('Error saving:', err);
      props.showToast('Failed to save settings');
    }
  };

  const deleteAllServers = async () => {
    if (!confirm('Are you sure you want to delete all configured servers?')) return;
    setServers([]);
    try {
      await updateDoc(doc(db, 'users', props.uid), { customServers: {} });
      props.showToast('All servers deleted');
      setExpandedId(null);
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const testServerUrl = async (serverId, type, e) => {
    if (e) e.stopPropagation();
    const server = servers().find(s => s.id === serverId);
    if (!server) return;

    let testUrl = type === 'movie' ? server.movieUrl : server.tvUrl;
    testUrl = testUrl.replace(/\{id\}|\[TMDB_ID\]|\{tmdb_id\}/gi, '666243')
                     .replace(/\{imdb_id\}/gi, 'tt28015403')
                     .replace(/\{season\}|\[SEASON\]/gi, '1')
                     .replace(/\{episode\}|\[EPISODE\]/gi, '1');

    try {
      await fetch(testUrl, { method: 'HEAD', mode: 'no-cors' });
      props.showToast(`✓ ${server.name} ${type} reachable`);
    } catch (err) {
      props.showToast(`✗ ${server.name} appears down`);
    }
  };

  const addCustomServer = () => {
    if (!newServer().name || !newServer().movieUrl) {
      return props.showToast("Name and Movie URL are required");
    }
    const newId = 'custom_' + Date.now();
    setServers(prev => [...prev, {
      id: newId,
      name: newServer().name,
      type: newServer().type,
      idMode: newServer().idMode,
      movieUrl: newServer().movieUrl,
      tvUrl: newServer().tvUrl,
      enabled: true,
      icon: 'dns'
    }]);
    
    setNewServer({ name: '', type: 'multi', idMode: 'TMDB', movieUrl: '', tvUrl: '' });
    setShowAddForm(false);
    setExpandedId(newId);
    props.showToast("Server added! Don't forget to save.");
  };

  const deleteServer = (id, e) => {
    if (e) e.stopPropagation();
    if(!confirm("Delete this server permanently?")) return;
    setServers(prev => prev.filter(s => s.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
    setEditingId(null);
  };

  const multiServers = () => servers().filter(s => s.type === 'multi');
  const orgServers = () => servers().filter(s => s.type === 'org');

  const ServerItem = (server) => {
    const isExpanded = () => expandedId() === server.id;
    const isEnabled = () => server.enabled !== false;

    return (
      <div class="rounded-2xl transition-all duration-300 overflow-hidden border shrink-0 mb-3"
        style={{
          background: isEnabled() ? "var(--surface)" : "rgba(20,20,20,0.4)",
          "border-color": isExpanded() ? "var(--border-active)" : "var(--border)"
        }}>
        
        {/* Collapsed/Header Row */}
        <div class="flex items-center p-3 sm:p-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => toggleExpand(server.id)}>
          <div class="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center mr-4 shrink-0 transition-opacity border" 
               style={{ background: "var(--raised)", opacity: isEnabled() ? 1 : 0.4, "border-color": "var(--border)" }}>
            <Icon name="dns" class="text-lg" style="color: var(--p)" />
          </div>
          
          <div class="flex-1 min-w-0 pr-4 transition-opacity" style={{ opacity: isEnabled() ? 1 : 0.4 }}>
            <h4 class="font-bold text-white text-sm truncate">{server.name}</h4>
          </div>

          <div class="flex items-center gap-3 shrink-0" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setServers(prev => prev.map(s => s.id === server.id ? { ...s, enabled: !isEnabled() } : s))}
              class="relative shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--p)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
              style={{
                width: '44px', height: '24px',
                'min-height': '24px',
                'min-width': '44px',
                background: isEnabled() ? 'var(--p)' : 'rgba(255,255,255,0.10)',
                'border-radius': '9999px',
                transition: 'background 220ms ease',
                'box-shadow': isEnabled() ? '0 0 10px var(--p-glow)' : 'none',
              }}
              aria-checked={isEnabled()}
              role="switch"
              aria-label={`${isEnabled() ? 'Disable' : 'Enable'} ${server.name}`}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  width: '18px',
                  height: '18px',
                  'border-radius': '50%',
                  background: isEnabled() ? '#05060a' : '#666',
                  transform: isEnabled() ? 'translateX(20px)' : 'translateX(0)',
                  transition: 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), background 220ms ease',
                  'box-shadow': '0 1px 4px rgba(0,0,0,0.5)',
                  display: 'block',
                }}
              />
            </button>
            <Icon name={isExpanded() ? "expand_less" : "expand_more"} class="text-gray-500 transition-transform hidden sm:block" />
          </div>
        </div>

        {/* Expanded Content View */}
        <div class={`transition-all duration-300 overflow-hidden ${isExpanded() ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div class="p-3 sm:p-4 pt-0 border-t border-white/5 bg-black/20">
            
            {/* Quick Actions Toolbar */}
            <div class="flex flex-wrap items-center gap-2 py-3">
              <button onClick={() => { setEditingId(server.id); setEditData({ name: server.name, type: server.type, idMode: server.idMode || 'TMDB', movieUrl: server.movieUrl, tvUrl: server.tvUrl }); }} class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-black transition-all shrink-0" style="background: var(--p); box-shadow: 0 0 8px var(--p-glow)">
                <Icon name="edit" class="text-[14px]"/> Edit
              </button>

              <button onClick={(e) => testServerUrl(server.id, 'movie', e)} class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-white border border-white/10 hover:border-white/20 bg-[#141414] transition-all shrink-0">
                <Icon name="movie" class="text-[14px]" style="color: var(--p)"/> Test
              </button>

              <div class="flex-1" /> {/* Spacer */}
              
              <button onClick={(e) => deleteServer(server.id, e)} class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 border border-red-500/30 bg-red-500/10 transition-all shrink-0">
                <Icon name="delete" class="text-[14px]"/> Delete
              </button>
            </div>

            {/* Read Mode */}
            <Show when={editingId() !== server.id}>
              <div class="space-y-2 mt-1">
                <div class="w-full px-3 py-2.5 rounded-xl border font-mono text-[11px] overflow-x-auto hide-scrollbar whitespace-nowrap text-gray-300" style="background: var(--raised); border-color: var(--border)">
                  <span class="text-gray-500 mr-2 select-none">ID Mode:</span> {server.idMode || 'TMDB'}
                </div>
                <div class="w-full px-3 py-2.5 rounded-xl border font-mono text-[11px] overflow-x-auto hide-scrollbar whitespace-nowrap text-gray-300" style="background: var(--raised); border-color: var(--border)">
                  <span class="text-gray-500 mr-2 select-none">Movie:</span> {server.movieUrl || 'None'}
                </div>
                <div class="w-full px-3 py-2.5 rounded-xl border font-mono text-[11px] overflow-x-auto hide-scrollbar whitespace-nowrap text-gray-300" style="background: var(--raised); border-color: var(--border)">
                  <span class="text-gray-500 mr-2 select-none">Series:</span> {server.tvUrl || 'None'}
                </div>
              </div>
            </Show>

            {/* Edit Mode */}
            <Show when={editingId() === server.id}>
              <div class="space-y-3 mt-1 animate-fade-in p-3 rounded-xl border border-[var(--p)] bg-[#141414]">
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Server Name</p>
                    <input value={editData().name} onInput={e => setEditData(p => ({...p, name: e.target.value}))} class="w-full px-3 py-2 rounded-lg text-xs border outline-none text-white focus:border-[var(--p)] transition-colors" style="background: var(--deep); border-color: var(--border)" />
                  </div>
                  <div>
                    <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Type</p>
                    <select value={editData().type} onChange={e => setEditData(p => ({...p, type: e.target.value}))} class="w-full px-3 py-2 rounded-lg text-xs border outline-none text-white focus:border-[var(--p)] transition-colors appearance-none" style="background: var(--deep); border-color: var(--border)">
                      <option value="multi">Multi Audio</option>
                      <option value="org">Org Audio</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">ID Mode</p>
                  <select value={editData().idMode} onChange={e => setEditData(p => ({...p, idMode: e.target.value}))} class="w-full px-3 py-2 rounded-lg text-xs border outline-none text-white focus:border-[var(--p)] transition-colors appearance-none" style="background: var(--deep); border-color: var(--border)">
                    <option value="TMDB">TMDB</option>
                    <option value="IMDb">IMDb</option>
                  </select>
                </div>
                <div>
                  <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Movie Endpoints</p>
                  <textarea value={editData().movieUrl} onInput={e => setEditData(p => ({...p, movieUrl: e.target.value}))} class="w-full px-3 py-2 rounded-lg text-[11px] font-mono border outline-none text-white focus:border-[var(--p)] transition-colors" rows="2" style="background: var(--deep); border-color: var(--border)" />
                </div>
                <div>
                  <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Series Endpoints</p>
                  <textarea value={editData().tvUrl} onInput={e => setEditData(p => ({...p, tvUrl: e.target.value}))} class="w-full px-3 py-2 rounded-lg text-[11px] font-mono border outline-none text-white focus:border-[var(--p)] transition-colors" rows="2" style="background: var(--deep); border-color: var(--border)" />
                </div>
                
                <div class="flex gap-2 pt-1">
                  <button onClick={() => { setServers(prev => prev.map(s => s.id === server.id ? { ...s, ...editData() } : s)); setEditingId(null); }} class="flex-1 px-3 py-2.5 rounded-lg font-bold text-xs uppercase text-black active:scale-95 transition-transform" style="background: var(--p); box-shadow: 0 0 12px var(--p-glow)">Apply Changes</button>
                  <button onClick={() => setEditingId(null)} class="flex-1 px-3 py-2.5 rounded-lg border font-bold text-xs uppercase text-gray-300 hover:bg-white/5 active:scale-95 transition-all" style="background: var(--raised); border-color: var(--border)">Cancel</button>
                </div>
              </div>
            </Show>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center p-4 z-[999999] animate-fade-in"
      style="background: rgba(0,0,0,0.88); backdrop-filter: blur(12px)"
      onClick={props.onClose}>
      <div class="w-full max-w-2xl rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-6 animate-pop-in overflow-hidden flex flex-col max-h-[92vh]"
        style="background: rgba(9,11,16,0.98); border: 1px solid var(--border-active)"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div class="flex justify-between items-center border-b pb-5 mb-6 shrink-0" style="border-color: var(--border)">
          <div>
            <h3 class="font-bold text-lg sm:text-xl flex items-center gap-2 text-white">
              <Icon name="dns" style="color: var(--p)" /> Streaming Nodes
            </h3>
            <p class="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold mt-1.5" style="color: var(--muted)">Configure active data sources for your vault</p>
          </div>
          <button onClick={props.onClose} class="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 active:scale-95 border border-white/5 bg-[#141414]">
            <Icon name="close" class="text-white" />
          </button>
        </div>

        <Show when={loading()} fallback={
          <div class="overflow-y-auto hide-scrollbar flex-1 pr-1 pb-4 flex flex-col relative">
            
            <Show when={multiServers().length > 0}>
              <h4 class="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-gray-400">🌍 Multi Audio</h4>
              <For each={multiServers()}>{ServerItem}</For>
            </Show>

            <Show when={orgServers().length > 0}>
              <h4 class="text-[10px] font-black uppercase tracking-[0.2em] mt-4 mb-3 text-gray-400">🎭 Org Audio</h4>
              <For each={orgServers()}>{ServerItem}</For>
            </Show>

            <Show when={servers().length === 0}>
              <div class="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Icon name="router" class="text-3xl text-gray-600" />
                </div>
                <h3 class="font-bold text-white mb-1">No Nodes Configured</h3>
                <p class="text-xs text-gray-500 max-w-[200px]">Add your first streaming source to start watching content.</p>
              </div>
            </Show>

            {/* Add New Server Form */}
            <div class="mt-4">
              <Show when={!showAddForm()}>
                <button onClick={() => setShowAddForm(true)} class="w-full py-4 rounded-2xl border border-dashed border-white/10 hover:border-[var(--p)] hover:bg-[var(--p)]/5 text-gray-500 hover:text-[var(--p)] transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                  <Icon name="add" /> Add New Streaming Node
                </button>
              </Show>

              <Show when={showAddForm()}>
                <div class="p-4 rounded-2xl border border-[var(--p)] bg-[#141414] animate-pop-in">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="font-bold text-white text-xs uppercase tracking-widest">New Node Configuration</h4>
                    <button onClick={() => setShowAddForm(false)} class="text-gray-500 hover:text-white"><Icon name="close" /></button>
                  </div>
                  
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Node Name</p>
                        <input value={newServer().name} onInput={e => setNewServer(p => ({...p, name: e.target.value}))} placeholder="e.g. VidSrc" class="w-full px-3 py-2.5 rounded-xl border outline-none text-white focus:border-[var(--p)] transition-colors text-xs" style="background: var(--deep); border-color: var(--border)" />
                      </div>
                      <div>
                        <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Audio Type</p>
                        <select value={newServer().type} onChange={e => setNewServer(p => ({...p, type: e.target.value}))} class="w-full px-3 py-2.5 rounded-xl border outline-none text-white focus:border-[var(--p)] transition-colors appearance-none text-xs" style="background: var(--deep); border-color: var(--border)">
                          <option value="multi">Multi Audio</option>
                          <option value="org">Org Audio</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">ID Mode</p>
                      <select value={newServer().idMode} onChange={e => setNewServer(p => ({...p, idMode: e.target.value}))} class="w-full px-3 py-2.5 rounded-xl border outline-none text-white focus:border-[var(--p)] transition-colors appearance-none text-xs" style="background: var(--deep); border-color: var(--border)">
                        <option value="TMDB">TMDB</option>
                        <option value="IMDb">IMDb</option>
                      </select>
                    </div>

                    <div>
                      <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Movie URL Template</p>
                      <textarea value={newServer().movieUrl} onInput={e => setNewServer(p => ({...p, movieUrl: e.target.value}))} placeholder="https://example.com/movie/{tmdb_id}" class="w-full px-3 py-2.5 rounded-xl border outline-none text-white focus:border-[var(--p)] transition-colors text-[11px] font-mono" rows="2" style="background: var(--deep); border-color: var(--border)" />
                    </div>

                    <div>
                      <p class="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">Series URL Template</p>
                      <textarea value={newServer().tvUrl} onInput={e => setNewServer(p => ({...p, tvUrl: e.target.value}))} placeholder="https://example.com/tv/{tmdb_id}" class="w-full px-3 py-2.5 rounded-xl border outline-none text-white focus:border-[var(--p)] transition-colors text-[11px] font-mono" rows="2" style="background: var(--deep); border-color: var(--border)" />
                    </div>

                    <button onClick={addCustomServer} class="w-full py-3 rounded-xl font-bold text-xs uppercase text-black active:scale-95 transition-transform" style="background: var(--p); box-shadow: 0 0 15px var(--p-glow)">Add Node to List</button>
                  </div>
                </div>
              </Show>
            </div>

          </div>
        }>
          <div class="flex-1 flex items-center justify-center">
            <div class="w-8 h-8 border-2 border-[var(--p)] border-t-transparent rounded-full animate-spin" />
          </div>
        </Show>

        {/* Footer Actions */}
        <div class="pt-6 border-t mt-auto flex gap-3 shrink-0" style="border-color: var(--border)">
          <button onClick={deleteAllServers} class="px-5 py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:bg-red-500/10 transition-colors">Clear All</button>
          <div class="flex-1" />
          <button onClick={saveServerSettings} class="px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest text-black active:scale-95 transition-transform" style="background: var(--p); box-shadow: 0 0 20px var(--p-glow)">Save All Changes</button>
        </div>

      </div>
    </div>
  );
}
