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
const projectRail = document.querySelector('[data-project-rail]');
if (projectRail) {
  const viewport = projectRail.querySelector('[data-project-viewport]');
  const slides = [...projectRail.querySelectorAll('[data-project-slide]')];
  const previous = projectRail.querySelector('[data-project-previous]');
  const next = projectRail.querySelector('[data-project-next]');
  const current = projectRail.querySelector('[data-project-current]');
  const progress = projectRail.querySelector('[data-project-progress]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  projectRail.classList.add('is-enhanced');

  function updateRail(index) {
    activeIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeIndex));
    current.textContent = String(activeIndex + 1).padStart(2, '0');
    progress.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === slides.length - 1;
  }

  function goTo(index) {
    const target = Math.max(0, Math.min(index, slides.length - 1));
    viewport.scrollTo({left: slides[target].offsetLeft - viewport.offsetLeft, behavior: reducedMotion.matches ? 'auto' : 'smooth'});
    updateRail(target);
  }

  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  viewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(activeIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(activeIndex + 1); }
  });
  if ('IntersectionObserver' in window) {
    const slideObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) updateRail(slides.indexOf(visible.target));
    }, {root: viewport, threshold: [.55, .75, .95]});
    slides.forEach(slide => slideObserver.observe(slide));
  }
  updateRail(0);
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
