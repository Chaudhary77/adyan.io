import React from "react";
// ArabicCapability, Arabic + bilingual depth as a first-class differentiator.
// The "Top AI agent companies" listicles treat Arabic as a checkbox; for a
// Saudi founder-led studio it should be a headline strength: Gulf dialects,
// Arabic⇄English code-switching, Arabic voice notes, and RTL-native interfaces.
// Capability cards on the left, a real bilingual exchange as proof on the right.
function ArabicCapability() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const caps = [
    { ic: "languages",   n: "Saudi & Gulf dialects",
      d: "Understands Najdi, Hijazi, and Khaleeji phrasing, not just textbook Modern Standard Arabic." },
    { ic: "repeat",      n: "Arabic ⇄ English code-switching",
      d: "Handles the mixed Arabizi and bilingual messages people actually type, mid-sentence." },
    { ic: "mic",         n: "Arabic voice notes",
      d: "Transcribes and acts on Arabic voice notes, the way teams really communicate on WhatsApp." },
    { ic: "align-right", n: "RTL-native interfaces",
      d: "Dashboards, replies, and documents render correctly right-to-left, with proper numerals and dates." },
  ];

  return (
    <section className="arb" id="arabic" data-screen-label="Arabic & Bilingual">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot"/> Arabic, Done Properly</div>
        <h2>Built to work the way <span className="accent-word">Saudi teams actually talk.</span></h2>
        <p className="section-sub section-sub-narrow">
          Most platforms bolt on Arabic as a translation layer. ADYAN systems are
          designed bilingual from the ground up, dialects, voice notes, and
          code-switching included, so your team and customers never have to
          adjust how they write.
        </p>
        <div className="connector"/>
      </div>

      <div className="arb-inner">
        <div className="arb-cards">
          {caps.map(c => (
            <div className="arb-card" key={c.n}>
              <div className="ic"><i data-lucide={c.ic}/></div>
              <h3>{c.n}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>

        <div className="arb-proof">
          <div className="arb-proof-head">
            <span className="dot"/> Live bilingual handling
          </div>
          <div className="arb-msgs">
            <div className="arb-msg from-user rtl">
              السلام عليكم، أبغى أعرف وصل طلبي ولا لا؟ رقمه ١٠٤٨٢
              <span className="meta">Najdi · voice note transcribed · 14:02</span>
            </div>
            <div className="arb-msg from-agent rtl">
              وعليكم السلام أبو محمد 👋 طلبك ١٠٤٨٢ طلع للتوصيل اليوم، بيوصلك بكرة قبل المغرب إن شاء الله. تبي رابط التتبع؟
              <span className="meta">replied in dialect · 14:02</span>
            </div>
            <div className="arb-msg from-user">
              perfect, and can you send me the invoice بعد؟
              <span className="meta">code-switched EN/AR · 14:03</span>
            </div>
            <div className="arb-msg from-agent">
              Done ✅ Invoice + tracking link sent. أرسلت لك الفاتورة ورابط التتبع. Anything else?
              <span className="meta">bilingual reply · 14:03</span>
            </div>
          </div>
          <div className="arb-proof-note">
            <i data-lucide="check-check"/>
            Same agent, same thread, switching language and dialect without missing context.
          </div>
        </div>
      </div>
    </section>
  );
}
window.ArabicCapability = ArabicCapability;
