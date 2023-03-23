import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Spacer,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import * as React from "react"

import { Nft } from "../../../generated/graphql"
import { useMarketplace } from "../../hooks/useMarketplace"
import { Subset } from "../../lib/types"
import { Gallery } from "../../ui/Content/Gallery/Gallery"
import { useWalletContext } from "../../hooks/useWalletContext"
import { OperationContext } from "urql"

import { Field, Form, Formik } from "formik"

interface Props {
  nft: Subset<Nft>
  reExecuteQuery: (opts?: Partial<OperationContext>) => void
}

export const NFTDetail = (props: Props) => {
  const { nft, reExecuteQuery } = props
  const { currentUser } = useWalletContext()
  const { createMarketplaceListing, cancelMarketplaceListing } = useMarketplace()

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

  const activeListing = nft.marketplaceListings.find((item) => item.state === "AVAILABLE")

  const handleCreateListing = async (price: string) => {
    await createMarketplaceListing(nft.id, nft.blockchainId, price)
    reExecuteQuery({ requestPolicy: "network-only" })
  }

  const handleCancelListing = async () => {
    await cancelMarketplaceListing(activeListing.id, activeListing.blockchainId)
    reExecuteQuery({ requestPolicy: "network-only" })
  }

  const canCancel = activeListing && nft.wallet.address === currentUser.addr
  const canList = !activeListing && nft.wallet.address === currentUser.addr && nft?.blockchainId

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

            {canList && (
              <Stack>
                <Formik
                  initialValues={{ price: "" }}
                  onSubmit={async (values, actions) => {
                    await handleCreateListing(values.price)
                    actions.setSubmitting(false)
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="price">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                            isRequired
                          >
                            <NumberInput
                              onChange={(val) => form.setFieldValue(field.name, val)}
                              max={100}
                              color="white"
                            >
                              <NumberInputField placeholder="Enter price (in Flow)" />
                            </NumberInput>
                          </FormControl>
                        )}
                      </Field>

                      <Button
                        p="1rem 2rem"
                        size="md"
                        mt="0.4rem"
                        w="full"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        <Text>List on the marketplace</Text>
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Stack>
            )}

            {canCancel && (
              <Button p="6" size="sm" onClick={handleCancelListing}>
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
