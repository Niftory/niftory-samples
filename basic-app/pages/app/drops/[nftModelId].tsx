import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import AppLayout from "../../../components/AppLayout";
import { AppHeader } from "../../../components/AppHeader";
import { useNFTModel } from "../../../hooks/useNFTModel";
import { gql, useMutation } from "urql";
import { TransferNftToUserDocument } from "../../../generated/graphql";
import { ComponentWithAuth } from "../../../components/ComponentWithAuth";

gql`
  mutation transferNFTToUser($nftModelId: ID!) {
    transfer(nftModelId: $nftModelId) {
      id
    }
  }
`;

const Collection: ComponentWithAuth = () => {
  const router = useRouter();
  const nftModelId = router.query["nftModelId"] as string;
  const { nftModel } = useNFTModel(nftModelId);

  const [isLoading, setIsLoading] = React.useState(false);
  const [, transferNFTMutation] = useMutation(TransferNftToUserDocument);

  const initiateTransfer = async (nftModelId: string) => {
    setIsLoading(true);
    const data = await transferNFTMutation({ nftModelId });
    console.log(data);
    setIsLoading(false);
  };

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
              <Button
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
          )}
        </VStack>
      </Box>
    </AppLayout>
  );
};

Collection.requireAuth = true;
export default Collection;
