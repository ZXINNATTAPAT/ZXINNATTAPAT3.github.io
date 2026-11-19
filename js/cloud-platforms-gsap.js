/**
 * GSAP animations for the Cloud & Hosting section.
 * Scroll-scrubbed card reveal, header fade-up, and hover lift.
 */
(function () {
  'use strict';

  function waitForGsap(fn, attempt) {
    attempt = attempt || 0;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      fn();
      return;
    }
    if (attempt > 100) {
      console.warn('[cloud-platforms-gsap] GSAP failed to load');
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

  function initCloudPlatformsGsap() {
    var section = document.querySelector('#cloud-platforms');
    if (!section) {
      console.warn('[cloud-platforms-gsap] #cloud-platforms not found');
      return;
    }
    if (section.dataset.gsapReady === '1') return;

    gsap.registerPlugin(ScrollTrigger);

    var header = section.querySelector('.cloud-platforms-header');
    var grid = section.querySelector('.cloud-platforms-grid');
    var headerBits = gsap.utils.toArray(
      '.cloud-platforms-kicker, .profile-heading, .cloud-platforms-description',
      header || section
    );
    var cards = gsap.utils.toArray('.cloud-platform-card', section);
    if (!cards.length) return;

    section.dataset.gsapReady = '1';
    section.classList.add('is-cloud-gsap-ready');

    if (prefersReducedMotion()) {
      gsap.set(headerBits.concat(cards), { clearProps: 'all' });
      return;
    }

    gsap.set(headerBits, { autoAlpha: 0, y: 22 });
    gsap.set(cards, {
      autoAlpha: 0,
      y: 36,
      transformOrigin: '50% 80%',
    });

    gsap.to(headerBits, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header || section,
        start: 'top 88%',
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      },
    });

    // Scrub so the stagger stays visible while scrolling the cards into frame.
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: grid || section,
          start: 'top 92%',
          end: 'top 42%',
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      })
      .to(cards, {
        autoAlpha: 1,
        y: 0,
        stagger: { each: 0.1, from: 'start' },
      });

    cards.forEach(function (card) {
      var brand = card.querySelector('.cloud-platform-brand');
      var hoverTween = null;

      function onEnter() {
        if (hoverTween) hoverTween.kill();
        hoverTween = gsap.to(brand, {
          y: -6,
          scale: 1.04,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      function onLeave() {
        if (hoverTween) hoverTween.kill();
        hoverTween = gsap.to(brand, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      card.addEventListener('pointerenter', onEnter);
      card.addEventListener('pointerleave', onLeave);
    });

    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
    });
    window.addEventListener('load', function onLoad() {
      ScrollTrigger.refresh();
      window.removeEventListener('load', onLoad);
    });
  }

  function boot() {
    waitForGsap(initCloudPlatformsGsap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
