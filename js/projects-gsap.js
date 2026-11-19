/**
 * PROJECTS conveyor: two opposite marquees of featured cards.
 */
(function () {
  'use strict';

  var ROW_COUNT = 1;
  var SPEEDS = [38];

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
    var source = Array.from(board.querySelectorAll(':scope > .ios-project-card'));
    if (source.length < 2) return [];

    var rows = [];
    board.innerHTML = '';

    for (var r = 0; r < ROW_COUNT; r += 1) {
      var row = document.createElement('div');
      row.className = 'projects-conveyor-row';
      var track = document.createElement('div');
      track.className = 'projects-conveyor-track';
      var offset = r % source.length;
      var sequence = source.slice(offset).concat(source.slice(0, offset));
      var copies = sequence.concat(sequence).concat(sequence);
      copies.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.classList.add('is-visible');
        clone.querySelectorAll('img').forEach(function (image) {
          image.draggable = false;
        });
        track.appendChild(clone);
      });
      row.appendChild(track);
      board.appendChild(row);
      rows.push(row);
    }

    board.classList.add('is-belted');
    return rows;
  }

  function initProjectsConveyor() {
    var section = document.getElementById('portfolio');
    if (!section || section.dataset.projectsGsap === '1') return;

    var board = section.querySelector('[data-projects-board]');
    if (!board) return;

    section.dataset.projectsGsap = '1';
    var rows = buildRows(board);
    var cards = Array.from(board.querySelectorAll('.ios-project-card'));
    if (!cards.length) return;

    waitForGsap(function (hasGsap) {
      if (!hasGsap) return;

      var reduceMotion = prefersReducedMotion();
      section.classList.add('is-projects-gsap-ready');

      var marqueeTweens = [];

      function killMarquees() {
        marqueeTweens.forEach(function (tween) {
          tween.kill();
        });
        marqueeTweens = [];
      }

      function startMarquees() {
        killMarquees();
        if (reduceMotion) return;

        rows.forEach(function (row, index) {
          var track = row.querySelector('.projects-conveyor-track');
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
          row._projectsMarquee = tween;
          marqueeTweens.push(tween);
        });
      }

      whenImagesReady(board, startMarquees);

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
            var row = card.closest('.projects-conveyor-row');
            if (row && row._projectsMarquee) row._projectsMarquee.pause();
            gsap.to(card, {
              y: -8,
              scale: 1.03,
              duration: 0.35,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
          card.addEventListener('pointerleave', function () {
            var row = card.closest('.projects-conveyor-row');
            if (row && row._projectsMarquee && !document.hidden) {
              row._projectsMarquee.resume();
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
    initProjectsConveyor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
