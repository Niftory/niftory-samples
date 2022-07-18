import { gql } from "urql";
import { NexusGenRootTypes } from "../lib/api-types";
import { useGraphQLQuery } from "../lib/useGraphQLQuery";

const GET_USER_NFTs = gql`
  query {
    nfts {
      id
      model {
        content {
          poster {
            url
          }
        }
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
