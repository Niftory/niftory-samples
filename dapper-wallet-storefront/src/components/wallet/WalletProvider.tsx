import * as fcl from "@onflow/fcl"
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next"
import { useRouter } from "next/router"
import { createContext, useCallback, useEffect, useState } from "react"
import { COOKIE_NAME } from "../../lib/cookieUtils"
import addDays from "date-fns/addDays"

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
  const initialUser = hasCookie(COOKIE_NAME)
    ? (JSON.parse(getCookie(COOKIE_NAME).toString()) as fcl.CurrentUserObject)
    : null
  const [currentUser, setCurrentUser] = useState<fcl.CurrentUserObject>(initialUser)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const signIn = useCallback(async () => {
    setIsLoading(true)
    fcl.logIn()
    setIsLoading(false)
  }, [])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    setCurrentUser(null)
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

      // use pop instead of default IFRAME/RPC option for security enforcement
      .put("discovery.wallet.method", "POP/RPC")
    fcl.currentUser.subscribe((user) => {
      // Load from cookie or update from FCL if FCL user state changed.
      if (currentUser?.addr && !user?.addr) {
        return
      } else if (user?.addr) {
        setCurrentUser(user)
        setCookie(COOKIE_NAME, user, { path: "/", expires: addDays(Date.now(), 14) })
      } else {
        deleteCookie(COOKIE_NAME)
      }
    })
  }, [currentUser?.addr])

  useEffect(() => {
    if (!requireWallet || isLoading) {
      return
    }

    if (!currentUser?.loggedIn) {
      router.push("/app/account")
      return
    }
  }, [requireWallet, currentUser, router.pathname, isLoading, signOut])

  return (
    <WalletContext.Provider value={{ currentUser, isLoading, signIn, signOut }}>
      {children}
    </WalletContext.Provider>
  )
}
