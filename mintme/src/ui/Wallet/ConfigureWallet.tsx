import { Button, useDisclosure } from "@chakra-ui/react"
import { Wallet, useReadyWalletMutation } from "@niftory/sdk"
import { useFlowAccountConfiguration } from "hooks/userFlowAccountConfiguration"
import { useFlowUser } from "hooks/userFlowUser"
import { useEffect } from "react"

interface Props {
  wallet: Wallet
  onReady?: () => void
}

export function ConfigureWallet({ wallet, onReady }: Props) {
  const flowUser = useFlowUser()

  const [_, readyWallet] = useReadyWalletMutation()
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
