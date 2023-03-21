import { Box, SimpleGrid, Spinner } from "@chakra-ui/react"
import * as React from "react"

import { MarketplaceListing, Nft, NftBlockchainState } from "../../../generated/graphql"
import { Subset } from "../../lib/types"
import { NFTCard } from "../collection/NFTCard"

interface CollectionProps {
  isLoading: boolean
  listings: Subset<MarketplaceListing>[]
}

export const MarketplaceListingsGrid = ({ isLoading, listings }: CollectionProps) => {
  if (isLoading) {
    return <Spinner />
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
        {listings &&
          listings.map((listing) => (
            <NFTCard
              key={listing.id}
              nft={listing.nft}
              clickUrl={`/app/marketplace/${listing.id}`}
              price={`${listing.pricing.price} ${listing.pricing.currency}`}
            />
          ))}
      </SimpleGrid>
    </Box>
  )
}
