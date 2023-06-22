import { useEffect } from "react"
import * as fcl from "@onflow/fcl"
import { WalletSetupBox } from "./WalletSetupBox"
import { useMetaMask } from "metamask-react"
import { Blockchain, useFlowUser, useRegisterWalletMutation } from "@niftory/sdk"

interface Props {
  blockchain: Blockchain
}

export function RegisterWallet({ blockchain }: Props) {
  const flowUser = useFlowUser()
  const metamask = useMetaMask()

  const [{ error, fetching: isLoading }, registerWallet] = useRegisterWalletMutation()

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
