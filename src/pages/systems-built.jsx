import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";

const ReactDOM = { createRoot };
const { SiteNav, SiteFooter, StickyAuditBar, Breadcrumb, AuditCTAStrip } = window;

function WorkHero() {
  return (
    <section className="page-hero" data-screen-label="01 Work Hero">
      <div className="page-hero-inner">
        <div className="page-hero-left">
          <div className="eyebrow"><span className="eyebrow-dot" /> Selected Work</div>
          <h1>Selected AI operations agents, built for <span className="accent-word">real business workflows.</span></h1>
          <p className="lede">
            A founder-led look at department-level AI agents running inside real
            companies, each one assembled from automations, tools, approval gates,
            WhatsApp and voice, ERP, dashboards, and scheduled workflows. Shown as
            simplified previews; clients anonymized unless approved.
          </p>
        </div>
        <div className="page-hero-meta">
          <div className="item"><div className="lbl">Studio</div><div className="val">Founder-led · one builder</div></div>
          <div className="item"><div className="lbl">Shown here</div><div className="val">5 in depth + 10-agent roster</div></div>
          <div className="item"><div className="lbl">Agent type</div><div className="val">Department-level, end-to-end</div></div>
          <div className="item"><div className="lbl">Access</div><div className="val">Private walkthrough · NDA</div></div>
        </div>
      </div>
    </section>);

}

function AgentLegend() {
  const blocks = [
  { ic: "zap", t: "Triggers & schedules", d: "Inbound messages, events, and timed runs" },
  { ic: "wrench", t: "Tools & actions", d: "Lookups, calculations, writes, and sends" },
  { ic: "shield-check", t: "Approval gates", d: "Human sign-off where money or risk is real" },
  { ic: "message-circle", t: "WhatsApp & voice", d: "Arabic and English, where teams already work" },
  { ic: "database", t: "ERP & data", d: "Two-way sync with your systems of record" },
  { ic: "layout-dashboard", t: "Dashboards", d: "One mission-control view of operations" }];

  return (
    <section className="section" data-screen-label="02 Anatomy" style={{ paddingTop: 8, paddingBottom: 8 }}>
      <div className="agent-legend">
        <div className="agent-legend-h">
          <span className="k">Anatomy of an agent</span>
          <h2 data-comment-anchor="40fb27f914-h2-41-11">Not chatbots. Department-level systems that own a function.</h2>
          <p>
            Each agent below acts on what it can and escalates the rest, assembled
            from the same operational building blocks.
          </p>
        </div>
        <div className="agent-legend-grid">
          {blocks.map((b) =>
          <div className="legend-item" key={b.t}>
              <div className="ic"><i data-lucide={b.ic} /></div>
              <div>
                <div className="t">{b.t}</div>
                <div className="d">{b.d}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function SpecCell({ label, tags }) {
  return (
    <div className="spec-cell">
      <div className="lbl"><span className="dot" />{label}</div>
      <div className="tags">{tags.map((t) => <span className="spec-tag" key={t}>{t}</span>)}</div>
    </div>);

}

function AgentEntry({ no, role, sector, title, conf, blurb, spec, outcome, screenLabel, children }) {
  return (
    <article className="sys-page-card agent-card" data-screen-label={screenLabel}>
      <div>
        <div className="agent-desig">
          <span className="no">{no}</span>
          <span className="role">{role}</span>
          <span className="agent-status"><span className="live" />Live in production</span>
        </div>
        <div className="tag-row">
          {sector.map((s, i) => <span className={"tag" + (i ? " muted" : "")} key={s}>{s}</span>)}
        </div>
        <h3>{title}</h3>
        <p className="client-conf">{conf}</p>
        <p className="lede">{blurb}</p>
        <div className="agent-spec">
          <SpecCell label="Triggers" tags={spec.triggers} />
          <SpecCell label="Tools & actions" tags={spec.tools} />
          <SpecCell label="Approval gates" tags={spec.gates} />
          <SpecCell label="Surfaces" tags={spec.surfaces} />
        </div>
        <div className="agent-outcome">
          {outcome.map((o) => <span className="oc" key={o}><i data-lucide="check" />{o}</span>)}
        </div>
        <div className="agent-foot">
          <span className="placeholder-note"><i data-lucide="lock" />Detailed systems available under NDA</span>
          <a className="walk-link" href="Contact.html">Private walkthrough available <span className="arr" /></a>
        </div>
      </div>
      <div className="agent-preview">
        <div className="preview-cap">
          <span className="l"><i data-lucide="eye" />Simplified preview</span>
          <span>Live system differs</span>
        </div>
        <div className="visual">{children}</div>
      </div>
    </article>);

}

function AgentQuoting() {
  return (
    <AgentEntry
      no="AGENT 01"
      role="Sales operations · Quoting"
      sector={["Industrial", "Manufacturing", "ERP + WhatsApp"]}
      title="Quoting Agent"
      conf="Construction chemicals manufacturer · name withheld by agreement"
      blurb="Sales reps were drowning in repetitive RFQs over WhatsApp, quoting was slow, error-prone, and disconnected from stock. The agent lives on the business WhatsApp number, reads each request, pulls real-time stock from the ERP, prices the quote, and routes it through a single approval gate before anything is sent."
      spec={{
        triggers: ["Inbound RFQ on WhatsApp", "New SKU request"],
        tools: ["ERP stock lookup", "Price-list + VAT calc", "Draft quote", "Send on approval"],
        gates: ["Rep approves before send", "Out-of-stock → human"],
        surfaces: ["Business WhatsApp", "Rep approval queue"]
      }}
      outcome={["Quotes out in minutes, not hours", "Stock always live from the ERP", "24/7 first response"]}
      screenLabel="03 Agent · Quoting">
      
      <div className="sys-mini-head">
        <span><span className="live" />Quoting Agent</span>
        <span>WA · LIVE</span>
      </div>
      <div className="wa-mock">
        <div className="wa-bubble from-user" style={{ fontSize: 12.5 }}>
          Need quote: 40 bags PrimerMax, 15 drums LatexBond, site Khobar.
          <span className="ts">10:14 ✓✓</span>
        </div>
        <div className="wa-bubble from-agent" style={{ fontSize: 12.5 }}>
          40 bags PrimerMax, in stock. 15 drums LatexBond, 12 in stock, 3 in transit (ETA 5 days). Quote SAR 47,820 inc. VAT. Approve to send?
          <span className="ts">10:14</span>
        </div>
        <div className="wa-bubble from-user" style={{ fontSize: 12.5 }}>
          ✓ approved
          <span className="ts">10:15 ✓✓</span>
        </div>
      </div>
    </AgentEntry>);

}

function AgentDailyBrief() {
  return (
    <AgentEntry
      no="AGENT 02"
      role="Multi-branch operations · Daily brief"
      sector={["Hospitality", "F&B Retail", "Voice + Dashboard"]}
      title="Daily Brief Agent"
      conf="Specialty coffee group · name withheld by agreement"
      blurb="Branch managers were calling head office every morning to log opening inventory, equipment issues, and staff shortages. Now they send one voice note. The agent transcribes Arabic or English, structures the report, logs inventory, routes maintenance and HR alerts to the right team, and surfaces everything on a live Mission Control dashboard."
      spec={{
        triggers: ["Morning voice note", "06:00 scheduled run"],
        tools: ["Transcribe AR/EN", "Structure report", "Log inventory", "Route alerts"],
        gates: ["Maintenance ticket review", "HR cover request"],
        surfaces: ["WhatsApp voice", "Mission Control dashboard"]
      }}
      outcome={["No more morning phone calls", "One structured brief per branch", "Issues routed automatically"]}
      screenLabel="04 Agent · Daily Brief">
      
      <div className="sys-mini-head">
        <span><span className="live" />Daily Brief</span>
        <span>06:42</span>
      </div>
      <div className="voice-call" style={{ padding: "12px 14px" }}>
        <div className="pic" style={{ width: 36, height: 36, fontSize: 13 }}>F</div>
        <div className="meta">
          <div className="who" style={{ fontSize: 13 }}>Branch 04 · manager</div>
          <div className="what" style={{ fontSize: 11 }}><span className="live" />Voice note · 0:48</div>
        </div>
        <div className="timer" style={{ fontSize: 11 }}>0:48</div>
      </div>
      <div className="sys-mini-rows">
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="check-circle-2" /></div>
          <div><div style={{ fontWeight: 500 }}>Inventory logged · all 12 SKUs</div></div>
          <span className="pill badge-ok">DONE</span>
        </div>
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="alert-triangle" /></div>
          <div><div style={{ fontWeight: 500 }}>Espresso machine #2 flagged</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>Maintenance ticket · routed</div></div>
          <span className="pill badge-pending">QUEUED</span>
        </div>
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="users" /></div>
          <div><div style={{ fontWeight: 500 }}>Staff short by 1 · barista</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>HR notified, cover requested</div></div>
          <span className="pill badge-run">RUNNING</span>
        </div>
      </div>
    </AgentEntry>);

}

function AgentSiteReporting() {
  return (
    <AgentEntry
      no="AGENT 03"
      role="Field operations · Site reporting"
      sector={["Contracting", "Construction", "Site Voice + ERP"]}
      title="Site Reporting Agent"
      conf="Contracting company · name withheld by agreement"
      blurb="Daily reports from concurrent sites arrived by photo, voice note, and shared spreadsheets, inconsistent, late, and hard to aggregate. Engineers now dictate progress over WhatsApp. The agent structures the data, writes it back to the ERP, consolidates every site, and delivers one owner briefing by 06:30 each morning with the decisions that need a call."
      spec={{
        triggers: ["Site voice note", "06:30 scheduled brief"],
        tools: ["Structure progress", "ERP write-back", "Consolidate sites", "Draft owner brief"],
        gates: ["Amber site → escalate", "Owner decision queue"],
        surfaces: ["WhatsApp · field", "Owner briefing"]
      }}
      outcome={["One inbox for every site", "ERP current from the field", "Owner briefed by 06:30"]}
      screenLabel="05 Agent · Site Reporting">
      
      <div className="sys-mini-head">
        <span><span className="live" />Site Reports</span>
        <span>9 SITES · TODAY</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, position: "relative", zIndex: 1 }}>
        {["B12", "B07", "B03", "R-East-1", "R-East-2", "R-West-3", "DMM-1", "DMM-2", "JED-1"].map((s, i) =>
        <div key={s} style={{ padding: "10px 8px", background: "rgba(13,29,41,.6)", border: "1px solid var(--border-1)", borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.06em" }}>SITE</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--fg-1)", marginTop: 2 }}>{s}</div>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 4 ? "#e8a63a" : "#2BD17E", margin: "6px auto 0" }} />
          </div>
        )}
      </div>
      <div className="sys-mini-rows" style={{ marginTop: 8 }}>
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="file-text" /></div>
          <div><div style={{ fontWeight: 500 }}>Owner Brief · 06:30, sent</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>1 site amber · 7 decisions queued</div></div>
          <span className="pill badge-ok">SENT</span>
        </div>
      </div>
    </AgentEntry>);

}

function AgentEtimad() {
  return (
    <AgentEntry
      no="AGENT 04"
      role="Business development · Government tenders"
      sector={["Government", "Etimad / RFP", "Browser + WhatsApp"]}
      title="Tender Watch Agent"
      conf="Bidding into government contracts · client name withheld by agreement"
      blurb="Whole teams used to sit on the Etimad portal every morning, hunting for new tenders, downloading dense Arabic PDFs, and judging whether each one was worth a bid. A scheduled heartbeat agent now opens the browser, navigates Etimad, searches the right industry keywords, downloads the relevant RFPs, and summarises the core requirements and budget into a bilingual brief, then drafts the opening Word document for the bid."
      spec={{
        triggers: ["06:00 scheduled heartbeat", "New matching tender"],
        tools: ["Navigate Etimad", "Keyword search", "Download + parse RFP", "AR/EN brief", "Draft bid .docx"],
        gates: ["Bid / no-bid decision", "Brief review before draft"],
        surfaces: ["Daily WhatsApp summary", "Drafts folder"]
      }}
      outcome={["Never miss a tender drop", "Executive summary already written", "Bid doc started for you"]}
      screenLabel="06 Agent · Etimad">
      
      <div className="sys-mini-head">
        <span><span className="live" />Tender Watch</span>
        <span>06:04 · DAILY</span>
      </div>
      <div className="wa-mock">
        <div className="wa-bubble from-agent" style={{ fontSize: 12.5 }}>
          3 new Etimad tenders match your keywords today. 1 strong fit:
          MEP works, Eastern Province. Budget band SAR 4.2M. Closes in 11 days. English + Arabic brief and a draft bid doc are ready.
          <span className="ts">06:04</span>
        </div>
      </div>
      <div className="sys-mini-rows">
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="file-search" /></div>
          <div><div style={{ fontWeight: 500 }}>RFP downloaded · 84-page PDF</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>Requirements + budget extracted</div></div>
          <span className="pill badge-ok">PARSED</span>
        </div>
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="languages" /></div>
          <div><div style={{ fontWeight: 500 }}>Brief written · AR + EN</div></div>
          <span className="pill badge-ok">DONE</span>
        </div>
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="file-text" /></div>
          <div><div style={{ fontWeight: 500 }}>Bid document drafted</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>Awaiting bid / no-bid call</div></div>
          <span className="pill badge-pending">REVIEW</span>
        </div>
      </div>
    </AgentEntry>);

}

function AgentPortalEntry() {
  return (
    <AgentEntry
      no="AGENT 05"
      role="HR & admin · Government portals"
      sector={["Government Portals", "HR / Admin", "Browser automation"]}
      title="Portal Entry Agent"
      conf="SME with no portal API access · client name withheld by agreement"
      blurb="HR and admin teams burn thousands of hours hand-copying data from internal spreadsheets into government portals, Muqeem for Iqama renewals and visas, Qiwa for labour contracts, Mudad for payroll, portals that offer no usable API to a small business. The agent reads the Excel file, logs into each portal, navigates the screens, and enters the data field by field overnight, no IT backend, no integration project."
      spec={{
        triggers: ["Excel file dropped", "Scheduled overnight run"],
        tools: ["Read employee sheet", "Log into portal", "Navigate UI", "Field-by-field entry", "Capture confirmations"],
        gates: ["Mismatch → human", "Submit confirmation review"],
        surfaces: ["Run log + screenshots", "WhatsApp summary"]
      }}
      outcome={["Days of data entry done overnight", "No IT backend touched", "Every step screenshotted"]}
      screenLabel="07 Agent · Portal Entry">
      
      <div className="sys-mini-head">
        <span><span className="live" />Portal Entry</span>
        <span>OVERNIGHT RUN</span>
      </div>
      <div className="sys-mini-rows">
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="check-circle-2" /></div>
          <div><div style={{ fontWeight: 500 }}>Muqeem · 38 Iqama renewals</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>From HR_master.xlsx · all submitted</div></div>
          <span className="pill badge-ok">DONE</span>
        </div>
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="loader" /></div>
          <div><div style={{ fontWeight: 500 }}>Qiwa · 17 of 26 contracts</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>Entering field by field</div></div>
          <span className="pill badge-run">RUNNING</span>
        </div>
        <div className="sys-mini-row">
          <div className="ic"><i data-lucide="alert-triangle" /></div>
          <div><div style={{ fontWeight: 500 }}>Mudad · 1 row flagged</div><div style={{ fontSize: 11, color: "var(--fg-3)" }}>IBAN mismatch · paused for human</div></div>
          <span className="pill badge-pending">HELD</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {["Muqeem", "Qiwa", "Mudad"].map((p) =>
        <div key={p} style={{ flex: 1, padding: "9px 8px", background: "rgba(13,29,41,.6)", border: "1px solid var(--border-1)", borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 12.5, fontWeight: 600, color: "var(--fg-1)" }}>{p}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--fg-3)", letterSpacing: "0.08em", marginTop: 2 }}>PORTAL</div>
          </div>
        )}
      </div>
    </AgentEntry>);

}

// Inline SVG icons for the roster — kept out of lucide so this stateful,
// re-rendering component stays fully React-owned (lucide DOM mutation breaks reconciliation).
const ROSTER_ICONS = {
  "gauge": <React.Fragment><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></React.Fragment>,
  "shopping-cart": <React.Fragment><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></React.Fragment>,
  "receipt": <React.Fragment><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" /></React.Fragment>,
  "tag": <React.Fragment><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></React.Fragment>,
  "truck": <React.Fragment><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></React.Fragment>,
  "car": <React.Fragment><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></React.Fragment>,
  "hard-hat": <React.Fragment><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" /><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" /><path d="M4 15v-3a6 6 0 0 1 6-6" /><path d="M14 6a6 6 0 0 1 6 6v3" /></React.Fragment>,
  "megaphone": <React.Fragment><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></React.Fragment>,
  "users": <React.Fragment><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></React.Fragment>,
  "key-round": <React.Fragment><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></React.Fragment>,
  "git-branch": <React.Fragment><line x1="6" x2="6" y1="3" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></React.Fragment>,
  "check": <path d="M20 6 9 17l-5-5" />
};

function Icon({ n }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ROSTER_ICONS[n] || null}
    </svg>);

}

function RosterCard({ a }) {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((v) => !v);
  return (
    <article
      className={"roster-card expandable" + (open ? " open" : "")}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}>
      <div className="rc-top">
        <div className="rc-ic"><Icon n={a.ic} /></div>
        <div>
          <div className="rc-dept">{a.dept}</div>
          <div className="rc-name">{a.name}</div>
        </div>
      </div>
      <p className="rc-desc">{a.desc}</p>
      <div className="rc-chips">
        {a.chips.map((c) => <span className="roster-chip" key={c}>{c}</span>)}
      </div>
      <button className="rc-toggle" type="button" onClick={(e) => { e.stopPropagation(); toggle(); }} aria-expanded={open}>
        <span><span className="lbl-closed">View full workflow</span><span className="lbl-open">Hide workflow</span></span>
        <span className="chev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </span>
      </button>
      <div className="rc-detail">
        <div className="rc-detail-inner">
          <p className="rc-context"><Icon n="git-branch" />{a.context}</p>
          <div className="agent-spec">
            <SpecCell label="Triggers" tags={a.spec.triggers} />
            <SpecCell label="Tools & actions" tags={a.spec.tools} />
            <SpecCell label="Approval gates" tags={a.spec.gates} />
            <SpecCell label="Surfaces" tags={a.spec.surfaces} />
          </div>
          <div className="agent-outcome">
            {a.outcome.map((o) => <span className="oc" key={o}><Icon n="check" />{o}</span>)}
          </div>
        </div>
      </div>
    </article>);

}

function AgentRoster() {
  const agents = [
  { ic: "gauge", dept: "Owner · leadership", name: "Executive Agent",
    desc: "A daily brief on approvals, delays, cash position, and the decisions waiting on you, delivered before the day starts.",
    chips: ["Scheduled", "WhatsApp", "Dashboard"],
    context: "Sits above every other agent, reading from each function to give the owner one view of the business.",
    spec: {
      triggers: ["06:00 scheduled brief", "Threshold breach alert"],
      tools: ["Pull approvals queue", "Cash position lookup", "Aggregate delays", "Draft brief"],
      gates: ["Owner decision queue", "Spend over limit → flag"],
      surfaces: ["Morning WhatsApp brief", "Mission Control dashboard"]
    },
    outcome: ["The day's decisions in one place", "No surprises on cash or delays", "Briefed before 7am"] },
  { ic: "shopping-cart", dept: "Procurement", name: "Procurement Agent",
    desc: "Collects purchase requests, compares supplier quotes, chases approvals, and keeps every buying decision on record.",
    chips: ["Approval gates", "ERP", "WhatsApp"],
    context: "Owns the buying cycle from request to PO, so nothing is ordered without a comparison and a sign-off.",
    spec: {
      triggers: ["New purchase request", "Low-stock reorder point"],
      tools: ["Collect requests", "Compare supplier quotes", "Chase approvals", "Issue PO to ERP"],
      gates: ["Budget owner sign-off", "New supplier → review"],
      surfaces: ["WhatsApp approvals", "ERP purchase orders"]
    },
    outcome: ["Every quote compared", "Approvals chased automatically", "Full buying audit trail"] },
  { ic: "receipt", dept: "Finance · accounts", name: "Finance Agent",
    desc: "Tracks receivables, flags overdue invoices, follows up on payment politely, and reconciles against the ledger.",
    chips: ["ERP", "ZATCA-ready", "Alerts"],
    context: "Watches the receivables ledger and does the polite, persistent follow-up no one has time for.",
    spec: {
      triggers: ["Invoice due date", "Payment received"],
      tools: ["Track receivables", "Flag overdue", "Send polite follow-up", "Reconcile ledger"],
      gates: ["Write-off → human", "Dispute → escalate"],
      surfaces: ["Aging dashboard", "WhatsApp reminders"]
    },
    outcome: ["Overdue invoices chased on time", "Ledger always reconciled", "ZATCA-ready records"] },
  { ic: "tag", dept: "Sales · revenue", name: "Sales Agent",
    desc: "Reads inbound RFQs, drafts quotes from live stock and price lists, and routes each one through approval before it goes out.",
    chips: ["WhatsApp", "ERP", "Approval gates"],
    context: "Lives on the business WhatsApp number so the first response to any RFQ is instant and priced from live stock.",
    spec: {
      triggers: ["Inbound RFQ", "Price-list update"],
      tools: ["Read RFQ", "Live stock + price", "Draft quote", "Send on approval"],
      gates: ["Rep approves before send", "Discount over limit → manager"],
      surfaces: ["Business WhatsApp", "Rep approval queue"]
    },
    outcome: ["Quotes out in minutes", "Priced from live stock", "Nothing sent unapproved"] },
  { ic: "truck", dept: "Logistics · dispatch", name: "Delivery Agent",
    desc: "Confirms orders, schedules dispatch, sends customers live delivery updates, and closes the loop on proof of delivery.",
    chips: ["Scheduling", "WhatsApp", "ERP"],
    context: "Takes a confirmed order all the way to proof of delivery, keeping the customer informed at each step.",
    spec: {
      triggers: ["Order confirmed", "Dispatch scheduled"],
      tools: ["Confirm order", "Schedule dispatch", "Live status updates", "Capture POD"],
      gates: ["Reschedule request → ops", "Failed delivery → human"],
      surfaces: ["Customer WhatsApp", "Dispatch board"]
    },
    outcome: ["Customers updated live", "Dispatch scheduled automatically", "Proof of delivery on file"] },
  { ic: "car", dept: "Fleet · assets", name: "Fleet Agent",
    desc: "Tracks vehicle assignments, service due dates, and Istimara and insurance renewals, flagging what needs action before it lapses.",
    chips: ["Scheduled", "Reminders", "Records"],
    context: "Keeps a live record of every vehicle and raises a flag well before a renewal or service falls due.",
    spec: {
      triggers: ["Service due date", "Renewal window opens"],
      tools: ["Track assignments", "Monitor service due", "Istimara + insurance watch", "Flag action"],
      gates: ["Renewal cost approval", "Take off-road → owner"],
      surfaces: ["Reminder alerts", "Fleet records"]
    },
    outcome: ["Nothing lapses unnoticed", "Service scheduled ahead", "Every vehicle on record"] },
  { ic: "hard-hat", dept: "Projects · field", name: "Project Agent",
    desc: "Turns site voice notes into structured daily reports, writes progress back to the ERP, and consolidates every project into one briefing.",
    chips: ["Voice", "ERP", "Dashboard"],
    context: "Lets engineers report by voice from the field and turns it into structured, aggregated project data.",
    spec: {
      triggers: ["Site voice note", "06:30 scheduled brief"],
      tools: ["Structure daily report", "ERP write-back", "Consolidate projects", "Draft briefing"],
      gates: ["Amber project → escalate", "Owner decision queue"],
      surfaces: ["WhatsApp · field", "Project dashboard"]
    },
    outcome: ["One inbox for every site", "ERP current from the field", "Owner briefed daily"] },
  { ic: "megaphone", dept: "Marketing · growth", name: "Marketing Agent",
    desc: "Drafts on-brand content, schedules it across channels, captures inbound leads, and routes the qualified ones to sales.",
    chips: ["Scheduling", "Lead routing", "WhatsApp"],
    context: "Keeps the content calendar moving and hands every qualified inbound lead straight to the Sales Agent.",
    spec: {
      triggers: ["Content calendar slot", "Inbound lead"],
      tools: ["Draft on-brand content", "Schedule across channels", "Capture leads", "Route to sales"],
      gates: ["Content approval before post", "Lead qualification"],
      surfaces: ["Channel scheduler", "Sales handoff · WhatsApp"]
    },
    outcome: ["On-brand content, on schedule", "Leads captured automatically", "Qualified leads to sales"] },
  { ic: "users", dept: "People · HR", name: "HR Agent",
    desc: "Handles leave requests, Iqama and document expiry reminders, onboarding checklists, and routine staff questions.",
    chips: ["Approval gates", "Reminders", "WhatsApp"],
    context: "Answers the routine staff questions and tracks every expiry, so HR only handles the exceptions.",
    spec: {
      triggers: ["Leave request", "Document expiry window"],
      tools: ["Handle leave requests", "Iqama + doc expiry watch", "Onboarding checklists", "Answer staff FAQs"],
      gates: ["Leave approval → manager", "Exception → HR"],
      surfaces: ["Employee WhatsApp", "HR records"]
    },
    outcome: ["Routine requests handled instantly", "No expiry missed", "Onboarding never dropped"] },
  { ic: "key-round", dept: "Rental · operations", name: "Rental Agent",
    desc: "Manages availability, contracts, returns, and renewal reminders, and answers customer availability questions instantly.",
    chips: ["WhatsApp", "Contracts", "Scheduling"],
    context: "Runs the rental cycle end to end, from an availability question to the renewal reminder months later.",
    spec: {
      triggers: ["Availability query", "Contract end / renewal"],
      tools: ["Check availability", "Draft contracts", "Process returns", "Renewal reminders"],
      gates: ["Contract terms → owner", "Damage claim → human"],
      surfaces: ["Customer WhatsApp", "Rental ledger"]
    },
    outcome: ["Availability answered instantly", "Contracts and returns tracked", "Renewals never missed"] }];

  return (
    <section className="section" data-screen-label="08 Agent Roster" style={{ paddingTop: 24 }}>
      <div className="sec-head">
        <span className="k">The roster</span>
        <h2>One agent per function, across the business.</h2>
        <p>
          Below is the wider range of
          department-level agents I build, each owning a function end-to-end,
          acting on what it can and escalating the rest. Built to your workflows;
          specific deployments stay private. Open any card to see its full workflow.
        </p>
      </div>
      <div className="roster-grid">
        {agents.map((a) => <RosterCard a={a} key={a.name} />)}
      </div>
    </section>);

}

function PendingNotice() {
  return (
    <section className="section" data-screen-label="09 More Pending">
      <div style={{
        padding: "36px 40px",
        background: "linear-gradient(135deg, rgba(26,117,222,.06), rgba(13,29,41,.5))",
        border: "1px dashed var(--border-2)",
        borderRadius: "var(--r-lg)",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 24,
        alignItems: "center"
      }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(26,117,222,.12)", border: "1px solid rgba(26,117,222,.3)", display: "grid", placeItems: "center", color: "var(--accent)" }}>
          <i data-lucide="folder-lock" style={{ width: 24, height: 24 }} />
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--fg-1)", margin: "0 0 4px" }}>More agents shown in private walkthroughs</h4>
          <p style={{ fontSize: 14, color: "var(--fg-2)", margin: 0, maxWidth: "68ch", lineHeight: 1.55 }}>
            Most of the work isn't public, client confidentiality, internal
            workflows, and active business use keep it off the page. The agents
            most relevant to your operation can be walked through directly, under
            NDA on request.
          </p>
        </div>
        <a className="btn-secondary" href="Contact.html">Request a walkthrough <span className="arr" /></a>
      </div>
    </section>);

}

function Site() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  return (
    <div className="adyan-site" data-screen-label="ADYAN · Systems Built">
      <SiteNav current="work" />
      <Breadcrumb trail={[{ label: "Systems Built" }]} />
      <WorkHero />
      <AgentLegend />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="sys-page-grid">
          <AgentQuoting />
          <AgentDailyBrief />
          <AgentSiteReporting />
          <AgentEtimad />
          <AgentPortalEntry />
        </div>
      </section>
      <AgentRoster />
      <PendingNotice />
      <AuditCTAStrip />
      <SiteFooter />
      <StickyAuditBar />
    </div>);

}
ReactDOM.createRoot(document.getElementById("root")).render(<Site />);
