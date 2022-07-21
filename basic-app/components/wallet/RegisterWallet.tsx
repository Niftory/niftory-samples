import { useEffect } from "react";
import { useRegisterWalletMutation } from "../../generated/graphql";
import { useFlowUser } from "../../hooks/useFlowUser";
import { useGraphQLClient } from "../../hooks/useGraphQLClient";
import * as fcl from "@onflow/fcl";
import { gql } from "graphql-request";
import { useQueryClient } from "react-query";
import { WalletSetupBox } from "./WalletSetupBox";

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

export function RegisterWallet() {
  const flowUser = useFlowUser();

  const reactQueryClient = useQueryClient();
  const graphqlClient = useGraphQLClient();

  const {
    mutate: registerWallet,
    error,
    isLoading,
  } = useRegisterWalletMutation(graphqlClient, {
    // Ensure the user wallet query is invalidated and refetched on success
    onSuccess: () => reactQueryClient.invalidateQueries(["userWallet"]),
  });

  // When the user logs in, register their wallet
  useEffect(() => {
    if (!flowUser?.addr) {
      return;
    }

    registerWallet({ address: flowUser.addr });
  }, [flowUser?.addr, flowUser?.loggedIn, registerWallet]);

  return (
    <WalletSetupBox
      text={
        "First, we need to create or connect to a Flow wallet. Hit the button below and follow the prompts."
      }
      buttonText="Link or create your wallet"
      onClick={fcl.logIn}
      isLoading={isLoading}
      error={error as Error}
    />
  );
}
