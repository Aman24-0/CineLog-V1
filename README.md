# CineLog v1.0

> **Your personal cinematic universe.**
> Track every movie and series you watch — ratings, progress, platforms, timelines, and more.

![CineLog](https://img.shields.io/badge/CineLog-v1.0-brightgreen?style=flat-square)
![SolidJS](https://img.shields.io/badge/SolidJS-1.9.13-blue?style=flat-square)
![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange?style=flat-square)
![Netlify](https://img.shields.io/badge/Deployed-Netlify-teal?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat-square)

---

## Overview

CineLog is a personal movie and TV tracking Progressive Web App. It combines TMDB's rich metadata, OMDb ratings, Firebase real-time sync, and a custom streaming server integration into a single-user cinematic dashboard. The UI is designed to match the quality of commercial apps like Letterboxd, Trakt, and TV Time — dark, premium, and fast.

---

## Features

### Core Tracking
- Add movies and TV series to a personal **Vault** with status: `Planned`, `Watching`, or `Completed`
- Track **current season and episode** for TV shows
- Set **watch dates** and **season start/end timelines**
- Record personal **ratings** (0–10)
- Write **private notes** per title
- Assign **custom tags** (e.g. Theatre, Rewatch)
- Track **platforms watched on** (Netflix, Prime, JioHotstar, etc.)

### Discovery
- **TMDB-powered search** with multi-type results (movies, series, people)
- **Person modal** — browse an actor or director's full filmography, add titles directly
- **Upcoming releases** — Indian and International, filterable by language and media type
- **Similar titles** suggested inside each detail view

### Vault Management
- **Grid view** — responsive poster grid with rating pills
- **Timeline view** — chronological watch history grouped by month
- **Advanced filters**: status, type, region, genre, platform, tag, IMDb range, RT range, year range, runtime range
- **Sort options**: recently added, watch date, release year, rating, title A–Z
- **Infinite scroll** with on-demand loading

### Detail Modal
- Cinematic backdrop + trailer embed (YouTube)
- IMDb / Rotten Tomatoes / personal score panel
- Full cast and crew list with person deep-dive
- TV episode tracker per season with watched-episode toggle
- Watch progress bar (resume where you left off)
- Integrated streaming player via configurable custom servers or direct URL
- Share / copy title details

### Lists (Franchises)
- Create named folders to organise film collections or franchises
- Sub-folders supported (nested hierarchy)
- Auto-detect MCU, DCEU and other collections on add
- Custom ordering with direct position jump
- Bulk-add missing collection parts from TMDB
- PDF / print export (sorted by custom order, release year, or sub-collection)

### Analytics
- Movies vs TV shows donut chart
- Rating distribution histogram
- Genre distribution bars
- Monthly watch trend line chart
- Top actors (ring chart)
- Top directors (bar chart)
- Vault completion percentage

### Data & Sync
- **Deep Scan** — background repair engine that fetches missing genres, platforms, and episode counts from TMDB without touching personal edits
- **Export** — full vault as a JSON backup file
- **Import** — restore from backup with automatic duplicate detection and skipped-item log

### Streaming Integration
- Add custom streaming server URLs with `{id}`, `{season}`, `{episode}` template variables
- Per-server enable/disable toggle
- Direct Play mode — paste any direct URL
- Watch progress saved per title per server, with resume support
- Player session elapsed-time tracking

### PWA
- Installable on iOS and Android home screen
- Offline-capable shell via Workbox service worker
- Precached assets for instant load

### Authentication
- Google Sign-In via Firebase Auth
- Guest mode — browse and search without an account
- All vault data is private per user (Firestore security rules)

---

## Screens

| Screen | Route / View |
|---|---|
| **Dashboard** | `dashboard` — featured hero, stat cards, continue watching, recently added |
| **Vault** | `watchlist` — full grid or timeline with filters |
| **Search** | Modal — TMDB multi-search with recent and suggested queries |
| **Lists** | `franchises` — folder-based collection management |
| **Upcoming** | `upcoming` — release radar by date, region, language |
| **Analytics** | `analytics` — personal watch statistics |
| **Data Sync** | `sync` — vault repair, backup, restore |
| **Settings / Profile** | `settings` — theme selector, streaming servers, account actions |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SolidJS](https://www.solidjs.com/) 1.9.13 |
| Build tool | [Vite](https://vitejs.dev/) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3 (utility classes) + custom CSS design system |
| Database | [Firebase Firestore](https://firebase.google.com/docs/firestore) |
| Auth | [Firebase Authentication](https://firebase.google.com/docs/auth) (Google provider) |
| Movie data | [TMDB API](https://www.themoviedb.org/documentation/api) |
| Ratings data | [OMDb API](https://www.omdbapi.com/) |
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) + Workbox |
| Hosting | [Netlify](https://www.netlify.com/) |
| Fonts | Bebas Neue · Azeret Mono · Outfit (Google Fonts) |

---

## Folder Structure

```
cinelog/
├── public/
│   ├── favicon.ico
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # PWA icons (192, 512)
├── src/
│   ├── App.jsx                # Root — routing, auth, nav, toasts
│   ├── firebase.js            # Firebase init
│   ├── index.css              # Global design system (tokens, animations, utilities)
│   ├── utils.jsx              # Icon, formatRuntime, SafeInfoRow, TMDB/OMDb helpers
│   │
│   ├── components/
│   │   ├── MovieCard.jsx          # Poster card with rating pills and status badge
│   │   ├── LoadingScreen.jsx      # Full-screen splash
│   │   ├── DirectPlayPlayer.jsx   # Native HTML5 video player
│   │   └── details/
│   │       ├── MediaHeader.jsx    # Backdrop + title + action buttons
│   │       ├── RatingsPanel.jsx   # IMDb / RT / personal score row
│   │       ├── EditForm.jsx       # Inline vault entry editor
│   │       ├── StreamingPanel.jsx # Server selector + player launch
│   │       ├── TvTracker.jsx      # Season/episode progress tracker
│   │       ├── CastCrewList.jsx   # Cast and crew horizontal scroll
│   │       └── InfoGrid.jsx       # Metadata, platforms, similar titles
│   │
│   ├── hooks/
│   │   ├── useModalState.jsx      # Centralised modal open/close state
│   │   ├── useMicrointeractions.jsx # Toast system + animation utilities
│   │   ├── useTmdbDetails.jsx     # TMDB detail + trailer + platforms fetch
│   │   ├── useOmdbRatings.jsx     # OMDb IMDb + RT ratings fetch
│   │   ├── useWatchProgress.jsx   # Player progress tracking + Firebase sync
│   │   └── useEpisodeTracking.jsx # TV episode watched state per season
│   │
│   ├── modals/
│   │   ├── DetailsModal.jsx       # Full detail sheet for any title
│   │   ├── SearchModal.jsx        # Search overlay with keyboard navigation
│   │   ├── PersonModal.jsx        # Actor / director filmography modal
│   │   ├── ServerSettingsModal.jsx # Custom streaming server config
│   │   └── Modals.jsx             # Standalone theme picker modal
│   │
│   └── views/
│       ├── Dashboard.jsx          # Home screen
│       ├── Vault.jsx              # Vault grid + timeline + filters
│       ├── Analytics.jsx          # Stats and charts
│       ├── DataSync.jsx           # Backup, restore, deep scan
│       ├── FranchisesView.jsx     # Lists / franchise folders
│       ├── SettingsView.jsx       # Profile + theme + nav
│       └── UpcomingView.jsx       # Release radar
├── netlify.toml               # Build config + redirects + headers
├── vite.config.js             # Vite + PWA config
└── tailwind.config.js         # Tailwind config
```

---

## Environment Variables

Create a `.env` file at the project root. All variables must be prefixed with `VITE_`:

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# TMDB
VITE_TMDB_API_KEY=

# OMDb
VITE_OMDB_API_KEY=
```

On Netlify, add these under **Site settings → Environment variables**. The `netlify.toml` references them by name in the `environment` block.

---

## Installation

```bash
# Clone
git clone https://github.com/your-username/cinelog.git
cd cinelog

# Install dependencies
npm install
```

---

## Development

```bash
npm run dev
```

Starts Vite dev server at `http://localhost:5173`.

Hot module replacement is enabled. Firebase connects to production Firestore (there is no emulator config by default — add one if needed).

---

## Build

```bash
npm run build
```

Output goes to `dist/`. The PWA plugin generates `dist/sw.js` and `dist/workbox-*.js`. Preview the production build locally:

```bash
npm run preview
```

---

## Netlify Deployment

The `netlify.toml` configures everything:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/tmdb/*"
  to = "https://api.themoviedb.org/3/:splat"
  status = 200
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    Cross-Origin-Opener-Policy = "same-origin-allow-popups"
```

The TMDB redirect proxies API calls through Netlify to avoid CORS issues in some environments. The COOP header is required for Google Sign-In popup flow.

**Deploy steps:**
1. Push to GitHub
2. Connect repo in Netlify
3. Set environment variables in Netlify dashboard
4. Deploy — Netlify auto-builds on every push to `main`

---

## Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** (production mode)
3. Enable **Authentication** → Google provider
4. Copy your web app config into `.env`

### Firestore Data Structure

```
users/
  {uid}/
    watchlist/
      {tmdbId}/        ← one document per title
        id, title, media_type, poster_path, backdrop_path,
        status, rating, watchDate, notes, region, season, episode,
        totalEps, runtime, genresList[], platformsList[], castList[],
        tag, seasonDates{}, franchises{folderId: order},
        watchProgress{currentTime, duration, server, updatedAt, season, episode},
        addedAt (Timestamp)
    franchises/
      {folderId}/      ← one document per folder
        name, parentId, tmdbCollectionId, universeKey, coverImage, createdAt
```

### Firestore Security Rules (recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## TMDB Setup

1. Create an account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to **Settings → API → Create API Key** (free, Developer tier)
3. Copy the **API Key (v3 auth)** into `VITE_TMDB_API_KEY`

TMDB is used for: search, movie/TV details, trailers, cast/crew, watch providers, upcoming releases, person filmographies, and collection data.

---

## OMDb Setup

1. Register at [omdbapi.com](https://www.omdbapi.com/apikey.aspx) (free tier: 1,000 requests/day)
2. Verify your email and copy the key into `VITE_OMDB_API_KEY`

OMDb is used for: IMDb scores and Rotten Tomatoes percentages displayed in the detail modal and on movie cards.

---

## PWA

CineLog is a fully installable Progressive Web App.

- **Manifest** — `public/manifest.json` defines name, icons, theme colour, display mode (`standalone`)
- **Service Worker** — generated by `vite-plugin-pwa` using Workbox in `generateSW` mode
- **Precache** — all built JS/CSS/HTML chunks are precached on install
- **Install prompt** — handled by the browser's native install UI (no custom prompt)

To customise icons, replace the files in `public/icons/` (192×192 and 512×512 PNG) and update `manifest.json`.

---

## Theme System

CineLog ships with 8 built-in colour themes. The active theme is stored in `localStorage` and applied as a class on `<body>`.

| Theme | Primary Colour |
|---|---|
| Pearl | `#ffffff` |
| Sage | `#a8ff78` (default) |
| Matrix | `#39ff14` |
| Netflix | `#ff2d55` |
| Cinematic | `#FFD700` |
| Interstellar | `#00c2ff` |
| Neon Horizon | `#ff2af0` |
| Vibranium | `#9d4edd` |

Each theme sets four CSS custom properties:

```css
--p        /* primary colour */
--p2       /* secondary / accent colour */
--p-glow   /* rgba glow for box-shadow */
--p-dim    /* low-opacity tint for backgrounds */
```

All components reference `var(--p)` exclusively — switching themes requires only changing the body class.

---

## Accessibility

- All icon-only buttons have `aria-label`
- All form inputs have `<label for="">` associations
- Modal dialogs use `role="dialog"` + `aria-modal="true"` + `aria-label`
- Navigation uses `role="navigation"` + `aria-current="page"` on active items
- Toggle switches use `role="switch"` + `aria-checked`
- Charts use `role="img"` + descriptive `aria-label`
- Loading states use `role="status"` + `aria-live="polite"`
- Error states use `role="alert"`
- Search input uses `role="combobox"` + `aria-autocomplete` + `aria-expanded`
- Result rows use `role="option"` + `aria-selected`
- Progress bars use `role="progressbar"` + `aria-valuenow`
- `prefers-reduced-motion` — all CSS animations are disabled when the system preference is set
- Minimum 44×44px touch targets on mobile (enforced via `@media (hover: none)`)
- Keyboard navigation — `focus-visible` rings on all interactive elements, `Enter`/`Space` handlers on custom interactive divs

---

## Performance

- All images use `loading="lazy"` + CSS opacity reveal (no layout shift)
- Image shimmer skeletons shown during load, hidden after
- `passive: true` on all scroll event listeners
- Infinite scroll with 20-item batches
- TMDB provider data cached in `localStorage` (7-day TTL)
- Firebase listeners use `onSnapshot` with cleanup in `onCleanup`
- All modals lock `document.body.style.overflow` and restore on unmount
- SolidJS fine-grained reactivity — only changed DOM nodes update, no virtual DOM diffing
- PWA precaching for instant repeat loads

---

## License

MIT — free to use, modify, and distribute for personal and commercial projects. Attribution appreciated but not required.

---

## Future Roadmap (v1.1 Ideas)

- **Watchparty mode** — sync playback position with a friend in real-time via Firestore
- **Recommendation engine** — suggest unwatched titles based on genre and rating history
- **Social profiles** — public vault pages with follow and compare features
- **Letterboxd import** — parse Letterboxd CSV export and bulk-import completed films
- **Trakt sync** — two-way sync with Trakt.tv via OAuth
- **Multiple watchlists** — separate vaults (e.g. "Cinema Only", "Kids", "Rewatches")
- **Episode air-date alerts** — push notifications for upcoming episodes of Watching titles
- **Advanced streaming** — picture-in-picture support, keyboard media key controls
- **Review / journal** — longer-form write-up with spoiler toggle per title
- **Statistics export** — export analytics as PDF or shareable image card

---

*Built with SolidJS · Firebase · TMDB · ❤️*
