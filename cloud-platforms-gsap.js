/**
 * GSAP animations for the Cloud & Hosting section.
 * Scroll-triggered header + card entrance, accent bar reveal, hover lift.
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

    var headerBits = gsap.utils.toArray(
      '.cloud-platforms-kicker, .cloud-platforms-header .profile-heading, .cloud-platforms-description',
      section
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

    gsap.set(headerBits, { autoAlpha: 0, y: 32 });
    gsap.set(cards, {
      autoAlpha: 0,
      y: 64,
      scale: 0.92,
      transformOrigin: '50% 80%',
    });
    cards.forEach(function (card) {
      card.style.setProperty('--accent-progress', '0');
      card.style.setProperty('--accent-thickness', '1');
    });

    var tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      },
    });

    tl.to(headerBits, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
    })
      .to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: { each: 0.12, from: 'start' },
          ease: 'power3.out',
        },
        '-=0.35'
      )
      .to(
        cards,
        {
          '--accent-progress': 1,
          duration: 0.6,
          stagger: { each: 0.09, from: 'start' },
          ease: 'power2.out',
        },
        '-=0.6'
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
              y: -10,
              boxShadow:
                '0 30px 60px rgba(15, 23, 42, 0.12), 0 12px 24px rgba(15, 23, 42, 0.07)',
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          )
          .to(
            brand,
            {
              scale: 1.05,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            },
            0
          )
          .to(
            card,
            {
              '--accent-thickness': 2.6,
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
