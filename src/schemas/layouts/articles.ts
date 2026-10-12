import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

// An overview. It lists the article pages in its own folder.
export const articlesSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      lead: z.string(),
    })
    .strict()

export type ArticlesSchema = z.infer<ReturnType<typeof articlesSchema>>
