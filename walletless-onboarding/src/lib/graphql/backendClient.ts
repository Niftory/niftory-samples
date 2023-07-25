import { GraphQLClient } from "graphql-request"
import { getClientCredentialsToken } from "../oauth"
import type { GraphQLClientProvider } from "../../components/GraphQLClientProvider"

let client: GraphQLClient

/**
 * Gets a GraphQL client for use in the backend.
 * @see GraphQLClientProvider for a client for use in the frontend.
 * @returns A GraphQL client.
 */
export async function getBackendGraphQLClient() {
  client =
    client ||
    new GraphQLClient(process.env.NEXT_PUBLIC_API_PATH, {
      headers: {
        "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
      },
    })

  const token = await getClientCredentialsToken()

  client.setHeader("Authorization", `Bearer ${token}`)

  return client
}
