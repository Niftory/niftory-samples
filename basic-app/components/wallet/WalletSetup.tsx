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

export type WalletSetupStepProps = {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
};

export type WalletSetupProps = WalletSetupStepProps & {
  wallet: Wallet;
  flowUser: fcl.CurrentUserObject;
  error: Error;
};

export function WalletSetupWrapper() {
  const flowUser = useFlowUser();

  const client = useGraphQLClient();
  const {
    data,
    isLoading: walletLoading,
    refetch,
  } = useUserWalletQuery(client);
  const wallet = data?.wallet;

  const didMount = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(null);

  // Respond to updates from the inner components
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (isLoading) {
      return;
    }

    refetch();
  }, [isLoading, refetch]);

  return (
    <Skeleton isLoaded={!walletLoading && !isLoading}>
      <WalletSetup
        error={error}
        flowUser={flowUser}
        wallet={wallet}
        setError={setError}
        setIsLoading={setIsLoading}
      ></WalletSetup>
    </Skeleton>
  );
}

function WalletSetup({
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
