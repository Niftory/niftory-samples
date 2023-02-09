import { useCallback } from "react"
import * as fcl from "@onflow/fcl"
import {
  VerifyWalletDocument,
  VerifyWalletMutation,
  VerifyWalletMutationVariables,
} from "../../../generated/graphql"
import { useGraphQLMutation } from "graphql/useGraphQLMutation"
import { Button } from "@chakra-ui/react"

export function VerifyWallet({ wallet }) {
  const { executeMutation: verifyWallet } = useGraphQLMutation<
    VerifyWalletMutation,
    VerifyWalletMutationVariables
  >(VerifyWalletDocument)

  // On click, prompt the user to sign the verification message
  const verify = useCallback(async () => {
    // Use FCL to sign the verification message
    const signature = await fcl.currentUser?.signUserMessage(wallet.verificationCode)

    if (!signature) {
      return
    }

    // Send the signature to the API
    verifyWallet({
      address: wallet.address,
      signedVerificationCode: signature,
    })
  }, [verifyWallet, wallet.address, wallet.verificationCode])

  return (
    <>
      <Button
        px="4"
        py="2"
        size="sm"
        color="black"
        onClick={() => {
          verify()
        }}
      >
        Verify Wallet
      </Button>
    </>
  )
}
