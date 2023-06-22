import { useRouter } from "next/router"
import Masonry from "react-masonry-css"
import { useBackendClient } from "../../graphql/backendClient"
import { useAuthContext } from "../../hooks/useAuthContext"
import { MasonryCard } from "../../ui/Card/MasonryCard"
import { Empty } from "../../ui/Empty/Empty"
import { LoginSkeleton } from "../../ui/Skeleton"
import { NftModel, useNftModelsQuery, NftSet } from "@niftory/sdk"

export const CreatedNFTCollection = () => {
  const { isLoading, session } = useAuthContext()

  const { data: userSets } = useBackendClient<NftSet[]>(session ? "getNFTSets" : null)

  const [{ data, fetching: fetchingNFTModels }, reExecuteQuery] = useNftModelsQuery({
    variables: {
      filter: { setIds: userSets?.map((set) => set.id) as string[] },
    },
    requestPolicy: "network-only",
    pause: !userSets || isLoading,
  })
  const router = useRouter()

  if (fetchingNFTModels) {
    return <LoginSkeleton />
  }

  const nftModels = data?.nftModels

  if (!fetchingNFTModels && nftModels?.items?.length == 0) {
    return (
      <Empty
        message="You haven't created anything yet!"
        actionText="Create an NFT"
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
      {nftModels?.items?.map((nftModel) => {
        return (
          <MasonryCard
            key={nftModel?.id}
            nftModel={nftModel as NftModel}
            reExecuteQuery={reExecuteQuery}
          />
        )
      })}
    </Masonry>
  )
}
