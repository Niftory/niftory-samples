import { Button, useDisclosure, Text } from "@chakra-ui/react"
import { useGraphQLMutation } from "graphql/useGraphQLMutation"
import { useFlowAccountConfiguration } from "hooks/userFlowAccountConfiguration"
import { useFlowUser } from "hooks/userFlowUser"
import { useEffect, useState } from "react"
import { ReadyWalletDocument, Wallet } from "../../../generated/graphql"
import { WalletSetupBox } from "./WalletSetupBox"
import * as fcl from "@onflow/fcl"
import { AlertModal } from "ui/Modal/AlertModal"

interface Props {
  wallet: Wallet
  onReady?: () => void
}

export function ConfigureWallet({ wallet, onReady }: Props) {
  const flowUser = useFlowUser()

  const { executeMutation: readyWallet } = useGraphQLMutation(ReadyWalletDocument)
  const { configured, configure } = useFlowAccountConfiguration()

  // Once the wallet is configured, call the ready mutation to tell Niftory it's ready to receive NFTs
  useEffect(() => {
    if (!configured || wallet.address != flowUser?.addr) {
      return
    }

    readyWallet({ address: flowUser?.addr }).then(onReady)
  }, [flowUser?.addr, configured])

  const alertDisclosure = useDisclosure()

  return (
    <>
      <Button px="4" py="2" size="sm" onClick={configure} color="black">
        Configure wallet
      </Button>
    </>
  )
}
