import React from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps as NextAppProps } from "next/app";
import { AuthProvider } from "components/AuthProvider";
import { ComponentWithAuth } from "components/ComponentWithAuth";
import { GraphQLClientProvider } from "components/GraphQLClientProvider";

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth;
};

const App = ({
  Component,
  pageProps: { session, auth, ...pageProps },
}: AppProps): JSX.Element => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <GraphQLClientProvider>
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
