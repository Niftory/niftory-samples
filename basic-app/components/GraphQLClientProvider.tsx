import { GraphQLClient } from "graphql-request";
import { useSession } from "next-auth/react";
import { createContext, useMemo } from "react";
import type { getBackendGraphQLClient } from "../lib/graphql/backendClient";

export const GraphQLClientContext = createContext<GraphQLClient>(null);

/**
 * Exposes a GraphQL client for the current session
 * @see getBackendGraphQLClient for how to get a client for the backend.
 */
export const GraphQLClientProvider = ({ children }) => {
  const { data: session } = useSession();

  const graphqlClient = useMemo(
    () =>
      new GraphQLClient(process.env.NEXT_PUBLIC_API_PATH, {
        headers: {
          "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: session?.authToken
            ? `Bearer ${session?.authToken}`
            : "",
        },
      }),
    [session?.authToken]
  );

  return (
    <GraphQLClientContext.Provider value={graphqlClient}>
      {children}
    </GraphQLClientContext.Provider>
  );
};
