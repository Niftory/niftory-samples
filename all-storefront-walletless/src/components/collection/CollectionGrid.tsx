import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';

import { Nft } from "@niftory/sdk";
import { Subset } from '../../lib/types';
import { NftCard } from './NftCard';
import { Hero } from 'ui/Hero';

interface CollectionProps {
  isLoading: boolean
  nfts: Subset<Nft>[]
}

export const CollectionGrid = ({ isLoading, nfts }: CollectionProps) => {
  if (isLoading) {
    return <Spinner />
  }
  const emptyNfts = !nfts?.length

  const emptyCollection = emptyNfts ? true : false

  return (
    <Box maxW="7xl" mx="auto" p="8">
      {emptyCollection && (
        <Hero
          heading={`Your collection is empty. Start Collecting!`}
          button={`Go to Drops`}
        />
      )}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
        {nfts &&
          nfts.map((nft) => (
            <NftCard key={nft.id} nft={nft} clickUrl={`/app/collection/${nft.id}`} />
          ))}
      </SimpleGrid>
    </Box>
  )
}
