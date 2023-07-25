import GET_PARENT_FROM_CHILD from "../../../cadence/scripts/hybrid-custody/get-parents-from-child.cdc"
import GET_CHILDREN_FROM_PARENT from "../../../cadence/scripts/hybrid-custody/get-children-from-parent.cdc"
import GET_OWNED_FROM_PARENT from "../../../cadence/scripts/hybrid-custody/get-owned-from-parent.cdc"
import GET_ALL_NFT_DISPLAY_VIEWS_FROM_STORAGE from "../../../cadence/scripts/hybrid-custody/get_all_nft_display_views_from_storage.cdc"

export const useHybridCustodyQueries = (fcl) => {
  const getParentFromChild = async ({childAddress}) => {
    const parent = await fcl
      .query({
        cadence: GET_PARENT_FROM_CHILD,
        args: (arg, t) => [arg(childAddress, t.Address)],
      })

    return parent
  }

  const getChildrenFromParent = async ({parentAddress}) => {
    const children = await fcl
      .query({
        cadence: GET_CHILDREN_FROM_PARENT,
        args: (arg, t) => [arg(parentAddress, t.Address)],
      })

    
    const owned = await fcl
      .query({
        cadence: GET_OWNED_FROM_PARENT,
        args: (arg, t) => [arg(parentAddress, t.Address)],
      })

    return {children, owned}
  }

  const getNfts = async ({parentAddress}) => {
    const nfts = await fcl
      .query({
        cadence: GET_ALL_NFT_DISPLAY_VIEWS_FROM_STORAGE,
        args: (arg, t) => [arg(parentAddress, t.Address)],
      })

    return nfts
  }

  return { getParentFromChild, getChildrenFromParent, getNfts }
}