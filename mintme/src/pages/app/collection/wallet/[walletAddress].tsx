import { Box, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import Masonry from "react-masonry-css"

import AppLayout from "../../../../components/AppLayout"

import { MasonryCard } from "../../../../ui/Card/MasonryCard"
import { LoginSkeleton } from "../../../../ui/Skeleton"
import { Nft, NftModel, useNftsByWalletQuery } from "@niftory/sdk"

const WalletCollectionPage = () => {
  const router = useRouter()

  const { walletAddress } = router?.query

  const [{ data, fetching: fetchingNfts }, reExecuteQuery] = useNftsByWalletQuery({
    variables: {
      address: walletAddress?.toString(),
    },
    pause: !walletAddress,
  })

  let nfts = data?.nftsByWallet?.items

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
