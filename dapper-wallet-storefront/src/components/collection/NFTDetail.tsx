import { Box, Heading, HStack, Spacer, Stack, Tag, Text } from '@chakra-ui/react';
import * as React from 'react';

import { Nft } from '../../../generated/graphql';
import { Subset } from '../../lib/types';
import { Gallery } from '../../ui/Content/Gallery/Gallery';

interface Props {
  nft: Subset<Nft>
}

export const NFTDetail = (props: Props) => {
  const { nft } = props

  const nftModel = nft?.model
  const poster = nftModel?.content?.poster?.url

  const product = {
    title: nftModel?.title,
    description: nftModel?.description || "",
    content: nftModel?.content?.files?.map((file) => ({
      contentType: file.contentType || "image",
      contentUrl: file.url,
      thumbnailUrl: poster,
      alt: nftModel?.title,
    })),
  }

  return (
    <Box p="8">
      <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: "6", lg: "12", xl: "16" }}>
        <Stack
          spacing={{ base: "6", lg: "8" }}
          minW={{ lg: "sm" }}
          maxW={{ lg: "sm" }}
          justify="center"
          p="8"
          borderRadius="4"
          backgroundColor="gray.800"
        >
          <Stack spacing={{ base: "3", md: "4" }}>
            <Stack spacing="3">
              <Heading size="3xl" fontWeight="medium" color="page.accent">
                {product.title}
              </Heading>
            </Stack>

            <Text color="page.text">{product.description}</Text>

            <Text color="page.text">
              Serial: {nft && nft.serialNumber} / {nftModel.quantity}
              <Spacer />
              Blockchain Id: {nft && nft.blockchainId}
            </Text>

            <HStack>
              <Tag size="lg">{nftModel.rarity}</Tag>
            </HStack>
          </Stack>
        </Stack>
        {product.content?.length > 0 && (
          <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={product.content} />
        )}
      </Stack>
    </Box>
  )
}
