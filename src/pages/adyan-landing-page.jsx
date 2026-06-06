import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteTweaks.jsx";
import "../components/SiteChrome.jsx";
import "../components/SplineScene.jsx";
import "../components/Interactive3D.jsx";
import "../components/HeroImmersive.jsx";
import "../components/HeroZeroGField.jsx";
import "../components/HeroZeroG.jsx";
import "../components/HeroOpt.jsx";
import "../components/ProblemSolutionOpt.jsx";
import "../components/WhatWeBuild.jsx";
import "../components/IndustriesHome.jsx";
import "../components/AgentsShowcase.jsx";
import "../components/ArabicCapability.jsx";
import "../components/WhatsAppCompact.jsx";
import "../components/IntegrationsKSA.jsx";
import "../components/ReadinessCTA.jsx";

const ReactDOM = { createRoot };
const { AgentsShowcase, ArabicCapability, Compliance, HeroImmersive, HeroOpt, HeroZeroG, IndustriesHome, IntegrationsKSA, Interactive3D, ProblemSolutionOpt, ReadinessCTA, SiteNav, SiteFooter, SiteTweaks, Trust, WhatsAppCompact, WhatWeBuild } = window;

// Compact "go deeper" band. Replaces the standalone Compliance and
// Agents-Deployed sections on the home page with teasers that link to the
// full Security and Systems-Built pages, keeping the home page lean.
function ExploreMore() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const cards = [
    { icon: "layout-grid", k: "Proof", t: "Systems we've built",
      s: "Real production agents and automations, the workflow each one owns, and the outcome it moved.",
      cta: "See the work", href: "Systems Built.html" },
    { icon: "shield-check", k: "Trust", t: "Security & compliance",
      s: "In-Kingdom, on-prem or your own cloud. PDPL and NCA-aligned, with a full audit trail on every action.",
      cta: "How we keep data safe", href: "Security.html" },
    { icon: "route", k: "Method", t: "How we work",
      s: "From a two-week Systems Audit to a phased buildout, working software early and often.",
      cta: "See the process", href: "Process.html" },
  ];
  return (
    <section className="explore rv" data-screen-label="Go Deeper">
      <div className="explore-head">
        <div className="eyebrow"><span className="eyebrow-dot" /> Go deeper</div>
        <h2>The full picture, <span className="accent-word">one click away.</span></h2>
      </div>
      <div className="explore-grid">
        {cards.map((c, i) => (
          <a className="explore-card" href={c.href} key={i}>
            <span className="explore-ic"><i data-lucide={c.icon} /></span>
            <span className="explore-k">{c.k}</span>
            <h3>{c.t}</h3>
            <p>{c.s}</p>
            <span className="explore-cta">{c.cta} <span className="arr" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Site() {
  const [heroVariant, setHeroVariant] = React.useState(
    (window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS.heroVariant) || "zerog"
  );
  const [show3D, setShow3D] = React.useState(
    !!(window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS.show3D)
  );

  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
    if (window.initAdyanReveal) window.initAdyanReveal();
  });

  return (
    <div className="adyan-site" data-screen-label="ADYAN Landing">
      <SiteNav current="home"/>
      {heroVariant === "zerog" ? <HeroZeroG/> :
       heroVariant === "immersive" ? <HeroImmersive/> :
       <HeroOpt variant={heroVariant}/>}
      <ProblemSolutionOpt/>
      <WhatWeBuild/>
      <IndustriesHome/>
      <AgentsShowcase/>
      <ArabicCapability/>
      <IntegrationsKSA/>
      {show3D && <Interactive3D/>}
      <WhatsAppCompact/>
      <ExploreMore/>
      <ReadinessCTA/>
      <SiteFooter/>
      <SiteTweaks onHeroVariant={setHeroVariant} onShow3D={setShow3D}/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
