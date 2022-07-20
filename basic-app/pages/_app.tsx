import React from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps as NextAppProps } from "next/app";
import { AuthProvider } from "../components/AuthProvider";
import { ComponentWithAuth } from "../components/ComponentWithAuth";
import { GraphQLClientProvider } from "../components/GraphQLClientProvider";
import { ReactQueryClientProvider } from "../components/ReactQueryClientProvider";

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth;
};

const App = ({
  Component,
  pageProps: { session, auth, ...pageProps },
}: AppProps): JSX.Element => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ReactQueryClientProvider>
        <GraphQLClientProvider>
          <ChakraProvider>
            <AuthProvider requireAuth={Component.requireAuth}>
              <Component {...pageProps} />
            </AuthProvider>
          </ChakraProvider>
        </GraphQLClientProvider>
      </ReactQueryClientProvider>
    </SessionProvider>
  );
};

export default App;
