import * as fcl from "@onflow/fcl"
import { send as grpcSend } from "@onflow/transport-grpc"
import { useMemo, useState } from "react"

export function useFlowUser() {
  const [flowUser, setFlowUser] = useState<fcl.CurrentUserObject>()

  useMemo(() => {
    fcl
      .config()
      .put("sdk.transport", grpcSend)
      .put("accessNode.api", process.env.NEXT_PUBLIC_FLOW_ACCESS_API) // connect to Flow
      .put("discovery.wallet", process.env.NEXT_PUBLIC_WALLET_API) // use Blocto wallet

      // use pop instead of default IFRAME/RPC option for security enforcement
      .put("discovery.wallet.method", "POP/RPC")

    // Sets flowUser whenver it changes
    fcl.currentUser.subscribe(setFlowUser)
  }, [])

  return flowUser
}
