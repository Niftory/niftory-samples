import type { GraphQLQueryType, GraphQLQuery } from "./types"
import { useAuthContext } from "../hooks/useAuthContext"
import { OperationContext, RequestPolicy, useQuery } from "urql"
import { signOut } from "next-auth/react"

export type GraphQLQueryResult<Outputs extends Record<string, unknown>> =
  GraphQLQueryType<Outputs> & {
    fetching: boolean
    error: Error
    reExecuteQuery: (opts?: Partial<OperationContext>) => void
  }

type GraphQLQueryOpts<Outputs extends Record<string, unknown>, Variables = object> = {
  /** The query to execute.
   *  To create a query of the right type, wrap it with this helper: https://formidable.com/open-source/urql/docs/api/core/#gql
   */
  query: GraphQLQuery<Outputs>

  /** Any variables that need to get inserted into the query */
  variables?: Variables

  /** If true, doesn't actually execute the query unless the refresh callback is called */
  pause?: boolean

  /** https://formidable.com/open-source/urql/docs/basics/document-caching/#request-policies */
  requestPolicy?: RequestPolicy

  /** https://formidable.com/open-source/urql/docs/api/core/#operationcontext */
  context?: Partial<OperationContext>
}

export function useGraphQLQuery<Outputs extends Record<string, unknown>, Variables = object>(
  opts: GraphQLQueryOpts<Outputs, Variables>
): GraphQLQueryResult<Outputs> {
  const { isLoading } = useAuthContext()

  const { query, variables, pause: pauseRequested, requestPolicy, context } = opts

  const pause = pauseRequested || isLoading

  const [result, reExecuteQuery] = useQuery<Outputs>({
    query,
    variables,
    pause,
    requestPolicy,
    context,
  })

  const { data, fetching, error } = result

  if (error && error?.response?.status === 403) {
    signOut()
  }

  return {
    ...data,
    fetching,
    error,
    reExecuteQuery,
  }
}
