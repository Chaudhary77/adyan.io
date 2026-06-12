import React from "react";
// What We Build, four cards
function WhatWeBuild() {
  const items = [
    {
      icon: "bot", title: "AI Agents",
      body: "Department-level agents for owners, sales, procurement, accounts, support, and operations.",
      features: ["Daily executive briefings", "Role-aware decision support", "Audit-ready memory"]
    },
    {
      icon: "workflow", title: "Workflow Automation",
      body: "Follow-ups, approvals, reminders, reporting, and repetitive workflow execution across tools.",
      features: ["Approval routing", "Cross-channel follow-ups", "Exception alerts"]
    },
    {
      icon: "layout-dashboard", title: "Apps & Dashboards",
      body: "Internal tools, portals, websites, and mission-control dashboards built for daily use.",
      features: ["Mission Control board", "Department workspaces", "Mobile-ready ops apps"]
    },
    {
      icon: "database", title: "ERP & Data Intelligence",
      body: "AI summaries, alerts, reporting, and decision support connected directly to business data.",
      features: ["ERP signal layer", "Anomaly detection", "Live KPI rollups"]
    },
  ];

  // Cards rise in with a stagger the first time the grid scrolls into view.
  const gridRef = React.useRef(null);
  const [revealed, setRevealed] = React.useState(false);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setRevealed(true); return; }
    const node = gridRef.current;
    if (!node) { setRevealed(true); return; }

    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) && r.bottom > 0;
    };
    // Already on screen at mount → reveal right away.
    if (inView()) { setRevealed(true); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setRevealed(true); io.disconnect(); } });
    }, { threshold: 0.2 });
    io.observe(node);
    const onScroll = () => { if (inView()) { setRevealed(true); cleanup(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Safety net: never leave the cards stuck invisible if IO never fires.
    const safety = setTimeout(() => setRevealed(true), 1500);
    const cleanup = () => { io.disconnect(); window.removeEventListener("scroll", onScroll); clearTimeout(safety); };
    return cleanup;
  }, []);

  return (
    <section className="wwb" id="what" data-screen-label="04 What We Build">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot"/> What We Build</div>
        <h2>Four building blocks. <span className="accent-word">One operating system.</span></h2>
        <div className="connector"/>
      </div>
      <div className={"wwb-grid" + (revealed ? " is-in" : "")} ref={gridRef}>
        {items.map((it, i) => (
          <div className="wwb-card wwb-reveal" key={i} style={{ "--rd": (i * 110) + "ms" }}>
            <div className="wwb-num">0{i+1}</div>
            <div className="wwb-icon"><i data-lucide={it.icon}/></div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
            <ul className="wwb-features">
              {it.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
window.WhatWeBuild = WhatWeBuild;
