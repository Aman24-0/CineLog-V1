import { For, Show } from 'solid-js';

export function CastCrewList(props) {
  return (
    <Show when={props.credits}>
        <div class="mb-8">
            <h3 class="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4">Cast & Crew</h3>
            <div class="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
                <For each={props.credits.cast?.slice(0, 8)}>{(c) => (
                    <div onClick={() => props.setPersonId(c.id)} class="flex flex-col items-center min-w-[75px] shrink-0 cursor-pointer group">
                        <img src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}&backgroundColor=171921`} class="w-16 h-16 rounded-full object-cover border border-white/10 mb-2 shadow-lg bg-[#171921] group-hover:border-[var(--primary)] transition-colors" />
                        <p class="text-[9px] font-black text-center text-white truncate w-full group-hover:text-[var(--primary)] transition-colors">{c.name}</p>
                        <p class="text-[7px] text-gray-500 text-center uppercase truncate w-full font-bold mt-0.5">{c.character}</p>
                    </div>
                )}</For>
                <For each={props.credits.crew?.filter(x=>x.job==='Director' || x.job==='Producer').slice(0,3)}>{(c) => (
                    <div onClick={() => props.setPersonId(c.id)} class="flex flex-col items-center min-w-[75px] shrink-0 cursor-pointer group">
                        <img src={c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}&backgroundColor=171921`} class="w-16 h-16 rounded-full object-cover border border-[var(--secondary)] mb-2 shadow-lg bg-[#171921] group-hover:border-[var(--primary)] transition-colors" />
                        <p class="text-[9px] font-black text-center text-white truncate w-full group-hover:text-[var(--primary)] transition-colors">{c.name}</p>
                        <p class="text-[7px] text-[var(--secondary)] text-center uppercase font-black tracking-widest mt-0.5">{c.job}</p>
                    </div>
                )}</For>
            </div>
        </div>
    </Show>
  );
}
