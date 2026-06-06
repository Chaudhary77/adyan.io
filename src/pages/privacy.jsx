import React from "react";
import { createRoot } from "react-dom/client";
import "../lib/bootstrap.js";
import "../components/SiteChrome.jsx";
import "../components/LegalPage.jsx";

const ReactDOM = { createRoot };
const { LegalPage } = window;

const PRIVACY = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  lede: "How I collect, use, store, and protect personal data. This policy is written around the principles of Saudi Arabia's Personal Data Protection Law (PDPL) and extends GDPR-aligned rights to clients outside the Kingdom.",
  updated: "1 June 2026",
  chips: [
    { ic: "shield-check", label: "PDPL-aligned" },
    { ic: "globe", label: "GDPR rights honoured" },
    { ic: "map-pin", label: "Data resident in-Kingdom by default" },
  ],
  sections: [
    {
      id: "who", title: "Who I am",
      blocks: [
        { p: "ADYAN is a founder-led AI operations studio based in Khobar, Eastern Province, Saudi Arabia. I design and build AI agents, workflow automations, and ERP-connected systems for operations-heavy businesses, and I partner with IT, ERP, and consulting firms to deliver them." },
        { p: "For the purposes of this policy, ADYAN is the data controller for personal data collected through this website and the data processor for client operational data handled inside systems I build and operate on a client's behalf." },
      ],
    },
    {
      id: "collect", title: "What I collect",
      blocks: [
        { h3: "Information you give me" },
        { ul: [
          { b: "Contact details", t: " name, company, work email, and WhatsApp number when you book a Systems Audit or message me." },
          { b: "Operational context", t: " the workflow, tools, and team-size details you share so a call starts with the work, not introductions." },
          { b: "Correspondence", t: " messages, voice notes, and documents you send by email or WhatsApp." },
        ]},
        { h3: "Information collected automatically" },
        { ul: [
          { b: "Basic usage data", t: " pages viewed and device/browser type, used only to keep the site working and improve it." },
          { b: "Preferences", t: " your language (Arabic/English) and theme choice, stored locally in your browser, never on a server." },
        ]},
        { note: "I do not collect special-category data (health, religious belief, biometrics) through this website, and I ask clients not to send it over WhatsApp or email. Where a built system must process sensitive data, that is governed by a separate written agreement." },
      ],
    },
    {
      id: "use", title: "How I use it",
      blocks: [
        { ul: [
          { b: "To respond", t: " answer your enquiry, scope an engagement, and run the free Systems Audit." },
          { b: "To deliver", t: " design, build, and operate the systems you engage me for." },
          { b: "To comply", t: " meet legal, tax (ZATCA), and contractual obligations." },
        ]},
        { p: "I do not sell personal data, and I never use client operational data to train third-party models or for any purpose beyond delivering your engagement." },
      ],
    },
    {
      id: "basis", title: "Legal basis & consent",
      blocks: [
        { p: "I process personal data on the basis of your consent (when you contact me), the performance of a contract (when delivering an engagement), and legitimate interest (keeping the site secure). Under PDPL and GDPR you may withdraw consent at any time; doing so does not affect processing already carried out." },
      ],
    },
    {
      id: "storage", title: "Storage, location & retention",
      blocks: [
        { p: "By default, operational data for Saudi clients is stored in cloud regions inside the Kingdom, or on-premise / in your own cloud tenancy where an engagement requires it. Website enquiry data is held only as long as needed to respond and to maintain our business relationship." },
        { ul: [
          { b: "In-Kingdom residency", t: " the default for KSA engagements, supporting data-sovereignty requirements." },
          { b: "Retention", t: " enquiry data is reviewed annually and deleted when no longer needed; contractual records are kept for the period required by Saudi law." },
        ]},
      ],
    },
    {
      id: "sharing", title: "Sharing & sub-processors",
      blocks: [
        { p: "I keep the supply chain short. Where a sub-processor is unavoidable (for example, a cloud host or the WhatsApp Business API), I use reputable providers under data-processing terms, and I disclose them to clients on request before any access is granted." },
        { p: "In white-label partnerships, your client's data is handled under your brand and our partnership agreement, never resold or repurposed." },
      ],
    },
    {
      id: "rights", title: "Your rights",
      blocks: [
        { p: "Under PDPL and, for international clients, GDPR, you have the right to:" },
        { ul: [
          "Access the personal data I hold about you.",
          "Request correction of inaccurate data.",
          "Request deletion of your data, subject to legal retention requirements.",
          "Object to or restrict certain processing.",
          "Withdraw consent at any time.",
        ]},
        { p: "To exercise any of these, email mail@adyan.io. I respond within one business day and complete verified requests within 30 days." },
      ],
    },
    {
      id: "security", title: "Security",
      blocks: [
        { p: "Personal data is encrypted in transit and at rest, access is limited on a need-to-know basis, and every system I build carries a full audit trail. See the Security overview for engineering practice in detail." },
      ],
    },
    {
      id: "changes", title: "Changes to this policy",
      blocks: [
        { p: "I may update this policy as the business and the regulatory landscape evolve. The effective date above always reflects the current version. Material changes affecting active clients are communicated directly." },
      ],
    },
  ],
};
ReactDOM.createRoot(document.getElementById("root")).render(<LegalPage data={PRIVACY} current="privacy" />);
