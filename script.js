document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     Elegant "pop" feedback animation when a skill/tool tag
     is clicked or activated via keyboard
     ========================================================= */
  function popTag(tag) {
    if (!tag) return;
    tag.classList.remove('tag-pop');
    void tag.offsetWidth; // restart animation if clicked again quickly
    tag.classList.add('tag-pop');
    tag.addEventListener('animationend', () => tag.classList.remove('tag-pop'), { once: true });
  }
  document.addEventListener('click', (e) => {
    const tag = e.target.closest('.tag');
    if (tag) popTag(tag);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const tag = e.target.closest && e.target.closest('.tag');
    if (tag) { popTag(tag); }
  });

  /* =========================================================
     Hero particle background
     ========================================================= */
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotionQuery && typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 1000 } },
        color: { value: ['#8B6FF0', '#5A8DF0', '#D66BC0', '#E4C27E'] },
        shape: { type: 'circle' },
        opacity: { value: 0.36, random: true, anim: { enable: true, speed: 0.7, opacity_min: 0.08, sync: false } },
        size: { value: 2.4, random: true },
        line_linked: { enable: true, distance: 150, color: '#8B6FF0', opacity: 0.12, width: 1 },
        move: { enable: true, speed: 0.55, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.35 } }
        }
      },
      retina_detect: true
    });
  }

  /* =========================================================
     Subtle mouse-parallax on the site-wide background orbs
     ========================================================= */
  const orbA = document.getElementById('orbA');
  const orbB = document.getElementById('orbB');
  const orbC = document.getElementById('orbC');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && orbA && orbB && orbC) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    window.addEventListener('pointermove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function parallaxTick() {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      orbA.style.transform = `translate(${currentX * 22}px, ${currentY * 18}px)`;
      orbB.style.transform = `translate(${currentX * -18}px, ${currentY * -14}px)`;
      orbC.style.transform = `translate(${currentX * 14}px, ${currentY * -20}px)`;

      requestAnimationFrame(parallaxTick);
    }
    requestAnimationFrame(parallaxTick);
  }

  /* =========================================================
     Cursor-follow accent glow on card components
     ========================================================= */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest ? e.target.closest('.glow-card') : null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
    }, { passive: true });
  }

  /* =========================================================
     Element references
     ========================================================= */
  const body = document.body;
  const header = document.getElementById('header');
  const nav = document.querySelector('.nav');
  const navLinks = document.getElementById('navLinks');
  const burger = document.getElementById('burger');
  const themeToggleBtn = document.getElementById('themeToggle');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('.page-section[id]');
  const navAnchors = document.querySelectorAll('[data-nav]');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     Theme (dark default, persisted)
     ========================================================= */
  function setTheme(theme) {
    body.classList.toggle('light-theme', theme === 'light');
    themeToggleBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    try { localStorage.setItem('nishu-portfolio-theme', theme); } catch (e) { /* storage unavailable */ }
  }

  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('nishu-portfolio-theme') || 'dark'; } catch (e) { /* ignore */ }
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isLight = body.classList.contains('light-theme');
    setTheme(isLight ? 'dark' : 'light');
  });

  /* =========================================================
     Mobile navigation
     ========================================================= */
  function closeMobileNav() {
    navLinks.classList.remove('nav-active');
    nav.classList.remove('nav-open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  }

  function toggleMobileNav() {
    const isOpen = nav.classList.toggle('nav-open');
    navLinks.classList.toggle('nav-active', isOpen);
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    body.classList.toggle('nav-open', isOpen);
  }

  burger.addEventListener('click', toggleMobileNav);

  /* =========================================================
     Smooth scrolling for in-page links (nav, hero CTAs, footer)
     ========================================================= */
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId.charAt(0) !== '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 12;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      closeMobileNav();
    });
  });

  /* =========================================================
     Scroll progress bar
     ========================================================= */
  function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    scrollProgressBar.style.width = progress + '%';
  }

  /* =========================================================
     Active nav-link tracking + back-to-top visibility
     ========================================================= */
  const navLinkMap = new Map();
  document.querySelectorAll('.nav-link[data-nav]').forEach(link => {
    navLinkMap.set(link.getAttribute('href').replace('#', ''), link);
  });

  const sectionObserverOptions = { rootMargin: '-40% 0px -55% 0px', threshold: 0 };
  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkMap.forEach(link => link.classList.remove('active-link'));
        const activeLink = navLinkMap.get(id);
        if (activeLink) activeLink.classList.add('active-link');
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => activeSectionObserver.observe(section));

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    backToTop.classList.toggle('visible', window.scrollY > 500);
    header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  updateScrollProgress();
  header.classList.toggle('scrolled', window.scrollY > 24);

  /* =========================================================
     Scroll-reveal animations
     ========================================================= */
  const revealElements = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('active'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* =========================================================
     Journey timeline — light up items as they're reached
     ========================================================= */
  const journeyItems = document.querySelectorAll('.journey-item');
  const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.5 });
  journeyItems.forEach(item => journeyObserver.observe(item));

  /* =========================================================
     Rotating hero role text
     ========================================================= */
  const roles = [
    'Software Engineering Student',
    'Full-Stack Developer',
    'Mobile App Developer',
    'Game Development Explorer',
    'ML Researcher'
  ];
  const roleTextElement = document.getElementById('roleText');

  if (roleTextElement) {
    if (prefersReducedMotion) {
      roleTextElement.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typingSpeed = 75;
      const deletingSpeed = 40;
      const delayBetweenRoles = 1800;

      function typeEffect() {
        const currentRole = roles[roleIndex];
        const displayChar = isDeleting
          ? currentRole.substring(0, charIndex - 1)
          : currentRole.substring(0, charIndex + 1);

        roleTextElement.textContent = displayChar;

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
          speed = delayBetweenRoles;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          speed = 400;
        }

        charIndex += isDeleting ? -1 : 1;
        setTimeout(typeEffect, speed);
      }

      typeEffect();
    }
  }

  /* =========================================================
     Animated counters for the Highlights section
     ========================================================= */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0', 10);

      if (prefersReducedMotion) {
        el.textContent = target.toFixed(decimals);
        observer.unobserve(el);
        return;
      }

      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* =========================================================
     3D tilt-on-hover for project cards
     ========================================================= */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const tiltCards = document.querySelectorAll('.project-card');

    tiltCards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = px * 9;
        const rotateX = -py * 9;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* =========================================================
     Project filtering
     ========================================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        const show = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* =========================================================
     Project detail modal
     Note: "role" is intentionally omitted for projects where the
     source information didn't specify one (e.g. Learning-Earning
     Website), rather than inventing a plausible-sounding title.
     ========================================================= */
  const projectData = {
    techweave: {
      title: 'TechWeave',
      role: 'Full-Stack Developer',
      overview: 'Full-stack mentorship platform for student-mentor collaboration and project discovery.',
      contributions: [
        'Integrated JWT authentication',
        'Integrated OAuth2 authentication',
        'Implemented BcryptJS authentication/security',
        'Built real-time chat functionality using Socket.IO'
      ],
      tech: ['Node.js', 'Express.js', 'MySQL', 'Socket.IO', 'JWT', 'OAuth2', 'BcryptJS'],
      github: 'https://github.com/nishatnishu/TechWeave_SWE330Project'
    },
    preppilot: {
      title: 'PrepPilot',
      role: 'AI Full-Stack Developer',
      overview: 'Adaptive, time-constrained AI interview simulator conducting dynamic technical and behavioral evaluations.',
      contributions: [
        'Architected a server-side state engine for adaptive difficulty scaling',
        'Built multi-criteria evaluation algorithms',
        'Implemented historical weakness tracking dashboards'
      ],
      tech: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'LLM API', 'SQLite', 'Tailwind CSS'],
      github: 'https://github.com/nishatnishu'
    },
    swehub: {
      title: 'SWEHub',
      role: 'Full-Stack Developer',
      overview: 'Software engineering platform for study materials and submission management.',
      contributions: [
        'Designed React/Vite interface',
        'Integrated RESTful APIs',
        'Implemented file uploads using Multer',
        'Implemented Socket.IO communication channels',
        'Worked with JWT-based authentication'
      ],
      tech: ['React', 'Vite', 'Node.js', 'Express.js', 'MySQL', 'Socket.IO', 'JWT'],
      github: 'https://github.com/nishatnishu/SWEHUB_350Project'
    },
    trekmate: {
      title: 'TrekMate',
      role: 'Mobile App Developer',
      overview: 'Cross-platform travel companion application for exploring destinations and trip guides.',
      contributions: [
        'Implemented Firebase authentication',
        'Implemented Google Sign-In',
        'Used Provider for state management',
        'Integrated Google Maps API'
      ],
      tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Provider'],
      github: 'https://github.com/nishatnishu/AndroidProject-SWE-250'
    },
    survivor: {
      title: 'Survivor Game',
      role: 'Game Developer',
      overview: '2D top-down action survival game with dynamic enemy spawning and health tracking.',
      contributions: [
        'Built enemy tracking AI',
        'Implemented projectile physics',
        'Implemented collision detection',
        'Applied Object-Oriented Programming principles'
      ],
      tech: ['Java', 'Java Swing', 'Java AWT', 'OOP'],
      github: 'https://github.com/nishatnishu/Survivor_Grame_Java_Project'
    },
    snake: {
      title: 'Snake Game',
      role: 'C++ Developer',
      overview: '2D desktop Snake game enhanced with moving obstacles, bonus food timing, and screen wrap-around.',
      contributions: [
        'Designed real-time event loop',
        'Implemented circular rendering',
        'Implemented collision handling'
      ],
      tech: ['C++', 'SDL2', 'SDL2_ttf', 'C++ STL'],
      github: 'https://github.com/nishatnishu/Snake_Game_SWE-150_Project'
    },
    'learning-earning': {
      title: 'Learning-Earning Website',
      role: '',
      overview: 'Educational platform website built using HTML, CSS, and JavaScript.',
      contributions: [],
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/nishatnishu/Learning-Earning_Website'
    }
  };

  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  let lastFocusedElement = null;

  function renderProjectModal(id) {
    const data = projectData[id];
    if (!data) return;

    const roleHTML = data.role ? `<p class="modal-role">${data.role}</p>` : '';
    const contributionsHTML = data.contributions.length
      ? `<h4>My Contributions</h4><ul>${data.contributions.map(c => `<li>${c}</li>`).join('')}</ul>`
      : '';

    modalBody.innerHTML = `
      <h3 id="modalTitle">${data.title}</h3>
      ${roleHTML}
      <h4>Overview</h4>
      <p>${data.overview}</p>
      ${contributionsHTML}
      <h4>Technologies</h4>
      <ul class="tag-list modal-tech">${data.tech.map(t => `<li class="tag">${t}</li>`).join('')}</ul>
      <div class="modal-actions">
        <a class="btn btn-primary" href="${data.github}" target="_blank" rel="noopener">
          <i class="fa-brands fa-github" aria-hidden="true"></i> View on GitHub
        </a>
      </div>
    `;
  }

  function openModal(id) {
    lastFocusedElement = document.activeElement;
    renderProjectModal(id);
    modal.classList.add('open');
    body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.openProject));
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* =========================================================
     Contact form (frontend-only, no backend configured)
     ========================================================= */
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    formMessage.classList.remove('success', 'error');

    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in every field before sending.';
      formMessage.classList.add('error');
      return;
    }

    formMessage.textContent = `Thanks, ${name}! Your message has been prepared. Since this form isn't connected to an email service yet, please also reach out directly at nishattasnim5670@gmail.com.`;
    formMessage.classList.add('success');
    contactForm.reset();
  });

  /* =========================================================
     Footer year
     ========================================================= */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});