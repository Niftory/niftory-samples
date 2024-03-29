import { Radio, Td, Tr } from "@chakra-ui/react"
import * as React from "react"

import { useWalletContext } from "../../hooks/useWalletContext"
import { Subset } from "../../lib/types"
import { MarketplaceListing } from "@niftory/sdk/react"

interface Props {
  listing: Subset<MarketplaceListing>
  activeListing?: Subset<MarketplaceListing>
  onClick: (id: Subset<MarketplaceListing>) => void
}

const dapperCurrencyMap = {
  FUT: "Flow",
  DUC: "USD",
  FLOW: "Flow",
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
        {listing.pricing.price} {dapperCurrencyMap[listing.pricing.currency]}
      </Td>
      <Td>{listing.nft.serialNumber}</Td>
      <Td>{listing.nft.blockchainId}</Td>
      <Td>
        {listing.wallet.address} {currentUser.addr === listing.wallet.address ? "(You)" : ""}
      </Td>
    </Tr>
  )
}
