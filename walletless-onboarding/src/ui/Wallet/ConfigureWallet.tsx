import { Button, useDisclosure } from "@chakra-ui/react"

import { useEffect } from "react"
import {
  useFlowUser,
  useFlowAccountConfiguration,
  useReadyWalletMutation,
  Wallet,
} from "@niftory/sdk"

interface Props {
  wallet: Wallet
  onReady?: () => void
}

export function ConfigureWallet({ wallet, onReady }: Props) {
  const flowUser = useFlowUser()

  const [_, readyWallet] = useReadyWalletMutation()
  const { configured, configure } = useFlowAccountConfiguration({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    nftAddress: process.env.NEXT_PUBLIC_NFT_ADDRESS,
    niftoryAddress: process.env.NEXT_PUBLIC_NIFTORY_ADDRESS,
    registryAddress: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
  })

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
