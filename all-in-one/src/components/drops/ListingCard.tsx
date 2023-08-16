import { AspectRatio, Box, Center, HStack, Image, Link, Skeleton, Stack, Text } from '@chakra-ui/react';
import router from 'next/router';

import { NftListing } from "@niftory/sdk";
import { PriceTag } from '../../ui/Content/ProductCard/PriceTag';
import { ProductCardStats } from '../../ui/Content/ProductCard/ProductCardStats';

export const ListingCard = (props: { nftListing: NftListing; clickUrl: string }) => {
  const { nftListing, clickUrl } = props

  const nftModel = nftListing?.nftModel

  const imageUrl = nftModel?.content?.poster?.url
  const title = nftListing?.title
  const currency = nftListing?.pricing?.currency
  const price = nftListing?.pricing?.price
  const stats = {
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
        <Center>
          <Text fontWeight="medium" fontSize="sm" color="page.accent">
            {title}
          </Text>
        </Center>
        <Center>
          {price && (
            <PriceTag
              currency={currency || "USD"}
              price={price}
              priceProps={{
                fontWeight: "bold",
                fontSize: "sm",
                color: "page.text",
              }}
            />
          )}
        </Center>

        {stats && <ProductCardStats {...stats} />}
      </Stack>
    </Link>
  )
}
