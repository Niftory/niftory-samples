import { gql, useQuery } from "urql";

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

export const useNFT = (nftId: string) =>
  useQuery({
    query: GET_NFT,
    variables: { id: nftId },
    pause: !nftId,
  });
