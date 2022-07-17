import { gql, useQuery } from "urql";

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

export const useNFTModel = (nftModelId: string) =>
  useQuery({
    query: GET_NFT_MODEL,
    variables: { id: nftModelId },
    pause: !nftModelId,
  });
