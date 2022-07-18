import { gql, useQuery } from "urql";
import { GetNftModelDocument } from "../generated/graphql";

gql`
  query getNftModel($id: String!) {
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
    query: GetNftModelDocument,
    variables: { id: nftModelId },
    pause: !nftModelId,
  });
