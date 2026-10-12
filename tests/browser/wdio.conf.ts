import { fileURLToPath } from "node:url"
import { browser } from "@wdio/globals"
import { SevereServiceError } from "webdriverio"

// One target and one session per run. See tests/browser/README.md.
const env = process.env
const targets = ["chrome", "firefox", "safari", "ios", "android"]
const target = env.BROWSER_TARGET || "chrome"
if (!targets.includes(target))
  throw new Error(`BROWSER_TARGET must be one of ${targets.join(", ")}.`)
const mobile = target === "ios" || target === "android"

// Workers inherit the environment, so every process writes to the same run.
env.BROWSER_RUN_ID ||= `${new Date().toISOString().replace(/[:.]/g, "-")}-${target}`
const runDir = fileURLToPath(
  new URL(`../../.dev/browser/${env.BROWSER_RUN_ID}/`, import.meta.url)
)

// Without WEBDRIVER_URL, WebdriverIO starts a local driver for Chrome,
// Firefox or Safari. Devices and remote grids always need an endpoint.
let endpoint: URL | undefined
if (env.WEBDRIVER_URL) {
  try {
    endpoint = new URL(env.WEBDRIVER_URL)
    if (
      !/^https?:$/.test(endpoint.protocol) ||
      endpoint.username ||
      endpoint.password
    )
      throw new Error()
  } catch {
    throw new Error(
      "WEBDRIVER_URL must be an http(s) endpoint without credentials."
    )
  }
}
if (mobile && !endpoint)
  throw new Error(`BROWSER_TARGET=${target} needs WEBDRIVER_URL (Appium).`)

let extra: Record<string, unknown> = {}
if (env.WEBDRIVER_CAPABILITIES) {
  try {
    const parsed = JSON.parse(env.WEBDRIVER_CAPABILITIES)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error()
    extra = parsed
  } catch {
    throw new Error("WEBDRIVER_CAPABILITIES must be a JSON object.")
  }
}

const headless = env.BROWSER_HEADED !== "1"
const device = {
  ...(env.DEVICE_NAME && { "appium:deviceName": env.DEVICE_NAME }),
  ...(env.DEVICE_UDID && { "appium:udid": env.DEVICE_UDID }),
  ...(env.PLATFORM_VERSION && {
    "appium:platformVersion": env.PLATFORM_VERSION,
  }),
}
const capabilities: WebdriverIO.Capabilities = {
  chrome: {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: headless ? ["--headless=new"] : [],
      ...(env.CHROME_BINARY && { binary: env.CHROME_BINARY }),
    },
  },
  firefox: {
    browserName: "firefox",
    "moz:firefoxOptions": {
      args: headless ? ["-headless"] : [],
      ...(env.FIREFOX_BINARY && { binary: env.FIREFOX_BINARY }),
    },
  },
  safari: { browserName: "safari", platformName: "macOS" },
  ios: {
    platformName: "iOS",
    browserName: "Safari",
    "appium:automationName": "XCUITest",
    // Real taps instead of synthetic web clicks.
    "appium:nativeWebTap": true,
    ...device,
  },
  android: {
    platformName: "Android",
    browserName: "Chrome",
    "appium:automationName": "UiAutomator2",
    ...device,
  },
}[target]!

export const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./*.spec.ts"],
  maxInstances: 1,
  capabilities: [
    {
      ...capabilities,
      "wdio:enforceWebDriverClassic": true,
      // Extra capabilities as JSON, such as Appium ports or a grid's options.
      ...extra,
    },
  ],
  ...(endpoint && {
    protocol: endpoint.protocol.slice(0, -1),
    hostname: endpoint.hostname,
    port: Number(endpoint.port) || (endpoint.protocol === "https:" ? 443 : 80),
    path: endpoint.pathname,
  }),
  baseUrl: env.BASE_URL,
  outputDir: runDir,
  logLevel: "warn",
  waitforTimeout: 15_000,
  connectionRetryCount: 0,
  framework: "mocha",
  mochaOpts: { ui: "bdd", timeout: 120_000 },
  reporters: ["spec"],
  // There is no default site, so a run never tests one by accident.
  onPrepare() {
    if (!/^https?:\/\//.test(env.BASE_URL ?? ""))
      throw new SevereServiceError(
        "Set BASE_URL to the http(s) address of the site."
      )
  },
  async before() {
    if (!mobile) await browser.setWindowSize(1440, 1000)
  },
  // Screenshots show what the page shows; keep them off for signed-in pages.
  async afterTest(test, _context, { passed }) {
    if (passed) return
    const name = test.title.replace(/[^\w-]+/g, "-")
    await browser.saveScreenshot(`${runDir}${name}.png`)
  },
}
