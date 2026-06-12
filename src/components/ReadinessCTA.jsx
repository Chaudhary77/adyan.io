import React from "react";
// Free Systems Audit, relationship-first primary CTA for the home page.
// Replaces FinalCTAOpt. Primary action = the free 30-minute audit call;
// WhatsApp is secondary. Naming is canonical site-wide: the free 30-minute
// call IS the "Systems Audit"; the paid two-week phase is the
// "Operations Blueprint" (see process page).
function ReadinessCTA() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});

  const items = [
  { icon: "search", t: "Operations map", s: "Where your time and money actually leak, follow-ups, approvals, reporting." },
  { icon: "target", t: "Highest-leverage workflow", s: "The one system that pays for itself fastest, picked for your business." },
  { icon: "route", t: "Phased buildout plan", s: "What I'd ship first, in 4–6 weeks, and what compounds after it." },
  { icon: "calculator", t: "Real ROI numbers", s: "Estimated savings for your operation, not the slider, your actual figures." }];


  return (
    <section className="ready" data-screen-label="Systems Audit CTA">
      <div className="ready-card" data-comment-anchor="264f338d4e-div-15-7">
        <div className="ready-grid-bg" />

        <div className="ready-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> Free 30-Minute Systems Audit</div>
          <h2>Find out where AI pays off <span className="accent-word">in your operation.</span></h2>
          <p>
            A focused 30-minute audit call. I map your highest-friction workflows,
            tell you honestly where AI fits, and where it doesn't, and leave you
            with a phased plan. No pitch deck, no commitment beyond the call.
          </p>
          <div className="ready-actions">
            <a className="btn-primary" href="/contact">
              Book your free Systems Audit <span className="arr" />
            </a>
            <a className="btn-secondary btn-wa" href="https://wa.me/966508183984" target="_blank" rel="noopener">
              <i data-lucide="message-circle" /> Or message me on WhatsApp
            </a>
          </div>
          <div className="ready-meta">
            <div className="item">
              <div className="lbl">Duration</div>
              <div className="val">30 minutes</div>
            </div>
            <div className="item">
              <div className="lbl">Cost</div>
              <div className="val">Free · no commitment</div>
            </div>
            <div className="item">
              <div className="lbl">Response</div>
              <div className="val">Within 24 hours</div>
            </div>
          </div>
        </div>

        <div className="ready-panel">
          <div className="ready-panel-h">What you walk away with</div>
          <ul className="ready-list">
            {items.map((it, i) =>
            <li key={i}>
                <span className="ck"><i data-lucide={it.icon} /></span>
                <div>
                  <div className="rl-t">{it.t}</div>
                  <div className="rl-s">{it.s}</div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}
window.ReadinessCTA = ReadinessCTA;