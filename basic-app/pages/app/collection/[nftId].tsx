import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFT } from "../../../hooks/useNFT";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";

const Collection: ComponentWithAuth = () => {
  const router = useRouter();
  const nftId = router.query["nftId"]?.toString();
  const [{ data }] = useNFT(nftId);
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
