import { Box, Center, Image, useMediaQuery } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useState } from "react"

import { Video } from "./Video"

export interface ICarouselMedia {
  type: string
  url: string
  thumbnail: string
}

interface ICardProps {
  bg?: string
  text?: string
  set?: string
  name?: string
  media?: ICarouselMedia
  serial?: string
  shader?: string
  rarity?: string
  updatedAt?: Date
}

interface Props {
  medias: ICarouselMedia[]
  cardProps?: Partial<ICardProps>
  type?: "basic" | "card"
}

export const Media = ({ media }: { media: ICarouselMedia }) => {
  return (
    <Center minH="300px" minW="300px" p="4">
      {media?.type.includes("video") && (
        <Video
          style={{
            objectFit: "scale-down",
          }}
          src={media?.url}
          controls={false}
          loop={true}
          muted={true}
          playsInline={true}
          autoPlay={true}
        />
      )}
      {media?.type.includes("image") && <Image fit="scale-down" src={media?.url} />}
    </Center>
  )
}

export const CarouselCard = ({
  bg,
  name,
  set,
  text,
  media,
  serial,
  shader,
  rarity,
  updatedAt,
}: ICardProps) => {
  return <Media media={media} />
}

export const Carousel = ({ medias, cardProps, type = "card" }: Props) => {
  const [selectedMedia, setSelectedMedia] = useState<ICarouselMedia>(medias?.[0])
  const [isMobile] = useMediaQuery("(max-width: 48em)")

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setSelectedMedia(medias?.[0])
  }, [medias])

  if (!medias) {
    return <></>
  }

  return (
    <Box
      display="flex"
      flexDirection={{
        md: "row-reverse",
        base: "column",
      }}
      width={isMobile ? "320px" : "100%"}
      maxW="800px"
      mx="auto"
    >
      {type === "basic" ? (
        <Media media={selectedMedia} />
      ) : (
        <CarouselCard {...cardProps} media={selectedMedia} />
      )}
      <Box
        display="flex"
        flexDirection={{
          base: "row",
          md: "column",
        }}
        justifyContent="center"
      >
        {medias.map((media, index) => (
          <Box
            {...(isMobile
              ? {
                  width: "100px",
                  height: "100px",
                  marginTop: "10px",
                  marginRight: "5px",
                }
              : {
                  height: "100px",
                  width: "100px",
                  marginRight: "30px",
                  marginBottom: "15px",
                })}
            key={index}
            cursor="pointer"
            onClick={() => setSelectedMedia(media)}
            borderBottomWidth={isMobile ? "4px" : "0px"}
            borderLeftWidth={isMobile ? "0px" : "4px"}
            _hover={{
              borderColor: "rgba(57, 59, 69, 0.4)",
            }}
            borderColor={media === selectedMedia ? "rgb(50, 94, 255)" : "transparent"}
          >
            <Image
              objectFit="cover"
              width="100%"
              height="100%"
              src={media.type.includes("image") ? media.thumbnail || media.url : media.thumbnail}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
