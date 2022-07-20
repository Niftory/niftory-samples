import { Box, Button } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  useUserWalletQuery,
  useVerifyWalletMutation,
} from "../../generated/graphql";
import { useGraphQLClient } from "../../hooks/useGraphQLClient";
import * as fcl from "@onflow/fcl";
import { WalletSetupStepProps } from "./WalletSetup";
import { gql } from "graphql-request";

gql`
  mutation verifyWallet($address: String!, $signedVerificationCode: JSON!) {
    verifyWallet(
      address: $address
      signedVerificationCode: $signedVerificationCode
    ) {
      id
      address
      state
    }
  }
`;

export function VerifyWallet({ setIsLoading, setError }: WalletSetupStepProps) {
  const client = useGraphQLClient();
  const { data } = useUserWalletQuery(client);
  const { mutate: verifyWallet } = useVerifyWalletMutation(client);

  const wallet = data?.wallet;

  const onClick = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use FCL to sign the verification message
      const signature = await fcl.currentUser.signUserMessage(
        wallet.verificationCode
      );

      // Send the signature to the API
      verifyWallet({
        address: wallet.address,
        signedVerificationCode: signature,
      });
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    wallet?.verificationCode,
    wallet?.address,
    verifyWallet,
    setError,
  ]);

  return (
    <>
      <Box maxW="xl">
        Step 2 is proving that the wallet is yours. Click the button below to
        send a secure message signed by your wallet.
      </Box>
      <Button colorScheme="blue" onClick={onClick}>
        Verify wallet
      </Button>
    </>
  );
}
