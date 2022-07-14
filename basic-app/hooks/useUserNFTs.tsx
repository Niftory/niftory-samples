import { gql } from "urql";
import { NexusGenRootTypes } from "../lib/api-types";
import { useGraphQLQuery } from "../lib/useGraphQLQuery";

const GET_USER_NFTs = gql`
  query {
    nfts {
      id
      model {
        id
        title
      }
    }
  }
`;

export function useUserNFTs() {
  return useGraphQLQuery<{
    nfts: NexusGenRootTypes["NFT"][];
  }>({
    query: GET_USER_NFTs,
  });
}
