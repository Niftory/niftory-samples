import { GraphQLClient } from "graphql-request"

let client: GraphQLClient

/**
 * Gets a GraphQL client for use in the backend.
 * @returns A GraphQL client.
 */
export async function getBackendGraphQLClient() {
  client =
    client ||
    new GraphQLClient(process.env.NEXT_PUBLIC_API_PATH, {
      headers: {
        "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
        "X-Niftory-Client-Secret": process.env.CLIENT_SECRET,
      },
    })

  return client
}
