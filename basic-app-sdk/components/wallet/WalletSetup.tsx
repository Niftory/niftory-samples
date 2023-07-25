import { ConfigureWallet } from "./ConfigureWallet"
import { RegisterWallet } from "./RegisterWallet"
import { VerifyWallet } from "./VerifyWallet"
import * as fcl from "@onflow/fcl"
import { useRouter } from "next/router"
import { WalletSetupBox } from "./WalletSetupBox"
import { MetamaskWalletSetupBox } from "./MetamaskWalletSetup"
import { Spinner } from "@chakra-ui/react"
import {
  Blockchain,
  useContractQuery,
  useWalletQuery,
  Wallet,
  WalletState,
} from "@niftory/sdk/react"

export type WalletSetupStepProps = {
  setIsLoading: (isLoading: boolean) => void
  setError: (error: Error | null) => void
}

export type WalletSetupProps = WalletSetupStepProps & {
  wallet: Wallet
  flowUser: fcl.CurrentUserObject
  error: Error
}

export function WalletSetup() {
  const router = useRouter()

  const [{ data: contractData, fetching: isLoadingContract }] = useContractQuery()

  const [{ data, fetching, error }] = useWalletQuery()

  if (isLoadingContract || !contractData) {
    return <Spinner />
  }

  const wallet = data?.wallet
  const { blockchain } = contractData?.contract

  if (!error && !fetching) {
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
      isLoading={fetching}
      onClick={() => router.push("/app/drops")}
    />
  )
}
