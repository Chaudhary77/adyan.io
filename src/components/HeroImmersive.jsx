import React from "react";
// HeroImmersive, AI-native immersive hero for ADYAN.
//   • Animated dot-terrain canvas (flying over an electric-blue point field)
//     that reacts to the cursor and runs on requestAnimationFrame.
//   • Sleek mesh-gradient + faint grid behind it.
//   • Split heading / description layout, two CTA cards bottom-right.
//   • Entrance reveal on mount; CSS scroll-driven parallax handles exit.
//
// No WhatsApp phone, this is the clean, futuristic default.

function HeroTerrain() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0, t = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    // Terrain grid (world space). Camera flies forward along +Z.
    const COLS = 76;
    const ROWS = 46;
    const SPREAD = 2.4;     // world width spacing
    const DEPTH = 1.7;      // world depth spacing
    const SPEED = reduce ? 0 : 0.022;

    function resize() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // layered pseudo-noise height field
    function elevation(x, z) {
      return (
        Math.sin(x * 0.42 + z * 0.26) * 0.55 +
        Math.sin(x * 0.19 - z * 0.4) * 0.85 +
        Math.sin((x + z) * 0.12 + 1.7) * 0.5 +
        Math.cos(x * 0.07 - z * 0.09) * 0.35
      );
    }

    function frame() {
      t += SPEED;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.5 + (mouse.x - 0.5) * W * 0.06;
      const horizon = H * (0.30 + (mouse.y - 0.5) * 0.05);
      const focal = H * 1.05;
      const camY = 4.2;            // camera height above terrain
      const amp = 1.45;            // elevation amplitude

      const zScroll = t % DEPTH;

      // draw far rows first (painter's algorithm)
      for (let r = ROWS - 1; r >= 0; r--) {
        const worldZ = (r * DEPTH) - zScroll + 2.2;
        if (worldZ <= 0.25) continue;
        const fade = Math.min(1, (ROWS - r) / ROWS * 1.8) *
                     Math.min(1, worldZ / 4) *
                     (1 - r / ROWS) ;
        const persp = focal / worldZ;

        for (let c = 0; c < COLS; c++) {
          const worldX = (c - (COLS - 1) / 2) * SPREAD;
          const e = elevation(c * 0.5, r * 0.5 + t);
          const worldY = e * amp;

          const sx = cx + (worldX * persp);
          const sy = horizon + ((camY - worldY) * persp) * 0.12;

          if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;

          let a = fade * (0.18 + 0.5 * (0.5 + 0.5 * Math.sin(e + t)));
          if (a <= 0.01) continue;
          const size = Math.max(0.5, persp * 0.018);

          // ridge highlights pick up brighter blue
          const hi = e > 1.0;
          ctx.beginPath();
          ctx.fillStyle = hi
            ? `rgba(146,196,255,${Math.min(0.9, a + 0.2)})`
            : `rgba(60,140,240,${a})`;
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    if (reduce) { frame(); cancelAnimationFrame(raf); }
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hi-canvas" aria-hidden="true" />;
}

function HeroImmersive() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
    const el = ref.current;
    if (!el) return;
    // Only attach the entrance animation when motion is allowed AND the
    // document is visible, otherwise leave the base (visible) state so
    // print/PDF/static/hidden-tab renders never show blank content.
    const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionOK) return;
    const arm = () => requestAnimationFrame(() => el.classList.add("is-in"));
    if (document.visibilityState === "visible") {
      arm();
    } else {
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
    <section className="hero" data-variant="immersive" data-screen-label="01 Hero" ref={ref}>
      <div className="hi-mesh" />
      <div className="hi-grid" />
      <HeroTerrain />

      <div className="hi-inner">
        <div className="hi-top">
          <div>
            <span className="hi-pill hi-reveal" style={{ "--d": "0ms" }}>
              <span className="chip">KSA</span>
              AI operations, deployed end-to-end
              <span className="dot" />
            </span>
            <h1 className="hi-h1 hi-reveal" style={{ "--d": "80ms" }}>
              AI Operations Systems<br />
              for <span className="grad">real businesses.</span>
            </h1>
          </div>

          <div className="hi-desc hi-reveal" style={{ "--d": "220ms" }}>
            <div className="rule" />
            <p>
              Custom AI agents, automations, and ERP-connected workflows that
              run inside your operation, cutting repetitive work, sharpening
              reporting, and moving faster. No 18-month rollouts. No rip-and-replace.
            </p>
          </div>
        </div>

        <div />

        <div className="hi-bottom hi-reveal" style={{ "--d": "340ms" }}>
          <div className="hi-meta">
            <span><i data-lucide="message-circle" /> WhatsApp-native</span>
            <span><i data-lucide="mic" /> Voice-ready</span>
            <span><i data-lucide="database" /> ERP-connected</span>
            <span><i data-lucide="shield-check" /> Audit-ready</span>
          </div>

          <div className="hi-cards">
            <a className="hi-card primary" href="https://wa.me/966508183984" target="_blank" rel="noopener">
              <div className="ct-top">
                <i data-lucide="message-circle" style={{ width: 22, height: 22 }} />
                <span className="ct-arrow"><i data-lucide="arrow-up-right" /></span>
              </div>
              <div>
                <div className="ct-title">Talk to Operations</div>
                <div className="ct-sub">Reach a real system on WhatsApp, replies in minutes.</div>
              </div>
            </a>

            <a className="hi-card secondary" href="Contact.html">
              <div className="ct-top">
                <i data-lucide="calendar-check" style={{ width: 22, height: 22, color: "var(--accent)" }} />
                <span className="ct-arrow"><i data-lucide="arrow-up-right" /></span>
              </div>
              <div>
                <div className="ct-title">Book a Systems Audit</div>
                <div className="ct-sub">A 30-min map of what we'd automate first.</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

window.HeroImmersive = HeroImmersive;
