import { For, Show } from 'solid-js';

export function CastCrewList(props) {
  return (
    <Show when={props.credits}>
      {/* mb-8 = 32px = 4×8; mt-6 = 24px = 3×8 */}
      <div class="mb-8 mt-6">
        <h3 class="type-caption text-gray-500 mb-4">Cast &amp; Crew</h3>
        {/* gap-4 = 16px = 2×8; pb-2 = 8px */}
        <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2 stagger">
          {/* Cast */}
          <For each={props.credits.cast?.slice(0, 8)}>{(c) => (
            <div
              onClick={() => props.setPersonId(c.id)}
              class="flex flex-col items-center min-w-[72px] shrink-0 cursor-pointer group animate-fade-up"
            >
              <img
                src={c.profile_path
                  ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                  : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}&backgroundColor=171921`}
                class="w-16 h-16 rounded-full object-cover border border-white/10 mb-2 shadow-lg bg-[#171921]"
                style="opacity: 0; transition: opacity 350ms ease-out, border-color 200ms ease-out"
                onLoad={e => { e.target.style.opacity = '1'; }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--p)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
              <p class="type-caption text-center text-white truncate w-full" style="color: #e8eaf0"
                onMouseEnter={e => { e.target.style.color = 'var(--p)'; }}
                onMouseLeave={e => { e.target.style.color = '#e8eaf0'; }}
              >{c.name}</p>
              <p class="type-caption text-gray-500 text-center truncate w-full mt-0.5" style="font-size: 7px">{c.character}</p>
            </div>
          )}</For>

          {/* Crew */}
          <For each={props.credits.crew?.filter(x => x.job === 'Director' || x.job === 'Producer').slice(0, 3)}>{(c) => (
            <div
              onClick={() => props.setPersonId(c.id)}
              class="flex flex-col items-center min-w-[72px] shrink-0 cursor-pointer group animate-fade-up"
            >
              <img
                src={c.profile_path
                  ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                  : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}&backgroundColor=171921`}
                class="w-16 h-16 rounded-full object-cover mb-2 shadow-lg bg-[#171921]"
                style="opacity: 0; border: 1px solid var(--p2); transition: opacity 350ms ease-out, border-color 200ms ease-out"
                onLoad={e => { e.target.style.opacity = '1'; }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--p)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--p2)'; }}
              />
              <p class="type-caption text-center text-white truncate w-full" style="color: #e8eaf0"
                onMouseEnter={e => { e.target.style.color = 'var(--p)'; }}
                onMouseLeave={e => { e.target.style.color = '#e8eaf0'; }}
              >{c.name}</p>
              <p class="type-caption text-center font-black tracking-widest mt-0.5" style="color: var(--p2); font-size: 7px">{c.job}</p>
            </div>
          )}</For>
        </div>
      </div>
    </Show>
  );
}
