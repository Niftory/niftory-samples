import { Box, Flex, FlexProps } from "@chakra-ui/react"
import * as React from "react"

interface CardWithAvatarProps extends FlexProps {
  bgRarity: string
}

export const CardPreview = (props: CardWithAvatarProps) => {
  const { children, bgRarity } = props

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
          maxW="xs"
        >
          {children}
        </Flex>
      </Box>
    </Box>
  )
}
