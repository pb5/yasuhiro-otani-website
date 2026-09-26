document.addEventListener('DOMContentLoaded', function () {
  var trigger = document.querySelector('.menu-trigger');
  var overlay = document.querySelector('.nav-overlay');
  if (trigger && overlay) {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'nav-overlay');
    overlay.id = 'nav-overlay';
    trigger.addEventListener('click', function () {
      var open = overlay.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        overlay.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('.glitch').forEach(function (el) {
    if (!el.getAttribute('data-text')) {
      el.setAttribute('data-text', el.textContent);
    }
  });
});
