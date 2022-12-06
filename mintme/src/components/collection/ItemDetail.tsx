import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Link as ChakraLink,
  Link,
  Image,
} from "@chakra-ui/react"

import {
  ContractDocument,
  ContractQuery,
  ContractQueryVariables,
  Nft,
  NftModel,
  UserNftsDocument,
  UserNftsQuery,
  UserNftsQueryVariables,
} from "../../../generated/graphql"
import { Subset } from "../../lib/types"
import { useRouter } from "next/router"
import { useAuthContext } from "../../hooks/useAuthContext"
import { InfoPopOver } from "../../ui/PopOver/InfoPopOver"
import { useCallback, useEffect, useMemo, useState } from "react"
import { backendClient } from "../../graphql/backendClient"
import { useGraphQLQuery } from "../../graphql/useGraphQLQuery"
import { MintRequestModal } from "../../ui/Modal/MintRequestModal"
import { MediaBox } from "../../ui/MediaBox"
import { BsFileEarmarkCode as ContractIcon } from "react-icons/bs"
import { getContractUrl } from "../../utils/contract"
import { AiFillInfoCircle } from "react-icons/ai"
import { useTransfer } from "hooks/useTransfer"
import toast from "react-hot-toast"
import posthog from "posthog-js"
import { TransactionCollapsibleTable } from "ui/TransactionCollapsibleTable"

interface Props {
  nftModel: Subset<NftModel>
  nft?: Nft
}

export const ItemDetail = ({ nftModel, nft }: Props) => {
  const router = useRouter()

  const { session, signIn, isLoading: isSessionLoading } = useAuthContext()

  const { token } = router.query
  const [isLoading, setLoading] = useState(false)

  const product = {
    title: nftModel?.title,
    description: nftModel?.description || "",
    content: nftModel?.content?.files?.map((file) => ({
      contentType: file?.contentType || "image",
      contentUrl: file?.url,
      alt: nftModel?.title,
    })),
    properties:
      Object.keys(nftModel?.metadata ?? {})?.map((item) => ({
        key: item,
        value: nftModel?.metadata[item],
      })) ?? [],
    attributes:
      Object.keys(nftModel?.attributes ?? {})?.map((item) => ({
        key: item,
        value: nftModel?.attributes[item],
      })) ?? [],
    supply: nftModel?.quantity,
  }

  const {
    nfts,
    fetching: fetchingNfts,
    reExecuteQuery: reExecuteNFtsQuery,
  } = useGraphQLQuery<UserNftsQuery, UserNftsQueryVariables>({
    query: UserNftsDocument,
    pause: !session,
  })

  useEffect(() => {
    if (token && nftModel.attributes["claimable"]) {
      posthog.capture("CLAIM_LINK_OPENED", {
        posthogEventDetail: "User opens claim view",
        nftModel,
      })
    }
  }, [nftModel, token])

  const disclosure = useDisclosure()
  const { readyWallet } = useTransfer()
  const handleClaimNFT = useCallback(async () => {
    try {
      if (!session) {
        signIn(`${window.location.href}&shouldClaim=true`)
        posthog.capture("CLAIM_LOGIN", {
          posthogEventDetail: "User hits Sign in to Claim",
          nftModel,
        })
        return
      }

      if (!nftModel?.id && !token) return
      setLoading(true)
      await readyWallet(session)
      await backendClient("claimNFT", { token }).finally(() => {
        router.replace(`/app/collection/${nftModel?.id}`, undefined, { shallow: true })
        setLoading(false)
      })
      posthog.capture("CLAIM_NFT_SUCCESS", {
        posthogEventDetail: "User successfully claims NFT",
        nftModel,
      })
      if (nfts?.items.length == 0) {
        disclosure.onOpen()
      } else {
        router.push("/app/collection")
      }
      reExecuteNFtsQuery()
    } catch (e) {
      posthog.capture("ERROR_FAILED_CLAIMNFT_CALL", e)
      setLoading(false)
      toast.error(
        "Uh-oh, there was an error claiming your NFT. Please try again. If the issue persists please contact us via discord."
      )
    }
  }, [nftModel?.id, session, signIn, token, nfts?.items])

  useEffect(() => {
    if (router.query?.shouldClaim === "true" && session && !fetchingNfts) {
      handleClaimNFT()
    }
  }, [handleClaimNFT, router.query, session, fetchingNfts])

  const alreadyClaimed = nfts?.items?.some((item) => item.model.id === nftModel.id)
  const nftsRemaining = nftModel.quantity > nftModel.quantityMinted

  const { contract } = useGraphQLQuery<ContractQuery, ContractQueryVariables>({
    query: ContractDocument,
  })

  const renderButtonText = () => {
    if (!nftsRemaining) {
      return `All NFTs have been claimed`
    }

    if (!session) {
      return "Sign in to claim"
    }
    if (alreadyClaimed) {
      return "Claimed"
    }
    return "Claim"
  }

  return (
    <Box
      maxW={{ base: "7xl", xl: "1400px" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "4" }}
    >
      <MintRequestModal disclosure={disclosure} />
      <Heading>{nftModel.title}</Heading>
      <Text fontSize="0.8rem" mb="2rem" fontStyle="italic">
        An NFT from MintMe
      </Text>
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={{ base: "6", lg: "8", xl: "12" }}
        h={{ base: "auto", lg: "550px", xl: "600px" }}
        mb="4rem"
      >
        {product.content?.length > 0 && (
          <Box flex="1" bgColor="content.400" shadow="base">
            <MediaBox
              flex="1"
              file={nftModel?.content?.files[0]}
              alt={nftModel.title}
              objectFit="contain"
              controls
            />
          </Box>
        )}
        <VStack
          spacing="1rem"
          width={{ base: "100%", lg: "35%" }}
          alignItems="flex-start"
          shadow="base"
          bg="white"
          overflow="auto"
        >
          <>
            <VStack
              p="2rem 2rem 1rem 2rem"
              borderBottom={"2px"}
              borderColor={"brand.300"}
              alignItems="flex-start"
              w="full"
              fontSize="16px"
            >
              <Flex justifyContent="space-between" alignItems="center" w="full">
                <Heading fontWeight="bold" fontSize="24px">
                  {product?.title}
                </Heading>
                <Flex gap="0.3rem">
                  {contract && (
                    <Tooltip label="View Contract" hasArrow placement="top">
                      <a
                        id="flowscan_contract"
                        href={getContractUrl(contract)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ContractIcon size="20px" color="grey.100" />
                      </a>
                    </Tooltip>
                  )}
                </Flex>
              </Flex>
              <Box>
                <Flex alignItems="center" fontWeight="bold" fontSize="16px">
                  Description
                </Flex>
                <Text mt="0">{product?.description}</Text>
              </Box>
            </VStack>

            {product?.properties?.length > 0 && (
              <Flex
                direction="column"
                p="0rem 2rem 1rem 2rem"
                borderBottom={"2px"}
                borderColor={"brand.300"}
                alignItems="flex-start"
                w="full"
              >
                <Flex alignItems="center" fontWeight="bold" fontSize="16px" mb="0.4rem">
                  Properties
                  <InfoPopOver
                    placement="top"
                    message="Properties that will be added to the blockchain for any minted NFTs."
                  />
                </Flex>

                <VStack w="full">
                  {product?.properties.map(({ key, value }) => (
                    <Flex key={key} justifyContent="space-between" w="full">
                      <Box>{key}</Box>
                      <Box>{value}</Box>
                    </Flex>
                  ))}
                </VStack>
              </Flex>
            )}
            {product?.supply > 0 && !nft && (
              <Flex
                p="0rem 2rem 1rem 2rem"
                borderBottom={"2px"}
                borderColor={"brand.300"}
                justifyContent="space-between"
                w="full"
              >
                <Flex alignItems="center" fontWeight="bold" fontSize="16px">
                  Supply
                  <InfoPopOver
                    placement="top"
                    message="Number of NFTs that can be minted from this template"
                  />
                </Flex>
                <Text fontSize="16px">{product?.supply}</Text>
              </Flex>
            )}
            {nft?.serialNumber && (
              <Flex
                p="0rem 2rem 1rem 2rem"
                borderBottom={"2px"}
                borderColor={"brand.300"}
                alignItems="center"
                justifyContent="space-between"
                w="full"
              >
                <Flex alignItems="center">
                  <Text fontWeight="bold" fontSize="16px">
                    Serial Number
                  </Text>
                  <InfoPopOver
                    placement="top"
                    message="A unique identification number corresponding to the order in which the NFT was minted."
                  />
                </Flex>

                <Text>{nft?.serialNumber} </Text>
              </Flex>
            )}
            {nft?.blockchainId && (
              <Flex
                p="0rem 2rem 1rem 2rem"
                borderBottom={"2px"}
                borderColor={"brand.300"}
                alignItems="center"
                justifyContent="space-between"
                w="full"
                mb="0.4rem"
              >
                <Flex alignItems="center">
                  <Text fontWeight="bold" fontSize="16px">
                    Blockchain Id
                  </Text>
                  <InfoPopOver
                    placement="top"
                    message="The ID of this resource on the blockchain."
                  />
                </Flex>

                <Text>{nft?.blockchainId} </Text>
              </Flex>
            )}
            {product?.attributes?.length > 0 && (
              <Flex
                direction="column"
                p="0rem 2rem 1rem 2rem"
                borderBottom={"2px"}
                borderColor={"brand.300"}
                alignItems="flex-start"
                w="full"
              >
                <Flex alignItems="center" fontWeight="bold" fontSize="16px" mb="0.4rem">
                  Attributes
                  <InfoPopOver
                    placement="top"
                    message="General attributes for the NFT that will be not added to the blockchain."
                  />
                </Flex>

                <VStack w="full">
                  {product?.attributes.map(({ key, value }) => (
                    <Flex key={key} justifyContent="space-between" w="full">
                      <Box>{key}</Box>
                      <Box>{value.toString()}</Box>
                    </Flex>
                  ))}
                </VStack>
              </Flex>
            )}
            {nft && (
              <Flex
                borderBottom={"2px"}
                borderColor={"brand.300"}
                alignItems="center"
                justifyContent="space-between"
                w="full"
              >
                <TransactionCollapsibleTable
                  transactions={nft.transactions}
                  buttonPadding="1rem 2rem"
                  contentPadding="0rem 2rem"
                />
              </Flex>
            )}

            {token && nftModel?.attributes?.["claimable"] && (
              <Box w="full" pb="2rem">
                <Flex p="0rem 2rem 0rem 2rem" w="full">
                  <Button
                    w="full"
                    onClick={handleClaimNFT}
                    isLoading={isLoading || isSessionLoading || fetchingNfts}
                    disabled={alreadyClaimed || !nftsRemaining}
                  >
                    {renderButtonText()}
                  </Button>
                </Flex>
                {!nftsRemaining && (
                  <Flex
                    p="0.5rem 2.1rem 1rem 2.1rem"
                    alignItems="start"
                    justifyContent="center"
                    w="full"
                  >
                    <AiFillInfoCircle size="1.2rem" />
                    <Box ml="0.2rem" fontSize="0.8rem">
                      {`${
                        nftModel.quantity > 1 ? `All ${nftModel.quantity} NFTs` : `The only NFT`
                      } from this collection {${
                        nftModel.quantity > 1 ? `have` : `has`
                      } already been claimed.`}
                    </Box>
                  </Flex>
                )}
              </Box>
            )}
          </>
        </VStack>
      </Stack>
      {!isSessionLoading && !session && (
        <Box my="4rem">
          <Flex direction={{ base: "column", md: "row" }} gap="1rem">
            <Image src="/mintme-logo-header.svg" maxW="25rem" alt="logo" />
            <Box mt="1.5rem">
              <Heading size="lg" mb="1rem">
                About MintMe
              </Heading>
              MintMe is a no-code mint tool to mint NFTs on the{" "}
              <ChakraLink color="purple.100" target="_blank" href=" https://flow.com/">
                Flow
              </ChakraLink>{" "}
              blockchain. It is powered by{" "}
              <ChakraLink color="purple.100" target="_blank" href="https://niftory.com">
                Niftory
              </ChakraLink>
              , a web3 API that makes it easy for any developer to quickly integrate NFTs, digital
              wallets and other web3 concepts into their applications, with or without blockchain
              expertise.{" "}
              <ChakraLink
                color="purple.100"
                target="_blank"
                href="https://docs.niftory.com/home/v/api/getting-started/api-quickstart"
              >
                Get started
              </ChakraLink>{" "}
              with your free Niftory API key today.
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
