import { useGraphQLQuery } from "../lib/useGraphQLQuery";
import { NexusGenRootTypes } from "../lib/api-types";
import { gql } from "urql";

const GET_NFT = gql`
  query ($id: String!) {
    nft(id: $id) {
      id
      blockchainId
      serialNumber
      model {
        id
        blockchainId
        title
        description
        rarity
        quantity
        metadata
        content {
          poster {
            url
          }
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
        }
      }
    }
  }
`;

export function useNFT(nftId: string) {
  const result = useGraphQLQuery<{
    nft?: NexusGenRootTypes["NFT"];
  }>({
    query: GET_NFT,
    variables: { id: nftId },
    pause: !nftId,
  });

  return {
    nft: result.nft,
    ...result,
  };
}
