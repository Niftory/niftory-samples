import { Box, Flex, Heading } from "@chakra-ui/react"
import AppLayout from "../../../components/AppLayout"
import { CollectibleCreateForm } from "../../../components/form/CollectibleCreateForm"

const NewItemPage = () => {
  return (
    <>
      <AppLayout title="Create New NFT | MintMe">
        <Box w="full" p="1rem">
          <Flex direction="column" m="2rem auto 2rem" maxW={"800px"}>
            <Heading m={"0 auto 1rem"}>New Item</Heading>
            <CollectibleCreateForm />
          </Flex>
        </Box>
      </AppLayout>
    </>
  )
}

NewItemPage.requireAuth = true
export default NewItemPage
