/* ============================================================
   Misiana Games — script.js
   ============================================================ */

// ── 1. STICKY HEADER ────────────────────────────────────────
(function initHeader() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

// ── 2. HAMBURGER MENU ───────────────────────────────────────
(function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('nav-links');
  const links = menu.querySelectorAll('.nav-link');

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ── 3. ACTIVE NAV LINK ON SCROLL ────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();

// ── 4. SMOOTH SCROLL FOR NAV LINKS ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── 5. COUNTER ANIMATION (stat numbers) ─────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim();
      const num = parseInt(raw, 10);
      if (isNaN(num) || num <= 0) return;

      const suffix = raw.replace(/^\d+/, '');
      const duration = 900;
      const stepTime = Math.max(30, duration / num);
      let current = 0;

      const timer = setInterval(() => {
        current++;
        el.textContent = current + suffix;
        if (current >= num) clearInterval(timer);
      }, stepTime);

      obs.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => obs.observe(c));
})();
