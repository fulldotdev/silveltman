import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionGrid,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileImage,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        <SectionGrid className="not-first:mt-12">
          {items?.map(({ href, title, description, image }) => (
            <Tile key={href} href={href}>
              <TileImage className="aspect-4/3 object-cover" {...image} />
              <TileContent>
                <TileTitle>{title}</TileTitle>
                {description && (
                  <TileDescription>{description}</TileDescription>
                )}
              </TileContent>
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
