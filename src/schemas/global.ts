import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { linkSchema } from "@/schemas/shared"

export const globalSchema = ({ image }: SchemaContext) =>
  z
    .object({
      name: z.string(),
      description: z.string(),
      // The language's own name, such as Nederlands, for the language switch.
      languageName: z.string(),
      // Screen-reader text in the site's language.
      labels: z.object({
        skipToContent: z.string(),
        navigation: z.string(),
        menu: z.object({
          label: z.string(),
          title: z.string(),
          description: z.string(),
          closeLabel: z.string(),
        }),
      }),
      logo: z.object({
        label: z.string(),
        href: z.string(),
        src: image().optional(),
        alt: z.string().optional(),
      }),
      // The person the site is about: the author of posts, the face in the
      // closing and the Person in the structured data.
      person: z.object({
        name: z.string(),
        role: z.string(),
        avatar: image(),
        sameAs: z.string().array(),
      }),
      contact: z.object({
        email: z.email(),
        phone: z.string(),
        phoneHref: z.string(),
        whatsapp: z.string(),
        meeting: z.string(),
        city: z.string(),
      }),
      header: z.object({
        navigation: linkSchema
          .extend({ links: linkSchema.array().optional() })
          .array(),
        buttons: linkSchema
          .extend({
            icon: z.string().optional(),
            // _blank opens the link in a new tab.
            target: z.enum(["_self", "_blank"]).optional(),
          })
          .array(),
      }),
      // The dark closing call to action at the end of every page.
      closing: z.object({
        title: z.string(),
        description: z.string(),
        buttons: linkSchema.extend({ icon: z.string() }).array(),
      }),
      footer: z.object({
        description: z.string(),
        columns: z
          .object({ title: z.string(), links: linkSchema.array() })
          .array(),
        // The contact column, after the page columns.
        contactTitle: z.string(),
        socials: linkSchema.array(),
        legal: linkSchema.array(),
        copyright: z.string(),
      }),
    })
    .strict()

export type GlobalSchema = z.infer<ReturnType<typeof globalSchema>>
