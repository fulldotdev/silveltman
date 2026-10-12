import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { globalSchema } from "@/schemas/global"
import { pageSchema } from "@/schemas/page"

export const collections = {
  // src/content/pages/<path>.md renders at /<path>/ and index.md at the root.
  pages: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/pages" }),
    schema: pageSchema,
  }),
  // One file per locale, such as nl.yaml.
  globals: defineCollection({
    loader: glob({ pattern: "*.yaml", base: "src/content/globals" }),
    schema: globalSchema,
  }),
}
