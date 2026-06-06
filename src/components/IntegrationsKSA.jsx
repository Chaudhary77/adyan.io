import React from "react";
// KSA Integrations, the channels & systems Saudi operations actually run on.
// WhatsApp featured (lead card); Slack/Teams as channels; SAP/Odoo/Dynamics as ERP.
// Generic lucide icons + names only (no branded logos).
function IntegrationsKSA() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section className="kint" id="integrations" data-screen-label="05 Integrations">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot"/> 05 / Integrations</div>
        <h2>Built for the tools <span className="accent-word">Saudi teams already run on.</span></h2>
        <p className="section-sub section-sub-narrow">
          I meet your business where it works, WhatsApp first, then the chat and
          ERP systems your departments already live in. No rip-and-replace.
        </p>
        <div className="connector"/>
      </div>

      <div className="kint-grid">
        {/* Featured, WhatsApp Business API */}
        <div className="kint-card is-featured">
          <div className="kint-lead">
            <div className="ic"><i data-lucide="message-circle"/></div>
            <div>
              <h3>WhatsApp Business API</h3>
              <div className="kint-cat">Primary channel · Arabic + English</div>
            </div>
          </div>
          <p>
            In Saudi Arabia, the team lives on WhatsApp. Every ADYAN system is
            reachable from your verified business number, bilingual replies,
            voice notes, and group-aware routing, end to end.
          </p>
          <div className="kint-pills">
            <span className="kint-pill">Bilingual replies</span>
            <span className="kint-pill">Voice notes</span>
            <span className="kint-pill">Group routing</span>
            <span className="kint-pill">Audit-logged</span>
          </div>
        </div>

        {/* Team chat */}
        <div className="kint-card">
          <div className="kint-cat">Team chat</div>
          <div className="kint-rows">
            <div className="kint-row">
              <div className="ic"><i data-lucide="hash"/></div>
              <div>
                <div className="kr-name">Slack</div>
                <div className="kr-note">Alerts, approvals, and agent updates in-channel.</div>
              </div>
            </div>
            <div className="kint-row">
              <div className="ic"><i data-lucide="message-square"/></div>
              <div>
                <div className="kr-name">Microsoft Teams</div>
                <div className="kr-note">Briefings and sign-offs where your office works.</div>
              </div>
            </div>
          </div>
        </div>

        {/* ERP & business systems */}
        <div className="kint-card">
          <div className="kint-cat">ERP &amp; business systems</div>
          <div className="kint-rows">
            <div className="kint-row">
              <div className="ic"><i data-lucide="database"/></div>
              <div>
                <div className="kr-name">SAP</div>
                <div className="kr-note">Read &amp; write to the system of record.</div>
              </div>
            </div>
            <div className="kint-row">
              <div className="ic"><i data-lucide="boxes"/></div>
              <div>
                <div className="kr-name">Odoo</div>
                <div className="kr-note">Quotes, stock, and invoicing flows.</div>
              </div>
            </div>
            <div className="kint-row">
              <div className="ic"><i data-lucide="building-2"/></div>
              <div>
                <div className="kr-name">Microsoft Dynamics</div>
                <div className="kr-note">CRM, finance, and operations data.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="kint-foot">
        <i data-lucide="plug-zap"/>
        Don't see your system? If it has an API or a database, I connect to it.
      </div>
    </section>
  );
}
window.IntegrationsKSA = IntegrationsKSA;
