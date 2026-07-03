import { Show, For } from 'solid-js';
import { SafeInfoRow, Icon } from '../../utils';

const formatMoney = (amount) => {
  if (!amount || amount <= 0) return null;
  if (amount >= 1_000_000_000) {
    const b = amount / 1_000_000_000;
    return `$${b % 1 === 0 ? b.toFixed(0) : b.toFixed(2)} billion`;
  }
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} million`;
  }
  return `$${amount.toLocaleString()}`;
};

export function InfoGrid(props) {
  const isMovie     = () => props.movie?.media_type !== 'tv';
  const budgetText  = () => formatMoney(props.details?.budget);
  const revenueText = () => formatMoney(props.details?.revenue);

  return (
    <div class="glass-surface p-5 rounded-2xl space-y-4 border border-white/5 animate-fade-up"
      style="box-shadow: var(--shadow-card)">

      <Show when={!props.isPreview}>
        <SafeInfoRow icon="adjust" label="Status" value={
          <span class="type-caption" style="color: var(--p)">{props.movie?.status || 'Planned'}</span>
        }/>
      </Show>

      <Show when={!props.isPreview && (props.movie?.media_type !== 'tv' || !props.movie?.seasonDates || Object.keys(props.movie?.seasonDates || {}).length === 0)}>
        <SafeInfoRow icon="calendar_today" label="Watch Date" value={
          <span class="type-metadata text-gray-300">{props.movie?.watchDate || 'Not set'}</span>
        }/>
      </Show>

      <Show when={!props.isPreview}>
        <SafeInfoRow icon="public" label="Region" value={
          <span class="type-metadata">{props.movie?.region || 'International'}</span>
        }/>
      </Show>

      <SafeInfoRow icon="format_list_bulleted" label="Genre" value={
        <span class="type-metadata text-gray-300">{props.genresText}</span>
      }/>

      <Show when={props.details?.original_language}>
        <SafeInfoRow icon="language" label="Languages" value={
          <div class="flex flex-col gap-1 mt-0.5">
            <span class="type-metadata text-gray-200 flex items-center gap-2">
              <span class="type-caption bg-white/10 px-1.5 py-0.5 rounded text-gray-400">Orig</span>
              {props.details.original_language.toUpperCase()}
            </span>
            <Show when={props.details?.spoken_languages?.length > 0 && props.details.spoken_languages.some(l => l.iso_639_1 !== props.details.original_language)}>
              <span class="type-metadata text-gray-400 flex items-start gap-2 leading-tight">
                <span class="type-caption px-1.5 py-0.5 rounded mt-0.5"
                  style="background: var(--p-dim); color: var(--p); border: 1px solid color-mix(in srgb, var(--p) 20%, transparent)">Dub</span>
                <span class="flex-1">{props.details.spoken_languages.filter(l => l.iso_639_1 !== props.details.original_language).map(l => l.english_name || l.name).join(', ')}</span>
              </span>
            </Show>
          </div>
        }/>
      </Show>

      <Show when={isMovie() && budgetText()}>
        <SafeInfoRow icon="payments" label="Budget" value={
          <span class="type-metadata font-bold text-gray-300">{budgetText()}</span>
        }/>
      </Show>

      <Show when={isMovie() && revenueText()}>
        <SafeInfoRow icon="trending_up" label="Box Office" value={
          <span class="type-metadata font-bold text-gray-300">{revenueText()}</span>
        }/>
      </Show>

      <SafeInfoRow icon="connected_tv" label="Available On" value={
        <Show when={props.richPlatforms?.length > 0} fallback={
          <span class="type-metadata font-bold text-gray-500">-</span>
        }>
          <div class="flex flex-wrap gap-2 mt-1">
            <For each={props.richPlatforms.slice(0, 6)}>{(p) => (
              <a
                href={p.url} target="_blank" rel="noopener noreferrer" title={p.name}
                class="flex flex-col items-center gap-1 px-2 py-2 rounded-xl group min-w-[58px]"
                style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); box-shadow: var(--shadow-card); transition: background 150ms ease-out, border-color 150ms ease-out, box-shadow 150ms ease-out"
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--p-dim)'; e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--p) 35%, transparent)'; e.currentTarget.style.boxShadow = 'var(--shadow-raised)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
              >
                <Show when={!p.isCss && p.logo} fallback={
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center type-caption"
                    style={{ "background-color": p.color || 'var(--p-dim)', color: p.color === '#ffffff' ? '#000' : 'var(--p)' }}>
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                }>
                  <img src={p.logo} alt={p.name}
                    class="w-7 h-7 rounded-lg object-cover bg-black border border-white/10 poster-img img-loaded"
                    loading="lazy"
                    onLoad={e => e.target.classList.add('img-loaded')} />
                </Show>
                <span class="type-caption text-gray-300 group-hover:text-white max-w-[54px] truncate"
                  style="transition: color 150ms ease-out">{p.name}</span>
              </a>
            )}</For>
          </div>
        </Show>
      }/>

      <Show when={!props.isPreview && props.movie?.tag}>
        <SafeInfoRow icon="label" label="Tag" value={
          <span class="type-caption bg-white/10 text-white px-2 py-0.5 rounded border border-white/20">{props.movie.tag}</span>
        }/>
      </Show>

      <Show when={!props.isPreview && props.movieFranchises}>
        <SafeInfoRow icon="folder_special" label="Lists" value={
          <span class="type-metadata font-bold text-white">{props.movieFranchises}</span>
        }/>
      </Show>

      <Show when={!props.isPreview && props.movie?.notes && typeof props.movie.notes === 'string'}>
        <div class="border-t border-white/5 pt-4 mt-4">
          <p class="type-caption text-gray-500 mb-2 flex items-center gap-1">
            <Icon name="edit_note" class="text-[14px]"/> Notes
          </p>
          <p class="type-metadata text-gray-300 italic">"{props.movie.notes}"</p>
        </div>
      </Show>

      {/* ── More Like This ── */}
      <Show when={props.similarItems?.length > 0}>
        <div class="mt-6">
          <h3 class="type-caption text-gray-500 mb-4 px-1 flex items-center gap-2">
            <Icon name="auto_awesome" style="color: var(--p); font-size: 12px"/> More Like This
          </h3>
          <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-2 stagger">
            <For each={props.similarItems}>{(item) => (
              <div
                onClick={() => props.onSimilarClick(item)}
                class="min-w-[110px] w-[110px] shrink-0 cursor-pointer group animate-fade-up"
              >
                {/* Poster with skeleton */}
                <div class="w-full h-[160px] rounded-xl overflow-hidden relative mb-2 border border-white/5"
                  style="background: #141414; box-shadow: var(--shadow-card)">
                  <div class="poster-loading" />
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    class="poster-img absolute inset-0 w-full h-full object-cover"
                    onLoad={e => { e.target.classList.add('img-loaded'); e.target.previousSibling?.classList.add('hidden'); }}
                    style="border-radius: inherit"
                  />
                </div>
                <p class="type-caption text-gray-300 group-hover:text-white line-clamp-2 leading-tight"
                  style="transition: color 150ms ease-out">{item.title || item.name}</p>
              </div>
            )}</For>
          </div>
        </div>
      </Show>

      {/* ── Season Timeline ── */}
      <Show when={!props.isPreview && props.movie?.media_type === 'tv' && props.movie?.seasonDates && Object.keys(props.movie.seasonDates).length > 0 && Object.keys(props.movie.seasonDates).some(k => props.movie.seasonDates[k].start || props.movie.seasonDates[k].end)}>
        <div class="border-t border-white/5 pt-4 mt-4">
          <p class="type-caption flex items-center gap-1.5 mb-3" style="color: var(--p)">
            <Icon name="history" class="text-[14px]"/> Season Timeline
          </p>
          <div class="space-y-2">
            <For each={Object.entries(props.movie.seasonDates).filter(e => e[1].start || e[1].end).sort((a,b) => Number(a[0]) - Number(b[0]))}>
              {([s, d]) => {
                const days = props.calculateDays(d.start, d.end);
                const formatD = (ds) => ds
                  ? new Date(ds).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
                  : 'Present';
                return (
                  <div class="flex justify-between items-center px-3 py-2.5 rounded-xl border border-white/5"
                    style="background: rgba(0,0,0,0.40); box-shadow: inset 0 1px 0 rgba(255,255,255,0.03)">
                    <span class="type-caption text-white">Season {s}</span>
                    <div class="flex items-center gap-2.5">
                      <span class="type-caption text-gray-300 flex items-center gap-1.5">
                        {formatD(d.start)}
                        <Icon name="arrow_forward" class="text-[10px] text-gray-500"/>
                        {d.end ? formatD(d.end) : <span class="text-gray-500">Present</span>}
                      </span>
                      <Show when={days !== null}>
                        <span class="type-caption px-1.5 py-0.5 rounded"
                          style="background: var(--p-dim); color: var(--p); border: 1px solid color-mix(in srgb, var(--p) 20%, transparent)">
                          {days}d
                        </span>
                      </Show>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}
