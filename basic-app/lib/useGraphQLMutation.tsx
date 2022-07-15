import { GraphQLOutput, GraphQLQuery } from "./gql-types";
import { OperationContext, OperationResult, useMutation } from "urql";

export type GraphQLMutationResult<
  Outputs extends Record<string, unknown>,
  Variables extends object = object
> = GraphQLOutput<Outputs> & {
  /** true if the mutation is currently being executed */
  fetching: boolean;

  /** Any errors encountered */
  error: Error;

  /** A function that actually executes the mutation. The mutation is not actually executed until this function is called */
  executeMutation: (
    variables?: Variables,
    context?: Partial<OperationContext>
  ) => Promise<OperationResult<GraphQLOutput<Outputs>, Variables>>;
};

/**
 *
 * @param query The query to execute. To create a query of the right type, wrap it with this helper: https://formidable.com/open-source/urql/docs/api/core/#gql
 * @returns
 */
export function useGraphQLMutation<
  Outputs extends Record<string, unknown>,
  Variables extends object = object
>(query: GraphQLQuery<Outputs>): GraphQLMutationResult<Outputs, Variables> {
  const [result, executeMutationInternal] = useMutation<
    GraphQLOutput<Outputs>,
    Variables
  >(query);

  const { data, fetching, error } = result;

  const executeMutation = async (
    variables?: Variables,
    context?: Partial<OperationContext>
  ) => {
    const result = await executeMutationInternal(variables, context);

    if (result.error) {
      throw { ...result.error, errors: result.error.graphQLErrors };
    }

    return result;
  };

  return {
    ...data,
    fetching,
    error,
    executeMutation,
  };
}
