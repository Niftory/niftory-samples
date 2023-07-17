import router from "next/router"
import Masonry from "react-masonry-css"

import { useAuthContext } from "../../hooks/useAuthContext"
import { MasonryCard } from "../../ui/Card/MasonryCard"
import { Empty } from "../../ui/Empty/Empty"
import { LoginSkeleton } from "../../ui/Skeleton"
import { useNftsQuery, NftModel, Nft } from "@niftory/sdk/react"

export const UserNFTCollection = () => {
  const { isLoading } = useAuthContext()

  const [{ data, fetching: fetchingNfts }, reExecuteQuery] = useNftsQuery({
    requestPolicy: "network-only",
    pause: isLoading,
    variables: {},
  })

  if (fetchingNfts) {
    return <LoginSkeleton />
  }
  const nfts = data?.nfts

  if (!fetchingNfts && nfts?.items?.length == 0) {
    return (
      <Empty
        message="You haven't minted anything yet!"
        actionText="Mint an NFT"
        onAction={() => router.push("/app/new-item")}
      />
    )
  }

  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      }}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {nfts?.items?.map((nft) => {
        return (
          <MasonryCard
            key={nft?.id}
            nftModel={nft.model as NftModel}
            nft={nft as Nft}
            reExecuteQuery={reExecuteQuery}
          />
        )
      })}
    </Masonry>
  )
}
