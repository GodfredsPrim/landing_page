// Apply a saved preference before CSS paints. System preference remains the fallback.
try {
  const preference = localStorage.getItem('portfolio-theme');
  if (preference === 'light' || preference === 'dark') document.documentElement.dataset.theme = preference;
} catch { /* Storage can be blocked; CSS still follows the system. */ }
