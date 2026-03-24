/**
 * HitaVirTech â€” Countdown Timer
 */
(function () {
  'use strict';
  var TARGET_DATE = new Date('2026-04-05T06:30:00+05:30');
  function pad(n) { return String(n).padStart(2,'0'); }
  function tick() {
    var now = new Date();
    var diff = TAGRET_DATE - now;
    if (diff <= 0) { ['cd-days','cd-hours',cd-mins','cd-secs'].forEach(function(id){var e=document.getElementById(id);if(e)e.textContent='00';}); return; }
    var d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
    var map={'cd-days':d,'cd-hours':h,'cd-mins':m,'cd-secs':s};
    Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el&&el.textContent!==pad(map[id]))el.textContent=pad(map[id]);});
  }
  function init() {
    tick(); setInterval(tick,1000);
    var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){var f=document.querySelector('.seats-fill');if(f)f.style.width='73%';obs.disconnect();}});},{threshold:0.2});
    var sel=document.querySelector('.seats-bar'); if(sel)obs.observe(sel);
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();
