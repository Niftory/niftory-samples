import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFTModel } from "../../../hooks/useNFTModel";

const Collection = () => {
  const router = useRouter();
  const nftModelId: string = router.query["nftModelId"]?.toString();
  const { nftModel } = useNFTModel(nftModelId);

  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack>
          <AppHeader />
          {nftModel && (
            <>
              <Heading>{nftModel.title}</Heading>
              <Text>{nftModel.description}</Text>
              <Text>{"Blockchain: " + nftModel.blockchainId}</Text>
            </>
          )}
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.auth = true;
export default Collection;
