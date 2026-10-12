import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

// A company Sil worked for, one file per company in src/content/companies.
// `kind` sorts it on /werk/: a client, or an agency he works with.
export const companySchema = ({ image }: SchemaContext) =>
  z
    .object({
      name: z.string(),
      kind: z.enum(["client", "agency"]),
      // Lower comes first; the homepage shows the companies with a
      // screenshot, in this order.
      order: z.number(),
      url: z.url().optional(),
      // The project page on full.dev, when there is one.
      project: z.url().optional(),
      // The agency the work came through, such as Small Giants.
      via: z.string().optional(),
      scope: z.string(),
      work: z.string().optional(),
      tags: z.string().array().default([]),
      logo: z.object({ src: image(), height: z.number() }).strict().optional(),
      screenshot: image().optional(),
      // The panel colour behind the screenshot.
      tint: z.string().optional(),
    })
    .strict()

export type CompanySchema = z.infer<ReturnType<typeof companySchema>>
