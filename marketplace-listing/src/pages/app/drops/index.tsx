import { Box } from "@chakra-ui/react"
import React from "react"
import { useQuery } from "urql"

import { NftModelsDocument, NftModelsQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { DropsGrid } from "../../../components/drops/DropsGrid"
import { NFTModelsGrid } from "../../../components/drops/NFTModelsGrid"
import { SectionHeader } from "../../../ui/SectionHeader"

export const NFTModelsPage = () => {
  const [result] = useQuery<NftModelsQuery>({
    query: NftModelsDocument,
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
