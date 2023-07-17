import axios from "axios"
import { useEffect, useState } from "react"

import { WalletSetupBox } from "./WalletSetupBox"
import { useFlowAccountConfiguration } from "@niftory/sdk/react"

export type ConfigureWalletProps = {
  address: string
  mutateCache: () => void
}

export function ConfigureWallet({ mutateCache }: ConfigureWalletProps) {
  const [readying, setReadying] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const {
    configured,
    configure,
    isLoading: isFlowAccountConfigurationLoading,
  } = useFlowAccountConfiguration({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    nftAddress: process.env.NEXT_PUBLIC_NFT_ADDRESS,
    niftoryAddress: process.env.NEXT_PUBLIC_NIFTORY_ADDRESS,
    registryAddress: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
  })

  // Once the wallet is configured, call the ready mutation to tell Niftory it's ready to receive NFTs
  useEffect(() => {
    if (!configured) {
      return
    }

    setReadying(true)
    axios
      .post("/api/readyWallet")
      .then(mutateCache)
      .catch((err) => setError(err))
      .finally(() => setReadying(false))
  }, [mutateCache, configured])

  const isLoading = isFlowAccountConfigurationLoading || readying

  return (
    <WalletSetupBox
      text={
        "You're almost there. Now we need to configure your wallet to receive NFTs. This is the last step!"
      }
      buttonText="Configure wallet"
      onClick={configure}
      isLoading={isLoading}
      error={error as Error}
    />
  )
}
