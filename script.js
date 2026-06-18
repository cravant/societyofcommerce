document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('[data-navbar]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-nav-drawer]');
  const backToTop = document.querySelector('[data-back-to-top]');

  const onScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 24);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  document.querySelectorAll('.fade-up').forEach((el) => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = 'true';
      const target = Number(entry.target.dataset.count || 0);
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
        entry.target.textContent = target >= 100 && target !== 2026 ? `${value}+` : value;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

  document.querySelectorAll('[data-validate-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach((field) => {
        const isEmail = field.type === 'email';
        const fieldValid = field.value.trim() && (!isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
        field.classList.toggle('is-error', !fieldValid);
        field.classList.toggle('is-valid', Boolean(fieldValid));
        const error = field.closest('.form-group')?.querySelector('.form-error-msg');
        if (error) error.classList.toggle('show', !fieldValid);
        if (!fieldValid) valid = false;
      });
      if (!valid) return;
      const success = form.parentElement.querySelector('.form-success');
      if (success) {
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        form.reset();
      }
    });
  });

  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button');
      const input = form.querySelector('input');
      if (!input?.checkValidity()) {
        input?.focus();
        return;
      }
      if (button) {
        button.dataset.originalText = button.dataset.originalText || button.textContent;
        button.textContent = 'Subscribed';
      }
      form.reset();
    });
  });

  document.querySelectorAll('.faq-q').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      item?.classList.toggle('open');
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const searchInput = document.querySelector('[data-location-search]');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll('[data-location-card]').forEach((card) => {
        card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    });
  }
});
