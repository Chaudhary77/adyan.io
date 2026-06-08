import React from "react";
// PartnerBand, home-page CTA band aimed at IT / ERP / consulting / agency firms.
// Surfaces the Partnerships track (otherwise only reachable from the nav).
// Reuses the .audit-strip shell so it sits naturally in the home flow.
function PartnerBand() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  return (
    <section className="audit-strip" data-screen-label="Partner Band">
      <div className="audit-strip-inner">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> For IT · ERP · Consulting · Agencies</div>
          <h2>Your clients keep asking about AI. <span className="accent-word">Now you have a builder.</span></h2>
          <p>
            I partner with IT, ERP, and consulting firms to deliver AI agents,
            automations, and ERP-connected systems for their clients, as a
            referral, fully white-labelled under your brand, or as a joint build.
            You keep the relationship. I bring the build.
          </p>
        </div>
        <div className="audit-strip-cta" data-comment-anchor="ca52c7983a-div-19-9">
          <a className="btn-primary" href="/partnerships">Explore partnerships <span className="arr" /></a>
          <a className="btn-secondary" href="/contact">Book a partner call</a>
          <div className="audit-strip-meta">
            <span><i data-lucide="layers"></i> Referral · White-label · Joint</span>
            <span><i data-lucide="shield-check"></i> NDA on request</span>
          </div>
        </div>
      </div>
    </section>);

}
window.PartnerBand = PartnerBand;