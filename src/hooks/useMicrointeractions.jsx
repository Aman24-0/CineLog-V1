import { createSignal } from 'solid-js';

/**
 * useMicrointeractions
 * Premium toast notifications + animation utilities for CineLog.
 * Note: Button ripple effects are handled purely in CSS via button::after — no JS DOM injection needed.
 */
export const useMicrointeractions = () => {
  const [toasts, setToasts] = createSignal([]);
  let toastId = 0;

  /**
   * Show a toast notification.
   * @param {string} msg
   * @param {'success'|'error'|'info'|'action'} type
   * @param {number} duration — ms; pass -1 to persist until manually dismissed
   * @param {boolean} haptic — trigger device vibration if supported
   * @returns {number} toastId (for manual dismiss)
   */
  const showToast = (msg, type = 'success', duration = 3000, haptic = true) => {
    const id = toastId++;
    setToasts(prev => [...prev, { id, msg, type }]);

    if (haptic && navigator.vibrate) {
      if (type === 'error')   navigator.vibrate([50, 100, 50]);
      else if (type === 'success') navigator.vibrate(50);
      else                         navigator.vibrate(30);
    }

    if (duration > 0) {
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
    }

    return id;
  };

  /** Dismiss a specific toast by id (for persistent toasts) */
  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  /* ── Named microinteractions (wrappers around showToast) ── */
  const notifyItemAdded    = (title, haptic = true)    => showToast(`Added "${title}" to Vault! 🍿`, 'success', 3000, haptic);
  const notifyRatingGiven  = (rating, haptic = true)   => showToast(`Rated ${rating}/10 ⭐`, 'success', 2500, haptic);
  const notifyEpisodeWatched = (ep, haptic = true)     => showToast(`Watched ${ep} ✓`, 'success', 2500, haptic);
  const notifyFavorited    = (haptic = true)            => showToast('Added to favorites ❤️', 'action', 2000, haptic);
  const notifyBookmarked   = (bookmarked, haptic = true) => showToast(bookmarked ? 'Bookmarked for later 📌' : 'Removed bookmark', 'action', 2000, haptic);
  const notifySuccess      = (action, haptic = true)   => showToast(`${action} ✓`, 'success', 2000, haptic);
  const notifyDeleted      = (name, haptic = true)     => showToast(`Removed "${name}" from Vault`, 'info', 2500, haptic);
  const notifyImported     = (count, haptic = true)    => showToast(`Imported ${count} item${count !== 1 ? 's' : ''} 📥`, 'success', 3000, haptic);
  const notifyExported     = (count, haptic = true)    => showToast(`Exported ${count} item${count !== 1 ? 's' : ''} 📤`, 'success', 3000, haptic);
  const notifyError        = (msg, haptic = true)      => showToast(msg, 'error', 4000, haptic);

  /** Persistent loading toast — returns a dismiss fn */
  const notifyLoading = (msg = 'Loading…', haptic = true) => {
    const id = showToast(msg, 'info', -1, haptic);
    return () => dismissToast(id);
  };

  /* ── Focus ring (keyboard nav helper) ── */
  const handleFocusRing = (element) => {
    if (!element) return;
    element.addEventListener('keydown', (e) => { if (e.key === 'Tab') element.classList.add('focus-visible'); });
    element.addEventListener('mousedown', () => element.classList.remove('focus-visible'));
  };

  /**
   * triggerRipple — CSS ripple (button::after) handles this automatically.
   * This is kept as a no-op to avoid breaking callers.
   */
  const triggerRipple = (_element, _event) => { /* no-op — see index.css button::after */ };

  /* ── Animation helpers ── */
  const animateEntrance = (element, type = 'pop-in') => {
    if (!element) return;
    element.classList.add(`animate-${type}`);
  };

  const animateExit = (element, type = 'item-removed', callback) => {
    if (!element) return;
    element.classList.add(`animate-${type}`);
    setTimeout(() => { if (callback) callback(); element.remove(); }, 400);
  };

  /**
   * handleButtonPress — CSS active:scale handles this automatically.
   * Kept as a no-op for API compatibility.
   */
  const handleButtonPress = (_element) => { /* no-op — see index.css button:active */ };

  const addPulseEffect = (element) => {
    if (!element) return;
    element.classList.add('badge-pulse');
    setTimeout(() => element.classList.remove('badge-pulse'), 800);
  };

  const addHeartBeat = (element) => {
    if (!element) return;
    element.classList.add('animate-heart-beat');
    setTimeout(() => element.classList.remove('animate-heart-beat'), 600);
  };

  const celebrateRating = (element) => {
    if (!element) return;
    element.classList.add('animate-rating-celebration');
    setTimeout(() => element.classList.remove('animate-rating-celebration'), 600);
  };

  const animateProgressFill = (element, targetWidth) => {
    if (!element) return;
    element.style.setProperty('--target-width', `${targetWidth}%`);
    element.classList.add('animate-progress-fill');
  };

  return {
    toasts,
    showToast,
    dismissToast,
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
