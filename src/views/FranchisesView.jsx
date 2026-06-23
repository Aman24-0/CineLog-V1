import { createSignal, Show, For, onMount } from 'solid-js';
import { trpc } from '../lib/trpc';

export default function FranchisesView() {
  const [franchises, setFranchises] = createSignal([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [selectedFranchise, setSelectedFranchise] = createSignal(null);
  const [confirmRemove, setConfirmRemove] = createSignal(null); // Stores movie ID to remove

  // ============================================
  // FIX #12: Loading State Implementation
  // ============================================
  // Fetch franchises data with proper loading state
  const franchisesQuery = trpc.search.useQuery(
    { query: 'Marvel Cinematic Universe', type: 'movie' }, // Example query, adjust to your actual franchise fetching logic
    {
      onSuccess: (data) => {
        // Transform data into franchise format if needed
        setFranchises(data.results || []);
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      }
    }
  );

  // ============================================
  // FIX #13: English Text & Consistent UX
  // ============================================
  const handleRemoveRequest = (movieId, movieTitle) => {
    // English confirmation message instead of mixed languages
    setConfirmRemove({ id: movieId, title: movieTitle });
  };

  const confirmRemoval = () => {
    if (confirmRemove()) {
      // Add your actual removal logic here (e.g., updating Firebase or local state)
      console.log(`Removed movie ${confirmRemove().title} from franchise.`);
      
      // Remove from local state
      setFranchises(prev => prev.filter(m => m.id !== confirmRemove().id));
      setConfirmRemove(null);
    }
  };

  return (
    <div class="p-6 max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-white mb-8">Franchises</h1>

      {/* Loading State */}
      <Show when={isLoading()}>
        <div class="flex flex-col items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p class="text-gray-400">Loading franchises...</p>
        </div>
      </Show>

      {/* Content */}
      <Show when={!isLoading()}>
        <Show 
          when={franchises().length > 0} 
          fallback={
            <div class="text-center text-gray-500 py-10 bg-gray-800 rounded-lg">
              No franchises found.
            </div>
          }
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={franchises()}>
              {(franchise) => (
                <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                  <div class="aspect-video bg-gray-700 relative">
                    {franchise.backdrop_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w500${franchise.backdrop_path}`} 
                        alt={franchise.title}
                        class="w-full h-full object-cover"
                      />
                    ) : (
                      <div class="flex items-center justify-center h-full text-gray-500">No Image</div>
                    )}
                  </div>
                  <div class="p-4">
                    <h3 class="text-xl font-bold text-white truncate">{franchise.title}</h3>
                    <p class="text-sm text-gray-400 mt-1">{franchise.release_date?.substring(0, 4) || 'N/A'}</p>
                    
                    <div class="mt-4 flex gap-2">
                      <button 
                        onClick={() => setSelectedFranchise(franchise)}
                        class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleRemoveRequest(franchise.id, franchise.title)}
                        class="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg hover:bg-red-600 hover:text-white transition text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </Show>

      {/* Confirmation Modal (English Text) */}
      <Show when={confirmRemove()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div class="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 class="text-xl font-bold text-white mb-2">Confirm Removal</h3>
            <p class="text-gray-300 mb-6">
              Are you sure you want to remove <span class="font-semibold text-white">"{confirmRemove()?.title}"</span> from this franchise?
            </p>
            <div class="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmRemove(null)}
                class="px-4 py-2 text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRemoval}
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
