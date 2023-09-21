import { Box, Button, Center, SimpleGrid, Spinner } from '@chakra-ui/react';

import { Nft } from "@niftory/sdk";
import { Subset } from 'lib/types';
import { NftCard } from './NftCard';
import { Hero } from 'ui/Hero';
import router from 'next/router';

interface CollectionProps {
  isLoading: boolean
  nfts: Subset<Nft>[]
}

export const CollectionGrid = ({ isLoading, nfts }: CollectionProps) => {
  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>)
  }
  const emptyCollection = !nfts?.length

  return (
    <Box  mx="auto">
      {emptyCollection && (
        <Hero
          heading={`Your collection is empty. Start Collecting!`}
          button={<Button
            p="8"
            onClick={() => router.push("/app/drops")}
            colorScheme="yellow"
          >
          Drops gallery
        </Button>}
        />
      )}
      <SimpleGrid pb={24} mx={12} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
        {nfts &&
          nfts.map((nft) => (
            <NftCard key={nft.id} nft={nft} clickUrl={`/app/collection/${nft.id}`} />
          ))}
      </SimpleGrid>
    </Box>
  )
}
