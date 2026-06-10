import React from "react";
// HomeFAQ, the eight questions clients actually ask before hiring.
// IMPORTANT: this copy must stay in sync with the FAQPage JSON-LD in
// index.html, Google requires schema FAQs to be visible on the page.

const FAQS = [
  {
    q: "What's the difference between an AI agent and a chatbot?",
    a: "A chatbot follows scripts and answers questions. An ADYAN agent reasons over your live business data, takes multi-step actions across your tools, looking up an order, routing an approval, updating the ERP, and escalates to a human when it should. It does the work, not just the talking.",
  },
  {
    q: "Do your agents really work in Arabic and Saudi dialects?",
    a: "Yes. Every system is bilingual from the ground up, it understands Najdi, Hijazi and Khaleeji phrasing, Arabic voice notes, and mid-sentence Arabic-English code-switching, and replies in kind. Arabic isn't a translation layer bolted on afterward.",
  },
  {
    q: "How long does it take to build and deploy an AI agent?",
    a: "Most clients are using their first production system within about 6 weeks of the initial audit. Simpler workflows go live sooner; deep, multi-system enterprise builds take longer. You see working software early and often.",
  },
  {
    q: "What does an AI agent project cost in Saudi Arabia?",
    a: "It depends on scope, a single focused workflow is a very different investment than a multi-department operations layer with deep ERP integration. Engagements are scoped transparently with clear milestones and no hidden fees.",
  },
  {
    q: "Where does our data live, and is it compliant with Saudi regulations?",
    a: "You choose: in-Kingdom cloud, fully on-premise on your own servers, or inside your own cloud tenancy. Every system is engineered around Saudi PDPL data-protection and NCA cybersecurity principles, with a full audit trail on every action.",
  },
  {
    q: "Can you connect to our existing ERP and tools?",
    a: "Yes, SAP, Odoo, Microsoft Dynamics, CRMs, databases, and WhatsApp, Slack or Teams. If a system has an API or a database, it can be connected. No rip-and-replace.",
  },
  {
    q: "What happens after the AI agent launches?",
    a: "Systems are monitored, tuned, and improved over time, agents get sharper as they handle more real cases. You get ongoing support, performance visibility, and a clear path to extend into new workflows.",
  },
  {
    q: "Which industries do you work with?",
    a: "Operations-heavy businesses, industrial and manufacturing, contracting and construction, logistics and transport, trading and distribution, e-commerce and retail, and service teams.",
  },
];

function HomeFAQ() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section className="faq" id="faq" data-screen-label="FAQ">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot" /> Questions</div>
        <h2>Asked before <span className="accent-word">every engagement.</span></h2>
        <div className="connector" />
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <details className="faq-item" key={i}>
            <summary>
              {f.q}
              <span className="faq-chev" aria-hidden="true" />
            </summary>
            <div className="faq-answer">{f.a}</div>
          </details>
        ))}
      </div>
      <div className="faq-foot">
        <i data-lucide="message-circle" />
        <span>Something else on your mind? Ask it on the call, or message me directly.</span>
        <a href="https://wa.me/966508183984" target="_blank" rel="noopener">WhatsApp me <span className="arr" /></a>
      </div>
    </section>
  );
}

window.HomeFAQ = HomeFAQ;
