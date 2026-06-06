import React from "react";
// Trust strip, anonymized client tag line
function Trust() {
  const tags = [
  { name: "INDUSTRIAL GROUP", icon: "factory" },
  { name: "CONTRACTING CO.", icon: "hard-hat" },
  { name: "LOGISTICS NETWORK", icon: "truck" },
  { name: "TRADING HOUSE", icon: "warehouse" },
  { name: "SERVICES GROUP", icon: "briefcase-business" }];

  return (
    <section className="trust">
      <div className="trust-inner">
        <div className="trust-label">Operating across</div>
        <div className="trust-logos" data-comment-anchor="e0acf6784f-div-14-9">
          {tags.map((t, i) =>
          <span className="logo" key={i}><i data-lucide={t.icon} />{t.name}</span>
          )}
        </div>
      </div>
    </section>);

}

// Stats strip
function Stats() {
  const items = [
  { num: "12", unit: "+", lbl: "Operations Systems Live", desc: "Built across industrial, contracting, logistics, and services." },
  { num: "40", unit: "%", lbl: "Avg. Cycle Time Reduction", desc: "Across approval, follow-up, and reporting workflows." },
  { num: "24", unit: "/7", lbl: "Always-On Monitoring", desc: "Mission Control keeps eyes on operations around the clock." },
  { num: "6", unit: "wks", lbl: "From Audit to First Win", desc: "First production system, deployed and used by real teams." }];

  return (
    <section className="stats">
      <div className="stats-grid">
        {items.map((s, i) =>
        <div className="stat" key={i}>
            <div className="num">{s.num}<span className="unit">{s.unit}</span></div>
            <div className="lbl">{s.lbl}</div>
            <div className="desc">{s.desc}</div>
          </div>
        )}
      </div>
    </section>);

}

window.Trust = Trust;
window.Stats = Stats;