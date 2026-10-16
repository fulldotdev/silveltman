# Browser tests

Playwright Test, one target per run. `smoke.spec.ts` opens the homepage and checks its address, title and heading; it changes nothing. `pnpm a11y` stays the accessibility scan.

```sh
BASE_URL=https://deploy-preview-1--example.netlify.app vp run browser:test
BASE_URL=https://deploy-preview-1--example.netlify.app BROWSER_TARGET=firefox vp run browser:test
```

`BASE_URL` is required; there is no default site. Each run writes to `.dev/browser/<run-id>/`: `results` keeps a screenshot, trace and error context of each failed test, and `report` the HTML report (`vp exec playwright show-report .dev/browser/<run-id>/report`). Screenshots and traces show what the page shows, so keep them off for signed-in pages.

## Targets

This repository requires `chromium`, also in the Browser smoke workflow, which runs on request against a URL. A site or app that needs more targets lists them here. Other targets run when asked. A requested target that is unavailable fails the run; it never counts as passed or skipped.

| `BROWSER_TARGET`     | Browser                                                                                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chromium` (default) | Playwright's Chromium, headless. Install it once with `vp exec playwright install chromium --only-shell`.                                                                                                                                                                                                                 |
| `firefox`            | Playwright's Firefox, headless. Install it once with `vp exec playwright install firefox`.                                                                                                                                                                                                                                |
| `webkit`             | Playwright's WebKit, headless; close to Safari, but not Safari. Install it once with `vp exec playwright install webkit`.                                                                                                                                                                                                 |
| `android`            | Chrome on a dedicated Android test emulator or device, signed out of the site. Set `ANDROID_SERIAL` to its adb serial, such as `emulator-5554`. Each test stops Chrome there and starts it again with its existing profile, so cookies and storage carry over between tests and runs.                                     |
| `ios`                | Mobile Safari on a dedicated iOS test simulator or device, signed out of the site, through its Web Inspector. Before the run, open exactly one Safari tab there at `BASE_URL`. Set `IOS_WEBKIT_ENDPOINT` to `ios_webkit_debug_proxy` for exactly that simulator or device, on loopback, such as `http://127.0.0.1:19422`. |

`BROWSER_RUN_ID` names the run folder; it defaults to the time and target. `--headed` shows a desktop browser; install the full managed Chromium first with `vp exec playwright install chromium`.

## iOS

Playwright drives the one open Safari tab; it fails when more or none are open, or when that tab shows another site than `BASE_URL`, because going to another site from it can time out after the page rendered. It cannot open pages or contexts, so every test shares that tab with its cookies and storage, also between runs. Navigate with `waitUntil: "commit"` and wait for content, because Safari does not always report load. Traces have DOM snapshots without screenshots, and screenshots use device pixels.

Playwright makes clicks and typing in the page with JavaScript, so they are not native input. Check taps, the keyboard, gestures and Safari's own interface interactively with agent-device in T3. Never drive Safari through `safaridriver` or WebDriver.
