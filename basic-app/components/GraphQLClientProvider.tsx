import { GraphQLClient } from "graphql-request"
import { createContext, useMemo } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import type { getBackendGraphQLClient } from "../lib/graphql/backendClient"

type GraphlQLClientContextType = { isLoading: boolean; client: GraphQLClient }
export const GraphQLClientContext = createContext<GraphlQLClientContextType>(null)

/**
 * Exposes a GraphQL client for the current session
 * @see getBackendGraphQLClient for how to get a client for the backend.
 */
export const GraphQLClientProvider = ({ children }) => {
  const { session, isLoading } = useAuthContext()

  const client = useMemo(() => {
    if (isLoading) {
      return undefined
    }

    const headers = {
      "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    }

    if (session?.authToken) {
      headers["Authorization"] = `Bearer ${session.authToken}`
    }

    return new GraphQLClient(process.env.NEXT_PUBLIC_API_PATH, {
      headers,
    })
  }, [isLoading, session?.authToken])

  return (
    <GraphQLClientContext.Provider value={{ client, isLoading }}>
      {children}
    </GraphQLClientContext.Provider>
  )
}
