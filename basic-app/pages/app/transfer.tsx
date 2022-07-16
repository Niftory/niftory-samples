import {
  Box,
  Link,
  SimpleGrid,
  VStack,
  Flex,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import AppLayout from "../../components/AppLayout";
import { AppHeader } from "../../components/AppHeader";
import { useNFTModels } from "../../../basic-app/hooks/useNFTModels";
import { gql } from "urql";
import { useGraphQLMutation } from "../../lib/useGraphQLMutation";

const TRANSFER_NFT_TO_USER = gql`
  mutation ($nftModelId: ID!) {
    transfer(nftModelId: $nftModelId) {
      id
    }
  }
`;

const Drops = () => {
  const router = useRouter();
  const { nftModels } = useNFTModels();

  const modelToTransfer = nftModels?.[0];
  const [isLoading, setIsLoading] = React.useState(false);
  const { executeMutation: transferNFTMutation } =
    useGraphQLMutation(TRANSFER_NFT_TO_USER);

  const initiateTransfer = async (nftModelId: string) => {
    setIsLoading(true);
    const data = await transferNFTMutation({ nftModelId });
    console.log(data);
    setIsLoading(false);
  };
  return (
    <AppLayout>
      <Box mx="auto" color="white" mt="5vh">
        <VStack spacing="5vh">
          <AppHeader />

          {modelToTransfer ? (
            <Button
              onClick={async () => {
                await initiateTransfer(modelToTransfer.id);
              }}
              colorScheme="blue"
              my="auto"
            >
              {" "}
              Initiate Transfer{" "}
            </Button>
          ) : (
            <Spinner></Spinner>
          )}
          {/* {nftModels?.map((nftModel) => (
              <Box key={nftModel.id}>
                <Link onClick={() => router.push(`/app/drops/${nftModel.id}`)}>
                  {nftModel.title}
                </Link>{" "}
              </Box>
            ))} */}
        </VStack>
      </Box>
    </AppLayout>
  );
};

Drops.auth = true;
export default Drops;
