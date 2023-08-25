import AppLayout from "../components/AppLayout"
import { Center, Box, VStack, Button, } from "@chakra-ui/react"
import router from "next/router"

import { useAuthContext } from "hooks/useAuthContext"

import { FaGoogle } from "react-icons/fa"
import { Hero } from "ui/Hero"

const HomePage = () => {
  const { session, signIn, isLoading } = useAuthContext()

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
                  onClick={() => router.push("/app/drops")}
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
