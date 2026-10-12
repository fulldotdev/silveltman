import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { linkSchema } from "@/schemas/shared"

// The contact page: the ways to reach Sil as buttons, then his Cal.com
// booking page inline.
export const contactSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      lead: z.string(),
      options: linkSchema.extend({ icon: z.string() }).array(),
      booking: z.object({
        title: z.string(),
        description: z.string(),
        url: z.url(),
        // The direct link under the calendar, for when it does not load.
        linkLabel: z.string(),
      }),
    })
    .strict()

export type ContactSchema = z.infer<ReturnType<typeof contactSchema>>
