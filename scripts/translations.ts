// Checks the translations of a site with more than one language.
//
//   node scripts/translations.ts        the content, in `check:source`
//   node scripts/translations.ts dist   the built pages, in `check:build`
//
// Content: pages with the same translationKey are translations of each
// other. The page in the default locale is the source, and every other
// locale needs a translation of it. A translation records the fingerprint of
// its source in translatedFrom, so a change to the source shows which
// translations are behind. The error names the value to set.
//
// Built pages: a page links only to pages in its own language, except to its
// own translations (its hreflang links) and to the home of each language.
import { createHash } from "node:crypto"
import { readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"

const errors: string[] = []

const files = (dir: string, extension: string): string[] =>
  readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(extension))
    .map((file) => join(dir, file))

const localeOf = (path: string, locales: string[], defaultLocale: string) => {
  const folder = path.split(/[\\/]/).find(Boolean) ?? ""
  return folder !== defaultLocale && locales.includes(folder)
    ? folder
    : defaultLocale
}

function checkContent() {
  const pagesDir = "src/content/pages"
  // Each language has a globals file; astro.config.ts names the default.
  const locales = readdirSync("src/content/globals")
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => file.slice(0, -".yaml".length))
  if (locales.length < 2) return
  const defaultLocale = readFileSync("astro.config.ts", "utf8").match(
    /defaultLocale:\s*["']([^"']+)["']/
  )?.[1]
  if (!defaultLocale || !locales.includes(defaultLocale)) {
    errors.push("Set i18n.defaultLocale in astro.config.ts to a globals file")
    return
  }

  const fingerprint = (file: string) =>
    createHash("sha256")
      .update(readFileSync(file, "utf8").replaceAll("\r\n", "\n"))
      .digest("hex")
      .slice(0, 12)
  const field = (source: string, name: string) =>
    source
      .split(/^---$/m)[1]
      ?.match(
        new RegExp(`^${name}:\\s*["']?([^"'#\\n]+?)["']?\\s*(#.*)?$`, "m")
      )?.[1]

  const keys = new Map<string, Map<string, string>>()
  for (const file of files(pagesDir, ".md")) {
    const key = field(readFileSync(file, "utf8"), "translationKey")
    if (!key) continue
    const locale = localeOf(relative(pagesDir, file), locales, defaultLocale)
    const pages = keys.get(key) ?? new Map<string, string>()
    const other = pages.get(locale)
    if (other)
      errors.push(`${other} and ${file} both have translationKey ${key}`)
    keys.set(key, pages.set(locale, file))
  }

  for (const [key, pages] of keys) {
    const source = pages.get(defaultLocale)
    if (!source) {
      errors.push(
        `translationKey ${key} has no ${defaultLocale} page to translate from`
      )
      continue
    }
    const expected = fingerprint(source)
    for (const locale of locales.filter((other) => other !== defaultLocale)) {
      const translation = pages.get(locale)
      if (!translation) {
        errors.push(`${source} has no ${locale} translation`)
        continue
      }
      const recorded = field(
        readFileSync(translation, "utf8"),
        "translatedFrom"
      )
      if (recorded !== expected)
        errors.push(
          recorded
            ? `${translation} is behind ${source}. Update the translation, then set translatedFrom: ${expected}`
            : `${translation} needs translatedFrom: ${expected} once it matches ${source}`
        )
    }
  }
}

function checkBuild(dist: string) {
  // Pages without a lang, such as Astro redirect pages, have no language.
  const pages = files(dist, ".html")
    .map((file) => {
      const html = readFileSync(file, "utf8")
      return {
        file,
        html,
        lang: html.match(/<html[^>]*\slang="([^"]+)"/)?.[1] ?? "",
      }
    })
    .filter((page) => page.lang)
  const defaultLocale = pages.find(
    (page) => page.file === join(dist, "index.html")
  )?.lang
  const locales = [...new Set(pages.map((page) => page.lang))]
  if (locales.length < 2 || !defaultLocale) return

  const homes = new Set(
    locales.map((locale) => (locale === defaultLocale ? "/" : `/${locale}/`))
  )
  for (const { file, html, lang } of pages) {
    const alternates = new Set(
      [...html.matchAll(/<link[^>]*\shreflang="[^"]*"[^>]*>/g)].map(
        ([tag]) =>
          new URL(tag.match(/\shref="([^"]*)"/)?.[1] ?? "/", "x:/").pathname
      )
    )
    for (const [, href] of html.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
      if (!href.startsWith("/") || href.startsWith("//")) continue
      const path = new URL(href, "x:/").pathname
      // Files such as /index.md or a PDF have no language.
      if (path.split("/").pop()?.includes(".")) continue
      const target = localeOf(path, locales, defaultLocale)
      if (target !== lang && !alternates.has(path) && !homes.has(path))
        errors.push(`${file} (${lang}) links to ${href} (${target})`)
    }
  }
}

const dist = process.argv[2]
if (dist) checkBuild(dist)
else checkContent()

if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}
