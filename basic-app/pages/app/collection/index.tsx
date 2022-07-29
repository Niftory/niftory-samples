import { Box, Link, SimpleGrid, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"

import AppLayout from "../../../components/AppLayout"
import { AppHeader } from "../../../components/AppHeader"
import { ComponentWithAuth } from "../../../components/ComponentWithAuth"
import { gql } from "graphql-request"
import { useUserNftsQuery, Nft } from "../../../generated/graphql"
import { useGraphQLQuery } from "../../../hooks/useGraphQLQuery"
gql`
  query userNfts {
    userNfts {
      items {
        ... on NFT {
          id
          model {
            title
            id
          }
        }
      }
    }
  }
`

const CollectionPage: ComponentWithAuth = () => {
  const router = useRouter()

  const { data } = useGraphQLQuery(useUserNftsQuery)
  const nfts = data?.userNfts?.items

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <SimpleGrid>
            {nfts?.map(
              (nft: Nft) =>
                nft && (
                  <Box key={nft.id}>
                    <Link onClick={() => router.push(`/app/collection/${nft.id}`)}>
                      {nft.model?.title}
                    </Link>
                  </Box>
                )
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
