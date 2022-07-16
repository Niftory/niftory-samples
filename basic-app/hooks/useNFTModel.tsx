import { useGraphQLQuery } from "../lib/useGraphQLQuery";
import { NexusGenRootTypes } from "../lib/api-types";
import { gql } from "urql";

const GET_NFT_MODEL = gql`
  query ($id: String!) {
    nftModel(id: $id) {
      id
      blockchainId
      title
      description
      quantity
      status
      content {
        files {
          media {
            url
            contentType
          }
          thumbnail {
            url
            contentType
          }
        }
        poster {
          url
        }
      }
      rarity
    }
  }
`;

export function useNFTModel(nftModelId: string) {
  const result = useGraphQLQuery<{
    nftModel?: NexusGenRootTypes["NFTModel"];
  }>({
    query: GET_NFT_MODEL,
    variables: { id: nftModelId },
    pause: !nftModelId,
  });

  return {
    nftModel: result.nftModelId,
    ...result,
  };
}
