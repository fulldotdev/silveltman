import { Check } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionGrid,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ text, href }, i) => (
              <Link
                key={href}
                href={href}
                variant={i === 0 ? "default" : "ghost"}
                size="lg"
              >
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        <SectionGrid className="not-first:mt-16">
          {items?.map(({ title, description }) => (
            <Tile key={title} panel={false}>
              <TileContent>
                <Check
                  className="text-primary-foreground bg-primary size-6 rounded-full p-1.5"
                  strokeWidth={4}
                />
                <TileTitle className="mt-3 text-lg">{title}</TileTitle>
                {description && (
                  <TileDescription className="mt-2 text-base/7">
                    {description}
                  </TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
