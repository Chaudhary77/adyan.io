import React from "react";
import "./HeroOpt.jsx";
const { WaPhone } = window;
// WhatsAppCompact, replaces the long WhatsApp + Voice section. One column
// of copy + a single phone mock. Stacks on mobile.

function WhatsAppCompact() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <section className="wac" data-screen-label="WhatsApp + Voice">
      <div className="wac-inner">
        <div className="wac-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> WhatsApp + Voice · Built for KSA</div>
          <h2>
            Send a message.<br/>
            <span className="accent-word">The work is done.</span>
          </h2>
          <p>
            Your team lives on WhatsApp. So I built every ADYAN system to be
            reachable from the channel they already use, bilingual, voice-aware,
            and audit-logged end to end.
          </p>
          <ul className="wac-bullets">
            <li><i data-lucide="languages"/> Replies in Arabic or English</li>
            <li><i data-lucide="mic"/> A voice note becomes structured action</li>
            <li><i data-lucide="shield-check"/> Every action logged and reviewable</li>
          </ul>
          <div className="wac-cta">
            <a className="btn-primary btn-wa" href="https://wa.me/966508183984" target="_blank" rel="noopener">
              <i data-lucide="message-circle"/> Message me on WhatsApp
            </a>
            <a className="btn-secondary" href="/services#whatsapp">See how it works</a>
          </div>
        </div>

        <WaPhone
          contact={{ initial: "S", name: "Site · Block C", status: "illustrative demo" }}
        >
          <div className="wa-bubble-2 from-user">
            Where are we on PO #4821?
            <span className="ts">14:02 ✓✓</span>
          </div>
          <div className="wa-bubble-2 from-agent">
            Approved 09:14. Vendor confirmed. ETA Wed.<br/>
            Need the delivery slot booked?
            <span className="ts">14:02</span>
          </div>
          <div className="wa-voice-2">
            <div className="play"><i data-lucide="play"/></div>
            <div className="wave">
              {[6,10,16,12,20,14,18,22,12,8,14,18,10,16,12,20,14,8].map((h,i) => <i key={i} style={{height:h}}/>)}
            </div>
            <div className="dur">0:18</div>
          </div>
          <div className="wa-bubble-2 from-agent">
            Logged: 24m³ · Block C · slip 47182. ERP updated. QC pinged. Daily report amended. ✓
            <span className="ts">14:03</span>
          </div>
        </WaPhone>
      </div>
    </section>
  );
}
window.WhatsAppCompact = WhatsAppCompact;
