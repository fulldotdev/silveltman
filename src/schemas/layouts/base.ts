import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { seoSchema } from "@/schemas/shared"

// Fields every page type shares. Page types extend this schema.
export const baseSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    seo: seoSchema(ctx).optional(),
    // Pages with the same key are translations of each other. The language
    // switch and hreflang links follow it, and the default-locale page is the
    // source every translation must exist for.
    translationKey: z.string().optional(),
    // On a translation: the fingerprint of the source page it was translated
    // from. `pnpm check` reports the value to set after translating.
    translatedFrom: z.string().optional(),
  })

export type BaseSchema = z.infer<ReturnType<typeof baseSchema>>
