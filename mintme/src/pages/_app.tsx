import React, { useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { AuthProvider } from "../components/AuthProvider"
import { ComponentWithAuth } from "../components/ComponentWithAuth"
import { GraphQLClientProvider } from "../components/GraphQLClientProvider"
import theme from "../lib/chakra-theme"
import "../styles/globals.css"
import "intro.js/introjs.css"
import { Toaster } from "react-hot-toast"
import Head from "next/head"
import { DEFAULT_TITLE } from "../constants/title"
import posthog from "posthog-js"
import { useRouter } from "next/router"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth
}

const App = ({ Component, pageProps: { session, auth, ...pageProps } }: AppProps): JSX.Element => {
  const router = useRouter()
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: false,
      loaded: (posthog) => {
        // Ignore in development
        if (process.env.NODE_ENV === "development") posthog.opt_out_capturing()
      },
    })
    const handleRouteChange = () => {
      if (typeof window !== "undefined") {
        posthog.capture("$pageview")
      }
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session} refetchInterval={60 * 60}>
        <AuthProvider requireAuth={Component.requireAuth}>
          <Toaster />
          <GraphQLClientProvider>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </GraphQLClientProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  )
}

export default App
