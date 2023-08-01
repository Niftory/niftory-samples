import React from "react"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { AuthProvider } from "../components/AuthProvider"
import { ComponentWithAuth } from "../components/ComponentWithAuth"
import theme from "../lib/chakra-theme"
import Head from "next/head"
import { NiftoryClientProvider } from "graphql/niftoryClientProvider"
import { NiftoryWalletInitializer } from "@components/NiftoryWalletInitializer"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth
}

const App = ({ Component, pageProps: { session, auth, ...pageProps } }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Walletless Onboarding by Niftory</title>
      </Head>
      <SessionProvider session={session} refetchInterval={60 * 60}>
        <AuthProvider requireAuth={Component.requireAuth}>
          <NiftoryClientProvider>
            <ChakraProvider theme={theme}>
              <NiftoryWalletInitializer />
              <Component {...pageProps} />
            </ChakraProvider>
          </NiftoryClientProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  )
}

export default App
