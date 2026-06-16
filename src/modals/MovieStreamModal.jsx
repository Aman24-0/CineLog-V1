import { createSignal, createEffect, For, Show } from 'solid-js';
import { Icon } from '../utils';
import { MovieResultCard } from '../components/MovieResultCard';
import { trpc } from '../lib/trpc';

/**
 * Movie Stream Modal - Search and select movies to watch
 * Integrated with TMDB API and backend scraper
 */
export const MovieStreamModal = (props) => {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [searchResults, setSearchResults] = createSignal([]);
  const [isSearching, setIsSearching] = createSignal(false);
  const [loadingMovieId, setLoadingMovieId] = createSignal(null);
  const [searchError, setSearchError] = createSignal(null);

  // Debounced search
  let searchTimeout;
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchError(null);

    clearTimeout(searchTimeout);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    searchTimeout = setTimeout(async () => {
      try {
        const result = await trpc.movies.search.query({ query });
        if (result.success) {
          setSearchResults(result.movies);
        } else {
          setSearchError(result.error || 'Search failed');
        }
      } catch (error) {
        setSearchError(error.message || 'Failed to search movies');
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const handleWatchMovie = async (movie) => {
    setLoadingMovieId(movie.id);
    try {
      const result = await trpc.movies.scrapeVideoSource.mutate({
        movieTitle: movie.title,
      });

      if (result.success && result.videoUrl) {
        props.onVideoFound({
          movieTitle: movie.title,
          videoUrl: result.videoUrl,
          poster: movie.poster,
          source: result.source,
        });
        props.onClose();
      } else {
        setSearchError('Failed to find video source');
      }
    } catch (error) {
      setSearchError(error.message || 'Failed to scrape video');
    } finally {
      setLoadingMovieId(null);
    }
  };

  return (
    <Show when={props.isOpen}>
      {/* Backdrop */}
      <div
        class="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={props.onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Modal Container */}
      <div
        class="fixed inset-0 z-[100000] flex items-center justify-center p-4 pointer-events-none"
        onClick={props.onClose}
      >
        {/* Modal Content */}
        <div
          class="w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden pointer-events-auto animate-pop-in"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, rgba(14,16,24,0.95) 0%, rgba(8,9,11,0.95) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--border-active)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px var(--p-glow)',
          }}
        >
          {/* Header */}
          <div class="sticky top-0 z-10 p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-headline text-3xl text-white flex items-center gap-3">
                <Icon name="movie" class="text-2xl" style="color: var(--p)" />
                Stream Movies
              </h2>
              <button
                onClick={props.onClose}
                class="p-2 rounded-full hover:bg-white/10 transition-colors active:scale-95"
              >
                <Icon name="close" class="text-xl text-gray-400" />
              </button>
            </div>

            {/* Search Input */}
            <div
              class="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300"
              style={{
                borderColor: searchQuery() ? 'var(--p)' : 'var(--border)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <Icon name="search" class="text-lg text-gray-400" />
              <input
                type="text"
                placeholder="Search movies by title..."
                value={searchQuery()}
                onInput={(e) => handleSearch(e.target.value)}
                class="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm font-medium"
              />
              <Show when={isSearching()}>
                <Icon name="hourglass_empty" class="text-lg text-gray-400 animate-spin" />
              </Show>
            </div>

            {/* Error Message */}
            <Show when={searchError()}>
              <div class="mt-3 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-xs text-red-300 font-bold">
                {searchError()}
              </div>
            </Show>
          </div>

          {/* Results */}
          <div class="overflow-y-auto hide-scrollbar p-6" style="max-height: calc(90vh - 200px)">
            <Show
              when={searchResults().length > 0}
              fallback={
                <div class="text-center py-12">
                  <Icon name="movie" class="text-5xl text-gray-600 mb-3 mx-auto opacity-50" />
                  <p class="text-gray-400 font-bold">
                    {searchQuery() ? 'No movies found' : 'Search for a movie to get started'}
                  </p>
                </div>
              }
            >
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <For each={searchResults()}>
                  {(movie) => (
                    <MovieResultCard
                      movie={movie}
                      isLoading={loadingMovieId() === movie.id}
                      onWatch={handleWatchMovie}
                    />
                  )}
                </For>
              </div>
            </Show>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-pop-in {
          animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Show>
  );
};
