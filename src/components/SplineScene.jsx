import React from "react";
// SplineScene, runtime-loaded Spline 3D canvas with ADYAN tinting hooks.
// Loads @splinetool/runtime from esm.sh and routes the dynamic import through
// new Function() to bypass Babel-standalone's import()→require() transform.

function SplineScene({ scene, className, tint }) {
  const canvasRef = React.useRef(null);
  const [status, setStatus] = React.useState("loading"); // loading | ready | error

  React.useEffect(() => {
    let cancelled = false;
    let app;
    const dynamicImport = new Function("u", "return import(u)");

    (async () => {
      try {
        const mod = await dynamicImport("https://esm.sh/@splinetool/runtime@1.9.48");
        if (cancelled || !canvasRef.current) return;
        const { Application } = mod;
        app = new Application(canvasRef.current);
        await app.load(scene);
        if (cancelled) return;

        // Best-effort programmatic recolor: walk known object names and shift
        // any material color toward ADYAN Electric Blue. The hero scene's
        // exact node names aren't guaranteed, so this is paired with a CSS
        // hue-rotate fallback in the wrapper for guaranteed tinting.
        try {
          const targetHex = 0x1A75DE;
          const allObjects = app.getAllObjects ? app.getAllObjects() : [];
          for (const obj of allObjects) {
            if (obj && obj.material && obj.material.color && typeof obj.material.color.set === "function") {
              obj.material.color.set(targetHex);
            }
            if (obj && obj.color && typeof obj.color.set === "function") {
              try { obj.color.set(targetHex); } catch (_) {}
            }
          }
        } catch (_) { /* non-fatal */ }

        if (!cancelled) setStatus("ready");
      } catch (err) {
        console.error("Spline load failed:", err && (err.message || err.toString()), err && err.stack);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      try { app && app.dispose && app.dispose(); } catch (_) {}
    };
  }, [scene]);

  return (
    <div className={"spline-wrap " + (className || "")} data-tint={tint || "blue"}>
      <canvas ref={canvasRef} className="spline-canvas"/>
      {status === "loading" && (
        <div className="spline-overlay">
          <span className="spline-loader"/>
          <span className="spline-overlay-label">Initialising</span>
        </div>
      )}
      {status === "error" && (
        <div className="spline-overlay">
          <span className="spline-overlay-label" style={{color:"var(--fg-2)"}}>
            3D scene unavailable
          </span>
        </div>
      )}
    </div>
  );
}

function Spotlight({ className, fill }) {
  return (
    <svg
      className={"adyan-spotlight " + (className || "")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#adyan-spot-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "#1A75DE"}
          fillOpacity="0.32"
        />
      </g>
      <defs>
        <filter
          id="adyan-spot-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8"/>
        </filter>
      </defs>
    </svg>
  );
}

window.SplineScene = SplineScene;
window.Spotlight = Spotlight;
