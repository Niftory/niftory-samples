import { gql, useQuery } from "urql";
import { GetNftModelsDocument } from "../generated/graphql";

gql`
  query getNftModels {
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

export const useNFTModels = () => {
  const [result, refetch] = useQuery({
    query: GetNftModelsDocument,
  });

  return { nftModels: result.data?.nftModels, refetch, ...result };
};
