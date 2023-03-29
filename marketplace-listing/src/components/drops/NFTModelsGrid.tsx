import { Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import * as React from "react"

import { NFTModelCard } from "./NFTModelCard"

export const NFTModelsGrid = ({ nftModels, isLoading }) => {
  if (isLoading) {
    return (
      <Center minH="10rem">
        <Spinner color="white" size="xl" />
      </Center>
    )
  }
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="8">
      {nftModels?.map((nftModel) => {
        return (
          <NFTModelCard
            key={nftModel?.id}
            nftModel={nftModel}
            clickUrl={`marketplace/${nftModel?.id}`}
          />
        )
      })}
    </SimpleGrid>
  )
}
