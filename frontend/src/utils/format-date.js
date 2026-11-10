/**
 * Formats an ISO date string like "9 Nov 2026".
 * @param {string} isoString - Date string from the API
 * @returns {string} Human readable date
 */
export const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
