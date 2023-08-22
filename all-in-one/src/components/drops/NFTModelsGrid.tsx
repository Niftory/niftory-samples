import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

import { NFTModelCard } from './NFTModelCard';

export const NFTModelsGrid = ({ nftModels }) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="8">
    {nftModels?.map((nftModel) => {
      return (
        <NFTModelCard key={nftModel?.id} nftModel={nftModel} clickUrl={`drops/${nftModel?.id}`} />
      )
    })}
  </SimpleGrid>
)
