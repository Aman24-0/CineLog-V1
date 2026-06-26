import { createEffect } from 'solid-js';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { OMDB_KEY } from '../utils';

export function useOmdbRatings(movie, setOmdbData, uid, isPreview, isGuest) {
  createEffect(() => {
    const currentMovie = movie();
    if (currentMovie) {
      const title = currentMovie.title || currentMovie.name;
      fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_KEY}`)
        .then(r => r.json())
        .then(d => {
          if (d.Response === 'True') {
            const rt = d.Ratings?.find(r => r.Source === 'Rotten Tomatoes')?.Value || '-';
            const newImdb = d.imdbRating || '-';
            const newRt = rt.replace('%', '');
            
            setOmdbData({ imdb: newImdb, rt: rt });

            if (!isPreview && !isGuest && uid) {
              // FIX: Ab Database tabhi UPDATE hoga jab actual me rating badli ho!
              const currentImdb = currentMovie.imdbRating || '-';
              const currentRt = currentMovie.rtRating || '-';

              if (currentImdb !== newImdb || currentRt !== newRt) {
                updateDoc(doc(db, 'users', uid, 'watchlist', String(currentMovie.id)), { 
                  imdbRating: newImdb, 
                  rtRating: newRt 
                }).catch(e => console.error("OMDB Update Error:", e));
              }
            }
          }
        }).catch(e => console.error("OMDB Fetch Error:", e));
    }
  });
}
