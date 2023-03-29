import axios from "axios"
import { gql } from "graphql-request"
import { useQuery } from "urql"
import { ContractDocument, ContractQuery, MarketplaceListing } from "../../generated/graphql"
import * as fcl from "@onflow/fcl"
import {
  CREATE_MARKETPLACE_LISTING_SCRIPT,
  PURCHASE_MARKETPLACE_LISTING_SCRIPT,
  CANCEL_MARKETPLACE_LISTING_SCRIPT,
} from "../cadence/scripts"
import { useWalletContext } from "./useWalletContext"

gql`
  query contract {
    contract {
      name
      address
    }
  }
`

function prepareCadence(script: string, contractName: string, address: string) {
  return script.replaceAll("{contractName}", contractName).replaceAll("{contractAddress}", address)
}

export function useMarketplace() {
  const [contractResponse] = useQuery<ContractQuery>({ query: ContractDocument })
  const { data, fetching: isFetching, error } = contractResponse
  const isFetched = !isFetching && !error

  let createMarketplaceListing: (
    nftId: string,
    blockchainId: string,
    price: string
  ) => Promise<MarketplaceListing>
  let purchaseMarketplaceListing: (
    listingId: string,
    listingResourceID: string,
    listingAddress: any
  ) => Promise<MarketplaceListing>
  let cancelMarketplaceListing: (
    listingId: string,
    listingResourceID: string
  ) => Promise<MarketplaceListing>

  if (isFetched) {
    const { name, address } = data?.contract

    const createMarketplaceListingScript = prepareCadence(
      CREATE_MARKETPLACE_LISTING_SCRIPT,
      name,
      address
    )

    createMarketplaceListing = async (nftId, blockchainId, price) => {
      return handleCreateListing(createMarketplaceListingScript, nftId, blockchainId, price)
    }

    const purchaseMarketplaceListingScript = prepareCadence(
      PURCHASE_MARKETPLACE_LISTING_SCRIPT,
      name,
      address
    )

    purchaseMarketplaceListing = (listingId, listingResourceID, listingAddress) =>
      handlePurchaseListing(
        purchaseMarketplaceListingScript,
        listingId,
        listingResourceID,
        listingAddress
      )

    const cancelMarketplaceListingScript = prepareCadence(
      CANCEL_MARKETPLACE_LISTING_SCRIPT,
      name,
      address
    )

    cancelMarketplaceListing = (listingId, listingResourceID) =>
      handleCancelListing(cancelMarketplaceListingScript, listingId, listingResourceID)
  }

  return {
    createMarketplaceListing,
    purchaseMarketplaceListing,
    cancelMarketplaceListing,
    loading: !isFetched,
  }
}

const handleCreateListing = async (
  cadence: string,
  nftId: string,
  blockchainId: string,
  price: string
) => {
  const year = 1
  const expiryDate = new Date()
  expiryDate.setFullYear(new Date().getFullYear() + year)
  const unixExpiryDate = (expiryDate.getTime() / 1000).toFixed(0).toString()

  const transactionId = await fcl.mutate({
    cadence,
    args: (arg, t) => [
      arg(blockchainId, t.UInt64),
      arg(price, t.UFix64),
      arg("", t.String),
      arg("0.0", t.UFix64),
      arg(unixExpiryDate, t.UInt64),
      arg([], t.Array(t.Address)),
    ],

    limit: 9999,
  })

  await fcl.tx(transactionId).onceSealed()
  const { data } = await axios.post<{ completeMarketplaceList: MarketplaceListing }>(
    "/api/completeMarketplaceList",
    {
      nftId,
      transactionId,
    }
  )
  return data?.completeMarketplaceList
}

const handlePurchaseListing = async (
  cadence: string,
  listingId: string,
  listingResourceID: string,
  listingAddress: string
) => {
  const transactionId = await fcl.mutate({
    cadence,
    args: (arg, t) => [
      arg(listingResourceID, t.UInt64),
      arg(listingAddress, t.Address),
      arg(listingAddress, t.Optional(t.Address)),
    ],
    limit: 9999,
  })

  await fcl.tx(transactionId).onceSealed()
  const { data } = await axios.post<{ completeMarketplacePurchase: MarketplaceListing }>(
    "/api/completeMarketplacePurchase",
    {
      id: listingId,
      transactionId,
    }
  )
  return data?.completeMarketplacePurchase
}

const handleCancelListing = async (
  cadence: string,
  listingId: string,
  listingResourceID: string
) => {
  const transactionId = await fcl.mutate({
    cadence,
    args: (arg, t) => [arg(listingResourceID, t.UInt64)],
    limit: 9999,
  })

  await fcl.tx(transactionId).onceSealed()
  const { data } = await axios.post<{ completeMarketplaceCancel: MarketplaceListing }>(
    "/api/completeMarketplaceCancel",
    {
      id: listingId,
      transactionId,
    }
  )
  return data?.completeMarketplaceCancel
}
