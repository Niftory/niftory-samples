import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AppLayout from "components/AppLayout";
import { AppHeader } from "components/AppHeader";
import { useNFTModel } from "hooks/useNFTModel";
import { ComponentWithAuth } from "components/ComponentWithAuth";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const Collection: ComponentWithAuth = () => {
  const router = useRouter();
  const nftModelId = router.query["nftModelId"] as string;
  const { nftModel } = useNFTModel(nftModelId);
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
