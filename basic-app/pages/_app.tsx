import React from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "../components/Auth";
import { Provider as GraphQLClientProvider } from "urql";
import { getGraphQLClient } from "../lib/apiClient";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}): JSX.Element => {
  const graphqlClient = getGraphQLClient(
    process.env.NEXT_PUBLIC_API_PATH as string,
    process.env.NEXT_PUBLIC_API_KEY as string,
    session
  );

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <GraphQLClientProvider value={graphqlClient}>
        <ChakraProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}{" "}
        </ChakraProvider>
      </GraphQLClientProvider>
    </SessionProvider>
  );
};

export default App;
