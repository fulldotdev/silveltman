# Browser tests

WebdriverIO with Mocha, one target and one session per run. `smoke.spec.ts` opens the homepage and checks its address, title and heading; it changes nothing. `pnpm a11y` stays the accessibility scan.

```sh
BASE_URL=https://deploy-preview-1--example.netlify.app pnpm browser:test
```

`BASE_URL` is required; there is no default site. Each run writes WebdriverIO and driver logs, and a screenshot of each failed test, to `.dev/browser/<run-id>/`. Screenshots show what the page shows, so keep them off for signed-in pages.

| Variable                                         | Use                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BROWSER_TARGET`                                 | `chrome` (default), `firefox`, `safari`, `ios` (Safari through Appium XCUITest) or `android` (Chrome through Appium UiAutomator2)                                                                                                                                                                   |
| `WEBDRIVER_URL`                                  | A running driver or grid, with any credentials in the URL. Required for `ios` and `android`: an Appium server you started, such as `http://127.0.0.1:4723/`, or a cloud grid; this repository installs no Appium. Without it, WebdriverIO starts Chrome, Firefox or `/usr/bin/safaridriver` itself. |
| `DEVICE_NAME`, `DEVICE_UDID`, `PLATFORM_VERSION` | The device for `ios` and `android`                                                                                                                                                                                                                                                                  |
| `WEBDRIVER_CAPABILITIES`                         | Extra capabilities as JSON, such as Appium ports                                                                                                                                                                                                                                                    |
| `CHROME_BINARY`, `FIREFOX_BINARY`                | A browser other than the installed one                                                                                                                                                                                                                                                              |
| `BROWSER_HEADED=1`                               | Show Chrome or Firefox; they run headless by default                                                                                                                                                                                                                                                |
| `BROWSER_RUN_ID`                                 | The run folder name; defaults to the time and target                                                                                                                                                                                                                                                |

Chrome is the required target, also in the Browser smoke workflow, which runs on request against a URL. Other targets run when asked; an unavailable target is reported as unavailable, never as passed.
