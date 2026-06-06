import React from "react";
// Mission Control showcase, visual product preview
function MissionControl() {
  return (
    <section className="mc" id="mission" data-screen-label="06 Mission Control" style={{ color: "rgb(24, 111, 241)" }}>
      <div className="mc-grid">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> 06 / Mission Control</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4vw,52px)", fontWeight: 600, letterSpacing: "-0.018em", lineHeight: 1.18, margin: "14px 0 0", maxWidth: "18ch", paddingBottom: "0.08em" }}>
            <span className="accent-word">See delays, decisions, and actions</span> <span style={{ color: "rgb(255, 255, 255)" }}>in one place.</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--fg-2)", lineHeight: 1.6, marginTop: 18, maxWidth: "48ch" }}>
            Mission Control unifies signals from your ERP, channels, and agents
            into a single live board. Operators see what needs action. Owners
            see what needs decisions.
          </p>
          <ul className="mc-features">
            <li>
              <div className="ic"><i data-lucide="activity" /></div>
              <div><div className="t">Real-time signal layer</div><div className="s">Pulls from ERP, CRM, channels, and ADYAN agents into one stream.</div></div>
            </li>
            <li>
              <div className="ic"><i data-lucide="bell-ring" /></div>
              <div><div className="t">Exception-based alerts</div><div className="s">Only the things that need a decision surface, nothing more.</div></div>
            </li>
            <li>
              <div className="ic"><i data-lucide="shield-check" /></div>
              <div><div className="t">Human approval boundaries</div><div className="s">Agents act inside guardrails. People sign off where it matters.</div></div>
            </li>
            <li>
              <div className="ic"><i data-lucide="file-clock" /></div>
              <div><div className="t">Full audit trail</div><div className="s">Every agent action, follow-up, and approval is logged and reviewable.</div></div>
            </li>
          </ul>
        </div>

        <div className="mc-board">
          <div className="mc-toolbar">
            <div className="mc-toolbar-left">
              <i data-lucide="layout-dashboard" style={{ color: "var(--accent)" }} />
              Mission Control
              <span className="now">UPDATED 14:02 · UTC+4</span>
            </div>
            <div className="mc-chips">
              <span className="on">TODAY</span>
              <span>WEEK</span>
              <span>MONTH</span>
            </div>
          </div>

          <div className="mc-row1">
            <div className="mc-card-sm">
              <div className="lbl">Open Workflows</div>
              <div className="val">312</div>
              <div className="spark">{[3, 5, 4, 6, 8, 7, 9, 8, 10, 9, 12, 11].map((h, i) => <span key={i} style={{ height: h * 2 + "px", opacity: .3 + i * 0.05 }} />)}</div>
            </div>
            <div className="mc-card-sm">
              <div className="lbl">SLA Healthy</div>
              <div className="val">96<span style={{ fontSize: 14, color: "var(--accent)" }}>%</span></div>
              <div className="spark">{[6, 7, 7, 8, 7, 8, 9, 9, 10, 11, 11, 12].map((h, i) => <span key={i} style={{ height: h * 2 + "px", opacity: .3 + i * 0.05 }} />)}</div>
            </div>
            <div className="mc-card-sm">
              <div className="lbl">Auto-resolved</div>
              <div className="val">88<span style={{ fontSize: 14, color: "var(--accent)" }}>%</span></div>
              <div className="spark">{[4, 5, 6, 5, 7, 8, 7, 9, 10, 9, 11, 12].map((h, i) => <span key={i} style={{ height: h * 2 + "px", opacity: .3 + i * 0.05 }} />)}</div>
            </div>
            <div className="mc-card-sm">
              <div className="lbl">Decisions Queued</div>
              <div className="val">7</div>
              <div className="spark">{[2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8].map((h, i) => <span key={i} style={{ height: h * 2 + "px", opacity: .3 + i * 0.05 }} />)}</div>
            </div>
          </div>

          <div className="mc-row2">
            <div className="mc-panel">
              <div className="mc-panel-h">
                <div className="t">Operations Throughput · 14d</div>
                <div className="a">LIVE</div>
              </div>
              <div className="mc-chart">
                <svg viewBox="0 0 400 130" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#1A75DE" stopOpacity=".35" />
                      <stop offset="100%" stopColor="#1A75DE" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[20, 40, 60, 80, 100].map((y) => <line key={y} x1="0" x2="400" y1={y + 10} y2={y + 10} stroke="rgba(58,87,120,.18)" strokeWidth="1" />)}
                  <path d="M0,90 L30,82 L60,86 L90,70 L120,62 L150,68 L180,52 L210,58 L240,42 L270,48 L300,34 L330,40 L360,28 L400,22 L400,130 L0,130 Z" fill="url(#grad)" />
                  <path d="M0,90 L30,82 L60,86 L90,70 L120,62 L150,68 L180,52 L210,58 L240,42 L270,48 L300,34 L330,40 L360,28 L400,22" stroke="#1A75DE" strokeWidth="2" fill="none" />
                  <path d="M0,108 L30,104 L60,106 L90,96 L120,94 L150,98 L180,88 L210,90 L240,82 L270,86 L300,76 L330,80 L360,72 L400,68" stroke="#3A5778" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  {[[180, 52], [240, 42], [300, 34], [360, 28]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#1A75DE" />)}
                </svg>
              </div>
              <div className="mc-legend">
                <span><i /> Auto-resolved</span>
                <span><i className="muted" /> Manual</span>
                <span style={{ marginLeft: "auto", color: "var(--accent)" }}>▲ 28% vs last period</span>
              </div>
            </div>

            <div className="mc-panel">
              <div className="mc-panel-h">
                <div className="t">Agent Activity</div>
                <div className="a">5 ACTIVE</div>
              </div>
              <div className="mc-list">
                <div className="mc-item">
                  <div className="ic"><i data-lucide="bot" /></div>
                  <div><div className="t">Procurement</div><div className="s">PO #4821 · Vendor variance</div></div>
                  <span className="pill badge-pending">REVIEW</span>
                </div>
                <div className="mc-item">
                  <div className="ic"><i data-lucide="mail-check" /></div>
                  <div><div className="t">Revenue</div><div className="s">14 follow-ups dispatched</div></div>
                  <span className="pill badge-run">RUN</span>
                </div>
                <div className="mc-item">
                  <div className="ic"><i data-lucide="truck" /></div>
                  <div><div className="t">Logistics</div><div className="s">Shipment SHP-228 delayed</div></div>
                  <span className="pill badge-pending">ALERT</span>
                </div>
                <div className="mc-item">
                  <div className="ic"><i data-lucide="bar-chart-3" /></div>
                  <div><div className="t">Executive</div><div className="s">Daily briefing ready</div></div>
                  <span className="pill badge-ok">DONE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
window.MissionControl = MissionControl;