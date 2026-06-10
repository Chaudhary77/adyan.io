# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install deps
npm run dev        # Vite dev server with HMR → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the built dist/ locally
```

There is **no test suite, linter, or formatter** configured. "Verifying" a change means running `npm run build` (must stay green) and/or loading the affected page under `npm run dev`.

In dev, pages are served by their HTML filename, e.g. `http://localhost:5173/contact.html`. The bare `/` (`index.html`) **is** the landing page. In production, Vercel's `cleanUrls` strips `.html` (`/contact`), and a rewrite serves `index-ar.html` at `/ar` (see [vercel.json](vercel.json)).

## Architecture

This is a **Vite 5 multi-page app (MPA)** — a faithful port of an original in-browser Babel + CDN-React prototype to a real build pipeline. Each marketing page is a standalone HTML entry; there is **no router and no shared SPA shell**. Understanding the port's three load-bearing conventions is essential before editing:

### 1. One HTML entry + one page module per page
Every page is registered in [vite.config.js](vite.config.js) `build.rollupOptions.input` (11 page entries + a static `404.html`). Each `*.html` is a thin shell: `<head>` CSS links + lucide CDN `<script>`, a `<div id="root">`, and a single `<script type="module" src="/src/pages/<slug>.jsx">` before `</body>`. The matching [src/pages/](src/pages/) module mounts the React tree with `createRoot`. To add a page: create the HTML shell, the page module, and add both to the Vite input map.

### 2. The window-bridge pattern (critical)
The original prototype made every component a global. Rather than rewrite 25 components into idiomatic ESM imports/exports, that semantics is preserved:

- Each [src/components/](src/components/) file defines its component(s) and ends with `window.X = X;` exports.
- Consumers **import the defining file for its side-effect**, then destructure off `window`:
  ```js
  import "./HeroZeroGField.jsx";       // runs the file → sets window.ZeroGField
  const { ZeroGField } = window;       // ESM ordering guarantees it's defined
  ```
- Page modules ([src/pages/*.jsx](src/pages/)) follow the same shape: `import React`, `import { createRoot }`, `import "../lib/bootstrap.js"`, import the components they need, then `const { SiteNav, SiteFooter, ... } = window;` before the page body.

When adding a component that another file consumes, you **must** add both the side-effect `import` and the `window` destructure in the consumer — a plain `import { X }` will not work because nothing is ESM-exported.

### 3. Vanilla runtime scripts via bootstrap
Non-React behavior (Arabic i18n dictionary + engine, scroll-reveal, motion) lives in [src/lib/](src/lib/) and is loaded as side-effect imports through [src/lib/bootstrap.js](src/lib/bootstrap.js), which every page module imports first. `engine.js` reads `ar.js`'s dictionary to drive `index-ar.html` and the language toggle.

### Other conventions
- **Classic JSX runtime** (`jsxRuntime: "classic"` in vite.config) — `React` must be in scope in every `.jsx` file (hence the leading `import React from "react";`).
- **lucide icons load from CDN**, pinned (`unpkg.com/lucide@0.469.0`) and `defer`red in each HTML head. Components null-check `window.lucide` and call `createIcons()` in effects, so deferred loading is safe. It is intentionally not bundled.
- **CSS is global, not imported through JS.** The design tokens live in [ds/colors_and_type.css](ds/colors_and_type.css); page styling is split across many top-level `site*.css` files, all wired via `<link>` tags in each HTML head. Fonts (Inter/Sora/Cairo) load via a single Google Fonts `<link>` + preconnect in each HTML head — **never re-add an `@import`** inside CSS (render-blocking chain).
- **Static assets** referenced by runtime strings (logos, uploads, SVGs) live in [public/](public/) and are served verbatim at their `public`-relative paths. `robots.txt` and `sitemap.xml` also live there. The founder photo is expected at `public/ds/assets/founder.jpg`; FounderStrip falls back to the monogram logo via `onError` until it exists.
- **Design-time tooling is gone:** [src/components/SiteTweaks.jsx](src/components/SiteTweaks.jsx) is a `null`-rendering stub and the `TWEAK_DEFAULTS` inline scripts were removed. Both landing pages hardcode the `HeroZeroG` hero.
- **i18n invariant:** any new user-facing English string must get a matching key in [src/lib/ar.js](src/lib/ar.js) (exact trimmed text-node content), or it will silently stay English in Arabic mode. JSX collapses multi-line text to single-spaced strings, so dictionary keys use single spaces. Mark untranslatable nodes with `data-no-i18n`.
- **SEO invariant:** the FAQ copy in [src/components/HomeFAQ.jsx](src/components/HomeFAQ.jsx) must stay in sync with the FAQPage JSON-LD in [index.html](index.html) — Google requires schema FAQs to be visible on the page.

## Contact form

[src/pages/contact.jsx](src/pages/contact.jsx) is a brief-only form (no calendar — an earlier fake slot-picker was deliberately removed; do not reintroduce simulated availability). Delivery is chosen by the `CONTACT_ENDPOINT` constant at the top of the file:
- **Empty (current default):** the form opens WhatsApp (`CONTACT_WHATSAPP`) with the structured brief pre-filled, and the UI explicitly tells the visitor to press send there; a "prefer email" button composes the same brief via mailto. Popup-blocked WhatsApp falls back to mailto.
- **Set to a URL:** POSTs the form as JSON in the background (Formspree/Basin/n8n webhook/etc.) and shows an in-page confirmation instead of the handoff.

## Deployment

Static build → any static host. The repo is on GitHub (`Chaudhary77/adyan.io`, branch `main`); pushing `main` is the deploy trigger once a host (e.g. Vercel, auto-detected as Vite: build `npm run build`, output `dist`) is connected. [vercel.json](vercel.json) handles clean URLs, 301s from the old spaced filenames, and the `/ar` rewrite; Vercel serves the root `404.html` automatically.
