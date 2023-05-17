import { useRouter } from "next/router"
import { createContext, useCallback, useEffect, useState } from "react"

import { useSession } from "next-auth/react"
import * as fcl from "@onflow/fcl"
import { signOut as nextAuthSignOut, signIn as nextAuthSignIn } from "next-auth/react"
import { Session } from "next-auth"
import posthog from "posthog-js"
import { useNiftoryClient } from "@niftory/sdk"
import { backendClient } from "graphql/backendClient"

type AuthComponentProps = {
  children: React.ReactNode
  requireAuth: boolean | undefined
}

type AuthSession = Session & {
  error?: unknown
  authToken?: string
  userId?: string
}

type AuthContextType = {
  session: AuthSession
  isLoading: boolean
  signIn: (callbackUrl?: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null)

export function AuthProvider({ children, requireAuth }: AuthComponentProps) {
  const router = useRouter()

  const { data: session, status } = useSession()
  const sessionLoading = status === "loading"

  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const isLoading = sessionLoading || isAuthenticating

  const signIn = useCallback(async (callbackUrl?: string) => {
    setIsAuthenticating(true)
    await nextAuthSignIn("niftory", { callbackUrl })
    setIsAuthenticating(false)
  }, [])

  const signOut = useCallback(async (callbackUrl: string = "/") => {
    setIsAuthenticating(true)
    fcl.unauthenticate()
    await nextAuthSignOut({ redirect: false, callbackUrl })
    setIsAuthenticating(false)
  }, [])

  useEffect(() => {
    if (session) {
      posthog.identify(session.user.email, session.user)
    }
  }, [session])

  useEffect(() => {
    if (!requireAuth || isLoading) {
      return
    }

    if (session?.error) {
      console.error(session.error)
      signOut()
      return
    }

    if (!session || !session?.userId) {
      router.push("/")
      return
    }
  }, [requireAuth, session, router, isLoading, signOut])

  const client = useNiftoryClient()

  const verifyWalletCreation = useCallback(async () => {
    if (session && !isLoading && client) {
      const wallet = await client.createNiftoryWallet()
      if (!wallet) {
        backendClient("createWallet")
      }
    }
  }, [client, isLoading, session])

  useEffect(() => {
    verifyWalletCreation()
  }, [verifyWalletCreation])

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
