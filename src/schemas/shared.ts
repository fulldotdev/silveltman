import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    src: image(),
    alt: z.string(),
  })

export const seoSchema = (ctx: SchemaContext) =>
  z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: imageSchema(ctx).optional(),
      canonical: z.string().optional(),
      noindex: z.boolean().optional(),
    })
    .strict()
