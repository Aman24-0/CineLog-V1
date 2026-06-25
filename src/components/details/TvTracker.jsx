import { Show, For, createMemo } from 'solid-js';
import { Icon } from '../../utils';

export function TvTracker(props) {
  return (
    <>
      <div class="glass-surface rounded-[1.75rem] border border-white/10 mb-6 overflow-hidden shadow-2xl" style="background: linear-gradient(145deg, rgba(14,16,24,0.95), rgba(5,6,10,0.92)); border-color: var(--border-active)">
          <div class="p-5 border-b border-white/5">
              <div class="flex items-center justify-between gap-3 mb-4">
                  <div>
                      <p class="text-[10px] font-black uppercase tracking-[0.22em] flex items-center gap-2" style="color: var(--p)"><Icon name="live_tv" class="text-[15px]"/> Seasons & Episodes</p>
                      <p class="text-[11px] text-gray-500 font-bold mt-1">Track every episode with latest TMDB season data.</p>
                  </div>
                  <Show when={props.movie?.newSeasonAvailable}>
                      <span class="shrink-0 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border" style="color: var(--p); background: var(--p-dim); border-color: var(--p)">New Season</span>
                  </Show>
              </div>
              <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                  <For each={props.tvSeasons}>
                      {(s) => (
                          <button type="button" onClick={() => props.setSelectedSeason(Number(s.season_number))}
                              class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shrink-0 active:scale-95"
                              style={Number(props.selectedSeason) === Number(s.season_number)
                                ? 'background: var(--p); color: #05060a; border-color: var(--p); box-shadow: 0 0 16px var(--p-glow)'
                                : 'background: rgba(255,255,255,0.04); color: var(--muted); border-color: var(--border)'}>
                              S{s.season_number}
                          </button>
                      )}
                  </For>
              </div>
          </div>

          <Show when={!props.seasonsLoading} fallback={
              <div class="p-4 space-y-3">
                  <For each={[1,2,3]}>{() => <div class="h-28 rounded-2xl skeleton-bg border border-white/5" />}</For>
              </div>
          }>
              <div class="p-4 space-y-3 max-h-[560px] overflow-y-auto hide-scrollbar">
                  <Show when={props.selectedSeasonEpisodes?.length > 0} fallback={
                      <div class="text-center py-10">
                          <Icon name="live_tv" class="text-4xl text-gray-700 mb-2" />
                          <p class="text-xs font-bold text-gray-500">Episode data is not available yet.</p>
                      </div>
                  }>
                      <For each={props.selectedSeasonEpisodes}>
                          {(ep) => {
                              const epId = props.episodeDocId(ep.season_number || props.selectedSeason, ep.episode_number);
                              const watched = () => !!props.watchedEpisodes[epId]?.watched;
                              const expanded = () => !!props.expandedEpisodes[epId];
                              return (
                                <div class="group rounded-2xl border border-white/5 bg-black/30 hover:bg-white/[0.035] hover:border-[var(--p)]/40 transition-all overflow-hidden">
                                  <div class="flex gap-3 p-3">
                                      <div class="relative w-28 sm:w-36 aspect-video rounded-xl overflow-hidden bg-[#11131b] shrink-0 border border-white/5">
                                          <Show when={ep.still_path} fallback={<div class="w-full h-full skeleton-bg flex items-center justify-center"><Icon name="movie" class="text-2xl text-gray-700" /></div>}>
                                              <img src={`https://image.tmdb.org/t/p/w300${ep.still_path}`} loading="lazy" class={`w-full h-full object-cover transition-all duration-300 ${watched() ? 'opacity-45 grayscale' : 'group-hover:scale-105'}`} />
                                          </Show>
                                          <Show when={watched()}>
                                              <div class="absolute inset-0 flex items-center justify-center bg-black/20"><Icon name="check_circle" fill class="text-3xl" style="color: var(--p)" /></div>
                                          </Show>
                                      </div>
                                      <div class="min-w-0 flex-1">
                                          <div class="flex items-start justify-between gap-3">
                                              <div class="min-w-0">
                                                  <h4 class="font-black text-white text-sm leading-snug">E{ep.episode_number} — {ep.name || 'Untitled Episode'}</h4>
                                                  <div class="flex flex-wrap gap-2 mt-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-500">
                                                      <span>{ep.air_date || 'Air date TBA'}</span>
                                                      <Show when={ep.runtime}><span>• {ep.runtime} min</span></Show>
                                                  </div>
                                              </div>
                                              <button type="button" onClick={(e) => { e.stopPropagation(); props.toggleEpisodeWatched(ep); }}
                                                  class="shrink-0 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border active:scale-95"
                                                  style={watched()
                                                    ? 'background: var(--p2); color: #05060a; border-color: var(--p2); box-shadow: 0 0 16px rgba(255,255,255,0.08)'
                                                    : 'background: var(--p-dim); color: var(--p); border-color: var(--p)'}>
                                                  {watched() ? 'Watched ✓' : 'Watch'}
                                              </button>
                                          </div>
                                          <button type="button" onClick={() => props.setExpandedEpisodes(prev => ({ ...prev, [epId]: !expanded() }))} class="text-left w-full mt-2">
                                              <p class={`text-xs text-gray-400 leading-relaxed transition-all duration-300 ${expanded() ? '' : 'line-clamp-2'}`}>{ep.overview || 'No episode overview available.'}</p>
                                              <span class="inline-flex items-center gap-1 mt-1 text-[9px] font-black uppercase tracking-widest" style="color: var(--p)">{expanded() ? 'Show less' : 'More'} <Icon name={expanded() ? 'expand_less' : 'expand_more'} class="text-xs" /></span>
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

      <div class="glass-surface p-5 rounded-2xl border border-white/5 mb-6">
          <div class="flex justify-between items-center mb-3">
              <span class="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Icon name="video_library" class="text-[14px] text-[var(--primary)]"/> Tracker</span>
              <span class="font-black text-sm text-white">{props.isCompleted ? 'Completed' : `S${props.currentSeasonNumber} E${props.currentEpisodeNumber}`}</span>
          </div>
          <div class="w-full h-2 bg-black rounded-full overflow-hidden mb-4"><div class="h-full bg-[var(--primary)] transition-all shadow-[0_0_10px_var(--primary)]" style={{width:`${props.progressPct}%`}}></div></div>
          <Show when={!props.isCompleted}>
              <button onClick={() => props.toggleEpisodeWatched(props.getCurrentEpisode())} class="w-full rounded-xl py-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all" style="background: var(--p-dim); color: var(--p); border: 1px solid var(--p)">Mark Current Watched → Next Episode</button>
          </Show>
      </div>
    </>
  );
}
