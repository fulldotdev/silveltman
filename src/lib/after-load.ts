/**
 * Runs work the first view does not need once the page has loaded and the
 * browser is idle, so it holds up neither the first paint nor the first tap.
 */
export function afterLoad(run: () => void) {
  const idle = () => {
    if ("requestIdleCallback" in window)
      requestIdleCallback(() => run(), { timeout: 2000 })
    else setTimeout(run)
  }
  if (document.readyState === "complete") idle()
  else addEventListener("load", idle, { once: true })
}
