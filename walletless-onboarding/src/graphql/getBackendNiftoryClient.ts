import { EnvironmentName, NiftoryClient } from "@niftory/sdk"
let client: NiftoryClient

/**
 * Gets a NIFTORY client for use in the backend.
 * @returns A NiftorySdk client.
 */
export function getBackendNiftoryClient() {
  client =
    client ||
    new NiftoryClient({
      environmentName: process.env.NEXT_PUBLIC_BLOCKCHAIN_ENV as EnvironmentName,
      appId: process.env.NEXT_PUBLIC_CLIENT_ID,
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      clientSecret: process.env.CLIENT_SECRET,
    })

  return client
}
