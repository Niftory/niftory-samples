import { Box, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { useRegisterWalletMutation } from "../../generated/graphql";
import { useFlowUser } from "../../hooks/useFlowUser";
import { useGraphQLClient } from "../../hooks/useGraphQLClient";
import * as fcl from "@onflow/fcl";
import { WalletSetupStepProps } from "./WalletSetup";

export function RegisterWallet({
  setIsLoading,
  setError,
}: WalletSetupStepProps) {
  const flowUser = useFlowUser();

  const client = useGraphQLClient();
  const { mutate: registerWallet } = useRegisterWalletMutation(client);

  const onClick = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!flowUser?.loggedIn) {
        fcl.logIn();
      }

      registerWallet({ address: flowUser.addr });
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [flowUser, registerWallet, setError, setIsLoading]);

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
