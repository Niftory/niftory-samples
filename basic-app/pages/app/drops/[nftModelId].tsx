import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useNftModelQuery } from "../../../generated/graphql";
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
  const { data } = useNftModelQuery(client, { id: nftModelId });
  const nftModel = data?.nftModel;

  const { data: session } = useSession();
  const userId = session?.userId;

  const [isLoading, setIsLoading] = useState(false);

  const initiateTransfer = useCallback(() => {
    setIsLoading(true);
    axios
      .post(`/api/nft/${nftModelId}/transfer?userId=${userId}`)
      .then(({ data }) => router.push(`/app/collection/${data.nftId}`))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [nftModelId, router, userId]);

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          {nftModel && (
            <>
              <Heading>{nftModel.title}</Heading>
              <Text>{nftModel.description}</Text>
              <Button
                isLoading={isLoading}
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
