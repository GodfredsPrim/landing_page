/**
 * Portfolio Animations & Motion Graphics
 * Godfred Bio Conquest
 */

// Portfolio App Controller
function portfolioApp() {
  return {
    theme: 'light',
    mobileNavOpen: false,
    
    init() {
      this.loadTheme();
      this.loadVisitors();
      this.initMotionGraphics();
    },
    
    loadTheme() {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        this.theme = saved;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.theme = 'dark';
      }
    },
    
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', this.theme);
    },
    
    loadVisitors() {
      fetch('https://api.countapi.xyz/hit/godfred-portfolio/visits')
        .then((response) => response.json())
        .then((data) => {
          document.getElementById('visitor-count').textContent = data.value;
        })
        .catch(() => {
          document.getElementById('visitor-count').textContent = '—';
        });
    },
    
    initMotionGraphics() {
      // Wait for GSAP to load
      if (typeof gsap === 'undefined') {
        setTimeout(() => this.initMotionGraphics(), 100);
        return;
      }
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
      
      // Hide page loader
      const loader = document.getElementById('page-loader');
      if (loader) {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          delay: 0.5,
          onComplete: () => {
            loader.style.display = 'none';
          }
        });
      }
      
      // Initialize all motion graphics
      this.initCursorFollower();
      this.initScrollProgress();
      this.initParticles();
      this.initScrollAnimations();
      this.initTypingEffect();
      this.initMagneticButtons();
      this.initParallax();
      this.initSkillBars();
      this.initCounters();
      this.initCardTilt();
      this.initSmoothReveal();
      this.initTextSplit();
      this.optimizePerformance();
    },
    
    // Cursor Follower
    initCursorFollower() {
      const cursor = document.getElementById('cursor-follower');
      if (!cursor) return;
      
      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
      });
      
      document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
      
      // Smooth cursor animation
      function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
      
      // Hover effect on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .card, .project-card, .tool-icon');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });
    },
    
    // Scroll Progress Bar
    initScrollProgress() {
      const progressBar = document.getElementById('scroll-progress');
      if (!progressBar) return;
      
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });
    },
    
    // Particle Background
    initParticles() {
      const container = document.getElementById('particles');
      if (!container) return;
      
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(particle);
        
        // Animate each particle
        gsap.to(particle, {
          y: 'random(-100, 100)',
          x: 'random(-50, 50)',
          duration: 'random(10, 20)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    },
    
    // Scroll-triggered Animations
    initScrollAnimations() {
      // Hero section animations
      gsap.from('.animate-fade-in', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
      
      // Section titles
      gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
      
      // Section headings
      gsap.utils.toArray('.section-heading').forEach(heading => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        });
      });
      
      // Cards
      gsap.utils.toArray('.card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out'
        });
      });
      
      // Project cards
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out'
        });
      });
      
      // Tool icons
      gsap.utils.toArray('.tool-icon').forEach((icon, i) => {
        gsap.from(icon, {
          scrollTrigger: {
            trigger: icon,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'back.out(1.7)'
        });
      });
      
      // Contact links
      gsap.utils.toArray('.contact-link').forEach((link, i) => {
        gsap.from(link, {
          scrollTrigger: {
            trigger: link,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          x: -50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out'
        });
      });
      
      // About section image
      gsap.from('#about img', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      // About features
      gsap.utils.toArray('#about .flex.items-start').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          x: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power2.out'
        });
      });
    },
    
    // Typing Effect
    initTypingEffect() {
      const titleElement = document.querySelector('h1');
      if (!titleElement) return;
      
      const text = titleElement.textContent;
      titleElement.innerHTML = '';
      
      const typingWrapper = document.createElement('span');
      typingWrapper.className = 'typing-text';
      titleElement.appendChild(typingWrapper);
      
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      titleElement.appendChild(cursor);
      
      let charIndex = 0;
      
      function typeChar() {
        if (charIndex < text.length) {
          typingWrapper.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 80);
        } else {
          // Remove cursor after typing
          setTimeout(() => {
            cursor.style.display = 'none';
          }, 2000);
        }
      }
      
      // Start typing after a delay
      setTimeout(typeChar, 500);
    },
    
    // Magnetic Button Effects
    initMagneticButtons() {
      const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
      
      buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      });
    },
    
    // Parallax Effects
    initParallax() {
      // Hero section parallax
      gsap.to('.profile-image', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Background gradient parallax
      gsap.to('.absolute.-inset-4', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    },
    
    // Skill Bar Animations
    initSkillBars() {
      const skillBars = document.querySelectorAll('.skill-bar-fill');
      
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        ScrollTrigger.create({
          trigger: bar,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(bar, {
              width: width,
              duration: 1.2,
              ease: 'power2.out'
            });
          }
        });
      });
    },
    
    // Animated Counters
    initCounters() {
      const counters = document.querySelectorAll('.counter');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2;
        
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(counter, {
              innerText: target,
              duration: duration,
              snap: { innerText: 1 },
              ease: 'power2.out'
            });
          }
        });
      });
    },
    
    // Card Tilt Effect
    initCardTilt() {
      const cards = document.querySelectorAll('.card-3d, .project-card');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });
    },
    
    // Smooth Reveal
    initSmoothReveal() {
      gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    },
    
    // Text Split Animation
    initTextSplit() {
      const headings = document.querySelectorAll('.section-heading');
      
      headings.forEach(heading => {
        const text = heading.textContent;
        heading.innerHTML = '';
        
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.animationDelay = (i * 0.03) + 's';
          heading.appendChild(span);
        });
        
        ScrollTrigger.create({
          trigger: heading,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(heading.querySelectorAll('.char'), {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.02,
              ease: 'power2.out'
            });
          }
        });
      });
    },
    
    // Performance Optimization
    optimizePerformance() {
      // Use will-change for animated elements
      const animatedElements = document.querySelectorAll('.card, .project-card, .tool-icon, .profile-image');
      animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
      });
      
      // Debounce scroll events
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        if (scrollTimeout) {
          window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
          // Scroll-based updates
        });
      }, { passive: true });
    }
  };
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80
          },
          ease: 'power3.inOut'
        });
      }
    });
  });
  
  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
  
  // Hide scroll indicator on scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          duration: 0.3
        });
      } else {
        gsap.to(scrollIndicator, {
          opacity: 1,
          duration: 0.3
        });
      }
    }, { passive: true });
  }
  
  // Add hover sound effect (optional visual feedback)
  const interactiveElements = document.querySelectorAll('a, button');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.fromTo(el, 
        { scale: 1 },
        { scale: 1.02, duration: 0.2, ease: 'power2.out' }
      );
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });
});
