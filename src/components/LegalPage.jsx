import React from "react";
import "./SiteChrome.jsx";
const { SiteNav, SiteFooter, Breadcrumb, StickyAuditBar } = window;
// Shared legal/policy page renderer, used by Privacy, Terms, Security.
// Each page passes a declarative `data` object; this builds the chrome + prose.
//
// data = {
//   eyebrow, title, lede, updated, chips:[{ic,label}],
//   sections:[{ id, title, blocks:[ {p} | {h3} | {ul:[str|{b,t}]} | {note} ] }]
// }
function LegalPage({ data, current }) {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const renderBlock = (b, i) => {
    if (b.h3 !== undefined) return <h3 key={i}>{b.h3}</h3>;
    if (b.p !== undefined) return <p key={i}>{b.p}</p>;
    if (b.note !== undefined) return (
      <div className="legal-note" key={i}>
        <i data-lucide="shield-alert" />
        <p>{b.note}</p>
      </div>
    );
    if (b.ul !== undefined) return (
      <ul key={i}>
        {b.ul.map((item, j) =>
          typeof item === "string"
            ? <li key={j}>{item}</li>
            : <li key={j}><b>{item.b}</b> {item.t}</li>
        )}
      </ul>
    );
    return null;
  };

  return (
    <div className="adyan-site" data-screen-label={`ADYAN · ${data.title}`}>
      <SiteNav current={current} />
      <Breadcrumb trail={[{ label: data.title }]} />

      <section className="page-hero" data-screen-label="Legal Hero">
        <div className="page-hero-inner" style={{ gridTemplateColumns: "1fr", display: "block" }}>
          <div className="page-hero-left" style={{ maxWidth: 760 }}>
            <div className="eyebrow"><span className="eyebrow-dot" /> {data.eyebrow}</div>
            <h1>{data.title}</h1>
            <p className="lede">{data.lede}</p>
          </div>
        </div>
      </section>

      <div className="legal">
        <div className="legal-meta">
          <span className="chip"><i data-lucide="calendar-clock" /> Last updated · {data.updated}</span>
          {(data.chips || []).map((c, i) => (
            <span className="chip" key={i}><i data-lucide={c.ic} /> {c.label}</span>
          ))}
        </div>

        <nav className="legal-toc" aria-label="On this page">
          <div className="toc-h">On this page</div>
          <ol>
            {data.sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ol>
        </nav>

        {data.sections.map((s, idx) => (
          <section className="legal-section" id={s.id} key={s.id}>
            <h2><span className="n">{String(idx + 1).padStart(2, "0")}</span>{s.title}</h2>
            {s.blocks.map(renderBlock)}
          </section>
        ))}

        <div className="legal-contact">
          <h3>Questions about this policy?</h3>
          <p>
            Reach the person who builds and operates these systems directly, no
            ticket queue. I respond within one business day.
          </p>
          <div className="rows">
            <a href="mailto:mail@adyan.io"><i data-lucide="mail" /> mail@adyan.io</a>
            <a href="https://wa.me/966508183984" target="_blank" rel="noopener"><i data-lucide="message-circle" /> WhatsApp</a>
          </div>
        </div>
      </div>

      <SiteFooter />
      <StickyAuditBar />
    </div>
  );
}
window.LegalPage = LegalPage;
