import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionGrid,
} from "@/components/ui/section"
import { Tile, TileDescription, TileTitle } from "@/components/ui/tile"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col">
        {children && <SectionContent size="4xl">{children}</SectionContent>}
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ text, href }, i) => (
              <Link
                key={href}
                href={href}
                variant={i === 0 ? "default" : "ghost"}
              >
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        <SectionGrid className="gap-16 not-first:mt-16">
          {items?.map(({ title, description }, i) => (
            <Tile key={title} panel={false} className="flex flex-col">
              <div className="bg-primary relative flex size-6 items-center justify-center rounded-full">
                <div className="text-primary-foreground font-semibold">
                  {i + 1}
                </div>
              </div>
              <TileTitle className="text-lg">{title}</TileTitle>
              {description && (
                <TileDescription className="text-base/7">
                  {description}
                </TileDescription>
              )}
            </Tile>
          ))}
        </SectionGrid>
      </SectionContainer>
    </Section>
  )
}
