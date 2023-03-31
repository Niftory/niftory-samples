import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Image,
  Tr,
  Text,
  Button,
  Td,
  useToast,
  Center,
  Spinner,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQuery } from "urql"

import {
  Currency,
  MarketplaceListing,
  MarketplaceListingsQueryVariables,
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
} from "../../../generated/graphql"
import { useMarketplace } from "../../hooks/useMarketplace"
import { useWalletContext } from "../../hooks/useWalletContext"
import { Subset } from "../../lib/types"
import { MarketplaceListingsTablePage } from "./MarketplaceListingsTablePage"

const ITEMS_PER_PAGE = 10

export const MarketplaceListingsTable = () => {
  const [activeListing, setActiveListing] = useState<Subset<MarketplaceListing>>()

  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  const id: string = router.query["id"]?.toString()

  const [nftModelResponse] = useQuery<NftModelQuery, NftModelQueryVariables>({
    query: NftModelDocument,
    variables: {
      id,
    },
    pause: !id,
  })
  const nftModel = nftModelResponse?.data?.nftModel

  const [pageVariables, setPageVariables] = useState<MarketplaceListingsQueryVariables[]>([])

  useEffect(() => {
    if (!id) return
    setPageVariables([
      {
        filter: {
          nftModelIds: id ? [id] : undefined,
        },
        appId: process.env.NEXT_PUBLIC_CLIENT_ID,
        maxResults: ITEMS_PER_PAGE,
      },
    ])
  }, [id])

  const fetchMore = (cursor) => {
    setPageVariables([
      ...pageVariables,
      {
        filter: {
          nftModelIds: id ? [id] : undefined,
        },
        appId: process.env.NEXT_PUBLIC_CLIENT_ID,
        maxResults: ITEMS_PER_PAGE,
        cursor,
      },
    ])
  }

  const {
    purchaseMarketplaceListing,
    purchaseDapperMarketplaceListing,
    loading: isMarketplaceLoading,
  } = useMarketplace()

  const { currentUser, isDapper } = useWalletContext()
  const toast = useToast()

  const handlePurchaseListing = async () => {
    try {
      if (!activeListing) return

      setLoading(true)
      if (isDapper) {
        await purchaseDapperMarketplaceListing(
          activeListing.id,
          activeListing.blockchainId,
          activeListing.wallet.address,
          activeListing.pricing.price
        )
      } else {
        await purchaseMarketplaceListing(
          activeListing.id,
          activeListing.blockchainId,
          activeListing.wallet.address
        )
      }

      router.push(`/app/collection`)
    } catch (e) {
      console.error(e)
      toast({
        title: "Purchase listing failed.",
        status: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const canPurchase =
    activeListing?.state === "AVAILABLE" && activeListing.wallet.address != currentUser.addr

  if (isMarketplaceLoading) {
    return (
      <Center minH="10rem">
        <Spinner color="white" size="xl" />
      </Center>
    )
  }

  return (
    <Box>
      <Flex direction="column" color="white" gap="1rem">
        <Heading size="lg">Purchase NFT Listing</Heading>
        <Flex w="full" gap="2rem">
          <TableContainer bgColor="gray.900" flex="1" height="fit-content" p="0.1rem">
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  <Td></Td>
                  <Td fontSize="1rem">Price </Td>
                  <Td fontSize="1rem">Serial Number</Td>
                  <Td fontSize="1rem">Blockchain Id</Td>
                  <Td fontSize="1rem">Listed By</Td>
                </Tr>
              </Thead>

              <Tbody>
                {pageVariables.map((variables, index) => (
                  <MarketplaceListingsTablePage
                    key={variables.filter?.nftModelIds?.[0]}
                    activeListing={activeListing}
                    setActiveListing={setActiveListing}
                    variables={variables}
                    fetchMore={fetchMore}
                    isLast={index === pageVariables.length - 1}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box bgColor="gray.900" p="1rem" minW="25rem" rounded="base">
            {nftModel && (
              <Flex direction="column" gap="0.4rem">
                <Image
                  alt="selected image"
                  objectFit="cover"
                  width="100%"
                  height="150px"
                  src={nftModel.content.poster.url}
                />

                <Heading size="xl" fontWeight="medium" color="page.accent">
                  {nftModel.title}
                </Heading>

                <Text color="page.text">{nftModel.description}</Text>

                {canPurchase && (
                  <Button
                    p="6"
                    size="md"
                    colorScheme="gray"
                    disabled={!canPurchase}
                    onClick={handlePurchaseListing}
                    color="black"
                    isLoading={isLoading}
                  >
                    <Text>Purchase marketplace item</Text>
                  </Button>
                )}
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
