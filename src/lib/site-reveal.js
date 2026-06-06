/* ============================================================
   ADYAN scroll-reveal engine.
   Marks top-level sections (except the hero, which has its own
   entrance) and eases them in as they enter the viewport.

   Robustness first, content must NEVER be left stuck at opacity:0:
   - Synchronous in-view check on init reveals anything already visible.
   - A throttled scroll/resize listener is the primary trigger (works
     everywhere, including environments where IntersectionObserver
     never fires).
   - IntersectionObserver is layered on as an enhancement.
   - A safety timeout reveals everything if nothing has fired.
   Idempotent and re-runnable: safe to call from React effects.
   ============================================================ */
(function () {
  var bound = [];        // sections we're tracking
  var io = null;
  var listening = false;
  var rafPending = false;

  function reveal(section) {
    if (!section || section.classList.contains("rv-in")) return;
    section.classList.add("rv-in");
    if (io) { try { io.unobserve(section); } catch (e) {} }
  }

  function inView(section) {
    var r = section.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    // Reveal once any part crosses ~92% of the viewport height.
    return r.top < vh * 0.92 && r.bottom > 0;
  }

  function checkAll() {
    rafPending = false;
    var remaining = false;
    for (var i = 0; i < bound.length; i++) {
      var s = bound[i];
      if (s.classList.contains("rv-in")) continue;
      if (inView(s)) reveal(s);
      else remaining = true;
    }
    if (!remaining) stopListening();
  }

  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(checkAll);
  }

  function startListening() {
    if (listening) return;
    listening = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  function stopListening() {
    if (!listening) return;
    listening = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  }

  function revealAll() {
    for (var i = 0; i < bound.length; i++) reveal(bound[i]);
    stopListening();
  }

  // Pick the real CONTENT grid/strip inside a section to cascade — a single
  // container with 3–12 similar children. We deliberately skip heading
  // clusters (eyebrow + h2 + sub) so the cards stagger, not the title.
  function isHeadingCluster(el) {
    var cn = (el.className || "") + "";
    if (/head|eyebrow|connector/i.test(cn)) return true;
    // Mostly headings / paragraphs / lone spans = a text block, not cards.
    var textish = 0, kids = el.children.length;
    for (var k = 0; k < kids; k++) {
      var t = el.children[k].tagName;
      if (t === "H1" || t === "H2" || t === "H3" || t === "H4" ||
          t === "H5" || t === "H6" || t === "P" || t === "SPAN" || t === "BR") textish++;
    }
    return textish > kids / 2;
  }

  function tagStagger(section) {
    // Honour any grid the markup already opted in (e.g. IndustriesHome).
    var preset = section.querySelector("[data-rv-stagger]");
    if (preset) {
      for (var p = 0; p < preset.children.length; p++) {
        if (!preset.children[p].style.getPropertyValue("--rv-i")) {
          preset.children[p].style.setProperty("--rv-i", p);
        }
      }
      return;
    }
    var candidates = section.querySelectorAll("div, ul, ol");
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      var kids = el.children.length;
      if (kids < 3 || kids > 12) continue;
      if (isHeadingCluster(el)) continue;
      el.setAttribute("data-rv-stagger", "");
      for (var k = 0; k < el.children.length; k++) {
        el.children[k].style.setProperty("--rv-i", k);
      }
      return; // one stagger group per section keeps it tasteful
    }
  }

  function init() {
    var root = document.querySelector(".adyan-site");
    if (!root) return false;
    var sections = root.querySelectorAll(":scope > section:not(.hero):not(.page-hero)");
    if (!sections.length) return false;

    document.documentElement.classList.add("reveal-on");

    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var added = false;
    sections.forEach(function (s) {
      if (s.dataset.rvBound) return;
      s.dataset.rvBound = "1";
      if (reduce) { s.classList.add("rv", "rv-in"); return; }
      s.classList.add("rv");
      tagStagger(s);
      bound.push(s);
      added = true;
    });

    if (reduce || !added) return true;

    // Enhancement: IntersectionObserver, if it actually delivers.
    if ("IntersectionObserver" in window) {
      if (!io) {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) reveal(e.target);
          });
          checkAll();
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      }
      bound.forEach(function (s) { try { io.observe(s); } catch (e) {} });
    }

    // Primary, always-works path: scroll/resize + an immediate pass for
    // whatever is already on screen at load.
    startListening();
    checkAll();

    // Last-resort safety net: never leave content hidden.
    setTimeout(revealAll, 2500);

    return true;
  }

  window.initAdyanReveal = init;

  // React mounts asynchronously (Babel transpile). Poll briefly until
  // the section tree exists, then stop.
  document.addEventListener("DOMContentLoaded", function () {
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      if (init() || tries > 50) clearInterval(t);
    }, 100);
  });
})();
