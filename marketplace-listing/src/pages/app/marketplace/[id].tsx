import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { useQuery } from "urql"

import {
  MarketplaceListing,
  MarketplaceListingDocument,
  MarketplaceListingQuery,
  Nft,
  NftDocument,
  NftQuery,
} from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { NFTDetail } from "../../../components/collection/NFTDetail"
import { MarketplaceListingDetail } from "../../../components/marketplace/MarketplaceListingDetail"
import { Subset } from "../../../lib/types"
import { LoginSkeleton } from "../../../ui/Skeleton"

export const NFTDetailPage = () => {
  const router = useRouter()
  const id: string = router.query["id"]?.toString()

  const [marketplaceListingsResponse, reExecuteQuery] = useQuery<MarketplaceListingQuery>({
    query: MarketplaceListingDocument,
    variables: { id },
  })
  const marketplaceListing: Subset<MarketplaceListing> =
    marketplaceListingsResponse.data?.marketplaceListing

  if (!id || marketplaceListingsResponse.fetching) {
    return <LoginSkeleton />
  }

  return (
    <AppLayout>
      <Box maxW="7xl" mx="auto" mt="12">
        {marketplaceListing && (
          <MarketplaceListingDetail listing={marketplaceListing} reExecuteQuery={reExecuteQuery} />
        )}
      </Box>
    </AppLayout>
  )
}

export default NFTDetailPage
