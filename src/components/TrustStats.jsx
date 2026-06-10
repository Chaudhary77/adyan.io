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
  { num: "12", unit: "+", lbl: "Systems in Production", desc: "Agents and automations running inside real businesses." },
  { num: "6", unit: "", lbl: "Industries Served", desc: "Manufacturing, contracting, logistics, F&B, real estate, suppliers." },
  { num: "4–6", unit: "wks", lbl: "To First System Live", desc: "From audit to a workflow running in production." },
  { num: "24", unit: "h", lbl: "Response Time", desc: "Every inquiry answered within one business day." }];

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