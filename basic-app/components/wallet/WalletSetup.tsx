import { Box, Skeleton, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  useUserWalletQuery,
  Wallet,
  WalletState,
} from "../../generated/graphql";
import { useFlowUser } from "../../hooks/useFlowUser";
import { useGraphQLClient } from "../../hooks/useGraphQLClient";
import { ConfigureWallet } from "./ConfigureWallet";
import { RegisterWallet } from "./RegisterWallet";
import { VerifyWallet } from "./VerifyWallet";
import * as fcl from "@onflow/fcl";
import { gql } from "graphql-request";

export type WalletSetupStepProps = {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
};

export type WalletSetupProps = WalletSetupStepProps & {
  wallet: Wallet;
  flowUser: fcl.CurrentUserObject;
  error: Error;
};

gql`
  query userWallet {
    wallet {
      id
      address
      state
      verificationCode
    }
  }
`;

export function WalletSetup() {
  const flowUser = useFlowUser();

  const client = useGraphQLClient();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(null);

  const { data, isFetching: walletLoading } = useUserWalletQuery(client, {});
  const wallet = data?.wallet;

  return (
    <Skeleton isLoaded={!walletLoading && !isLoading}>
      <WalletSetupBody
        error={error}
        flowUser={flowUser}
        wallet={wallet}
        setError={setError}
        setIsLoading={setIsLoading}
      ></WalletSetupBody>
    </Skeleton>
  );
}

function WalletSetupBody({
  error,
  flowUser,
  wallet,
  setIsLoading,
  setError,
}: WalletSetupProps) {
  if (error) {
    console.error(error);
    return <Box>Something went wrong. Please try again later!</Box>;
  }

  // User doesn't have a wallet yet
  if (!flowUser?.loggedIn || !wallet?.address) {
    return <RegisterWallet setIsLoading={setIsLoading} setError={setError} />;
  }

  switch (wallet.state) {
    case WalletState.Unverified:
      // User has a wallet but it's not verified yet
      return <VerifyWallet setIsLoading={setIsLoading} setError={setError} />;

    case WalletState.Verified:
      // The user has verified their wallet, but hasn't configured it yet
      return (
        <ConfigureWallet setIsLoading={setIsLoading} setError={setError} />
      );

    case WalletState.Ready:
      break;
  }
}
