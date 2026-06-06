import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";
import "../components/LegalPage.jsx";

const ReactDOM = { createRoot };
const { LegalPage, Trust } = window;

const SECURITY = {
  eyebrow: "Trust",
  title: "Security & Data Protection",
  lede: "Security is built into how I design systems, not bolted on after. This overview describes the controls and practices behind every ADYAN build, engineered around Saudi PDPL and NCA principles, and aligned to the controls international buyers expect.",
  updated: "1 June 2026",
  chips: [
    { ic: "shield-check", label: "PDPL + NCA principles" },
    { ic: "globe", label: "GDPR-aligned" },
    { ic: "lock", label: "Encrypted in transit & at rest" },
  ],
  sections: [
    {
      id: "residency", title: "Data residency & deployment",
      blocks: [
        { p: "You choose where ADYAN runs. Operational data does not have to leave your control." },
        { ul: [
          { b: "In-Kingdom cloud", t: " agents and data run on cloud regions inside Saudi Arabia, supporting data-sovereignty requirements." },
          { b: "On-premise", t: " for regulated workloads, the full system runs on your own servers; nothing leaves your network perimeter." },
          { b: "Your own cloud account", t: " I deploy into your existing tenancy, under your billing, access controls, and audit." },
        ]},
      ],
    },
    {
      id: "encryption", title: "Encryption & access",
      blocks: [
        { ul: [
          { b: "In transit", t: " all traffic is encrypted with modern TLS." },
          { b: "At rest", t: " stored data and secrets are encrypted; credentials live in a dedicated secrets manager, never in code." },
          { b: "Least privilege", t: " access is role-based and granted on a need-to-know basis, with separate credentials per environment." },
          { b: "Key control", t: " in your-tenancy deployments, encryption keys remain under your control." },
        ]},
      ],
    },
    {
      id: "audit", title: "Audit trail & oversight",
      blocks: [
        { p: "Every system carries a complete, tamper-evident audit trail: who or which agent did what, when, and why. Consequential actions, spend, contracts, external messages, pass through human approval gates before execution." },
      ],
    },
    {
      id: "standards", title: "Standards alignment",
      blocks: [
        { p: "I engineer to recognised frameworks so the build holds up to a client's procurement and security review, local and international." },
        { ul: [
          { b: "Saudi PDPL", t: " personal-data handling follows the Kingdom's Personal Data Protection Law principles." },
          { b: "NCA Essential Cybersecurity Controls", t: " deployment practice follows Saudi national cybersecurity guidance." },
          { b: "GDPR", t: " data-subject rights and processing principles are honoured for international clients." },
          { b: "SOC 2 & ISO 27001 control families", t: " builds map to these control areas (access, change management, monitoring, incident response)." },
        ]},
        { note: "Honesty note: ADYAN designs and operates to these principles and control families. Formal third-party certifications (SOC 2 Type II, ISO 27001) are on the roadmap rather than held today. Current certification status is shared in writing on request, before any engagement." },
      ],
    },
    {
      id: "operations", title: "Secure operations",
      blocks: [
        { ul: [
          { b: "Change management", t: " changes are version-controlled, reviewed, and reversible." },
          { b: "Monitoring", t: " systems are monitored for failures and anomalies, with alerting to a human." },
          { b: "Backups & recovery", t: " data is backed up per the engagement, with a defined recovery approach." },
          { b: "Vendor minimisation", t: " a deliberately short list of reputable sub-processors, disclosed on request." },
        ]},
      ],
    },
    {
      id: "incident", title: "Incident response",
      blocks: [
        { p: "If a security incident affecting your data occurs, I contain it, investigate, and notify affected clients promptly with what happened, the impact, and the remediation, in line with PDPL and, where applicable, GDPR breach-notification timelines." },
      ],
    },
    {
      id: "nda", title: "NDA & disclosure",
      blocks: [
        { p: "An NDA is available on request before any access to your systems or data. For procurement and partner reviews, I'm glad to complete a security questionnaire and walk your team through this practice in detail." },
      ],
    },
  ],
};
ReactDOM.createRoot(document.getElementById("root")).render(<LegalPage data={SECURITY} current="security" />);
