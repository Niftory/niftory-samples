import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import { useNftQuery } from "../../../generated/graphql";
import { useGraphQLClient } from "../../../hooks/useGraphQLClient";

import { gql } from "graphql-tag";

gql`
  query nft($id: String!) {
    nft(id: $id) {
      id
      blockchainId
      serialNumber
      model {
        id
        blockchainId
        title
        description
        rarity
        quantity
        metadata
        content {
          poster {
            url
          }
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
        }
      }
    }
  }
`;

const Collection: ComponentWithAuth = () => {
  const router = useRouter();
  const nftId = router.query["nftId"]?.toString();

  const client = useGraphQLClient();
  const { data } = useNftQuery(client, { id: nftId });

  const nft = data?.nft;
  const model = nft?.model;

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          {model && (
            <>
              <Heading>{model.title}</Heading>
              <Text>{model.description}</Text>
              <Text>
                {"Blockchain: " +
                  nft.blockchainId +
                  " Serial: " +
                  nft.serialNumber}{" "}
              </Text>
            </>
          )}
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.requireAuth = true;
export default Collection;
