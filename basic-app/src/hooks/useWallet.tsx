import { gql, useQuery } from "urql";
import { GetUserWalletDocument } from "../generated/graphql";

gql`
  query getUserWallet {
    wallet {
      id
      address
      state
      verificationCode
    }
  }
`;

export const useWallet = () => {
  const [result, refetch] = useQuery({
    query: GetUserWalletDocument,
  });

  return {
    wallet: result.data?.wallet,
    refetch,
    ...result,
  };
};
