import React, { useEffect } from 'react';

const AUTO_CLOSE_MS = 2500;

/**
 * Small notification shown at the bottom of the screen.
 * It closes itself after a couple of seconds.
 *
 * @param {Object} props
 * @param {string} props.message - Text to show
 * @param {string} props.type - 'success' or 'error'
 * @param {Function} props.onClose - Called when the toast should disappear
 */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_CLOSE_MS);
    // Clear the timer if the toast changes or unmounts early
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`toast toast--${type}`} role="status">
      {message}
    </div>
  );
};

export default Toast;