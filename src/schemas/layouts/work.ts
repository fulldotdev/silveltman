import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

const groupSchema = z.object({
  title: z.string(),
  description: z.string(),
})

// The overview of companies Sil worked for, from src/content/companies,
// grouped by kind.
export const workSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      lead: z.string(),
      featured: groupSchema,
      clients: groupSchema,
      agencies: groupSchema,
      projectLabel: z.string(),
      viaLabel: z.string(),
    })
    .strict()

export type WorkSchema = z.infer<ReturnType<typeof workSchema>>
