import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface HeroProps {
  heading?: React.ReactNode
  content?: React.ReactNode
  button?: React.ReactNode
  bg?: string
  imageUrl?: string
}

export const Hero = ({ heading, button, content, imageUrl, bg }: HeroProps) => {
  const headingComponent = React.useMemo(() => {
    return typeof heading === "string" ? (
      <Heading
        as="h1"
        size="3xl"
        lineHeight="1"
        fontWeight="light"
        letterSpacing="tight"
        color="header.text"
      >
        {heading}
      </Heading>
    ) : (
      heading
    )
  }, [heading])

  const contentComponent = React.useMemo(() => {
    return typeof content === "string" ? (
      <Text mt={4} fontWeight="medium" color={"header.text"}>
        {content}
      </Text>
    ) : (
      content
    )
  }, [content])

  const buttonComponent = React.useMemo(() => {
    return typeof button === "string" ? (
      <Button minWidth="200" height="14" px="8" fontSize="md">
        {button}
      </Button>
    ) : (
      button
    )
  }, [button])

  return (
    <Box width="100vw" minH={{ base: "90vh", sm: "100vh" }} position="relative" bg={bg} bgImage={imageUrl}>
      <Box
        zIndex={100}
        px={{ base: "10", lg: "20" }}
      >
        <Box
          maxW={{ lg: "md", xl: "xl" }}
          pt={{ base: "0", sm: "4", md: "8", lg: "16" }}
          pb={{ base: "4", sm: "8" }}
        >
          {headingComponent}
          {contentComponent}
          <Stack direction={{ base: "column", sm: "row" }} spacing="4" mt="8">
            {buttonComponent}
          </Stack>
        </Box>
      </Box>
      <Box
        zIndex={1}
        top="0"
        left="0"
        width="100%"
        height="100%"
      ></Box>
    </Box>
  )
}
