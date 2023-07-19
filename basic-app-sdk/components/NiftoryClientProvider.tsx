import { EnvironmentName, NiftoryProvider } from "@niftory/sdk/react"
import { NiftoryClient } from "@niftory/sdk"
import { useMemo } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export const NiftoryClientProvider = ({ children }) => {
  const { session } = useAuthContext()

  const client = useMemo(() => {
    return new NiftoryClient({
      environmentName: process.env.NEXT_PUBLIC_BLOCKCHAIN_ENV as EnvironmentName,
      authToken: session?.authToken as string,
      appId: process.env.NEXT_PUBLIC_CLIENT_ID,
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    })
  }, [session?.authToken])

  return <NiftoryProvider client={client}>{children}</NiftoryProvider>
}
