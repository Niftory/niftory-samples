import { GraphQLClient } from "graphql-request"
import { useQueryClient } from "react-query"
import { useGraphQLClient } from "./useGraphQLClient"

export function useWalletMutation<Options, Result>(
  mutationHook: (client: GraphQLClient, options: Options) => Result,
  options: Options = undefined
) {
  const { client: graphqlClient, isLoading: isGraphQLClientLoading } = useGraphQLClient()
  const reactQueryClient = useQueryClient()
  return mutationHook(graphqlClient, {
    ...options,
    // Ensure the user wallet query is invalidated and refetched on success
    onSuccess: () => reactQueryClient.invalidateQueries(["userWallet"]),
  })
}
