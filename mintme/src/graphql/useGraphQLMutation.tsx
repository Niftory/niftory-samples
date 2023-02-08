import { OperationContext, OperationResult } from "urql"
import { useMutation } from "urql"
import type {
  GraphQLQueryType as GraphQLMutationType,
  GraphQLQuery as GraphQLMutation,
} from "./types"

export type GraphQLMutationResult<
  Outputs extends Record<string, unknown>,
  Variables extends object = object
> = GraphQLMutationType<Outputs> & {
  fetching: boolean
  error: Error
  executeMutation: (variables: Variables, context?: Partial<OperationContext>) => Promise<void>
}

export function useGraphQLMutation<
  X extends GraphQLMutationType<Record<string, unknown>>,
  Y extends object = object
>(query: GraphQLMutation<X>): GraphQLMutationResult<X, Y> {
  const [result, executeMutationInternal] = useMutation<GraphQLMutationType<X>>(query)
  const { data, fetching, error } = result
  const executeMutation = async (variables?: Y, context?: Partial<OperationContext>) => {
    const executeMutationResponse = await executeMutationInternal({
      ...variables,
      context,
    }).then((res: OperationResult<X, Y>) => {
      if (res.error) {
        throw { ...res.error }
      }
    })

    return executeMutationResponse
  }
  return {
    ...data,
    fetching,
    error,
    executeMutation,
  }
}
