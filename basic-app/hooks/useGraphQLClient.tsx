import { useContext } from "react";
import { GraphQLClientContext } from "../components/GraphQLClientProvider";

export function useGraphQLClient() {
  return useContext(GraphQLClientContext);
}
