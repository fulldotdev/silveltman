import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"
import robotsTxt from "astro-robots-txt"
import { defineConfig, fontProviders } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://silveltman.nl",
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Geist",
        cssVariable: "--font-sans",
        weights: [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ],
      },
      {
        provider: fontProviders.google(),
        name: "Geist",
        cssVariable: "--font-serif",
        weights: [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
        ],
      },
    ],
  },
  prefetch: {
    prefetchAll: true,
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [robotsTxt(), sitemap(), react(), favicons()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/disclaimer": "/beleid/disclaimer",
    "/cookies": "/beleid/cookies",
    "/privacy": "/beleid/privacy",
    "/algemene-voorwaarden": "/beleid/algemene-voorwaarden",
    "/lid-worden": "/aanmelden/",
    "/contact/lidmaatschapstest/": "/gratis-proefles/",
    "/contact/gratis-proefles/": "/gratis-proefles/",
    "/contact/aanmelden/": "/aanmelden/",
    "/proefles":
      "https://thegymharen.gotgrib.nl/member/selfservice/registration/proeflesformulier",
    "/review": "https://g.page/r/Cab34zE9QjuTEAE/review",
  },
})
