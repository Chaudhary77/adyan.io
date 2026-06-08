import React from "react";
import "./HeroZeroGField.jsx";
const { ZeroGField } = window;
// HeroZeroG, assembles the zero-gravity hero: orb field + weightless
// headline (spring physics) + supporting copy / CTAs.

function splitLine(text) {
  // → array of words, each an array of chars (keeps spacing controllable)
  return text.split(" ").map((w) => w.split(""));
}

function WeightlessHeadline() {
  const hlRef = React.useRef(null);

  React.useEffect(() => {
    const hl = hlRef.current;
    if (!hl) return;
    const hero = hl.closest(".hero");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = Array.from(hl.querySelectorAll(".zg-l"));
    const N = letters.length;

    // per-letter spring state
    const st = letters.map((el, i) => ({
      el, y: 0, yV: 0, r: 0, rV: 0,
      ph: i * 0.7, ph2: i * 1.3,
      lx: 0, ly: 0,
    }));

    function measure() {
      for (const s of st) {
        // offsetParent is .hero (position:relative) → offsets are hero-relative
        s.lx = s.el.offsetLeft + s.el.offsetWidth / 2;
        s.ly = s.el.offsetTop + s.el.offsetHeight / 2;
      }
    }
    measure();
    const mt = setTimeout(measure, 400); // re-measure after fonts settle
    window.addEventListener("resize", measure);

    if (reduce) {
      return () => { clearTimeout(mt); window.removeEventListener("resize", measure); };
    }

    // pointer / energy state
    const P = { cx: -9999, cy: -9999, inside: false, energy: 0, down: false };
    function onMove(e) {
      P.cx = e.clientX; P.cy = e.clientY;
      const r = hero.getBoundingClientRect();
      P.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      // movement feeds energy
      P.energy = Math.min(1.4, P.energy + 0.04);
    }
    function onDown() { P.down = true; P.energy = Math.min(1.6, P.energy + 0.5); }
    function onUp() { P.down = false; }
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    let raf = 0, t = 0, track = 0, trackV = 0;
    function loop() {
      t += 0.016;
      P.energy *= P.down ? 0.985 : 0.94;
      const heroR = hero.getBoundingClientRect();
      const px = P.cx - heroR.left;
      const py = P.cy - heroR.top;
      const reach = 190;

      for (const s of st) {
        // weightless idle bob (amplitude grows with energy)
        let targetY = Math.sin(t * 1.15 + s.ph) * (4 + P.energy * 9);
        let targetR = Math.sin(t * 0.8 + s.ph2) * (P.energy * 3);

        if (P.inside) {
          const d = Math.hypot(px - s.lx, py - s.ly);
          if (d < reach) {
            const f = 1 - d / reach;
            targetY -= f * (32 + P.energy * 26);            // lift up
            targetR += (s.lx < px ? 1 : -1) * f * (7 + P.energy * 11); // fracture tilt
          }
        }
        s.yV += (targetY - s.y) * 0.12; s.yV *= 0.78; s.y += s.yV;
        s.rV += (targetR - s.r) * 0.12; s.rV *= 0.78; s.r += s.rV;
        s.el.style.setProperty("--ly", s.y.toFixed(2) + "px");
        s.el.style.setProperty("--lr", s.r.toFixed(2) + "deg");
      }

      // tracking opens with energy
      const tTrack = P.energy * 10 + (P.inside ? 2 : 0);
      trackV += (tTrack - track) * 0.1; trackV *= 0.8; track += trackV;
      hl.style.setProperty("--zg-track", track.toFixed(2) + "px");

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(mt);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const line1 = splitLine("DEFY THE");
  const line2 = splitLine("BUSYWORK");
  let k = 0;
  const renderLine = (words, grad) =>
    words.map((chars, wi) => (
      <span className="zg-word" key={"w" + grad + wi}>
        {chars.map((ch) => (
          <span className={"zg-l" + (grad ? " grad" : "")} key={"l" + k++}>{ch}</span>
        ))}
      </span>
    ));

  return (
    <h1 className="zg-headline zg-reveal" style={{ "--d": "120ms" }} ref={hlRef} aria-label="Defy the busywork.">
      <span aria-hidden="true">{renderLine(line1, false)}</span>
      <br />
      <span aria-hidden="true">{renderLine(line2, true)}</span>
    </h1>
  );
}

function HeroZeroG() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
    const el = ref.current;
    if (!el) return;
    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionOK) return;
    const arm = () => requestAnimationFrame(() => el.classList.add("is-in"));
    if (document.visibilityState === "visible") arm();
    else {
      const onVis = () => {
        if (document.visibilityState === "visible") {
          arm();
          document.removeEventListener("visibilitychange", onVis);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      return () => document.removeEventListener("visibilitychange", onVis);
    }
  }, []);

  return (
    <section className="hero" data-variant="zerog" data-screen-label="01 Hero" ref={ref}>
      <div className="zg-mesh" />
      <ZeroGField />

      <div className="zg-stage">
        <span className="zg-pill zg-reveal" style={{ "--d": "0ms" }}>
          <span className="chip">KSA</span>
          AI operations, deployed end-to-end
        </span>

        <WeightlessHeadline />

        <p className="zg-sub zg-reveal" style={{ "--d": "240ms" }}>
          ADYAN builds AI agents, automations, and ERP-connected workflows that
          lift the repetitive work off your team, so operations run faster,
          reporting gets sharper, and nothing falls through.
        </p>

        <div className="zg-cta zg-reveal" style={{ "--d": "340ms" }}>
          <a className="btn-primary" href="https://wa.me/966508183984" target="_blank" rel="noopener">
            <i data-lucide="message-circle" /> Talk to Operations
          </a>
          <a className="btn-secondary" href="/contact">Book a Systems Audit <span className="arr" /></a>
        </div>

        <div className="zg-meta zg-reveal" style={{ "--d": "420ms" }}>
          <span><i data-lucide="message-circle" /> WhatsApp-native</span>
          <span><i data-lucide="mic" /> Voice-ready</span>
          <span><i data-lucide="database" /> ERP-connected</span>
          <span><i data-lucide="shield-check" /> Audit-ready</span>
        </div>
      </div>

      <div className="zg-hint">
        <i data-lucide="move" /> Drag to disturb the field
      </div>
    </section>
  );
}

window.HeroZeroG = HeroZeroG;
