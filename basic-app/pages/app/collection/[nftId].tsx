import { Box, Heading, Text, VStack, Image, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import { useNftQuery } from "../../../generated/graphql";
import { useGraphQLQuery } from "../../../hooks/useGraphQLQuery";

import { gql } from "graphql-request";

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

  const { data } = useGraphQLQuery(useNftQuery, { id: nftId });

  const nft = data?.nft;
  const model = nft?.model;

  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <AppHeader />
          {model ? (
            <>
              <Image
                alt={nft.model?.title}
                src={nft.model?.content?.poster?.url}
                boxSize="20vh"
              ></Image>
              <Heading>{model.title}</Heading>
              <Text>{model.description}</Text>
              <Text>
                {"Blockchain: " +
                  nft.blockchainId +
                  " Serial: " +
                  nft.serialNumber}{" "}
              </Text>
            </>
          ) : (
            <Spinner size="lg"></Spinner>
          )}
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.requireAuth = true;
export default Collection;
