import React from "react";
// Data Sovereignty & Security, built around KSA data-protection principles.
// IMPORTANT (honesty): ADYAN is not certified yet. This section claims
// deployment CAPABILITY and DESIGN PRACTICE only, never certification.
// The closing note makes that explicit.
function Compliance() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const deploy = [
    {
      icon: "server", title: "Saudi-region cloud",
      body: "Agents and data run on cloud regions inside the Kingdom, so your operational data stays where your business does.",
      tag: "Hosted · in-Kingdom region",
    },
    {
      icon: "hard-drive", title: "On-premise",
      body: "For regulated workloads, the full system can run on your own servers, nothing leaves your network perimeter.",
      tag: "Self-hosted · your hardware",
    },
    {
      icon: "cloud", title: "Your own cloud account",
      body: "Prefer your existing tenancy? I deploy into your cloud account, under your billing, your access controls, your audit.",
      tag: "Your tenancy · your keys",
    },
  ];

  const chips = [
    "Designed around PDPL principles",
    "Full audit trail on every action",
    "Human approval gates for spend & contracts",
    "Encryption in transit and at rest",
    "Your data, your tenancy, never resold",
    "NDA on request, before any access",
  ];

  return (
    <section className="sov" id="security" data-screen-label="Data Sovereignty">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot"/> Data Sovereignty &amp; Security</div>
        <h2>Your data stays <span className="accent-word">in the Kingdom.</span></h2>
        <p className="section-sub section-sub-narrow">
          You choose where ADYAN runs, in-Kingdom cloud, fully on-premise, or
          inside your own cloud account. Every system is built around Saudi
          data-protection principles, with a complete audit trail by default.
        </p>
        <div className="connector"/>
      </div>

      <div className="sov-grid">
        {deploy.map((d, i) => (
          <div className="sov-card" key={i}>
            <div className="sov-ic"><i data-lucide={d.icon}/></div>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
            <div className="sov-tag">{d.tag}</div>
          </div>
        ))}
      </div>

      <div className="sov-chips">
        {chips.map((c, i) => (
          <div className="sov-chip" key={i}>
            <span className="ck"><i data-lucide="check"/></span>
            <span className="ctext">{c}</span>
          </div>
        ))}
      </div>

      <div className="sov-note">
        <i data-lucide="info"/>
        <span>
          ADYAN engineers to Saudi data-protection (PDPL) and NCA cybersecurity
          principles. These describe how I build and deploy, formal third-party
          certifications are on my roadmap and current status is shared on request.
        </span>
      </div>
    </section>
  );
}
window.Compliance = Compliance;
