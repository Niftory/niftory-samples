import { Box } from "@chakra-ui/react"
import React from "react"

import AppLayout from "../../../components/AppLayout"
import { DropsGrid } from "../../../components/drops/DropsGrid"
import { SectionHeader } from "../../../ui/SectionHeader"
import { useNftModelsQuery } from "@niftory/sdk/react"

export const NFTModelsPage = () => {
  const [result] = useNftModelsQuery({
    variables: { appId: process.env.NEXT_PUBLIC_CLIENT_ID },
  })

  const nftModels = result?.data?.nftModels?.items

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto">
        <SectionHeader text="Get A Drop" />
        {nftModels && <DropsGrid nftModels={nftModels} />}
      </Box>
    </AppLayout>
  )
}

export default NFTModelsPage
