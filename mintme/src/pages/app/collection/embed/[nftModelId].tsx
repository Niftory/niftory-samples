import { Box, Stack, Image, Flex, Heading, Text, Button } from "@chakra-ui/react"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import {
  NftModel,
  NftModelQuery,
  NftModelQueryVariables,
  NftModelDocument,
  Nft,
  NftQuery,
  NftQueryVariables,
  NftDocument,
} from "../../../../../generated/graphql"
import {
  getClientForServer,
  getClientForServerWithoutCredentials,
} from "../../../../graphql/getClientForServer"
import { MediaBox } from "../../../../ui/MediaBox"

interface Props {
  nftModel: NftModel
  nft?: Nft
  host: string
}

const EmbedPage = ({ nftModel, nft }: Props) => {
  const imageUrl = nftModel?.content?.files?.[0].contentType.startsWith("video")
    ? nftModel?.content?.poster?.url
    : nftModel?.content?.files?.[0].url

  // Set protocol from client side since its not available on server
  let protocol = "https:"
  if (typeof window !== "undefined") {
    protocol = window.location.protocol
  }

  const routeLink = `${protocol}//${process.env.NEXT_PUBLIC_VERCEL_URL}/app/collection/${
    nftModel.id
  }${nft ? `?nftId=${nft.id}` : ""}`
  return (
    <>
      <Head>
        <title>{nftModel.title} - NFT | MintMe</title>
        <meta property="og:title" content={nftModel.title} />
        <meta property="og:site_name" content="MintMe" />
        <meta property="og:url" content={routeLink} />
        <meta property="og:description" content={nftModel.description} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <a href={routeLink}>
        <Flex
          w="calc(300px - 0.2rem)"
          minH={{ base: "fit-content", md: "calc(200px - 0.2rem)" }}
          borderRadius="lg"
          shadow="base"
          m="0.1rem"
          overflow="hidden"
          flexDir="column"
          position="relative"
          onClick={() => window.open(routeLink)}
          bg="transparent"
        >
          <Box overflow="hidden" w="100%">
            <MediaBox
              file={nftModel?.content?.files?.[0]}
              poster={nftModel?.content?.poster}
              alt={nftModel.title}
              w="100%"
              objectFit="cover"
              maxH={"200px"}
              h="100%"
            />
          </Box>
          <Flex
            px={{ base: 2, md: 5 }}
            py={{ base: 2, md: 4 }}
            flex="1"
            bgColor="gray.50"
            flexDir="column"
            gap="0.3rem"
          >
            <Heading fontSize="1.6rem">{nftModel.title}</Heading>
            <Text noOfLines={{ base: 3, md: 4 }} fontSize="0.9rem">
              {nftModel.description}
            </Text>
            {nft && (
              <>
                <Text fontSize="0.9rem">
                  <b>Serial Number :</b> {nft.serialNumber}
                </Text>
                <Text fontSize="0.9rem">
                  <b>Blockchain ID :</b> {nft.blockchainId}
                </Text>
              </>
            )}

            <Box position="absolute" right="1" bottom="1">
              <Image src="/mintme-logo-header.svg" alt="logo" h="2rem" />
            </Box>
          </Flex>
        </Flex>
      </a>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { nftModelId, nftId } = context.query

  const serverSideBackendClient = await getClientForServerWithoutCredentials()
  const { nftModel } = await serverSideBackendClient.request<NftModelQuery, NftModelQueryVariables>(
    NftModelDocument,
    {
      id: nftModelId.toString(),
    }
  )

  let nft = null
  if (nftId) {
    const response = await serverSideBackendClient.request<NftQuery, NftQueryVariables>(
      NftDocument,
      {
        id: nftId?.toString(),
      }
    )

    nft = response?.nft ?? null
  }

  return {
    props: { nftModel, nft },
  }
}

export default EmbedPage
