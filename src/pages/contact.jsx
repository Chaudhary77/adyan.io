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
      pre-filled, structured message to the number below — native to
      this audience and reliable on every device. A mailto fallback
      covers the rare case WhatsApp can't open.
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
          <h1>Two weeks. A real plan.<br/><span className="accent-word">A first system live in 4–6.</span></h1>
          <p className="lede">
            Tell us a little about your operation, then pick a 30-minute slot.
            On the call we walk your highest-friction workflow, confirm whether
            it's a fit, and, if so, propose a phased buildout. No pitch decks,
            no commitment to anything beyond the call.
          </p>
        </div>
        <div className="page-hero-meta">
          <div className="item"><div className="lbl">Call duration</div><div className="val">30 minutes</div></div>
          <div className="item"><div className="lbl">Cost</div><div className="val">Free · no commitment</div></div>
          <div className="item"><div className="lbl">Response</div><div className="val">Within 24 hours</div></div>
          <div className="item"><div className="lbl">Languages</div><div className="val">Arabic · English</div></div>
        </div>
      </div>
    </section>
  );
}

// ---- Presentational form card (controlled by BookingFlow) ----
function QualificationForm({ v, errors, onField }) {
  const field = (id, label, opts = {}) => {
    const invalid = !!errors[id];
    return (
      <div className={"form-row" + (opts.full ? " full" : "") + (invalid ? " invalid" : "")}>
        <label htmlFor={id}>{label}</label>
        {opts.el === "textarea" ? (
          <textarea id={id} value={v[id]} placeholder={opts.placeholder}
            onChange={(e) => onField(id, e.target.value)} />
        ) : opts.el === "select" ? (
          <select id={id} value={v[id]} onChange={(e) => onField(id, e.target.value)}>
            <option value="" disabled>Select…</option>
            {opts.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input id={id} type={opts.type || "text"} value={v[id]} placeholder={opts.placeholder}
            onChange={(e) => onField(id, e.target.value)} />
        )}
        {invalid && <span className="err-msg">{errors[id]}</span>}
      </div>
    );
  };

  return (
    <div className="contact-form-card">
      <h3>Tell us about your operation</h3>
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
      </form>
      <div className="form-note">
        <i data-lucide="arrow-right-circle"></i>
        <span>Pick a 30-minute slot on the right, then confirm. We respond within one business day and never share your details.</span>
      </div>
    </div>
  );
}

// ---- Presentational calendar card (controlled by BookingFlow) ----
function CalendarPicker({ selectedDay, setSelectedDay, selectedSlot, setSelectedSlot, status, onSubmit }) {
  const today = new Date();
  const [month, setMonth] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));

  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const monthName = month.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const firstWeekday = (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ muted: true, n: "" });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(month.getFullYear(), month.getMonth(), d);
    const dow = date.getDay();
    const isWeekend = (dow === 5 || dow === 6); // Fri/Sat weekend in KSA
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday = date.toDateString() === today.toDateString();
    cells.push({ muted: false, n: d, date, isWeekend, isPast, isToday, available: !isWeekend && !isPast });
  }
  while (cells.length % 7 !== 0) cells.push({ muted: true, n: "" });
  while (cells.length < 42) cells.push({ muted: true, n: "" });

  const slots = [
    { t: "09:30", gone: false }, { t: "10:30", gone: false }, { t: "11:30", gone: true },
    { t: "13:00", gone: false }, { t: "14:00", gone: false }, { t: "15:30", gone: false },
    { t: "16:30", gone: true }, { t: "17:30", gone: false }, { t: "18:30", gone: false },
  ];

  const slotLabel = selectedDay
    ? `Available · ${selectedDay.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}`
    : "Available · pick a date first";

  const prevMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  const nextMonth = () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  const busy = status === "submitting";
  const ready = !!(selectedDay && selectedSlot) && !busy;

  return (
    <div className="contact-cal-card">
      <h3>Pick a 30-minute slot</h3>
      <p className="sub">All slots are in Khobar time (GMT+3). I respect Friday + Saturday as the local weekend.</p>

      <div className="cal-head">
        <div className="month">{monthName}</div>
        <div className="nav">
          <button type="button" aria-label="Previous month" onClick={prevMonth}><i data-lucide="chevron-left"/></button>
          <button type="button" aria-label="Next month" onClick={nextMonth}><i data-lucide="chevron-right"/></button>
        </div>
      </div>

      <div className="cal-week">
        {["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="cal-grid">
        {cells.map((c, i) => {
          if (c.muted) return <div key={i} className="cal-day muted"/>;
          const isSel = selectedDay && selectedDay.toDateString() === c.date.toDateString();
          const cls = ["cal-day"];
          if (c.isPast || c.isWeekend) cls.push("disabled"); else cls.push("available");
          if (c.isToday) cls.push("today");
          if (isSel) cls.push("selected");
          return (
            <div key={i} className={cls.join(" ")}
              onClick={() => { if (c.isPast || c.isWeekend) return; setSelectedDay(c.date); setSelectedSlot(null); }}>
              {c.n}
            </div>
          );
        })}
      </div>

      <div className="cal-slots">
        <div className="label">{slotLabel}</div>
        <div className="cal-slots-grid">
          {slots.map(s => {
            const disabled = s.gone || !selectedDay;
            const sel = selectedSlot === s.t;
            const cls = ["cal-slot"];
            if (s.gone) cls.push("gone");
            if (sel) cls.push("selected");
            return (
              <div key={s.t} className={cls.join(" ")}
                onClick={() => { if (!disabled) setSelectedSlot(s.t); }}
                style={{ opacity: disabled && !s.gone ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
                {s.t}
              </div>
            );
          })}
        </div>
      </div>

      <div className="cal-tz"><i data-lucide="globe"/> Khobar · GMT+3 · auto-converted to your timezone on confirmation</div>

      <div className="contact-submit" style={{ marginTop: 22, flexDirection: "column", alignItems: "stretch" }}>
        <button type="button"
          className={"btn-primary" + (busy ? " is-busy" : "")}
          disabled={!ready}
          style={{ justifyContent: "center", opacity: ready ? 1 : 0.5, cursor: ready ? "pointer" : "not-allowed" }}
          onClick={onSubmit}>
          {busy ? "Sending…" : "Confirm Systems Audit"} <span className="arr"/>
        </button>
        {status === "error" && (
          <div className="submit-error">
            <i data-lucide="alert-circle"></i>
            <span>Something went wrong sending that. Please try again, or reach us on WhatsApp at +966 50 818 3984.</span>
          </div>
        )}
        <small style={{ color: "var(--fg-3)", marginTop: 10 }}>By confirming you agree to a one-business-day response. We don't share your details with anyone.</small>
      </div>
    </div>
  );
}

function BookingSuccess({ data, onReset }) {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const slotText = data.dateLabel ? `${data.dateLabel} · ${data.slot} (Khobar, GMT+3)` : "your requested slot";
  return (
    <div className="booking-success" data-screen-label="Booking Confirmed">
      <div className="ok-ic"><i data-lucide="check"></i></div>
      <h3>Request received, {data.name.split(" ")[0] || "thanks"}.</h3>
      <p>Thanks for the details on {data.company || "your operation"}. We'll review your highest-friction workflow before the call so we walk in already up to speed.</p>
      <div className="booking-recap"><i data-lucide="calendar-check"></i> {slotText}</div>
      <p>You'll get a confirmation on WhatsApp and email within one business day. If anything changes, just reply to either.</p>
      <div className="ok-actions">
        <a className="btn-primary" href="https://wa.me/966508183984" target="_blank" rel="noopener">Message us on WhatsApp <span className="arr"/></a>
        <button type="button" className="btn-secondary" onClick={onReset}>Book another slot</button>
      </div>
    </div>
  );
}

function BookingFlow() {
  const [v, setV] = React.useState({
    name: "", company: "", email: "", phone: "", industry: "", size: "", problem: "", tools: ""
  });
  const [errors, setErrors] = React.useState({});
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
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
    if (!v.problem.trim()) e.problem = "Tell us the workflow so the call is useful.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildPayload = () => {
    const dateLabel = selectedDay
      ? selectedDay.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : "";
    return {
      ...v,
      date: selectedDay ? selectedDay.toISOString().slice(0, 10) : "",
      dateLabel,
      slot: selectedSlot || "",
      timezone: "Asia/Riyadh (GMT+3)",
      _subject: `Systems Audit request — ${v.name}${v.company ? ", " + v.company : ""}`,
      submittedAt: new Date().toISOString(),
    };
  };

  // Build the structured, human-readable message body shared by both fallbacks.
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
    ``,
    `Requested slot: ${p.dateLabel ? p.dateLabel + " at " + p.slot + " (Khobar, GMT+3)" : "—"}`,
    ``,
    `Highest-friction workflow:`,
    p.problem,
  ].join("\n");

  // Zero-backend delivery: hand off to WhatsApp (native to this audience),
  // with a mailto fallback if WhatsApp can't be opened.
  const sendViaHandoff = (p) => {
    const body = composeBody(p);
    const wa = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(body)}`;
    const win = window.open(wa, "_blank", "noopener");
    if (!win) {
      window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(p._subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  const submit = async () => {
    if (!validate()) return;
    if (!selectedDay || !selectedSlot) {
      setErrors((e) => ({ ...e, slot: "Pick a date and time." }));
      return;
    }
    const payload = buildPayload();
    setStatus("submitting");
    try {
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Bad status " + res.status);
      } else {
        // No endpoint configured yet → never lose the lead: hand off to WhatsApp.
        sendViaHandoff(payload);
      }
      setDoneData(payload);
      setStatus("done");
    } catch (err) {
      console.error("Contact submit failed:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setV({ name: "", company: "", email: "", phone: "", industry: "", size: "", problem: "", tools: "" });
    setErrors({});
    setSelectedDay(null);
    setSelectedSlot(null);
    setDoneData(null);
    setStatus("idle");
  };

  if (status === "done" && doneData) {
    return (
      <div className="contact-grid" style={{ display: "block" }}>
        <BookingSuccess data={doneData} onReset={reset} />
      </div>
    );
  }

  return (
    <div className="contact-grid">
      <QualificationForm v={v} errors={errors} onField={onField} />
      <CalendarPicker
        selectedDay={selectedDay} setSelectedDay={setSelectedDay}
        selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}
        status={status} onSubmit={submit}
      />
    </div>
  );
}

function ContactSide() {
  return (
    <section className="section section--tight" data-screen-label="03 Side Channels">
      <div className="section-head-c" style={{marginBottom:32}}>
        <h2 style={{fontSize:"clamp(28px,3vw,38px)"}}>Prefer another channel?</h2>
        <p className="lede">All three reach the same operations team. Response within one business day.</p>
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
          <p style={{fontSize:12.5, color:"var(--fg-3)", marginTop:8, lineHeight:1.5}}>Send a voice note. My operations agent picks it up in seconds and routes to the right person.</p>
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
      <ContactHero/>
      <section className="section" data-screen-label="02 Contact Split">
        <BookingFlow/>
      </section>
      <ContactSide/>
      <SiteFooter/>
      <StickyAuditBar/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
