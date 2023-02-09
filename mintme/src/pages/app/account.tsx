import React from "react"
import { Flex } from "@chakra-ui/react"
import { useGraphQLQuery } from "../../graphql/useGraphQLQuery"
import {
  UserNftsDocument,
  UserNftsQuery,
  UserNftsQueryVariables,
  WalletDocument,
  WalletQuery,
} from "../../../generated/graphql"
import { Logout } from "../../components/Logout"
import AppLayout from "../../components/AppLayout"
import { useAuthContext } from "../../hooks/useAuthContext"
import { WalletDetails } from "../../ui/Wallet/WalletDetails"
const AccountPage = () => {
  const { session, isLoading } = useAuthContext()

  const userId = session?.userId
  const { wallet, fetching: walletFetching } = useGraphQLQuery<WalletQuery>({
    query: WalletDocument,
    pause: isLoading,
  })

  const fetching = walletFetching || isLoading
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
