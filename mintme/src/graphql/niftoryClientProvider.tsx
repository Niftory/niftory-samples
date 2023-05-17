import { useAuthContext } from "hooks/useAuthContext"
import { NiftoryClient, NiftoryProvider } from "@niftory/sdk"
import { useMemo } from "react"

export const NiftoryClientProvider = ({ children }) => {
  const { session } = useAuthContext()

  const client = useMemo(() => {
    return new NiftoryClient({
      environmentName: "dev",
      authToken: session?.authToken ?? "",
      appId: process.env.NEXT_PUBLIC_CLIENT_ID,
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    })
  }, [session?.authToken])

  return <NiftoryProvider client={client}>{children}</NiftoryProvider>
}
