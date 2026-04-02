// Alpine.js Portfolio Application
function portfolioApp() {
  return {
    theme: localStorage.getItem('theme') || 'light',
    mobileNavOpen: false,

    // Initialize the app
    init() {
      this.setTheme();
      this.setupScrollProgress();
      this.setupCursorFollower();
      this.setupParticles();
      this.setupPageLoader();
      this.setupVisitorCount();
      this.observeSkillBars();
      this.setupSmoothScroll();
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
      } else {
        root.classList.remove('dark');
      }
    },

    // Scroll Progress Bar
    setupScrollProgress() {
      window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
          const scrollTop = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / maxScroll) * 100;
          scrollProgress.style.transform = `scaleX(${scrollPercent}%)`;
        }
      });
    },

    // Cursor Follower
    setupCursorFollower() {
      const follower = document.getElementById('cursor-follower');
      if (!follower) return;

      let mouseX = 0,
        mouseY = 0;
      let followerX = 0,
        followerY = 0;
      let isMoving = false;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        follower.classList.add('active');
      });

      document.addEventListener('mouseleave', () => {
        isMoving = false;
        follower.classList.remove('active');
      });

      const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.2;
        followerY += (mouseY - followerY) * 0.2;

        if (isMoving) {
          follower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;
        }

        requestAnimationFrame(animateFollower);
      };

      animateFollower();

      // Hover effects
      document.addEventListener('mouseover', (e) => {
        if (
          e.target.closest('.btn-primary') ||
          e.target.closest('.btn-secondary') ||
          e.target.closest('a')
        ) {
          follower.classList.add('hover');
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (
          e.target.closest('.btn-primary') ||
          e.target.closest('.btn-secondary') ||
          e.target.closest('a')
        ) {
          follower.classList.remove('hover');
        }
      });
    },

    // Particles Background
    setupParticles() {
      const container = document.getElementById('particles');
      if (!container) return;

      const particleCount = window.innerWidth < 768 ? 20 : 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        const duration = 3 + Math.random() * 5;
        const delay = Math.random() * 2;

        particle.style.animation = `float-gentle ${duration}s ease-in-out ${delay}s infinite`;

        container.appendChild(particle);
      }
    },

    // Page Loader
    setupPageLoader() {
      window.addEventListener('load', () => {
        const loader = document.getElementById('page-loader');
        if (loader) {
          setTimeout(() => {
            loader.classList.add('hidden');
          }, 500);
        }
      });
    },

    // Visitor Count
    setupVisitorCount() {
      const visitCount = localStorage.getItem('visitCount');
      const newCount = (parseInt(visitCount) || 0) + 1;
      localStorage.setItem('visitCount', newCount);

      const visitorElement = document.getElementById('visitor-count');
      if (visitorElement) {
        visitorElement.textContent = newCount.toLocaleString();
        this.animateCounter(visitorElement, 0, newCount);
      }
    },

    animateCounter(element, start, end) {
      const duration = 800;
      const startTime = Date.now();
      const isPastTense = element.dataset.past === 'true';

      const update = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (end - start) * progress);
        element.textContent = value.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      update();
    },

    // Observe Skill Bars for scroll animations
    observeSkillBars() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const skillFill = entry.target.querySelector('.skill-bar-fill');
              if (skillFill && !skillFill.classList.contains('animated')) {
                skillFill.classList.add('animated');
              }
              observer.unobserve(entry.target);
            }
          });
        });

        document.querySelectorAll('.skill-bar').forEach((bar) => {
          observer.observe(bar);
        });
      }
    },

    // Smooth Scroll
    setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    },
  };
}
