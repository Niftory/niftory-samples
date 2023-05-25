import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { useQuery } from "urql"

import AppLayout from "../../../components/AppLayout"
import { MarketplaceListingsTable } from "../../../components/marketplace/MarketplaceListingsTable"

export const NFTDetailPage = () => {
  const router = useRouter()

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto" mt="12">
        <MarketplaceListingsTable />
      </Box>
    </AppLayout>
  )
}

export default NFTDetailPage
