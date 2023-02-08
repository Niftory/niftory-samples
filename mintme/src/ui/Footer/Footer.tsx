import {
  Box,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  HStack,
  IconButton,
  Button,
} from "@chakra-ui/react"
import * as React from "react"
import { BsDiscord, BsGithub, BsTwitter } from "react-icons/bs"
import { useAuthContext } from "../../hooks/useAuthContext"
import posthog from "posthog-js"

export const Footer: React.FunctionComponent = () => {
  const { session } = useAuthContext()
  return (
    <Box
      as="footer"
      bg="content.400"
      width="100%"
      h={{ base: "fit-content" }}
      color="white"
      pb="2rem"
      pt="1.5rem"
      px="2rem"
      position="relative"
      zIndex={1}
    >
      <Flex pl="1rem" justifyContent={{ base: "center", md: "flex-start" }}>
        <Image src="/mintme-logo-footer.svg" alt="logo" h="4rem" mb="2" />
      </Flex>

      <Flex
        justifyContent="space-between"
        pt="8"
        pb="10"
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "4rem" }}
      >
        <Flex gap={{ base: "4rem", md: "8rem" }} flexDir={{ base: "column", md: "row" }}>
          <Flex
            direction={{ base: "column" }}
            fontSize="sm"
            fontWeight="300"
            mx="15px"
            gap="0.5rem"
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Heading size="md" mb="0.5rem">
              PAGES
            </Heading>
            <ChakraLink fontSize="1rem" href={"/"}>
              Home
            </ChakraLink>
            <ChakraLink fontSize="1rem" href={session ? "/app/new-item" : "/"}>
              Create your NFT
            </ChakraLink>
          </Flex>
          <Flex
            direction={{ base: "column" }}
            fontSize="sm"
            fontWeight="300"
            mx="15px"
            gap="0.5rem"
            alignItems={{ base: "center", md: "flex-start" }}
          >
            <Heading size="md" mb="0.5rem">
              BUILT ON NIFTORY
            </Heading>
            <ChakraLink
              fontSize="1rem"
              href={"https://niftory.com"}
              target="_blank"
              onClick={() =>
                posthog.capture("FOOTER_ABOUT_NIFTORY", {
                  posthogEventDetail: 'Opened "About" from footer',
                })
              }
            >
              About
            </ChakraLink>
            <ChakraLink
              fontSize="1rem"
              href={"https://docs.niftory.com/"}
              target="_blank"
              onClick={() =>
                posthog.capture("FOOTER_API_DOCS", {
                  posthogEventDetail: 'Opened "Niftory API docs" from footer',
                })
              }
            >
              Niftory API Docs
            </ChakraLink>
            <ChakraLink fontSize="1rem" href={"https://admin.niftory.com/"} target="_blank">
              Get your free API Key
            </ChakraLink>
          </Flex>
        </Flex>
        <Flex
          direction={{ base: "column" }}
          justify="space-between"
          fontSize="sm"
          fontWeight="300"
          minW={{ md: "300px" }}
          mx="15px"
          gap="3rem"
        >
          <Flex flexDir="column" gap="0.6rem" alignItems={{ base: "center", md: "flex-end" }}>
            <Heading size="md" mb="0.5rem">
              FOLLOW US
            </Heading>
            <HStack>
              <IconButton
                variant="solid"
                as="a"
                target="_blank"
                href="https://github.com/Niftory/niftory-samples"
                colorScheme="white"
                icon={<BsGithub size="1.8rem" />}
                aria-label="github"
              />
              <IconButton
                as="a"
                target="_blank"
                href="https://twitter.com/niftory"
                colorScheme="white"
                icon={<BsTwitter size="1.8rem" />}
                aria-label="twitter"
              />
            </HStack>
          </Flex>
          <Flex flexDir="column" gap="0.6rem" alignItems={{ base: "center", md: "flex-end" }}>
            <Heading size="md" mb="0.5rem">
              JOIN US
            </Heading>
            <Button
              as="a"
              href="https://discord.gg/QAgDQXUGsU"
              colorScheme="white"
              variant="outline"
              leftIcon={<BsDiscord />}
              maxW="15rem"
              onClick={() =>
                posthog.capture("FOOTER_LAUNCH_DISCORD", {
                  posthogEventDetail: 'Opened "Niftory Discord" from footer',
                })
              }
            >
              Niftory Discord
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
