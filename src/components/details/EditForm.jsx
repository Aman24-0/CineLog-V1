import { Show, For } from 'solid-js';
import { Icon } from '../../utils';

// Reusable label component for the form
const FieldLabel = (props) => (
  <label class="type-label block mb-2">{props.children}</label>
);

const FieldInput = (props) => (
  <input
    {...props}
    class={`w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)] placeholder-gray-700 ${props.class || ''}`}
  />
);

export function EditForm(props) {
  return (
    // p-6 = 24px = 3×8; space-y-4 = 16px = 2×8; mt-4 = 16px; rounded-2xl = 16px
    <div class="glass-surface p-6 rounded-2xl space-y-4 animate-fade-in border mt-4 shadow-xl" style="border-color: var(--border-active)">

      {/* Row 1: Status + Rating */}
      <div class="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Status</FieldLabel>
          <select
            value={props.form.status}
            onChange={e => props.setForm({ ...props.form, status: e.target.value })}
            class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)]"
          >
            <option value="Planned">Planned</option>
            <option value="Watching">Watching</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <FieldLabel>Personal Rating</FieldLabel>
          <FieldInput
            type="number" step="0.1" min="0" max="10"
            value={props.form.rating}
            onChange={e => props.setForm({ ...props.form, rating: e.target.value })}
          />
        </div>
      </div>

      {/* TV: Season + Episode */}
      <Show when={props.movie?.media_type === 'tv'}>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>Season</FieldLabel>
            <FieldInput
              type="number"
              value={props.form.season}
              onInput={e => props.setForm({ ...props.form, season: e.target.value })}
            />
          </div>
          <div>
            <FieldLabel>Episode</FieldLabel>
            <FieldInput
              type="number"
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
            <FieldLabel>Watch Date</FieldLabel>
            <FieldInput
              type="date"
              value={props.form.watchDate}
              onInput={e => props.setForm({ ...props.form, watchDate: e.target.value })}
              class="[color-scheme:dark]"
            />
          </div>
        </Show>
        <div class={props.movie?.media_type === 'tv' ? 'col-span-2' : ''}>
          <FieldLabel>Region</FieldLabel>
          <select
            value={props.form.region}
            onChange={e => props.setForm({ ...props.form, region: e.target.value })}
            class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)]"
          >
            <option>International</option>
            <option>Indian</option>
          </select>
        </div>
      </div>

      {/* TV: Season Timelines */}
      <Show when={props.movie?.media_type === 'tv'}>
        <div>
          <FieldLabel>
            <span class="flex items-center gap-1"><Icon name="history" class="text-[14px]"/> Season Timelines</span>
          </FieldLabel>
          {/* p-3 = 12px; gap-2 = 8px */}
          <div class="space-y-2 bg-black/40 p-3 rounded-2xl border border-white/5 shadow-inner max-h-48 overflow-y-auto hide-scrollbar">
            <For each={Array.from({ length: Math.max(1, parseInt(props.form.season) || 1) })}>
              {(_, i) => {
                const s = i() + 1;
                const d = props.form.seasonDates[s] || { start: '', end: '' };
                return (
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 bg-[#0c0e14] p-2 rounded-xl border border-white/5">
                    <span class="type-caption w-8 text-center py-1 rounded-md" style="color: var(--p); background: var(--p-dim)">S{s}</span>
                    <div class="flex flex-1 items-center gap-2">
                      <div class="flex-1">
                        <input
                          type="date"
                          value={d.start}
                          onInput={e => props.setForm({ ...props.form, seasonDates: { ...props.form.seasonDates, [s]: { ...(props.form.seasonDates[s] || {}), start: e.target.value }}})}
                          class="w-full bg-transparent border-b border-white/10 p-1 type-metadata text-white [color-scheme:dark] outline-none focus:border-[var(--p)]"
                          title={`Season ${s} Start Date`}
                        />
                      </div>
                      <Icon name="arrow_forward" class="text-gray-600 text-[12px]"/>
                      <div class="flex-1">
                        <input
                          type="date"
                          value={d.end}
                          onInput={e => props.setForm({ ...props.form, seasonDates: { ...props.form.seasonDates, [s]: { ...(props.form.seasonDates[s] || {}), end: e.target.value }}})}
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
        <FieldLabel>Custom Tag</FieldLabel>
        <FieldInput
          placeholder="e.g. Theatre"
          value={props.form.tag}
          onInput={e => props.setForm({ ...props.form, tag: e.target.value })}
        />
      </div>

      {/* Platforms */}
      <div>
        <FieldLabel>Available Platforms</FieldLabel>
        <div class="flex flex-wrap gap-2 p-3 bg-[#0c0e14] border border-white/5 rounded-xl">
          <For each={props.allAvailablePlatforms()}>
            {p => (
              <button
                type="button"
                onClick={() => props.togglePlatform(p)}
                class="px-3 py-1.5 rounded-lg type-caption active:scale-95 border shadow-sm"
                style={props.form.platforms.split(',').map(s => s.trim()).includes(p)
                  ? 'background: var(--p); color: #000; border-color: var(--p); box-shadow: 0 0 12px var(--p-glow)'
                  : 'background: rgba(255,255,255,0.05); color: #9ca3af; border-color: rgba(255,255,255,0.05)'}
              >
                {p}
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Genres */}
      <div>
        <FieldLabel>Genres (comma separated)</FieldLabel>
        <FieldInput
          value={props.form.genres}
          onInput={e => props.setForm({ ...props.form, genres: e.target.value })}
        />
      </div>

      {/* Notes */}
      <div>
        <FieldLabel>My Notes</FieldLabel>
        <textarea
          value={props.form.notes}
          onInput={e => props.setForm({ ...props.form, notes: e.target.value })}
          class="w-full bg-[#0c0e14] border border-white/10 p-2.5 rounded-xl type-metadata text-white outline-none focus:border-[var(--p)] placeholder-gray-700"
          rows="3"
          placeholder="Write your thoughts..."
        />
      </div>

      {/* Save button — mt-2 = 8px */}
      <button
        onClick={props.saveChanges}
        class="w-full type-button py-4 rounded-xl mt-2 active:scale-95 flex items-center justify-center gap-2"
        style="background: var(--p); color: #05060a; box-shadow: 0 0 28px var(--p-glow), 0 4px 16px rgba(0,0,0,0.4)"
      >
        Save Universe Changes
      </button>
    </div>
  );
}
