import { useEffect } from "react"

import * as fcl from "@onflow/fcl"
import { Button } from "@chakra-ui/react"
import { useFlowUser, useRegisterWalletMutation } from "@niftory/sdk"

interface Props {
  onRegister?: () => void
}

export function RegisterWallet({ onRegister }: Props) {
  const flowUser = useFlowUser()

  const [_, registerWallet] = useRegisterWalletMutation()

  // When the user logs in, register their wallet. This is because we need to register after fcl.login and it doesn't return a promise.
  useEffect(() => {
    if (!flowUser?.addr) {
      return
    }

    registerWallet({ address: flowUser?.addr }).then(() => onRegister?.())
  }, [flowUser?.addr, flowUser?.loggedIn])

  const handleRegister = async () => {
    fcl.unauthenticate()
    fcl.logIn()
  }

  return (
    <Button px="4" py="2" size="md" onClick={handleRegister}>
      Add your wallet
    </Button>
  )
}
