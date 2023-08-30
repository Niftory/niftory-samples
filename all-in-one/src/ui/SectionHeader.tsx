import { Box, Heading, HeadingProps } from "@chakra-ui/react"
import React from "react"

export interface SectionHeaderProps extends HeadingProps {
  standardText: string
  highlightedText?: string
  afterText?: string
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { standardText, highlightedText, afterText } = props

  return (
    <Heading
      p="8"
      color="page.text"
      as="h1"
      size="2xl"
      lineHeight="1"
      fontWeight="extrabold"
      letterSpacing="tight"
    >
      {standardText}{" "}
      {highlightedText && (
        <Box as="mark" color="page.text" bg="transparent">
          {highlightedText}{" "}
        </Box>
      )}
      {afterText}
    </Heading>
  )
}
