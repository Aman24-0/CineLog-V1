# CineLog v1.0.1

> **Your personal cinematic universe.** Track every movie and TV series
> with rich metadata, cloud sync, analytics, and configurable streaming
> providers.

![CineLog](https://img.shields.io/badge/CineLog-v1.0.1-brightgreen?style=flat-square)
![SolidJS](https://img.shields.io/badge/SolidJS-1.9.13-blue?style=flat-square)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-square)
![Netlify](https://img.shields.io/badge/Hosting-Netlify-teal?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat-square)

------------------------------------------------------------------------

# What's New in v1.0.1

## ✨ IMDb Streaming Support

CineLog now supports both **TMDB ID** and **IMDb ID** based streaming
providers.

Simply configure your streaming server with:

``` text
https://your-domain.com/play/{imdb_id}
```

When the user presses **Watch Now**, CineLog automatically:

TMDB ID

↓

Fetch IMDb ID from TMDB External IDs API

↓

Replace `{imdb_id}` inside the template

↓

Generate the final streaming URL

↓

Launch the player automatically

No manual URL editing is required.

------------------------------------------------------------------------

## Improvements

-   Automatic IMDb ID resolution
-   New **ID Mode** option inside Streaming Server Settings
-   Existing TMDB servers continue working without modification
-   Cleaner streaming pipeline
-   Improved playback reliability

------------------------------------------------------------------------

## Fixed

-   Restored original Details Modal layout
-   Restored Ratings Panel position
-   Restored Genres section
-   Restored Close button
-   Fixed TV Details page crash
-   Fixed IMDb playback pipeline
-   Fixed player URL generation
-   Fixed streaming regressions introduced during previous
    implementation

------------------------------------------------------------------------

# Core Features

-   Personal Movie & TV Vault
-   Dashboard
-   Timeline View
-   Analytics
-   Upcoming Releases
-   Deep Scan
-   Backup & Restore
-   Streaming Server Configuration
-   IMDb & TMDB Streaming Support
-   Firebase Cloud Sync
-   Google Authentication
-   PWA Support
-   Multiple Themes

------------------------------------------------------------------------

# Streaming Server Templates

## TMDB Mode

Movie

``` text
https://example.com/movie/{id}
```

TV

``` text
https://example.com/tv/{id}/{season}/{episode}
```

## IMDb Mode

Movie / TV

``` text
https://example.com/play/{imdb_id}
```

Supported placeholders:

-   `{id}`
-   `{season}`
-   `{episode}`
-   `{imdb_id}`

------------------------------------------------------------------------

# Tech Stack

-   SolidJS
-   JavaScript
-   Vite
-   Firebase Firestore
-   Firebase Authentication
-   TMDB API
-   OMDb API
-   Tailwind CSS
-   Netlify
-   Workbox PWA

------------------------------------------------------------------------

# Roadmap

## Completed

-   Dashboard
-   Vault
-   Timeline
-   Analytics
-   Streaming Servers
-   IMDb Streaming
-   Themes
-   Backup & Restore
-   Deep Scan
-   PWA

## Coming Next

-   Enhanced Discovery
-   Better Continue Watching
-   Collections Improvements
-   Recommendation Engine
-   CineLog Phase 2 Foundation

------------------------------------------------------------------------

Built with ❤️ using SolidJS, Firebase, TMDB and OMDb.
