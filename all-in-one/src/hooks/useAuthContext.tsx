import { useContext } from "react"
import { AuthContext } from "../components/AuthProvider"

export const useAuthContext = () => useContext(AuthContext)
