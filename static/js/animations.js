// Alpine.js Portfolio Application — 2090 Aurora Edition
function portfolioApp() {
  return {
    theme: localStorage.getItem('theme') || 'dark',
    mobileNavOpen: false,
    qrModal: { open: false, src: '', title: '', url: '' },

    openQR(src, title, url) {
      this.qrModal = { open: true, src, title, url };
    },
    closeQR() {
      this.qrModal.open = false;
    },

    init() {
      this.setTheme();
      this.setupScrollProgress();
      this.setupCursorFollower();
      this.setupPageLoader();
      this.setupVisitorCount();
      this.observeSkillBars();
      this.setupSmoothScroll();
      this.setupCardSpotlight();
      this.setupNavScroll();
    },

    // Theme Management
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
      this.setTheme();
    },

    setTheme() {
      const root = document.documentElement;
      if (this.theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    },

    // Scroll Progress Bar
    setupScrollProgress() {
      const bar = document.getElementById('scroll-progress');
      if (!bar) return;
      window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.transform = `scaleX(${pct / 100})`;
        bar.style.width = '100%';
      }, { passive: true });
    },

    // Cursor Follower
    setupCursorFollower() {
      const follower = document.getElementById('cursor-follower');
      if (!follower) return;

      let mouseX = 0, mouseY = 0;
      let fx = 0, fy = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.classList.add('active');
      });
      document.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
      });

      const animate = () => {
        fx += (mouseX - fx) * 0.18;
        fy += (mouseY - fy) * 0.18;
        follower.style.transform = `translate(${fx - 8}px, ${fy - 8}px)`;
        requestAnimationFrame(animate);
      };
      animate();

      document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .card, .project-card')) {
          follower.classList.add('hover');
        }
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .card, .project-card')) {
          follower.classList.remove('hover');
        }
      });
    },

    // Card Spotlight (mouse-tracked radial gradient)
    setupCardSpotlight() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if ('ontouchstart' in window) return;

      const targets = document.querySelectorAll('.card, .project-card');
      targets.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          el.style.setProperty('--mx', `${x}%`);
          el.style.setProperty('--my', `${y}%`);
        }, { passive: true });
      });
    },

    // Nav Pill — shrinks when page is scrolled
    setupNavScroll() {
      const nav = document.getElementById('main-nav');
      if (!nav) return;
      const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },

    // Page Loader
    setupPageLoader() {
      window.addEventListener('load', () => {
        const loader = document.getElementById('page-loader');
        if (loader) setTimeout(() => loader.classList.add('hidden'), 400);
      });
    },

    // Visitor Count
    setupVisitorCount() {
      const count = (parseInt(localStorage.getItem('visitCount') || '0')) + 1;
      localStorage.setItem('visitCount', count);
      const el = document.getElementById('visitor-count');
      if (el) this.animateCounter(el, 0, count);
    },

    animateCounter(element, start, end) {
      const duration = 900;
      const startTime = Date.now();
      const update = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        element.textContent = Math.floor(start + (end - start) * progress).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      };
      update();
    },

    // Observe Skill Bars
    observeSkillBars() {
      if (!('IntersectionObserver' in window)) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            if (fill && !fill.classList.contains('animated')) {
              fill.classList.add('animated');
            }
            observer.unobserve(entry.target);
          }
        });
      });
      document.querySelectorAll('.skill-bar').forEach((bar) => observer.observe(bar));
    },

    // Smooth Scroll
    setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      });
    },
  };
}
