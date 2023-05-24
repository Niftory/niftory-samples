import { useToast } from "@chakra-ui/react"
import { useNiftoryClient, WalletState } from "@niftory/sdk"
import { backOff } from "exponential-backoff"
import { backendClient } from "graphql/backendClient"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"

export const NiftoryWalletInitializer = () => {
  const niftoryClient = useNiftoryClient()
  const toast = useToast()

  const [isVerifyingWallet, setVerifyingWallet] = useState(false)

  const session = useSession()

  const isAuthenticated = session.status === "authenticated"
  const verifyWalletStatus = useCallback(async () => {
    return backOff(async () => {
      const wallet = await niftoryClient?.getWallet()

      if (!wallet) {
        throw new Error("Wallet not found")
      }

      switch (wallet?.state) {
        case WalletState.PendingCreation:
          throw new Error("WalletCreationPending")

        case WalletState.CreationFailed:
          throw new Error("WalletCreationFailed")

        case WalletState.Ready:
          return true
      }
    })
  }, [niftoryClient])

  const verifyWalletCreation = useCallback(async () => {
    setVerifyingWallet(true)
    const wallet = await niftoryClient.getWallet()

    if (!wallet?.address) {
      await backendClient("createWallet")

      // Check if wallet is ready with exponential backoff
      await verifyWalletStatus()
      setVerifyingWallet(false)
    }
  }, [niftoryClient, verifyWalletStatus])

  useEffect(() => {
    if (isAuthenticated && !isVerifyingWallet && niftoryClient.isReady) {
      verifyWalletCreation()
    }
  }, [isVerifyingWallet, verifyWalletCreation, niftoryClient.isReady, isAuthenticated])
  return <></>
}
