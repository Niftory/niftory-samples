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
import * as React from "react";
import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFTModel } from "../../../hooks/useNFTModel";
import { useGraphQLMutation } from "../../../lib/useGraphQLMutation";
import { gql } from "urql";

const TRANSFER_NFT_TO_USER = gql`
  mutation ($nftModelId: ID!) {
    transfer(nftModelId: $nftModelId) {
      id
    }
  }
`;

const Collection = () => {
  const router = useRouter();
  const nftModelId = router.query["nftModelId"] as string;
  const { nftModel } = useNFTModel(nftModelId);

  const [isLoading, setIsLoading] = React.useState(false);
  const { executeMutation: transferNFTMutation } =
    useGraphQLMutation(TRANSFER_NFT_TO_USER);

  const initiateTransfer = async (nftModelId: string) => {
    setIsLoading(true);
    const data = await transferNFTMutation({ nftModelId });
    setIsLoading(false);
  };

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
                isDisabled={nftModel && !nftModel.blockchainId}
                isLoading={isLoading}
                onClick={async () => {
                  await initiateTransfer(nftModel.id);
                }}
                colorScheme="blue"
                my="auto"
              >
                {" "}
                Transfer to my Wallet{" "}
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

Collection.auth = true;
export default Collection;
