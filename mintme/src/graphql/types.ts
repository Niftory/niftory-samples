import { TypedDocumentNode } from "urql"
/**
 * Specifies the types of the graphQL object in the format that URQL may return them.
 *
 * For example, when executing a query getUser with the expected output of user, specify a type like {getUser: User}
 */
 export type GraphQLQueryType<Outputs extends Record<string, unknown>> = {
    [K in keyof Outputs]: Partial<Outputs[K]>
  }
  
  /**
   * A graphQL query specified in urql's document node format.
   * To get an object of this type, use this template function: https://formidable.com/open-source/urql/docs/api/core/#gql
   */
  export type GraphQLQuery<Outputs extends Record<string, unknown>> = TypedDocumentNode<
    GraphQLQueryType<Outputs>
  >
  