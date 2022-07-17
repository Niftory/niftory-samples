import { createClient } from "@urql/core";

export function getGraphQLClient(
  url: string,
  apiKey: string,
  authToken: string
) {
  return createClient({
    url: url,
    fetchOptions: {
      headers: {
        "X-Niftory-API-Key": apiKey,
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    },
  });
}
