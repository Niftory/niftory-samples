import { gql, useQuery } from "urql";
import { GetAppUserDocument } from "../generated/graphql";

gql`
  query getAppUser {
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
    query: GetAppUserDocument,
  });
