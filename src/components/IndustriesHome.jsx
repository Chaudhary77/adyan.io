import React from "react";
// IndustriesHome, the sectors ADYAN builds for, on the landing page.
// Reuses the established .industries-grid / .industry-tile pattern from the
// About page so it reads as native. Adds E-commerce & Retail and Service
// Businesses to broaden beyond the original industrial/contracting framing,
// and keeps KSA as home base while signalling a global reach.
function IndustriesHome() {
  const inds = [
  { ic: "factory", n: "Industrial & Manufacturing", ex: "Production status, machine reports, QC routing." },
  { ic: "hard-hat", n: "Contracting & Construction", ex: "Submittals, approvals, daily site briefings." },
  { ic: "truck", n: "Logistics & Transport", ex: "Dispatch follow-ups, POD chasing, delivery alerts." },
  { ic: "package", n: "Trading & Distribution", ex: "Quote engines, stock lookup, ERP-linked offers." },
  { ic: "shopping-cart", n: "E-commerce & Retail", ex: "Order tracking, support replies, returns handling." },
  { ic: "briefcase", n: "Service Businesses", ex: "Bookings, reminders, client follow-ups, reviews." }];

  return (
    <section className="inds" id="industries-served" data-screen-label="Industries" data-comment-anchor="78e11fd7fb-section-16-5">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot" /> Industries We Serve</div>
        <h2>Built for operations-heavy businesses. <span className="accent-word">In the Kingdom and beyond.</span></h2>
        <p className="section-sub">
          From Saudi Arabia's industrial floor to e-commerce and service teams
          worldwide, every ADYAN system adapts to how each industry actually runs.
        </p>
        <div className="connector" />
      </div>
      <div className="industries-grid" data-rv-stagger>
        {inds.map((i, idx) =>
        <div className="industry-tile" key={i.n} style={{ "--rv-i": idx }}>
            <div className="ic"><i data-lucide={i.ic} /></div>
            <div className="name">{i.n}</div>
            <div className="ex">{i.ex}</div>
          </div>
        )}
      </div>
    </section>);

}
window.IndustriesHome = IndustriesHome;