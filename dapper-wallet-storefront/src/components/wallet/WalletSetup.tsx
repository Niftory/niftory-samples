import * as fcl from "@onflow/fcl"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { useQuery } from "urql"

import {
  WalletByAddressQuery,
  WalletByAddressDocument,
  Wallet,
  WalletState,
} from "../../../generated/graphql"
import { useWalletContext } from "../../hooks/useWalletContext"
import { ConfigureWallet } from "./ConfigureWallet"
import { RegisterWallet } from "./RegisterWallet"
import { VerifyWallet } from "./VerifyWallet"
import { WalletSetupBox } from "./WalletSetupBox"

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
  const { currentUser } = useWalletContext()

  const [walletByAddressResponse, reExecuteQuery] = useQuery<WalletByAddressQuery>({
    query: WalletByAddressDocument,
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,
  })

  const mutateCache = useCallback(() => {
    reExecuteQuery({ requestPolicy: "network-only" })
  }, [reExecuteQuery])

  const { data: walletData, error, fetching: walletFetching } = walletByAddressResponse

  const wallet = currentUser?.addr && walletData?.walletByAddress

  if (!error && !walletFetching) {
    // No Wallet for this address
    if (!wallet || !wallet?.address) {
      return <RegisterWallet mutateCache={mutateCache} />
    }

    switch (wallet.state) {
      case WalletState.Unverified:
        // User has a wallet but it's not verified yet
        return <VerifyWallet verificationCode={wallet.verificationCode} mutateCache={mutateCache} />

      case WalletState.Verified:
        // The user has verified their wallet, but hasn't configured it yet
        return <ConfigureWallet address={wallet.address} mutateCache={mutateCache} />
    }
  }

  return (
    <WalletSetupBox
      text={`You're all set up! Your wallet address is ${wallet?.address}`}
      buttonText="Go to Drops"
      error={error as Error}
      isLoading={walletFetching}
      onClick={() => router.push("/app/drops")}
    />
  )
}
