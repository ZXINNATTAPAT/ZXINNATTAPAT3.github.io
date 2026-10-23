/**
 * Experience section: quiet scroll entrance for the timeline.
 */
(function () {
  'use strict';

  function waitForGsap(fn, attempt) {
    attempt = attempt || 0;
    if (typeof gsap !== 'undefined') {
      fn(true);
      return;
    }
    if (attempt > 80) {
      fn(false);
      return;
    }
    setTimeout(function () {
      waitForGsap(fn, attempt + 1);
    }, 50);
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function initExperience(hasGsap) {
    var section = document.getElementById('experience');
    if (!section || section.dataset.gsapReady === '1') return;

    var title = section.querySelector('.experience-min-title');
    var items = Array.from(section.querySelectorAll('.experience-min-role-item'));
    if (!title && !items.length) return;

    section.dataset.gsapReady = '1';
    section.classList.add('is-experience-gsap-ready');
    bindExperienceMore(section);

    if (!hasGsap || prefersReducedMotion()) return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    var titleBits = title ? gsap.utils.toArray('span', title) : [];
    gsap.set(titleBits, { autoAlpha: 0, y: 18 });
    gsap.set(items, { autoAlpha: 0, y: 20 });

    var tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger:
        typeof ScrollTrigger !== 'undefined'
          ? {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          : undefined,
    });

    if (titleBits.length) {
      tl.to(titleBits, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 });
    }
    tl.to(
      items,
      { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.12 },
      titleBits.length ? '-=0.28' : 0
    );
  }

  function bindExperienceMore(section) {
    var button = section.querySelector('.experience-min-more');
    if (!button || button.dataset.bound === '1') return;

    var copy = button.closest('.experience-min-copy');
    var extras = copy ? copy.querySelectorAll('.experience-min-extra') : [];
    button.dataset.bound = '1';

    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', open ? 'false' : 'true');
      extras.forEach(function (item) {
        item.hidden = open;
      });
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }

  function boot() {
    waitForGsap(initExperience);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
