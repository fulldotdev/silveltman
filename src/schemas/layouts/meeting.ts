import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

// Sil's Cal.com booking page across the viewport, as full.dev/meeting/.
export const meetingSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      booking: z.url(),
    })
    .strict()

export type MeetingSchema = z.infer<ReturnType<typeof meetingSchema>>
