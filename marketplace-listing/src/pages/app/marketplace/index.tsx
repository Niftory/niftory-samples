import { Box, Center, Spinner } from "@chakra-ui/react"
import { useQuery } from "urql"

import AppLayout from "../../../components/AppLayout"

import { SectionHeader } from "../../../ui/SectionHeader"
import { useWalletContext } from "../../../hooks/useWalletContext"
import { NFTModelsGrid } from "../../../components/drops/NFTModelsGrid"
import { useNftModelsQuery } from "@niftory/sdk/react"

const MarketplacePage = () => {
  const { currentUser } = useWalletContext()

  const [result] = useNftModelsQuery({
    variables: {
      appId: process.env.NEXT_PUBLIC_CLIENT_ID,
      filter: { hasMarketplaceListing: true },
    },

    pause: !currentUser?.addr,
    requestPolicy: "cache-and-network",
  })

  const nftModels = result?.data?.nftModels?.items

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto">
        <SectionHeader text="Marketplace" />
        {nftModels && <NFTModelsGrid nftModels={nftModels} isLoading={result.fetching} />}
      </Box>
    </AppLayout>
  )
}

export default MarketplacePage
