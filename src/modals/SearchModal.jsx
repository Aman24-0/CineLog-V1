import { createSignal, createEffect, For, Show } from 'solid-js';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, TMDB_KEY } from '../utils';
import { PersonModal } from './PersonModal';

export function SearchModal(props) {
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [personId, setPersonId] = createSignal(null);

  createEffect(() => {
    if (query().length > 2) {
      setLoading(true);
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${encodeURIComponent(query())}`)
        .then(r => r.json())
        .then(d => {
            setResults((d.results || []).filter(item => item.media_type === 'movie' || item.media_type === 'tv' || item.media_type === 'person'));
            setLoading(false);
        });
    } else { setResults([]); }
  });

  const addMovie = async (item, e) => {
    if (e) e.stopPropagation();
    props.showToast("Adding to Vault...");
    try {
        const tmdbData = await (await fetch(`https://api.themoviedb.org/3/${item.media_type}/${item.id}?api_key=${TMDB_KEY}&append_to_response=credits`)).json();
        const castNames = tmdbData.credits?.cast?.slice(0, 5).map(c => c.name) || [];
        const director = tmdbData.credits?.crew?.find(c => c.job === 'Director')?.name || '';
        const castList = [...castNames, director].filter(Boolean);

        const movieData = {
            id: String(item.id),
            title: item.title || item.name,
            media_type: item.media_type,
            poster_path: item.poster_path,
            backdrop_path: item.backdrop_path,
            release_date: item.release_date || item.first_air_date || '',
            status: 'Planned',
            addedAt: new Date(),
            castList: castList 
        };
        await setDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), movieData);
        props.showToast("Added Successfully! 🍿");
        props.onClose();
    } catch(err) { props.showToast("Error adding to vault."); }
  };

  return (
    <div class="fixed inset-0 z-[999999] flex items-start justify-center pt-20 p-4 animate-fade-in" onClick={props.onClose}>
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none"></div>
      <div class="w-full max-w-xl bg-[#08090b] rounded-[2rem] border border-white/10 relative shadow-2xl overflow-hidden animate-pop-in flex flex-col max-h-[80vh]" onClick={e=>e.stopPropagation()}>
        
        <div class="p-4 border-b border-white/5 flex items-center gap-3">
          <Icon name="search" class="text-gray-400 text-xl" />
          <input autofocus value={query()} onInput={e => setQuery(e.target.value)} placeholder="Search movies, series, or actors..." class="bg-transparent border-none w-full outline-none text-white font-bold placeholder-gray-600" />
          <button onClick={props.onClose} class="text-gray-500 hover:text-white p-2 active:scale-95"><Icon name="close" /></button>
        </div>

        <div class="overflow-y-auto hide-scrollbar flex-1 p-2">
          <Show when={loading()}><div class="text-center p-8 text-gray-500"><Icon name="radar" class="text-3xl animate-spin"/></div></Show>
          
          <div class="space-y-1">
            <For each={results()}>{(item) => {
              const isSaved = props.watchlist.some(w => String(w.id) === String(item.id));
              
              if(item.media_type === 'person') {
                  return (
                      <div onClick={() => setPersonId(item.id)} class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-[var(--primary)]/30 group">
                          <img src={item.profile_path ? `https://image.tmdb.org/t/p/w92${item.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}&backgroundColor=171921`} class="w-12 h-12 rounded-full object-cover border border-white/10 group-hover:border-[var(--primary)]" />
                          <div class="flex-1">
                              <h4 class="text-sm font-bold text-white">{item.name}</h4>
                              <p class="text-[9px] text-[var(--primary)] uppercase font-black tracking-widest">{item.known_for_department === 'Directing' ? '[DIRECTOR]' : '[ACTOR]'}</p>
                          </div>
                          <Icon name="chevron_right" class="text-gray-500 group-hover:text-[var(--primary)]" />
                      </div>
                  );
              }

              return (
                <div onClick={() => !isSaved && props.openPreview(item)} class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-white/10 group">
                  <img src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : 'https://via.placeholder.com/92x138/171921/b1a1ff?text=NA'} class="w-12 h-16 object-cover rounded-lg shadow border border-white/5" />
                  <div class="flex-1 overflow-hidden pr-2">
                    <h4 class="text-sm font-bold text-white truncate">{item.title || item.name}</h4>
                    <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">{item.media_type === 'tv' ? 'Series' : 'Movie'} • {(item.release_date || item.first_air_date || 'N/A').substring(0,4)}</p>
                  </div>
                  <button disabled={isSaved} onClick={(e) => addMovie(item, e)} class={`w-10 h-10 rounded-full flex items-center justify-center border transition-all shrink-0 ${isSaved ? 'bg-[var(--primary)] border-[var(--primary)] text-[#0c0e14]' : 'bg-transparent border-white/20 text-white hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-95'}`}>
                    <Icon name={isSaved ? "check" : "add"} class="text-sm" />
                  </button>
                </div>
              );
            }}</For>
          </div>
        </div>
      </div>
      
      <Show when={personId()}>
          <PersonModal personId={personId()} uid={props.uid} watchlist={props.watchlist} showToast={props.showToast} onClose={() => setPersonId(null)} openPreview={(item) => props.openPreview(item)} />
      </Show>
    </div>
  );
}
