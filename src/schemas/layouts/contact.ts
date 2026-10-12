import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

// The ways to reach Sil, one card each. The Markdown body follows them.
export const contactSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      lead: z.string(),
      options: z
        .object({
          title: z.string(),
          description: z.string(),
          label: z.string(),
          href: z.string(),
          icon: z.string(),
        })
        .array(),
    })
    .strict()

export type ContactSchema = z.infer<ReturnType<typeof contactSchema>>
