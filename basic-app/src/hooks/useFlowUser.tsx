import * as fcl from "@onflow/fcl";
import { send as grpcSend } from "@onflow/transport-grpc";
import { useSession } from "next-auth/react";
import path from "path";
import { useEffect, useState } from "react";

export function useFlowUser() {
  const [flowUser, setFlowUser] = useState<fcl.CurrentUserObject>();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const accessApi = process.env.NEXT_PUBLIC_FLOW_ACCESS_API;
  let walletApi = process.env.NEXT_PUBLIC_WALLET_API;

  /* Set up the flow config - reload it only if the access API or handshake change.
   */
  useEffect(() => {
    fcl
      .config()
      .put("sdk.transport", grpcSend)
      .put("accessNode.api", accessApi) // connect to Flow
      .put("discovery.wallet", walletApi); // use Blocto wallet

    fcl.currentUser.subscribe((user, ...args) => {
      console.log("setting user", user, args);
      setFlowUser(user);
    });
  }, [accessApi, walletApi]);

  return { flowUser, loading };
}
