import { Box, Button, Heading, Spinner, Stack, Text } from "@chakra-ui/react"
import { NftListing } from "@niftory/sdk"
import { Subset } from "../../lib/types"
import { Gallery } from "../../ui/Content/Gallery/Gallery"
import { PriceTag } from "../../ui/Content/ProductCard/PriceTag"

interface Props {
  nftListing?: Subset<NftListing>
  onStripeClick: () => void
  isLoading?: boolean
  isSignedIn?: boolean
}

export const DropDetail = (props: Props) => {
  const { nftListing, onStripeClick, isLoading, isSignedIn } = props

  const nftModel = nftListing?.nftModel

  const product = {
    title: nftListing?.title,
    price: nftListing?.pricing?.price,
    description: nftModel?.description || nftListing?.description,
    amount: nftModel?.quantity,
    currency: "USD",
    content: [
      {
        contentType: nftModel?.content?.files[0]?.contentType,
        contentUrl: nftModel?.content?.files[0]?.url,
        thumbnailUrl: nftModel?.content?.poster?.url,
        alt: nftModel?.title,
      },
    ],
  }

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack
        direction={{ base: "column-reverse", lg: "row" }}
        spacing={{ base: "6", lg: "12", xl: "16" }}
      >
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
              <Heading size="lg" fontWeight="medium" color="page.accent">
                {product.title}
              </Heading>
            </Stack>
            (product.price && <PriceTag
              price={product.price}
              currency={product.currency}
              rootProps={{ fontSize: "xl" }}
            />)
            <Text color="page.text">{product.description}</Text>
            <Text color="page.text">{product.amount} Total For Sale </Text>
          </Stack>
          <Button disabled={isLoading} size="lg" onClick={() => onStripeClick()}>
            {isLoading && <Spinner color="page.accent"></Spinner>}
            {!isLoading && !isSignedIn && <Text>Sign in and Claim</Text>}
            {!isLoading && isSignedIn && <Text>Claim your Drop!</Text>}
          </Button>
        </Stack>
        <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={product.content} />
      </Stack>
    </Box>
  )
}
