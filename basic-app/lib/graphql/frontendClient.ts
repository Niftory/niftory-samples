import { GraphQLClient } from "graphql-request";
import { Session } from "next-auth";

/**
 * Creates a graphQL client for use in the browser, using the user's auth token for authentication
 * @param url The URL of the GraphQL API
 * @param apiKey The API key
 * @param session The user session
 * @returns The graphQL client
 */
export function getFrontendGraphQLClient(
  url: string,
  apiKey: string,
  session: Session | null
) {
  return new GraphQLClient(url, {
    headers: {
      "X-Niftory-API-Key": apiKey,
      Authorization: session?.authToken ? `Bearer ${session.authToken}` : "",
    },
  });
}
