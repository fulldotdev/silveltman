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
      }),
      logo: z.object({
        label: z.string(),
        href: z.string(),
        src: image(),
      }),
      // The person the site is about: the face in the closing and the Person
      // in the structured data.
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
      // The one action in the header.
      header: z.object({ button: linkSchema }),
      // The dark closing call to action at the end of every page.
      closing: z.object({
        // An anchor, so the header can link to /#<id>.
        id: z.string(),
        title: z.string(),
        description: z.string(),
        buttons: linkSchema.extend({ icon: z.string() }).array(),
      }),
      footer: z.object({
        description: z.string(),
        contactTitle: z.string(),
        socials: linkSchema.array(),
        legal: linkSchema.array(),
        copyright: z.string(),
      }),
    })
    .strict()

export type GlobalSchema = z.infer<ReturnType<typeof globalSchema>>
