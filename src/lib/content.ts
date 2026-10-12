import { i18n } from "astro:config/server"
import { getCollection, getEntry, type CollectionEntry } from "astro:content"

type Page = CollectionEntry<"pages">

export const defaultLocale = i18n?.defaultLocale ?? "nl"
export const locales = i18n?.locales.map((locale) =>
  typeof locale === "string" ? locale : locale.path
) ?? [defaultLocale]

// The default locale lives at the root, the others in a folder of their own.
export const getLocaleHref = (locale: string) =>
  locale === defaultLocale ? "/" : `/${locale}/`

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

type ArticlePage = Page & {
  data: Extract<Page["data"], { type: "article" }>
}

// The posts in a folder, newest first.
export async function getArticles(folder: string) {
  return (
    await getCollection(
      "pages",
      (page) => page.data.type === "article" && page.id.startsWith(`${folder}/`)
    )
  )
    .filter((page): page is ArticlePage => page.data.type === "article")
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

// The companies of one kind, in their order.
export async function getCompanies(
  kind: CollectionEntry<"companies">["data"]["kind"]
) {
  return (
    await getCollection("companies", (company) => company.data.kind === kind)
  ).sort((a, b) => a.data.order - b.data.order)
}

export const formatDate = (date: Date, locale = defaultLocale) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date)

export const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
