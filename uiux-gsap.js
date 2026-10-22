/**
 * UI/UX gallery: a CSS marquee on wide screens, a snap row on small screens.
 * The loop is two identical copies translated by half the track, so it does
 * not depend on measuring card widths.
 */
(function () {
  'use strict';

  var ROW_COUNT = 4;
  var DURATIONS = [52, 68, 58, 74];

  function isCompactGallery() {
    return window.matchMedia('(max-width: 1024px)').matches;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function whenImagesReady(root, callback) {
    var pending = Array.from(root.querySelectorAll('img')).filter(function (image) {
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

  function prepareCard(card, hidden) {
    var clone = card.cloneNode(true);
    clone.removeAttribute('style');
    if (hidden) clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('img').forEach(function (image) {
      image.draggable = false;
      image.loading = 'eager';
    });
    return clone;
  }

  function applyCoverScale(section, board) {
    var stage = section.querySelector('.uiux-tilt-stage');
    if (!stage) return;
    var thickness = board.scrollHeight;
    if (thickness < 8) return;
    var needed = (stage.clientWidth + stage.clientHeight) / Math.SQRT2;
    var scale = (needed / thickness) * 1.04;
    scale = Math.min(Math.max(scale, 1.2), 2.8);
    board.style.setProperty('--uiux-cover-scale', scale.toFixed(3));
  }

  function buildHalf(sequence, hideAll) {
    var half = document.createElement('div');
    half.className = 'uiux-tilt-half';
    sequence.forEach(function (card) {
      half.appendChild(prepareCard(card, hideAll));
    });
    return half;
  }

  function buildRows(board, originals) {
    board.innerHTML = '';
    board.classList.toggle('is-static', prefersReducedMotion());

    for (var r = 0; r < ROW_COUNT; r += 1) {
      var row = document.createElement('div');
      row.className = 'uiux-tilt-row';
      var track = document.createElement('div');
      track.className = 'uiux-tilt-track';
      track.style.setProperty('--uiux-duration', DURATIONS[r % DURATIONS.length] + 's');

      var offset = r % originals.length;
      var sequence = originals.slice(offset).concat(originals.slice(0, offset));
      var first = buildHalf(sequence, r > 0);
      var second = buildHalf(sequence, true);
      track.appendChild(first);
      track.appendChild(second);

      row.appendChild(track);
      board.appendChild(row);
    }

    board.classList.add('is-tiled');
  }

  function updateCompactCards(shell, cards) {
    if (!shell || !cards.length) return;
    var shellCenter = shell.scrollLeft + shell.clientWidth / 2;
    var maxDistance = Math.max(shell.clientWidth * 0.55, 1);
    var nearest = cards[0];
    var nearestDistance = Infinity;

    cards.forEach(function (card) {
      var center = card.offsetLeft + card.offsetWidth / 2;
      var distance = Math.abs(center - shellCenter);
      var progress = Math.min(distance / maxDistance, 1);
      card.style.setProperty('--uiux-card-scale', (1 - progress * 0.06).toFixed(3));
      card.style.setProperty('--uiux-card-z', String(Math.round((1 - progress) * 8) + 1));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = card;
      }
    });

    cards.forEach(function (card) {
      card.classList.toggle('is-active', card === nearest);
    });
  }

  function bindCompact(section, board, signal) {
    var shell = section.querySelector('.uiux-tilt-stage');
    var cards = Array.from(board.querySelectorAll('.uiux-drag-card'));
    if (!shell || !cards.length) return;

    var rafId = 0;
    function schedule() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(function () {
        rafId = 0;
        updateCompactCards(shell, cards);
      });
    }

    shell.addEventListener('scroll', schedule, { passive: true, signal: signal });
    window.addEventListener('resize', schedule, { signal: signal });
    whenImagesReady(board, function () {
      updateCompactCards(shell, cards);
    });
    updateCompactCards(shell, cards);
  }

  function mount(section, board, originals) {
    if (section._uiuxAbort) section._uiuxAbort.abort();
    var abort = new AbortController();
    section._uiuxAbort = abort;

    board.classList.remove('is-tiled', 'is-static');
    board.style.removeProperty('--uiux-cover-scale');
    board.innerHTML = '';

    if (isCompactGallery()) {
      section.classList.add('is-uiux-static');
      originals.forEach(function (card) {
        board.appendChild(prepareCard(card, false));
      });
      bindCompact(section, board, abort.signal);
      return;
    }

    section.classList.remove('is-uiux-static');
    buildRows(board, originals);
    applyCoverScale(section, board);
    whenImagesReady(board, function () {
      applyCoverScale(section, board);
    });
  }

  function initUiuxGallery() {
    var section = document.getElementById('uiux-projects');
    var board = section && section.querySelector('[data-uiux-tilt-board]');
    if (!section || !board || section.dataset.uiuxReady === '1') return;

    section.dataset.uiuxReady = '1';
    var originals = Array.from(board.querySelectorAll(':scope > .uiux-drag-card')).map(function (card) {
      return card.cloneNode(true);
    });
    if (originals.length < 2) return;

    var mode = isCompactGallery() ? 'compact' : 'wide';
    mount(section, board, originals);

    var compactQuery = window.matchMedia('(max-width: 1024px)');
    if (compactQuery.addEventListener) {
      compactQuery.addEventListener('change', function () {
        var next = compactQuery.matches ? 'compact' : 'wide';
        if (next === mode) return;
        mode = next;
        mount(section, board, originals);
      });
    }

    var resizeTimer = 0;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        var next = isCompactGallery() ? 'compact' : 'wide';
        if (next !== mode) {
          mode = next;
          mount(section, board, originals);
          return;
        }
        if (next === 'wide') applyCoverScale(section, board);
      }, 180);
    });

    function syncPause() {
      section.classList.toggle(
        'is-uiux-paused',
        document.hidden || section.dataset.uiuxOffscreen === '1'
      );
    }

    document.addEventListener('visibilitychange', syncPause);
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        section.dataset.uiuxOffscreen = entries[0].isIntersecting ? '0' : '1';
        syncPause();
      }, { rootMargin: '120px' });
      observer.observe(section);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUiuxGallery);
  } else {
    initUiuxGallery();
  }
})();
