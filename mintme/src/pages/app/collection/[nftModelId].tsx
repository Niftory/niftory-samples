import { Box } from "@chakra-ui/react"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import React from "react"
import {
  Nft,
  NftDocument,
  NftModel,
  NftModelDocument,
  NftModelQuery,
  NftModelQueryVariables,
  NftQuery,
  NftQueryVariables,
} from "@niftory/sdk"

import AppLayout from "../../../components/AppLayout"
import { ItemDetail } from "../../../components/collection/ItemDetail"
import {
  getClientForServer,
  getClientForServerWithoutCredentials,
} from "../../../graphql/getClientForServer"
import { getNiftoryClientForServer } from "graphql/getNiftoryClient"

interface Props {
  nftModel: NftModel
  nft?: Nft
  host: string
}

const ProductDropPage = ({ nftModel, host, nft }: Props) => {
  return (
    <AppLayout title={`${nftModel.title} - NFT Collection | MintMe`}>
      <Head>
        <meta property="og:title" content={nftModel.title} />
        <meta property="og:site_name" content="MintMe" />
        <meta property="og:url" content={`http://${host}/app/collection/${nftModel.id}`} />
        <meta property="og:description" content={nftModel.description} />
        <meta property="og:image" content={nftModel?.content?.files?.[0].url} />
      </Head>
      <ItemDetail nftModel={nftModel} nft={nft} />
    </AppLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { nftModelId, nftId } = context.query

  const niftoryClient = await getNiftoryClientForServer()
  const nftModel = await niftoryClient.getNftModel(nftModelId as string)

  let nft = null
  if (nftId) {
    nft = await niftoryClient.getNft(nftId?.toString())
  }

  return {
    props: { nftModel, host: context.req.headers.host, nft },
  }
}

export default ProductDropPage
