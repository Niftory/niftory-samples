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
  walletProvider?: WalletProvider
  isDapper: boolean
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type WalletProvider = {
  address: string
  color: string
  description: string
  icon: string
  name: string
  website: string
}

type Service = {
  id: string
  provider?: WalletProvider
}
export const WalletContext = createContext<WalletContextType>(null)

export function WalletProvider({ children, requireWallet }: WalletComponentProps) {
  const [currentUser, setCurrentUser] = useState<fcl.CurrentUserObject>(null)
  const [walletProvider, setWalletProvider] = useState<WalletProvider>(null)
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
    fcl.currentUser.subscribe((user) => {
      setCurrentUser(user)
      setWalletProvider(
        (user.services as Service[]).find((item: Service) => item?.provider)?.provider
      )
    })
  }, [])

  useEffect(() => {
    if (!requireWallet || isLoading) {
      return
    }

    if (currentUser && !currentUser.loggedIn) {
      router.push("/app/account")
      return
    }
  }, [requireWallet, currentUser, router, isLoading, signOut])

  const isDapper = walletProvider?.name === "Dapper Wallet"

  return (
    <WalletContext.Provider
      value={{ currentUser, isLoading, signIn, signOut, walletProvider, isDapper }}
    >
      {children}
    </WalletContext.Provider>
  )
}
