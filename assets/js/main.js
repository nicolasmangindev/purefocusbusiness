// PureFocus Legal & Support - Main JavaScript

// ===== Configuration =====
const ANALYTICS_ENABLED = false; // Set to true to enable Plausible Analytics
const THEME_KEY = 'purefocus-theme';
const CONSENT_KEY = 'purefocus-cookie-consent';

// ===== Theme Management =====
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', theme);
  updateThemeButton(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeButton(next);
}

function updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    const label = theme === 'dark' ? 'Mode clair' : 'Mode sombre';
    btn.innerHTML = `${icon} <span class="sr-only">${label}</span>`;
    btn.setAttribute('aria-label', label);
  }
}

// ===== Cookie Consent Management =====
function initCookieBanner() {
  if (!ANALYTICS_ENABLED) {
    return; // No banner needed if analytics disabled
  }

  const consent = localStorage.getItem(CONSENT_KEY);
  if (!consent) {
    showCookieBanner();
  } else if (consent === 'accepted') {
    loadAnalytics();
  }
}

function showCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.classList.add('show');
  }
}

function hideCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.classList.remove('show');
  }
}

function acceptCookies() {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  hideCookieBanner();
  loadAnalytics();
}

function declineCookies() {
  localStorage.setItem(CONSENT_KEY, 'declined');
  hideCookieBanner();
}

function revokeCookieConsent() {
  localStorage.removeItem(CONSENT_KEY);
  alert('Votre consentement a été révoqué. Rechargez la page pour voir le bandeau à nouveau.');
}

function loadAnalytics() {
  if (!ANALYTICS_ENABLED) return;

  // Uncomment and configure for Plausible Analytics
  /*
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', 'your-domain.com');
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
  */
}

// ===== Active Navigation Highlighting =====
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath.endsWith('/') && linkPath === currentPath + 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// ===== Last Updated Date Injection =====
function injectLastUpdated() {
  const elements = document.querySelectorAll('[data-last-updated]');
  const today = new Date();
  const formatted = today.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  elements.forEach(el => {
    el.textContent = formatted;
  });
}

// ===== Form Handling (Static) =====
function initForms() {
  const forms = document.querySelectorAll('form[data-static]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Ce formulaire est actuellement désactivé. Veuillez nous contacter par email : support.purefocus@gmail.com');
    });
  });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        target.focus();
      }
    });
  });
}

// ===== Event Listeners Setup =====
function initEventListeners() {
  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Cookie banner buttons
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', acceptCookies);
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', declineCookies);
  }

  // Cookie revoke button (on cookie policy page)
  const revokeBtn = document.getElementById('revoke-cookies');
  if (revokeBtn) {
    revokeBtn.addEventListener('click', revokeCookieConsent);
  }

  // Listen for OS theme changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      const theme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      updateThemeButton(theme);
    }
  });
}

// ===== Initialization =====
function init() {
  initTheme();
  initCookieBanner();
  highlightActiveNav();
  injectLastUpdated();
  initForms();
  initSmoothScroll();
  initEventListeners();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Expose revoke function globally for use in cookie policy page
window.revokeCookieConsent = revokeCookieConsent;