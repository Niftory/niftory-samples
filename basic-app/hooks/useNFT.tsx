import { gql, useQuery } from "urql";
import { GetNftDocument } from "../generated/graphql";

gql`
  query getNft($id: String!) {
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

export const useNFT = (nftId: string | undefined) =>
  useQuery({
    query: GetNftDocument,
    variables: { id: nftId as string },
    pause: !nftId,
  });
