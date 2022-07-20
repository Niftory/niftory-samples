import { GraphQLClient } from "graphql-request";
import { useSession } from "next-auth/react";
import { createContext } from "react";
import { getGraphQLClient } from "../lib/graphql/frontendClient";

export const GraphQLClientContext = createContext<GraphQLClient>(null);

export const GraphQLClientProvider = ({ children }) => {
  const { data: session } = useSession();

  const graphqlClient = getGraphQLClient(
    process.env.NEXT_PUBLIC_API_PATH as string,
    process.env.NEXT_PUBLIC_API_KEY as string,
    session
  );

  return (
    <GraphQLClientContext.Provider value={graphqlClient}>
      {children}
    </GraphQLClientContext.Provider>
  );
};
