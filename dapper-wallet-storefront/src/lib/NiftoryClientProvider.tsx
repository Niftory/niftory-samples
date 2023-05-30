import { EnvironmentName, NiftoryClient, NiftoryProvider } from "@niftory/sdk"
import { useMemo } from "react"

export const NiftoryClientProvider = ({ children }) => {
  const client = useMemo(() => {
    return new NiftoryClient({
      environmentName: process.env.NEXT_PUBLIC_BLOCKCHAIN_ENV as EnvironmentName,
      appId: process.env.NEXT_PUBLIC_CLIENT_ID,
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    })
  }, [])

  return <NiftoryProvider client={client}>{children}</NiftoryProvider>
}
