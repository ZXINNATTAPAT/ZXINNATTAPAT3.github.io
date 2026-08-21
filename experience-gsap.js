/**
 * GSAP animations for the Experience & Internship section.
 * Scroll intro, widget hover, and panel cross-fade with staggered content.
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

    var cards = Array.from(section.querySelectorAll('.experience-showcase-card'));
    var panels = Array.from(section.querySelectorAll('.experience-showcase-panel'));
    var panelWrap = section.querySelector('.experience-showcase-panels');
    var hint = section.querySelector('.experience-showcase-hint');
    var header = section.querySelector('.experience-showcase-header');
    if (!cards.length || !panels.length || !panelWrap) return;

    var reduceMotion = prefersReducedMotion() || !hasGsap;
    var switchTween = null;
    var hasScrollTrigger = hasGsap && typeof ScrollTrigger !== 'undefined';

    section.dataset.gsapReady = '1';
    if (hasGsap) {
      section.classList.add('is-experience-gsap-ready');
      if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    }

    function killSwitch() {
      if (switchTween) {
        switchTween.kill();
        switchTween = null;
      }
    }

    function panelBits(panel) {
      return {
        surface: panel.querySelector('.experience-panel-surface'),
        head: panel.querySelector('.experience-panel-head'),
        items: Array.from(panel.querySelectorAll('.experience-panel-list li')),
        badges: Array.from(panel.querySelectorAll('.experience-stack-strip .badge')),
      };
    }

    function setActiveCard(targetId) {
      cards.forEach(function (card) {
        var isActive = card.dataset.experienceTarget === targetId;
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-pressed', String(isActive));
        if (!hasGsap || reduceMotion) return;
        var shell = card.querySelector('.experience-showcase-icon-shell');
        var logo = card.querySelector('.experience-showcase-logo');
        gsap.to(card, {
          y: isActive ? -5 : 0,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        if (shell) {
          gsap.to(shell, {
            y: isActive ? -2 : 0,
            scale: isActive ? 1.03 : 1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
        if (logo) {
          gsap.to(logo, {
            scale: isActive ? 1.03 : 1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    }

    function showHint(visible) {
      if (!hint) return;
      if (reduceMotion || !hasGsap) {
        hint.hidden = !visible;
        return;
      }
      if (visible) {
        hint.hidden = false;
        gsap.fromTo(
          hint,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }
        );
      } else {
        gsap.to(hint, {
          autoAlpha: 0,
          y: -8,
          duration: 0.22,
          ease: 'power2.in',
          overwrite: 'auto',
          onComplete: function () {
            hint.hidden = true;
          },
        });
      }
    }

    function addPanelIn(tl, panel, position, renderNow) {
      var bits = panelBits(panel);
      var immediate = !!renderNow;
      var label = 'panelIn';
      tl.addLabel(label, position == null ? 0 : position);
      tl.set(panel, { autoAlpha: 1, y: 0 }, label);
      if (bits.surface) {
        tl.fromTo(
          bits.surface,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.52, ease: 'power3.out', immediateRender: immediate },
          label
        );
      }
      if (bits.head) {
        tl.fromTo(
          bits.head,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power3.out', immediateRender: immediate },
          label + '+=0.08'
        );
      }
      if (bits.items.length) {
        tl.fromTo(
          bits.items,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.055, ease: 'power3.out', immediateRender: immediate },
          label + '+=0.16'
        );
      }
      if (bits.badges.length) {
        tl.fromTo(
          bits.badges,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.04, ease: 'power3.out', immediateRender: immediate },
          label + '+=0.28'
        );
      }
    }

    function revealPanel(panel) {
      panels.forEach(function (item) {
        var isActive = item === panel;
        item.classList.toggle('is-active', isActive);
        item.hidden = !isActive;
      });
    }

    function clearExperience(options) {
      options = options || {};
      killSwitch();
      setActiveCard(null);
      panels.forEach(function (panel) {
        panel.classList.remove('is-active');
        panel.hidden = true;
        if (hasGsap) gsap.set(panel, { clearProps: 'transform,opacity,visibility' });
      });
      panelWrap.hidden = true;
      if (!options.skipHint) showHint(true);
    }

    function activateExperience(targetId, options) {
      options = options || {};
      var nextCard = cards.find(function (card) {
        return card.dataset.experienceTarget === targetId;
      });
      var nextPanel = panels.find(function (panel) {
        return panel.id === targetId;
      });
      if (!nextCard || !nextPanel) {
        clearExperience();
        return;
      }

      if (options.toggle && nextCard.classList.contains('is-active')) {
        if (reduceMotion || !hasGsap) {
          clearExperience();
          return;
        }
        killSwitch();
        var closing = panels.find(function (panel) {
          return !panel.hidden;
        });
        switchTween = gsap.timeline({
          onComplete: function () {
            clearExperience();
          },
        });
        if (closing) {
          switchTween.to(closing, { autoAlpha: 0, y: 14, duration: 0.24, ease: 'power2.in' });
        }
        return;
      }

      var currentPanel = panels.find(function (panel) {
        return panel.classList.contains('is-active') && !panel.hidden;
      });

      setActiveCard(targetId);
      showHint(false);
      panelWrap.hidden = false;

      if (reduceMotion || !hasGsap) {
        revealPanel(nextPanel);
        return;
      }

      killSwitch();
      switchTween = gsap.timeline();

      if (currentPanel && currentPanel !== nextPanel) {
        switchTween.to(currentPanel, { autoAlpha: 0, y: 14, duration: 0.24, ease: 'power2.in' });
        switchTween.call(function () {
          currentPanel.classList.remove('is-active');
          currentPanel.hidden = true;
          gsap.set(currentPanel, { clearProps: 'transform,opacity,visibility' });
          nextPanel.hidden = false;
          nextPanel.classList.add('is-active');
        });
        addPanelIn(switchTween, nextPanel, '>', false);
        return;
      }

      revealPanel(nextPanel);
      addPanelIn(switchTween, nextPanel, 0, true);
    }

    if (hasGsap && !reduceMotion) {
      var headerBits = header ? gsap.utils.toArray('h1, p', header) : [];
      gsap.set(headerBits, { autoAlpha: 0, y: 26 });
      gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.96, transformOrigin: '50% 80%' });
      if (hint) gsap.set(hint, { autoAlpha: 0, y: 14 });

      var intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: hasScrollTrigger
          ? {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            }
          : undefined,
      });
      intro.to(headerBits, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 });
      intro.to(
        cards,
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.62, stagger: 0.12 },
        '-=0.38'
      );
      if (hint) {
        intro.to(hint, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.28');
      }

      cards.forEach(function (card) {
        var shell = card.querySelector('.experience-showcase-icon-shell');
        var logo = card.querySelector('.experience-showcase-logo');

        card.addEventListener('pointerenter', function () {
          gsap.to(card, { y: -7, duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
          if (shell) {
            gsap.to(shell, {
              y: -3,
              scale: 1.045,
              duration: 0.38,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
          if (logo) {
            gsap.to(logo, { scale: 1.05, duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
          }
        });

        card.addEventListener('pointerleave', function () {
          var isActive = card.classList.contains('is-active');
          gsap.to(card, {
            y: isActive ? -5 : 0,
            duration: 0.42,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (shell) {
            gsap.to(shell, {
              y: isActive ? -2 : 0,
              scale: isActive ? 1.03 : 1,
              duration: 0.42,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
          if (logo) {
            gsap.to(logo, {
              scale: isActive ? 1.03 : 1,
              duration: 0.42,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        });
      });

      if (hasScrollTrigger) {
        requestAnimationFrame(function () {
          ScrollTrigger.refresh();
        });
        window.addEventListener('load', function onLoad() {
          ScrollTrigger.refresh();
          window.removeEventListener('load', onLoad);
        });
      }
    }

    cards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        activateExperience(card.dataset.experienceTarget, { toggle: true });
      });

      card.addEventListener('keydown', function (event) {
        if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
          return;
        }
        event.preventDefault();
        var direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
        var nextIndex = (index + direction + cards.length) % cards.length;
        cards[nextIndex].focus();
        activateExperience(cards[nextIndex].dataset.experienceTarget);
      });
    });

    clearExperience({ skipHint: true });
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
