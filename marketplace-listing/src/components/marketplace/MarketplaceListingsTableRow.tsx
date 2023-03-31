import { Radio, Td, Tr } from "@chakra-ui/react"
import * as React from "react"

import { MarketplaceListing } from "../../../generated/graphql"
import { useWalletContext } from "../../hooks/useWalletContext"
import { Subset } from "../../lib/types"

interface Props {
  listing: Subset<MarketplaceListing>
  activeListing?: Subset<MarketplaceListing>
  onClick: (id: Subset<MarketplaceListing>) => void
}

export const MarketplaceListingsTableRow = ({ listing, activeListing, onClick }: Props) => {
  const { currentUser } = useWalletContext()
  return (
    <Tr
      key={listing.id}
      p="1rem"
      bg="black"
      border="4px"
      borderColor="gray.900"
      onClick={() => onClick(listing)}
      cursor="pointer"
      _hover={{ bg: "gray.800" }}
    >
      <Td>
        <Radio isChecked={activeListing?.id === listing.id} size="lg"></Radio>
      </Td>
      <Td>
        {listing.pricing.price} {listing.pricing.currency}
      </Td>
      <Td>{listing.nft.serialNumber}</Td>
      <Td>{listing.nft.blockchainId}</Td>
      <Td>
        {listing.wallet.address} {currentUser.addr === listing.wallet.address ? "(You)" : ""}
      </Td>
    </Tr>
  )
}
