// Small progressive enhancement: mark the page as interactive when JS is available.
document.documentElement.classList.add('js-enabled');

// A tiny black cat occasionally peeks from a letter in the masthead.
(() => {
  const brand = document.querySelector('.brand');
  if (!brand || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hosts = Array.from(brand.querySelectorAll('[data-cat-host]'));
  const cat = brand.querySelector('.masthead-cat');
  if (hosts.length < 2 || !cat) return;

  let lastHost = null;
  let hideTimer = null;
  let nextTimer = null;

  const schedulePeek = () => {
    if (document.hidden) {
      nextTimer = window.setTimeout(schedulePeek, 2500);
      return;
    }

    let choices = hosts.filter(host => host !== lastHost);
    const host = choices[Math.floor(Math.random() * choices.length)];
    host.appendChild(cat);
    host.classList.add('is-peeking');
    lastHost = host;

    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      host.classList.remove('is-peeking');
      nextTimer = window.setTimeout(schedulePeek, 4500 + Math.random() * 5500);
    }, 1400 + Math.random() * 650);
  };

  nextTimer = window.setTimeout(schedulePeek, 1800 + Math.random() * 2200);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(nextTimer);
      window.clearTimeout(hideTimer);
      hosts.forEach(host => host.classList.remove('is-peeking'));
    } else {
      nextTimer = window.setTimeout(schedulePeek, 1200 + Math.random() * 1800);
    }
  });
})();
