import { readFile } from "node:fs/promises"
import type { APIRoute, GetStaticPaths } from "astro"

import { getIndexedPages, getMarkdownHref, getPageHref } from "@/lib/content"

// The Markdown source of every indexed page, frontmatter included, because
// most of the copy lives there. /index.md is the homepage.
export const getStaticPaths = (async () =>
  (await getIndexedPages()).map((page) => ({
    params: { page: getMarkdownHref(getPageHref(page)).slice(1, -3) },
    props: { filePath: page.filePath },
  }))) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) =>
  new Response(await readFile(props.filePath, "utf8"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
