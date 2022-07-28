import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import axios from "axios";
import { useNftModelQuery } from "../../../generated/graphql";
import { useGraphQLQuery } from "../../../hooks/useGraphQLQuery";
import { useCallback, useState } from "react";

import { gql } from "graphql-request";

gql`
  query nftModel($id: String!) {
    nftModel(id: $id) {
      id
      blockchainId
      title
      description
      quantity
      status
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
      rarity
    }
  }
`;

const Collection: ComponentWithAuth = () => {
  const router = useRouter();
  const nftModelId = router.query["nftModelId"] as string;

  const { data: nftModelData } = useGraphQLQuery(useNftModelQuery, {
    id: nftModelId,
  });

  const nftModel = nftModelData?.nftModel;

  const [isTransferring, setIsTransferring] = useState(false);

  const initiateTransfer = useCallback(() => {
    setIsTransferring(true);
    axios
      .post(`/api/nft/${nftModelId}/transfer`)
      .then(({ data }) => router.push(`/app/collection/${data.transfer.id}`))
      .catch((error) => console.error(error))
      .finally(() => setIsTransferring(false));
  }, [nftModelId, router]);

  return (
    <AppLayout>
      <Box mx="auto" color="white">
        <VStack>
          <AppHeader />
          {nftModel ? (
            <>
              <Image
                alt={nftModel.title}
                boxSize="30vh"
                src={nftModel.content?.poster?.url}
              ></Image>
              <Heading>{nftModel.title}</Heading>
              <Text>{nftModel.description}</Text>
              <Text>{"Blockchain: " + nftModel.blockchainId}</Text>
              <Button
                isLoading={isTransferring}
                onClick={initiateTransfer}
                colorScheme="blue"
                my="auto"
              >
                Claim
              </Button>
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
