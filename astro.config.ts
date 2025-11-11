import { defineConfig } from "astro/config"

import integration from "./src/lib/integration"

export default defineConfig({
  integrations: [
    integration({
      site: "https://silveltman.nl",
      name: "Sil Veltman",
      defaultLocale: "nl",
      locales: ["nl"],
      favicon: "src/assets/favicon.png",
      fonts: {
        base: "Geist",
        heading: "Geist",
      },
    }),
  ],
})
