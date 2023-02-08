import { NftBlockchainState, NftModelBlockchainState } from "../../generated/graphql"

type ReadableState = "Minted" | "Minting" | "Error" | "Unminted"

export const getReadableStateValue = (
  state: NftBlockchainState | NftModelBlockchainState
): ReadableState => {
  switch (state) {
    case NftBlockchainState.Transferred:
      return "Minted"
    case NftBlockchainState.Transferring:
      return "Minting"
    default:
      return (state.charAt(0) + state.slice(1).toLowerCase()) as ReadableState
  }
}
