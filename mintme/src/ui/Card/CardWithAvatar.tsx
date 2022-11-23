import { AvatarProps, Box, Flex, FlexProps, Image } from "@chakra-ui/react"
import * as React from "react"

interface CardWithAvatarProps extends FlexProps {
  avatarProps: AvatarProps
  bgRarity: string
  poster: string
  preview: boolean
}

export const CardWithAvatar = (props: CardWithAvatarProps) => {
  const { children, avatarProps, bgRarity, poster, preview, ...rest } = props
  const ref = React.useRef(null)
  const cardHeight = preview ? 150 : 250

  // Load no animation in preview mode

  return (
    <Box mx="auto">
      <Box bgImage={bgRarity} position="relative" bgSize="cover" rounded="md" p=".5em">
        <Flex
          direction="column"
          alignItems="center"
          rounded="md"
          position="relative"
          bg="black"
          color="white"
          {...rest}
        >
          <Box inset="0" bg="blue.600">
            {!preview && (
              <video
                style={{
                  height: cardHeight,
                  width: "100%",
                  objectFit: "cover",
                }}
                poster={poster}
                src={avatarProps.src}
                controls={true}
                loop={false}
                playsInline={true}
                muted={true}
              ></video>
            )}
            {preview && (
              <Image
                style={{
                  height: cardHeight,
                  width: "100%",
                  objectFit: "cover",
                }}
                src={poster}
              ></Image>
            )}
          </Box>

          <Box position="relative" background="black" pt="1em">
            {children}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
