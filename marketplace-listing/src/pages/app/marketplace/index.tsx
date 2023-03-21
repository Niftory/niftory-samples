import { Box } from "@chakra-ui/react"
import { useQuery } from "urql"

import AppLayout from "../../../components/AppLayout"
import {
  MarketplaceListing,
  MarketplaceListingsDocument,
  MarketplaceListingsQuery,
  Nft,
  NftsByWalletDocument,
  NftsByWalletQuery,
} from "../../../../generated/graphql"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { Subset } from "../../../lib/types"
import { SectionHeader } from "../../../ui/SectionHeader"
import { useWalletContext } from "../../../hooks/useWalletContext"
import { MarketplaceListingsGrid } from "../../../components/marketplace/MarketplaceListingsGrid"

const MarketplacePage = () => {
  const { currentUser } = useWalletContext()

  const [marketplaceListingsResponse] = useQuery<MarketplaceListingsQuery>({
    query: MarketplaceListingsDocument,
    variables: {},
    pause: !currentUser?.addr,

    // refetch in the background in case the user has purchased something
    requestPolicy: "cache-and-network",
  })

  const { data: listingsData, fetching } = marketplaceListingsResponse

  const listings: Subset<MarketplaceListing>[] = listingsData?.marketplaceListings?.items

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto">
        <SectionHeader text="Marketplace" />
        {listings && <MarketplaceListingsGrid listings={listings} isLoading={fetching} />}
      </Box>
    </AppLayout>
  )
}

export default MarketplacePage
