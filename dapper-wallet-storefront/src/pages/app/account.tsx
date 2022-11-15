import { Divider, VStack } from "@chakra-ui/react"
import React from "react"

import AppLayout from "../../components/AppLayout"
import { WalletSetup } from "../../components/wallet/WalletSetup"
import { SectionHeader } from "../../ui/SectionHeader"
import { LogOut } from "../../components/LogOut"

const AccountPage = () => {
  return (
    <AppLayout>
      <VStack>
        <SectionHeader text="My Account" />
        <WalletSetup />
        <Divider w="80%" maxW="xl" py="8" />
        <LogOut />
      </VStack>
    </AppLayout>
  )
}
AccountPage.requireWallet = true

export default AccountPage
