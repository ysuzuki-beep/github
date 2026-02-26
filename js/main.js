/**
 * 合同会社upsetters - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initScrollAnimations();
  initContactForm();
  setActiveNav();
});

// ===========================
// Header Scroll Behavior
// ===========================
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ===========================
// Hamburger Menu
// ===========================
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');
  const overlay = document.querySelector('.menu-overlay');

  if (!hamburger || !nav) return;

  const closeMenu = () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('active');
      nav.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===========================
// Active Navigation
// ===========================
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===========================
// Contact Form
// ===========================
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const successMsg = document.querySelector('.form-success');

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        field.style.borderColor = '#c0392b';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Simulate form submission
    btn.textContent = '送信中...';
    btn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1200));

    form.reset();
    btn.textContent = '送信完了';

    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    setTimeout(() => {
      btn.textContent = '送信する';
      btn.disabled = false;
      if (successMsg) successMsg.style.display = 'none';
    }, 5000);
  });

  // Real-time validation on blur
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.required && !field.value.trim()) {
        field.style.borderColor = '#c0392b';
      } else {
        field.style.borderColor = '';
      }
    });

    field.addEventListener('input', () => {
      if (field.value.trim()) {
        field.style.borderColor = '';
      }
    });
  });
}

// ===========================
// Smooth scroll for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
