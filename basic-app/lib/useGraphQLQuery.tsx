import { GraphQLOutput, GraphQLQuery } from "./gql-types";
import { OperationContext, RequestPolicy, useQuery } from "urql";

type GraphQLQueryOpts<
  Outputs extends Record<string, unknown>,
  Variables = object
> = {
  /** The query to execute.
   *  To create a query of the right type, wrap it with this helper: https://formidable.com/open-source/urql/docs/api/core/#gql
   */
  query: GraphQLQuery<Outputs>;

  /** Any variables that need to get inserted into the query */
  variables?: Variables;

  /** If true, doesn't actually execute the query unless the refresh callback is called */
  pause?: boolean;

  /** https://formidable.com/open-source/urql/docs/basics/document-caching/#request-policies */
  requestPolicy?: RequestPolicy;

  /** https://formidable.com/open-source/urql/docs/api/core/#operationcontext */
  context?: Partial<OperationContext>;
};

export function useGraphQLQuery<
  Outputs extends Record<string, unknown>,
  Variables = object
>(opts: GraphQLQueryOpts<Outputs, Variables>) {
  const { query, variables, pause, requestPolicy, context } = opts;

  const [result, reExecuteQuery] = useQuery<GraphQLOutput<Outputs>, Variables>({
    query,
    variables,
    pause,
    requestPolicy,
    context,
  });

  const { data, fetching, error } = result;

  return {
    ...data,
    fetching,
    error,
    reExecuteQuery,
  };
}
