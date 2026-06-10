import React from "react";
// Shared homepage sections, used by the EN and AR landing pages.
// Exposes: ProofTeaser, FounderStrip, ExploreMore

// Two production agents, lifted from the Systems Built page, shown as
// outcome-first teasers so the homepage carries proof, not just promises.
function ProofTeaser() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const cards = [
    {
      icon: "file-text", role: "Sales operations · Manufacturing",
      t: "Quoting Agent",
      s: "RFQs arrive on WhatsApp, get priced from live ERP stock, and go out after a one-tap human approval.",
      outcome: "Quotes out in minutes, not hours",
    },
    {
      icon: "mic", role: "Multi-branch operations · F&B",
      t: "Daily Brief Agent",
      s: "One morning voice note per branch, transcribed, structured, inventory logged, issues routed to the right team.",
      outcome: "No more morning phone calls",
    },
  ];
  return (
    <section className="proof rv" data-screen-label="Proof">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot" /> Proof</div>
        <h2>Systems already running. <span className="accent-word">See them work.</span></h2>
        <div className="connector" />
      </div>
      <div className="proof-grid">
        {cards.map((c, i) => (
          <a className="proof-card" href="/systems-built" key={i}>
            <div className="proof-top">
              <span className="proof-ic"><i data-lucide={c.icon} /></span>
              <span className="proof-role">{c.role}</span>
              <span className="proof-live"><span className="live-dot" />Live in production</span>
            </div>
            <h3>{c.t}</h3>
            <p>{c.s}</p>
            <div className="proof-outcome"><i data-lucide="check" /> {c.outcome}</div>
            <span className="proof-cta">See the full system <span className="arr" /></span>
          </a>
        ))}
      </div>
      <p className="proof-note">
        Five agents documented in depth, with triggers, approval gates, and outcomes.{" "}
        <a href="/systems-built">View all systems built</a> · detailed walkthroughs under NDA.
      </p>
    </section>
  );
}

// Founder-led is the positioning, so the founder is on the page: name,
// face, and a direct line. Photo ships separately at ds/assets/founder.jpg;
// until it exists the monogram logo stands in via onError.
function FounderStrip() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section className="founder rv" data-screen-label="Founder">
      <div className="founder-card">
        <img
          className="founder-photo"
          src="ds/assets/founder.jpg"
          alt="Adyan, founder of ADYAN"
          width="96" height="96"
          onError={(e) => {
            e.currentTarget.src = "ds/assets/logo-monogram.png";
            e.currentTarget.classList.add("is-fallback");
          }}
        />
        <div className="founder-copy">
          <div className="founder-name" data-no-i18n>Adyan <span className="founder-role">· Founder, ADYAN</span></div>
          <p>
            ADYAN is founder-led — you work directly with me, from audit to
            production. No handoffs, no account managers. I design the system,
            build it, and stay on it after launch.
          </p>
        </div>
        <div className="founder-links">
          <a className="btn-secondary" href="https://www.linkedin.com/in/adyan5" target="_blank" rel="noopener">LinkedIn</a>
          <a className="btn-secondary" href="/about">About the studio</a>
        </div>
      </div>
    </section>
  );
}

// Compact "go deeper" band, teasers that link to the full Security and
// Process pages, keeping the home page lean. (Proof has its own section.)
function ExploreMore() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const cards = [
    { icon: "shield-check", k: "Trust", t: "Security & compliance",
      s: "In-Kingdom, on-prem or your own cloud. PDPL and NCA-aligned, with a full audit trail on every action.",
      cta: "How I keep data safe", href: "/security" },
    { icon: "route", k: "Method", t: "How I work",
      s: "From a two-week Systems Audit to a phased buildout, working software early and often.",
      cta: "See the process", href: "/process" },
    { icon: "handshake", k: "Partners", t: "For IT & ERP firms",
      s: "Add AI automation delivery to your client offering, scoped, built, and supported behind your brand.",
      cta: "Partner with me", href: "/partnerships" },
  ];
  return (
    <section className="explore rv" data-screen-label="Go Deeper">
      <div className="explore-head">
        <div className="eyebrow"><span className="eyebrow-dot" /> Go deeper</div>
        <h2>The full picture, <span className="accent-word">one click away.</span></h2>
      </div>
      <div className="explore-grid">
        {cards.map((c, i) => (
          <a className="explore-card" href={c.href} key={i}>
            <span className="explore-ic"><i data-lucide={c.icon} /></span>
            <span className="explore-k">{c.k}</span>
            <h3>{c.t}</h3>
            <p>{c.s}</p>
            <span className="explore-cta">{c.cta} <span className="arr" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

window.ProofTeaser = ProofTeaser;
window.FounderStrip = FounderStrip;
window.ExploreMore = ExploreMore;
