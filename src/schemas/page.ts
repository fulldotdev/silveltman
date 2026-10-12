import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { aboutSchema } from "@/schemas/layouts/about"
import { articleSchema } from "@/schemas/layouts/article"
import { articlesSchema } from "@/schemas/layouts/articles"
import { contactSchema } from "@/schemas/layouts/contact"
import { homeSchema } from "@/schemas/layouts/home"
import { pageLayoutSchema } from "@/schemas/layouts/page"
import { workSchema } from "@/schemas/layouts/work"

// Each page type pairs a schema in src/schemas/layouts with a layout of the
// same name in src/layouts. Frontmatter `type` selects both.
export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    aboutSchema(ctx).extend({ type: z.literal("about") }),
    articleSchema(ctx).extend({ type: z.literal("article") }),
    articlesSchema(ctx).extend({ type: z.literal("articles") }),
    contactSchema(ctx).extend({ type: z.literal("contact") }),
    homeSchema(ctx).extend({ type: z.literal("home") }),
    pageLayoutSchema(ctx).extend({ type: z.literal("page") }),
    workSchema(ctx).extend({ type: z.literal("work") }),
  ])
