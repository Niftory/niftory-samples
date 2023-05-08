import {
  AspectRatio,
  HStack,
  Image,
  Skeleton,
  Stack,
  StackProps,
  useBreakpointValue,
} from "@chakra-ui/react"
import * as React from "react"

import { Carousel, CarouselSlide, useCarousel } from "./Carousel"

interface GalleryProps {
  content: {
    contentType: string
    contentUrl: string
    thumbnailUrl: string
    alt: string
  }[]
  aspectRatio?: number
  rootProps?: StackProps
}

export const Gallery = (props: GalleryProps) => {
  const { content, aspectRatio = 4 / 3, rootProps } = props
  const [index, setIndex] = React.useState(0)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const slidesPerView = useBreakpointValue({ base: 3, md: 5 })

  const [ref] = useCarousel({
    slides: {
      perView: slidesPerView,
      spacing: useBreakpointValue({ base: 16, md: 24 }),
    },
    slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
  })

  return (
    <Stack spacing="4" {...rootProps}>
      {content[index].contentType?.includes("video") ? (
        <AspectRatio ratio={aspectRatio} flex="1">
          <video
            style={{
              objectFit: "scale-down",
            }}
            src={content[index].contentUrl}
            controls={true}
            loop={true}
            muted={true}
            playsInline={true}
            autoPlay={true}
          />
        </AspectRatio>
      ) : (
        <AspectRatio ratio={aspectRatio} flex="1">
          <Image
            src={content[index].contentUrl}
            objectFit="cover"
            alt={content[index].alt}
            fallback={<Skeleton />}
          />
        </AspectRatio>
      )}

      <HStack spacing="4">
        <Carousel ref={ref} direction="row" width="full">
          {content.map((media, i) => (
            <CarouselSlide key={i} onClick={() => setIndex(i)} cursor="pointer">
              <AspectRatio
                ratio={aspectRatio}
                transition="all 200ms"
                opacity={index === i ? 1 : 0.4}
                _hover={{ opacity: 1 }}
              >
                <Image
                  src={media.thumbnailUrl}
                  objectFit="cover"
                  alt={media.alt}
                  fallback={<Skeleton />}
                />
              </AspectRatio>
            </CarouselSlide>
          ))}
        </Carousel>
      </HStack>
    </Stack>
  )
}
