import { Box, Heading, Text, VStack, Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useNftModelQuery, useUserNftsQuery } from "../../../generated/graphql";
import { useGraphQLClient } from "../../../hooks/useGraphQLClient";
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

  const client = useGraphQLClient();
  const { data: nftModelData } = useNftModelQuery(client, {
    id: nftModelId,
  });
  const nftModel = nftModelData?.nftModel;

  const { data: userNftsData, isFetching: isFetchingUserNfts } =
    useUserNftsQuery(client, {});
  const alreadyClaimed = userNftsData?.nfts && userNftsData.nfts.length > 1;

  const { data: session } = useSession();
  const userId = session?.userId;

  const [isTransferring, setIsTransferring] = useState(false);

  const initiateTransfer = useCallback(() => {
    setIsTransferring(true);
    axios
      .post(`/api/nft/${nftModelId}/transfer?userId=${userId}`)
      .then(({ data }) => router.push(`/app/collection/${data.nftId}`))
      .catch((error) => console.error(error))
      .finally(() => setIsTransferring(false));
  }, [nftModelId, router, userId]);

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          {nftModel ? (
            <Spinner />
          ) : (
            <>
              <Heading>{nftModel.title}</Heading>
              <Text>{nftModel.description}</Text>
              <Button
                isLoading={isTransferring || isFetchingUserNfts}
                isDisabled={alreadyClaimed}
                onClick={initiateTransfer}
                colorScheme="blue"
                my="auto"
              >
                Claim
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.requireAuth = true;
export default Collection;
