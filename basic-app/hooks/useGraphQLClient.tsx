import { useContext } from "react"
import { GraphQLClientContext } from "../components/GraphQLClientProvider"

export const useGraphQLClient = () => useContext(GraphQLClientContext)
