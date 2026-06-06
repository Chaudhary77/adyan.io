import React from "react";
// ProblemSolutionOpt, same idea as the original ProblemSolution, but tighter:
// one shorter sub-paragraph each, four contrast pairs instead of two lists, and
// stacks cleanly on mobile.

function ProblemSolutionOpt() {
  const pairs = [
  { bad: "Manual follow-ups across siloed tools", good: "Connected workflows across every channel" },
  { bad: "Approvals stuck in inboxes for days", good: "Routed approvals with human sign-off" },
  { bad: "Reports compiled after the decision", good: "Real-time monitoring and alerting" },
  { bad: "No single view across departments", good: "One mission-control view of operations" }];

  return (
    <section className="ps">
      <div className="ps-grid" data-comment-anchor="75f9a5041c-div-14-7">
        <div className="ps-block ps-problem">
          <div className="eyebrow eyebrow-muted">The Problem</div>
          <h2 className="ps-h">Operations are scattered.<br />Execution becomes slow.</h2>
          <p className="ps-p">
            Tools, teams and data already exist. Work still depends on manual
            follow-ups, delayed approvals, and reports that arrive after the
            decision is made.
          </p>
          <ul className="ps-list">
            {pairs.map((p, i) =>
            <li key={i}><i data-lucide="x" /> {p.bad}</li>
            )}
          </ul>
        </div>
        <div className="ps-block ps-solution">
          <div className="eyebrow">The Solution</div>
          <h2 className="ps-h">The AI operations layer<br />around your business.</h2>
          <p className="ps-p">
            ADYAN connects workflows, communication channels, and business data
            into practical systems that monitor, follow up, report, and support
            execution.
          </p>
          <ul className="ps-list ps-list-yes">
            {pairs.map((p, i) =>
            <li key={i}><i data-lucide="check" /> {p.good}</li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}
window.ProblemSolutionOpt = ProblemSolutionOpt;