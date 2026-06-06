import React from "react";
// FinalCTAOpt, replaces AuditCTAStrip on the home page.
// WhatsApp is the primary action. "Book a call" + "View Systems Built" are secondaries.

function FinalCTAOpt() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section className="final-talk" data-screen-label="Final CTA">
      <div className="final-talk-card">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot"/> Next Step</div>
          <h2>Talk to <span className="accent-word">Operations.</span></h2>
          <p>
            Send a WhatsApp. Tell me what's slow. I'll come back with a phased
            buildout, agents, automations, dashboards, and integrations, in the
            order that compounds fastest.
          </p>
        </div>
        <div className="final-talk-actions">
          <a className="btn-primary btn-wa" href="https://wa.me/966508183984" target="_blank" rel="noopener">
            <i data-lucide="message-circle"/> Talk to Operations
          </a>
          <a className="btn-secondary" href="Contact.html">Book a Systems Audit</a>
          <a className="btn-ghost" href="Systems Built.html">View Systems Built →</a>
          <div className="final-talk-meta">
            <span><i data-lucide="clock"/> Response within 24 hours</span>
            <span><i data-lucide="shield-check"/> NDA on request</span>
          </div>
        </div>
      </div>
    </section>
  );
}
window.FinalCTAOpt = FinalCTAOpt;
