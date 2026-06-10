import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";
import "../components/HeroZeroGField.jsx";
import "../components/HeroZeroG.jsx";
import "../components/TrustStats.jsx";
import "../components/ProblemSolutionOpt.jsx";
import "../components/WhatWeBuild.jsx";
import "../components/IndustriesHome.jsx";
import "../components/AgentsShowcase.jsx";
import "../components/ArabicCapability.jsx";
import "../components/WhatsAppCompact.jsx";
import "../components/IntegrationsKSA.jsx";
import "../components/HomeFAQ.jsx";
import "../components/HomeSections.jsx";
import "../components/ReadinessCTA.jsx";

const ReactDOM = { createRoot };
const { AgentsShowcase, ArabicCapability, ExploreMore, FounderStrip, HeroZeroG, HomeFAQ, IndustriesHome, IntegrationsKSA, ProblemSolutionOpt, ProofTeaser, ReadinessCTA, SiteNav, SiteFooter, Stats, WhatsAppCompact, WhatWeBuild } = window;

// Same assembly as the EN landing page; index-ar.html pins adyan-lang=ar so
// the i18n engine renders everything from the Arabic dictionary.
function Site() {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
    if (window.initAdyanReveal) window.initAdyanReveal();
  });

  return (
    <div className="adyan-site" data-screen-label="ADYAN Landing (AR)">
      <SiteNav current="home"/>
      <main id="main">
        <HeroZeroG/>
        <Stats/>
        <ProblemSolutionOpt/>
        <WhatWeBuild/>
        <ProofTeaser/>
        <IndustriesHome/>
        <AgentsShowcase/>
        <ArabicCapability/>
        <IntegrationsKSA/>
        <WhatsAppCompact/>
        <HomeFAQ/>
        <FounderStrip/>
        <ExploreMore/>
        <ReadinessCTA/>
      </main>
      <SiteFooter/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
