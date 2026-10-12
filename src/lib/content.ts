import { i18n } from "astro:config/server"
import { getCollection, getEntry, type CollectionEntry } from "astro:content"

type Page = CollectionEntry<"pages">

export const defaultLocale = i18n?.defaultLocale ?? "nl"
export const locales = i18n?.locales.map((locale) =>
  typeof locale === "string" ? locale : locale.path
) ?? [defaultLocale]

function getPageLocale(page: Page) {
  const folder = page.id.split("/")[0]
  return folder !== defaultLocale && locales.includes(folder)
    ? folder
    : defaultLocale
}

// The pages that share a translation key, by locale.
export async function getTranslations(key?: string) {
  if (!key) return new Map<string, Page>()
  const pages = await getCollection(
    "pages",
    (page) => page.data.translationKey === key
  )
  return new Map(pages.map((page) => [getPageLocale(page), page]))
}

export async function getGlobal(locale = defaultLocale) {
  const global = await getEntry("globals", locale)
  if (!global) throw new Error(`Add src/content/globals/${locale}.yaml`)
  return global.data
}

export const getPageHref = (page: Page) =>
  page.id === "index" ? "/" : `/${page.id}/`

// The Markdown version of a page: /index.md for the homepage, /<path>.md
// for the others.
export const getMarkdownHref = (href: string) =>
  href === "/" ? "/index.md" : `${href.replace(/\/$/, "")}.md`

// Pages for search engines and agents: all except those marked seo.noindex,
// such as 404 and bedankt.
export const getIndexedPages = () =>
  getCollection("pages", (page) => !page.data.seo?.noindex)
