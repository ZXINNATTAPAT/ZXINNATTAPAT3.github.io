/**
 * GSAP animations for the Cloud & Hosting section.
 * Scroll-triggered header + card entrance, accent bar reveal, hover lift.
 */
(function () {
  'use strict';

  function whenReady(fn) {
    function start() {
      if (document.body.classList.contains('loaded')) {
        fn();
        return;
      }

      var observer = new MutationObserver(function () {
        if (document.body.classList.contains('loaded')) {
          observer.disconnect();
          fn();
        }
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });

      // Fallback if loading screen never adds `.loaded`
      setTimeout(fn, 1200);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

  function waitForGsap(fn, attempt) {
    attempt = attempt || 0;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      fn();
      return;
    }
    if (attempt > 80) return;
    setTimeout(function () {
      waitForGsap(fn, attempt + 1);
    }, 50);
  }

  function initCloudPlatformsGsap() {
    var section = document.querySelector('#cloud-platforms');
    if (!section || section.dataset.gsapReady === '1') return;
    section.dataset.gsapReady = '1';

    gsap.registerPlugin(ScrollTrigger);

    var headerBits = section.querySelectorAll(
      '.cloud-platforms-kicker, .cloud-platforms-header .profile-heading, .cloud-platforms-description'
    );
    var cards = gsap.utils.toArray('.cloud-platform-card', section);
    var hoverCleanups = [];

    var mm = gsap.matchMedia();

    mm.add(
      {
        isMotionOk: '(prefers-reduced-motion: no-preference)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      function (context) {
        var reduceMotion = context.conditions.reduceMotion;

        if (reduceMotion) {
          gsap.set([headerBits, cards], { clearProps: 'all' });
          cards.forEach(function (card) {
            card.style.setProperty('--accent-progress', '1');
          });
          return;
        }

        gsap.set(headerBits, { autoAlpha: 0, y: 26 });
        gsap.set(cards, {
          autoAlpha: 0,
          y: 52,
          scale: 0.94,
          transformOrigin: '50% 80%',
        });
        cards.forEach(function (card) {
          card.style.setProperty('--accent-progress', '0');
        });

        var tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
        });

        tl.to(headerBits, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.11,
        })
          .to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.78,
              stagger: { each: 0.1, from: 'start' },
              ease: 'power3.out',
            },
            '-=0.32'
          )
          .to(
            cards,
            {
              '--accent-progress': 1,
              duration: 0.55,
              stagger: { each: 0.08, from: 'start' },
              ease: 'power2.out',
            },
            '-=0.55'
          );

        cards.forEach(function (card) {
          var brand = card.querySelector('.cloud-platform-brand');
          var hoverTl = gsap.timeline({ paused: true });

          hoverTl
            .to(
              card,
              {
                y: -8,
                boxShadow:
                  '0 28px 56px rgba(15, 23, 42, 0.1), 0 10px 22px rgba(15, 23, 42, 0.06)',
                duration: 0.38,
                ease: 'power2.out',
              },
              0
            )
            .to(
              brand,
              {
                scale: 1.045,
                duration: 0.38,
                ease: 'power2.out',
              },
              0
            )
            .to(
              card,
              {
                '--accent-thickness': 2.2,
                duration: 0.38,
                ease: 'power2.out',
              },
              0
            );

          function onEnter() {
            hoverTl.play();
          }
          function onLeave() {
            hoverTl.reverse();
          }

          card.addEventListener('pointerenter', onEnter);
          card.addEventListener('pointerleave', onLeave);
          hoverCleanups.push(function () {
            card.removeEventListener('pointerenter', onEnter);
            card.removeEventListener('pointerleave', onLeave);
            hoverTl.kill();
          });
        });

        return function () {
          hoverCleanups.splice(0).forEach(function (cleanup) {
            cleanup();
          });
        };
      }
    );
  }

  whenReady(function () {
    waitForGsap(initCloudPlatformsGsap);
  });
})();
