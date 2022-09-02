import { Box, Link, SimpleGrid, VStack, Image, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

import AppLayout from "../../../components/AppLayout"
import { ComponentWithAuth } from "../../../components/ComponentWithAuth"
import { gql } from "graphql-request"
import { useNftModelsQuery } from "../../../generated/graphql"
import { useGraphQLQuery } from "../../../hooks/useGraphQLQuery"

gql`
  query nftModels($appId: ID) {
    nftModels(appId: $appId) {
      items {
        id
        blockchainId
        title
        description
        quantity
        status
        rarity
        content {
          files {
            url
            contentType
          }
          poster {
            url
          }
        }
      }
      cursor
    }
  }
`

const DropsPage: ComponentWithAuth = () => {
  const router = useRouter()
  const appId = process.env.NEXT_PUBLIC_CLIENT_ID as string
  const { data } = useGraphQLQuery(useNftModelsQuery, { appId })
  const nftModels = data?.nftModels?.items

  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <SimpleGrid columns={2} spacing={10}>
            {nftModels?.map((nftModel) => {
              const nftModelImageUrl = nftModel.content?.poster?.url
              return (
                <Link key={nftModel.id} onClick={() => router.push(`/app/drops/${nftModel.id}`)}>
                  <VStack spacing="2vh">
                    <Image alt={nftModel.title} boxSize="20vh" src={nftModelImageUrl}></Image>
                    <Text>{nftModel.title}</Text>
                  </VStack>
                </Link>
              )
            })}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  )
}

export default DropsPage
