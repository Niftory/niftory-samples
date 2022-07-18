import { gql, useQuery } from "urql";
import { GetUserNftsDocument } from "generated/graphql";

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

export const useUserNFTs = () => {
  const [result, refetch] = useQuery({ query: GetUserNftsDocument });

  return { nfts: result.data?.nfts, refetch, ...result };
};
