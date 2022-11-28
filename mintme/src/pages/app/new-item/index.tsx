import { Box, Center, Flex, Heading, VStack } from "@chakra-ui/react"
import { HowItWorks, SupportingResources, Showcase, LoginText } from "ui/Home"

import AppLayout from "../../../components/AppLayout"
import { CollectibleCreateForm } from "../../../components/form/CollectibleCreateForm"

const NewItemPage = () => {
  return (
    <>
      <AppLayout title="Create New NFT | MintMe">
        <VStack w="full" p="1rem" my="3rem" gap="3rem">
          <Box px="1rem">
            <Center m="1.4rem">
              <Heading
                as="h3"
                fontWeight="400"
                textAlign="center"
                maxW="600"
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                New Item
              </Heading>
            </Center>
            <Flex
              minW={{ base: "280px", md: "800px" }}
              rounded="xl"
              alignItems="center"
              justifyContent="center"
              minH={{ base: "250px" }}
            >
              <CollectibleCreateForm />
            </Flex>
          </Box>
          <HowItWorks />
          <SupportingResources />
          <Showcase />
        </VStack>
      </AppLayout>
    </>
  )
}

NewItemPage.requireAuth = true
export default NewItemPage
