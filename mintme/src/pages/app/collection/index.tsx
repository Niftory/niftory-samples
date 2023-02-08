import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import { UserNFTCollection } from "../../../components/collection/UserNFTCollection"

const CollectionPage = () => {
  return (
    <AppLayout showSidebar={true} title="NFT Collection | MintMe">
      <UserNFTCollection />
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
