import { Box, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import Masonry from "react-masonry-css"
import {
  GetNftSetsQuery,
  NftModelsQuery,
  NftModelsQueryVariables,
  NftModelsDocument,
  UserNftsQuery,
  UserNftsQueryVariables,
  UserNftsDocument,
  NftModel,
  Nft,
  NftsByWalletQuery,
  NftsByWalletQueryVariables,
  NftsByWalletDocument,
} from "../../../../../generated/graphql"
import AppLayout from "../../../../components/AppLayout"
import { useBackendClient } from "../../../../graphql/backendClient"
import { useGraphQLQuery } from "../../../../graphql/useGraphQLQuery"
import { useAuthContext } from "../../../../hooks/useAuthContext"
import { MasonryCard } from "../../../../ui/Card/MasonryCard"
import { LoginSkeleton } from "../../../../ui/Skeleton"

const WalletCollectionPage = () => {
  const router = useRouter()

  const { walletAddress } = router?.query

  const {
    nftsByWallet: nftsData,
    fetching: fetchingNfts,
    reExecuteQuery,
  } = useGraphQLQuery<NftsByWalletQuery, NftsByWalletQueryVariables>({
    query: NftsByWalletDocument,
    variables: {
      walletAddress: walletAddress?.toString(),
    },
    pause: !walletAddress,
  })

  let nfts = nftsData?.items

  const isPageLoading = fetchingNfts

  return (
    <AppLayout showSidebar={false} title={`${walletAddress} - Wallet - NFT Collection | MintMe`}>
      {isPageLoading ? (
        <LoginSkeleton />
      ) : (
        <Box px="7">
          <Heading fontSize="2rem" mb="2rem">
            NFTS owned by wallet {walletAddress}
          </Heading>
          <Box
            as={Masonry}
            breakpointCols={{
              default: 4,
              1100: 3,
              700: 2,
              500: 1,
            }}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {nfts?.map((nft) => {
              return (
                <MasonryCard
                  hidePopUp
                  key={nft?.id}
                  nftModel={nft.model as NftModel}
                  nft={nft as Nft}
                  reExecuteQuery={reExecuteQuery}
                />
              )
            })}
          </Box>
        </Box>
      )}
    </AppLayout>
  )
}

export default WalletCollectionPage
