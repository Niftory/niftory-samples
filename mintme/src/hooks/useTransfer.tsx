import { backOff } from "exponential-backoff"
import { Session } from "next-auth"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  WalletDocument,
  WalletState,
  TransferMutation,
  TransferMutationVariables,
} from "../../generated/graphql"
import { backendClient } from "../graphql/backendClient"
import { getClientFromSession } from "../graphql/getClientFromSession"
import posthog from "posthog-js"

const getReadyWallet = async (session: Session) => {
  const client = await getClientFromSession(session)
  const { wallet } = await client.request(WalletDocument)

  switch (wallet?.state) {
    case WalletState.PendingCreation:
      throw new Error("WalletCreationPending")

    case WalletState.CreationFailed:
      throw new Error("WalletCreationFailed")

    case WalletState.Ready:
      return true
  }
}

const readyWallet = async (session) => {
  return backOff(() => getReadyWallet(session))
}

const transferNFTModel = async (
  nftModelId: string,
  session: Session,
  onTransferEnd?: () => void
) => {
  let toastId
  try {
    toastId = toast.loading("Minting your NFTs...")
    await readyWallet(session)
    const { transfer } = await backendClient<TransferMutation, TransferMutationVariables>(
      "transferNFTModel",
      {
        nftModelId,
      }
    )
    toast.success("Successfully minted your NFTs to your Niftory Wallet", { id: toastId })
    onTransferEnd?.()
    return transfer
  } catch (e) {
    toast.error("Uh Oh, there was an error while minting your NFTs. Redirecting...", {
      id: toastId,
    })
    throw new Error("Error transferring NFTs to wallet")
  }
}

export function useTransfer() {
  const [isLoading, setLoading] = useState(false)
  return {
    transferNFTModel: async (nftModelId: string, session: Session, onTransferEnd?: () => void) => {
      try {
        setLoading(true)
        return await transferNFTModel(nftModelId, session, onTransferEnd).finally(() =>
          setLoading(false)
        )
      } catch (e) {
        posthog.capture("ERROR_FAILED_TRANSFERNFTMODEL_CALL", e)
      }
    },
    getReadyWallet,
    readyWallet,
    isLoading,
  }
}
