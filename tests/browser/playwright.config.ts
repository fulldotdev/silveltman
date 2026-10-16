import { fileURLToPath } from "node:url"
import { defineConfig } from "@playwright/test"

import { target } from "./target.ts"

// One target per run. See tests/browser/README.md.
const env = process.env

// Workers inherit the environment, so every process writes to the same run.
env.BROWSER_RUN_ID ||= `${new Date().toISOString().replace(/[:.]/g, "-")}-${target}`
const run = fileURLToPath(
  new URL(`../../.dev/browser/${env.BROWSER_RUN_ID}/`, import.meta.url)
)

// Desktop targets use Playwright's own browsers; target.ts connects iOS and
// Android.
const browsers = {
  chromium: { browserName: "chromium" },
  firefox: { browserName: "firefox" },
  webkit: { browserName: "webkit" },
  ios: {},
  android: {},
} as const

export default defineConfig({
  testDir: ".",
  outputDir: `${run}results`,
  forbidOnly: !!env.CI,
  retries: 0,
  workers: 1,
  timeout: 120_000,
  reporter: [
    ["list"],
    ["html", { outputFolder: `${run}report`, open: "never" }],
  ],
  expect: {
    timeout: 15_000,
    // iOS Safari only captures screenshots in device pixels.
    toHaveScreenshot: { scale: "device" },
  },
  use: {
    viewport: { width: 1440, height: 1000 },
    // Screenshots and traces show what the page shows; keep them off for
    // signed-in pages. iOS Safari records traces without screenshots.
    screenshot: "only-on-failure",
    trace: {
      mode: "retain-on-failure",
      screenshots: target !== "ios",
      snapshots: true,
      sources: true,
    },
  },
  projects: [{ name: target, use: browsers[target] }],
})
