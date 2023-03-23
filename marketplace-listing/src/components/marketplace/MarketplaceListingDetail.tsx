import { Box, Button, Heading, HStack, Spacer, Stack, Tag, Text } from "@chakra-ui/react"
import * as React from "react"

import { MarketplaceListing } from "../../../generated/graphql"
import { useMarketplace } from "../../hooks/useMarketplace"
import { Subset } from "../../lib/types"
import { Gallery } from "../../ui/Content/Gallery/Gallery"
import { useWalletContext } from "../../hooks/useWalletContext"
import { OperationContext } from "urql"
import { useRouter } from "next/router"

interface Props {
  listing: Subset<MarketplaceListing>
  reExecuteQuery: (opts?: Partial<OperationContext>) => void
}

export const MarketplaceListingDetail = (props: Props) => {
  const { listing, reExecuteQuery } = props
  const { currentUser } = useWalletContext()
  const { purchaseMarketplaceListing, cancelMarketplaceListing } = useMarketplace()

  const nft = listing?.nft
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

  const router = useRouter()

  const handlePurchaseListing = async () => {
    await purchaseMarketplaceListing(listing.id, listing.blockchainId, listing.wallet.address)
    reExecuteQuery({ requestPolicy: "network-only" })
    router.push(`/app/collection`)
  }
  const handleCancelListing = async () => {
    const responseListing = await cancelMarketplaceListing(listing.id, listing.blockchainId)
    reExecuteQuery({ requestPolicy: "network-only" })
    router.push(`/app/collection/${responseListing?.nft.id}`)
  }

  const canPurchase = listing.state === "AVAILABLE" && listing.wallet.address != currentUser.addr
  const canCancel = listing.state === "AVAILABLE" && listing.wallet.address === currentUser.addr

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
            <Heading size="md" color="white">
              Price: {listing?.pricing?.price} FLOW
            </Heading>

            {canPurchase && (
              <Button p="6" size="md" onClick={handlePurchaseListing}>
                <Text>Purchase marketplace item</Text>
              </Button>
            )}

            {canCancel && (
              <Button p="6" size="md" onClick={handleCancelListing}>
                <Text>Cancel marketplace listing</Text>
              </Button>
            )}
          </Stack>
        </Stack>
        {product.content?.length > 0 && (
          <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={product.content} />
        )}
      </Stack>
    </Box>
  )
}
