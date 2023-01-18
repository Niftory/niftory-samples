import { useEffect } from "react"
import { Blockchain, useRegisterWalletMutation } from "../../generated/graphql"
import { useFlowUser } from "../../hooks/useFlowUser"
import * as fcl from "@onflow/fcl"
import { gql } from "graphql-request"
import { WalletSetupBox } from "./WalletSetupBox"
import { useWalletMutation } from "../../hooks/useWalletMutation"
import { useMetaMask } from "metamask-react"

gql`
  mutation registerWallet($address: String!) {
    registerWallet(address: $address) {
      id
      address
      verificationCode
      state
    }
  }
`
interface Props {
  blockchain: Blockchain
}

export function RegisterWallet({ blockchain }: Props) {
  const flowUser = useFlowUser()
  const metamask = useMetaMask()

  const { mutate: registerWallet, error, isLoading } = useWalletMutation(useRegisterWalletMutation)

  // When the user logs in, register their wallet. This is because we need to register after fcl.login and it doesn't return a promise.
  useEffect(() => {
    if (blockchain !== Blockchain.Flow || !flowUser?.addr) {
      return
    }

    registerWallet({ address: flowUser.addr })
  }, [blockchain, flowUser?.addr, flowUser?.loggedIn, registerWallet])

  const handleRegister = async () => {
    switch (blockchain) {
      case Blockchain.Flow: {
        fcl.logIn()
        break
      }
      case Blockchain.Polygon: {
        const wallets = await metamask.connect()
        // Register wallet after connecting to metamask completes
        if (wallets?.length > 0) {
          registerWallet({ address: wallets[0] })
        }
        break
      }
    }
  }

  return (
    <WalletSetupBox
      text={
        "First, we need to create or connect to a wallet. Hit the button below and follow the prompts."
      }
      buttonText="Link or create your wallet"
      onClick={handleRegister}
      isLoading={isLoading}
      error={error as Error}
    />
  )
}
