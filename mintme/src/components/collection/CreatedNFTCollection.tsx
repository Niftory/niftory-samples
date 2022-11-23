import { filter } from "@chakra-ui/system"
import { useRouter } from "next/router"
import Masonry from "react-masonry-css"
import {
  UserNftsQuery,
  UserNftsQueryVariables,
  UserNftsDocument,
  Nft,
  NftModel,
  GetNftSetsQuery,
  NftModelsDocument,
  NftModelsQuery,
  NftModelsQueryVariables,
} from "../../../generated/graphql"
import { useBackendClient } from "../../graphql/backendClient"
import { useGraphQLQuery } from "../../graphql/useGraphQLQuery"
import { useAuthContext } from "../../hooks/useAuthContext"
import { MasonryCard } from "../../ui/Card/MasonryCard"
import { Empty } from "../../ui/Empty/Empty"
import { LoginSkeleton } from "../../ui/Skeleton"

export const CreatedNFTCollection = () => {
  const { isLoading, session } = useAuthContext()

  const { sets: userSets } = useBackendClient<GetNftSetsQuery>(session ? "getNFTSets" : null)
  const {
    nftModels,
    fetching: fetchingNFTModels,
    reExecuteQuery,
  } = useGraphQLQuery<NftModelsQuery, NftModelsQueryVariables>({
    query: NftModelsDocument,
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
