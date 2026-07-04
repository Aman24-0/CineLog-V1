# 🎬 Cinelog 

Cinelog is a blazing-fast, personalized movie and TV show tracking universe. Built with **SolidJS** and **Firebase**, it allows users to search for media, track their watch progress, organize franchises, and gain insights with premium microinteractions. ✨

![Cinelog Preview](public/icons/android-chrome-512x512.png) 

## ✨ Features

* **🌌 The Vault (Watchlist):** Track your movies and series with advanced filtering (Grid & Timeline views), custom tags, and personal ratings.
* **📺 Advanced TV Tracking:** Track individual episodes, season timelines, and auto-resume where you left off.
* **▶️ Direct Play Streaming:** Built-in video player using customizable third-party embed servers (VidZee, Vidsrc, AutoEmbed, etc.) or custom Direct Play URLs.
* **📊 Personal Analytics:** Visual insights into your watching habits, total watch time, top genres, and favorite actors.
* **📁 Franchises & Lists:** Group movies and series into custom collections (e.g., "Marvel Cinematic Universe", "Favorites").
* **📅 Upcoming Releases:** Track unreleased movies and upcoming TV seasons directly in your dashboard.
* **🎨 Dynamic Themes:** Choose from multiple themes (Sage, Matrix, Netflix, Cinematic, etc.) to customize your UI.
* **🔄 Data Sync:** Easily export your entire vault to JSON and import it back anytime.
* **📱 PWA Ready:** Install Cinelog as a Progressive Web App on your mobile device for a native app experience.
* **✨ Premium Microinteractions:** Industry-grade animations, haptic feedback, and tactile UI polish comparable to Trakt, Letterboxd, and Netflix.

## 🛠 Tech Stack

* **Frontend:** [SolidJS](https://www.solidjs.com/) (Reactive UI) + Vite
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables + Premium Animations
* **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore & Google Auth)
* **APIs:** TMDB (The Movie Database) & OMDb (Open Movie Database)
* **Deployment:** Netlify

## 📂 Project Structure

```text
cinelog-main/
├── public/                 # Static assets, PWA manifest, and icons
├── src/
│   ├── components/         # Reusable UI components (MovieCard, DirectPlayPlayer, etc.)
│   ├── hooks/              # Custom SolidJS hooks (Modal state, TMDB fetchers, Microinteractions)
│   ├── modals/             # Overlay screens (DetailsModal, SearchModal, Settings)
│   ├── services/           # External API & Database logic
│   ├── views/              # Main app pages (Dashboard, Vault, Analytics, etc.)
│   ├── App.jsx             # Main application layout and router logic
│   ├── firebase.js         # Firebase initialization and config
│   ├── main.jsx            # SolidJS entry point
│   ├── utils.jsx           # Helper functions, formatters, and API constants
│   └── index.css           # Tailwind imports + Premium Animations & Microinteractions
├── MICROINTERACTIONS.md    # Premium microinteractions guide
├── .env.example            # Example environment variables
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Firebase account
- TMDB API key
- OMDb API key (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/Aman24-0/cinelog.git
cd cinelog

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Firebase and API keys

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` in your browser.

## 🎮 Usage

1. **Sign in** with Google to create your personal vault
2. **Search** for movies/shows using TMDB database
3. **Track progress** by marking episodes watched or setting completion status
4. **Rate & review** with personal scores and notes
5. **Organize** into franchises, lists, and custom collections
6. **Stream** directly using integrated player or custom streaming servers
7. **Export/Import** your vault as JSON for backup

## 🎨 Premium Microinteractions

This version includes industry-grade microinteractions:

- **Smart Toast Notifications** with haptic feedback
- **Ripple Effects** on button presses
- **Spring Physics** animations for natural motion
- **Glow Pulses** for emphasis
- **Stagger Animations** for lists
- **Progress Bar Fills** with smooth easing
- **Rating Celebrations** with scale effects
- **Heart Beat** on favorite toggle
- **Keyboard Focus Rings** for accessibility

See `MICROINTERACTIONS.md` for full documentation.

## 🔐 Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_TMDB_API_KEY=your_tmdb_key
VITE_OMDB_API_KEY=your_omdb_key (optional)
```

## 📦 Build & Deployment

```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Build
npm run preview
```

Deploy to Netlify, Vercel, or any static host:
- Built files are in `dist/`
- Supports PWA installation
- Works offline with service workers

## 🎯 Performance

- ⚡ Blazing-fast SolidJS reactivity
- 🎨 GPU-accelerated animations
- 📦 Optimized bundle size
- 🔄 Real-time Firestore sync
- 💾 Efficient caching strategies

## 🛣️ Roadmap

- [ ] Social features (friends, sharing lists)
- [ ] Advanced search filters
- [ ] Custom watch party experience
- [ ] AI-powered recommendations
- [ ] Dark/Light mode refinement
- [ ] Performance optimizations

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project as inspiration or base for your own.

## 🎬 Credits

- **UI Inspiration:** Trakt, Letterboxd, Netflix, TV Time
- **Data:** TMDB & OMDb APIs
- **Framework:** SolidJS
- **Styling:** Tailwind CSS

## 📞 Support

- 🐛 Found a bug? Open an issue
- 💡 Feature request? Suggest in discussions
- 📧 Questions? Contact via GitHub

---

**Made with ❤️ for movie and TV lovers**

Visit: [cinelog.netlify.app](https://cinlog.netlify.app/)
