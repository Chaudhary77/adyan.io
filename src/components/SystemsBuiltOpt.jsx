import React from "react";
// SystemsBuiltOpt, trimmed from 9 to 6 strongest systems for the home page.
// Each card now carries a one-line outcome line under the description, which
// gives the section convincing weight without padding more cards.

function SystemsBuiltOpt() {
  const systems = [
    { tag: "PROCUREMENT", title: "Purchase Approval System",
      lede: "For businesses where buying materials takes too long.",
      body: "It collects purchase requests, compares supplier prices, sends approval reminders, and keeps every decision recorded.",
      outcome: "Faster buying decisions" },
    { tag: "FIELD OPS",   title: "Daily Site Report System",
      lede: "For contractors and field teams who forget to send updates.",
      body: "It asks teams for daily progress, photos, delays, manpower updates, and prepares a clear report for managers.",
      outcome: "Reports without chasing" },
    { tag: "SALES",       title: "Quotation Follow-up System",
      lede: "For businesses losing sales because quotes are forgotten.",
      body: "It tracks every quotation, reminds the sales team, follows up with customers, and shows which deals need attention.",
      outcome: "No quote forgotten" },
    { tag: "INVENTORY",   title: "Stock Alert System",
      lede: "For businesses that cannot afford material shortages.",
      body: "It watches stock levels, checks when items are getting low, and alerts the team before work gets delayed.",
      outcome: "Know before stock runs out" },
    { tag: "LOGISTICS",   title: "Delivery & Vehicle Tracking System",
      lede: "For businesses managing drivers, deliveries, or company vehicles.",
      body: "It tracks delivery updates, driver messages, vehicle documents, service dates, and delays in one place.",
      outcome: "Clear delivery updates" },
    { tag: "EXECUTIVE",   title: "Owner's Morning Report",
      lede: "For owners who want control without asking everyone.",
      body: "It sends a daily summary of pending approvals, delayed work, unpaid amounts, urgent issues, and decisions needed.",
      outcome: "Start the day informed" },
  ];
  return (
    <section className="sys" id="systems" data-screen-label="Systems Built">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot"/> Systems Built</div>
        <h2>Real systems for <span className="accent-word">real operations.</span></h2>
        <p className="section-sub">
          A selection of systems I've built for operations-heavy businesses 
          industrial, contracting, logistics, trading and services.
        </p>
        <div className="connector"/>
      </div>
      <div className="sys-grid">
        {systems.map((s, i) => (
          <a className="sys-card" key={i} href="/systems-built">
            <div className="sys-tag">{s.tag}</div>
            <h3>{s.title}</h3>
            <p className="sys-lede">{s.lede}</p>
            <p>{s.body}</p>
            <div className="sys-outcome">
              <i data-lucide="trending-up"/>
              <span>{s.outcome}</span>
            </div>
            <div className="sys-foot">
              <span>Read system note</span>
              <i data-lucide="arrow-up-right"/>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
window.SystemsBuiltOpt = SystemsBuiltOpt;
