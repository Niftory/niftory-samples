import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import React from "react"
import { WalletProvider } from "../components/wallet/WalletProvider"
import { ComponentWithWallet } from "../lib/types"

import theme from "../lib/chakra-theme"
import { GraphQLClientProvider } from "../lib/GraphQLClientProvider"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithWallet
}

const App = ({ Component, pageProps: { ...pageProps } }: AppProps): JSX.Element => (
  <WalletProvider requireWallet={Component.requireWallet}>
    <GraphQLClientProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </GraphQLClientProvider>
  </WalletProvider>
)

export default App
