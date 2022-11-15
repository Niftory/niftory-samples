import { useContext } from "react"
import { WalletContext } from "../components/wallet/WalletProvider"

export const useWalletContext = () => useContext(WalletContext)
