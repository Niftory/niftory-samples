import React from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as GraphQLClientProvider } from "urql";
import { getGraphQLClient } from "../lib/apiClient";
import { AppProps as NextAppProps } from "next/app";
import { AuthProvider } from "../components/AuthProvider";
import { ComponentWithAuth } from "../components/ComponentWithAuth";

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth;
};

const App = ({
  Component,
  pageProps: { session, auth, ...pageProps },
}: AppProps): JSX.Element => {
  const graphqlClient = getGraphQLClient(
    process.env.NEXT_PUBLIC_API_PATH as string,
    process.env.NEXT_PUBLIC_API_KEY as string,
    session
  );

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <GraphQLClientProvider value={graphqlClient}>
        <ChakraProvider>
          <AuthProvider requireAuth={Component.requireAuth}>
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
      </GraphQLClientProvider>
    </SessionProvider>
  );
};

export default App;
