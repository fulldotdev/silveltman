import type { BlockProps } from "@/lib/types"
import { Background } from "@/components/elements/background"
import { Chip } from "@/components/elements/chip"
import { Column } from "@/components/elements/column"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import {
  Review,
  ReviewContent,
  ReviewImage,
  ReviewRating,
} from "@/components/elements/review"
import { Section } from "@/components/elements/section"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

export default function ({
  children,
  links,
  image,
  chip,
  rating,
  tagline,
  images,
  background,
  size = "lg",
  align = "center",
}: BlockProps) {
  return (
    <Section className="overflow-hidden pt-16 lg:pt-16">
      <Background
        className="mask-y-from-white mask-y-from-75% mask-y-to-transparent"
        variant={background}
      />
      <Container>
        <Column align={align}>
          {chip && <Chip {...chip} />}
          {rating && (
            <Review className="not-first:mt-8">
              {images?.map((image, i) => (
                <ReviewImage key={i} {...image} />
              ))}
              <ReviewContent>
                <ReviewRating rating={rating} />
                {tagline}
              </ReviewContent>
            </Review>
          )}
          {children && (
            <Writeup
              className="text-balance not-first:mt-6"
              size={size}
              align={align}
            >
              {children}
            </Writeup>
          )}
          <iframe
            width="315"
            height="560"
            src="https://www.youtube.com/embed/t4QBjBEraKw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="mx-auto rounded-lg shadow-lg not-first:mt-16"
          />
          {links && links.length > 0 && (
            <Wrap className="gap-2 not-first:mt-12" align={align}>
              {links.map((link, i) => (
                <Link
                  key={i}
                  variant={i === 0 ? "default" : "outline"}
                  size={size}
                  {...link}
                />
              ))}
            </Wrap>
          )}
        </Column>
      </Container>
    </Section>
  )
}
