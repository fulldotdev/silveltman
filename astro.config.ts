import { defineConfig, fontProviders } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import favicons from "astro-favicons"

export default defineConfig({
  // The production URL. Canonical links, the sitemap, robots.txt and the
  // analytics domain check all derive from it.
  site: "https://silveltman.nl",
  trailingSlash: "always",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  // Each locale has its own pages folder and globals file. The default
  // locale lives at the root; others under /<locale>/. Pages are independent
  // per language: translate folder names freely, there is no pairing.
  i18n: {
    defaultLocale: "nl",
    locales: ["nl"],
    routing: { prefixDefaultLocale: false },
  },
  image: {
    responsiveStyles: true,
    // Widths for images with a layout. Source photos are at most 3840 pixels,
    // so the list ends there; the browser picks one through srcset and sizes.
    breakpoints: [640, 828, 1080, 1280, 1920, 2560, 3840],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-sans",
      weights: ["300 700"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
    },
  ],
  integrations: [
    // Generates the favicons, app icons and web manifest from
    // public/favicon.svg and adds their tags to every page.
    favicons({
      name: "Sil Veltman",
      short_name: "Sil Veltman",
      // The brand's stone page, also behind the app icons. The site has no
      // dark mode, so there is no dark theme colour.
      themes: ["#f8f7f4"],
      background: "#f8f7f4",
      // A website, not an app: open in the browser and keep only the
      // icons current browsers use.
      manifest: { display: "browser", display_override: [], start_url: "/" },
      // Keep the head in the order base.astro writes it.
      withCapo: false,
      icons: {
        favicons: true,
        android: ["android-chrome-192x192.png", "android-chrome-512x512.png"],
        appleIcon: ["apple-touch-icon.png"],
        appleStartup: false,
        windows: false,
        yandex: false,
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
})
