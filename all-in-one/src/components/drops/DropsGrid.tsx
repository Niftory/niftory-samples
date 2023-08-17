import { Box, SimpleGrid } from "@chakra-ui/react"

import { ListingCard } from "./ListingCard"

export const DropsGrid = (nftModelIds) => (


  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: "4", md: "8", lg: "12" }}
    py={{ base: "6", md: "8", lg: "12" }}
  >
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: "8", lg: "10" }}>
      {nftModelIds &&
        nftModelIds.map((nftModelId) => {
          <ListingCard
            key={nftModelId}
            nftModelid={nftModelId}
            clickUrl={`drops/${nftModelId}`}
          />
        })
      }
    </SimpleGrid>
  </Box>
)
