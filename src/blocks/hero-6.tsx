import ReactPlayer from "react-player"

import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
} from "@/components/ui/section"
import { Rating } from "@/components/rating"

export default function ({
  children,
  links,
  image,
  rating,
  tagline,
  avatars,
}: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {rating && tagline && avatars && (
          <div className="flex items-center">
            {avatars?.map((avatar, i) => (
              <img
                key={avatar.src}
                className="size-10 rounded-full object-cover not-first:-ml-4"
                alt={`Avatar ${i + 1}`}
                {...avatar}
              />
            ))}
            <div className="flex flex-col gap-1 not-first:ml-3.5">
              <Rating score={rating} />
              <span className="text-muted-foreground text-sm">{tagline}</span>
            </div>
          </div>
        )}
        <SectionContent size="6xl" className="text-center not-first:mt-5">
          {children}
        </SectionContent>
        {links && links.length > 0 && (
          <SectionFooter className="mt-8">
            {links.map(({ href, text }, i) => (
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
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg not-first:mt-16">
          <iframe
            src="https://player.vimeo.com/video/1089099775?h=af11215c1b&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&loop=1"
            width="1920"
            height="1080"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            title="The Gym Banner 2025"
            className="absolute inset-0 h-full w-full"
          ></iframe>
        </div>
      </SectionContainer>
    </Section>
  )
}
