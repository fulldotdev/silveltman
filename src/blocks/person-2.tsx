import type { BlockProps } from "@/lib/types"
import { Heading } from "@/components/ui/heading"
import { Link } from "@/components/ui/link"
import { Prose } from "@/components/ui/prose"
import {
  Section,
  SectionContainer,
  SectionSplit,
} from "@/components/ui/section"
import { Social } from "@/components/ui/social"
import {
  Tile,
  TileContent,
  TileDescription,
  TileFooter,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"
import { AutoForm } from "@/components/auto-form"

export default function ({
  children,
  title,
  description,
  image,
  socials,
  links,
  form,
}: BlockProps) {
  return (
    <Section>
      <SectionContainer size="sm">
        <div className="flex flex-col items-center">
          <img
            className="aspect-square w-full max-w-48 rounded-full object-cover"
            {...image}
          />
          <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          <div className="mt-6 flex gap-4">
            {socials?.map((social) => (
              <Social
                className="text-muted-foreground hover:text-foreground !size-auto"
                variant="link"
                href={social}
              />
            ))}
          </div>
        </div>
        <Prose>{children}</Prose>
      </SectionContainer>
    </Section>
  )
}
