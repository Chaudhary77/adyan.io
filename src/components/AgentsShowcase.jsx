import React from "react";
import "./HeroOpt.jsx";
const { WaPhone } = window;
// AgentsShowcase, customer-facing AI agents, for a global audience.
// Distinct from the internal-ops "Meet the Agent" (Interactive3D) section:
// this one is about agents your CUSTOMERS talk to, support, sales, order
// tracking, bookings, shown next to a live-looking support chat on WaPhone.
function AgentsShowcase() {
  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});
  const agents = [
  { ic: "headset", n: "Customer Support Agent", ch: "WhatsApp · Web · Voice",
    d: "Answers questions, resolves issues, and hands over to a human the moment it matters." },
  { ic: "target", n: "Sales & Lead Qualification", ch: "Web · WhatsApp",
    d: "Greets visitors, qualifies leads, books demos, and routes hot deals to your team." },
  { ic: "map-pin", n: "Order & Delivery Tracking", ch: "WhatsApp · SMS",
    d: "Gives live order status, shares tracking, and handles delivery changes." },
  { ic: "calendar-check", n: "Booking & Appointments", ch: "WhatsApp · Web",
    d: "Books, reschedules, and reminds, synced straight to your calendar." }];

  // Scripted chat that plays out one message at a time once the demo scrolls
  // into view, agent replies show a typing indicator before landing.
  const script = [
  { from: "user", text: "Hi, where's my order #10482?", ts: "20:14 ✓✓" },
  { from: "agent", anchor: "f9d7866013-div-50-13",
    text: "Hi Sara! Order #10482 shipped today, out for delivery tomorrow before 6 PM. Want the live tracking link?", ts: "20:14" },
  { from: "user", text: "Yes please, and can I add a gift note?", ts: "20:15 ✓✓" },
  { from: "agent",
    text: "Done. Tracking link sent and gift note added: \"Happy Birthday!\" Anything else I can help with?", ts: "20:15" }];

  const demoRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const [shown, setShown] = React.useState(0);   // messages currently visible
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(script.length); return; }

    const node = demoRef.current;
    if (!node) { setShown(script.length); return; }
    let timers = [];
    let started = false;

    const play = () => {
      if (started) return;
      started = true;
      let i = 0;
      const step = () => {
        if (i >= script.length) return;
        const msg = script[i];
        const reveal = () => { setTyping(false); setShown(i + 1); i += 1; timers.push(setTimeout(step, 900)); };
        if (msg.from === "agent") {
          setTyping(true);
          timers.push(setTimeout(reveal, 1300));
        } else {
          reveal();
        }
      };
      timers.push(setTimeout(step, 500));
    };

    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) && r.bottom > 0;
    };

    let io;
    if (inView()) {
      play();
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { play(); io.disconnect(); } });
      }, { threshold: 0.4 });
      io.observe(node);
    }
    const onScroll = () => { if (inView()) { play(); io && io.disconnect(); window.removeEventListener("scroll", onScroll); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Safety net: if nothing triggers, play the conversation anyway.
    const safety = setTimeout(play, 1800);
    return () => { io && io.disconnect(); window.removeEventListener("scroll", onScroll); clearTimeout(safety); timers.forEach(clearTimeout); };
  }, []);

  // keep the latest message in view inside the phone body
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [shown, typing]);

  return (
    <section className="agx" id="agents" data-screen-label="AI Agents">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot" /> AI Agents</div>
        <h2>Agents your customers can <span className="accent-word">just talk to.</span></h2>
        <p className="section-sub">
          Customer-facing agents that reply in seconds, in any language, around the
          clock, on WhatsApp, your website, or voice. They handle the routine,
          escalate the rest, and never leave a message waiting.
        </p>
        <div className="connector" />
      </div>

      <div className="agx-inner">
        <div className="agx-cards">
          {agents.map((a) =>
          <div className="agx-card" key={a.n}>
              <div className="agx-ic"><i data-lucide={a.ic} /></div>
              <div className="agx-card-body">
                <div className="agx-name">{a.n}</div>
                <div className="agx-desc">{a.d}</div>
                <div className="agx-ch">{a.ch}</div>
              </div>
            </div>
          )}
        </div>

        <div className="agx-demo" ref={demoRef}>
          <WaPhone contact={{ initial: "A", name: "ADYAN · Support", status: "support agent · demo" }}>
            <div className="wa-thread" ref={bodyRef}>
              {script.slice(0, shown).map((m, i) =>
              <div
                className={"wa-bubble-2 wa-pop from-" + m.from}
                key={i}
                data-comment-anchor={m.anchor || undefined}>
                  {m.text}
                  <span className="ts">{m.ts}</span>
                </div>
              )}
              {typing &&
              <div className="wa-typing" aria-label="Typing"><i /><i /><i /></div>
              }
            </div>
          </WaPhone>
          <div className="agx-foot">
            <i data-lucide="eye" />
            Illustrative conversation, production systems differ. Every real conversation is bilingual, logged, and handed to a human the moment it needs one.
          </div>
        </div>
      </div>
    </section>);

}
window.AgentsShowcase = AgentsShowcase;