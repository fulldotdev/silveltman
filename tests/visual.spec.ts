import { argosScreenshot } from "@argos-ci/playwright"
import { expect, test } from "@playwright/test"

const pages = [
  "/",
  "/contact/"
]

for (const path of pages) {
  test(path, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await argosScreenshot(page, path === "/" ? "home" : path.replace(/^\/|\/$/g, ""))
  })
}
