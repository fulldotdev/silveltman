import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { homeSchema } from "@/schemas/layouts/home"
import { pageLayoutSchema } from "@/schemas/layouts/page"

// Each page type pairs a schema in src/schemas/layouts with a layout of the
// same name in src/layouts. Frontmatter `type` selects both.
export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    homeSchema(ctx).extend({ type: z.literal("home") }),
    pageLayoutSchema(ctx).extend({ type: z.literal("page") }),
  ])
