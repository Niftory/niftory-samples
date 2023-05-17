import React from "react"
import { Flex } from "@chakra-ui/react"

import { Logout } from "../../components/Logout"
import AppLayout from "../../components/AppLayout"
import { useAuthContext } from "../../hooks/useAuthContext"
import { WalletDetails } from "../../ui/Wallet/WalletDetails"

import { useWalletQuery } from "@niftory/sdk"
const AccountPage = () => {
  const { session, isLoading } = useAuthContext()

  const [response] = useWalletQuery()

  const fetching = response.fetching || isLoading

  const wallet = response?.data?.wallet
  return (
    <AppLayout title="Account | MintMe ">
      <Flex
        gap="10"
        textAlign="center"
        maxW={"1050px"}
        margin={{ base: "1rem", md: "40px auto" }}
        direction="column"
      >
        <WalletDetails
          isLoading={fetching}
          walletAddress={wallet?.address}
          walletItems={wallet?.nfts?.length}
          walletStatus={wallet?.state?.toString()}
          walletOwnerEmail={wallet?.appUser?.email}
        />
        <Flex justifyContent="center">
          <Logout />
        </Flex>
      </Flex>
    </AppLayout>
  )
}

AccountPage.requireAuth = true
export default AccountPage
