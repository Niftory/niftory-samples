import { useRouter } from "next/router"
import { createContext, useCallback, useEffect, useState } from "react"

import { useSession } from "next-auth/react"
import * as fcl from "@onflow/fcl"
import { signOut as nextAuthSignOut, signIn as nextAuthSignIn } from "next-auth/react"
import { Session } from "next-auth"

type AuthComponentProps = {
  children: React.ReactNode
  requireAuth: boolean | undefined
}

type AuthContextType = {
  session: Session
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null)

export function AuthProvider({ children, requireAuth }: AuthComponentProps) {
  const router = useRouter()

  const { data: session, status } = useSession()
  const sessionLoading = status === "loading"

  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const isLoading = sessionLoading || isAuthenticating

  const signIn = useCallback(async () => {
    setIsAuthenticating(true)
    await nextAuthSignIn("niftory")
    setIsAuthenticating(false)
  }, [])

  const signOut = useCallback(async () => {
    setIsAuthenticating(true)
    fcl.unauthenticate()
    const { url } = await nextAuthSignOut({ redirect: false })
    await router.push(url)
    setIsAuthenticating(false)
  }, [router])

  useEffect(() => {
    if (!requireAuth || isLoading) {
      return
    }

    if (session?.error) {
      console.error(session.error)
      signOut()
      return
    }

    if (!session) {
      router.push("/")
      return
    }
  }, [requireAuth, session, router, isLoading, signOut])

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
