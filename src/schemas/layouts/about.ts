import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { imageSchema } from "@/schemas/shared"

// The about page: a head with a portrait, the story in the Markdown body,
// then the timeline and what he stands for.
export const aboutSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      lead: z.string(),
      image: imageSchema(ctx),
      timeline: z.object({
        title: z.string(),
        description: z.string(),
        items: z
          .object({
            period: z.string(),
            title: z.string(),
            description: z.string(),
            href: z.string().optional(),
          })
          .array(),
      }),
      values: z.object({
        title: z.string(),
        description: z.string(),
        items: z.object({ title: z.string(), description: z.string() }).array(),
      }),
    })
    .strict()

export type AboutSchema = z.infer<ReturnType<typeof aboutSchema>>
