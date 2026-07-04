import { createSignal } from 'solid-js';

/**
 * Premium Microinteractions Hook
 * Provides enhanced toast notifications, haptic feedback, and animation utilities
 * Designed for CineLog's neon aesthetic
 */

export const useMicrointeractions = () => {
  const [toasts, setToasts] = createSignal([]);
  let toastId = 0;

  /**
   * Show toast notification with premium animation
   * @param {string} msg - Message to display
   * @param {string} type - 'success' | 'error' | 'info' | 'action'
   * @param {number} duration - Duration in ms (default 3000)
   * @param {boolean} haptic - Trigger haptic feedback (default true)
   */
  const showToast = (msg, type = 'success', duration = 3000, haptic = true) => {
    const id = toastId++;
    const newToast = { id, msg, type, show: true };
    
    setToasts([...toasts(), newToast]);
    
    // Haptic feedback on supported devices
    if (haptic && navigator.vibrate) {
      if (type === 'error') navigator.vibrate([50, 100, 50]); // Error pattern
      else if (type === 'success') navigator.vibrate(50); // Quick confirmation
      else navigator.vibrate(30); // Subtle tap
    }

    if (duration > 0) {
      setTimeout(() => {
        setToasts(toasts().filter(t => t.id !== id));
      }, duration);
    }

    return id;
  };

  /**
   * Microinteraction: Item Added to Vault
   */
  const notifyItemAdded = (title, haptic = true) => {
    showToast(`Added "${title}" to Vault! 🍿`, 'success', 3000, haptic);
  };

  /**
   * Microinteraction: Rating Given
   */
  const notifyRatingGiven = (rating, haptic = true) => {
    showToast(`Rated ${rating}/10 ⭐`, 'success', 2500, haptic);
  };

  /**
   * Microinteraction: Episode Watched
   */
  const notifyEpisodeWatched = (episodeName, haptic = true) => {
    showToast(`Watched ${episodeName} ✓`, 'success', 2500, haptic);
  };

  /**
   * Microinteraction: Favorite/Bookmarked
   */
  const notifyFavorited = (haptic = true) => {
    showToast(`Added to favorites ❤️`, 'action', 2000, haptic);
  };

  /**
   * Microinteraction: Bookmark Toggle
   */
  const notifyBookmarked = (bookmarked, haptic = true) => {
    const msg = bookmarked ? `Bookmarked for later 📌` : `Removed bookmark`;
    showToast(msg, 'action', 2000, haptic);
  };

  /**
   * Microinteraction: Success Actions
   */
  const notifySuccess = (action, haptic = true) => {
    showToast(`${action} ✓`, 'success', 2000, haptic);
  };

  /**
   * Microinteraction: Delete Confirmation
   */
  const notifyDeleted = (itemName, haptic = true) => {
    showToast(`Removed "${itemName}" from Vault`, 'info', 2500, haptic);
  };

  /**
   * Microinteraction: Import/Export
   */
  const notifyImported = (count, haptic = true) => {
    showToast(`Imported ${count} item${count !== 1 ? 's' : ''} 📥`, 'success', 3000, haptic);
  };

  const notifyExported = (count, haptic = true) => {
    showToast(`Exported ${count} item${count !== 1 ? 's' : ''} 📤`, 'success', 3000, haptic);
  };

  /**
   * Microinteraction: Loading State
   */
  const notifyLoading = (msg = 'Loading...', haptic = true) => {
    const id = showToast(msg, 'info', -1, haptic);
    return () => setToasts(toasts().filter(t => t.id !== id));
  };

  /**
   * Microinteraction: Error Handling
   */
  const notifyError = (errorMsg, haptic = true) => {
    showToast(errorMsg, 'error', 4000, haptic);
  };

  /**
   * Microinteraction: Focus State Enhancement
   * Adds visual feedback for keyboard navigation
   */
  const handleFocusRing = (element) => {
    if (!element) return;
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        element.classList.add('focus-visible');
      }
    });
    element.addEventListener('mousedown', () => {
      element.classList.remove('focus-visible');
    });
  };

  /**
   * Trigger ripple effect on button
   */
  const triggerRipple = (element, event) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    ripple.style.position = 'absolute';
    ripple.style.pointerEvents = 'none';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  /**
   * Animate element entrance
   */
  const animateEntrance = (element, type = 'pop-in') => {
    if (!element) return;
    element.classList.add(`animate-${type}`);
  };

  /**
   * Animate element exit
   */
  const animateExit = (element, type = 'item-removed', callback) => {
    if (!element) return;
    element.classList.add(`animate-${type}`);
    setTimeout(() => {
      if (callback) callback();
      element.remove();
    }, 400);
  };

  /**
   * Scale/Press feedback for buttons
   */
  const handleButtonPress = (element) => {
    if (!element) return;
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 80);
  };

  /**
   * Pulse effect for badges/new items
   */
  const addPulseEffect = (element) => {
    if (!element) return;
    element.classList.add('badge-pulse');
    setTimeout(() => {
      element.classList.remove('badge-pulse');
    }, 800);
  };

  /**
   * Heart beat effect for favorites
   */
  const addHeartBeat = (element) => {
    if (!element) return;
    element.classList.add('animate-heart-beat');
    setTimeout(() => {
      element.classList.remove('animate-heart-beat');
    }, 600);
  };

  /**
   * Rating celebration effect
   */
  const celebrateRating = (element) => {
    if (!element) return;
    element.classList.add('animate-rating-celebration');
    setTimeout(() => {
      element.classList.remove('animate-rating-celebration');
    }, 600);
  };

  /**
   * Progress bar fill animation
   */
  const animateProgressFill = (element, targetWidth) => {
    if (!element) return;
    element.style.setProperty('--target-width', `${targetWidth}%`);
    element.classList.add('animate-progress-fill');
  };

  return {
    toasts,
    showToast,
    notifyItemAdded,
    notifyRatingGiven,
    notifyEpisodeWatched,
    notifyFavorited,
    notifyBookmarked,
    notifySuccess,
    notifyDeleted,
    notifyImported,
    notifyExported,
    notifyLoading,
    notifyError,
    handleFocusRing,
    triggerRipple,
    animateEntrance,
    animateExit,
    handleButtonPress,
    addPulseEffect,
    addHeartBeat,
    celebrateRating,
    animateProgressFill,
  };
};
