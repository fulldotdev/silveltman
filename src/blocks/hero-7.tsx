import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
} from "@/components/ui/section"

export default function ({ children, links, image, tagline }: BlockProps) {
  return (
    <Section className="overflow-hidden">
      <SectionContainer className="flex flex-col items-center">
        {tagline && (
          <span className="text-accent-foreground text-base font-medium">
            {tagline}
          </span>
        )}
        <SectionContent
          size="xl"
          className="animate-fade-1 text-center text-balance not-first:mt-5"
        >
          {children}
        </SectionContent>
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ href, text }, i) => (
              <Link
                className={i === 0 ? "animate-fade-2" : "animate-fade-3"}
                key={i}
                href={href}
                variant={i === 0 ? "default" : "outline"}
                size="lg"
              >
                {text}
              </Link>
            ))}
          </SectionFooter>
        )}
        <div className="animate-fade-5 relative">
          <div className="from-primary/50 pointer-events-none absolute top-1/4 bottom-0 -left-[150%] h-1/2 w-[400%] rotate-25 animate-pulse bg-radial-[at_50%_50%] via-transparent to-transparent" />
          {image?.src && (
            <img
              className="relative max-w-sm rounded-2xl not-first:mt-16"
              {...image}
            />
          )}
        </div>
      </SectionContainer>
    </Section>
  )
}
