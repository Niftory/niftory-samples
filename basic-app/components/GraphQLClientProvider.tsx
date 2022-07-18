import { useSession } from "next-auth/react";
import { createClient } from "@urql/core";
import type { Session } from "next-auth";
import { Provider } from "urql";
import React from "react";

export function getGraphQLClient(
  url: string,
  apiKey: string,
  session: Session | null
) {
  return createClient({
    url: url,
    fetchOptions: {
      headers: {
        "X-Niftory-API-Key": apiKey,
        Authorization: session?.authToken ? `Bearer ${session.authToken}` : "",
      },
    },
  });
}

export const GraphQLClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();

  const graphqlClient = getGraphQLClient(
    process.env.NEXT_PUBLIC_API_PATH as string,
    process.env.NEXT_PUBLIC_API_KEY as string,
    session
  );

  return <Provider value={graphqlClient}>{children}</Provider>;
};
