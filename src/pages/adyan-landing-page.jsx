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
import "../components/ArabicCapability.jsx";
import "../components/WhatsAppCompact.jsx";
import "../components/IntegrationsKSA.jsx";
import "../components/HomeFAQ.jsx";
import "../components/HomeSections.jsx";
import "../components/ReadinessCTA.jsx";

const ReactDOM = { createRoot };
const { ArabicCapability, ExploreMore, FounderStrip, HeroZeroG, HomeFAQ, IndustriesHome, IntegrationsKSA, ProblemSolutionOpt, ProofTeaser, ReadinessCTA, SiteNav, SiteFooter, Stats, WhatsAppCompact, WhatWeBuild } = window;

function Site() {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
    if (window.initAdyanReveal) window.initAdyanReveal();
  });

  return (
    <div className="adyan-site" data-screen-label="ADYAN Landing">
      <SiteNav current="home"/>
      <main id="main">
        <HeroZeroG/>
        <Stats/>
        <ProblemSolutionOpt/>
        <ProofTeaser/>
        <WhatWeBuild/>
        <WhatsAppCompact/>
        <ArabicCapability/>
        <IndustriesHome/>
        <IntegrationsKSA/>
        <FounderStrip/>
        <HomeFAQ/>
        <ExploreMore/>
        <ReadinessCTA/>
      </main>
      <SiteFooter/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
