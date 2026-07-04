import { Show, For } from 'solid-js';
import { Icon } from '../../utils';

// Accessible label component
const FieldLabel = (props) => (
  <label
    for={props.for}
    class="type-label block mb-2"
    style="color: var(--muted)"
  >
    {props.children}
  </label>
);

// Consistent input component
const FieldInput = (props) => {
  const { class: extraClass, ...rest } = props;
  return (
    <input
      {...rest}
      class={`w-full bg-[#0c0e14] border border-white/10 p-3 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)] focus:shadow-[0_0_0_3px_var(--p-dim)] placeholder-gray-700 transition-all ${extraClass || ''}`}
    />
  );
};

export function EditForm(props) {
  return (
    <div
      class="glass-surface p-5 rounded-2xl space-y-5 animate-fade-in border mt-4 shadow-xl"
      style="border-color: var(--border-active)"
      role="form"
      aria-label="Edit vault entry"
    >

      {/* Row 1: Status + Rating */}
      <div class="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel for="edit-status">Status</FieldLabel>
          <select
            id="edit-status"
            value={props.form.status}
            onChange={e => props.setForm({ ...props.form, status: e.target.value })}
            class="w-full bg-[#0c0e14] border border-white/10 p-3 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)] focus:shadow-[0_0_0_3px_var(--p-dim)] transition-all"
          >
            <option value="Planned">Planned</option>
            <option value="Watching">Watching</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <FieldLabel for="edit-rating">My Rating</FieldLabel>
          <FieldInput
            id="edit-rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="0–10"
            value={props.form.rating}
            onInput={e => props.setForm({ ...props.form, rating: e.target.value })}
          />
        </div>
      </div>

      {/* TV: Season + Episode */}
      <Show when={props.movie?.media_type === 'tv'}>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel for="edit-season">Current Season</FieldLabel>
            <FieldInput
              id="edit-season"
              type="number"
              min="1"
              placeholder="1"
              value={props.form.season}
              onInput={e => props.setForm({ ...props.form, season: e.target.value })}
            />
          </div>
          <div>
            <FieldLabel for="edit-episode">Current Episode</FieldLabel>
            <FieldInput
              id="edit-episode"
              type="number"
              min="1"
              placeholder="1"
              value={props.form.episode}
              onInput={e => props.setForm({ ...props.form, episode: e.target.value })}
            />
          </div>
        </div>
      </Show>

      {/* Watch Date + Region */}
      <div class="grid grid-cols-2 gap-4">
        <Show when={props.movie?.media_type === 'movie'}>
          <div>
            <FieldLabel for="edit-watchdate">Watch Date</FieldLabel>
            <FieldInput
              id="edit-watchdate"
              type="date"
              value={props.form.watchDate}
              onInput={e => props.setForm({ ...props.form, watchDate: e.target.value })}
              class="[color-scheme:dark]"
            />
          </div>
        </Show>
        <div class={props.movie?.media_type === 'tv' ? 'col-span-2' : ''}>
          <FieldLabel for="edit-region">Region</FieldLabel>
          <select
            id="edit-region"
            value={props.form.region}
            onChange={e => props.setForm({ ...props.form, region: e.target.value })}
            class="w-full bg-[#0c0e14] border border-white/10 p-3 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)] focus:shadow-[0_0_0_3px_var(--p-dim)] transition-all"
          >
            <option value="International">International</option>
            <option value="Indian">Indian</option>
          </select>
        </div>
      </div>

      {/* TV: Season Timelines */}
      <Show when={props.movie?.media_type === 'tv'}>
        <div>
          <FieldLabel>
            <span class="flex items-center gap-1.5">
              <Icon name="history" class="text-[14px]" aria-hidden="true" />
              Season Timelines
            </span>
          </FieldLabel>
          <div
            class="space-y-2 bg-black/40 p-3 rounded-2xl border border-white/5 shadow-inner max-h-48 overflow-y-auto hide-scrollbar"
            role="group"
            aria-label="Season start and end dates"
          >
            <For each={Array.from({ length: Math.max(1, parseInt(props.form.season) || 1) })}>
              {(_, i) => {
                const s = i() + 1;
                const d = props.form.seasonDates[s] || { start: '', end: '' };
                return (
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 bg-[#0c0e14] p-2.5 rounded-xl border border-white/5">
                    <span
                      class="type-caption w-8 text-center py-1.5 rounded-lg shrink-0"
                      style="color: var(--p); background: var(--p-dim)"
                      aria-label={`Season ${s}`}
                    >
                      S{s}
                    </span>
                    <div class="flex flex-1 items-center gap-2">
                      <div class="flex-1">
                        <label class="sr-only" for={`season-${s}-start`}>Season {s} start date</label>
                        <input
                          id={`season-${s}-start`}
                          type="date"
                          value={d.start}
                          onInput={e => props.setForm({
                            ...props.form,
                            seasonDates: { ...props.form.seasonDates, [s]: { ...(props.form.seasonDates[s] || {}), start: e.target.value } }
                          })}
                          class="w-full bg-transparent border-b border-white/10 p-1 type-metadata text-white [color-scheme:dark] outline-none focus:border-[var(--p)]"
                          title={`Season ${s} Start Date`}
                        />
                      </div>
                      <Icon name="arrow_forward" class="text-gray-600 text-[12px] shrink-0" aria-hidden="true" />
                      <div class="flex-1">
                        <label class="sr-only" for={`season-${s}-end`}>Season {s} end date</label>
                        <input
                          id={`season-${s}-end`}
                          type="date"
                          value={d.end}
                          onInput={e => props.setForm({
                            ...props.form,
                            seasonDates: { ...props.form.seasonDates, [s]: { ...(props.form.seasonDates[s] || {}), end: e.target.value } }
                          })}
                          class="w-full bg-transparent border-b border-white/10 p-1 type-metadata text-white [color-scheme:dark] outline-none focus:border-[var(--p)]"
                          title={`Season ${s} End Date`}
                        />
                      </div>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </Show>

      {/* Custom Tag */}
      <div>
        <FieldLabel for="edit-tag">Custom Tag</FieldLabel>
        <FieldInput
          id="edit-tag"
          placeholder="e.g. Theatre, Rewatch…"
          value={props.form.tag}
          onInput={e => props.setForm({ ...props.form, tag: e.target.value })}
        />
      </div>

      {/* Platforms */}
      <div>
        <FieldLabel>Platforms Watched On</FieldLabel>
        <Show
          when={props.allAvailablePlatforms().length > 0}
          fallback={
            <p class="type-caption text-gray-600 px-1">No platforms in your vault yet. Add entries first.</p>
          }
        >
          <div
            class="flex flex-wrap gap-2 p-3 bg-[#0c0e14] border border-white/5 rounded-xl"
            role="group"
            aria-label="Select platforms"
          >
            <For each={props.allAvailablePlatforms()}>
              {p => {
                const isSelected = () => props.form.platforms.split(',').map(s => s.trim()).includes(p);
                return (
                  <button
                    type="button"
                    onClick={() => props.togglePlatform(p)}
                    class="px-3 py-1.5 rounded-lg type-caption active:scale-95 border shadow-sm transition-all"
                    style={isSelected()
                      ? 'background: var(--p); color: #000; border-color: var(--p); box-shadow: 0 0 12px var(--p-glow)'
                      : 'background: rgba(255,255,255,0.05); color: #9ca3af; border-color: rgba(255,255,255,0.08)'}
                    aria-pressed={isSelected()}
                    aria-label={`${isSelected() ? 'Remove' : 'Add'} ${p}`}
                  >
                    {p}
                  </button>
                );
              }}
            </For>
          </div>
        </Show>
      </div>

      {/* Genres */}
      <div>
        <FieldLabel for="edit-genres">Genres</FieldLabel>
        <FieldInput
          id="edit-genres"
          placeholder="Action, Drama, Sci-Fi…"
          value={props.form.genres}
          onInput={e => props.setForm({ ...props.form, genres: e.target.value })}
        />
        <p class="type-caption text-gray-600 mt-1.5 px-1">Comma separated</p>
      </div>

      {/* Notes */}
      <div>
        <FieldLabel for="edit-notes">My Notes</FieldLabel>
        <textarea
          id="edit-notes"
          value={props.form.notes}
          onInput={e => props.setForm({ ...props.form, notes: e.target.value })}
          class="w-full bg-[#0c0e14] border border-white/10 p-3 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)] focus:shadow-[0_0_0_3px_var(--p-dim)] placeholder-gray-700 transition-all resize-none"
          rows="3"
          placeholder="Write your thoughts, reactions, memorable quotes…"
          style="resize: vertical; min-height: 80px"
        />
      </div>

      {/* Save button */}
      <button
        onClick={props.saveChanges}
        class="w-full type-button py-4 rounded-xl mt-1 active:scale-95 flex items-center justify-center gap-2 transition-all"
        style="background: var(--p); color: #05060a; box-shadow: 0 0 28px var(--p-glow), 0 4px 16px rgba(0,0,0,0.4)"
        aria-label="Save changes to this vault entry"
      >
        <Icon name="save" class="text-base" aria-hidden="true" />
        Save Changes
      </button>
    </div>
  );
}
