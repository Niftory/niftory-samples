import { GraphQLClient } from "graphql-request";
import { useSession } from "next-auth/react";
import { createContext, useMemo } from "react";
import type { getBackendGraphQLClient } from "../lib/graphql/backendClient";

type GraphlQLClientContextType = { isLoading: boolean; client: GraphQLClient };
export const GraphQLClientContext =
  createContext<GraphlQLClientContextType>(null);

/**
 * Exposes a GraphQL client for the current session
 * @see getBackendGraphQLClient for how to get a client for the backend.
 */
export const GraphQLClientProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const client = useMemo(() => {
    if (isLoading) {
      return undefined;
    }

    return new GraphQLClient(process.env.NEXT_PUBLIC_API_PATH, {
      headers: {
        "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
        Authorization: session?.authToken ? `Bearer ${session?.authToken}` : "",
      },
    });
  }, [isLoading, session?.authToken]);

  return (
    <GraphQLClientContext.Provider value={{ client, isLoading }}>
      {children}
    </GraphQLClientContext.Provider>
  );
};
