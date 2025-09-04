"use client"

import { useEffect, useState } from "react"

import type { BlockProps } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
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

const VIDEOS = [
  "https://www.youtube.com/embed/t4QBjBEraKw",
  "https://www.youtube.com/embed/PZ-Ay2LUsbo",
]

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
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
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
          <Carousel
            className="mx-auto w-full max-w-[25em] not-first:mt-16 [&>div:nth-child(1)]:md:overflow-visible"
            setApi={setApi}
            opts={{
              startIndex: 0,
            }}
          >
            <CarouselContent>
              {VIDEOS?.map((video, i) => (
                <CarouselItem key={i}>
                  <iframe
                    width="315"
                    height="560"
                    src={video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={`mx-auto overflow-hidden rounded-lg shadow-lg transition-all duration-300 ${
                      current === i + 1
                        ? "scale-100 opacity-100"
                        : "scale-70 opacity-40"
                    }`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 hidden md:block">
              <CarouselPrevious
                className="size-10 max-md:static max-md:translate-y-0 md:left-[-6.25rem]"
                variant="default"
              />
              <CarouselNext
                className="size-10 max-md:static max-md:translate-y-0 md:right-[-6.25rem]"
                variant="default"
              />
            </div>
          </Carousel>
          <div className="mx-auto mt-10 flex w-full max-w-[33.9375rem] items-center justify-center">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className="p-2"
                onClick={() => {
                  api?.scrollTo(i)
                }}
              >
                <div
                  className={`size-3 rounded-full ${current === i + 1 ? "bg-black" : "bg-black/10"}`}
                />
              </button>
            ))}
          </div>
        </Column>
      </Container>
    </Section>
  )
}
