import { WalletState } from "../../generated/graphql"

export const getColorFromWalletState = (state: WalletState) => {
  switch (state) {
    case WalletState.Ready:
      return "green.400"
    case WalletState.Unverified:
      return "red.400"
    case WalletState.Verified:
      return "blue.400"
    default:
      return "gray.400"
  }
}
export const getReadableWalletState = (state: WalletState) => {
  switch (state) {
    case WalletState.Ready:
      return "Ready"
    case WalletState.Unverified:
      return "Needs Verification"
    case WalletState.Verified:
      return "Needs Configuration"
    case WalletState.PendingCreation:
      return "Being Created"
    case WalletState.CreationFailed:
      return "Failed Creation"
  }
}
