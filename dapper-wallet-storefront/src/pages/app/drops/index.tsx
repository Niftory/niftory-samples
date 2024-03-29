import { Box } from "@chakra-ui/react"
import React from "react"

import { useNftModelsQuery } from "@niftory/sdk/react"
import AppLayout from "../../../components/AppLayout"
import { NFTModelsGrid } from "../../../components/drops/NFTModelsGrid"
import { SectionHeader } from "../../../ui/SectionHeader"

export const NFTModelsPage = () => {
  const [result] = useNftModelsQuery()

  const nftModels = result?.data?.nftModels?.items

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto">
        <SectionHeader text="Get A Drop" />
        {nftModels && <NFTModelsGrid nftModels={nftModels} />}
      </Box>
    </AppLayout>
  )
}

export default NFTModelsPage
