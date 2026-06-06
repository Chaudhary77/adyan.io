import React from "react";
// HeroZeroG, "Zero-Gravity" immersive hero for ADYAN.
//   • Programmatic orb / dust field on <canvas>: layered depth parallax to
//     the cursor + drag-impulse physics (grab and fling the field).
//   • Big centered headline whose letters lift, spread their tracking and
//     gently fracture in response to pointer proximity, drag and idle bob 
//     hand-rolled spring physics for a fluid, weightless, motion feel.
//   • Scroll-driven exit (CSS) lifts + fades the stage as the hero leaves.
//   • Resting state is fully visible; the entrance fade only runs when the
//     document is visible, so print / static / hidden-tab never blank out.

// ---- soft glowing orb sprite (pre-rendered once, drawn many times) ----
function makeOrbSprite(rgb) {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, `rgba(${rgb},0.95)`);
  grd.addColorStop(0.35, `rgba(${rgb},0.45)`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, s, s);
  return c;
}

function ZeroGField() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spriteBlue = makeOrbSprite("96,164,255");
    const spriteWhite = makeOrbSprite("210,228,255");

    let W = 0, H = 0, raf = 0, t = 0;
    const ptr = { x: 0.5, y: 0.5, px: 0.5, py: 0.5, down: false, vx: 0, vy: 0 };
    let orbs = [];

    function build() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(46, (W * H) / 22000)));
      orbs = Array.from({ length: count }, () => {
        const depth = Math.random();            // 0 far … 1 near
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          depth,
          r: 2 + depth * depth * 26,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          ph: Math.random() * Math.PI * 2,
          bob: 0.3 + Math.random() * 0.7,
          white: Math.random() < 0.22,
          a: 0.25 + depth * 0.55,
        };
      });
    }

    function frame() {
      t += 0.006;
      // ease the parallax pointer
      ptr.px += (ptr.x - ptr.px) * 0.06;
      ptr.py += (ptr.y - ptr.py) * 0.06;
      ptr.vx *= 0.9; ptr.vy *= 0.9;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      const offX = (ptr.px - 0.5);
      const offY = (ptr.py - 0.5);

      for (const o of orbs) {
        if (!reduce) {
          // weightless drift + bob
          o.x += o.vx;
          o.y += o.vy + Math.sin(t * o.bob + o.ph) * 0.06;
          // damp toward calm drift
          o.vx *= 0.992; o.vy *= 0.992;
          o.vx += (Math.random() - 0.5) * 0.004;
          o.vy += (Math.random() - 0.5) * 0.004;
        }
        // wrap
        const m = o.r + 40;
        if (o.x < -m) o.x = W + m; else if (o.x > W + m) o.x = -m;
        if (o.y < -m) o.y = H + m; else if (o.y > H + m) o.y = -m;

        // parallax: nearer orbs move more with the cursor
        const par = 60 * o.depth;
        const dx = o.x - offX * par;
        const dy = o.y - offY * par;

        const sprite = o.white ? spriteWhite : spriteBlue;
        const size = o.r * 2.4;
        ctx.globalAlpha = o.a;
        ctx.drawImage(sprite, dx - size / 2, dy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    function rel(e) {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, rx: e.clientX - r.left, ry: e.clientY - r.top };
    }
    function onMove(e) {
      const p = rel(e);
      ptr.vx = p.x - ptr.x; ptr.vy = p.y - ptr.y;
      ptr.x = p.x; ptr.y = p.y;
      if (ptr.down) {
        // drag impulse: fling orbs near the cursor
        for (const o of orbs) {
          const ddx = o.x - p.rx, ddy = o.y - p.ry;
          const dist = Math.hypot(ddx, ddy);
          const reach = 220;
          if (dist < reach) {
            const f = (1 - dist / reach) * (0.4 + o.depth);
            o.vx += ptr.vx * 60 * f;
            o.vy += ptr.vy * 60 * f;
          }
        }
      }
    }
    function onDown(e) { ptr.down = true; const p = rel(e); ptr.x = p.x; ptr.y = p.y; }
    function onUp() { ptr.down = false; }

    build();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    raf = requestAnimationFrame(frame);

    // expose pointer to the headline springs
    canvas.__zgPtr = ptr;
    canvas.__zgRel = () => ({ w: W, h: H });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);
  return <canvas ref={ref} className="zg-canvas" aria-hidden="true" />;
}

window.makeOrbSprite = makeOrbSprite;
window.ZeroGField = ZeroGField;
