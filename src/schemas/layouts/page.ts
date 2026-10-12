import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const pageLayoutSchema = (ctx: SchemaContext) => baseSchema(ctx).strict()

export type PageLayoutSchema = z.infer<ReturnType<typeof pageLayoutSchema>>
