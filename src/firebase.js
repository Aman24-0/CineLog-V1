import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ── Step 1: Import the new Firebase AI Logic SDK ─────────────────────────────
// Run this in your terminal first:
//   npm install firebase@latest
// The AI Logic SDK is bundled inside firebase >=10.13.0
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';

const firebaseConfig = {
  apiKey: "AIzaSyAvV2m7IAbDGSr0ZdFNv9Rnq9oUEAgufyI",
  authDomain: "watchlist-bcdfd.firebaseapp.com",
  projectId: "watchlist-bcdfd",
  storageBucket: "watchlist-bcdfd.firebasestorage.app",
  messagingSenderId: "479628005507",
  appId: "1:479628005507:web:12e0aa5b98977c82860bb6"
};

const app = initializeApp(firebaseConfig);

// ── Existing services (unchanged) ────────────────────────────────────────────
export const db = getFirestore(app);
export const auth = getAuth(app);

// ── Step 2: Initialize Firebase AI Logic with the Gemini Developer API ───────
//
//  TWO OPTIONS — choose one:
//
//  OPTION A — Gemini Developer API (free tier, no billing required)
//  Enable it at: Firebase Console → AI Logic → Get started → Gemini Developer API
//
const ai = getAI(app, { backend: new GoogleAIBackend() });

//  OPTION B — Vertex AI Gemini API (enterprise, Blaze plan required)
//  Uncomment below and remove the GoogleAIBackend lines above:
//
//  import { getAI, getGenerativeModel, VertexAIBackend } from 'firebase/ai';
//  const ai = getAI(app, { backend: new VertexAIBackend() });

// ── Step 3: Export a ready-to-use Gemini model instance ──────────────────────
//  gemini-2.0-flash is the recommended model: fast, multimodal, generous quota.
export const geminiModel = getGenerativeModel(ai, { model: 'gemini-2.0-flash' });
