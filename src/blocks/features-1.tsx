import { Check } from "lucide-react"

import type { BlockProps } from "@/lib/types"
import { Heading } from "@/components/ui/heading"
import { Link } from "@/components/ui/link"
import { Paragraph } from "@/components/ui/paragraph"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
} from "@/components/ui/section"

export default function ({ children, links, items }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center" size="4xl">
            {children}
          </SectionContent>
        )}
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
        <div className="mt-16 flex flex-wrap justify-center gap-16">
          {items?.map(({ title, description }) => (
            <div
              key={title}
              className="flex max-w-md min-w-2xs grow-1 basis-xs flex-col items-center"
            >
              <div className="bg-primary flex size-7 items-center justify-center rounded-full">
                <Check
                  className="text-primary-foreground size-3"
                  strokeWidth={4}
                />
              </div>
              <Heading className="mt-5 text-center" size="xl" as="h3">
                {title}
              </Heading>
              {description && (
                <Paragraph className="mt-4 text-center">
                  {description}
                </Paragraph>
              )}
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
