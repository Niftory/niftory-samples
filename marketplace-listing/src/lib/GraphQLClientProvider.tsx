import { retryExchange } from "@urql/exchange-retry"
import { useMemo } from "react"
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from "urql"

export const GraphQLClientProvider = ({ children }) => {
  const client = useMemo(() => {
    const headers = {
      "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    }

    return getGraphQLClient(headers)
  }, [])

  return <Provider value={client}>{children}</Provider>
}

function getGraphQLClient(headers: HeadersInit) {
  const url = process.env.NEXT_PUBLIC_API_PATH
  return createClient({
    url: url,
    fetchOptions: {
      headers: headers,
    },
    exchanges: [
      dedupExchange,
      cacheExchange,
      retryExchange({ maxNumberAttempts: 3 }),
      fetchExchange,
    ],
  })
}

export const useGraphQLClient = () => {
  return useMemo(() => {
    const headers = {
      "X-Niftory-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    }

    return getGraphQLClient(headers)
  }, [])
}
