import AppLayout from "../components/AppLayout"
import { Center, Box, VStack, Text, Button } from "@chakra-ui/react"
import { WalletDetails } from "ui/Wallet/WalletDetails"
import { Logout } from "@components/Logout"

import { useAuthContext } from "hooks/useAuthContext"

import { FaGoogle } from "react-icons/fa"
import { useWalletQuery } from "@niftory/sdk"

const HomePage = () => {
  const { session, signIn, isLoading } = useAuthContext()

  const [{ data, fetching: walletFetching }] = useWalletQuery()

  const wallet = data?.wallet
  const fetching = walletFetching || isLoading
  return (
    <AppLayout>
      <Center py={{ base: "1rem" }} flexDir="column" position="relative">
        <Box px="1rem">
          <VStack>
            {!session && (
              <Box pt="200">
                <Text p="5" textAlign="center" fontWeight="semibold" fontSize="xl">
                  Login to get started!
                </Text>
                <Button
                  p="8"
                  isLoading={isLoading}
                  onClick={() => signIn()}
                  colorScheme="red"
                  leftIcon={<FaGoogle />}
                >
                  Sign in with Google
                </Button>
              </Box>
            )}
            {session && (
              <VStack>
                <WalletDetails
                  isLoading={fetching}
                  walletAddress={wallet?.address}
                  walletItems={wallet?.nfts?.length}
                  walletStatus={wallet?.state?.toString()}
                  walletOwnerEmail={wallet?.appUser?.email}
                />
                <Logout />
              </VStack>
            )}
          </VStack>
        </Box>
      </Center>
    </AppLayout>
  )
}

export default HomePage
