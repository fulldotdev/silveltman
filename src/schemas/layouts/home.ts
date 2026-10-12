import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { imageSchema, linkSchema } from "@/schemas/shared"

// The one-pager: a centred hero with a portrait, then the videos.
export const homeSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      hero: z.object({
        title: z.string(),
        description: z.string(),
        buttons: linkSchema.array(),
        image: imageSchema(ctx),
      }),
      videos: z.object({
        // An anchor, so the hero can link to /#<id>.
        id: z.string(),
        title: z.string(),
        description: z.string(),
        button: linkSchema,
        // Shorts, newest first. The thumbnail is the Short's own frame.
        items: z
          .object({
            title: z.string(),
            href: z.url(),
            thumbnail: ctx.image(),
          })
          .array(),
      }),
    })
    .strict()

export type HomeSchema = z.infer<ReturnType<typeof homeSchema>>
