/// <reference types="mocha" />
/// <reference types="webdriverio" />
/// <reference types="@wdio/globals/types" />
import { $, browser, expect } from "@wdio/globals"

// The page this smoke opens and what proves it is that page, not an error
// page. Update the title when the homepage title changes.
const page = {
  path: "/",
  title: "Sil Veltman | Developer en oprichter van Fulldev",
}

// Read-only: opens one public page and checks that it rendered.
describe("smoke", () => {
  it("renders the homepage", async () => {
    await browser.url(page.path)
    const url = new URL(await browser.getUrl())
    const expected = new URL(page.path, process.env.BASE_URL)
    expect(url.origin + url.pathname).toBe(expected.origin + expected.pathname)
    await expect(browser).toHaveTitle(page.title)
    await expect($("main h1")).toBeDisplayed()
  })
})
