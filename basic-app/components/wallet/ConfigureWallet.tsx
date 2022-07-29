import { useEffect } from "react"
import { useReadyWalletMutation } from "../../generated/graphql"
import { useFlowUser } from "../../hooks/useFlowUser"
import { useFlowAccountConfiguration as useFlowAccountConfiguration } from "../../hooks/useFlowAccountConfiguration"
import { gql } from "graphql-request"
import { WalletSetupBox } from "./WalletSetupBox"
import { useWalletMutation } from "../../hooks/useWalletMutation"

gql`
  mutation readyWallet($address: String!) {
    readyWallet(address: $address) {
      id
      address
      state
    }
  }
`

export function ConfigureWallet() {
  const flowUser = useFlowUser()

  const {
    mutate: readyWallet,
    isLoading: isReadyWalletLoading,
    error,
  } = useWalletMutation(useReadyWalletMutation)

  const {
    configured,
    configure,
    isLoading: isFlowAccountConfigurationLoading,
  } = useFlowAccountConfiguration()

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
