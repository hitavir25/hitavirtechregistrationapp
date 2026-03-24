/**
 * HitaVirTech — Stack Tabs
 * Data-driven tab switching, no global pollution
 */
(function () {
  'use strict';

  function switchTab(tabId) {
    document.querySelectorAll('.stack-tab').forEach(function (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.stack-grid').forEach(function (grid) {
      grid.classList.remove('active');
    });
    var activeBtn = document.querySelector('[data-stack-tab="' + tabId + '"]');
    var activeGrid = document.getElementById('stack-' + tabId);
    if (activeBtn) { activeBtn.classList.add('active'); activeBtn.setAttribute('aria-selected', 'true'); }
    if (activeGrid) {
      activeGrid.classList.add('active');
      activeGrid.querySelectorAll('.animate-in').forEach(function (el) {
        el.classList.remove('visible');
        requestAnimationFrame(function () { el.classList.add('visible'); });
      });
    }
  }
  function init() {
    var tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;
    tabList.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-stack-tab]');
      if (!btn) return;
      switchTab(btn.dataset.stackTab);
    });
    tabList.addEventListener('keydown', function (e) {
      var tabs = Array.from(tabList.querySelectorAll('[data-stack-tab]'));
      var current = tabs.indexOf(document.activeElement);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); tabs[(current+1)% tabs.length].focus(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); tabs[(current-1+tabs.length)% tabs.length].focus(); }
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
