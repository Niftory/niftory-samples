import {
  Box,
  Link,
  SimpleGrid,
  VStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import { gql } from "graphql-request";
import { useGraphQLClient } from "../../../hooks/useGraphQLClient";
import { useNftModelsQuery } from "../../../generated/graphql";

gql`
  query nftModels {
    nftModels {
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
`;

const Drops: ComponentWithAuth = () => {
  const router = useRouter();
  const client = useGraphQLClient();
  const { data } = useNftModelsQuery(client);
  const nftModels = data?.nftModels;

  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nftModels ? (
              nftModels.map((nftModel) => {
                const nftModelImageUrl = nftModel.content?.poster?.url;
                return (
                  <Link
                    key={nftModel.id}
                    onClick={() => router.push(`/app/drops/${nftModel.id}`)}
                  >
                    <VStack spacing="2vh">
                      <Image
                        alt={nftModel.title}
                        boxSize="20vh"
                        src={nftModelImageUrl}
                      ></Image>
                      <Text>{nftModel.title}</Text>
                    </VStack>
                  </Link>
                );
              })
            ) : (
              <Spinner size="lg"></Spinner>
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.requireAuth = true;
export default Drops;
