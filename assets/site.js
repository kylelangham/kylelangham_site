/* Kyle Langham Consulting — the only JavaScript on the site.
   Two jobs: the mobile nav drawer, and the print button on /for-it.
   Everything else is HTML and CSS. If this file fails to load, every page
   still reads and every link still works. */

(function () {
  'use strict';

  // Mobile nav drawer
  var toggle = document.querySelector('.navtoggle');
  var links = document.querySelector('.navlinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on Escape so keyboard users aren't trapped in the drawer.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Print button (/for-it). Uses a data attribute rather than an inline handler.
  var printers = document.querySelectorAll('[data-print]');
  for (var i = 0; i < printers.length; i++) {
    printers[i].addEventListener('click', function (e) {
      e.preventDefault();
      window.print();
    });
  }
})();
