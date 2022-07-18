import { Box, Heading, Text, VStack, Image, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFT } from "../../../hooks/useNFT";

const Collection = () => {
  const router = useRouter();
  const nftId: string = router.query["nftId"]?.toString();
  const { nft } = useNFT(nftId);
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

Collection.auth = true;
export default Collection;
