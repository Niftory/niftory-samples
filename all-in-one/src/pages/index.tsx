import AppLayout from "../components/AppLayout"
import { Center, Box, VStack, Button, } from "@chakra-ui/react"
import router from "next/router"

import { useAuthContext } from "hooks/useAuthContext"

import { FaGoogle } from "react-icons/fa"
import { useWalletQuery } from "@niftory/sdk/react"
import { Hero } from "ui/Hero"
import React from "react"

const HomePage = () => {
  const { session, signIn, isLoading } = useAuthContext()
  
  const [{ data, fetching: walletFetching }] = useWalletQuery()
  
  const wallet = data?.wallet
  const fetching = walletFetching || isLoading

  return (
    <AppLayout>
      <Center flexDir="column" position="relative">
        <Box px="1rem">
          <VStack>
            {!session && (
              <Hero
                heading="Login to get started and check out available Drops"
                bg="page.gradient"
                button={<Button
                    p="8"
                    isLoading={isLoading}
                    onClick={() => signIn()}
                    colorScheme="red"
                    leftIcon={<FaGoogle />}
                  >
                Sign in with Google
                </Button>}
              />
            )}
            {session && (
              <Hero
              heading="You're logged in! Check out available Drops"
              bg="page.gradient"
              button={<Button
                  p="8"
                  isLoading={isLoading}
                  onClick={() => router.push("/drops")}
                  colorScheme="yellow"
                >
                Drops gallery
              </Button>}
            />
            )}
          </VStack>
        </Box>
      </Center>
    </AppLayout>
  )
}

export default HomePage
