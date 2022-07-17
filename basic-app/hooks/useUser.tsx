import { gql, useQuery } from "urql";

const API_GET_APP_USER = gql`
  query {
    appUser {
      id
      name
      email
      image
      app {
        id
      }
      wallet {
        id
        address
        state
      }
    }
  }
`;

export const useUser = () =>
  useQuery({
    query: API_GET_APP_USER,
  });
