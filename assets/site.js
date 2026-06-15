/* Shared site chrome behaviour: sticky-nav blur + mobile hamburger menu. */
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;

  // sticky nav: add a backdrop once the page is scrolled
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // hamburger menu
  var burger = nav.querySelector('.nav-burger');
  if (!burger) return;

  var close = function () {
    nav.classList.remove('open');
    document.body.classList.remove('nav-lock');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    document.body.classList.toggle('nav-lock', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // close the menu after tapping a link, on Escape, or when resizing to desktop
  nav.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', close); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 760) close(); });
})();
