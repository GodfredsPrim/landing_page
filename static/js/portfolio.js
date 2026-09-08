'use strict';
// Optional enhancement: navigation, project notes and archive filters work without JS.
const copyButton = document.getElementById('copy-email');
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Could not copy. Select the email address above or open it in your mail app.';
    }
  });
}
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.site-header nav a')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, {rootMargin: '-10% 0px -65% 0px'});
  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
}
