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

export const useWallet = () =>
  useQuery({
    query: GetUserWalletDocument,
  });
