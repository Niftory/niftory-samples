import { filter } from "@chakra-ui/system"
import router from "next/router"
import Masonry from "react-masonry-css"
import {
  UserNftsQuery,
  UserNftsQueryVariables,
  UserNftsDocument,
  Nft,
  NftModel,
} from "../../../generated/graphql"
import { useGraphQLQuery } from "../../graphql/useGraphQLQuery"
import { useAuthContext } from "../../hooks/useAuthContext"
import { MasonryCard } from "../../ui/Card/MasonryCard"
import { Empty } from "../../ui/Empty/Empty"
import { LoginSkeleton } from "../../ui/Skeleton"

export const UserNFTCollection = () => {
  const { isLoading } = useAuthContext()

  const {
    nfts,
    fetching: fetchingNfts,
    reExecuteQuery,
  } = useGraphQLQuery<UserNftsQuery, UserNftsQueryVariables>({
    query: UserNftsDocument,
    requestPolicy: "network-only",
    pause: isLoading,
  })

  if (fetchingNfts) {
    return <LoginSkeleton />
  }

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
