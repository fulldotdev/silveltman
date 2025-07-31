import type { BlockProps } from "@/lib/types"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"
import {
  Tile,
  TileContent,
  TileDescription,
  TileTitle,
} from "@/components/ui/tile"

export default function ({ children, tagline, items }: BlockProps) {
  return (
    <Section id="videos">
      <SectionContainer className="flex flex-col items-center">
        {tagline && (
          <span className="text-accent-foreground text-sm font-medium">
            {tagline}
          </span>
        )}
        {children && (
          <SectionContent className="text-center not-first:mt-4" size="lg">
            {children}
          </SectionContent>
        )}
        <div className="flex max-w-lg flex-col gap-12 not-first:mt-12">
          {items?.map(({ title, href, description }, i) => (
            <Tile
              className="flex flex-col items-center"
              key={i}
              href={href}
              panel={false}
            >
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/TptEeAaCS8Y?si=Rozx-lwhzpTpvTKk"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <TileContent className="items-center text-center">
                <TileTitle>{title}</TileTitle>
                <TileDescription>{description}</TileDescription>
              </TileContent>
            </Tile>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
