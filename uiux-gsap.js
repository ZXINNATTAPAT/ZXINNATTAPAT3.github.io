/**
 * UI/UX gallery: 3-row diagonal conveyor that covers the stage.
 */
(function () {
  'use strict';

  var ROW_COUNT = 5;
  var SPEEDS = [36, 48, 40, 44, 32];

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

  function isCompactGallery() {
    var queryMatch =
      window.matchMedia && window.matchMedia('(max-width: 1024px)').matches;
    return queryMatch || window.innerWidth <= 1024;
  }

  function collapseToOriginalCards(board) {
    var cards = Array.from(board.querySelectorAll('.uiux-drag-card'));
    var seen = {};
    var unique = [];

    cards.forEach(function (card) {
      var image = card.querySelector('img');
      var key = image
        ? image.getAttribute('src') || image.getAttribute('alt') || ''
        : '';
      if (!key || seen[key]) return;
      seen[key] = true;
      unique.push(card.cloneNode(true));
    });

    if (!unique.length) {
      unique = cards.slice(0, 6).map(function (card) {
        return card.cloneNode(true);
      });
    }

    board.classList.remove('is-tiled');
    board.style.transform = '';
    board.style.removeProperty('--uiux-cover-scale');
    board.innerHTML = '';
    unique.forEach(function (card) {
      card.removeAttribute('style');
      card.querySelectorAll('img').forEach(function (image) {
        image.draggable = false;
      });
      board.appendChild(card);
    });
  }

  function setupCompactRow(section, board) {
    var shell = section.querySelector('.uiux-tilt-stage');
    var cards = Array.from(board.querySelectorAll('.uiux-drag-card'));
    if (!shell || !cards.length) return;

    var rafId = 0;

    function cardCenter(card) {
      return card.offsetLeft + card.offsetWidth / 2;
    }

    function updateCards() {
      var shellCenter = shell.scrollLeft + shell.clientWidth / 2;
      var maxDistance = Math.max(shell.clientWidth * 0.42, 1);
      var nearest = cards[0];
      var nearestDistance = Infinity;

      cards.forEach(function (card) {
        var distance = Math.abs(cardCenter(card) - shellCenter);
        var progress = Math.min(distance / maxDistance, 1);
        card.style.setProperty('--uiux-card-scale', (1 - progress * 0.18).toFixed(3));
        card.style.setProperty('--uiux-card-blur', (progress * 3.2).toFixed(2) + 'px');
        card.style.setProperty('--uiux-card-z', String(Math.round((1 - progress) * 10) + 1));
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = card;
        }
      });

      cards.forEach(function (card) {
        var isActive = card === nearest;
        card.classList.toggle('is-active', isActive);
        if (isActive) {
          card.style.setProperty('--uiux-card-scale', '1.03');
          card.style.setProperty('--uiux-card-blur', '0px');
          card.style.setProperty('--uiux-card-z', '18');
        }
      });
    }

    function scheduleUpdate() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(function () {
        rafId = 0;
        updateCards();
      });
    }

    shell.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    whenImagesReady(board, updateCards);
    updateCards();
  }

  function whenImagesReady(root, callback) {
    var images = Array.from(root.querySelectorAll('img'));
    var pending = images.filter(function (image) {
      return !image.complete;
    });
    if (!pending.length) {
      callback();
      return;
    }
    var left = pending.length;
    var done = function () {
      left -= 1;
      if (left <= 0) callback();
    };
    pending.forEach(function (image) {
      image.addEventListener('load', done, { once: true });
      image.addEventListener('error', done, { once: true });
    });
  }

  function measureLoopWidth(track) {
    var cards = Array.from(track.children);
    if (cards.length < 2) return 0;
    var half = Math.floor(cards.length / 3);
    var styles = window.getComputedStyle(track);
    var gap = parseFloat(styles.columnGap || styles.gap) || 0;
    var width = 0;
    for (var i = 0; i < half; i += 1) {
      width += cards[i].offsetWidth + gap;
    }
    return width;
  }

  function buildRows(board) {
    var source = Array.from(board.querySelectorAll(':scope > .uiux-drag-card'));
    if (source.length < 2) return [];

    var rows = [];
    board.innerHTML = '';

    for (var r = 0; r < ROW_COUNT; r += 1) {
      var row = document.createElement('div');
      row.className = 'uiux-tilt-row';
      var track = document.createElement('div');
      track.className = 'uiux-tilt-track';
      var offset = r % source.length;
      var sequence = source.slice(offset).concat(source.slice(0, offset));
      var copies = sequence.concat(sequence).concat(sequence);
      copies.forEach(function (card) {
        track.appendChild(card.cloneNode(true));
      });
      row.appendChild(track);
      board.appendChild(row);
      rows.push(row);
    }

    board.classList.add('is-tiled');
    return rows;
  }

  function initUiuxGallery() {
    var section = document.getElementById('uiux-projects');
    if (!section || section.dataset.uiuxReady === '1') return;

    var board = section.querySelector('[data-uiux-tilt-board]');
    if (!board) return;

    section.dataset.uiuxReady = '1';

    if (isCompactGallery()) {
      section.classList.add('is-uiux-static');
      collapseToOriginalCards(board);
      section.classList.add('is-uiux-gsap-ready');
      setupCompactRow(section, board);
      return;
    }

    var rows = buildRows(board);
    var cards = Array.from(board.querySelectorAll('.uiux-drag-card'));
    if (!cards.length) return;

    var stage = section.querySelector('.uiux-tilt-stage');

    function applyCoverScale() {
      if (!stage || !board) return;
      var thickness = board.scrollHeight;
      if (thickness < 8) return;
      var needed = (stage.clientWidth + stage.clientHeight) / Math.SQRT2;
      var scale = (needed / thickness) * 1.12;
      board.style.setProperty('--uiux-cover-scale', scale.toFixed(3));
    }

    cards.forEach(function (card) {
      card.querySelectorAll('img').forEach(function (image) {
        image.draggable = false;
      });
    });

    applyCoverScale();
    whenImagesReady(board, applyCoverScale);

    var coverResizeTimer = 0;
    window.addEventListener('resize', function () {
      window.clearTimeout(coverResizeTimer);
      coverResizeTimer = window.setTimeout(applyCoverScale, 160);
    });

    waitForGsap(function (hasGsap) {
      if (!hasGsap) return;

      var reduceMotion = prefersReducedMotion();
      section.classList.add('is-uiux-gsap-ready');
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      if (!reduceMotion) {
        gsap.set(cards, { autoAlpha: 0, y: 28, scale: 0.94 });
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: { each: 0.035, from: 'start' },
          ease: 'power3.out',
          scrollTrigger:
            typeof ScrollTrigger !== 'undefined'
              ? {
                  trigger: section,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                  invalidateOnRefresh: true,
                }
              : undefined,
        });
      }

      var marqueeTweens = [];

      function killMarquees() {
        marqueeTweens.forEach(function (tween) {
          tween.kill();
        });
        marqueeTweens = [];
      }

      function startMarquees() {
        killMarquees();
        applyCoverScale();
        if (reduceMotion) return;

        rows.forEach(function (row, index) {
          var track = row.querySelector('.uiux-tilt-track');
          if (!track) return;
          var loopWidth = measureLoopWidth(track);
          if (loopWidth < 8) return;

          var goingLeft = index % 2 === 0;
          gsap.set(track, { x: goingLeft ? 0 : -loopWidth });
          var tween = gsap.to(track, {
            x: goingLeft ? -loopWidth : 0,
            duration: loopWidth / SPEEDS[index % SPEEDS.length],
            ease: 'none',
            repeat: -1,
          });
          row._uiuxMarquee = tween;
          marqueeTweens.push(tween);
        });
      }

      whenImagesReady(board, function () {
        startMarquees();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });

      var resizeTimer = 0;
      window.addEventListener('resize', function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(startMarquees, 180);
      });

      document.addEventListener('visibilitychange', function () {
        var paused = document.hidden;
        marqueeTweens.forEach(function (tween) {
          if (paused) tween.pause();
          else tween.resume();
        });
      });

      if (!reduceMotion) {
        cards.forEach(function (card) {
          card.addEventListener('pointerenter', function () {
            var row = card.closest('.uiux-tilt-row');
            if (row && row._uiuxMarquee) row._uiuxMarquee.pause();
            gsap.to(card, {
              y: -10,
              scale: 1.06,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
          card.addEventListener('pointerleave', function () {
            var row = card.closest('.uiux-tilt-row');
            if (row && row._uiuxMarquee && !document.hidden) {
              row._uiuxMarquee.resume();
            }
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        });
      }
    });
  }

  function boot() {
    initUiuxGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
