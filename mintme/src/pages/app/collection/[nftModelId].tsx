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
} from "../../../../generated/graphql"

import AppLayout from "../../../components/AppLayout"
import { ItemDetail } from "../../../components/collection/ItemDetail"
import {
  getClientForServer,
  getClientForServerWithoutCredentials,
} from "../../../graphql/getClientForServer"

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
    props: { nftModel, host: context.req.headers.host, nft },
  }
}

export default ProductDropPage
