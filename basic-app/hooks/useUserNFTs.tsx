import { gql, useQuery } from "urql";
import { GetUserNftsDocument } from "../generated/graphql";

gql`
  query getUserNfts {
    nfts {
      id
      model {
        id
        title
      }
    }
  }
`;

export const useUserNFTs = () => useQuery({ query: GetUserNftsDocument });
