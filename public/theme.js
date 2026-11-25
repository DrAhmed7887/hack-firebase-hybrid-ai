// Runs synchronously from <head> (same-origin external script, so the CSP needs no 'unsafe-inline').
// Applies a saved light/dark override to the color-scheme meta tag before first paint. No saved choice => follow the OS.
(function () {
  var meta = document.querySelector('meta[name="color-scheme"]');
  if (!meta) return;
  var saved = null;
  try {
    saved = localStorage.getItem('color-scheme');
  } catch (e) {
    saved = null; // storage blocked: follow the OS
  }
  meta.content = saved === 'light' || saved === 'dark' ? saved : 'light dark';
})();
