import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { imageSchema, linkSchema } from "@/schemas/shared"

const headSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const reviewSchema = ({ image }: SchemaContext) =>
  z
    .object({
      name: z.string(),
      company: z.string().optional(),
      quote: z.string(),
      image: image().optional(),
    })
    .strict()

export const homeSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      hero: z.object({
        title: z.string(),
        description: z.string(),
        buttons: linkSchema.array(),
        image: imageSchema(ctx),
        // The line under the buttons, beside the faces of reviewers.
        proof: z.string(),
      }),
      brands: z.object({
        title: z.string(),
        logos: z
          .object({ name: z.string(), src: ctx.image(), height: z.number() })
          .array(),
      }),
      // What Sil does, one card per role.
      roles: headSchema.extend({
        items: z
          .object({
            title: z.string(),
            description: z.string(),
            href: z.string(),
            linkLabel: z.string(),
          })
          .array(),
      }),
      companies: headSchema.extend({ button: linkSchema }),
      figures: headSchema.extend({
        items: z.object({ value: z.string(), label: z.string() }).array(),
      }),
      posts: headSchema.extend({ button: linkSchema }),
      videos: headSchema
        .extend({
          button: linkSchema,
          items: z
            .object({
              title: z.string(),
              href: z.url(),
              thumbnail: ctx.image(),
            })
            .array(),
        })
        .optional(),
      reviews: headSchema.extend({ items: reviewSchema(ctx).array() }),
    })
    .strict()

export type HomeSchema = z.infer<ReturnType<typeof homeSchema>>
