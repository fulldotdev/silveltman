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
      // The social image of every page without one of its own: 1200 by 630.
      image: z.object({ src: image(), alt: z.string() }),
      // The person the site is about, for the structured data.
      person: z.object({
        name: z.string(),
        role: z.string(),
        avatar: image(),
        // The X handle, for twitter:creator.
        x: z.string(),
        sameAs: z.string().array(),
      }),
      // For the structured data; the contact page has its own options.
      contact: z.object({
        email: z.email(),
        phone: z.string(),
        city: z.string(),
      }),
      // The one action in the header.
      header: z.object({ button: linkSchema }),
      // The dark footer at the end of every page, centred: a title, one
      // line, the button to the contact page, the social buttons and the
      // legal line.
      footer: z.object({
        title: z.string(),
        description: z.string(),
        button: linkSchema,
        socials: linkSchema.array(),
        legal: linkSchema.array(),
        copyright: z.string(),
      }),
    })
    .strict()

export type GlobalSchema = z.infer<ReturnType<typeof globalSchema>>
