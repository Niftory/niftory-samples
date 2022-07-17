import { gql, useQuery } from "urql";

const GET_USER_WALLET = gql`
  query {
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
    query: GET_USER_WALLET,
  });
