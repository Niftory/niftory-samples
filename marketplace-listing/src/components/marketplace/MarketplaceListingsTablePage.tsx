import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Image,
  Tr,
  Text,
  Button,
  Td,
} from "@chakra-ui/react"
import { id } from "date-fns/locale"
import { useRouter } from "next/router"
import { useState } from "react"
import { useQuery } from "urql"

import {
  MarketplaceListing,
  MarketplaceListingList,
  MarketplaceListingsDocument,
  MarketplaceListingsQuery,
  MarketplaceListingsQueryVariables,
} from "../../../generated/graphql"
import { useMarketplace } from "../../hooks/useMarketplace"
import { useWalletContext } from "../../hooks/useWalletContext"
import { Subset } from "../../lib/types"
import { MarketplaceListingsTableRow } from "./MarketplaceListingsTableRow"

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
  const [marketplaceListingsResponse] = useQuery<
    MarketplaceListingsQuery,
    MarketplaceListingsQueryVariables
  >({
    query: MarketplaceListingsDocument,
    variables,
    pause: !variables?.filter?.nftModelIds,
    requestPolicy: "cache-and-network",
  })

  const marketplaceListings = marketplaceListingsResponse?.data?.marketplaceListings

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
