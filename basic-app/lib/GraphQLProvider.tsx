import React, { ReactNode } from "react";
import { Provider as UrqlProvider } from "urql";

import { useGraphQLClient } from "./useGraphQLClient";

interface GraphQLProviderProps {
  children: ReactNode;
}

export const GraphQLProvider: React.FC<GraphQLProviderProps> = ({
  children,
}) => {
  const client = useGraphQLClient();

  return <UrqlProvider value={client}>{children}</UrqlProvider>;
};
