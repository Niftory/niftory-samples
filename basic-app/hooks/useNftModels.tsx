import { gql, useQuery } from "urql";

const API_GET_NFT_MODEL = gql`
  query {
    nftModels {
      id
      blockchainId
      title
      description
      quantity
      status
      rarity
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
    }
  }
`;

export const useNFTModels = () =>
  useQuery({
    query: API_GET_NFT_MODEL,
  });
