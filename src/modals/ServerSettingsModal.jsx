import { createSignal, For, Show, onMount, onCleanup } from 'solid-js';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon } from '../utils';

const DEFAULT_SERVERS = [
  { 
    id: 'vidzee', 
    name: 'VidZee (Fast)', 
    domain: 'player.vidzee.wtf',
    type: 'embed-api',
    movieUrl: 'https://player.vidzee.wtf/embed/movie/{id}',
    tvUrl: 'https://player.vidzee.wtf/embed/tv/{id}/{season}/{episode}',
    icon: 'smart_display',
    provider: 'Embed Provider'
  },
  { 
    id: 'vidlink', 
    name: 'VidLink', 
    domain: 'vidlink.pro',
    type: 'embed-api',
    movieUrl: 'https://vidlink.pro/movie/{id}?primaryColor=b1a1ff&autoplay=false',
    tvUrl: 'https://vidlink.pro/tv/{id}/{season}/{episode}?primaryColor=b1a1ff&autoplay=false',
    icon: 'play_circle',
    provider: 'VidLink API'
  },
  { 
    id: 'vidsrcru', 
    name: 'Vidsrc.ru', 
    domain: 'vidsrc.ru',
    type: 'embed-api',
    movieUrl: 'https://vidsrc.ru/movie/{id}?autoplay=true&colour=b1a1ff',
    tvUrl: 'https://vidsrc.ru/tv/{id}/{season}/{episode}?autoplay=true&colour=b1a1ff&autonextepisode=true',
    icon: 'dns',
    provider: 'Vidsrc Mirror'
  },
  { 
    id: 'embedsu', 
    name: 'Embed.su', 
    domain: 'embed.su',
    type: 'embed-api',
    movieUrl: 'https://embed.su/embed/movie/{id}',
    tvUrl: 'https://embed.su/embed/tv/{id}/{season}/{episode}',
    icon: 'stream',
    provider: 'Generic Embed'
  },
  { 
    id: 'vidsrccc', 
    name: 'Vidsrc.cc', 
    domain: 'vidsrc.cc',
    type: 'embed-api',
    movieUrl: 'https://vidsrc.cc/v2/embed/movie/{id}',
    tvUrl: 'https://vidsrc.cc/v2/embed/tv/{id}/{season}/{episode}',
    icon: 'dynamic_feed',
    provider: 'Vidsrc Latest'
  },
  { 
    id: 'autoembed', 
    name: 'AutoEmbed', 
    domain: 'autoembed.co',
    type: 'embed-api',
    movieUrl: 'https://autoembed.co/movie/tmdb/{id}',
    tvUrl: 'https://autoembed.co/tv/tmdb/{id}-{season}-{episode}',
    icon: 'bolt',
    provider: 'Auto Provider'
  },
  {
    id: 'vidnest',
    name: 'VidNest (Official)',
    domain: 'vidnest.fun',
    type: 'embed-api',
    movieUrl: 'https://vidnest.fun/movie/{id}',
    tvUrl: 'https://vidnest.fun/tv/{id}/{season}/{episode}',
    icon: 'streaming_icon',
    provider: 'VidNest Official'
  }
];

export function ServerSettingsModal(props) {
  const [servers, setServers] = createSignal(DEFAULT_SERVERS);
  const [loading, setLoading] = createSignal(true);
  const [editingId, setEditingId] = createSignal(null);
  const [editData, setEditData] = createSignal({ movieUrl: '', tvUrl: '' });
  const [showAdvanced, setShowAdvanced] = createSignal(false);
  const [replaceMode, setReplaceMode] = createSignal(null);

  onMount(async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', props.uid));
      const userData = userDoc.data();
      if (userData?.customServers) {
        setServers(prev => prev.map(s => ({
          ...s,
          ...(userData.customServers[s.id] || {}),
          enabled: userData.customServers[s.id]?.enabled !== false
        })));
      }
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
          domain: s.domain || '',
          movieUrl: s.movieUrl,
          tvUrl: s.tvUrl,
          enabled: s.enabled !== false
        };
      });
      await setDoc(doc(db, 'users', props.uid), { customServers }, { merge: true });
      props.showToast('Server settings saved!');
      setTimeout(() => props.onClose(), 500);
    } catch (err) {
      console.error('Error saving:', err);
      props.showToast('Failed to save settings');
    }
  };

  const resetToDefault = async () => {
    if (!confirm('Reset all servers to default settings?')) return;
    setServers(DEFAULT_SERVERS);
    try {
      await updateDoc(doc(db, 'users', props.uid), { customServers: {} });
      props.showToast('Reset to defaults');
    } catch (err) {
      console.error('Error resetting:', err);
    }
  };

  const replaceServer = (fromId, toId) => {
    const fromServer = servers().find(s => s.id === fromId);
    const toServer = servers().find(s => s.id === toId);
    
    if (!fromServer || !toServer) return;

    // Replace fromServer with toServer's URLs
    setServers(prev => prev.map(s => {
      if (s.id === fromId) {
        return {
          ...s,
          movieUrl: toServer.movieUrl,
          tvUrl: toServer.tvUrl,
          domain: toServer.domain
        };
      }
      return s;
    }));

    props.showToast(`✓ ${fromServer.name} replaced with ${toServer.name}`);
    setReplaceMode(null);
  };

  const testServerUrl = async (serverId, type) => {
    const server = servers().find(s => s.id === serverId);
    if (!server) return;

    // Handle both {id} and [TMDB_ID] formats for testing
    let testUrl = type === 'movie' ? server.movieUrl : server.tvUrl;
    testUrl = testUrl.replace(/\{id\}|\[TMDB_ID\]/gi, '666243')
                     .replace(/\{season\}|\[SEASON\]/gi, '1')
                     .replace(/\{episode\}|\[EPISODE\]/gi, '1');

    try {
      const response = await fetch(testUrl, { method: 'HEAD', mode: 'no-cors' });
      props.showToast(`✓ ${server.name} ${type} endpoint reachable`);
    } catch (err) {
      props.showToast(`✗ ${server.name} appears down`);
    }
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center p-4 z-[999999] animate-fade-in"
      style="background: rgba(0,0,0,0.88); backdrop-filter: blur(12px)"
      onClick={props.onClose}>
      <div class="w-full max-w-2xl rounded-[2.5rem] p-6 animate-pop-in overflow-hidden flex flex-col max-h-[92vh]"
        style="background: rgba(9,11,16,0.98); border: 1px solid var(--border-active)"
        onClick={e => e.stopPropagation()}>

        <div class="flex justify-between items-center border-b pb-4 mb-5 shrink-0" style="border-color: var(--border)">
          <h3 class="font-bold text-lg flex items-center gap-2 text-white">
            <Icon name="dns" style="color: var(--p)" /> Streaming Servers
          </h3>
          <button onClick={props.onClose} class="p-2 rounded-full hover:bg-white/5" style="color: var(--muted)">
            <Icon name="close" />
          </button>
        </div>

        <Show when={loading()} fallback={
          <div class="overflow-y-auto hide-scrollbar space-y-3 flex-1 pr-1">
            <div class="rounded-xl p-3 border" style="background: var(--raised); border-color: var(--border)">
              <p class="label-mono mb-2" style="color: var(--muted); font-size: 8px">
                <Icon name="info" class="text-xs mr-1" style="vertical-align: middle; color: var(--p)" />
                Server fail ho? Edit domain or completely replace with working server. Every URL template update hoga automatically.
              </p>
            </div>

            <For each={servers()}>
              {(server) => (
                <div class="border rounded-2xl p-4 transition-all" style="background: var(--surface); border-color: server.enabled ? 'var(--p)' : 'var(--border)'">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-2 flex-1">
                      <input type="checkbox" 
                        checked={server.enabled !== false}
                        onChange={(e) => setServers(prev => prev.map(s => 
                          s.id === server.id ? { ...s, enabled: e.target.checked } : s
                        ))}
                        class="w-4 h-4 rounded cursor-pointer"
                        style="accent-color: var(--p)"
                      />
                      <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-sm text-white">{server.name}</h4>
                        <p class="label-mono mt-0.5 truncate" style="font-size: 8px; color: var(--muted)">{server.provider}</p>
                      </div>
                    </div>
                    <div class="flex gap-1">
                      <button
                        onClick={() => testServerUrl(server.id, 'movie')}
                        class="w-8 h-8 rounded-full flex items-center justify-center transition-all text-xs"
                        style="background: var(--raised); border: 1px solid var(--border); color: var(--muted)"
                        title="Test Movie URL">
                        🎬
                      </button>
                      <button
                        onClick={() => testServerUrl(server.id, 'tv')}
                        class="w-8 h-8 rounded-full flex items-center justify-center transition-all text-xs"
                        style="background: var(--raised); border: 1px solid var(--border); color: var(--muted)"
                        title="Test TV URL">
                        📺
                      </button>
                    </div>
                  </div>

                  {/* URL Templates */}
                  <Show when={editingId() === server.id}
                    fallback={
                      <div class="space-y-2 mb-3">
                        <div class="px-2 py-1.5 rounded-lg text-xs font-mono border" style="background: var(--raised); border-color: var(--border); color: var(--dim); overflow-x-auto; white-space: nowrap">
                          {server.movieUrl}
                        </div>
                        <div class="px-2 py-1.5 rounded-lg text-xs font-mono border" style="background: var(--raised); border-color: var(--border); color: var(--dim); overflow-x-auto; white-space: nowrap">
                          {server.tvUrl}
                        </div>
                      </div>
                    }>
                    <div class="space-y-2 mb-3">
                      <div>
                        <p class="label-mono mb-1" style="font-size: 8px; color: var(--muted)">Movie URL Template</p>
                        <textarea
                          value={editData().movieUrl || server.movieUrl}
                          onInput={(e) => setEditData(prev => ({ ...prev, movieUrl: e.target.value }))}
                          class="w-full px-3 py-2 rounded-lg text-xs font-mono border"
                          rows="2"
                          style="background: var(--raised); border-color: var(--p); color: var(--text)"
                          placeholder="https://example.com/movie/{id}"
                        />
                      </div>
                      <div>
                        <p class="label-mono mb-1" style="font-size: 8px; color: var(--muted)">TV URL Template</p>
                        <textarea
                          value={editData().tvUrl || server.tvUrl}
                          onInput={(e) => setEditData(prev => ({ ...prev, tvUrl: e.target.value }))}
                          class="w-full px-3 py-2 rounded-lg text-xs font-mono border"
                          rows="2"
                          style="background: var(--raised); border-color: var(--p); color: var(--text)"
                          placeholder="https://example.com/tv/{id}/{season}/{episode}"
                        />
                      </div>
                      <p class="label-mono text-[7px]" style="color: var(--dim)">
                        Available variables: {'{id}'}, {'{season}'}, {'{episode}'} OR [TMDB_ID], [SEASON], [EPISODE]
                      </p>
                    </div>
                  </Show>

                  {/* Edit/Save Buttons */}
                  <Show when={editingId() === server.id}
                    fallback={
                      <div class="flex gap-2">
                        <button
                          onClick={() => { setEditingId(server.id); setEditData({ movieUrl: server.movieUrl, tvUrl: server.tvUrl }); }}
                          class="flex-1 px-3 py-1.5 rounded-lg font-bold text-xs uppercase text-black"
                          style="background: var(--p); box-shadow: 0 0 8px var(--p-glow)">
                          Edit URLs
                        </button>
                        <button
                          onClick={() => setReplaceMode(server.id)}
                          class="flex-1 px-3 py-1.5 rounded-lg font-bold text-xs uppercase border"
                          style="background: rgba(var(--p2-rgb, 255,120,196),0.12); color: var(--p2); border-color: var(--p2)">
                          Replace
                        </button>
                      </div>
                    }>
                    <div class="flex gap-2">
                      <button
                        onClick={() => {
                          setServers(prev => prev.map(s => 
                            s.id === server.id ? { ...s, movieUrl: editData().movieUrl, tvUrl: editData().tvUrl } : s
                          ));
                          setEditingId(null);
                        }}
                        class="flex-1 px-3 py-1.5 rounded-lg font-bold text-xs uppercase text-black"
                        style="background: var(--p); box-shadow: 0 0 8px var(--p-glow)">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        class="flex-1 px-3 py-1.5 rounded-lg border"
                        style="background: var(--raised); border-color: var(--border); color: var(--muted)">
                        Cancel
                      </button>
                    </div>
                  </Show>

                  {/* Replace Mode */}
                  <Show when={replaceMode() === server.id}>
                    <div class="mt-3 pt-3 border-t space-y-2" style="border-color: var(--border)">
                      <p class="label-mono text-[8px]" style="color: var(--muted)">Replace with:</p>
                      <div class="grid grid-cols-2 gap-2">
                        <For each={servers().filter(s => s.id !== server.id && s.enabled)}>
                          {(replacement) => (
                            <button
                              onClick={() => replaceServer(server.id, replacement.id)}
                              class="px-2 py-1.5 rounded-lg text-[8px] font-bold text-white transition-all"
                              style="background: var(--p-dim); border: 1px solid var(--p); color: var(--p)">
                              {replacement.name}
                            </button>
                          )}
                        </For>
                      </div>
                      <button
                        onClick={() => setReplaceMode(null)}
                        class="w-full px-2 py-1.5 rounded-lg text-[8px] font-bold border"
                        style="background: var(--raised); border-color: var(--border); color: var(--muted)">
                        Cancel
                      </button>
                    </div>
                  </Show>
                </div>
              )}
            </For>
          </div>
        }>
          <div class="text-center py-12" style="color: var(--muted)">
            <Icon name="hourglass_empty" class="text-5xl mb-3" style="opacity: 0.5" />
            <p class="text-sm font-bold">Loading...</p>
          </div>
        </Show>

        <div class="border-t pt-4 mt-4 flex gap-2 shrink-0" style="border-color: var(--border)">
          <button
            onClick={resetToDefault}
            class="flex-1 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest"
            style="background: rgba(255,45,85,0.12); color: #ff2d55; border: 1px solid rgba(255,45,85,0.3)">
            Reset All
          </button>
          <button
            onClick={saveServerSettings}
            class="flex-1 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest text-black"
            style="background: var(--p); box-shadow: 0 0 16px var(--p-glow)">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
