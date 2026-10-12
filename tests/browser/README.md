# Browser tests

Playwright Test, one target per run. `smoke.spec.ts` opens the homepage and checks its address, title and heading; it changes nothing. `pnpm a11y` stays the accessibility scan.

```sh
BASE_URL=https://deploy-preview-1--example.netlify.app pnpm browser:test
BASE_URL=https://deploy-preview-1--example.netlify.app BROWSER_TARGET=firefox pnpm browser:test
```

`BASE_URL` is required; there is no default site. Each run writes to `.dev/browser/<run-id>/`: `results` keeps a screenshot, trace and error context of each failed test, and `report` the HTML report (`pnpm exec playwright show-report .dev/browser/<run-id>/report`). Screenshots and traces show what the page shows, so keep them off for signed-in pages.

## Targets

This repository requires `chrome`, also in the Browser smoke workflow, which runs on request against a URL. A site or app that needs more targets lists them here. Other targets run when asked. A requested target that is unavailable fails the run; it never counts as passed or skipped.

| `BROWSER_TARGET`   | Browser                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `chrome` (default) | The installed Google Chrome, headless                                                                                                                                                                              |
| `firefox`          | Playwright's Firefox, headless. Install it once with `pnpm exec playwright install firefox`.                                                                                                                       |
| `webkit`           | Playwright's WebKit, headless; close to Safari, but not Safari. Install it once with `pnpm exec playwright install webkit`.                                                                                        |
| `android`          | Chrome on an Android emulator or device. Set `ANDROID_SERIAL` to its adb serial, such as `emulator-5554`. Each test stops Chrome there and starts it with a new profile.                                           |
| `ios`              | Mobile Safari on an iOS simulator or device, through its Web Inspector. Set `IOS_WEBKIT_ENDPOINT` to `ios_webkit_debug_proxy` for exactly that simulator or device, on loopback, such as `http://127.0.0.1:19422`. |

`BROWSER_RUN_ID` names the run folder; it defaults to the time and target. `--headed` shows a desktop browser.

## iOS

Playwright drives the one open Safari tab; it fails when more or none are open. It cannot open pages or contexts, so every test shares that tab with its cookies and storage, also between runs. Navigate with `waitUntil: "commit"` and wait for content, because Safari does not always report load. Traces have DOM snapshots without screenshots, and screenshots use device pixels.

Playwright makes clicks and typing in the page with JavaScript, so they are not native input. Check taps, the keyboard, gestures and Safari's own interface interactively with agent-device in T3. Never drive Safari through `safaridriver` or WebDriver.
