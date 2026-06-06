import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteTweaks.jsx";
import "../components/SiteChrome.jsx";
import "../components/SplineScene.jsx";
import "../components/Interactive3D.jsx";
import "../components/HeroOpt.jsx";
import "../components/TrustStats.jsx";
import "../components/ProblemSolutionOpt.jsx";
import "../components/WhatWeBuild.jsx";
import "../components/IndustriesHome.jsx";
import "../components/AgentsShowcase.jsx";
import "../components/WhatsAppCompact.jsx";
import "../components/MissionControl.jsx";
import "../components/IntegrationsKSA.jsx";
import "../components/Compliance.jsx";
import "../components/GlobalCompliance.jsx";
import "../components/ROICalculator.jsx";
import "../components/PartnerBand.jsx";
import "../components/SystemsBuiltOpt.jsx";
import "../components/ReadinessCTA.jsx";
import "../components/FinalCTAOpt.jsx";

const ReactDOM = { createRoot };
const { AgentsShowcase, Compliance, GlobalCompliance, HeroOpt, IndustriesHome, IntegrationsKSA, Interactive3D, MissionControl, PartnerBand, ProblemSolutionOpt, ReadinessCTA, ROICalculator, SiteNav, SiteFooter, SiteTweaks, SystemsBuiltOpt, Trust, WhatsAppCompact, WhatWeBuild } = window;

function Site() {
  const [heroVariant, setHeroVariant] = React.useState(
    (window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS.heroVariant) || "mission"
  );
  const [show3D, setShow3D] = React.useState(
    !!(window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS.show3D)
  );

  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  return (
    <div className="adyan-site" data-screen-label="ADYAN Landing (AR)">
      <SiteNav current="home"/>
      <HeroOpt variant={heroVariant}/>
      <Trust/>
      <ProblemSolutionOpt/>
      <WhatWeBuild/>
      <IndustriesHome/>
      <AgentsShowcase/>
      <IntegrationsKSA/>
      {show3D && <Interactive3D/>}
      <WhatsAppCompact/>
      <MissionControl/>
      <Compliance/>
      <GlobalCompliance/>
      <SystemsBuiltOpt/>
      <ROICalculator/>
      <PartnerBand/>
      <ReadinessCTA/>
      <SiteFooter/>
      <SiteTweaks onHeroVariant={setHeroVariant} onShow3D={setShow3D}/>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Site/>);
