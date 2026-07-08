document.addEventListener('DOMContentLoaded', function () {
  var trigger = document.querySelector('.menu-trigger');
  var overlay = document.querySelector('.nav-overlay');
  if (trigger && overlay) {
    trigger.addEventListener('click', function () {
      overlay.classList.toggle('open');
    });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { overlay.classList.remove('open'); });
    });
  }

  document.querySelectorAll('.glitch').forEach(function (el) {
    if (!el.getAttribute('data-text')) {
      el.setAttribute('data-text', el.textContent);
    }
  });
});
