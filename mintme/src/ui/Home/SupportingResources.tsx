import { Box, Image, Heading, VStack, Text, Flex, Link as ChakraLink } from "@chakra-ui/react"
import { BsDiscord } from "react-icons/bs"
import { CgFileDocument } from "react-icons/cg"
import { FaDiscord } from "react-icons/fa"

const ResourceCard = ({ icon, title, body }) => {
  return (
    <VStack p="3rem" bgColor="white" rounded="3xl" flex="1" textAlign="center" shadow="base">
      <Box p="1.2rem" rounded="full" color="white" bgColor="content.400">
        {icon}
      </Box>
      <Heading fontSize="2xl" pt="0.4rem">
        {title}
      </Heading>
      <Text pt="0.3rem">{body}</Text>
    </VStack>
  )
}

export const SupportingResources = () => {
  return (
    <Box
      color="content.400"
      mt={{ base: "2rem", md: "4rem" }}
      maxW={{ md: "800px", lg: "1000px" }}
      mx={{ base: "1rem", md: "0" }}
    >
      <Heading size="1rem" textAlign="center" fontSize={{ base: "3xl", md: "5xl" }}>
        Supporting Resources
      </Heading>
      <Flex
        gap={{ base: "1rem", md: "2rem" }}
        mt={{ base: "1rem", md: "3rem" }}
        direction={{ base: "column", md: "row" }}
      >
        <ResourceCard
          title="Niftory"
          icon={<Image src="/niftory-logo.svg" alt="niftory-logo" h="2.4rem" w="2.4rem" />}
          body={
            <>
              Explore{" "}
              <ChakraLink href="https://niftory.com/" target="_blank" color="purple.100">
                Niftory
              </ChakraLink>
              , a web3 API that makes it easy to quickly integrate NFTs, digital wallets and other
              web3 concepts into their application.
            </>
          }
        />
        <ResourceCard
          title="Niftory API Docs"
          icon={<CgFileDocument size="2.5rem" />}
          body={
            <>
              Explore the{" "}
              <ChakraLink href="https://docs.niftory.com/" target="_blank" color="purple.100">
                Niftory API docs
              </ChakraLink>{" "}
              to learn how you can use Niftory to build rich web3 applications like MintMe without
              requiring deep blockchain expertise.
            </>
          }
        />
        <ResourceCard
          title="Ask in Discord"
          icon={
            <Box mt="0.1rem">
              <BsDiscord size="2.5rem" />
            </Box>
          }
          body={
            <>
              Have questions, or just want to show off your latest mints? Find us in the{" "}
              <ChakraLink href="https://discord.gg/QAgDQXUGsU" target="_blank" color="purple.100">
                Niftory Discord
              </ChakraLink>
              .
            </>
          }
        />
      </Flex>
    </Box>
  )
}
