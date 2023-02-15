import { GraphQLClient } from "graphql-request"
import { getClientCredentialsToken } from "../lib/oauth"

let client: GraphQLClient

/**
 * Gets a GraphQL client for use in the backend.
 * @returns A GraphQL client.
 */
export async function getClientForServer() {
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

/**
 * Gets a GraphQL client for use in the backend with out user credntial.
 * @returns A GraphQL client.
 */
export async function getClientForServerWithoutCredentials() {
  client =
    client ||
    new GraphQLClient(process.env.NEXT_PUBLIC_API_PATH, {
      headers: {
        "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
      },
    })

  return client
}
