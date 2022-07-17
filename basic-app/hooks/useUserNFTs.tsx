import { gql, useQuery } from "urql";

const GET_USER_NFTs = gql`
  query {
    nfts {
      id
      model {
        id
        title
      }
    }
  }
`;

export const useUserNFTs = () => useQuery({ query: GET_USER_NFTs });
