import { Button } from "@chakra-ui/react"
import { useFlowUser } from "hooks/userFlowUser"
import { Wallet, WalletState } from "../../../generated/graphql"
import { ConfigureWallet } from "./ConfigureWallet"
import { VerifyWallet } from "./VerifyWallet"
import * as fcl from "@onflow/fcl"

interface Props {
  wallet: Wallet
}

export const WalletSwitcherButton = ({ wallet }: Props) => {
  const flowUser = useFlowUser()

  if (wallet.address !== flowUser?.addr && wallet.state != WalletState.Ready) {
    return (
      <Button
        size="sm"
        onClick={() => {
          fcl.unauthenticate()
          fcl.logIn()
        }}
      >
        Switch Wallet
      </Button>
    )
  }
  switch (wallet.state) {
    case WalletState.Unverified: {
      return <VerifyWallet wallet={wallet} />
    }
    case WalletState.Verified: {
      return <ConfigureWallet wallet={wallet} />
    }
  }
}
