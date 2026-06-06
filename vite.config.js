import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Multi-page app: each marketing page is its own HTML entry. Classic JSX
// runtime mirrors the original in-browser Babel setup (React must be in scope).
export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  build: {
    rollupOptions: {
      input: {
        "about": resolve(__dirname, "About.html"),
        "adyan-landing-page": resolve(__dirname, "ADYAN Landing Page.html"),
        "contact": resolve(__dirname, "Contact.html"),
        "index-ar": resolve(__dirname, "index-ar.html"),
        "partnerships": resolve(__dirname, "Partnerships.html"),
        "privacy": resolve(__dirname, "Privacy.html"),
        "process": resolve(__dirname, "Process.html"),
        "security": resolve(__dirname, "Security.html"),
        "services": resolve(__dirname, "Services.html"),
        "systems-built": resolve(__dirname, "Systems Built.html"),
        "terms": resolve(__dirname, "Terms.html"),
        "root": resolve(__dirname, "index.html"),
      },
    },
  },
});
