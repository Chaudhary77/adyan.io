/* ============================================================
   ADYAN motion engine — shared across every page.
   Companion to site-motion.css. Vanilla, idempotent, dependency-free.

   What it powers:
     1. Scroll progress bar
     2. Scroll-aware nav (condense / blur on scroll)
     3. Card spotlight (cursor-follow glow) + 3D tilt
     4. Stat / number count-ups when scrolled into view
     5. Process-timeline draw-on-scroll + marker lighting

   Robustness, same philosophy as site-reveal.js:
     - Respects prefers-reduced-motion (forces motion OFF).
     - Reads a user motion level from localStorage('adyan-motion'):
         "full" (default) | "subtle" | "off".
     - Count-ups NEVER leave a number stuck — reduced/off shows the final
       value immediately; a safety timeout reveals anything not yet counted.
     - React mounts async, so we poll until .adyan-site exists, then wire up.
       All wiring is idempotent (dataset guards) and safe to re-run.
   ============================================================ */
(function () {
  "use strict";

  var LEVELS = { off: 0, subtle: 1, full: 2 };

  function prefersReduced() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function storedLevel() {
    var v;
    try { v = localStorage.getItem("adyan-motion"); } catch (e) {}
    if (v == null) return "full";
    return LEVELS.hasOwnProperty(v) ? v : "full";
  }

  // Effective level: reduced-motion clamps everything to "off".
  function level() {
    if (prefersReduced()) return 0;
    return LEVELS[storedLevel()];
  }

  function applyHtmlClasses(lvl) {
    var h = document.documentElement;
    h.classList.toggle("motion-on", lvl >= 1);
    h.classList.toggle("motion-subtle", lvl === 1);
    h.classList.toggle("motion-full", lvl >= 2);
  }

  /* ---------------------------------------------------------
     1 · Scroll progress bar
     --------------------------------------------------------- */
  var bar = null;
  function ensureBar() {
    if (bar && document.body.contains(bar)) return bar;
    bar = document.querySelector(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.appendChild(bar);
    }
    return bar;
  }
  function updateBar() {
    var b = ensureBar();
    var doc = document.documentElement;
    var max = (doc.scrollHeight - window.innerHeight);
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    b.style.setProperty("--sp", p.toFixed(4));
  }

  /* ---------------------------------------------------------
     2 · Scroll-aware nav
     --------------------------------------------------------- */
  function updateNav() {
    var nav = document.querySelector(".adyan-nav");
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  /* ---------------------------------------------------------
     3 · Card spotlight + tilt
     --------------------------------------------------------- */
  var CARD_SEL = ".explore-card,.roster-card,.agent-card,.sys-page-card," +
    ".industry-tile,.wwb-card,.svc-row,.principle,.process-card,.legend-item,.mock-kpi";
  // Cards that should also tilt (full only). Big two-column cards included but
  // tilt magnitude is capped so it stays subtle on them.
  var TILT_SEL = ".explore-card,.roster-card,.industry-tile,.wwb-card," +
    ".legend-item,.mock-kpi,.agent-card,.sys-page-card,.svc-row,.principle,.process-card";
  var MAX_TILT = 4; // degrees

  var hovered = null, cardRAF = false, lastEvt = null;

  function paintCard() {
    cardRAF = false;
    if (!hovered || !lastEvt) return;
    var r = hovered.getBoundingClientRect();
    var x = (lastEvt.clientX - r.left) / r.width;   // 0..1
    var y = (lastEvt.clientY - r.top) / r.height;   // 0..1
    x = Math.min(1, Math.max(0, x));
    y = Math.min(1, Math.max(0, y));
    hovered.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
    hovered.style.setProperty("--my", (y * 100).toFixed(1) + "%");

    if (level() >= 2 && hovered.matches(TILT_SEL)) {
      hovered.setAttribute("data-tilt", "");
      hovered.classList.add("is-tilting");
      var ry = (x - 0.5) * 2 * MAX_TILT;       // left/right
      var rx = -(y - 0.5) * 2 * MAX_TILT;      // up/down
      hovered.style.transform =
        "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" +
        ry.toFixed(2) + "deg) translateZ(0)";
    }
  }

  function onCardMove(e) {
    var card = e.target.closest ? e.target.closest(CARD_SEL) : null;
    if (card !== hovered) {
      if (hovered) resetCard(hovered);
      hovered = card;
    }
    if (!hovered) return;
    lastEvt = e;
    if (!cardRAF) { cardRAF = true; requestAnimationFrame(paintCard); }
  }

  function resetCard(card) {
    card.classList.remove("is-tilting");
    card.style.transform = "";
    // leave --mx/--my; the ::after fades via :hover, position is irrelevant when hidden
  }

  function onCardOut(e) {
    if (!hovered) return;
    // only reset when the pointer truly leaves the hovered card
    if (e.relatedTarget && hovered.contains(e.relatedTarget)) return;
    if (e.target.closest && e.target.closest(CARD_SEL) === hovered &&
        e.relatedTarget && e.relatedTarget.closest &&
        e.relatedTarget.closest(CARD_SEL) === hovered) return;
    resetCard(hovered);
    hovered = null;
  }

  var cardsBound = false;
  function wireCards() {
    if (cardsBound) return;
    cardsBound = true;
    document.addEventListener("pointermove", onCardMove, { passive: true });
    document.addEventListener("pointerout", onCardOut, { passive: true });
  }

  /* ---------------------------------------------------------
     4 · Count-ups
     Animate the first text node containing a digit inside each target,
     preserving prefix ("SAR "), suffix ("k"/"%") and any sibling spans.
     --------------------------------------------------------- */
  var COUNT_SEL = ".mock-kpi .val, .stat .num, [data-countup]";

  function firstDigitTextNode(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (/\d/.test(n.nodeValue)) return n;
    }
    return null;
  }

  function animateCount(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    var node = firstDigitTextNode(el);
    if (!node) return;
    var raw = node.nodeValue;
    var m = raw.match(/^(\D*)([\d.,]+)(.*)$/s);
    if (!m) return;
    var prefix = m[1], numStr = m[2], suffix = m[3];
    var hasComma = numStr.indexOf(",") !== -1;
    var clean = numStr.replace(/,/g, "");
    var decimals = (clean.split(".")[1] || "").length;
    var target = parseFloat(clean);
    if (!isFinite(target)) return;

    var lvl = level();
    function fmt(v) {
      var s = decimals > 0 ? v.toFixed(decimals) : String(Math.round(v));
      if (hasComma) {
        var parts = s.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        s = parts.join(".");
      }
      return prefix + s + suffix;
    }

    if (lvl < 1) { node.nodeValue = fmt(target); return; } // off → final value

    var dur = 1300, t0 = null;
    function ease(p) { return 1 - Math.pow(1 - p, 3); } // easeOutCubic
    function step(ts) {
      if (t0 == null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      node.nodeValue = fmt(target * ease(p));
      if (p < 1) requestAnimationFrame(step);
      else node.nodeValue = fmt(target);
    }
    requestAnimationFrame(step);
  }

  var countIO = null, countQueued = [];
  function wireCountUps() {
    var els = document.querySelectorAll(COUNT_SEL);
    if (!els.length) return;
    var lvl = level();
    if (lvl < 1) { els.forEach(animateCount); return; } // straight to final

    if ("IntersectionObserver" in window) {
      if (!countIO) {
        countIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { animateCount(en.target); countIO.unobserve(en.target); }
          });
        }, { threshold: 0.4 });
      }
      els.forEach(function (el) {
        if (el.dataset.counted || el.dataset.countObs) return;
        el.dataset.countObs = "1";
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) animateCount(el);
        else countIO.observe(el);
      });
    } else {
      els.forEach(animateCount);
    }
    // safety net: never leave a number un-counted
    setTimeout(function () { document.querySelectorAll(COUNT_SEL).forEach(animateCount); }, 3000);
  }

  /* ---------------------------------------------------------
     5 · Process timeline draw + marker lighting
     --------------------------------------------------------- */
  var rail = null, prog = null;
  function ensureRail() {
    rail = document.querySelector(".process-rail");
    if (!rail) return false;
    if (!prog || !rail.contains(prog)) {
      prog = rail.querySelector(".process-prog");
      if (!prog) {
        prog = document.createElement("span");
        prog.className = "process-prog";
        prog.setAttribute("aria-hidden", "true");
        rail.insertBefore(prog, rail.firstChild);
      }
    }
    return true;
  }
  function updateRail() {
    if (!rail || !document.body.contains(rail)) { if (!ensureRail()) return; }
    var r = rail.getBoundingClientRect();
    var vhMid = window.innerHeight * 0.55;
    // progress through the rail relative to the viewport mid-line
    var total = r.height;
    var passed = vhMid - r.top;
    var p = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 0;
    if (prog) prog.style.setProperty("--rail", (p * 100).toFixed(2) + "%");

    var steps = rail.querySelectorAll(".process-step");
    steps.forEach(function (s) {
      var marker = s.querySelector(".marker");
      var mr = (marker || s).getBoundingClientRect();
      var reached = (mr.top + mr.height / 2) <= vhMid;
      s.classList.toggle("is-reached", reached);
    });
  }

  /* ---------------------------------------------------------
     Scroll loop (shared, rAF-throttled)
     --------------------------------------------------------- */
  var scrollRAF = false;
  function onScroll() {
    if (scrollRAF) return;
    scrollRAF = true;
    requestAnimationFrame(function () {
      scrollRAF = false;
      updateBar();
      updateNav();
      if (rail) updateRail();
    });
  }
  var scrollBound = false;
  function bindScroll() {
    if (scrollBound) return;
    scrollBound = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     Init / re-init (idempotent)
     --------------------------------------------------------- */
  function run() {
    var root = document.querySelector(".adyan-site");
    if (!root) return false;

    applyHtmlClasses(level());

    ensureBar();
    bindScroll();
    wireCards();
    if (ensureRail()) { /* process page */ }

    // initial paint
    updateBar();
    updateNav();
    if (rail) updateRail();
    wireCountUps();

    return true;
  }

  // Public: re-apply level (called by the Tweaks panel) + re-init.
  window.adyanMotion = {
    setLevel: function (lvl) {
      try { localStorage.setItem("adyan-motion", lvl); } catch (e) {}
      applyHtmlClasses(level());
      // if turning off mid-session, reset any tilt in progress
      if (level() < 2 && hovered) resetCard(hovered);
      updateBar();
    },
    get: storedLevel,
    refresh: run
  };
  window.initAdyanMotion = run;

  // React mounts asynchronously — poll until the tree exists, then wire up.
  // Re-scan a couple of times for late-mounting content (e.g. hero swaps).
  document.addEventListener("DOMContentLoaded", function () {
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      var ok = run();
      if (ok && tries > 6) clearInterval(t);
      if (tries > 60) clearInterval(t);
    }, 120);
    // one more late sweep for count-ups / cards mounted after first paint
    setTimeout(function () { if (document.querySelector(".adyan-site")) { wireCountUps(); updateRail && rail && updateRail(); } }, 1800);
  });
})();
