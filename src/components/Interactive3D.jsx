import React from "react";
import "./SplineScene.jsx";
const { Spotlight } = window;
// Interactive3D, "The system that runs while you don't."
// Reframed for Saudi SME founders: the robot visual is the always-on operating
// layer; the four cards tie that to concrete moments of a founder's week
// (Fajr briefing, site voice note, in-meeting approval, weekend quiet watch).

function Interactive3D() {
  const moments = [
  { ic: "sunrise", when: "At Fajr",
    title: "The morning briefing waits for you.",
    desc: "Last night's exceptions, ordered by impact. Read it with your coffee, decide in two taps." },
  { ic: "mic", when: "On the site",
    title: "A voice note moves the work.",
    desc: "20 seconds in Arabic or English becomes ERP entries, QC pings, and a corrected daily report." },
  { ic: "clipboard-check", when: "In a meeting",
    title: "Approvals don't ambush you.",
    desc: "Procurement variance, vendor history, exposure, sized and presented. You sign off where it matters." },
  { ic: "moon", when: "On the weekend",
    title: "Collections keep moving without you.",
    desc: "WhatsApp cascades across 14 accounts. You're pinged only when a human reply needs a human." }];


  return (
    <section className="agent" data-screen-label="The Always-On Layer">
      <div className="agent-inner">
        <div className="agent-stage">
          <Spotlight className="agent-spot" fill="#1A75DE" />
          <div className="agent-stage-frame">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="agent-spline"
              tint="blue" />
            
            <div className="hero-stage-corner tl" />
            <div className="hero-stage-corner tr" />
            <div className="hero-stage-corner bl" />
            <div className="hero-stage-corner br" />
          </div>
          <div className="agent-stage-meta">
            <span className="live" />
            <span className="agent-stage-label">ADYAN · ALWAYS ON · 24/7</span>
            <span className="agent-stage-rule" />
            <span className="agent-stage-status">WATCHING</span>
          </div>
        </div>

        <div className="agent-copy">
          <span className="agent-eyebrow">ALWAYS ON · BUILT FOR KSA</span>
          <h2 className="agent-h">
            Working while you sleep.<br />
            <span className="accent-word">Reporting in the morning.</span>
          </h2>
          <p className="agent-sub">At 2 AM, a shipment is late. A vendor over-quotes. A customer sends a WhatsApp message.
By Fajr, your system has followed up, flagged the variance, logged the update, and prepared your morning briefing.




          </p>

          <ul className="agent-roles">
            {moments.map((m, i) =>
            <li key={i} className="agent-role">
                <span className="agent-role-ic"><i data-lucide={m.ic} /></span>
                <div>
                  <div className="agent-role-when">{m.when}</div>
                  <div className="agent-role-name">{m.title}</div>
                  <div className="agent-role-desc">{m.desc}</div>
                </div>
              </li>
            )}
          </ul>

          <div className="agent-cta">
            <a className="btn-primary btn-wa" href="https://wa.me/966508183984" target="_blank" rel="noopener">
              <i data-lucide="message-circle" /> Talk to Operations
            </a>
            <a className="btn-secondary" href="#systems">See a live system →</a>
          </div>
        </div>
      </div>
    </section>);

}

window.Interactive3D = Interactive3D;