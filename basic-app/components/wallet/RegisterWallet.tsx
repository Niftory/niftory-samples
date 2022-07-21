import { Box, Button } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useRegisterWalletMutation } from "../../generated/graphql";
import { useFlowUser } from "../../hooks/useFlowUser";
import { useGraphQLClient } from "../../hooks/useGraphQLClient";
import * as fcl from "@onflow/fcl";
import { WalletSetupStepProps } from "./WalletSetup";
import { gql } from "graphql-request";
import { useQueryClient } from "react-query";

gql`
  mutation registerWallet($address: String!) {
    registerWallet(address: $address) {
      id
      address
      verificationCode
      state
    }
  }
`;

export function RegisterWallet({
  setIsLoading,
  setError,
}: WalletSetupStepProps) {
  const flowUser = useFlowUser();

  const reactQueryClient = useQueryClient();
  const graphqlClient = useGraphQLClient();

  const { mutate: registerWallet } = useRegisterWalletMutation(graphqlClient, {
    // Ensure the user wallet query is invalidated and refetched on success
    onSuccess: () => reactQueryClient.invalidateQueries(["userWallet"]),

    onMutate: () => setIsLoading(true),
    onSettled: () => setIsLoading(false),
    onError: (error) => setError(error as Error),
  });

  // On click, log the user into their flow account
  const onClick = useCallback(() => {
    try {
      fcl.logIn();
    } catch (e) {
      setError(e);
    }
  }, [setError]);

  // When the user logs in, register their wallet
  useEffect(() => {
    if (!flowUser?.addr) {
      return;
    }

    registerWallet({ address: flowUser.addr });
  }, [flowUser?.addr, flowUser?.loggedIn, registerWallet, setIsLoading]);

  return (
    <>
      <Box maxW="xl">
        First, we need to create or connect to a Flow wallet. Hit the button
        below and follow the prompts.
      </Box>
      <Button colorScheme="blue" onClick={onClick}>
        Link or create your wallet.
      </Button>
    </>
  );
}
