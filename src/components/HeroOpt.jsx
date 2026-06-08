import React from "react";
// HeroOpt, three hero variants, switchable via Tweaks.
//   variant="mission"   → dashboard mock (default, refined from v1)
//   variant="editorial" → bold no-mock hero, focused on type + CTA
//   variant="whatsapp"  → WhatsApp phone mock, KSA-first framing
//
// CTAs prioritise "Talk to Operations" (WhatsApp) over "Book a Systems Audit".

function HeroOpt({ variant = "mission" }) {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  const words = React.useMemo(
    () => ["Operations Systems", "Agents", "Automations"],
    []
  );
  const [idx, setIdx] = React.useState(0);
  const [prevIdx, setPrevIdx] = React.useState(null);
  React.useEffect(() => {
    const t = setTimeout(() => {
      setPrevIdx(idx);
      setIdx((i) => (i + 1) % words.length);
    }, 2600);
    return () => clearTimeout(t);
  }, [idx, words]);

  return (
    <section className="hero" data-screen-label="01 Hero" data-variant={variant}>
      <div className="hero-grid" />
      <img className="hero-mesh" src={window.__resources && window.__resources.heroMesh || "ds/assets/hero-mesh.svg"} alt="" loading="lazy" />
      <div className="hero-inner">
        <div>
          {variant === "editorial" ?
          <h1 className="hero-h1">
              {"AI Operations Systems."}<br />
              {"Built for "}<span className="accent-word">real businesses.</span>
            </h1> :

          <h1 className="hero-h1">
              AI{" "}
              <span className="flip-wrap" aria-live="polite">
                <span className="flip-ghost" aria-hidden="true">Operations Systems</span>
                {words.map((w, i) => {
                let state;
                if (i === idx) state = "is-active";else
                if (i === prevIdx) state = "is-up";else
                state = "is-down is-instant";
                return (
                  <span key={w} className={`flip-word ${state}`} aria-hidden={i !== idx}>
                      {w}
                    </span>);

              })}
              </span>
              <br />
              for <span className="accent-word">real businesses.</span>
            </h1>
          }

          <p className="hero-sub">
            Helping companies reduce repetitive work, improve reporting,
            and run operations faster with AI agents, automations, and
            workflows connected to their existing tools.
          </p>

          <div className="hero-cta">
            <a className="btn-primary" href="https://wa.me/966508183984?text=Hi%2C%20I%27d%20like%20to%20book%20a%20systems%20audit." target="_blank" rel="noopener" data-comment-anchor="ae9aa058a4-a-64-13">
              <i data-lucide="message-circle" /> Talk to Operations
            </a>
            <a className="btn-secondary" href="/contact">Book a Systems Audit <span className="arr" /></a>
          </div>

          <div className="hero-meta">
            <span><i data-lucide="message-circle" /> WhatsApp-native</span>
            <span><i data-lucide="mic" /> Voice-ready</span>
            <span><i data-lucide="database" /> ERP-connected</span>
            <span><i data-lucide="shield-check" /> Audit-ready</span>
          </div>
        </div>

        {variant === "mission" && <HeroMockMission />}
        {variant === "whatsapp" && <HeroMockWhatsApp />}
        {/* editorial: no mock, handled by CSS [data-variant=editorial] */}
      </div>
    </section>);

}

function HeroMockMission() {
  return (
    <div className="hero-mock">
      <div className="mock-head">
        <div className="mock-title">
          <span className="live" /> ADYAN · Mission Control
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", marginLeft: 8, letterSpacing: ".08em" }}>SYNCED 14:02</span>
        </div>
        <div className="mock-tabs">
          <span className="on">OVERVIEW</span>
          <span>OPERATIONS</span>
          <span>FINANCE</span>
        </div>
      </div>
      <div className="mock-kpis">
        <div className="mock-kpi">
          <div className="lbl">Open POs</div>
          <div className="val">142</div>
          <div className="delta">▲ 6 vs yesterday</div>
        </div>
        <div className="mock-kpi">
          <div className="lbl">Collections at risk</div>
          <div className="val">SAR 384k</div>
          <div className="delta warn">▲ 2 accounts flagged</div>
        </div>
        <div className="mock-kpi">
          <div className="lbl">Auto-resolved</div>
          <div className="val">88<span style={{ fontSize: 14, color: "var(--accent)" }}>%</span></div>
          <div className="delta">▲ 4.2 pts week</div>
        </div>
      </div>
      <div className="mock-rows">
        <div className="mock-row">
          <div className="ic"><i data-lucide="git-pull-request-arrow" /></div>
          <div className="body">
            <div className="t">PO #4821 routed to Finance for approval</div>
            <div className="s">Procurement Agent · vendor exceeds threshold by 8%</div>
          </div>
          <span className="badge badge-pending">PENDING</span>
        </div>
        <div className="mock-row">
          <div className="ic"><i data-lucide="mail-check" /></div>
          <div className="body">
            <div className="t">Collections follow-up sent to 14 accounts</div>
            <div className="s">Revenue Agent · WhatsApp + email cascade</div>
          </div>
          <span className="badge badge-run">RUNNING</span>
        </div>
        <div className="mock-row">
          <div className="ic"><i data-lucide="bar-chart-3" /></div>
          <div className="body">
            <div className="t">Daily owner briefing compiled</div>
            <div className="s">Executive Agent · 7 decisions queued</div>
          </div>
          <span className="badge badge-ok">DONE</span>
        </div>
      </div>
    </div>);

}

function HeroMockWhatsApp() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  return (
    <WaPhone
      contact={{ initial: "A", name: "ADYAN · Operations", status: "online · responds in minutes" }}>
      
      <div className="wa-bubble-2 from-user">
        Need a quote for 14 line items, client Al-Mara.
        <span className="ts">09:41 ✓✓</span>
      </div>
      <div className="wa-bubble-2 from-agent">
        12 in stock, 2 partial (ETA 4d). Margin 18.4%. Send quote?
        <span className="ts">09:41</span>
      </div>
      <div className="wa-bubble-2 from-user">
        ✓ Send it<span className="ts">09:42 ✓✓</span>
      </div>
      <div className="wa-bubble-2 from-agent">
        Sent. Quote #4821 on its way. Follow-up scheduled 48h.
        <span className="ts">09:42</span>
      </div>
      <div className="wa-voice-2">
        <div className="play"><i data-lucide="play" /></div>
        <div className="wave">
          {[6, 10, 16, 12, 20, 14, 18, 22, 12, 8, 14, 18, 10, 16, 12, 20].map((h, i) => <i key={i} style={{ height: h }} />)}
        </div>
        <div className="dur">0:14</div>
      </div>
    </WaPhone>);

}

// Reusable WhatsApp phone mock, used by Hero variant + WhatsAppCompact.
function WaPhone({ contact, children }) {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  return (
    <div className="wa-phone">
      <div className="wa-phone-inner">
        <div className="wa-phone-head">
          <div className="av">{contact?.initial || "A"}</div>
          <div className="who">
            <div className="n">{contact?.name || "ADYAN · Operations"}</div>
            <div className="s">{contact?.status || "online"}</div>
          </div>
          <div className="actions">
            <i data-lucide="video" />
            <i data-lucide="phone" />
          </div>
        </div>
        <div className="wa-phone-body">
          {children}
        </div>
        <div className="wa-phone-foot">
          <div className="input">Message</div>
          <div className="send"><i data-lucide="mic" /></div>
        </div>
      </div>
    </div>);

}

window.HeroOpt = HeroOpt;
window.WaPhone = WaPhone;