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
        // index.html is the landing page (homepage at "/"); no redirect hop.
        "root": resolve(__dirname, "index.html"),
        "about": resolve(__dirname, "about.html"),
        "contact": resolve(__dirname, "contact.html"),
        "index-ar": resolve(__dirname, "index-ar.html"),
        "partnerships": resolve(__dirname, "partnerships.html"),
        "privacy": resolve(__dirname, "privacy.html"),
        "process": resolve(__dirname, "process.html"),
        "security": resolve(__dirname, "security.html"),
        "services": resolve(__dirname, "services.html"),
        "systems-built": resolve(__dirname, "systems-built.html"),
        "terms": resolve(__dirname, "terms.html"),
      },
    },
  },
});
