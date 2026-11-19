/**
 * Profile photo deck: drag the top card to shuffle through portraits.
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

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function init(hasGsap) {
    var root = document.querySelector('[data-profile-deck]');
    if (!root) return;

    var stack = root.querySelector('.profile-card-stack');
    var cards = Array.prototype.slice.call(root.querySelectorAll('[data-card]'));
    if (!stack || cards.length < 2) return;

    var order = cards.slice();
    var dotsHost = root.querySelector('[data-deck-dots]');
    var countEl = root.querySelector('[data-deck-count]');
    var statusEl = root.querySelector('[data-deck-status]');
    var prevBtn = root.querySelector('[data-deck-prev]');
    var nextBtn = root.querySelector('[data-deck-next]');
    var busy = false;
    var drag = null;
    var listenersBound = false;

    function narrow() {
      return window.innerWidth < 768;
    }

    function poseFor(depth) {
      if (depth <= 0) {
        return { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1 };
      }
      if (depth === 1) {
        return narrow()
          ? { x: 10, y: 8, rotation: 4, scale: 0.975, autoAlpha: 1 }
          : { x: 16, y: 12, rotation: 6.5, scale: 0.965, autoAlpha: 1 };
      }
      if (depth === 2) {
        return narrow()
          ? { x: -8, y: 14, rotation: -3.5, scale: 0.95, autoAlpha: 1 }
          : { x: -14, y: 20, rotation: -5.5, scale: 0.93, autoAlpha: 1 };
      }
      return { x: 0, y: 24, rotation: 0, scale: 0.9, autoAlpha: 0 };
    }

    function applyPose(card, pose) {
      if (hasGsap) {
        gsap.set(card, pose);
        return;
      }
      card.style.transform =
        'translate(' + pose.x + 'px, ' + pose.y + 'px) rotate(' + pose.rotation + 'deg) scale(' + pose.scale + ')';
      card.style.opacity = String(pose.autoAlpha);
    }

    function renderMeta() {
      var top = order[0];
      var index = Number(top.getAttribute('data-index')) || 0;
      var label = (index + 1) + ' / ' + cards.length;
      if (countEl) countEl.textContent = label;
      if (statusEl) statusEl.textContent = label;
      if (!dotsHost) return;
      var dots = dotsHost.querySelectorAll('.profile-card-dot');
      Array.prototype.forEach.call(dots, function (dot, dotIndex) {
        var active = dotIndex === index;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    function layout(animate, done) {
      var duration = !animate || reducedMotion() || !hasGsap ? 0 : 0.48;

      order.forEach(function (card, depth) {
        var pose = poseFor(depth);
        card.style.zIndex = String(order.length - depth);
        card.classList.toggle('is-top', depth === 0);
        card.setAttribute('aria-hidden', depth === 0 ? 'false' : 'true');

        if (!hasGsap || duration === 0) {
          applyPose(card, pose);
          return;
        }

        gsap.to(card, {
          x: pose.x,
          y: pose.y,
          rotation: pose.rotation,
          scale: pose.scale,
          autoAlpha: pose.autoAlpha,
          duration: duration,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      });

      renderMeta();
      if (!done) return;
      if (!hasGsap || duration === 0) {
        done();
        return;
      }
      gsap.delayedCall(duration, done);
    }

    function release() {
      busy = false;
    }

    function distance() {
      return Math.max(stack.offsetWidth * 1.05, 240);
    }

    function go(step) {
      if (busy || order.length < 2) return;
      busy = true;
      var top = order[0];
      if (hasGsap) gsap.killTweensOf(top);

      if (step > 0) {
        var thrown = top;
        var fly = function () {
          order.push(order.shift());
          applyPose(thrown, poseFor(order.length - 1));
          if (hasGsap) gsap.set(thrown, { autoAlpha: 0 });
          layout(true, release);
        };

        if (!hasGsap || reducedMotion()) {
          fly();
          return;
        }

        gsap.to(thrown, {
          x: -distance(),
          rotation: -16,
          autoAlpha: 0,
          duration: 0.32,
          ease: 'power2.in',
          overwrite: 'auto',
          onComplete: fly
        });
        return;
      }

      var incoming = order[order.length - 1];
      order.unshift(order.pop());
      if (hasGsap) gsap.killTweensOf(incoming);

      if (!hasGsap || reducedMotion()) {
        layout(false, release);
        return;
      }

      gsap.set(incoming, {
        x: distance() * 0.72,
        y: 0,
        rotation: 12,
        scale: 1,
        autoAlpha: 1
      });
      layout(true, release);
    }

    function showOriginal(index) {
      var current = Number(order[0].getAttribute('data-index')) || 0;
      if (current === index || busy) return;
      var forward = (index - current + order.length) % order.length;
      if (forward === 1) {
        go(1);
        return;
      }
      if (forward === order.length - 1) {
        go(-1);
        return;
      }
      busy = true;
      while ((Number(order[0].getAttribute('data-index')) || 0) !== index) {
        order.push(order.shift());
      }
      layout(true, release);
    }

    function clearDragListeners() {
      if (!listenersBound) return;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      listenersBound = false;
    }

    function onPointerMove(event) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      var dx = event.clientX - drag.startX;
      var dy = event.clientY - drag.startY;

      if (!drag.active) {
        if (Math.hypot(dx, dy) < 8) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          clearDragListeners();
          drag = null;
          return;
        }
        drag.active = true;
        drag.card.classList.add('is-dragging');
        if (hasGsap) gsap.killTweensOf(drag.card);
      }

      var now = performance.now();
      var dt = Math.max(16, now - drag.lastT);
      drag.vx = (event.clientX - drag.lastX) / dt;
      drag.lastX = event.clientX;
      drag.lastT = now;
      drag.x = dx;

      if (hasGsap) {
        gsap.set(drag.card, {
          x: dx,
          y: dy * 0.12,
          rotation: dx * 0.045
        });
      }
    }

    function onPointerUp(event) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      var card = drag.card;
      var was = drag;
      drag = null;
      clearDragListeners();
      card.classList.remove('is-dragging');
      if (!was.active) return;

      var next = was.x <= -78 || (Math.abs(was.x) < 78 && was.vx < -0.5);
      var prev = was.x >= 78 || (Math.abs(was.x) < 78 && was.vx > 0.5);
      if (next) {
        go(1);
        return;
      }
      if (prev) {
        go(-1);
        return;
      }
      if (hasGsap && !reducedMotion()) {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        return;
      }
      applyPose(card, poseFor(0));
    }

    function onPointerDown(event) {
      if (busy) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      var card = event.target.closest ? event.target.closest('[data-card]') : null;
      if (!card || !stack.contains(card)) return;
      if (card !== order[0]) {
        if (card === order[1]) go(1);
        return;
      }

      drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastT: performance.now(),
        vx: 0,
        x: 0,
        active: false,
        card: card
      };
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
      listenersBound = true;
    }

    if (dotsHost) {
      cards.forEach(function (card, index) {
        var dot = document.createElement('button');
        var image = card.querySelector('img');
        dot.type = 'button';
        dot.className = 'profile-card-dot';
        dot.setAttribute('aria-label', image ? image.alt : String(index + 1));
        dot.addEventListener('click', function () {
          showOriginal(index);
        });
        dotsHost.appendChild(dot);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        go(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        go(1);
      });
    }

    stack.addEventListener('pointerdown', onPointerDown);
    stack.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
      }
    });

    layout(false);
    window.addEventListener('resize', function () {
      if (busy || drag) return;
      layout(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      waitForGsap(init);
    });
  } else {
    waitForGsap(init);
  }
})();
