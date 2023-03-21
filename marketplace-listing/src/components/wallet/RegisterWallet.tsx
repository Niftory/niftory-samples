import { useEffect, useState } from "react"
import axios from "axios"

import { WalletSetupBox } from "./WalletSetupBox"
import { useWalletContext } from "../../hooks/useWalletContext"

type RegisterWalletProps = {
  mutateCache: () => void
}

export function RegisterWallet({ mutateCache }: RegisterWalletProps) {
  const [registering, setRegistering] = useState<boolean>(false)
  const { currentUser, signIn, isLoading: walletContextLoading } = useWalletContext()

  // When the user logs in, register their wallet
  useEffect(() => {
    if (walletContextLoading || !currentUser?.addr) {
      return
    }

    setRegistering(true)
    axios
      .post("/api/registerWallet")
      .then(mutateCache)
      .finally(() => setRegistering(false))
  }, [currentUser?.addr, currentUser?.loggedIn, registering, walletContextLoading, mutateCache])

  return (
    <WalletSetupBox
      text={
        "First, we need to create or connect to a Flow wallet. Hit the button below and follow the prompts."
      }
      buttonText="Link or create your wallet"
      onClick={signIn}
      isLoading={registering}
    />
  )
}
