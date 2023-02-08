import { Box } from "@chakra-ui/react"
import Head from "next/head"
import React from "react"
import AppLayout from "../../../../components/AppLayout"
import { CreatedNFTCollection } from "../../../../components/collection/CreatedNFTCollection"

const CreatedCollectionPage = () => {
  return (
    <AppLayout showSidebar={true} title="NFT Templates | MintMe">
      <CreatedNFTCollection />
    </AppLayout>
  )
}

CreatedCollectionPage.requireAuth = true
export default CreatedCollectionPage
