import React from "react";
// Global Compliance, the international-standards counterpart to the KSA
// Data Sovereignty section. Reuses the .sov styling so the two read as a pair:
// "in-Kingdom by default, and aligned to the standards global buyers expect."
// HONESTY: claims alignment / design practice and control-family mapping only,
// never held certifications. The closing note makes that explicit.
function GlobalCompliance() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});

  const standards = [
  {
    icon: "globe-lock", title: "GDPR-aligned",
    body: "For clients outside the Kingdom, data-subject rights and processing principles are honoured, access, correction, deletion, and consent withdrawal, handled within 30 days.",
    tag: "EU / international clients"
  },
  {
    icon: "clipboard-check", title: "SOC 2 control families",
    body: "Builds map to the SOC 2 trust-services criteria, security, availability, and confidentiality, so they hold up to a buyer's vendor-security review.",
    tag: "Access · monitoring · change control"
  },
  {
    icon: "badge-check", title: "ISO 27001 controls",
    body: "Information-security management follows ISO 27001 control areas: risk treatment, asset control, access management, and incident response.",
    tag: "Mapped · certification on roadmap"
  }];


  const chips = [
  "Encryption in transit and at rest",
  "Role-based, least-privilege access",
  "Complete audit trail on every action",
  "Breach notification within statutory timelines",
  "Short, disclosed sub-processor list",
  "Security questionnaire completed on request"];


  return (
    <section className="sov" id="global-compliance" data-screen-label="Global Compliance">
      <div className="section-head" data-comment-anchor="3c5b3b9068-div-38-7">
        <div className="eyebrow"><span className="eyebrow-dot" /> Global Standards</div>
        <h2>In-Kingdom by default, and <span className="accent-word">ready for global review.</span></h2>
        <p className="section-sub section-sub-narrow">
          Saudi clients get in-Kingdom residency and PDPL/NCA alignment. International
          clients and group HQs get the frameworks their procurement teams ask for 
          GDPR, SOC 2, and ISO 27001, engineered into every build.
        </p>
        <div className="connector" />
      </div>

      <div className="sov-grid">
        {standards.map((d, i) =>
        <div className="sov-card" key={i}>
            <div className="sov-ic"><i data-lucide={d.icon} /></div>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
            <div className="sov-tag">{d.tag}</div>
          </div>
        )}
      </div>

      <div className="sov-chips">
        {chips.map((c, i) =>
        <div className="sov-chip" key={i}>
            <span className="ck"><i data-lucide="check" /></span>
            <span className="ctext">{c}</span>
          </div>
        )}
      </div>

      <div className="sov-note">
        <i data-lucide="info" />
        <span>
          ADYAN designs and operates to these frameworks and control families.
          Formal third-party certifications (SOC 2 Type II, ISO 27001) are on the
          roadmap rather than held today, current status is shared in writing on
          request. See the <a href="Security.html" style={{ color: "var(--accent)" }}>Security overview</a> for detail.
        </span>
      </div>
    </section>);

}
window.GlobalCompliance = GlobalCompliance;