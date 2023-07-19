import axios from "axios"
import { gql } from "graphql-request"
import { useQuery } from "urql"
import * as fcl from "@onflow/fcl"
import {
  CREATE_MARKETPLACE_LISTING_SCRIPT,
  PURCHASE_MARKETPLACE_LISTING_SCRIPT,
  CANCEL_MARKETPLACE_LISTING_SCRIPT,
  DAPPER_CREATE_DUC_LISTING_SCRIPT,
  DAPPER_PURCHASE_DUC_LISTING_SCRIPT,
  DAPPER_CREATE_FUT_LISTING_SCRIPT,
  DAPPER_PURCHASE_FUT_LISTING_SCRIPT,
} from "../cadence/scripts"
import {
  ContractQuery,
  ContractDocument,
  MarketplaceListing,
  Currency,
  useContractQuery,
} from "@niftory/sdk/react"

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
  const [contractResponse] = useContractQuery()
  const { data, fetching: isFetching, error } = contractResponse
  const isFetched = !isFetching && !error

  let createMarketplaceListing: (
    nftId: string,
    blockchainId: string,
    price: string
  ) => Promise<MarketplaceListing>
  let createDapperMarketplaceListing: (
    nftId: string,
    blockchainId: string,
    price: string,
    currency: Currency
  ) => Promise<MarketplaceListing>
  let purchaseDapperMarketplaceListing: (
    listingId: string,
    listingResourceID: string,
    listingAddress: string,
    expectedPrice: string,
    currency: Currency
  ) => Promise<MarketplaceListing>
  let purchaseMarketplaceListing: (
    listingId: string,
    listingResourceID: string,
    listingAddress: string
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
      return handleCreateListing(
        createMarketplaceListingScript,
        nftId,
        blockchainId,
        price,
        /*isDapper*/ false
      )
    }

    const createDapperMarketplaceListingFUTScript = prepareCadence(
      DAPPER_CREATE_FUT_LISTING_SCRIPT,
      name,
      address
    )
    const createDapperMarketplaceListingDUCScript = prepareCadence(
      DAPPER_CREATE_DUC_LISTING_SCRIPT,
      name,
      address
    )

    createDapperMarketplaceListing = async (nftId, blockchainId, price, currency) => {
      switch (currency) {
        case Currency.Duc:
          return handleCreateListing(
            createDapperMarketplaceListingDUCScript,
            nftId,
            blockchainId,
            price,
            /*isDapper*/ true
          )
        case Currency.Fut:
          return handleCreateListing(
            createDapperMarketplaceListingFUTScript,
            nftId,
            blockchainId,
            price,
            /*isDapper*/ true
          )
      }
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

    const purchaseDapperMarketplaceListingDUCScript = prepareCadence(
      DAPPER_PURCHASE_DUC_LISTING_SCRIPT,
      name,
      address
    )
    const purchaseDapperMarketplaceListingFUTScript = prepareCadence(
      DAPPER_PURCHASE_FUT_LISTING_SCRIPT,
      name,
      address
    )

    purchaseDapperMarketplaceListing = async (
      listingId,
      listingResourceID,
      listingAddress,
      expectedPrice,
      currency
    ) => {
      switch (currency) {
        case Currency.Duc:
          return handleDapperPurchaseListing(
            purchaseDapperMarketplaceListingDUCScript,
            listingId,
            listingResourceID,
            listingAddress,
            expectedPrice
          )
        case Currency.Fut:
          return handleDapperPurchaseListing(
            purchaseDapperMarketplaceListingFUTScript,
            listingId,
            listingResourceID,
            listingAddress,
            expectedPrice
          )
      }
    }

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
    createDapperMarketplaceListing,
    purchaseMarketplaceListing,
    purchaseDapperMarketplaceListing,
    cancelMarketplaceListing,
    loading: !isFetched,
  }
}

const handleCreateListing = async (
  cadence: string,
  nftId: string,
  blockchainId: string,
  price: string,
  isDapper: boolean
) => {
  const year = 1
  const expiryDate = new Date()
  expiryDate.setFullYear(new Date().getFullYear() + year)
  const unixExpiryDate = (expiryDate.getTime() / 1000).toFixed(0).toString()

  let transactionId
  if (isDapper) {
    transactionId = await fcl.mutate({
      cadence,
      args: (arg, t) => [
        arg(blockchainId, t.UInt64),
        arg(price, t.UFix64),
        arg("0.0", t.UFix64),
        arg([], t.Array(t.Address)),
        arg(unixExpiryDate, t.UInt64),
        arg("", t.String),
      ],

      limit: 9999,
    })
  } else {
    transactionId = await fcl.mutate({
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
  }

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
  listingAddress: string,
  isDapper: boolean = false
) => {
  let transactionId
  if (isDapper) {
    transactionId = await fcl.mutate({
      cadence,
      args: (arg, t) => [
        arg(listingAddress, t.Address),
        arg(listingResourceID, t.UInt64),
        arg(listingAddress, t.Optional(t.Address)),
      ],
      limit: 9999,
    })
  } else {
    transactionId = await fcl.mutate({
      cadence,
      args: (arg, t) => [
        arg(listingResourceID, t.UInt64),
        arg(listingAddress, t.Address),
        arg(listingAddress, t.Optional(t.Address)),
      ],
      limit: 9999,
    })
  }

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

const handleDapperPurchaseListing = async (
  cadence: string,
  listingId: string,
  listingResourceID: string,
  listingAddress: string,
  price: string
) => {
  const transactionId = await fcl.mutate({
    cadence,
    args: (arg, t) => [
      arg(listingAddress, t.Address),
      arg(listingResourceID, t.UInt64),
      arg(price, t.UFix64),
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
