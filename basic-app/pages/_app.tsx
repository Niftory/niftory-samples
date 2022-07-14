import React, { Component as ReactComponent } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth } from "../components/Auth";
import { GraphQLProvider } from "../lib/GraphQLProvider";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}): JSX.Element => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <GraphQLProvider>
        <ChakraProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}{" "}
        </ChakraProvider>
      </GraphQLProvider>
    </SessionProvider>
  );
};

export default App;
