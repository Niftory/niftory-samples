import React from "react"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { AuthProvider } from "../components/AuthProvider"
import { ComponentWithAuth } from "../components/ComponentWithAuth"
import { GraphQLClientProvider } from "../components/GraphQLClientProvider"
import { ReactQueryClientProvider } from "../components/ReactQueryClientProvider"
import { SESSION_REFRESH_INTERVAL_MINUTES } from "../lib/constants"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth
}

const App = ({ Component, pageProps: { session, auth, ...pageProps } }: AppProps): JSX.Element => (
  <SessionProvider session={session} refetchInterval={60 * SESSION_REFRESH_INTERVAL_MINUTES}>
    <AuthProvider requireAuth={Component.requireAuth}>
      <ReactQueryClientProvider>
        <GraphQLClientProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </GraphQLClientProvider>
      </ReactQueryClientProvider>
    </AuthProvider>
  </SessionProvider>
)

export default App
