import { Box, Button } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useReadyWalletMutation } from "../../generated/graphql";
import { useGraphQLClient } from "../../hooks/useGraphQLClient";
import { useFlowUser } from "../../hooks/useFlowUser";
import { useFlowAccountConfiguration as useFlowAccountConfiguration } from "../../hooks/useFlowAccountConfiguration";
import { WalletSetupStepProps } from "./WalletSetup";

export function ConfigureWallet({
  setIsLoading,
  setError,
}: WalletSetupStepProps) {
  const flowUser = useFlowUser();

  const client = useGraphQLClient();
  const { mutate: readyWallet } = useReadyWalletMutation(client);

  const { configured, configure } = useFlowAccountConfiguration();

  useEffect(() => {
    if (!configured) {
      return;
    }

    setIsLoading(true);
    try {
      readyWallet({ address: flowUser?.addr });
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [flowUser?.addr, configured, readyWallet, setError, setIsLoading]);

  const onClick = useCallback(async () => {
    setIsLoading(true);
    try {
      if (configured) {
        await configure();
      }
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [configure, configured, setError, setIsLoading]);

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
