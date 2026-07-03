import { For, Show } from 'solid-js';

export function CastCrewList(props) {
  return (
    <Show when={props.credits}>
      <div class="mb-8 mt-6">
        <h3 class="type-caption text-gray-500 mb-4">Cast &amp; Crew</h3>
        <div class="flex gap-4 overflow-x-auto hide-scrollbar pb-2 stagger">

          {/* Cast */}
          <For each={props.credits.cast?.slice(0, 8)}>{(c) => (
            <div
              onClick={() => props.setPersonId(c.id)}
              class="flex flex-col items-center min-w-[72px] shrink-0 cursor-pointer group animate-fade-up"
            >
              {/* Avatar — skeleton + fade-in */}
              <div class="w-16 h-16 rounded-full overflow-hidden relative mb-2 border border-white/10 shrink-0"
                style="background: #171921; box-shadow: 0 4px 12px rgba(0,0,0,0.5); transition: border-color 150ms ease-out, box-shadow 150ms ease-out"
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--p)'; e.currentTarget.style.boxShadow = '0 0 12px var(--p-glow), 0 4px 12px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)'; }}
              >
                <div class="poster-loading" style="border-radius: 50%" />
                <img
                  src={c.profile_path
                    ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name)}&backgroundColor=171921`}
                  class="poster-img absolute inset-0 w-full h-full object-cover"
                  onLoad={e => { e.target.classList.add('img-loaded'); e.target.previousSibling?.classList.add('hidden'); }}
                  alt={c.name}
                />
              </div>
              <p class="type-caption text-center text-gray-200 group-hover:text-white truncate w-full"
                style="transition: color 150ms ease-out">{c.name}</p>
              <p class="type-caption text-gray-600 text-center truncate w-full mt-0.5"
                style="font-size: 7px">{c.character}</p>
            </div>
          )}</For>

          {/* Crew (Director, Producer) */}
          <For each={props.credits.crew?.filter(x => x.job === 'Director' || x.job === 'Producer').slice(0, 3)}>{(c) => (
            <div
              onClick={() => props.setPersonId(c.id)}
              class="flex flex-col items-center min-w-[72px] shrink-0 cursor-pointer group animate-fade-up"
            >
              <div class="w-16 h-16 rounded-full overflow-hidden relative mb-2 shrink-0"
                style="background: #171921; box-shadow: 0 4px 12px rgba(0,0,0,0.5); border: 1px solid var(--p2); transition: border-color 150ms ease-out, box-shadow 150ms ease-out"
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--p)'; e.currentTarget.style.boxShadow = '0 0 12px var(--p-glow), 0 4px 12px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--p2)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)'; }}
              >
                <div class="poster-loading" style="border-radius: 50%" />
                <img
                  src={c.profile_path
                    ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name)}&backgroundColor=171921`}
                  class="poster-img absolute inset-0 w-full h-full object-cover"
                  onLoad={e => { e.target.classList.add('img-loaded'); e.target.previousSibling?.classList.add('hidden'); }}
                  alt={c.name}
                />
              </div>
              <p class="type-caption text-center text-gray-200 group-hover:text-white truncate w-full"
                style="transition: color 150ms ease-out">{c.name}</p>
              <p class="type-caption text-center font-black tracking-widest mt-0.5"
                style="color: var(--p2); font-size: 7px">{c.job}</p>
            </div>
          )}</For>

        </div>
      </div>
    </Show>
  );
}
