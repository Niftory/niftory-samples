import { SimpleGrid } from '@chakra-ui/react';

import { NFTModelCard } from './NFTModelCard';

export const NFTModelsGrid = ({ nftModels }) => (
  <SimpleGrid pb={24} mx={12} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
    {nftModels?.map((nftModel) => {
      return (
        <NFTModelCard key={nftModel?.id} nftModel={nftModel} clickUrl={`drops/${nftModel?.id}`} />
      )
    })}
  </SimpleGrid>
)
