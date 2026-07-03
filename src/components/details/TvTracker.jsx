import { Show, For } from 'solid-js';
import { Icon } from '../../utils';

export function TvTracker(props) {
  const previewMode = () => !!props.isPreviewMode;

  return (
    <>
      {/* Season selector + episodes — mb-6 = 24px = 3×8 */}
      <div
        class="glass-surface rounded-[1.75rem] border mb-6 overflow-hidden shadow-2xl"
        style="background: linear-gradient(145deg, rgba(14,16,24,0.95), rgba(5,6,10,0.92)); border-color: var(--border-active)"
      >
        {/* Header — p-5 = 20px; mb-4 = 16px */}
        <div class="p-5 border-b border-white/5">
          <div class="flex items-center justify-between gap-3 mb-4">
            <div>
              <p class="type-caption flex items-center gap-2" style="color: var(--p)">
                <Icon name="live_tv" class="text-[15px]"/>
                <Show when={previewMode()} fallback="Seasons & Episodes">Season Preview</Show>
              </p>
              <p class="type-metadata text-gray-500 mt-1">
                <Show when={previewMode()} fallback="Track every episode with latest TMDB season data.">
                  Browse seasons &amp; episodes — add to Vault to start tracking.
                </Show>
              </p>
            </div>
            <Show when={props.movie?.newSeasonAvailable}>
              <span class="shrink-0 type-caption px-2.5 py-1 rounded-full border" style="color: var(--p); background: var(--p-dim); border-color: var(--p)">
                New Season
              </span>
            </Show>
          </div>

          {/* Season pills — gap-2 = 8px; pb-1 = 4px */}
          <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            <For each={props.tvSeasons}>
              {(s) => (
                <button
                  type="button"
                  onClick={() => props.setSelectedSeason(Number(s.season_number))}
                  class="px-4 py-2 rounded-xl type-caption border shrink-0 active:scale-95"
                  style={Number(props.selectedSeason) === Number(s.season_number)
                    ? 'background: var(--p); color: #05060a; border-color: var(--p); box-shadow: 0 0 16px var(--p-glow)'
                    : 'background: rgba(255,255,255,0.04); color: var(--muted); border-color: var(--border)'}
                >
                  S{s.season_number}
                </button>
              )}
            </For>
          </div>
        </div>

        {/* Episode list */}
        <Show when={!props.seasonsLoading} fallback={
          <div class="p-4 space-y-3">
            <For each={[1,2,3]}>{() => (
              <div class="h-28 rounded-2xl skeleton-bg border border-white/5" />
            )}</For>
          </div>
        }>
          {/* p-4 = 16px; space-y-3 = 12px */}
          <div class="p-4 space-y-3 max-h-[560px] overflow-y-auto hide-scrollbar">
            <Show when={props.selectedSeasonEpisodes?.length > 0} fallback={
              <div class="text-center py-10">
                <Icon name="live_tv" class="text-4xl text-gray-700 mb-2" />
                <p class="type-metadata font-bold text-gray-500">Episode data is not available yet.</p>
              </div>
            }>
              <For each={props.selectedSeasonEpisodes}>
                {(ep) => {
                  const epId   = props.episodeDocId(ep.season_number || props.selectedSeason, ep.episode_number);
                  const watched = () => previewMode() ? false : props.checkIfWatched(ep.season_number || props.selectedSeason, ep.episode_number);
                  const expanded = () => !!props.expandedEpisodes[epId];

                  return (
                    <div class="group rounded-2xl border border-white/5 bg-black/30 hover:bg-white/[0.035] overflow-hidden animate-fade-up"
                      style="transition: background 200ms ease-out, border-color 200ms ease-out"
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--p) 30%, transparent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                    >
                      {/* gap-3 = 12px; p-3 = 12px */}
                      <div class="flex gap-3 p-3">
                        {/* Thumbnail */}
                        <div class="relative w-28 sm:w-36 aspect-video rounded-xl overflow-hidden bg-[#11131b] shrink-0 border border-white/5">
                          <Show when={ep.still_path} fallback={
                            <div class="w-full h-full skeleton-bg flex items-center justify-center">
                              <Icon name="movie" class="text-2xl text-gray-700" />
                            </div>
                          }>
                            <img
                              src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                              loading="lazy"
                              class={`w-full h-full object-cover transition-all duration-300 ${watched() ? 'opacity-45 grayscale' : ''}`}
                              style="opacity: 0; transition: opacity 350ms ease-out, transform 300ms ease-out"
                              onLoad={e => { e.target.style.opacity = watched() ? '0.45' : '1'; }}
                              onMouseEnter={e => { if (!watched()) e.target.style.transform = 'scale(1.05)'; }}
                              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                            />
                          </Show>
                          <Show when={watched()}>
                            <div class="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Icon name="check_circle" fill class="text-3xl" style="color: var(--p)" />
                            </div>
                          </Show>
                        </div>

                        {/* Info */}
                        <div class="min-w-0 flex-1">
                          <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0">
                              <h4 class="type-card-title text-white leading-snug" style="font-size: 13px; font-weight: 900">
                                E{ep.episode_number} — {ep.name || 'Untitled Episode'}
                              </h4>
                              {/* gap-2 = 8px; mt-1.5 = 6px */}
                              <div class="flex flex-wrap gap-2 mt-1.5 type-caption text-gray-500">
                                <span>{ep.air_date || 'Air date TBA'}</span>
                                <Show when={ep.runtime}><span>• {ep.runtime} min</span></Show>
                              </div>
                            </div>

                            {/* Watch toggle button */}
                            <Show when={!previewMode()}>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); props.toggleEpisodeWatched(ep); }}
                                class="shrink-0 px-3 py-2 rounded-xl type-caption border active:scale-95"
                                style={watched()
                                  ? 'background: var(--p2); color: #05060a; border-color: var(--p2); box-shadow: 0 0 16px rgba(255,255,255,0.08)'
                                  : 'background: var(--p-dim); color: var(--p); border-color: var(--p)'}
                              >
                                {watched() ? 'Watched ✓' : 'Watch'}
                              </button>
                            </Show>
                          </div>

                          {/* Expand/collapse overview — mt-2 = 8px */}
                          <button
                            type="button"
                            onClick={() => props.setExpandedEpisodes(prev => ({ ...prev, [epId]: !expanded() }))}
                            class="text-left w-full mt-2"
                          >
                            <p class={`type-metadata text-gray-400 leading-relaxed ${expanded() ? '' : 'line-clamp-2'}`}
                              style="transition: max-height 220ms ease-out"
                            >
                              {ep.overview || 'No episode overview available.'}
                            </p>
                            <span class="inline-flex items-center gap-1 mt-1 type-caption" style="color: var(--p)">
                              {expanded() ? 'Show less' : 'More'}
                              <Icon name={expanded() ? 'expand_less' : 'expand_more'} class="text-xs" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>
            </Show>
          </div>
        </Show>
      </div>

      {/* Progress tracker bar — non-preview only */}
      <Show when={!previewMode()}>
        {/* p-5 = 20px; mb-6 = 24px = 3×8; mb-4 = 16px = 2×8 */}
        <div class="glass-surface p-5 rounded-2xl border border-white/5 mb-6 animate-fade-up">
          <div class="flex justify-between items-center mb-3">
            <span class="type-caption text-gray-400 flex items-center gap-2">
              <Icon name="video_library" class="text-[14px]" style="color: var(--p)"/> Tracker
            </span>
            <span class="type-metadata font-black text-white">
              {props.isCompleted ? 'Completed' : `S${props.currentSeasonNumber} E${props.currentEpisodeNumber}`}
            </span>
          </div>
          <div class="w-full h-2 bg-black rounded-full overflow-hidden mb-4">
            <div
              class="h-full rounded-full"
              style={{ width: `${props.progressPct}%`, background: 'var(--p)', 'box-shadow': '0 0 10px var(--p-glow)', transition: 'width 500ms ease-out' }}
            />
          </div>
          <Show when={!props.isCompleted}>
            <button
              onClick={() => props.toggleEpisodeWatched(props.getCurrentEpisode())}
              class="w-full rounded-xl py-2 type-caption active:scale-95"
              style="background: var(--p-dim); color: var(--p); border: 1px solid var(--p)"
            >
              Mark Current Watched → Next Episode
            </button>
          </Show>
        </div>
      </Show>
    </>
  );
}
