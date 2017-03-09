/* @flow */

export const debounce = (fn, wait) => {
  var timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
