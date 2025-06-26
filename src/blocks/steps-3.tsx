import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionGrid,
  SectionSplit,
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
      <SectionContainer className="flex flex-col">
        <SectionSplit sticky={true}>
          <div className="flex flex-col">
            {children && <SectionContent size="4xl">{children}</SectionContent>}
            {links && links.length > 0 && (
              <SectionFooter className="not-first:mt-8">
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
          </div>
          <SectionGrid className="grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 lg:col-span-2">
            {items?.map(({ title, description }, i) => (
              <Tile key={title} panel={false} className="flex flex-col">
                <TileContent>
                  <span className="text-primary text-4xl font-semibold">
                    {i + 1}.
                  </span>
                  <TileTitle className="text-xl">{title}</TileTitle>
                  {description && (
                    <TileDescription className="text-base/7">
                      {description}
                    </TileDescription>
                  )}
                </TileContent>
              </Tile>
            ))}
          </SectionGrid>
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
