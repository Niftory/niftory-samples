import { Box, Link, SimpleGrid, VStack, Image, Spinner, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import { gql } from "graphql-request";
import { useNftModelsQuery } from "../../../generated/graphql";
import { useGraphQLQuery } from "../../../hooks/useGraphQLQuery";

gql`
  query nftModels {
    nftModels {
      cursor
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
          media {
            url
            contentType
          }
          thumbnail {
            url
            contentType
          }
        }
        poster {
          url
        }
      }
    }
    }
  }
`

const DropsPage: ComponentWithAuth = () => {
  const router = useRouter();
  const { data } = useGraphQLQuery(useNftModelsQuery);
  const nftModels = data?.nftModels?.items;

  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <SimpleGrid columns={2} spacing={10}>
            {nftModels ? (
              nftModels.map((nftModel) => {
                const nftModelImageUrl = nftModel.content?.poster?.url;
                return (
                  <Link key={nftModel.id} onClick={() => router.push(`/app/drops/${nftModel.id}`)}>
                    <VStack spacing="2vh">
                      <Image alt={nftModel.title} boxSize="20vh" src={nftModelImageUrl}></Image>
                      <Text>{nftModel.title}</Text>
                    </VStack>
                  </Link>
                )
              })
            ) : (
              <Spinner size="lg"></Spinner>
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  )
}

export default DropsPage
