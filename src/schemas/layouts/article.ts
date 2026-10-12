import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { imageSchema, linkSchema } from "@/schemas/shared"

// A post. Most started on LinkedIn: `source` links to the original, and
// the image is optional because many posts are text only.
export const articleSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string(),
      image: imageSchema(ctx).optional(),
      source: linkSchema.optional(),
    })
    .strict()

export type ArticleSchema = z.infer<ReturnType<typeof articleSchema>>
