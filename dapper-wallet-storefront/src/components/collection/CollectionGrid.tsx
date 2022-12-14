import { Box, SimpleGrid, Spinner } from "@chakra-ui/react"
import * as React from "react"

import { Nft, NftBlockchainState } from "../../../generated/graphql"
import { Subset } from "../../lib/types"
import { CallToAction } from "../../ui/CallToAction"
import { NFTCard } from "./NFTCard"

interface CollectionProps {
  isLoading: boolean
  nfts: Subset<Nft>[]
}

export const CollectionGrid = ({ isLoading, nfts }: CollectionProps) => {
  if (isLoading) {
    return <Spinner />
  }

  const noNfts = !nfts?.length

  return (
    <Box>
      {noNfts && (
        <CallToAction
          contentBefore={`Your collection is empty. Start Collecting!`}
          buttonContent={`Go to Drops`}
          buttonPath={"/app/drops"}
        />
      )}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
        {nfts &&
          nfts
            .filter((nft) =>
              [NftBlockchainState.Transferred, NftBlockchainState.Transferring].includes(
                nft.blockchainState
              )
            )
            .map((nft) => (
              <NFTCard key={nft.id} nft={nft} clickUrl={`/app/collection/${nft.id}`} />
            ))}
      </SimpleGrid>
    </Box>
  )
}
