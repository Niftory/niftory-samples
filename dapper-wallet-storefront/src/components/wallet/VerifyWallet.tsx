import * as fcl from "@onflow/fcl"
import axios from "axios"
import { useCallback, useState } from "react"
import { WalletSetupBox } from "./WalletSetupBox"

export type VerifyWalletProps = {
  verificationCode: string
  mutateCache: () => void
}

export function VerifyWallet({ verificationCode, mutateCache }: VerifyWalletProps) {
  const [verifying, setVerifying] = useState(false)

  // On click, prompt the user to sign the verification message
  const onClick = useCallback(async () => {
    // Use FCL to sign the verification message
    const signedVerificationCode = await fcl.currentUser.signUserMessage(verificationCode)

    if (!signedVerificationCode) {
      return
    }

    setVerifying(true)
    axios
      .post("/api/verifyWallet", { signedVerificationCode })
      .then(mutateCache)
      .finally(() => setVerifying(false))
  }, [mutateCache, verificationCode])

  return (
    <WalletSetupBox
      text={
        "Step 2 is proving that the wallet is yours. Click the button below to send a secure message signed by your wallet."
      }
      buttonText="Verify wallet"
      onClick={onClick}
      isLoading={verifying}
    />
  )
}
