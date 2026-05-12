import './style.css'

// Add some simple interactivity
document.addEventListener('DOMContentLoaded', () => {
  console.log('Sri Sai Delivery Landing Page Loaded');
  
  // Simple Path-based Router
  const routes = {
    '/': null,
    '/features': 'features',
    '/menu': 'menu',
    '/contact': 'contact',
    '/download': 'download'
  };

  const navigateTo = (path, scroll = true) => {
    const id = routes[path];
    
    // Update URL
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }

    if (scroll) {
      if (id) {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Handle link clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.getAttribute('href')?.startsWith('/')) {
      const href = anchor.getAttribute('href');
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';

      if (isHomePage && routes.hasOwnProperty(href)) {
        e.preventDefault();
        navigateTo(href);
      }
    }
  });

  // Handle initial load and back/forward buttons
  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, true);
  });

  // Check initial path on load
  if (window.location.pathname !== '/') {
    // Small timeout to ensure elements are rendered before scrolling
    setTimeout(() => {
      navigateTo(window.location.pathname, true);
    }, 100);
  }

  // Simple intersection observer for reveal animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
