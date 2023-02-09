import { useEffect, useCallback, useMemo, useState } from "react"
import React from "react"
import { retryExchange } from "@urql/exchange-retry"
import axios from "axios"

import { useAuthContext } from "../hooks/useAuthContext"
import { Provider, createClient, dedupExchange, fetchExchange } from "urql"
import { cacheExchange, Cache } from "@urql/exchange-graphcache"

export const GraphQLClientProvider = ({ children }) => {
  const client = useGraphQLClient()
  return <Provider value={client}>{children}</Provider>
}

const invalidateCache = (cache: Cache, name: string, args?: { input: { id: any } }) =>
  args
    ? cache.invalidate({ __typename: name, id: args.input.id })
    : cache
        .inspectFields("Query")
        .filter((field) => field.fieldName === name)
        .forEach((field) => {
          cache.invalidate("Query", field.fieldKey)
        })

const getGraphQLClient = (headers: HeadersInit) => {
  const url = process.env.NEXT_PUBLIC_API_PATH
  return createClient({
    url: url,
    fetchOptions: {
      headers: headers,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            // Whenever we withdraw invalidate nfts
            withdraw: (_parent, _args, cache, _info) => {
              invalidateCache(cache, "nfts")
            },
          },
        },
      }),
      retryExchange({ maxNumberAttempts: 3 }),
      fetchExchange,
    ],
  })
}

export const useGraphQLClient = () => {
  const { session, isLoading } = useAuthContext()
  return useMemo(() => {
    const headers = {}

    if (process.env.NEXT_PUBLIC_API_KEY) {
      headers["X-Niftory-API-Key"] = process.env.NEXT_PUBLIC_API_KEY
    }
    if (session?.authToken || isLoading) {
      headers["Authorization"] = `Bearer ${session?.authToken}`
    }

    return getGraphQLClient(headers)
  }, [isLoading, session?.authToken])
}
