import GET_PARENTS_FROM_CHILD from "../../../cadence/scripts/hybrid-custody/get-parents-from-child.cdc"
import GET_CHILDREN_FROM_PARENT from "../../../cadence/scripts/hybrid-custody/get-children-from-parent.cdc"
import GET_ALL_NFT_DISPLAY_VIEWS_FROM_STORAGE from "../../../cadence/scripts/hybrid-custody/get_all_nft_display_views_from_storage.cdc"
import { useState } from "react"

export const useHybridCustodyQueries = (fcl) => {
  const [parent, setParent] = useState(null)
  const [children, setChildren] = useState(null)
  const [nfts, setNfts] = useState(null)

  const fetchParentsFromChild = async ({ childAddress }) => {
    const _parent = await fcl.query({
      cadence: GET_PARENTS_FROM_CHILD,
      args: (arg, t) => [arg(childAddress, t.Address)],
    })
    setParent(_parent)
  }

  const fetchChildrenFromParent = async ({ parentAddress }) => {
    try {
      const _children = await fcl.query({
        cadence: GET_CHILDREN_FROM_PARENT,
        args: (arg, t) => [arg(parentAddress, t.Address)],
      })
      setChildren(_children)
    } catch {
      setChildren([])
    }
  }

  const fetchNfts = async ({ parentAddress }) => {
    const _nfts = await fcl.query({
      cadence: GET_ALL_NFT_DISPLAY_VIEWS_FROM_STORAGE,
      args: (arg, t) => [arg(parentAddress, t.Address)],
    })
    setNfts(_nfts)
  }

  return { fetchParentsFromChild, parent, fetchChildrenFromParent, children, fetchNfts, nfts }
}
