import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";

const ReactDOM = { createRoot };
const { SiteNav, SiteFooter, StickyAuditBar, Breadcrumb } = window;

// ===== Hero =====
function PartnersHero() {
  return (
    <section className="page-hero" data-screen-label="01 Partners Hero">
      <div className="page-hero-inner">
        <div className="page-hero-left">
          <div className="eyebrow"><span className="eyebrow-dot"/> For IT · ERP · Consulting · Agencies</div>
          <h1>Add AI Automation Delivery<br/>to <span className="accent-word">Your Client Offering.</span></h1>
          <p className="lede">
            I partner with IT, ERP, and consulting firms to design and build AI
            agents, workflow automations, and ERP-connected systems for their
            clients. You keep the relationship and the brand. I bring the build.
          </p>
        </div>
        <div className="page-hero-meta">
          <div className="item"><div className="lbl">You partner with</div><div className="val">The builder, not a sales team</div></div>
          <div className="item"><div className="lbl">Models</div><div className="val">Referral · White-label · Joint</div></div>
          <div className="item"><div className="lbl">First build live</div><div className="val">4–6 weeks</div></div>
          <div className="item"><div className="lbl">Coverage</div><div className="val">Saudi Arabia · Global</div></div>
        </div>
      </div>
    </section>
  );
}

// ===== Who I partner with =====
function Audience() {
  const items = [
    { ic: "server-cog",  n: "IT firms",          d: "You run the infrastructure and support. I add the AI agents and automations that sit on top of it." },
    { ic: "database",    n: "ERP firms",          d: "Odoo, SAP B1, Zoho, Oracle implementers, I build the agents, syncs, and ZATCA-ready flows around your deployments." },
    { ic: "briefcase",   n: "Consulting firms",   d: "You diagnose the operations problem and own the strategy. I turn the recommendation into a working system." },
    { ic: "megaphone",   n: "Agencies",           d: "Digital, marketing, and software agencies extending into AI without hiring an in-house automation team." },
  ];
  return (
    <section className="section" data-screen-label="02 Audience">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> Who this is for</div>
        <h2>Your clients keep asking about AI.<br/>Now you have an answer.</h2>
        <p className="lede">
          You already hold the client relationship. What you don't have is a
          dependable delivery arm for AI agents and automation. That's the gap
          I fill, quietly, behind your brand or beside it.
        </p>
      </div>
      <div className="audience-grid">
        {items.map(i => (
          <div className="audience-tile" key={i.n}>
            <div className="ic"><i data-lucide={i.ic}/></div>
            <div className="name">{i.n}</div>
            <p className="desc">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== Founder-led honesty note =====
function FounderNote() {
  return (
    <section className="section section--elev" data-screen-label="03 Founder Note">
      <div className="founder-note">
        <div className="avatar">A</div>
        <div className="fn-body">
          <p className="fn-quote">
            I'm not an agency with fifty subcontractors. I'm one AI systems
            builder who has shipped real, ERP-connected automations into
            production, and I partner with firms who want that work done
            <span className="accent-word"> properly, not pitched.</span>
          </p>
          <p className="fn-sub">
            That means you talk to the person who builds the system, not an
            account manager. Scope is honest, timelines are real, and your
            client never sees a handoff to a junior team. When something needs
            more hands, I say so, and we plan for it together rather than
            overpromise.
          </p>
          <div className="fn-sign">
            <span className="dot"/> ADYAN · Founder-led AI systems studio · Khobar + remote
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Partner models (the core) =====
function PartnerModels() {
  const models = [
    {
      num: "Model 01", ic: "share-2", featured: false,
      title: "Referral Partner",
      tag: "Send the work my way. I build it, you earn on every engagement, with zero delivery risk on your side.",
      bestLabel: "Best if you…",
      best: [
        ["Have clients asking for AI", "but no team to build it."],
        ["Want a clean revenue share", "without touching delivery."],
        ["Need a trusted name", "you can vouch for."],
      ],
      facts: [
        ["Client owned by", "You"],
        ["Branding", "ADYAN (visible)"],
        ["Your involvement", "Intro + light"],
        ["You earn", "Referral commission"],
      ],
    },
    {
      num: "Model 02", ic: "package", featured: true,
      title: "White-label Delivery",
      tag: "I build under your brand. Your client sees your team delivering a polished AI system, I stay invisible.",
      bestLabel: "Best if you…",
      best: [
        ["Sell AI as your own service", "and own the client fully."],
        ["Want delivery capacity", "without headcount."],
        ["Need consistent quality", "behind your name."],
      ],
      facts: [
        ["Client owned by", "You"],
        ["Branding", "Yours (I'm hidden)"],
        ["Your involvement", "You front, I build"],
        ["You earn", "Your margin on top"],
      ],
    },
    {
      num: "Model 03", ic: "git-merge", featured: false,
      title: "Joint Implementation",
      tag: "We deliver together. You bring the domain and the relationship; I bring the AI build. One team to the client.",
      bestLabel: "Best if you…",
      best: [
        ["Run complex ERP or ops projects", "where AI is one workstream."],
        ["Want shared scoping", "and a co-led delivery."],
        ["Value a long-term build partner", "over a one-off vendor."],
      ],
      facts: [
        ["Client owned by", "Shared"],
        ["Branding", "Co-branded"],
        ["Your involvement", "Co-delivery"],
        ["You earn", "Split by scope"],
      ],
    },
  ];
  return (
    <section className="section" data-screen-label="04 Partner Models">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> Partner models</div>
        <h2>Three ways to work together.</h2>
        <p className="lede">
          Pick the level of involvement that fits how you sell. All three give
          your clients production-grade AI systems, the difference is who fronts
          the work and how we share it.
        </p>
      </div>
      <div className="partner-models">
        {models.map(m => (
          <div className={`pmodel${m.featured ? " is-featured" : ""}`} key={m.title}>
            {m.featured && <span className="pm-flag">Most popular</span>}
            <div className="pm-top">
              <div className="pm-ic"><i data-lucide={m.ic}/></div>
              <div>
                <span className="pm-num">{m.num}</span>
                <h3>{m.title}</h3>
              </div>
            </div>
            <p className="pm-tag">{m.tag}</p>
            <div className="pm-divider"/>
            <div className="pm-label">{m.bestLabel}</div>
            <ul className="pm-bullets">
              {m.best.map((b, i) => (
                <li key={i}><i data-lucide="check"/><span><b>{b[0]}</b> {b[1]}</span></li>
              ))}
            </ul>
            <div className="pm-foot">
              {m.facts.map((f, i) => (
                <div className="pm-fact" key={i}>
                  <span className="k">{f[0]}</span>
                  <span className="v">{f[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== Comparison table =====
function Compare() {
  const rows = [
    ["Who owns the client", "You", "You", "Shared"],
    ["Whose brand the client sees", "ADYAN, visible", "Yours, I'm invisible", "Co-branded"],
    ["Your effort", "Introduction only", "You sell, I build", "We scope & deliver together"],
    ["Best project size", "Any", "Repeatable AI services", "Larger ERP / ops programs"],
    ["How you earn", "Referral commission", "Margin on my build", "Revenue split by scope"],
  ];
  return (
    <section className="section section--elev section--tight" data-screen-label="05 Compare">
      <div className="section-head-c" style={{marginBottom: 32}}>
        <div className="eyebrow"><span className="eyebrow-dot"/> At a glance</div>
        <h2>Compare the three models.</h2>
      </div>
      <div className="partner-compare">
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Referral Partner</th>
              <th>White-label Delivery</th>
              <th>Joint Implementation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ===== What I deliver for your clients =====
function Capabilities() {
  const caps = [
    {
      ic: "bot", t: "AI Agents",
      d: "Agents that own a function end-to-end, procurement, collections, dispatch, lead routing, acting on what they can and escalating the rest, with human approval gates.",
      tags: ["Always-on", "Audit-logged", "WhatsApp-native"],
    },
    {
      ic: "workflow", t: "Workflow Automations",
      d: "The mundane handled silently, the edge cases surfaced clearly. Triggers, parsing, ERP writes, approvals, retries, and alerts, built around the workflow as it actually runs.",
      tags: ["Branching logic", "Retries", "Smart alerts"],
    },
    {
      ic: "database", t: "ERP-connected Systems",
      d: "Bidirectional syncs and API layers between ERP, CRM, accounting, and WhatsApp, including ZATCA Phase-2 e-invoicing, so your client's tools finally talk to each other.",
      tags: ["Odoo · SAP · Zoho", "ZATCA ready", "Custom APIs"],
    },
  ];
  return (
    <section className="section" data-screen-label="06 Capabilities">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> What I deliver for your clients</div>
        <h2>Production systems, not demos.</h2>
        <p className="lede">
          Whatever model we use, your client gets the same standard of build 
          systems that survive Monday morning, integrate with the ERP, and
          produce an audit trail.
        </p>
      </div>
      <div className="cap-grid">
        {caps.map(c => (
          <div className="cap-card" key={c.t}>
            <div className="ic"><i data-lucide={c.ic}/></div>
            <h4>{c.t}</h4>
            <p>{c.d}</p>
            <div className="cap-tags">
              {c.tags.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== How a partnership works =====
function HowItWorks() {
  const steps = [
    { n: "1", t: "Intro call", d: "30 minutes. We figure out which model fits how you sell and what your clients keep asking for." },
    { n: "2", t: "Scope a first build", d: "We pick one real client workflow, agree scope and split, and I write an honest plan and timeline." },
    { n: "3", t: "I build, you stay close", d: "Delivered in 4–6 week phases. You see progress, your client sees results, under your brand or mine." },
    { n: "4", t: "Repeat & scale", d: "Once the first system lands, we templatise it. Each engagement makes the next one faster to sell and deliver." },
  ];
  return (
    <section className="section section--elev" data-screen-label="07 How It Works">
      <div className="section-head-c">
        <div className="eyebrow"><span className="eyebrow-dot"/> How a partnership starts</div>
        <h2>Simple to start.<br/>Built to repeat.</h2>
      </div>
      <div className="partner-steps">
        {steps.map(s => (
          <div className="partner-step" key={s.n}>
            <div className="step-n">{s.n}</div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== Partner CTA strip =====
function PartnerCTA() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section className="audit-strip" data-screen-label="08 Partner CTA">
      <div className="audit-strip-inner">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot"/> Become a partner</div>
          <h2>Let's add AI delivery to <span className="accent-word">your offering.</span></h2>
          <p>One call to find the right model. Bring a client situation you're sitting on, I'll tell you honestly whether it's a fit and how we'd build it. No pressure, no sales team.</p>
        </div>
        <div className="audit-strip-cta">
          <a className="btn-primary" href="/contact">Book a partner call <span className="arr"/></a>
          <a className="btn-secondary" href="/systems-built">See systems I've built</a>
          <div className="audit-strip-meta">
            <span><i data-lucide="clock"/> Response within 24 hours</span>
            <span><i data-lucide="shield-check"/> NDA on request</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Site() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="adyan-site" data-screen-label="ADYAN · Partnerships">
      <SiteNav current="partners"/>
      <Breadcrumb trail={[{label:"Partnerships"}]}/>
      <main id="main">
      <PartnersHero/>
      <Audience/>
      <FounderNote/>
      <PartnerModels/>
      <Compare/>
      <Capabilities/>
      <HowItWorks/>
      <PartnerCTA/>
      </main>
      <SiteFooter/>
      <StickyAuditBar/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
