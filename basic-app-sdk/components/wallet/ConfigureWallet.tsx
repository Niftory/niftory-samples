import { useEffect } from "react"
import { WalletSetupBox } from "./WalletSetupBox"
import { useFlowAccountConfiguration, useFlowUser, useReadyWalletMutation } from "@niftory/sdk"

export function ConfigureWallet() {
  const flowUser = useFlowUser()

  const [{ fetching: isReadyWalletLoading, error }, readyWallet] = useReadyWalletMutation()

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

    readyWallet({ address: flowUser?.addr })
  }, [flowUser?.addr, configured, readyWallet])

  const isLoading = isFlowAccountConfigurationLoading || isReadyWalletLoading

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
