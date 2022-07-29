import { GraphQLClient } from "graphql-request"
import { useGraphQLClient } from "./useGraphQLClient"

export function useGraphQLQuery<Variables, Options, Headers, Result>(
  queryHook: (
    client: GraphQLClient,
    variables: Variables,
    options: Options,
    headers: Headers
  ) => Result,
  variables: Variables = undefined,
  options: Options = undefined,
  headers: Headers = undefined
) {
  const { client, isLoading } = useGraphQLClient()

  return queryHook(client, variables, { enabled: !isLoading, ...options }, headers)
}
