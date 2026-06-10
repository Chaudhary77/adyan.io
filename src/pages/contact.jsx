import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";

const ReactDOM = { createRoot };
const { SiteNav, SiteFooter, StickyAuditBar, Breadcrumb } = window;

/* ===================================================================
   FORM SUBMISSION  ―  how audit requests reach ADYAN.
   -------------------------------------------------------------------
   Two delivery paths, in priority order:

   1) CONTACT_ENDPOINT (preferred for silent server-side capture):
      paste any URL that accepts a JSON POST — Formspree, Basin,
      Getform, an n8n/Make webhook, or your own API. Example:
          const CONTACT_ENDPOINT = "https://formspree.io/f/abcd1234";
      When set, the request is POSTed in the background and the user
      sees the success screen without leaving the page.

   2) No endpoint set (default, zero-backend, works on deploy today):
      the form hands the visitor off to WhatsApp with a fully
      pre-filled, structured brief — and the UI is explicit that the
      visitor must press send there to deliver it. An email path
      composes the same brief via mailto.
   =================================================================== */
const CONTACT_ENDPOINT = "";              // e.g. "https://formspree.io/f/your-id"
const CONTACT_EMAIL    = "mail@adyan.io";
const CONTACT_WHATSAPP = "966508183984";  // delivery number (no +, no spaces)

function ContactHero() {
  return (
    <section className="page-hero" data-screen-label="01 Contact Hero">
      <div className="page-hero-inner">
        <div className="page-hero-left">
          <div className="eyebrow"><span className="eyebrow-dot"/> Book a Systems Audit</div>
          <h1>Two weeks to a real plan.<br/><span className="accent-word">Your first system live in 4–6.</span></h1>
          <p className="lede">
            Tell me a little about your operation and send it over WhatsApp or
            email. I reply within one business day with call times, and on the
            call we walk your highest-friction workflow and map a phased
            buildout. No pitch decks, no commitment.
          </p>
        </div>
        <div className="page-hero-meta">
          <div className="item"><div className="lbl">Cost</div><div className="val">Free · no commitment</div></div>
          <div className="item"><div className="lbl">Response</div><div className="val">Within 24 hours</div></div>
          <div className="item"><div className="lbl">Languages</div><div className="val">Arabic · English</div></div>
          <div className="item"><div className="lbl">Channel</div><div className="val">WhatsApp · Email · Call</div></div>
        </div>
      </div>
    </section>
  );
}

// ---- Presentational form card (controlled by BookingFlow) ----
function QualificationForm({ v, errors, onField, status, onSendWhatsApp, onSendEmail }) {
  const field = (id, label, opts = {}) => {
    const invalid = !!errors[id];
    const errId = id + "-err";
    const a11y = invalid ? { "aria-invalid": true, "aria-describedby": errId } : {};
    return (
      <div className={"form-row" + (opts.full ? " full" : "") + (invalid ? " invalid" : "")}>
        <label htmlFor={id}>{label}</label>
        {opts.el === "textarea" ? (
          <textarea id={id} value={v[id]} placeholder={opts.placeholder}
            onChange={(e) => onField(id, e.target.value)} {...a11y} />
        ) : opts.el === "select" ? (
          <select id={id} value={v[id]} onChange={(e) => onField(id, e.target.value)} {...a11y}>
            <option value="" disabled>Select…</option>
            {opts.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input id={id} type={opts.type || "text"} value={v[id]} placeholder={opts.placeholder}
            onChange={(e) => onField(id, e.target.value)} {...a11y} />
        )}
        {invalid && <span className="err-msg" id={errId}>{errors[id]}</span>}
      </div>
    );
  };

  const busy = status === "submitting";

  return (
    <div className="contact-form-card" style={{ maxWidth: 760, margin: "0 auto" }}>
      <h3>Tell me about your operation</h3>
      <p className="sub">Five fields. Two minutes. So the call starts where it should, with the work, not the introductions.</p>
      <form className="form-grid" onSubmit={(e) => e.preventDefault()} noValidate>
        {field("name", "Your name", { placeholder: "e.g. Faisal Al-Saud" })}
        {field("company", "Company", { placeholder: "e.g. Building Chemistry Industry" })}
        {field("email", "Work email", { type: "email", placeholder: "you@company.com" })}
        {field("phone", "WhatsApp number", { type: "tel", placeholder: "+966 50 818 3984" })}
        {field("industry", "Industry", { el: "select", options: ["Construction","Manufacturing","Industrial Suppliers","Contracting","Logistics","Real Estate","Hospitality / F&B","Other"] })}
        {field("size", "Team size", { el: "select", options: ["Under 25","25 – 100","100 – 500","500 – 2,000","2,000+"] })}
        {field("problem", "What's the highest-friction workflow today?", { el: "textarea", full: true, placeholder: "e.g. Sales reps spend 3 hours a day quoting over WhatsApp, slow, inconsistent, disconnected from stock." })}
        {field("tools", "Tools in play (ERP, CRM, accounting)", { full: true, placeholder: "e.g. Odoo + Salesforce + ZATCA + WhatsApp Business" })}
        {field("preferred", "Preferred days/times (optional)", { full: true, placeholder: "e.g. Sun–Tue mornings, Khobar time" })}
      </form>
      <div className="form-note">
        <i data-lucide="message-circle"></i>
        <span>
          The button below opens WhatsApp with your brief pre-filled — <strong>press
          send there to deliver it</strong>. I reply within one business day with
          2–3 call slots. Your details are never shared.
        </span>
      </div>
      <div className="contact-submit" style={{ flexDirection: "column", alignItems: "stretch" }}>
        <button type="button"
          className={"btn-primary" + (busy ? " is-busy" : "")}
          disabled={busy}
          style={{ justifyContent: "center" }}
          onClick={onSendWhatsApp}>
          {busy ? "Sending…" : "Send my brief on WhatsApp"} <span className="arr"/>
        </button>
        <button type="button" className="btn-secondary" style={{ justifyContent: "center" }} onClick={onSendEmail}>
          Prefer email? Send the same brief
        </button>
        {status === "error" && (
          <div className="submit-error">
            <i data-lucide="alert-circle"></i>
            <span>Something went wrong sending that. Please try again, or reach me on WhatsApp at +966 50 818 3984.</span>
          </div>
        )}
        <small style={{ marginTop: 10 }}>I respond within one business day and never share your details with anyone.</small>
      </div>
    </div>
  );
}

function BookingSuccess({ data, onReset, onReopen }) {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const viaWhatsApp = data.via === "whatsapp";
  const viaEmail = data.via === "email";
  return (
    <div className="booking-success" data-screen-label="Brief Ready">
      <div className="ok-ic"><i data-lucide="check"></i></div>
      {viaWhatsApp ? (
        <React.Fragment>
          <h3>Almost done — press send in WhatsApp.</h3>
          <p>
            Your brief is pre-filled in the WhatsApp tab that just opened,
            {data.name ? ` ${data.name.split(" ")[0]}` : ""}. Once you send it,
            I reply within one business day with a short plan for the call and
            2–3 time options.
          </p>
          <p>If the tab didn't open, use the button below.</p>
          <div className="ok-actions">
            <button type="button" className="btn-primary" onClick={onReopen}>Open WhatsApp again <span className="arr"/></button>
            <button type="button" className="btn-secondary" onClick={onReset}>Edit my brief</button>
          </div>
        </React.Fragment>
      ) : viaEmail ? (
        <React.Fragment>
          <h3>Almost done — send the email.</h3>
          <p>
            Your brief is drafted in your email app, addressed to {CONTACT_EMAIL}.
            Once you send it, I reply within one business day with call times.
          </p>
          <div className="ok-actions">
            <a className="btn-primary" href="https://wa.me/966508183984" target="_blank" rel="noopener">Or message me on WhatsApp <span className="arr"/></a>
            <button type="button" className="btn-secondary" onClick={onReset}>Edit my brief</button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3>Request received{data.name ? `, ${data.name.split(" ")[0]}` : ""}.</h3>
          <p>Thanks for the details on {data.company || "your operation"}. I'll review your highest-friction workflow and reply within one business day with call times.</p>
          <div className="ok-actions">
            <a className="btn-primary" href="https://wa.me/966508183984" target="_blank" rel="noopener">Message me on WhatsApp <span className="arr"/></a>
            <button type="button" className="btn-secondary" onClick={onReset}>Send another brief</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function BookingFlow() {
  const [v, setV] = React.useState({
    name: "", company: "", email: "", phone: "", industry: "", size: "", problem: "", tools: "", preferred: ""
  });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | submitting | error | done
  const [doneData, setDoneData] = React.useState(null);

  const onField = (id, val) => {
    setV((prev) => ({ ...prev, [id]: val }));
    setErrors((prev) => { if (!prev[id]) return prev; const n = { ...prev }; delete n[id]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = "Please add your name.";
    if (!v.company.trim()) e.company = "Please add your company.";
    if (!v.email.trim()) e.email = "Please add a work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "That email doesn't look right.";
    if (!v.problem.trim()) e.problem = "Tell me the workflow so the call is useful.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildPayload = () => ({
    ...v,
    timezone: "Asia/Riyadh (GMT+3)",
    _subject: `Systems Audit request — ${v.name}${v.company ? ", " + v.company : ""}`,
    submittedAt: new Date().toISOString(),
  });

  // Build the structured, human-readable brief shared by both channels.
  const composeBody = (p) => [
    `New Systems Audit request — ${p.name}${p.company ? ", " + p.company : ""}`,
    ``,
    `Name: ${p.name}`,
    `Company: ${p.company}`,
    `Email: ${p.email}`,
    `WhatsApp: ${p.phone || "—"}`,
    `Industry: ${p.industry || "—"}`,
    `Team size: ${p.size || "—"}`,
    `Tools: ${p.tools || "—"}`,
    `Preferred times: ${p.preferred || "—"}`,
    ``,
    `Highest-friction workflow:`,
    p.problem,
  ].join("\n");

  const waUrl = (p) =>
    `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(composeBody(p))}`;
  const mailtoUrl = (p) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(p._subject)}&body=${encodeURIComponent(composeBody(p))}`;

  // When a server endpoint is configured, capture silently and show the
  // confirmation screen; otherwise hand off to the chosen channel.
  const submit = async (via) => {
    if (!validate()) return;
    const payload = buildPayload();
    if (CONTACT_ENDPOINT) {
      setStatus("submitting");
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Bad status " + res.status);
        setDoneData({ ...payload, via: "endpoint" });
        setStatus("done");
      } catch (err) {
        console.error("Contact submit failed:", err);
        setStatus("error");
      }
      return;
    }
    if (via === "whatsapp") {
      const win = window.open(waUrl(payload), "_blank", "noopener");
      if (!win) {
        // Popup blocked → fall back to the email draft instead of losing the brief.
        window.location.href = mailtoUrl(payload);
        setDoneData({ ...payload, via: "email" });
      } else {
        setDoneData({ ...payload, via: "whatsapp" });
      }
    } else {
      window.location.href = mailtoUrl(payload);
      setDoneData({ ...payload, via: "email" });
    }
    setStatus("done");
  };

  const reopen = () => {
    if (!doneData) return;
    const win = window.open(waUrl(doneData), "_blank", "noopener");
    if (!win) window.location.href = mailtoUrl(doneData);
  };

  // "Edit my brief" keeps the values; the visitor only fixes what they need.
  const reset = () => {
    setErrors({});
    setDoneData(null);
    setStatus("idle");
  };

  if (status === "done" && doneData) {
    return (
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <BookingSuccess data={doneData} onReset={reset} onReopen={reopen} />
      </div>
    );
  }

  return (
    <QualificationForm
      v={v} errors={errors} onField={onField}
      status={status}
      onSendWhatsApp={() => submit("whatsapp")}
      onSendEmail={() => submit("email")}
    />
  );
}

function ContactSide() {
  return (
    <section className="section section--tight" data-screen-label="03 Side Channels">
      <div className="section-head-c" style={{marginBottom:32}}>
        <h2 style={{fontSize:"clamp(28px,3vw,38px)"}}>Prefer another channel?</h2>
        <p className="lede">All three reach me directly. Response within one business day.</p>
      </div>
      <div className="contact-side" style={{marginTop:0, gridTemplateColumns:"repeat(3,1fr)"}}>
        <div className="tile">
          <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
            <div style={{width:36, height:36, borderRadius:9, background:"rgba(43,209,126,.1)", border:"1px solid rgba(43,209,126,.3)", color:"#2BD17E", display:"grid", placeItems:"center"}}>
              <i data-lucide="message-circle" style={{width:18, height:18}}/>
            </div>
            <div className="lbl">WhatsApp</div>
          </div>
          <div className="val"><a href="https://wa.me/966508183984" target="_blank" rel="noopener">+966 50 818 3984</a></div>
          <p style={{fontSize:12.5, color:"var(--fg-3)", marginTop:8, lineHeight:1.5}}>Send a message or a voice note, Arabic or English. I reply within one business day.</p>
        </div>
        <div className="tile">
          <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
            <div style={{width:36, height:36, borderRadius:9, background:"rgba(26,117,222,.1)", border:"1px solid rgba(26,117,222,.3)", color:"var(--accent)", display:"grid", placeItems:"center"}}>
              <i data-lucide="mail" style={{width:18, height:18}}/>
            </div>
            <div className="lbl">Email</div>
          </div>
          <div className="val"><a href="mailto:mail@adyan.io">mail@adyan.io</a></div>
          <p style={{fontSize:12.5, color:"var(--fg-3)", marginTop:8, lineHeight:1.5}}>Best for detailed briefs, NDAs, and procurement teams. Reply within one business day.</p>
        </div>
        <div className="tile">
          <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
            <div style={{width:36, height:36, borderRadius:9, background:"rgba(232,166,58,.1)", border:"1px solid rgba(232,166,58,.3)", color:"#e8a63a", display:"grid", placeItems:"center"}}>
              <i data-lucide="map-pin" style={{width:18, height:18}}/>
            </div>
            <div className="lbl">In person</div>
          </div>
          <div className="val">Khobar · Eastern Province</div>
          <p style={{fontSize:12.5, color:"var(--fg-3)", marginTop:8, lineHeight:1.5}}>By appointment, when remote won't do. I come to your office, or you come to mine.</p>
        </div>
      </div>
    </section>
  );
}

function Site() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <div className="adyan-site" data-screen-label="ADYAN · Contact">
      <SiteNav current="contact"/>
      <Breadcrumb trail={[{label:"Contact"}]}/>
      <main id="main">
        <ContactHero/>
        <section className="section" data-screen-label="02 Contact Form">
          <BookingFlow/>
        </section>
        <ContactSide/>
      </main>
      <SiteFooter/>
      <StickyAuditBar/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
