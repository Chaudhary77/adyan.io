import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";
import "../components/LegalPage.jsx";

const ReactDOM = { createRoot };
const { LegalPage } = window;

const TERMS = {
  eyebrow: "Legal",
  title: "Terms of Service",
  lede: "The terms that govern your use of this website and any engagement with ADYAN. They are written to be readable, scope is honest, and nothing here replaces the specific written agreement that governs a paid engagement.",
  updated: "1 June 2026",
  chips: [
    { ic: "scale", label: "Governed by Saudi law" },
    { ic: "file-signature", label: "Engagement contract prevails" },
  ],
  sections: [
    {
      id: "acceptance", title: "Acceptance",
      blocks: [
        { p: "By using this website or engaging ADYAN, you agree to these terms. If you are accepting on behalf of a company, you confirm you have authority to bind it. If you do not agree, please do not use the site or the services." },
      ],
    },
    {
      id: "services", title: "The services",
      blocks: [
        { p: "ADYAN designs and builds AI agents, workflow automations, WhatsApp and voice assistants, ERP and CRM integrations, and custom apps and dashboards. The website describes capabilities; the precise scope, deliverables, timeline, and price of any engagement are set out in a separate written proposal or statement of work (SOW)." },
        { note: "Where these terms and a signed engagement agreement or SOW differ, the engagement agreement prevails for that engagement." },
      ],
    },
    {
      id: "audit", title: "The free Systems Audit",
      blocks: [
        { p: "The 30-minute Systems Audit is offered free and without obligation. It is advisory: any findings, estimates, or roadmaps shared are indicative and do not constitute a binding commitment to deliver until a written proposal is accepted by both parties." },
      ],
    },
    {
      id: "engagements", title: "Engagements, fees & payment",
      blocks: [
        { ul: [
          { b: "Scope & change", t: " work proceeds against an agreed SOW. Changes are handled by written change request with any impact on price and timeline stated up front." },
          { b: "Fees", t: " quoted in Saudi Riyal (SAR) for KSA clients and in an agreed currency for international clients. Applicable VAT is added where required." },
          { b: "Payment", t: " invoices are issued per the SOW and are ZATCA-compliant. Late payment may pause active work after written notice." },
        ]},
      ],
    },
    {
      id: "ip", title: "Intellectual property",
      blocks: [
        { h3: "What you own" },
        { p: "On full payment, you own the custom configuration, workflows, and deliverables built specifically for you under the engagement, as set out in the SOW." },
        { h3: "What I retain" },
        { p: "I retain ownership of my pre-existing tools, frameworks, libraries, and general know-how used to deliver the work, and I may reuse non-confidential, generalised techniques on other engagements. Your confidential data and brand are never reused." },
      ],
    },
    {
      id: "client", title: "Client responsibilities",
      blocks: [
        { ul: [
          "Provide timely access to the systems, data, and people needed to deliver the work.",
          "Ensure you have the right to share any data or credentials you provide.",
          "Maintain a designated approver for human approval gates on spend, contracts, and other sensitive actions.",
        ]},
      ],
    },
    {
      id: "ai", title: "Use of AI & human oversight",
      blocks: [
        { p: "Systems I build use AI to act on routine work and escalate exceptions. AI outputs can contain errors. Engagements are designed with human approval gates for consequential actions, and you remain responsible for decisions taken on the basis of system outputs. I do not warrant that AI outputs are error-free." },
      ],
    },
    {
      id: "warranty", title: "Warranties & liability",
      blocks: [
        { p: "Services are delivered with reasonable skill and care. To the extent permitted by law, the website is provided \"as is\", and my total liability arising from an engagement is limited to the fees paid for that engagement. I am not liable for indirect or consequential losses. Nothing limits liability that cannot be limited by law." },
      ],
    },
    {
      id: "confidentiality", title: "Confidentiality",
      blocks: [
        { p: "Each party keeps the other's confidential information private and uses it only to perform the engagement. An NDA is available on request before any access is granted, and signing one is encouraged for procurement and partner conversations." },
      ],
    },
    {
      id: "law", title: "Governing law",
      blocks: [
        { p: "These terms are governed by the laws of the Kingdom of Saudi Arabia. Disputes are subject to the competent courts of the Eastern Province, unless an engagement agreement specifies otherwise." },
      ],
    },
  ],
};
ReactDOM.createRoot(document.getElementById("root")).render(<LegalPage data={TERMS} current="terms" />);
