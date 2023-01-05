import {
  Blockchain,
  useContractQuery,
  useUserWalletQuery,
  Wallet,
  WalletState,
} from "../../generated/graphql"
import { ConfigureWallet } from "./ConfigureWallet"
import { RegisterWallet } from "./RegisterWallet"
import { VerifyWallet } from "./VerifyWallet"
import * as fcl from "@onflow/fcl"
import { gql } from "graphql-request"
import { useRouter } from "next/router"
import { WalletSetupBox } from "./WalletSetupBox"
import { useGraphQLQuery } from "../../hooks/useGraphQLQuery"
import { MetamaskWalletSetupBox } from "./MetamaskWalletSetup"
import { Spinner } from "@chakra-ui/react"

export type WalletSetupStepProps = {
  setIsLoading: (isLoading: boolean) => void
  setError: (error: Error | null) => void
}

export type WalletSetupProps = WalletSetupStepProps & {
  wallet: Wallet
  flowUser: fcl.CurrentUserObject
  error: Error
}

gql`
  query userWallet {
    wallet {
      id
      address
      state
      verificationCode
    }
  }
`

export function WalletSetup() {
  const router = useRouter()

  const { data: contractData, isLoading: isLoadingContract } = useGraphQLQuery(useContractQuery)

  const { data, isFetched: walletFetched, error } = useGraphQLQuery(useUserWalletQuery)

  if (isLoadingContract || !contractData) {
    return <Spinner />
  }

  const wallet = data?.wallet
  const { blockchain } = contractData?.contract

  if (!error && walletFetched) {
    // User doesn't have a wallet yet
    if (!wallet?.address) {
      return <RegisterWallet blockchain={blockchain} />
    }

    switch (wallet.state) {
      case WalletState.Unverified:
        // User has a wallet but it's not verified yet
        return <VerifyWallet blockchain={blockchain} />

      case WalletState.Verified:
        // The user has verified their wallet, but hasn't configured it yet
        return <ConfigureWallet />
    }
  }

  if (blockchain === Blockchain.Polygon) {
    return <MetamaskWalletSetupBox />
  }

  return (
    <WalletSetupBox
      text={`You're all set up! Your wallet address is ${wallet?.address}`}
      buttonText="Go to Drops"
      error={error as Error}
      isLoading={!walletFetched}
      onClick={() => router.push("/app/drops")}
    />
  )
}
