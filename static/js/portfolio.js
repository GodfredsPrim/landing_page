'use strict';
// Essential content and filtering are server-rendered; all enhancements are optional.
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
function currentTheme() { return root.dataset.theme || (systemTheme.matches ? 'dark' : 'light'); }
function syncThemeControl() {
  const mode = currentTheme();
  if (themeToggle) {
    themeToggle.dataset.mode = mode;
    themeToggle.setAttribute('aria-label', `Switch to ${mode === 'dark' ? 'light' : 'dark'} theme`);
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'dark' ? '#15181f' : '#f6f7fa');
}
if (themeToggle) {
  themeToggle.hidden = false;
  syncThemeControl();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = currentTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch { /* Session-only toggle still works. */ }
    syncThemeControl();
  });
  systemTheme.addEventListener('change', syncThemeControl);
}
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
const viewer = document.getElementById('image-viewer');
if (viewer && typeof viewer.showModal === 'function') {
  let trigger;
  const image = document.getElementById('viewer-image');
  document.querySelectorAll('[data-image-viewer]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      document.getElementById('viewer-title').textContent = link.dataset.title;
      document.getElementById('viewer-caption').textContent = link.dataset.caption;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      viewer.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => { if (event.target === viewer) { const r = viewer.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) viewer.close(); } });
  viewer.addEventListener('close', () => { document.body.style.overflow = ''; trigger?.focus({preventScroll: true}); });
}
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.site-header nav a')];
  const navObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, {rootMargin: '-10% 0px -65% 0px'});
  document.querySelectorAll('section[id]').forEach(section => navObserver.observe(section));
  // Reveal project media once as it enters the reading sequence. Content stays visible if JS fails.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal-enter'); revealObserver.unobserve(entry.target); } });
    }, {threshold: .12});
    document.querySelectorAll('.work-media,.experience-row').forEach(element => revealObserver.observe(element));
  }
}
