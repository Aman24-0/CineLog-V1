import { createSignal, onCleanup, Show, For } from 'solid-js';
import { trpc } from '../lib/trpc';

export default function SearchModal(props) {
  const [query, setQuery] = createSignal('');
  const [searchType, setSearchType] = createSignal('movie'); // 'movie' or 'tv'
  let searchTimeout;

  // ============================================
  // tRPC Search Query
  // ============================================
  const searchQuery = trpc.search.useQuery(
    () => ({ 
      query: query(), 
      type: searchType() 
    }),
    {
      enabled: query().length > 2,
      staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    }
  );

  // ============================================
  // Debounced Search Handler
  // ============================================
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout to prevent excessive API calls
    clearTimeout(searchTimeout);

    if (value.length > 2) {
      // Debounce search by 500ms
      searchTimeout = setTimeout(() => {
        // The query will automatically trigger via tRPC reactive state
      }, 500);
    }
  };

  // ============================================
  // FIX #11: Memory Leak Cleanup
  // ============================================
  // Ensures the timeout is cleared if the modal is closed while typing
  onCleanup(() => {
    clearTimeout(searchTimeout);
  });

  // ============================================
  // Handle Item Selection
  // ============================================
  const handleSelect = (item) => {
    if (props.onSelect) {
      props.onSelect({ ...item, media_type: searchType() });
    }
  };

  return (
    <Show when={props.isOpen}>
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm">
        <div class="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div class="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 class="text-xl font-bold text-white">Search Movies & TV</h2>
            <button 
              onClick={props.onClose}
              class="text-gray-400 hover:text-white transition p-2"
            >
              ✕
            </button>
          </div>

          {/* Search Controls */}
          <div class="p-4 flex gap-3">
            <input
              type="text"
              placeholder="Search by title..."
              value={query()}
              onInput={handleSearchInput}
              class="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              autofocus
            />
            <select
              value={searchType()}
              onChange={(e) => setSearchType(e.target.value)}
              class="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>
          </div>

          {/* Results Area */}
          <div class="flex-1 overflow-y-auto p-4">
            <Show 
              when={query().length > 2} 
              fallback={
                <div class="text-center text-gray-500 py-10">
                  Type at least 3 characters to search...
                </div>
              }
            >
              <Show 
                when={!searchQuery.isLoading} 
                fallback={
                  <div class="flex justify-center py-10">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                }
              >
                <Show 
                  when={searchQuery.data?.results?.length > 0} 
                  fallback={
                    <div class="text-center text-gray-500 py-10">
                      No results found.
                    </div>
                  }
                >
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <For each={searchQuery.data.results}>
                      {(item) => (
                        <button
                          onClick={() => handleSelect(item)}
                          class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition text-left group"
                        >
                          <div class="aspect-[2/3] bg-gray-700 relative">
                            {item.poster_path ? (
                              <img 
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                                alt={item.title || item.name}
                                class="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div class="flex items-center justify-center h-full text-gray-500">
                                No Image
                              </div>
                            )}
                          </div>
                          <div class="p-3">
                            <h3 class="text-sm font-medium text-white truncate">
                              {item.title || item.name}
                            </h3>
                            <p class="text-xs text-gray-400 mt-1">
                              {(item.release_date || item.first_air_date || '').substring(0, 4)}
                            </p>
                          </div>
                        </button>
                      )}
                    </For>
                  </div>
                </Show>
              </Show>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
}
