/* Vanilla BubbleMenu behaviour (React Bits port). Uses GSAP if present; degrades
   gracefully to a simple show/hide if GSAP failed to load. */
(function () {
  var nav = document.querySelector('nav.bubble-menu');
  if (!nav) return;
  var btn = nav.querySelector('.menu-btn');
  var overlay = document.querySelector('.bubble-menu-items');
  if (!btn || !overlay) return;

  var pills = [].slice.call(overlay.querySelectorAll('.pill-link'));
  var labels = [].slice.call(overlay.querySelectorAll('.pill-label'));
  var isOpen = false;
  var g = function () { return typeof window.gsap !== 'undefined' ? window.gsap : null; };

  function open() {
    isOpen = true;
    btn.classList.add('open');
    btn.setAttribute('aria-pressed', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-lock');
    overlay.style.display = 'flex';
    var gs = g();
    if (!gs) return;
    gs.killTweensOf(pills.concat(labels));
    gs.set(pills, { scale: 0, transformOrigin: '50% 50%' });
    gs.set(labels, { y: 24, autoAlpha: 0 });
    pills.forEach(function (p, i) {
      var delay = i * 0.1 + gs.utils.random(-0.05, 0.05);
      var tl = gs.timeline({ delay: delay });
      tl.to(p, { scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
      if (labels[i]) tl.to(labels[i], { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, '-=0.45');
    });
  }

  function close() {
    isOpen = false;
    btn.classList.remove('open');
    btn.setAttribute('aria-pressed', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-lock');
    var gs = g();
    if (!gs) { overlay.style.display = 'none'; return; }
    gs.killTweensOf(pills.concat(labels));
    gs.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: 'power3.in' });
    gs.to(pills, {
      scale: 0, duration: 0.2, ease: 'power3.in',
      onComplete: function () { overlay.style.display = 'none'; }
    });
  }

  btn.addEventListener('click', function () { isOpen ? close() : open(); });
  pills.forEach(function (a) { a.addEventListener('click', close); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) close(); });
})();
