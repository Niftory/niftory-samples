import React, { Component as ReactComponent } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}): JSX.Element => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default App;
