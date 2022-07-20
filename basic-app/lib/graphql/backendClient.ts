import { GraphQLClient } from "graphql-request";
import { getClientCredentialsToken } from "../oauth";

let client: GraphQLClient;

export async function getBackendGraphQLClient() {
  client =
    client ||
    new GraphQLClient(process.env.NEXT_PUBLIC_API_PATH, {
      headers: {
        "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

  const token = await getClientCredentialsToken();

  client.setHeader("Authorization", `Bearer ${token}`);

  return client;
}
