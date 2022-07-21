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
import { useRouter } from "next/router";
import { WalletSetupBox } from "./WalletSetupBox";

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
  const client = useGraphQLClient();
  const router = useRouter();

  const {
    data,
    isFetching: walletLoading,
    error,
  } = useUserWalletQuery(client, {});
  const wallet = data?.wallet;

  if (!error && !walletLoading) {
    // User doesn't have a wallet yet
    if (!wallet?.address) {
      return <RegisterWallet />;
    }

    switch (wallet.state) {
      case WalletState.Unverified:
        // User has a wallet but it's not verified yet
        return <VerifyWallet />;

      case WalletState.Verified:
        // The user has verified their wallet, but hasn't configured it yet
        return <ConfigureWallet />;
    }
  }

  return (
    <WalletSetupBox
      text={`You}re all set up! Your wallet address is ${wallet?.address}`}
      buttonText="Go to Drops"
      error={error as Error}
      isLoading={walletLoading}
      onClick={() => router.push("/app/drops")}
    />
  );
}
