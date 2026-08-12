/* Джейхелпер — поведение прототипа.
   Всё, что здесь есть, — прогрессивное улучшение: при отключённом JS
   страница полностью читается, FAQ раскрывается нативным <details>. */

(function () {
  'use strict';

  // Тень и бордер у шапки при скролле — как на проде (.app-header.scrolled)
  var header = document.getElementById('header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Мобильное меню
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Якоря с учётом высоты залипающей шапки
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: top, behavior: 'smooth' });
    history.replaceState(null, '', id);
  });
})();
