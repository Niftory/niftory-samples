import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Spacer,
  Spinner,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"

import { Currency, Nft } from "../../../generated/graphql"
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
  const { currentUser, isDapper } = useWalletContext()
  const {
    createMarketplaceListing,
    createDapperMarketplaceListing,
    cancelMarketplaceListing,
    loading: isMarketplaceLoading,
  } = useMarketplace()

  const [isLoading, setLoading] = useState(false)

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

  const handleCreateListing = async (price: string, currency: Currency) => {
    try {
      if (isDapper) {
        await createDapperMarketplaceListing(nft.id, nft.blockchainId, price, Currency.Duc)
      } else {
        await createMarketplaceListing(nft.id, nft.blockchainId, price)
      }

      reExecuteQuery({ requestPolicy: "network-only" })
    } catch (e) {
      console.error(e)
      toast({
        title: "Create listing failed.",
        status: "error",
      })
    }
  }

  const toast = useToast()

  const handleCancelListing = async () => {
    try {
      setLoading(true)
      await cancelMarketplaceListing(activeListing.id, activeListing.blockchainId)
      reExecuteQuery({ requestPolicy: "network-only" })
    } catch (e) {
      console.error(e)
      toast({
        title: "Cancel listing failed.",
        status: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const canCancel = activeListing && nft.wallet.address === currentUser.addr
  const canList = !activeListing && nft.wallet.address === currentUser.addr && nft?.blockchainId

  if (isMarketplaceLoading) {
    return (
      <Center minH="10rem">
        <Spinner color="white" size="xl" />
      </Center>
    )
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

            {canList && (
              <Stack>
                <Formik
                  initialValues={{ price: "", currency: "FLOW" }}
                  onSubmit={async (values, actions) => {
                    await handleCreateListing(values.price, values.currency as Currency)
                    actions.setSubmitting(false)
                  }}
                >
                  {(props) => (
                    <Form>
                      <Flex gap="1rem" color="white">
                        <Field name="price">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={form.errors.price && form.touched.price}
                              isRequired
                            >
                              <InputGroup>
                                <NumberInput
                                  onChange={(val) => form.setFieldValue(field.name, val)}
                                  max={100}
                                  color="white"
                                  w="100%"
                                >
                                  <NumberInputField placeholder="Enter price" roundedRight="none" />
                                </NumberInput>
                                <InputRightAddon color="black">
                                  {isDapper ? "USD" : "Flow"}
                                </InputRightAddon>
                              </InputGroup>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

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
              <Button p="6" size="sm" onClick={handleCancelListing} isLoading={isLoading}>
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
