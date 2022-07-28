import { useCallback } from "react";
import {
  useUserWalletQuery,
  useVerifyWalletMutation,
} from "../../generated/graphql";
import * as fcl from "@onflow/fcl";
import { gql } from "graphql-request";
import { WalletSetupBox } from "./WalletSetupBox";
import { useWalletMutation } from "../../hooks/useWalletMutation";
import { useGraphQLQuery } from "../../hooks/useGraphQLQuery";

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

export function VerifyWallet() {
  const { data } = useGraphQLQuery(useUserWalletQuery);
  const {
    mutate: verifyWallet,
    isLoading,
    error,
  } = useWalletMutation(useVerifyWalletMutation);

  const wallet = data?.wallet;

  // On click, prompt the user to sign the verification message
  const onClick = useCallback(async () => {
    // Use FCL to sign the verification message
    const signature = await fcl.currentUser.signUserMessage(
      wallet.verificationCode
    );

    if (!signature) {
      return;
    }

    // Send the signature to the API
    verifyWallet({
      address: wallet.address,
      signedVerificationCode: signature,
    });
  }, [wallet?.verificationCode, wallet?.address, verifyWallet]);

  return (
    <WalletSetupBox
      text={
        "Step 2 is proving that the wallet is yours. Click the button below to send a secure message signed by your wallet."
      }
      buttonText="Verify wallet"
      onClick={onClick}
      isLoading={isLoading}
      error={error as Error}
    />
  );
}
