import { Box, Button } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useReadyWalletMutation } from "../../generated/graphql";
import { useGraphQLClient } from "../../hooks/useGraphQLClient";
import { useFlowUser } from "../../hooks/useFlowUser";
import { useFlowAccountConfiguration as useFlowAccountConfiguration } from "../../hooks/useFlowAccountConfiguration";
import { WalletSetupStepProps } from "./WalletSetup";
import { gql } from "graphql-request";
import { useQueryClient } from "react-query";

gql`
  mutation readyWallet($address: String!) {
    readyWallet(address: $address) {
      id
      address
      state
    }
  }
`;

export function ConfigureWallet({
  setIsLoading,
  setError,
}: WalletSetupStepProps) {
  const flowUser = useFlowUser();

  const reactQueryClient = useQueryClient();
  const graphqlClient = useGraphQLClient();
  const { mutate: readyWallet } = useReadyWalletMutation(graphqlClient, {
    onSuccess: () => reactQueryClient.invalidateQueries(["userWallet"]),

    onError: (error) => setError(error as Error),
    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
  });

  const { configured, configure } = useFlowAccountConfiguration();

  // On click, prompt the user to run the configuration transaction
  const onClick = useCallback(async () => {
    try {
      await configure();
    } catch (e) {
      setError(e);
    }
  }, [configure, setError]);

  // Once the wallet is configured, call the ready mutation to tell Niftory it's ready to receive NFTs
  useEffect(() => {
    if (!configured) {
      return;
    }

    readyWallet({ address: flowUser?.addr });
  }, [flowUser?.addr, configured, readyWallet]);

  return (
    <>
      <Box maxW="xl">
        You{"'"}re almost there. Now we need to configure your wallet to receive
        NFTs. This is the last step!
      </Box>
      <Button colorScheme="blue" onClick={onClick}>
        Configure wallet
      </Button>
    </>
  );
}
