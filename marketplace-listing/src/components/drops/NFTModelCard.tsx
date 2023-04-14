import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react"
import router from "next/router"
import * as React from "react"

import { NftModel } from "../../../generated/graphql"
import { ProductCardStats } from "../../ui/Content/ProductCard/ProductCardStats"

export const NFTModelCard = (props: { nftModel: NftModel; clickUrl: string }) => {
  const { nftModel, clickUrl } = props

  const imageUrl = nftModel?.content?.poster?.url
  const title = nftModel?.title
  const quantity = nftModel?.quantity
  const stats = {
    quantity: nftModel?.quantity,
    rarity: nftModel?.rarity,
  }

  return (
    <Link onClick={() => router.push(clickUrl)}>
      <Stack
        spacing="3"
        padding="4"
        bg="gray.900"
        borderRadius="8px"
        _hover={{ bg: "#202020", borderColor: "gray.600" }}
      >
        <Box position="relative" className="group">
          <AspectRatio ratio={3 / 4}>
            <Image src={imageUrl} alt={title} draggable="false" fallback={<Skeleton />} />
          </AspectRatio>
          <HStack spacing="3" position="absolute" top="4" left="4"></HStack>
        </Box>
        <Center fontWeight="medium" fontSize="sm" color="page.accent">
          {title}
        </Center>

        {stats && <ProductCardStats {...stats} />}
      </Stack>
    </Link>
  )
}
