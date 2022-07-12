import { devtoolsExchange } from "@urql/devtools";
import { authExchange } from "@urql/exchange-auth";
import { retryExchange } from "@urql/exchange-retry";
import { signOut } from "next-auth/react";
import {
  cacheExchange,
  Client as UrqlClient,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Operation,
} from "urql";

import { GraphQLOutput, GraphQLQuery } from "./gql-types";

export type AuthState = {
  authToken: string;
  authTokenExpiration: number;
};

export function getGraphQLClient(
  getAuthState: () => Promise<AuthState | null>
) {
  const url = process.env.NEXT_PUBLIC_API_PATH as string;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

  return createClient({
    url: url,
    fetchOptions: {
      headers: {
        "X-Niftory-API-Key": apiKey,
      },
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      authExchange<AuthState>({
        getAuth: async ({ authState }) => {
          // This method gets called when first create the client, or when there's an auth error.

          // No AuthState, meaning we need to refresh it.
          if (!authState?.authToken) {
            return await getAuthState();
          }

          // AuthState exists, meaning we just had an auth error.
          // Sign out and return null meaning unauthenticated.
          await signOut();
          return null;
        },
        addAuthToOperation: ({ authState, operation }): Operation => {
          const token = authState?.authToken;

          // If not authenticated, return the default operation
          if (!token) {
            return operation;
          }

          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          // Otherwise, add the auth header
          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                "X-Niftory-API-Key": apiKey,
                Authorization: `Bearer ${token}`,
              },
            },
          });
        },
        willAuthError: ({ authState }) => {
          // Return true if operation is likely to fail
          return (
            !authState?.authToken || authState.authTokenExpiration < Date.now()
          );
        },
        didAuthError: ({ error }) => {
          // Return true if the received error is an auth error
          return (
            error.networkError?.message.toUpperCase() === "UNAUTHORIZED" ||
            error.graphQLErrors.some(
              (e) =>
                e.extensions?.code === "FORBIDDEN" ||
                e.extensions?.code === "UNAUTHENTICATED"
            )
          );
        },
      }),
      retryExchange({ maxNumberAttempts: 10 }),
      fetchExchange,
    ],
  });
}

export async function graphqlQueryAsync<
  Outputs extends Record<string, unknown>,
  Variables extends object = object
>(client: UrqlClient, query: GraphQLQuery<Outputs>, variables: Variables) {
  const result = await client
    .query<GraphQLOutput<Outputs>, Variables>(query, variables)
    .toPromise();

  if (result.error) {
    throw result.error;
  }

  return result.data;
}

export async function graphqlMutationAsync<
  Outputs extends Record<string, unknown>,
  Variables extends object = object
>(client: UrqlClient, query: GraphQLQuery<Outputs>, variables?: Variables) {
  const result = await client.mutation(query, variables).toPromise();

  if (result.error) {
    throw result.error;
  }

  return result.data;
}
