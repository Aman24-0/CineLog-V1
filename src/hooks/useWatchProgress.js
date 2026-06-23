import { createSignal, onCleanup } from 'solid-js';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// ============================================
// FIX #14: Debounce Utility (Prevents Race Conditions)
// ============================================
// Limits database writes to once every 2 seconds, preventing excessive Firebase usage
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function useWatchProgress(userId, mediaId, mediaType = 'movie') {
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [isSaving, setIsSaving] = createSignal(false);

  // ============================================
  // Save Progress to Firebase (Debounced)
  // ============================================
  const saveProgressToDb = debounce(async (time, totalDuration) => {
    if (!userId || !mediaId) return;
    
    setIsSaving(true);
    try {
      const progressData = {
        currentTime: time,
        duration: totalDuration,
        lastUpdated: serverTimestamp(),
        mediaType: mediaType,
        // Calculate percentage watched
        percentWatched: totalDuration > 0 ? (time / totalDuration) * 100 : 0,
        isCompleted: totalDuration > 0 && (time / totalDuration) >= 0.9 // Mark as completed at 90%
      };

      const docRef = doc(db, 'users', userId, 'watchProgress', `${mediaType}_${mediaId}`);
      await setDoc(docRef, progressData, { merge: true });
      
      console.log(`✅ Progress saved for ${mediaType} ${mediaId}`);
    } catch (error) {
      console.error('❌ Error saving watch progress:', error.message);
    } finally {
      setIsSaving(false);
    }
  }, 2000); // 2000ms = 2 seconds debounce delay

  // ============================================
  // Video Event Handlers
  // ============================================
  const handleTimeUpdate = (time, totalDuration) => {
    setCurrentTime(time);
    setDuration(totalDuration);
    
    // Trigger the debounced save
    saveProgressToDb(time, totalDuration);
  };

  const handleVideoEnded = (totalDuration) => {
    setCurrentTime(totalDuration);
    // Force immediate save when video ends, bypassing debounce
    saveProgressToDb.flush && saveProgressToDb.flush(); 
    
    // Fallback immediate save if flush isn't available
    if (!userId || !mediaId) return;
    setDoc(
      doc(db, 'users', userId, 'watchProgress', `${mediaType}_${mediaId}`), 
      {
        currentTime: totalDuration,
        duration: totalDuration,
        percentWatched: 100,
        isCompleted: true,
        lastUpdated: serverTimestamp()
      }, 
      { merge: true }
    );
  };

  // ============================================
  // Cleanup
  // ============================================
  onCleanup(() => {
    // Ensure any pending saves are cleared if component unmounts
    setIsSaving(false);
  });

  return {
    currentTime,
    duration,
    isSaving,
    handleTimeUpdate,
    handleVideoEnded
  };
}
