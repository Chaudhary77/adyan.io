import React from "react";
// Shared site chrome, used by every page.
// Exposes: SiteNav, SiteFooter, StickyAuditBar, Breadcrumb, ThemeToggle, AuditCTAStrip
// Single-file so any page can <script src> it once.

const NAV_LINKS = [
{ label: "Services", href: "/services", match: "services" },
{ label: "Work", href: "/systems-built", match: "work" },
{ label: "Process", href: "/process", match: "process" },
{ label: "Partners", href: "/partnerships", match: "partners" },
{ label: "About", href: "/about", match: "about" }];


function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => {
    try {return localStorage.getItem("adyan-theme") || "dark";} catch {return "dark";}
  });
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {localStorage.setItem("adyan-theme", theme);} catch {}
    if (window.lucide) window.lucide.createIcons();
  }, [theme]);
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      data-no-i18n>
      
      <i data-lucide={theme === "dark" ? "sun" : "moon"}></i>
    </button>);

}

// Language toggle, EN <-> AR. The actual translation work happens in the
// i18n engine (i18n/engine.js), which walks all text nodes. This button just
// flips the current language; the engine reacts.
function LangToggle() {
  const [lang, setLang] = React.useState(() => {
    try {return localStorage.getItem("adyan-lang") || "en";} catch {return "en";}
  });
  React.useEffect(() => {
    if (window.adyanLang) window.adyanLang.set(lang);
  }, [lang]);
  React.useEffect(() => {
    // Keep our local state in sync if the engine inits with a stored value.
    if (window.adyanLang) {
      const unsub = window.adyanLang.subscribe((l) => setLang(l));
      return unsub;
    }
  }, []);
  const next = lang === "en" ? "ar" : "en";
  return (
    <button
      type="button"
      className="lang-toggle"
      aria-label={`Switch to ${next === "ar" ? "Arabic" : "English"}`}
      onClick={() => setLang(next)}
      data-no-i18n>
      
      <span className={lang === "en" ? "now" : ""}>EN</span>
      <span className="sep">/</span>
      <span className={lang === "ar" ? "now" : ""}>ع</span>
    </button>);

}

function SiteNav({ current }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();}, [open]);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {document.body.style.overflow = "";};
  }, [open]);
  return (
    <React.Fragment>
      <nav className="adyan-nav" data-screen-label="Nav">
        <a className="brand" href="/">
          <img src={(window.__resources && window.__resources.logoMono) || "ds/assets/logo-monogram.png"} alt="" width="36" height="36" />
          <div className="brand-text">
            <div className="brand-name">ADYAN</div>
            <div className="brand-tag">AI Operations Systems</div>
          </div>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className={current === l.match ? "is-current" : ""}>
            
              {l.label}
            </a>
          )}
        </div>
        <div className="nav-cta">
          <LangToggle />
          <ThemeToggle />
          <a className="btn-primary nav-cta-btn" href="/contact">
            Book a Systems Audit <span className="arr" />
          </a>
          <button
            type="button"
            className="nav-mobile-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            data-no-i18n>
            
            <i data-lucide="menu"></i>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-head">
          <a className="brand" href="/" onClick={() => setOpen(false)}>
            <img src={(window.__resources && window.__resources.logoMono) || "ds/assets/logo-monogram.png"} alt="" width="34" height="34" />
            <div className="brand-text">
              <div className="brand-name">ADYAN</div>
            </div>
          </a>
          <button
            type="button"
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            data-no-i18n>
            
            <i data-lucide="x"></i>
          </button>
        </div>
        <nav>
          {NAV_LINKS.map((l) =>
          <a
            key={l.href}
            href={l.href}
            className={current === l.match ? "is-current" : ""}
            onClick={() => setOpen(false)}>
            
              {l.label}
            </a>
          )}
          <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <div className="mobile-menu-cta">
          <a className="btn-primary" href="https://wa.me/966508183984" target="_blank" rel="noopener">
            Talk to Operations
          </a>
          <a className="btn-secondary" href="/contact">Book a Systems Audit</a>
        </div>
      </div>
    </React.Fragment>);

}

function Breadcrumb({ trail }) {
  // trail: [{label, href}] - last item is current page (no href)
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="breadcrumb-inner">
        <a href="/"><i data-lucide="home"></i></a>
        {trail.map((c, i) =>
        <React.Fragment key={i}>
            <span className="sep">/</span>
            {c.href ?
          <a href={c.href}>{c.label}</a> :
          <span className="current">{c.label}</span>}
          </React.Fragment>
        )}
      </div>
    </nav>);

}

function StickyAuditBar() {
  const [closed, setClosed] = React.useState(() => {
    try {return sessionStorage.getItem("adyan-audit-bar-closed") === "1";} catch {return false;}
  });
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  if (closed) return null;
  return (
    <div className="sticky-audit-bar" role="region" aria-label="Book a systems audit">
      <div className="sab-inner">
        <span className="sab-dot" />
        <span className="sab-text">
          <strong>Free 30-minute Systems Audit.</strong>{" "}
          I map your operations bottlenecks and propose a phased buildout.
        </span>
        <a className="sab-cta" href="/contact">
          Book now <span className="arr" />
        </a>
        <button
          type="button"
          className="sab-close"
          aria-label="Dismiss"
          onClick={() => {
            setClosed(true);
            try {sessionStorage.setItem("adyan-audit-bar-closed", "1");} catch {}
          }}>
          
          <i data-lucide="x"></i>
        </button>
      </div>
    </div>);

}

function AuditCTAStrip() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  return (
    <section className="audit-strip" data-screen-label="Audit Strip">
      <div className="audit-strip-inner">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> Next Step</div>
          <h2>Start with a <span className="accent-word">Systems Audit.</span></h2>
          <p>We map your highest-friction workflows, identify quick wins, and outline a practical buildout for your first AI operations system, agents, automations, dashboards, and integrations, in the order that compounds fastest.</p>
        </div>
        <div className="audit-strip-cta">
          <a className="btn-primary" href="/contact">Book a Systems Audit <span className="arr" /></a>
          <a className="btn-secondary" href="/systems-built">View Systems Built</a>
          <div className="audit-strip-meta">
            <span><i data-lucide="clock"></i> Response within 24 hours</span>
            <span><i data-lucide="shield-check"></i> NDA on request</span>
          </div>
        </div>
      </div>
    </section>);

}

function SiteFooter() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <img src={(window.__resources && window.__resources.logoMono) || "ds/assets/logo-monogram.png"} width="42" height="42" alt="" />
            <div>
              <div className="footer-name">ADYAN</div>
              <div className="footer-tag">AI Operations Systems</div>
            </div>
          </div>
          <p className="footer-blurb">
            A founder-led AI systems studio. I build AI agents, automations, and
            ERP-connected workflows for operations-heavy businesses, and I partner
            with IT, ERP, and consulting firms to deliver them. Khobar + remote,
            across Saudi Arabia and globally.
          </p>
          <div className="footer-contact" data-comment-anchor="c803fe9bf2-div-249-11">
            <a href="mailto:mail@adyan.io"><i data-lucide="mail"></i> mail@adyan.io</a>
            <a href="https://wa.me/966508183984" target="_blank" rel="noopener"><i data-lucide="message-circle"></i> WhatsApp</a>
            <a href="https://www.linkedin.com/in/adyan5" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flex: "none" }}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg> LinkedIn</a>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <div className="footer-col-h">Services</div>
            <a href="/services#agents">AI Agents</a>
            <a href="/services#automation">Workflow Automation</a>
            <a href="/services#whatsapp">WhatsApp AI Assistants</a>
            <a href="/services#voice">Voice Agents</a>
            <a href="/services#erp">ERP & CRM Integrations</a>
            <a href="/services#apps">Apps & Dashboards</a>
          </div>
          <div>
            <div className="footer-col-h">Studio</div>
            <a href="/about">About</a>
            <a href="/process">How I Work</a>
            <a href="/partnerships">Partnerships</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <div className="footer-col-h">Resources</div>
            <a href="/contact">Book a Systems Audit</a>
            <a href="/partnerships">Partner with me</a>
            <a href="/systems-built">Systems Built</a>
            <a href="https://wa.me/966508183984" target="_blank" rel="noopener">Talk on WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="connector" />
      <div className="footer-base">
        <span>© 2026 ADYAN, AI Operations Systems</span>
        <div className="links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/security">Security</a>
        </div>
        <span>adyan.io · Khobar, Saudi Arabia</span>
      </div>
    </footer>);

}

// Mount helpers, used by page entry scripts
window.SiteNav = SiteNav;
window.SiteFooter = SiteFooter;
window.StickyAuditBar = StickyAuditBar;
window.Breadcrumb = Breadcrumb;
window.ThemeToggle = ThemeToggle;
window.LangToggle = LangToggle;
window.AuditCTAStrip = AuditCTAStrip;