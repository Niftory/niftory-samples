import { gql } from "urql";
import { NexusGenRootTypes } from "../lib/api-types";
import { useGraphQLQuery } from "../lib/useGraphQLQuery";

const GET_USER_WALLET = gql`
  query {
    wallet {
      id
      address
      state
    }
  }
`;

export function useUserCollection() {
  return useGraphQLQuery<{
    wallet: NexusGenRootTypes["Wallet"] | null;
  }>({
    query: GET_USER_WALLET,
  });
}
