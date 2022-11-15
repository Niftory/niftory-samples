import * as fcl from "@onflow/fcl"
import { useRouter } from "next/router"
import { createContext, useCallback, useEffect, useState } from "react"
import { fclCookieStorage } from "../../lib/cookieUtils"

type WalletComponentProps = {
  children: React.ReactNode
  requireWallet: boolean | undefined
}

type WalletContextType = {
  currentUser: fcl.CurrentUserObject
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const WalletContext = createContext<WalletContextType>(null)

export function WalletProvider({ children, requireWallet }: WalletComponentProps) {
  const [currentUser, setCurrentUser] = useState<fcl.CurrentUserObject>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const signIn = useCallback(async () => {
    setIsLoading(true)
    fcl.logIn()
    setIsLoading(false)
  }, [])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    fcl.unauthenticate()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fcl
      .config({
        "app.detail.title": "niftory",
        "app.detail.icon": "/public/niftory_icon",
      })
      .put("accessNode.api", process.env.NEXT_PUBLIC_FLOW_ACCESS_API) // connect to Flow
      .put("discovery.wallet", process.env.NEXT_PUBLIC_WALLET_API)
      .put("fcl.storage", fclCookieStorage)

      // use pop instead of default IFRAME/RPC option for security enforcement
      .put("discovery.wallet.method", "POP/RPC")
    fcl.currentUser.subscribe((user) => setCurrentUser(user))
  }, [])

  useEffect(() => {
    if (!requireWallet || isLoading) {
      return
    }

    if (!currentUser?.loggedIn) {
      router.push("/app/account")
      return
    }
  }, [requireWallet, currentUser, router, isLoading, signOut])

  return (
    <WalletContext.Provider value={{ currentUser, isLoading, signIn, signOut }}>
      {children}
    </WalletContext.Provider>
  )
}
