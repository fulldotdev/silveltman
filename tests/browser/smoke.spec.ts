import { expect } from "@playwright/test"

import { test } from "./target.ts"

// The page this smoke opens and what proves it is that page, not an error
// page. Update the title when the homepage title changes.
const expected = {
  path: "/",
  title: "Sil Veltman | Developer en oprichter van Fulldev",
  marker: "main h1",
}

// Read-only: opens one public page and checks that it rendered.
test("renders the homepage", async ({ page, baseURL }) => {
  const url = new URL(expected.path, baseURL)
  // iOS Safari may not report load, so this waits for the content instead.
  await page.goto(url.href, { waitUntil: "commit" })
  await expect(page).toHaveURL(
    (actual) => actual.origin + actual.pathname === url.origin + url.pathname
  )
  await expect(page).toHaveTitle(expected.title)
  await expect(page.locator(expected.marker)).toBeVisible()
})
