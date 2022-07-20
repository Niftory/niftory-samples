import { Box, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import { gql } from "graphql-tag";
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
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          <SimpleGrid>
            {nftModels?.map(
              (nftModel) =>
                nftModel && (
                  <Box key={nftModel.id}>
                    <Link
                      onClick={() => router.push(`/app/drops/${nftModel.id}`)}
                    >
                      {nftModel.title}
                    </Link>{" "}
                  </Box>
                )
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.requireAuth = true;
export default Drops;