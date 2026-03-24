/**
 * HitaVirTech — Scroll Animations, Nav behavior, Mobile menu
 */
(function () {
  'use strict';

  // ── Scroll progress bar ──
  function updateScrollProgress() {
    var sp = document.getElementById('sp');
    if (!sp) return;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    sp.style.width = Math.min(progress, 100) + '%';
  }

  // ── Nav scroll state ──
  function updateNav() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  // ── Active nav link on scroll ──
  function updateActiveLink() {
    var sections = document.querySelectorAll('section[id]');
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      var link = document.querySelector('.nav-link[href="#' + section.id + '"]');
      if (!link) return;
      var top = section.offsetTop;
      var height = section.offsetHeight;
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  }

  // ── Scroll reveal (IntersectionObserver with batching) ──
  var revealObserver;
  function initReveal() {
    var elements = document.querySelectorAll('.animate-in');
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { revealObserver.observe(el); });
  }

  // ── Mobile nav ──
  function initMobileNav() {
    var hamburger = document.getElementById('nav-hamburger');
    var mobileMenu = document.getElementById('nav-mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('open', !expanded);
    });

    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      }
    });
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateScrollProgress();
        updateNav();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    updateNav();
    initReveal();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
