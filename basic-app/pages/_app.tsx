import React from "react"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { AuthProvider } from "../components/AuthProvider"
import { ComponentWithAuth } from "../components/ComponentWithAuth"
import { GraphQLClientProvider } from "../components/GraphQLClientProvider"
import { ReactQueryClientProvider } from "../components/ReactQueryClientProvider"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth
}

const App = ({ Component, pageProps: { session, auth, ...pageProps } }: AppProps): JSX.Element => (
  // Refetch session every hour since niftory tokens expire after 1 hour
  <SessionProvider session={session} refetchInterval={60 * 60}>
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
