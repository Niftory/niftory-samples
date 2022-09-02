import { Box, Link, SimpleGrid, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"

import AppLayout from "../../../components/AppLayout"
import { ComponentWithAuth } from "../../../components/ComponentWithAuth"
import { gql } from "graphql-request"
import { useUserNftsQuery } from "../../../generated/graphql"
import { useGraphQLQuery } from "../../../hooks/useGraphQLQuery"
import { useAuthContext } from "../../../hooks/useAuthContext"

gql`
  query userNfts($userId: ID) {
    nfts(userId: $userId) {
      items {
        id
        model {
          id
          title
        }
      }
      cursor
    }
  }
`

const CollectionPage: ComponentWithAuth = () => {
  const router = useRouter()
  const { session } = useAuthContext()
  const _userId: string = session?.userId as string
  const { data } = useGraphQLQuery(useUserNftsQuery, { userId: _userId })
  const nfts = data?.nfts?.items

  return (
    <AppLayout>
      <SimpleGrid>
        {nfts?.map(
          (nft) =>
            nft && (
              <Box key={nft.id}>
                <Link onClick={() => router.push(`/app/collection/${nft.id}`)}>
                  {nft.model?.title}
                </Link>
              </Box>
            )
        )}
      </SimpleGrid>
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
