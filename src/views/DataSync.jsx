import { createSignal, Show, For } from 'solid-js';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Icon, TMDB_KEY, cleanPlatform } from '../utils';

export function DataSync(props) {
  const [isSyncing,   setIsSyncing]   = createSignal(false);
  const [progress,    setProgress]    = createSignal({ current: 0, total: 0, pct: 0 });
  const [syncLog,     setSyncLog]     = createSignal('');
  const [isImporting, setIsImporting] = createSignal(false);
  const [importStats, setImportStats] = createSignal({ total: 0, success: 0, skipped: 0 });
  const [errorLog,    setErrorLog]    = createSignal([]);
  let fileInputRef;
  let csvInputRef;

  const runDeepScan = async () => {
    const list  = props.watchlist();
    const total = list.length;

    if (total === 0) {
      props.showToast('Vault is empty — nothing to scan.', 'info');
      return;
    }
    if (total > 200) {
      props.showToast(`Large vault (${total} items). Deep Scan may take several minutes.`, 'info');
    }
    if (!confirm('Start Deep Scan?\nThis will check and update missing streaming platforms and genres for all saved titles. Your personal edits remain 100% untouched.')) return;

    setIsSyncing(true);
    let updatedCount = 0;

    for (let i = 0; i < total; i++) {
      const item = list[i];
      setSyncLog(`Scanning: ${item.title || item.name || ''}…`);
      setProgress({ current: i + 1, total, pct: Math.round(((i + 1) / total) * 100) });

      try {
        let fetchedPlatforms = [];
        let newGenres        = item.genresList || [];
        let newTotalEps      = item.totalEps   || 0;

        const tmdbRes = await fetch(`https://api.themoviedb.org/3/${item.media_type || 'movie'}/${item.id}?api_key=${TMDB_KEY}&append_to_response=watch/providers`);
        if (tmdbRes.ok) {
          const data = await tmdbRes.json();
          if (data.genres) data.genres.forEach(g => { if (!newGenres.includes(g.name)) newGenres.push(g.name); });
          if (data.number_of_episodes) newTotalEps = data.number_of_episodes;
          const providers = data['watch/providers']?.results?.IN || data['watch/providers']?.results?.US;
          if (providers) {
            [...(providers.flatrate || []), ...(providers.free || []), ...(providers.ads || [])].forEach(p => fetchedPlatforms.push(p.provider_name));
          }
        }

        const currentDbPlatforms = item.platformsList || [];
        let finalNames = new Set([...currentDbPlatforms]);
        fetchedPlatforms.forEach(p => { const cleaned = cleanPlatform(p); if (cleaned) finalNames.add(cleaned); });
        const mergedPlatforms = Array.from(finalNames);

        if (mergedPlatforms.length > currentDbPlatforms.length || newGenres.length > (item.genresList?.length || 0) || newTotalEps !== item.totalEps) {
          await updateDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), {
            platformsList: mergedPlatforms, genresList: newGenres, totalEps: newTotalEps
          });
          updatedCount++;
        }
      } catch (e) {
        console.log('Error syncing:', item.id);
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setIsSyncing(false);
    setSyncLog(`Scan Complete! 🚀 Successfully updated ${updatedCount} titles.`);
    props.showToast(`Vault Repaired! ${updatedCount} items synced.`, 'success');
  };

  // ── V2-compatible export ──────────────────────────────────────────────
  // Converts the raw Firestore watchlist into a clean CineLog-V2 backup
  // document so it can be imported directly via V2's Settings → Sync →
  // Restore Backup — no external Python converter needed.
  //
  // Transformations applied:
  //   1. id → String(id)         (V1 mixes int + string IDs)
  //   2. addedAt / updatedAt     Firestore Timestamp {seconds, nanoseconds}
  //                             → ISO 8601 string
  //   3. watchDate               "" → omitted (V2 treats "" as invalid)
  //   4. rating === 0            → omitted (V2 treats 0 as "no rating")
  //   5. seasonDates preserved   (V2 stores them in a JSONB column)
  //   6. TV items with seasonDates but no watchDate → derive watchDate
  //      from the latest season's end date (so the V2 timeline places
  //      them correctly)
  //   7. V1-only fields dropped  (parts, overview, latestTmdbSeason,
  //      latestEpisodeKnown, lastEpisodeCheckedAt — V2 doesn't use them)
  //   8. Wrapped in { version:1, createdAt, appVersion, library:{...} }
  //
  const toV2Backup = (watchlist) => {
    const toISO = (v) => {
      if (!v) return undefined;
      if (typeof v === 'string') return v;
      if (typeof v === 'number') {
        const ms = v > 1e12 ? v : v * 1000;
        const d = new Date(ms);
        return isNaN(d.getTime()) ? undefined : d.toISOString();
      }
      if (typeof v === 'object' && 'seconds' in v) {
        const d = new Date(v.seconds * 1000);
        return isNaN(d.getTime()) ? undefined : d.toISOString();
      }
      return undefined;
    };

    const cleanItem = (raw) => {
      const out = {};
      // Core identity
      out.id = String(raw.id);
      out.media_type = raw.media_type === 'tv' ? 'tv' : 'movie';
      out.status = ['Planned', 'Watching', 'Completed', 'Plan to Watch', 'Dropped'].includes(raw.status)
        ? raw.status
        : 'Planned';

      // Dates
      const addedAt = toISO(raw.addedAt) || new Date().toISOString();
      out.addedAt = addedAt;
      out.updatedAt = toISO(raw.updatedAt) || addedAt;

      // Text
      if (raw.title) out.title = raw.title;
      if (raw.name) out.name = raw.name;
      out.notes = typeof raw.notes === 'string' ? raw.notes : '';
      if (raw.poster_path) out.poster_path = raw.poster_path;
      if (raw.backdrop_path) out.backdrop_path = raw.backdrop_path;
      const releaseDate = toISO(raw.release_date) || toISO(raw.first_air_date);
      if (releaseDate) out.release_date = releaseDate;

      // Arrays
      out.genresList = Array.isArray(raw.genresList) ? raw.genresList.filter(s => typeof s === 'string') : [];
      out.platformsList = Array.isArray(raw.platformsList) ? raw.platformsList.filter(s => typeof s === 'string') : [];
      if (Array.isArray(raw.castList) && raw.castList.length) out.castList = raw.castList.filter(s => typeof s === 'string');

      // Rating — V1 uses 0-10 scale; 0 means "no rating"
      if (typeof raw.rating === 'number' && raw.rating > 0 && raw.rating <= 10) {
        out.rating = raw.rating;
      }

      // Numbers
      if (typeof raw.runtime === 'number') out.runtime = raw.runtime;
      if (typeof raw.totalEps === 'number') out.totalEps = raw.totalEps;
      if (typeof raw.season === 'number') out.season = raw.season;
      if (typeof raw.episode === 'number') out.episode = raw.episode;

      // Misc strings
      if (raw.imdbRating) out.imdbRating = String(raw.imdbRating);
      if (raw.rtRating) out.rtRating = String(raw.rtRating);
      if (raw.tmdbRating) out.tmdbRating = String(raw.tmdbRating);
      if (raw.region) out.region = raw.region;
      if (raw.tag) out.tag = raw.tag;
      if (raw.director) out.director = raw.director;
      if (raw.imdbId) out.imdbId = raw.imdbId;
      if (raw.directPlayUrl) out.directPlayUrl = raw.directPlayUrl;
      if (typeof raw.newSeasonAvailable === 'boolean') out.newSeasonAvailable = raw.newSeasonAvailable;

      // Seasons cache (CachedSeasonInfo[])
      if (Array.isArray(raw.seasons)) {
        const sc = raw.seasons
          .filter(s => s && typeof s.number === 'number' && typeof s.count === 'number' && s.number > 0)
          .map(s => ({ number: s.number, count: s.count }));
        if (sc.length) out.seasons = sc;
      }

      // Season dates — preserve verbatim (V2 stores in JSONB column)
      if (raw.seasonDates && typeof raw.seasonDates === 'object' && !Array.isArray(raw.seasonDates)) {
        out.seasonDates = raw.seasonDates;
      }

      // Watch date — for movies, use V1's watchDate if set.
      // For TV series, derive from seasonDates if watchDate is empty.
      let watchDate = toISO(raw.watchDate);
      if (!watchDate && out.media_type === 'tv' && out.seasonDates) {
        try {
          const seasons = Object.entries(out.seasonDates)
            .map(([k, v]) => ({ n: Number(k), start: v?.start, end: v?.end }))
            .filter(s => !isNaN(s.n))
            .sort((a, b) => a.n - b.n);
          for (let i = seasons.length - 1; i >= 0; i--) {
            if (seasons[i].end) { watchDate = seasons[i].end; break; }
            if (seasons[i].start) { watchDate = seasons[i].start; break; }
          }
          if (!watchDate && seasons[0]?.start) watchDate = seasons[0].start;
          if (watchDate) watchDate = toISO(watchDate);
        } catch {}
      }
      if (watchDate) out.watchDate = watchDate;
      return out;
    };

    return {
      version: 1,
      createdAt: new Date().toISOString(),
      appVersion: '2.0.0',
      library: {
        watchlist: watchlist.map(cleanItem),
        collections: [],
      },
    };
  };

  // ── File download helper ──────────────────────────────────────────────
  // Use Blob + URL.createObjectURL so the file is saved with the correct
  // MIME type (application/json or text/csv). The old `data:text/json`
  // URI scheme caused Android Chrome to save the file with no extension
  // or a wrong MIME, which made V2's file picker reject it.
  const downloadFile = (filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Defer revoke so iOS Safari has time to start the download.
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const exportData = () => {
    const doc = toV2Backup(props.watchlist());
    const filename = `Cinelog_V2_Backup_${new Date().toISOString().slice(0,10)}.json`;
    downloadFile(filename, JSON.stringify(doc, null, 2), 'application/json');
    props.showToast('V2 Backup Downloaded! 📥', 'success');
  };

  // ── CSV export (V2-generic format, expanded for round-trip fidelity) ──
  // Columns:
  //   id, title, media_type, status, rating,
  //   added_at, updated_at, watch_date,
  //   runtime, total_eps, season, episode,
  //   genres, platforms, cast, director,
  //   imdb_id, imdb_rating, rt_rating, region, tag,
  //   poster_path, backdrop_path, release_date, notes
  //
  // This matches the "generic" branch of V2's CSV import (parseWatchlistCsv
  // in src/features/sync/import/csvImport.ts) AND extends it with extra
  // columns so V2 can preserve in-memory metadata (genres, runtime, cast,
  // poster paths, etc.) until TMDB enrichment fills them in. Without these
  // extra columns, importing a V1 CSV into V2 loses all TMDB-fetched
  // metadata whenever TMDB is unreachable or the tmdb_id mismatches.
  //
  // CSV escaping rules (RFC 4180):
  //   - Wrap field in double quotes if it contains: comma, quote, newline
  //   - Escape embedded double quotes by doubling them: " → ""
  //   - Arrays (genresList, platformsList, castList) are joined with "|"
  //     so they round-trip cleanly through V2's CSV import (which uses the
  //     same delimiter for the `genres` column).
  const csvEscape = (val) => {
    if (val === null || val === undefined) return '';
    const s = String(val);
    if (/[",\n\r]/.test(s)) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const toISOOrNull = (v) => {
    if (!v) return '';
    if (typeof v === 'string') return v;
    if (typeof v === 'number') {
      const ms = v > 1e12 ? v : v * 1000;
      const d = new Date(ms);
      return isNaN(d.getTime()) ? '' : d.toISOString();
    }
    if (typeof v === 'object' && 'seconds' in v) {
      const d = new Date(v.seconds * 1000);
      return isNaN(d.getTime()) ? '' : d.toISOString();
    }
    return '';
  };

  // For TV items, derive watch_date from seasonDates if not set directly.
  const deriveWatchDate = (raw) => {
    const direct = toISOOrNull(raw.watchDate);
    if (direct) return direct;
    if (raw.media_type !== 'tv' || !raw.seasonDates) return '';
    try {
      const seasons = Object.entries(raw.seasonDates)
        .map(([k, v]) => ({ n: Number(k), start: v?.start, end: v?.end }))
        .filter(s => !isNaN(s.n))
        .sort((a, b) => a.n - b.n);
      for (let i = seasons.length - 1; i >= 0; i--) {
        if (seasons[i].end) return toISOOrNull(seasons[i].end);
        if (seasons[i].start) return toISOOrNull(seasons[i].start);
      }
      if (seasons[0]?.start) return toISOOrNull(seasons[0].start);
    } catch {}
    return '';
  };

  // Join an array into a single CSV cell using "|" as the delimiter.
  // Empty arrays become empty strings (so the CSV cell is empty, not "|").
  const joinList = (arr) => Array.isArray(arr) ? arr.filter(Boolean).join('|') : '';

  const exportCsv = () => {
    const list = props.watchlist();
    if (!list.length) {
      props.showToast('Vault is empty — nothing to export.', 'info');
      return;
    }
    const headers = [
      'id', 'title', 'media_type', 'status', 'rating',
      'added_at', 'updated_at', 'watch_date',
      'runtime', 'total_eps', 'season', 'episode',
      'genres', 'platforms', 'cast', 'director',
      'imdb_id', 'imdb_rating', 'rt_rating', 'region', 'tag',
      'poster_path', 'backdrop_path', 'release_date', 'notes',
    ];
    const rows = list.map((raw) => {
      const title = raw.title || raw.name || '';
      const mediaType = raw.media_type === 'tv' ? 'tv' : 'movie';
      const status = ['Planned', 'Watching', 'Completed', 'Plan to Watch', 'Dropped'].includes(raw.status)
        ? raw.status
        : 'Planned';
      const rating = (typeof raw.rating === 'number' && raw.rating > 0 && raw.rating <= 10)
        ? String(raw.rating)
        : '';
      const watchDate = deriveWatchDate(raw);
      const addedAt = toISOOrNull(raw.addedAt);
      const updatedAt = toISOOrNull(raw.updatedAt) || addedAt;
      const runtime = (typeof raw.runtime === 'number' && raw.runtime > 0) ? String(raw.runtime) : '';
      const totalEps = (typeof raw.totalEps === 'number' && raw.totalEps > 0) ? String(raw.totalEps) : '';
      const season = (typeof raw.season === 'number') ? String(raw.season) : '';
      const episode = (typeof raw.episode === 'number') ? String(raw.episode) : '';
      const genres = joinList(raw.genresList);
      const platforms = joinList(raw.platformsList);
      const cast = joinList(raw.castList);
      const director = typeof raw.director === 'string' ? raw.director : '';
      const imdbId = typeof raw.imdbId === 'string' ? raw.imdbId : '';
      const imdbRating = raw.imdbRating ? String(raw.imdbRating) : '';
      const rtRating = raw.rtRating ? String(raw.rtRating) : '';
      const region = typeof raw.region === 'string' ? raw.region : '';
      const tag = typeof raw.tag === 'string' ? raw.tag : '';
      const posterPath = typeof raw.poster_path === 'string' ? raw.poster_path : '';
      const backdropPath = typeof raw.backdrop_path === 'string' ? raw.backdrop_path : '';
      const releaseDate = toISOOrNull(raw.release_date) || toISOOrNull(raw.first_air_date);
      const notes = typeof raw.notes === 'string' ? raw.notes : '';
      return [
        csvEscape(String(raw.id)),
        csvEscape(title),
        csvEscape(mediaType),
        csvEscape(status),
        csvEscape(rating),
        csvEscape(addedAt),
        csvEscape(updatedAt),
        csvEscape(watchDate),
        csvEscape(runtime),
        csvEscape(totalEps),
        csvEscape(season),
        csvEscape(episode),
        csvEscape(genres),
        csvEscape(platforms),
        csvEscape(cast),
        csvEscape(director),
        csvEscape(imdbId),
        csvEscape(imdbRating),
        csvEscape(rtRating),
        csvEscape(region),
        csvEscape(tag),
        csvEscape(posterPath),
        csvEscape(backdropPath),
        csvEscape(releaseDate),
        csvEscape(notes),
      ].join(',');
    });
    const csv = headers.join(',') + '\n' + rows.join('\n');
    const filename = `Cinelog_Vault_CSV_${new Date().toISOString().slice(0,10)}.csv`;
    downloadFile(filename, csv, 'text/csv;charset=utf-8');
    props.showToast(`CSV Exported — ${list.length} titles! 📄`, 'success');
  };

  // ── CSV import (V2-generic format, expanded) ─────────────────────────
  // Parses RFC 4180 CSV. Accepts the same column set V2's CSV import accepts
  // (the "generic" branch of parseWatchlistCsv), plus the extended columns
  // that V1's own exportCsv now emits (runtime, total_eps, season, episode,
  // genres, platforms, cast, director, imdb_id, imdb_rating, rt_rating,
  // region, tag, poster_path, backdrop_path, release_date, updated_at).
  //
  // Required: id + title (must have a TMDB id — without it we can't safely
  // add to Firestore because Firestore uses String(id) as the doc name).
  // Optional columns are skipped silently if absent.
  //
  // List-valued columns (genres, platforms, cast) are split on "|".
  const parseCsvLine = (line) => {
    const fields = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQuotes) {
        if (c === '"') {
          if (line[i + 1] === '"') { cur += '"'; i++; }
          else { inQuotes = false; }
        } else {
          cur += c;
        }
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ',') { fields.push(cur); cur = ''; }
        else cur += c;
      }
    }
    fields.push(cur);
    return fields;
  };

  // Split a "|" delimited CSV cell into a string array. Empty/missing → [].
  const splitList = (val) => {
    if (!val) return [];
    return String(val).split('|').map(s => s.trim()).filter(Boolean);
  };

  const importCsv = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        let text = String(event.target.result || '');
        // Strip BOM + normalize line endings
        if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        if (lines.length < 2) {
          props.showToast('CSV is empty or has no data rows.', 'error');
          if (csvInputRef) csvInputRef.value = '';
          return;
        }

        const headers = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase());
        // Require at minimum: id, title
        const hasId    = headers.includes('id');
        const hasTitle = headers.includes('title') || headers.includes('name');
        if (!hasId || !hasTitle) {
          props.showToast('CSV must have at least `id` and `title` columns.', 'error');
          if (csvInputRef) csvInputRef.value = '';
          return;
        }

        setIsImporting(true);
        setImportStats({ total: lines.length - 1, success: 0, skipped: 0 });
        setErrorLog([]);

        const existingIds = new Set(props.watchlist().map(m => String(m.id)));

        for (let i = 1; i < lines.length; i++) {
          const fields = parseCsvLine(lines[i]);
          const row = {};
          headers.forEach((h, idx) => { row[h] = (fields[idx] ?? '').trim(); });

          try {
            const id = row.id;
            const title = row.title || row.name || '';
            if (!id) throw new Error('Missing ID');
            if (!title) throw new Error('Missing title');
            if (existingIds.has(String(id))) throw new Error('Already exists in Vault');

            const mediaType = row.media_type === 'tv' ? 'tv' : 'movie';
            const status = ['Planned', 'Watching', 'Completed', 'Plan to Watch', 'Dropped'].includes(row.status)
              ? row.status
              : 'Planned';
            const ratingNum = parseFloat(row.rating);
            const rating = (!isNaN(ratingNum) && ratingNum > 0 && ratingNum <= 10) ? ratingNum : 0;

            // Build a V1 watchlist doc with ALL parsed fields. Fields not in
            // the CSV are simply omitted — Firestore will treat them as
            // missing rather than null, which matches the shape produced by
            // addPreviewToWatchlist.
            const item = {
              id: String(id),
              title,
              media_type: mediaType,
              status,
              addedAt: row.added_at ? new Date(row.added_at) : new Date(),
              notes: row.notes || '',
            };
            if (rating > 0) item.rating = rating;
            if (row.watch_date) item.watchDate = row.watch_date;
            if (row.updated_at) item.updatedAt = new Date(row.updated_at);

            // Extended numeric fields
            const runtimeNum = parseInt(row.runtime, 10);
            if (!isNaN(runtimeNum) && runtimeNum > 0) item.runtime = runtimeNum;
            const totalEpsNum = parseInt(row.total_eps, 10);
            if (!isNaN(totalEpsNum) && totalEpsNum > 0) item.totalEps = totalEpsNum;
            const seasonNum = parseInt(row.season, 10);
            if (!isNaN(seasonNum) && seasonNum > 0) item.season = seasonNum;
            const episodeNum = parseInt(row.episode, 10);
            if (!isNaN(episodeNum) && episodeNum >= 0) item.episode = episodeNum;

            // List-valued fields (pipe-separated)
            const genres = splitList(row.genres);
            if (genres.length) item.genresList = genres;
            const platforms = splitList(row.platforms);
            if (platforms.length) item.platformsList = platforms;
            const cast = splitList(row.cast);
            if (cast.length) item.castList = cast;

            // Misc string fields
            if (row.director) item.director = row.director;
            if (row.imdb_id) item.imdbId = row.imdb_id;
            if (row.imdb_rating) item.imdbRating = row.imdb_rating;
            if (row.rt_rating) item.rtRating = row.rt_rating;
            if (row.region) item.region = row.region;
            if (row.tag) item.tag = row.tag;
            if (row.poster_path) item.poster_path = row.poster_path;
            if (row.backdrop_path) item.backdrop_path = row.backdrop_path;
            if (row.release_date) item.release_date = row.release_date;

            await setDoc(doc(db, 'users', props.uid, 'watchlist', String(id)), item);
            existingIds.add(String(id));
            setImportStats(p => ({ ...p, success: p.success + 1 }));
          } catch (err) {
            setImportStats(p => ({ ...p, skipped: p.skipped + 1 }));
            setErrorLog(prev => [...prev, {
              title: row.title || row.name || row.id || 'Unknown',
              reason: err.message || String(err),
            }]);
          }
        }

        setIsImporting(false);
        props.showToast('CSV Import Finished! 📂', 'success');
        if (csvInputRef) csvInputRef.value = '';
      } catch (err) {
        setIsImporting(false);
        props.showToast('Failed to read CSV. Is it valid?', 'error');
        if (csvInputRef) csvInputRef.value = '';
      }
    };
    reader.readAsText(file);
  };

  const importData = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        // Accept both V2 wrapped ({version, library:{watchlist}}) and V1 flat array
        let importedList;
        if (Array.isArray(parsed)) {
          importedList = parsed;
        } else if (parsed && parsed.library && Array.isArray(parsed.library.watchlist)) {
          importedList = parsed.library.watchlist;
        } else if (parsed && Array.isArray(parsed.watchlist)) {
          importedList = parsed.watchlist;
        } else {
          throw new Error('Invalid format. Expected an array or CineLog backup document.');
        }

        setIsImporting(true);
        setImportStats({ total: importedList.length, success: 0, skipped: 0 });
        setErrorLog([]);

        const existingIds = new Set(props.watchlist().map(m => String(m.id)));

        for (let i = 0; i < importedList.length; i++) {
          const item = importedList[i];
          try {
            if (!item.id) throw new Error('Missing ID in object');
            if (existingIds.has(String(item.id))) throw new Error('Already exists in Vault');
            await setDoc(doc(db, 'users', props.uid, 'watchlist', String(item.id)), item);
            existingIds.add(String(item.id));
            setImportStats(p => ({ ...p, success: p.success + 1 }));
          } catch (err) {
            setImportStats(p => ({ ...p, skipped: p.skipped + 1 }));
            setErrorLog(prev => [...prev, { title: item.title || item.name || 'Unknown', reason: err.message }]);
          }
        }

        setIsImporting(false);
        props.showToast('Import Finished! 📂', 'success');
        if (fileInputRef) fileInputRef.value = '';
      } catch (err) {
        setIsImporting(false);
        props.showToast('Failed to parse file. Is it a valid JSON?', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div class="animate-fade-in max-w-3xl mx-auto pb-10" role="main" aria-label="Data center">

      {/* Header */}
      <div class="flex items-center gap-3 mb-8 px-2">
        {/* FIX: var(--primary) → var(--p) */}
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center border"
          style="background: var(--p-dim); border-color: color-mix(in srgb, var(--p) 50%, transparent)"
          aria-hidden="true"
        >
          <Icon name="sync" style="color: var(--p)" aria-hidden="true" />
        </div>
        <div>
          <h2 class="text-3xl font-headline font-black drop-shadow-md text-white">Data Center</h2>
          <p class="type-caption text-gray-400 mt-1">Maintenance &amp; Backups</p>
        </div>
      </div>

      {/* Empty vault notice */}
      <Show when={props.watchlist().length === 0}>
        <div class="empty-state py-12 glass-surface rounded-[2rem] border border-white/5 mb-8 animate-fade-up">
          <div class="empty-state-icon" aria-hidden="true">
            <Icon name="inventory_2" style="color: var(--muted); font-size: 36px" />
          </div>
          <p class="empty-state-title">Vault is Empty</p>
          <p class="empty-state-body">Add titles to your vault before running a Deep Scan or creating a backup.</p>
        </div>
      </Show>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Vault Repair Engine ── */}
        <div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div class="absolute top-0 right-0 w-32 h-32 pointer-events-none" style="background: var(--p-glow); opacity: 0.08; filter: blur(50px); border-radius: 50%" aria-hidden="true" />

          <div>
            <h3 class="text-lg font-black text-white flex items-center gap-2 mb-2">
              <Icon name="build_circle" style="color: var(--p)" aria-hidden="true" /> Vault Repair Engine
            </h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-6">
              Runs a deep background scan across all saved titles. Fetches missing streaming platforms, genres, and episodes from external APIs. Your personal edits remain 100% untouched.
            </p>
          </div>

          <Show when={isSyncing()}>
            <div class="bg-black/50 p-4 rounded-2xl border border-white/5 mb-6" role="status" aria-live="polite" aria-label={`Scanning: ${progress().current} of ${progress().total} titles`}>
              <div class="flex justify-between items-center mb-2">
                <span class="type-caption flex items-center gap-1" style="color: var(--p)">
                  <Icon name="radar" class="text-[12px] animate-spin" aria-hidden="true" /> Scanning Network
                </span>
                <span class="type-caption font-black" style="color: var(--p)">{progress().current} / {progress().total}</span>
              </div>
              <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3 shadow-inner" role="progressbar" aria-valuenow={progress().pct} aria-valuemin={0} aria-valuemax={100}>
                <div class="h-full transition-all duration-300" style={{ width: `${progress().pct}%`, background: 'var(--p)', 'box-shadow': '0 0 12px var(--p-glow)' }} />
              </div>
              <p class="type-caption text-gray-300 font-bold truncate">{syncLog()}</p>
            </div>
          </Show>

          <Show when={!isSyncing() && syncLog().includes('Complete')}>
            <div class="border p-3 rounded-xl mb-6 flex items-center gap-2" style="background: rgba(74,222,128,0.08); border-color: rgba(74,222,128,0.25); color: #4ade80" role="status">
              <Icon name="check_circle" class="text-[14px]" aria-hidden="true" />
              <span class="type-caption font-black">{syncLog()}</span>
            </div>
          </Show>

          <button
            disabled={isSyncing()}
            onClick={runDeepScan}
            class="w-full font-black py-4 rounded-xl type-caption transition-all flex items-center justify-center gap-2"
            style={isSyncing()
              ? 'background: var(--raised); color: var(--dim); cursor: not-allowed; border: 1px solid var(--border)'
              : 'background: var(--p); color: #05060a; box-shadow: 0 0 24px var(--p-glow)'}
            aria-label={isSyncing() ? 'Sync in progress, please wait' : 'Start deep scan of vault'}
            aria-busy={isSyncing()}
          >
            <Icon name={isSyncing() ? 'hourglass_empty' : 'radar'} class="text-[14px]" aria-hidden="true" />
            {isSyncing() ? 'Sync in Progress…' : 'Start Deep Scan'}
          </button>
        </div>

        {/* ── Local Backup & Restore ── */}
        <div class="glass-surface p-6 sm:p-8 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col justify-start">
          <div>
            <h3 class="text-lg font-black text-white flex items-center gap-2 mb-2">
              {/* FIX: text-[var(--secondary)] → style color: var(--p2) */}
              <Icon name="download" style="color: var(--p2)" aria-hidden="true" /> Local Backup &amp; Restore
            </h3>
            <p class="text-xs text-gray-400 leading-relaxed mb-6">
              Export your cinematic universe to a JSON file, or restore from a previous backup. Duplicate entries are automatically skipped.
            </p>
          </div>

          <div class="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <Icon name="folder_zip" class="text-3xl text-gray-500" aria-hidden="true" />
              <div>
                <h4 class="text-xs font-black text-white">Vault Size</h4>
                {/* FIX: text-[var(--secondary)] → style color: var(--p2) */}
                <p class="type-caption font-bold" style="color: var(--p2)">{props.watchlist().length} Titles</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-2">
            <button
              onClick={exportData}
              class="font-black py-3 rounded-xl type-caption transition-all flex items-center justify-center gap-1.5 active:scale-95"
              style="background: var(--p-dim); color: var(--p); border: 1px solid var(--p); box-shadow: 0 0 12px var(--p-glow)"
              aria-label="Export vault as JSON backup"
            >
              <Icon name="file_download" class="text-[14px]" aria-hidden="true" /> Export JSON
            </button>

            <input type="file" accept="application/json,.json" class="hidden" ref={fileInputRef} onChange={importData} aria-hidden="true" />

            <button
              disabled={isImporting()}
              onClick={() => fileInputRef.click()}
              class="font-black py-3 rounded-xl type-caption transition-all flex items-center justify-center gap-1.5 active:scale-95"
              style={isImporting()
                ? 'background: var(--raised); color: var(--dim); cursor: not-allowed; border: 1px solid var(--border)'
                : 'background: rgba(255,120,196,0.12); color: var(--p2); border: 1px solid var(--p2)'}
              aria-label={isImporting() ? 'Import in progress, please wait' : 'Import vault from JSON backup'}
              aria-busy={isImporting()}
            >
              <Icon name={isImporting() ? 'hourglass_empty' : 'file_upload'} class="text-[14px]" aria-hidden="true" />
              {isImporting() ? 'Wait…' : 'Import JSON'}
            </button>
          </div>

          {/* ── CSV Import / Export — placed BELOW JSON Import / Export ── */}
          <div class="mt-4 pt-4 border-t border-white/5">
            <div class="flex items-center gap-2 mb-3">
              <Icon name="table_chart" class="text-[14px]" style="color: var(--p2)" aria-hidden="true" />
              <h4 class="text-xs font-black text-white">CSV (Spreadsheet)</h4>
            </div>
            <p class="text-[10px] text-gray-500 leading-relaxed mb-3">
              Compatible with CineLog-V2 CSV import. Columns: id, title, media_type, status, rating, watch_date, added_at, notes.
            </p>
            <div class="grid grid-cols-2 gap-3">
              <button
                onClick={exportCsv}
                class="font-black py-3 rounded-xl type-caption transition-all flex items-center justify-center gap-1.5 active:scale-95"
                style="background: var(--p-dim); color: var(--p); border: 1px solid var(--p); box-shadow: 0 0 12px var(--p-glow)"
                aria-label="Export vault as CSV spreadsheet"
              >
                <Icon name="table_chart" class="text-[14px]" aria-hidden="true" /> Export CSV
              </button>

              <input type="file" accept=".csv,text/csv" class="hidden" ref={csvInputRef} onChange={importCsv} aria-hidden="true" />

              <button
                disabled={isImporting()}
                onClick={() => csvInputRef.click()}
                class="font-black py-3 rounded-xl type-caption transition-all flex items-center justify-center gap-1.5 active:scale-95"
                style={isImporting()
                  ? 'background: var(--raised); color: var(--dim); cursor: not-allowed; border: 1px solid var(--border)'
                  : 'background: rgba(255,120,196,0.12); color: var(--p2); border: 1px solid var(--p2)'}
                aria-label={isImporting() ? 'Import in progress, please wait' : 'Import vault from CSV spreadsheet'}
                aria-busy={isImporting()}
              >
                <Icon name={isImporting() ? 'hourglass_empty' : 'table_chart'} class="text-[14px]" aria-hidden="true" />
                {isImporting() ? 'Wait…' : 'Import CSV'}
              </button>
            </div>
          </div>

          <Show when={isImporting() || importStats().total > 0}>
            <div class="bg-black/50 p-4 rounded-2xl border border-white/5 mt-2 animate-fade-in" role="status" aria-live="polite" aria-label={`Import: ${importStats().success + importStats().skipped} of ${importStats().total} processed`}>
              <div class="flex justify-between items-center mb-2">
                <span class="type-caption flex items-center gap-1" style="color: var(--p)">
                  <Icon name={isImporting() ? 'cloud_sync' : 'cloud_done'} class="text-[12px]" aria-hidden="true" />
                  {isImporting() ? 'Importing…' : 'Complete'}
                </span>
                <span class="type-caption font-bold text-white">{importStats().success + importStats().skipped} / {importStats().total}</span>
              </div>
              <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3" role="progressbar" aria-valuenow={Math.round(((importStats().success + importStats().skipped) / Math.max(importStats().total, 1)) * 100)} aria-valuemin={0} aria-valuemax={100}>
                <div class="h-full rounded-full transition-all duration-300" style={{ width: `${((importStats().success + importStats().skipped) / Math.max(importStats().total, 1)) * 100}%`, background: 'var(--p)' }} />
              </div>
              <div class="flex gap-4 type-caption font-bold">
                <span style="color: #4ade80">Success: {importStats().success}</span>
                <span style="color: #f87171">Skipped: {importStats().skipped}</span>
              </div>
            </div>
          </Show>

          <Show when={errorLog().length > 0}>
            <div class="mt-4 p-4 rounded-2xl animate-fade-in border" style="background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.2)" role="log" aria-label="Import error log">
              <div class="flex justify-between items-center border-b pb-2 mb-2" style="border-color: rgba(248,113,113,0.2)">
                <span class="type-caption flex items-center gap-1" style="color: #f87171">
                  <Icon name="error" class="text-[14px]" aria-hidden="true" /> Skipped Log
                </span>
                <button
                  onClick={() => { setErrorLog([]); setImportStats({ total: 0, success: 0, skipped: 0 }); }}
                  class="type-caption px-2 py-1 rounded transition-all active:scale-95"
                  style="background: rgba(248,113,113,0.15); color: #f87171"
                  aria-label="Clear error log"
                >
                  Clear Log
                </button>
              </div>
              <div class="max-h-24 overflow-y-auto hide-scrollbar space-y-1">
                <For each={errorLog()}>{(err) => (
                  <div class="type-caption flex justify-between text-gray-300 border-b pb-1 mb-1 last:border-0" style="border-color: rgba(248,113,113,0.1)">
                    <span class="truncate pr-2 font-bold w-1/2">{err.title}</span>
                    <span class="truncate w-1/2 text-right" style="color: rgba(248,113,113,0.7)">{err.reason}</span>
                  </div>
                )}</For>
              </div>
            </div>
          </Show>
        </div>

      </div>
    </div>
  );
}
