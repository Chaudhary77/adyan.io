import React from "react";
// ROI Calculator, interactive monthly/annual savings estimate.
// Math is intentionally conservative and transparent:
//   automatable hours/mo = staff × hrs/week × 4.33
//   reclaimed hours/mo    = automatable × efficiency (0.40, from ADYAN's
//                           measured avg cycle-time reduction)
//   monthly saving (SAR)  = reclaimed hours × blended hourly cost
// Numbers are an estimate, not a quote, disclaimer is shown inline.
function ROICalculator() {
  const EFFICIENCY = 0.40;
  const WEEKS_PER_MONTH = 4.33;

  const [staff, setStaff] = React.useState(8);
  const [hours, setHours] = React.useState(10);
  const [rate, setRate] = React.useState(90);

  React.useEffect(() => {if (window.lucide) window.lucide.createIcons();});

  const automatable = staff * hours * WEEKS_PER_MONTH;
  const reclaimed = automatable * EFFICIENCY;
  const monthly = reclaimed * rate;
  const annual = monthly * 12;
  const fteDays = reclaimed / 8;

  const round = (n, step) => Math.round(n / step) * step;
  const fmt = (n) => new Intl.NumberFormat("en-US").format(Math.round(n));

  // Visible fill so the slider clearly reads as an interactive, draggable control.
  const fill = (v, min, max) => {
    const pct = ((v - min) / (max - min)) * 100;
    return { background: `linear-gradient(90deg, var(--accent) ${pct}%, var(--bg-elev-2) ${pct}%)` };
  };

  return (
    <section className="roi" id="roi" data-screen-label="ROI Calculator">
      <div className="section-head">
        <div className="eyebrow"><span className="eyebrow-dot" /> ROI Estimate</div>
        <h2>See what manual work is <span className="accent-word">costing you.</span></h2>
        <p className="section-sub section-sub-narrow">
          Move the sliders to match your operation. I'll estimate the time and
          money an ADYAN buildout could reclaim, based on the ~40% average
          cycle-time reduction across my live systems.
        </p>
        <div className="connector" />
      </div>

      <div className="roi-shell">
        {/* Inputs */}
        <div className="roi-inputs">
          <div className="roi-field">
            <div className="roi-field-head">
              <span className="roi-field-label">Staff on manual / repetitive work</span>
              <span className="roi-field-val">{staff} people</span>
            </div>
            <input
              className="roi-range" type="range" min="1" max="200" step="1"
              style={fill(staff, 1, 200)}
              value={staff} onChange={(e) => setStaff(+e.target.value)}
              aria-label="Staff on manual work" />
            
          </div>

          <div className="roi-field">
            <div className="roi-field-head" data-comment-anchor="aa32a5f5c2-div-56-13">
              <span className="roi-field-label">Hours per week each spends on it</span>
              <span className="roi-field-val">{hours} hrs / wk</span>
            </div>
            <input
              className="roi-range" type="range" min="1" max="40" step="1"
              style={fill(hours, 1, 40)}
              value={hours} onChange={(e) => setHours(+e.target.value)}
              aria-label="Hours per week on manual work" />
            
          </div>

          <div className="roi-field">
            <div className="roi-field-head">
              <span className="roi-field-label">Average loaded cost per hour</span>
              <span className="roi-field-val"><span className="roi-cur-inline">SAR</span> {fmt(rate)}</span>
            </div>
            <div className="roi-field-sub">Salary + overhead, per working hour.</div>
            <input
              className="roi-range" type="range" min="30" max="400" step="5"
              style={fill(rate, 30, 400)}
              value={rate} onChange={(e) => setRate(+e.target.value)}
              aria-label="Average loaded cost per hour" />
            
          </div>
        </div>

        {/* Results */}
        <div className="roi-results">
          <div className="roi-results-grid" />
          <div className="roi-results-eyebrow">Estimated savings</div>

          <div className="roi-headline">
            <div className="roi-big">
              <span className="roi-cur">SAR</span>
              <span>{fmt(round(monthly, 100))}</span>
            </div>
            <div className="roi-cap">reclaimed per month in staff time</div>
          </div>

          <div className="roi-secondary">
            <div className="roi-stat">
              <div className="rs-val">SAR {fmt(round(annual, 1000))}</div>
              <div className="rs-lbl">per year</div>
            </div>
            <div className="roi-stat">
              <div className="rs-val">{fmt(reclaimed)} hrs</div>
              <div className="rs-lbl">reclaimed monthly · ≈ {Math.round(fteDays)} full days</div>
            </div>
          </div>

          <div className="roi-cta">
            <a className="btn-primary" href="/contact">
              Get your free AI Readiness Assessment <span className="arr" />
            </a>
            <div className="roi-disclaimer">
              <i data-lucide="info" />
              <span>An estimate based on a 40% reduction in manual workload, not a quote. Your assessment produces real numbers for your operation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
window.ROICalculator = ROICalculator;