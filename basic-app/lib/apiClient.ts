import { createClient } from "@urql/core";
import type { Session } from "next-auth";

export function getGraphQLClient(
  url: string,
  apiKey: string,
  session: Session
) {
  return createClient({
    url: url,
    fetchOptions: {
      headers: {
        "X-Niftory-API-Key": apiKey,
        Authorization: session?.authToken ? `Bearer ${session.authToken}` : "",
      },
    },
  });
}
