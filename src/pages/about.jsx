import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";

const ReactDOM = { createRoot };
const { Compliance, SiteNav, SiteFooter, StickyAuditBar, Breadcrumb, AuditCTAStrip } = window;

function AboutHero() {
  return (
    <section className="page-hero" data-screen-label="01 About Hero">
      <div className="page-hero-inner">
        <div className="page-hero-left">
          <div className="eyebrow"><span className="eyebrow-dot"/> About ADYAN</div>
          <h1>A founder-led AI studio<br/>built for <span className="accent-word">real businesses.</span></h1>
          <p className="lede">
            ADYAN is my studio. I'm an AI systems builder based in Khobar,
            working with the kind of businesses spreadsheets and dashboards were
            never enough for, manufacturers, contractors, traders, logistics
            operators, real estate firms. I sit between strategy and engineering:
            I model how your operations actually run, then build the agents,
            automations, and dashboards that make the work move.
          </p>
        </div>
        <div className="page-hero-meta">
          <div className="item"><div className="lbl">Founded</div><div className="val">2024 · Khobar</div></div>
          <div className="item"><div className="lbl">Focus</div><div className="val">AI Operations Systems</div></div>
          <div className="item"><div className="lbl">Markets</div><div className="val">Saudi Arabia · Global</div></div>
          <div className="item"><div className="lbl">Languages</div><div className="val">Arabic · English</div></div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="section" data-screen-label="02 Mission">
      <div className="about-mission">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot"/> Our Mission</div>
          <h2 style={{fontFamily:"var(--font-display)", fontSize:"clamp(34px,3.8vw,48px)", fontWeight:600, letterSpacing:"-0.018em", lineHeight:1.08, margin:"14px 0 22px"}}>
            Make AI operate like<br/>a <span className="accent-word">real part of the business.</span>
          </h2>
          <p style={{fontSize:17, lineHeight:1.7, color:"var(--fg-2)", maxWidth:"58ch"}}>
            Most AI work today gets stuck at the demo. A flashy chatbot, a clever
            prompt, a one-off automation. Real businesses don't need demos, they
            need systems that survive Monday morning, integrate with the ERP,
            handle exceptions, and produce an audit trail.
          </p>
          <p style={{fontSize:17, lineHeight:1.7, color:"var(--fg-2)", maxWidth:"58ch", marginTop:18}}>
            I build for the operations layer: where the work actually happens.
            Quotes that need approving, deliveries that need tracking, collections
            that need following up, decisions that need data. My promise is
            simple, AI that runs operations, not AI that talks about them.
          </p>
          <p style={{fontSize:17, lineHeight:1.7, color:"var(--fg-2)", maxWidth:"58ch", marginTop:18}}>
            Most of my clients live on WhatsApp. So I built my systems for that
            reality: send a message, leave a voice note, get the work done 
            without ever opening a dashboard.
          </p>
        </div>
        <div className="right">
          <div className="pillar">
            <div className="ic"><i data-lucide="briefcase"/></div>
            <div>
              <h4>Business-first, not tool-first</h4>
              <p>I start with the operation I'm improving, the bottleneck, the cost, the missed follow-up. The technology stack is whatever serves it best.</p>
            </div>
          </div>
          <div className="pillar">
            <div className="ic"><i data-lucide="database"/></div>
            <div>
              <h4>ERP-connected, not isolated</h4>
              <p>Every system I build connects to the tools your team already uses, ERP, CRM, accounting, WhatsApp. No new platforms to learn, no rip-and-replace.</p>
            </div>
          </div>
          <div className="pillar">
            <div className="ic"><i data-lucide="shield-check"/></div>
            <div>
              <h4>Human approval where it matters</h4>
              <p>Agents propose, humans approve. Spend, contracts, escalations, I wire the approval gates so the system is fast without being reckless.</p>
            </div>
          </div>
          <div className="pillar">
            <div className="ic"><i data-lucide="message-circle"/></div>
            <div>
              <h4>WhatsApp-native, voice-ready</h4>
              <p>In Saudi Arabia, WhatsApp is the operating system of business. Every agent we build can be reached from a chat or a voice note, no app to install.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const items = [
    { num: "01", t: "Systems over scripts",        d: "A prompt is a toy. A system is a workflow that knows its own state, retries, escalates, and reports back." },
    { num: "02", t: "Operations over magic",       d: "I don't sell AI. I sell faster collections, fewer missed follow-ups, cleaner reporting, calmer Mondays." },
    { num: "03", t: "Audit-ready by default",      d: "Every action an agent takes is logged, attributed, and reviewable. Compliance is not a feature we add later." },
    { num: "04", t: "Built around the WhatsApp",   d: "The team will not open a dashboard. They will send a message. My systems meet them there." },
    { num: "05", t: "Integrate, don't replace",    d: "Your ERP, your CRM, your accounting tool, they stay. I connect to them, lift the friction, and step back." },
    { num: "06", t: "Phased, never big-bang",      d: "I deliver in 4-6 week phases, starting with the highest-leverage workflow. Each phase pays for the next." },
  ];
  return (
    <section className="section section--elev" data-screen-label="03 Principles">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> Operating Principles</div>
        <h2>How I think,<br/>before how I build.</h2>
      </div>
      <div className="principles-grid">
        {items.map(p => (
          <div className="principle" key={p.num}>
            <span className="num">{p.num}</span>
            <h4>{p.t}</h4>
            <p>{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Industries() {
  const inds = [
    { ic: "hard-hat",       n: "Construction",         ex: "Project tracking, RFI follow-ups, cost reporting." },
    { ic: "factory",        n: "Manufacturing",        ex: "Production status, machine reports, QC routing." },
    { ic: "package",        n: "Industrial Suppliers", ex: "Quote engines, stock lookup, ERP-linked offers." },
    { ic: "ruler",          n: "Contracting",          ex: "Submittals, approvals, daily site briefings." },
    { ic: "truck",          n: "Logistics",            ex: "Dispatch follow-ups, POD chasing, customs alerts." },
    { ic: "building-2",     n: "Real Estate",          ex: "Lead routing, viewing scheduling, owner reports." },
  ];
  return (
    <section className="section" data-screen-label="04 Industries">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> Industries</div>
        <h2>Operations-heavy businesses.<br/>Real teams, real work.</h2>
        <p className="lede">I build for industries where the cost of a missed follow-up is measured in days, dirhams, or relationships, not in clicks.</p>
      </div>
      <div className="industries-grid">
        {inds.map(i => (
          <div className="industry-tile" key={i.n}>
            <div className="ic"><i data-lucide={i.ic}/></div>
            <div className="name">{i.n}</div>
            <div className="ex">{i.ex}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="section section--tight" data-screen-label="05 Numbers">
      <div className="stats-grid">
        <div className="stat"><div className="num">12<span className="unit">+</span></div><div className="lbl">Systems Shipped</div><div className="desc">Live agents and automations running in production.</div></div>
        <div className="stat"><div className="num">4–6<span className="unit">wks</span></div><div className="lbl">First System Live</div><div className="desc">From kick-off to a workflow saving time in production.</div></div>
        <div className="stat"><div className="num">3<span className="unit">+</span></div><div className="lbl">Industries</div><div className="desc">Manufacturing, contracting, hospitality, and beyond.</div></div>
        <div className="stat"><div className="num">24<span className="unit">h</span></div><div className="lbl">Audit Response</div><div className="desc">From contact form to a real conversation, one business day.</div></div>
      </div>
    </section>
  );
}

function Site() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="adyan-site" data-screen-label="ADYAN · About">
      <SiteNav current="about"/>
      <Breadcrumb trail={[{label:"About"}]}/>
      <AboutHero/>
      <Mission/>
      <Principles/>
      <Industries/>
      <Numbers/>
      <AuditCTAStrip/>
      <SiteFooter/>
      <StickyAuditBar/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
