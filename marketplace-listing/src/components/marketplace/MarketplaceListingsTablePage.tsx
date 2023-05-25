import { Box, Spinner, Tr, Td, Center } from "@chakra-ui/react"

import { Subset } from "../../lib/types"
import { MarketplaceListingsTableRow } from "./MarketplaceListingsTableRow"
import {
  MarketplaceListingsQueryVariables,
  MarketplaceListing,
  useMarketplaceListingsQuery,
} from "@niftory/sdk"

interface CollectionProps {
  variables: MarketplaceListingsQueryVariables
  activeListing: Subset<MarketplaceListing>
  setActiveListing: (id: Subset<MarketplaceListing>) => void
  fetchMore: (cursor: string) => void
  isLast: boolean
}

export const MarketplaceListingsTablePage = ({
  variables,
  activeListing,
  setActiveListing,
  fetchMore,
  isLast,
}: CollectionProps) => {
  const [marketplaceListingsResponse] = useMarketplaceListingsQuery({
    variables,
    pause: !variables?.filter?.nftModelIds,
    requestPolicy: "cache-and-network",
  })

  const marketplaceListings = marketplaceListingsResponse?.data?.marketplaceListings

  if (marketplaceListingsResponse.fetching) {
    return (
      <Tr>
        <Td colSpan={5}>
          <Center>
            <Spinner />
          </Center>
        </Td>
      </Tr>
    )
  }

  return (
    <>
      {marketplaceListings?.items &&
        marketplaceListings.items?.map((listing) => (
          <MarketplaceListingsTableRow
            key={listing.id}
            listing={listing}
            activeListing={activeListing}
            onClick={setActiveListing}
          />
        ))}
      {marketplaceListings?.cursor && isLast && (
        <Tr>
          <Td
            colSpan={5}
            _hover={{ bg: "gray.800" }}
            onClick={() => fetchMore(marketplaceListings.cursor)}
            cursor="pointer"
            p="0.6rem"
          >
            <Box minW="full" textAlign="center">
              Show More
            </Box>
          </Td>
        </Tr>
      )}
    </>
  )
}
