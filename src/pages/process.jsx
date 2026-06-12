import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";

const ReactDOM = { createRoot };
const { SiteNav, SiteFooter, StickyAuditBar, Breadcrumb, AuditCTAStrip } = window;

function ProcessHero() {
  return (
    <section className="page-hero" data-screen-label="01 Process Hero">
      <div className="page-hero-inner">
        <div className="page-hero-left">
          <div className="eyebrow"><span className="eyebrow-dot"/> How I Work</div>
          <h1>Blueprint. Design. Build. Deploy.<br/><span className="accent-word">Improve.</span></h1>
          <p className="lede">
            It starts with a free 30-minute Systems Audit call. From there,
            every engagement follows the same five-step process, built around
            real operations, paced for the people who have to actually use the
            result. Each phase has a clear deliverable, a fixed timebox, and a
            gate before the next one starts. No big-bang launches. No scope drift.
          </p>
        </div>
        <div className="page-hero-meta">
          <div className="item"><div className="lbl">Total cycle</div><div className="val">6–10 weeks</div></div>
          <div className="item"><div className="lbl">First go-live</div><div className="val">4–6 weeks</div></div>
          <div className="item"><div className="lbl">Engagement model</div><div className="val">Phased · fixed-scope</div></div>
          <div className="item"><div className="lbl">Continuous</div><div className="val">Monthly improvement cycles</div></div>
        </div>
      </div>
    </section>
  );
}

function ProcessSteps() {
  const steps = [
    {
      num:"00",
      dur:"30 minutes · Free",
      ic:"phone-call",
      t:"Systems Audit call",
      p:"Where it all starts, and the only step that costs nothing. We walk your highest-friction workflow together, I tell you honestly whether AI fits, and you get a fixed-scope quote before any paid work begins.",
      d:["Your highest-friction workflow, mapped","Honest fit assessment","Fixed-scope quote for the Blueprint","No commitment beyond the call"]
    },
    {
      num:"01",
      dur:"Week 1–2",
      ic:"search",
      t:"Operations Blueprint",
      p:"I sit with operations leadership, walk every workflow that matters, and map where the bottlenecks are, measured in time, cost, and risk. Output is a prioritised systems map: the workflows to automate first, second, third, and the ones to leave alone.",
      d:["Stakeholder interviews (4–6)","Workflow mapping per function","Tool & ERP inventory","Prioritised systems map","Phased buildout proposal"]
    },
    {
      num:"02",
      dur:"Week 2–3",
      ic:"git-branch",
      t:"Design",
      p:"I design the first system in detail, every trigger, every branch, every approval gate, every escalation path. I spec the data model, the integrations, the language model prompts, and the human review points. You sign off on a runnable design before I write a line of production code.",
      d:["System architecture diagram","Workflow design doc","Integration spec","Prompt library","Approval gates + escalation rules"]
    },
    {
      num:"03",
      dur:"Week 3–5",
      ic:"boxes",
      t:"Build",
      p:"I build in a sandbox connected to a copy of your data, with the real ERP, real WhatsApp number, real edge cases. Daily progress notes. Weekly walkthroughs with the operations lead. No surprises at handover.",
      d:["Sandbox build with real data","Agent logic + integrations wired","WhatsApp / voice channels connected","Approval flows tested","Daily progress notes"]
    },
    {
      num:"04",
      dur:"Week 5–6",
      ic:"rocket",
      t:"Deploy",
      p:"I go live with a small slice first, one team, one branch, one supplier set, and watch closely. Issues are fixed within hours, not weeks. Once stable, I widen to the rest of the operation in controlled steps.",
      d:["Pilot deploy (single slice)","Live monitoring + on-call","Team training & WhatsApp shortcuts","Phased rollout to full operation","Production handover doc"]
    },
    {
      num:"05",
      dur:"Ongoing",
      ic:"trending-up",
      t:"Improve",
      p:"Operations change. Edge cases surface. Your team finds new things they want the system to handle. I run a monthly improvement cycle: review usage, fix friction, ship enhancements, and report what changed.",
      d:["Monthly usage review","Edge-case backlog grooming","Enhancement releases","SLA monitoring","Quarterly operations review"]
    },
  ];

  return (
    <section className="section" data-screen-label="02 Process Steps">
      <div className="process-rail">
        {steps.map(s => (
          <div className="process-step" key={s.num}>
            <div className="marker"><i data-lucide={s.ic}/></div>
            <div className="process-card">
              <div className="head">
                <span className="num">STEP {s.num}</span>
                <span className="dur">{s.dur}</span>
              </div>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
              <ul className="deliv">
                {s.d.map(x => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatWeNeed() {
  const cols = [
    {
      t:"From you",
      ic:"user-check",
      items:[
        "An operations lead empowered to make decisions",
        "Access to ERP/CRM/accounting (read-only fine to start)",
        "A business WhatsApp number (or willingness to set one up)",
        "30 minutes a day during build week",
        "Honest answers about what's actually broken"
      ]
    },
    {
      t:"From me",
      ic:"package-check",
      items:[
        "Me, the builder, hands-on for the whole engagement",
        "Daily build notes; weekly walkthroughs",
        "Sandbox environment isolated from production",
        "Production handover documentation",
        "On-call for the first 30 days post go-live"
      ]
    },
    {
      t:"What I won't do",
      ic:"shield-x",
      items:[
        "Rip-and-replace your ERP",
        "Ship without an approval gate where money or contracts are involved",
        "Train an LLM on your sensitive data",
        "Promise an ROI I can't measure",
        "Hand off a system without a runbook"
      ]
    },
  ];
  return (
    <section className="section section--elev" data-screen-label="03 What We Need">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> Engagement Contract</div>
        <h2>What I expect.<br/>What you can expect.</h2>
        <p className="lede">A two-sided contract before I start. So no one is guessing about what success looks like.</p>
      </div>
      <div className="principles-grid">
        {cols.map(c => (
          <div className="principle" key={c.t} style={{gap:14}}>
            <div style={{width:48, height:48, borderRadius:12, background:"rgba(26,117,222,.12)", border:"1px solid rgba(26,117,222,.3)", color:"var(--accent)", display:"grid", placeItems:"center", marginBottom:4}}>
              <i data-lucide={c.ic} style={{width:22, height:22}}/>
            </div>
            <h4 style={{fontSize:20}}>{c.t}</h4>
            <ul style={{listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10}}>
              {c.items.map(it => (
                <li key={it} style={{display:"grid", gridTemplateColumns:"16px 1fr", gap:10, alignItems:"start", fontSize:13.5, color:"var(--fg-2)", lineHeight:1.55}}>
                  <i data-lucide={c.t === "What I won't do" ? "x" : "check"} style={{width:14, height:14, color: c.t === "What I won't do" ? "#d76060" : "var(--accent)", marginTop:3}}/>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faqs() {
  const faqs = [
    {q:"How fast can a first system be live?",
     a:"For most engagements, 4–6 weeks from kick-off to the first system handling production traffic. The Operations Blueprint takes two weeks, design takes one, build takes two to three, and we go live on a controlled slice in week 5 or 6."},
    {q:"Do you replace our ERP?",
     a:"No. I connect to your existing ERP, Odoo, SAP B1, Oracle, Zoho, in-house, anything with an API or even a database connection. The ERP stays. The friction around it goes."},
    {q:"What does it cost?",
     a:"Engagements are scoped per phase. A typical first phase, Blueprint + one system live, sits between SAR 40k–120k depending on complexity. The free audit call comes first; you get a fixed-scope quote before any paid work starts."},
    {q:"Who owns the system after handover?",
     a:"You do. I hand over source code, runbooks, prompt libraries, and credentials. You can keep me on a monthly improvement retainer, hire your own team to maintain it, or both."},
    {q:"Is our data safe?",
     a:"I never train models on your data. All processing is logged and audit-ready. ZATCA Phase-2 compliant. On-request, I run the full stack inside your own cloud tenancy."},
    {q:"What if it doesn't work?",
     a:"I pilot every system on a single slice before widening. If after pilot the system isn't delivering, I either fix it or close the phase, no widening, no further invoice."},
  ];
  return (
    <section className="section" data-screen-label="04 FAQs">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> Engagement FAQs</div>
        <h2>Honest answers to<br/>the questions that come up.</h2>
      </div>
      <div className="faq-grid">
        {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} open={i===0}/>)}
      </div>
    </section>
  );
}

function FaqItem({q, a, open}) {
  const [isOpen, setOpen] = React.useState(!!open);
  return (
    <div className={"faq-item" + (isOpen ? " open" : "")} onClick={() => setOpen(o => !o)}>
      <div className="faq-q">
        <span>{q}</span>
        <span className="plus">+</span>
      </div>
      <div className="faq-a">{a}</div>
    </div>
  );
}

function Site() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="adyan-site" data-screen-label="ADYAN · Process">
      <SiteNav current="process"/>
      <Breadcrumb trail={[{label:"Process"}]}/>
      <main id="main">
      <ProcessHero/>
      <ProcessSteps/>
      <WhatWeNeed/>
      <Faqs/>
      <AuditCTAStrip/>
      </main>
      <SiteFooter/>
      <StickyAuditBar/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
