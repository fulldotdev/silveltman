import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { contactSchema } from "@/schemas/layouts/contact"
import { homeSchema } from "@/schemas/layouts/home"
import { meetingSchema } from "@/schemas/layouts/meeting"
import { pageLayoutSchema } from "@/schemas/layouts/page"

// Each page type pairs a schema in src/schemas/layouts with a layout of the
// same name in src/layouts. Frontmatter `type` selects both.
export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    contactSchema(ctx).extend({ type: z.literal("contact") }),
    homeSchema(ctx).extend({ type: z.literal("home") }),
    meetingSchema(ctx).extend({ type: z.literal("meeting") }),
    pageLayoutSchema(ctx).extend({ type: z.literal("page") }),
  ])
