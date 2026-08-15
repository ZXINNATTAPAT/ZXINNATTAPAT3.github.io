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
      cards.forEach(function (card) {
        card.style.setProperty('--accent-progress', '1');
        card.style.setProperty('--accent-thickness', '1');
      });
      return;
    }

    gsap.set(headerBits, { autoAlpha: 0, y: 28 });
    gsap.set(cards, {
      autoAlpha: 0,
      y: 72,
      scale: 0.9,
      transformOrigin: '50% 80%',
    });
    cards.forEach(function (card) {
      card.style.setProperty('--accent-progress', '0');
      card.style.setProperty('--accent-thickness', '1');
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
        scale: 1,
        stagger: { each: 0.12, from: 'start' },
      })
      .to(
        cards,
        {
          '--accent-progress': 1,
          stagger: { each: 0.08, from: 'start' },
        },
        0.15
      );

    cards.forEach(function (card) {
      var brand = card.querySelector('.cloud-platform-brand');
      var hoverTween = null;

      function onEnter() {
        if (hoverTween) hoverTween.kill();
        hoverTween = gsap
          .timeline()
          .to(
            card,
            {
              y: -14,
              scale: 1.02,
              boxShadow:
                '0 34px 64px rgba(15, 23, 42, 0.14), 0 14px 28px rgba(15, 23, 42, 0.08)',
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          )
          .to(
            brand,
            {
              scale: 1.06,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          )
          .to(
            card,
            {
              '--accent-thickness': 3,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          );
      }

      function onLeave() {
        if (hoverTween) hoverTween.kill();
        hoverTween = gsap
          .timeline()
          .to(
            card,
            {
              y: 0,
              scale: 1,
              boxShadow:
                '0 24px 48px rgba(15, 23, 42, 0.06), 0 8px 18px rgba(15, 23, 42, 0.04)',
              duration: 0.45,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          )
          .to(
            brand,
            {
              scale: 1,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          )
          .to(
            card,
            {
              '--accent-thickness': 1,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          );
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
