import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons first so all icons (including drawer) render
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ─── Path-based Router ───────────────────────────────────────────────────────
  const routes = {
    '/': null,
    '/features': 'features',
    '/menu': 'menu',
    '/contact': 'contact',
    '/download': 'download'
  };

  const navigateTo = (path, scroll = true) => {
    const id = routes[path];
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    if (scroll) {
      if (id) {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
      const href = anchor.getAttribute('href');
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
      if (isHomePage && routes.hasOwnProperty(href)) {
        e.preventDefault();
        closeMobileMenu();
        navigateTo(href);
      }
    }
  });

  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, true);
  });

  if (window.location.pathname !== '/') {
    setTimeout(() => navigateTo(window.location.pathname, true), 100);
  }

  // ─── Mobile Menu ─────────────────────────────────────────────────────────────
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('drawerClose');

  const openMobileMenu = () => {
    menuBtn?.classList.add('active');
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    menuBtn?.classList.remove('active');
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', () => {
    drawer?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });

  closeBtn?.addEventListener('click', closeMobileMenu);
  overlay?.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // ─── Features Scroll Dots ────────────────────────────────────────────────────
  const featuresGrid = document.querySelector('.features-grid');
  const hintDots = document.querySelectorAll('#featuresScrollHint span');

  if (featuresGrid && hintDots.length) {
    featuresGrid.addEventListener('scroll', () => {
      const cards = featuresGrid.querySelectorAll('.feature-card');
      const cardWidth = (cards[0]?.offsetWidth || 220) + 16;
      const activeIndex = Math.round(featuresGrid.scrollLeft / cardWidth);
      hintDots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }, { passive: true });
  }

  // ─── Reveal Animations ────────────────────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
