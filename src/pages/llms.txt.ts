import type { APIRoute } from "astro"

import {
  getGlobal,
  getIndexedPages,
  getMarkdownHref,
  getPageHref,
} from "@/lib/content"

// An index for agents (llmstxt.org): every indexed page with a link to its
// Markdown version.
export const GET: APIRoute = async ({ site }) => {
  const { name } = await getGlobal()
  const pages = (await getIndexedPages()).sort((a, b) =>
    getPageHref(a).localeCompare(getPageHref(b))
  )
  const home = pages.find((page) => page.id === "index")
  const links = pages.map(
    (page) =>
      `- [${page.data.title}](${new URL(getMarkdownHref(getPageHref(page)), site)}): ${page.data.description}`
  )

  return new Response(
    `# ${name}\n\n> ${home?.data.description}\n\nEvery page has a Markdown version: add .md to its path, or use /index.md for the homepage.\n\n## Pages\n\n${links.join("\n")}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  )
}
