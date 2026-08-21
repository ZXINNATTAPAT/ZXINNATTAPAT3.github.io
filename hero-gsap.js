/**
 * Editorial hero: portrait first, then lead + wordmark.
 */
(function () {
  'use strict';

  function waitForGsap(fn, attempt) {
    attempt = attempt || 0;
    if (typeof gsap !== 'undefined') {
      fn(true);
      return;
    }
    if (attempt > 24) {
      fn(false);
      return;
    }
    setTimeout(function () {
      waitForGsap(fn, attempt + 1);
    }, 50);
  }

  function whenFontsReady(callback) {
    var settled = false;
    var finish = function () {
      if (settled) return;
      settled = true;
      callback();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(finish);
    } else {
      finish();
    }

    setTimeout(finish, 900);
  }

  function showStatic(root) {
    root.classList.add('is-visible');
  }

  function init(hasGsap) {
    var root = document.querySelector('.hero-artist');
    if (!root) return;

    var lead = root.querySelector('.hero-artist-lead');
    var actions = document.querySelector('.hero-artist-actions');
    var wordmark = root.querySelector('.hero-artist-wordmark');
    var figure = root.querySelector('.hero-artist-figure');
    var given = root.querySelector('.hero-artist-wordmark-given');
    var family = root.querySelector('.hero-artist-wordmark-family');
    var wordParts = [given, family].filter(Boolean);
    var targets = [figure, lead, wordmark, actions].filter(Boolean);

    if (!hasGsap || !targets.length) {
      showStatic(root);
      if (actions) actions.style.opacity = '1';
      return;
    }

    var mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', function () {
      gsap.set(targets.concat(wordParts), { autoAlpha: 1, y: 0 });
      showStatic(root);
    });

    mm.add('(prefers-reduced-motion: no-preference)', function () {
      gsap.set([figure, lead, actions].filter(Boolean), { autoAlpha: 0, y: 28 });
      gsap.set(wordmark, { autoAlpha: 0 });
      if (wordParts.length) {
        gsap.set(wordParts, { autoAlpha: 0 });
      }

      var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      if (figure) tl.to(figure, { autoAlpha: 1, y: 0, duration: 0.9 });
      if (lead) tl.to(lead, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.4');
      if (wordmark) tl.to(wordmark, { autoAlpha: 1, duration: 0.2 }, '-=0.2');
      if (given) tl.to(given, { autoAlpha: 1, duration: 0.55 }, '-=0.05');
      if (family) tl.to(family, { autoAlpha: 1, duration: 0.55 }, '-=0.28');
      if (actions) tl.to(actions, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.2');

      return function () {
        tl.kill();
      };
    });
  }

  function start() {
    waitForGsap(function (hasGsap) {
      whenFontsReady(function () {
        init(hasGsap);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
