import { _android, test as base } from "@playwright/test"
import type { Browser } from "@playwright/test"

// The target of this run and the page each test gets. See
// tests/browser/README.md.
const env = process.env
const targets = ["chrome", "firefox", "webkit", "ios", "android"] as const
export const target = (env.BROWSER_TARGET ||
  "chrome") as (typeof targets)[number]
if (!targets.includes(target))
  throw new Error(`BROWSER_TARGET must be one of ${targets.join(", ")}.`)

function fail(message: string): never {
  throw new Error(message)
}

// There is no default site, so a run never tests one by accident.
const site = base.extend({
  // eslint-disable-next-line no-empty-pattern
  baseURL: async ({}, provide) => {
    const url = env.BASE_URL ?? ""
    if (!/^https?:\/\//.test(url))
      fail("Set BASE_URL to the http(s) address of the site.")
    await provide(url)
  },
})

// iOS: the one open tab of Mobile Safari, through ios_webkit_debug_proxy for
// the chosen simulator or device. Safari offers no new contexts or pages, so
// every test shares that tab with its cookies and storage. The connection
// lasts the whole run, so Playwright saves a failed test's trace first.
const ios = site.extend<object, { safari: Browser }>({
  safari: [
    async ({ playwright }, provide) => {
      let endpoint: URL | undefined
      try {
        endpoint = new URL(env.IOS_WEBKIT_ENDPOINT ?? "")
      } catch {
        // Reported below.
      }
      if (
        !endpoint ||
        !/^(http|ws):$/.test(endpoint.protocol) ||
        !["127.0.0.1", "[::1]", "localhost"].includes(endpoint.hostname)
      )
        fail(
          "Set IOS_WEBKIT_ENDPOINT to the loopback address of ios_webkit_debug_proxy for the chosen simulator or device, such as http://127.0.0.1:19422."
        )
      const browser = await playwright.webkit.connectOverCDP(endpoint.href)
      await provide(browser)
      // Disconnects; the tab stays open.
      await browser.close()
    },
    { scope: "worker" },
  ],
  page: async ({ safari }, provide) => {
    const pages = safari.contexts().flatMap((context) => context.pages())
    if (pages.length !== 1)
      fail(`Mobile Safari has ${pages.length} tabs open; leave exactly one.`)
    await provide(pages[0]!)
  },
})

// Android: a fresh Chrome on the chosen adb device or emulator. Playwright
// records no Android trace by itself, so this keeps one of a failed test.
const android = site.extend({
  // eslint-disable-next-line no-empty-pattern
  page: async ({}, provide, testInfo) => {
    const serial =
      env.ANDROID_SERIAL ||
      fail("Set ANDROID_SERIAL to the adb serial of the device.")
    const devices = await _android.devices()
    // Listing connects to every device; close the others again.
    const others = devices.filter((d) => d.serial() !== serial)
    await Promise.all(others.map((d) => d.close()))
    const device = devices.find((d) => d.serial() === serial)
    const found = others.map((d) => d.serial()).join(", ") || "none"
    if (!device) fail(`No adb device ${serial}; found ${found}.`)
    try {
      // Stops Chrome on the device, then starts it with a new profile.
      const context = await device.launchBrowser()
      await context.tracing.start({ screenshots: true, snapshots: true })
      const page = await context.newPage()
      await provide(page)
      if (testInfo.status === testInfo.expectedStatus)
        await context.tracing.stop()
      else {
        const path = testInfo.outputPath("trace.zip")
        await context.tracing.stop({ path })
        await testInfo.attach("trace", { path })
        const screenshot = await page.screenshot()
        await testInfo.attach("screenshot", {
          body: screenshot,
          contentType: "image/png",
        })
      }
      await context.close()
    } finally {
      await device.close()
    }
  },
})

export const test =
  target === "ios" ? ios : target === "android" ? android : site
