import React from "react";
import "./HeroZeroGField.jsx";
const { ZeroGField } = window;
// HeroZeroG, the production hero: orb field background + a plain, readable
// headline that says what ADYAN does, staged in with the zg-reveal fades.

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
          AI operations studio · Khobar
        </span>

        <h1 className="zg-headline zg-headline--copy zg-reveal" style={{ "--d": "120ms" }}>
          AI agents that run your operations.
          <br />
          <span className="grad">Live in 4–6 weeks.</span>
        </h1>

        <p className="zg-sub zg-reveal" style={{ "--d": "240ms" }}>
          ADYAN builds production AI systems for operations-heavy businesses —
          quoting, follow-ups, site reports, tender watch — WhatsApp-native,
          Arabic + English, wired into your ERP, with human approval on every
          action that matters.
        </p>

        <div className="zg-cta zg-reveal" style={{ "--d": "340ms" }}>
          <a className="btn-primary" href="/contact">
            Book a free Systems Audit <span className="arr" />
          </a>
          <a className="btn-secondary" href="/systems-built">See systems in production</a>
        </div>

        <div className="zg-meta zg-reveal" style={{ "--d": "420ms" }}>
          <span><i data-lucide="message-circle" /> WhatsApp-native</span>
          <span><i data-lucide="mic" /> Voice-ready</span>
          <span><i data-lucide="database" /> ERP-connected</span>
          <span><i data-lucide="shield-check" /> Audit-ready</span>
        </div>
      </div>
    </section>
  );
}

window.HeroZeroG = HeroZeroG;
