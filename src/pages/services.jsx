import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";

const ReactDOM = { createRoot };
const { SiteNav, SiteFooter, StickyAuditBar, Breadcrumb, AuditCTAStrip } = window;

function ServicesHero() {
  return (
    <section className="page-hero" data-screen-label="01 Services Hero">
      <div className="page-hero-inner">
        <div className="page-hero-left">
          <div className="eyebrow"><span className="eyebrow-dot"/> Services</div>
          <h1>Start with a 30-minute <span className="accent-word">systems audit.</span><br/>Get a clear path to your first AI system.</h1>
          <p className="lede">
            Share a little about your business, then book a 30-minute call. I'll identify your highest-friction workflow, confirm whether AI automation is a good fit, and outline the fastest practical way to move forward — from a simple quick-win automation to a phased AI operations system.
          </p>
        </div>
        <div className="page-hero-meta">
          <div className="item"><div className="lbl">Engagement</div><div className="val">Audit → Phase → Live</div></div>
          <div className="item"><div className="lbl">First system</div><div className="val">4–6 weeks</div></div>
          <div className="item"><div className="lbl">Channels</div><div className="val">WhatsApp · Voice · Web · ERP</div></div>
          <div className="item"><div className="lbl">Languages</div><div className="val">Arabic · English</div></div>
        </div>
      </div>
    </section>
  );
}

// In-page jump nav
function ServicesNav() {
  const items = [
    {id:"agents",    n:"AI Agents",            d:"Internal assistants for daily tasks",     ic:"bot"},
    {id:"automation",n:"Workflow Automation",  d:"Approvals, reports, alerts, follow-ups",  ic:"workflow"},
    {id:"whatsapp", n:"WhatsApp AI",           d:"Customer and team communication",        ic:"message-circle"},
    {id:"voice",    n:"Voice Agents",          d:"Calls, booking, reminders, qualification", ic:"mic"},
    {id:"erp",      n:"ERP & CRM Integration", d:"Connect data across systems",            ic:"database"},
    {id:"apps",     n:"Apps & Dashboards",     d:"Custom tools for teams and managers",    ic:"layout-dashboard"},
  ];
  return (
    <section className="section section--tight" style={{paddingTop:32, paddingBottom:16}}>
      <div style={{display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10}}>
        {items.map(i => (
          <a key={i.id} href={`#${i.id}`} className="integ-tile" style={{textDecoration:"none"}}>
            <div className="ic"><i data-lucide={i.ic}/></div>
            <div className="name">{i.n}</div>
            <div style={{fontFamily:"var(--font-body)", fontSize:"12.5px", lineHeight:1.45, color:"var(--fg-2)"}}>{i.d}</div>
            <div className="cat" style={{marginTop:"auto"}}>View service →</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ===== Statement / manifesto band =====
function SvcStatement() {
  return (
    <section className="svc-statement" data-screen-label="Statement">
      <h2>
        I don't sell chatbots.<br/>
        <span className="accent-word">I build systems that run departments.</span>
      </h2>
      <p className="lead">
        A single automation that answers emails isn't transformation. I architect
        agent systems that handle end-to-end workflows, from intake to execution
        to reporting, replacing entire process chains, not individual steps.
      </p>
      <p className="sub">
        The result: your finance team operates like it's 3× the size. Your ops team
        ships without the backlog. Your revenue team closes faster.
      </p>
    </section>
  );
}

// ===== Service 1: AI Agents =====
function SvcAgents() {
  return (
    <section className="section" id="agents" data-screen-label="02 Agents">
      <div className="svc-row">
        <div>
          <span className="svc-num">01 / Service</span>
          <h3>AI Agents that run a function, not a chat.</h3>
          <p className="lede">
            Specialised agents that take ownership of a function, procurement,
            collections, dispatch, lead routing, and execute the routine work
            end-to-end. They watch your inbox, ERP, and WhatsApp; act on the
            cases they can; escalate the ones they can't.
          </p>
          <ul className="svc-bullets">
            <li><i data-lucide="check"/><span><b>Procurement Agent.</b> Reads RFQs, looks up stock, drafts the quote in your template, routes for approval over WhatsApp.</span></li>
            <li><i data-lucide="check"/><span><b>Collections Agent.</b> Watches overdue invoices, sends staggered follow-ups in Arabic or English, escalates by day-7.</span></li>
            <li><i data-lucide="check"/><span><b>Executive Agent.</b> Compiles the owner's morning briefing from ERP, finance, and ops, 7 decisions, one message.</span></li>
          </ul>
          <div className="svc-meta">
            <span><i data-lucide="zap"/>Always-on</span>
            <span><i data-lucide="shield-check"/>Audit-logged</span>
            <span><i data-lucide="users"/>Human approval gates</span>
          </div>
        </div>
        <div className="svc-visual">
          <div className="sys-mini-head" style={{marginBottom:10}}>
            <span><span className="live"/>ADYAN · Procurement Agent</span>
            <span>SYNCED 09:42</span>
          </div>
          <div className="sys-mini-rows">
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="mail"/></div>
              <div><div style={{fontWeight:500}}>RFQ from Al-Marai received</div><div style={{fontSize:11,color:"var(--fg-3)"}}>14 SKUs · matched to catalog</div></div>
              <span className="pill badge-ok">PARSED</span>
            </div>
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="boxes"/></div>
              <div><div style={{fontWeight:500}}>Stock lookup · ERP/Odoo</div><div style={{fontSize:11,color:"var(--fg-3)"}}>12 in stock · 2 partial · 4-day ETA</div></div>
              <span className="pill badge-ok">DONE</span>
            </div>
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="file-text"/></div>
              <div><div style={{fontWeight:500}}>Quote drafted · template v3</div><div style={{fontSize:11,color:"var(--fg-3)"}}>Margin 18.4% · awaiting sales lead</div></div>
              <span className="pill badge-pending">PENDING</span>
            </div>
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="message-circle"/></div>
              <div><div style={{fontWeight:500}}>Approval sent → Sales Lead</div><div style={{fontSize:11,color:"var(--fg-3)"}}>WhatsApp · reply with ✓ or ✗</div></div>
              <span className="pill badge-run">RUNNING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Service 2: Workflow Automation =====
function SvcAutomation() {
  return (
    <section className="section section--elev" id="automation" data-screen-label="03 Automation">
      <div className="svc-row reverse">
        <div className="svc-visual">
          <div className="sys-mini-head" style={{marginBottom:14}}>
            <span><span className="live"/>Workflow · invoice-to-payment</span>
            <span>RUN 12.4k / wk</span>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:6, position:"relative", zIndex:1, alignItems:"center"}}>
            {[
              {ic:"mail",       l:"Email in"},
              {ic:"file-search",l:"Parse PDF"},
              {ic:"database",   l:"Match PO"},
              {ic:"shield-check",l:"Approve"},
              {ic:"banknote",   l:"Schedule"},
            ].map((s, idx, arr) => (
              <React.Fragment key={s.l}>
                <div style={{padding:"12px 10px", background:"rgba(13,29,41,.6)", border:"1px solid var(--border-1)", borderRadius:12, textAlign:"center"}}>
                  <div style={{width:32, height:32, borderRadius:8, background:"rgba(26,117,222,.14)", border:"1px solid rgba(26,117,222,.3)", color:"var(--accent)", display:"grid", placeItems:"center", margin:"0 auto 8px"}}>
                    <i data-lucide={s.ic} style={{width:14, height:14}}/>
                  </div>
                  <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"var(--fg-2)", letterSpacing:".08em"}}>{s.l.toUpperCase()}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="sys-mini-rows" style={{marginTop:16}}>
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="activity"/></div>
              <div><div style={{fontWeight:500}}>Avg. cycle time</div><div style={{fontSize:11,color:"var(--fg-3)"}}>3.4 days → 7 hours</div></div>
              <span className="pill badge-ok">−79%</span>
            </div>
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="alert-triangle"/></div>
              <div><div style={{fontWeight:500}}>Exceptions routed</div><div style={{fontSize:11,color:"var(--fg-3)"}}>4 awaiting human review</div></div>
              <span className="pill badge-pending">QUEUE</span>
            </div>
          </div>
        </div>
        <div>
          <span className="svc-num">02 / Service</span>
          <h3>Workflow Automation that survives Monday morning.</h3>
          <p className="lede">
            I map the workflow as it actually runs, including the exceptions
            then build automation around it. Triggers, parsing, ERP writes,
            approvals, retries, alerts. The mundane handled silently. The edge
            cases surfaced clearly.
          </p>
          <ul className="svc-bullets">
            <li><i data-lucide="check"/><span><b>Invoice-to-payment</b>, parsing, matching, approval routing, payment scheduling.</span></li>
            <li><i data-lucide="check"/><span><b>Quote-to-cash</b>, RFQ in, quote out, follow-ups timed, win-rate tracked.</span></li>
            <li><i data-lucide="check"/><span><b>Onboarding & approvals</b>, KYC, contracts, internal sign-offs, audit log.</span></li>
            <li><i data-lucide="check"/><span><b>Reporting cadence</b>, daily, weekly, monthly briefings compiled and delivered to the right channel.</span></li>
          </ul>
          <div className="svc-meta">
            <span><i data-lucide="git-branch"/>Branching logic</span>
            <span><i data-lucide="repeat-2"/>Retries + backoff</span>
            <span><i data-lucide="bell"/>Smart alerts</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Service 3: WhatsApp AI Assistants (KEY service for SA) =====
function SvcWhatsApp() {
  return (
    <section className="section" id="whatsapp" data-screen-label="04 WhatsApp">
      <div className="svc-row">
        <div>
          <span className="svc-num">03 / Service · Most popular in KSA</span>
          <h3>WhatsApp AI Assistants, operations from a single chat.</h3>
          <p className="lede">
            In Saudi Arabia, WhatsApp is the operating system of business. I build
            AI assistants that live inside your business WhatsApp number, fluent
            in Arabic and English, so your team, customers, and suppliers can
            run operations the way they already communicate.
          </p>
          <ul className="svc-bullets">
            <li><i data-lucide="check"/><span><b>Send a message, get the work done.</b> "اعمل عرض سعر للزبون ده" → quote drafted, sent, logged.</span></li>
            <li><i data-lucide="check"/><span><b>Customer self-service.</b> Order status, balance, invoices, delivery ETA, all on chat.</span></li>
            <li><i data-lucide="check"/><span><b>Bilingual by default.</b> Replies in the language the customer wrote in. Switches mid-thread without losing context.</span></li>
            <li><i data-lucide="check"/><span><b>Approvals on chat.</b> Reply with ✓ or ✗. The agent records who, when, and why.</span></li>
            <li><i data-lucide="check"/><span><b>Group-aware.</b> Routes messages by group, Sales, Procurement, Site, without crossing the wires.</span></li>
          </ul>
          <div className="svc-meta">
            <span><i data-lucide="languages"/>Arabic + English</span>
            <span><i data-lucide="badge-check"/>WhatsApp Business API</span>
            <span><i data-lucide="lock"/>Signed audit log</span>
          </div>
        </div>
        <div className="svc-visual">
          <div className="wa-mock">
            <div className="wa-head">
              <div className="av">A</div>
              <div className="meta">
                <div className="name">ADYAN · Operations Assistant</div>
                <div className="status">● online · responds in seconds</div>
              </div>
            </div>
            <div className="wa-bubble from-user">
              مرحبا، عميل المرعى طلب عرض سعر لـ 14 منتج.
              <span className="ts">09:41 ✓✓</span>
            </div>
            <div className="wa-bubble from-agent">
              تمام. وجدت الـ 14 منتج في الكاتلوج. 12 متوفر، 2 جزئي (ETA 4 أيام). هامش 18.4%. أرسل العرض جاهز للموافقة؟
              <span className="ts">09:41</span>
            </div>
            <div className="wa-bubble from-user">
              ✓ أرسل
              <span className="ts">09:42 ✓✓</span>
            </div>
            <div className="wa-bubble from-agent">
              تم. عرض السعر #4821 أُرسل للعميل. سأتابع بعد 48 ساعة إن لم يردّ.
              <span className="ts">09:42</span>
            </div>
            <div className="wa-typing" aria-label="Typing"><i/><i/><i/></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Service 4: Voice Agents =====
function SvcVoice() {
  const heights = [8,14,22,18,28,16,24,32,18,12,20,26,14,22,16,28,20,12,8];
  return (
    <section className="section section--elev" id="voice" data-screen-label="05 Voice">
      <div className="svc-row reverse">
        <div className="svc-visual">
          <div className="voice-mock">
            <div className="voice-call">
              <div className="pic">N</div>
              <div className="meta">
                <div className="who">Nasser · Site Engineer</div>
                <div className="what"><span className="live"/>Voice note to ADYAN agent</div>
              </div>
              <div className="timer">0:18</div>
            </div>
            <div className="wa-voice" style={{alignSelf:"stretch", maxWidth:"100%"}}>
              <div className="play"><i data-lucide="play"/></div>
              <div className="wave">
                {heights.map((h,i) => <i key={i} style={{height: h}}/>)}
              </div>
              <div className="dur">0:18</div>
            </div>
            <div className="voice-transcript">
              <div className="voice-line muted">
                <span className="spk">User</span>
                <span className="txt">"I'm on site, no signal for the app. Log 24 cubic metres of concrete delivered to Block C, slip number 4-7-1-8-2. Notify the QC team and update the daily report."</span>
              </div>
              <div className="voice-line">
                <span className="spk agent">Agent</span>
                <span className="txt">Logged: 24m³ concrete · Block C · slip 47182. QC pinged on WhatsApp. Daily report for site #B12 updated. Confirmation sent to your phone.</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="svc-num">04 / Service</span>
          <h3>Voice Agents, for the team that's never at a desk.</h3>
          <p className="lede">
            Some of your team works in trucks, on sites, in warehouses. They will
            never open a dashboard. My voice agents let them dictate the work 
            in Arabic or English, over a phone call or a WhatsApp voice note 
            and the system does the rest.
          </p>
          <ul className="svc-bullets">
            <li><i data-lucide="check"/><span><b>WhatsApp voice notes.</b> Drop a 20-second message; the agent transcribes, understands intent, and acts.</span></li>
            <li><i data-lucide="check"/><span><b>Inbound calls.</b> Answer customer calls 24/7, order status, balances, callbacks scheduled. No IVR maze.</span></li>
            <li><i data-lucide="check"/><span><b>Outbound calls.</b> Reminders, confirmations, COD pre-calls, handled at scale, with full transcripts.</span></li>
            <li><i data-lucide="check"/><span><b>Driving-safe.</b> One press, one voice note. The system writes the email, updates the ERP, books the meeting.</span></li>
          </ul>
          <div className="svc-meta">
            <span><i data-lucide="phone-incoming"/>Inbound + Outbound</span>
            <span><i data-lucide="file-text"/>Full transcripts</span>
            <span><i data-lucide="languages"/>Arabic dialects</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Service 5: ERP & CRM Integrations =====
function SvcERP() {
  const systems = ["Odoo", "SAP B1", "Zoho", "Microsoft 365", "Salesforce", "QuickBooks", "Bayzat", "Tally", "Oracle", "ZATCA", "Xero", "Sage"];
  return (
    <section className="section" id="erp" data-screen-label="06 ERP">
      <div className="svc-row">
        <div>
          <span className="svc-num">05 / Service</span>
          <h3>ERP & CRM Integrations that make your data move.</h3>
          <p className="lede">
            The bottleneck in most operations isn't the ERP, it's the friction
            between systems. I build the bridges, the syncs, the API layers, the
            ZATCA-compliant invoice flows, so your tools talk to each other and
            your team stops re-entering data.
          </p>
          <ul className="svc-bullets">
            <li><i data-lucide="check"/><span><b>Bidirectional syncs.</b> ERP ↔ CRM ↔ accounting ↔ WhatsApp, one source of truth, never out of date.</span></li>
            <li><i data-lucide="check"/><span><b>ZATCA Phase-2 ready.</b> e-invoicing, QR codes, signing, built into the workflow, not bolted on.</span></li>
            <li><i data-lucide="check"/><span><b>Custom APIs.</b> When the off-the-shelf connector doesn't exist, I build it.</span></li>
            <li><i data-lucide="check"/><span><b>Migration support.</b> Moving from spreadsheets, or between ERPs? I model, map, and migrate without losing audit history.</span></li>
          </ul>
          <div className="svc-meta">
            <span><i data-lucide="repeat"/>Real-time sync</span>
            <span><i data-lucide="shield-check"/>ZATCA Phase 2</span>
            <span><i data-lucide="file-cog"/>Custom connectors</span>
          </div>
        </div>
        <div className="svc-visual">
          <div className="sys-mini-head" style={{marginBottom:14}}>
            <span><span className="live"/>Integration map · 12 systems wired</span>
            <span>HEALTHY</span>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, position:"relative", zIndex:1}}>
            {systems.map(s => (
              <div key={s} style={{padding:"12px 10px", background:"rgba(13,29,41,.55)", border:"1px solid var(--border-1)", borderRadius:10, display:"flex", alignItems:"center", gap:10}}>
                <div style={{width:24, height:24, borderRadius:6, background:"rgba(26,117,222,.14)", border:"1px solid rgba(26,117,222,.3)", display:"grid", placeItems:"center"}}>
                  <span style={{fontFamily:"var(--font-mono)", fontSize:10, color:"var(--accent)", fontWeight:700}}>{s[0]}</span>
                </div>
                <span style={{fontFamily:"var(--font-body)", fontSize:12, color:"var(--fg-1)"}}>{s}</span>
                <span style={{marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#2BD17E"}}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Service 6: Apps & Dashboards =====
function SvcApps() {
  return (
    <section className="section section--elev" id="apps" data-screen-label="07 Apps">
      <div className="svc-row reverse">
        <div className="svc-visual">
          <div className="sys-mini-head" style={{marginBottom:14}}>
            <span><span className="live"/>Mission Control · Operations</span>
            <span>LAST SYNC 14:02</span>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, position:"relative", zIndex:1, marginBottom:10}}>
            <div className="mock-kpi"><div className="lbl">Open POs</div><div className="val">142</div><div className="delta">▲ 6 vs yest</div></div>
            <div className="mock-kpi"><div className="lbl">Collections at risk</div><div className="val">384k</div><div className="delta warn">▲ 2 flagged</div></div>
            <div className="mock-kpi"><div className="lbl">Auto-resolved</div><div className="val">88<span style={{fontSize:14, color:"var(--accent)"}}>%</span></div><div className="delta">▲ 4.2 pts</div></div>
          </div>
          <div className="sys-mini-rows">
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="bar-chart-3"/></div>
              <div><div style={{fontWeight:500}}>Owner Briefing · 06:30</div><div style={{fontSize:11,color:"var(--fg-3)"}}>7 decisions queued · WhatsApp + email</div></div>
              <span className="pill badge-ok">SENT</span>
            </div>
            <div className="sys-mini-row">
              <div className="ic"><i data-lucide="users"/></div>
              <div><div style={{fontWeight:500}}>Team capacity heatmap</div><div style={{fontSize:11,color:"var(--fg-3)"}}>3 teams over, 5 under-utilised</div></div>
              <span className="pill badge-pending">REVIEW</span>
            </div>
          </div>
        </div>
        <div>
          <span className="svc-num">06 / Service</span>
          <h3>Custom Apps & Dashboards, a single pane on operations.</h3>
          <p className="lede">
            When the off-the-shelf tool can't see what you need to see, I build
            the app. Internal tools, ops dashboards, executive briefings, built
            on the data your agents and integrations already gather, designed for
            the role that actually uses it.
          </p>
          <ul className="svc-bullets">
            <li><i data-lucide="check"/><span><b>Mission Control.</b> One screen showing what's running, what's stuck, what needs a decision.</span></li>
            <li><i data-lucide="check"/><span><b>Role-specific apps.</b> Sales rep on mobile, finance lead on laptop, owner on WhatsApp, same data, three views.</span></li>
            <li><i data-lucide="check"/><span><b>Executive briefings.</b> Auto-compiled and delivered, daily, weekly, or on a question. No more "send me the numbers" by email.</span></li>
            <li><i data-lucide="check"/><span><b>Operations heatmaps.</b> Where is capacity tight? Where is cash sitting? Where are deals stalling?</span></li>
          </ul>
          <div className="svc-meta">
            <span><i data-lucide="smartphone"/>Mobile-first</span>
            <span><i data-lucide="palette"/>White-label</span>
            <span><i data-lucide="lock"/>Role-based access</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Site() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="adyan-site" data-screen-label="ADYAN · Services">
      <SiteNav current="services"/>
      <Breadcrumb trail={[{label:"Services"}]}/>
      <main id="main">
      <ServicesHero/>
      <ServicesNav/>
      <SvcStatement/>
      <SvcAgents/>
      <SvcAutomation/>
      <SvcWhatsApp/>
      <SvcVoice/>
      <SvcERP/>
      <SvcApps/>
      <AuditCTAStrip/>
      </main>
      <SiteFooter/>
      <StickyAuditBar/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
