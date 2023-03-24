import axios from "axios"
import { gql } from "graphql-request"
import { useQuery } from "urql"
import { ContractDocument, ContractQuery, MarketplaceListing } from "../../generated/graphql"
import * as fcl from "@onflow/fcl"

gql`
  query contract {
    contract {
      name
      address
    }
  }
`

const nonFungibleTokenAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS
const niftoryAddress = process.env.NEXT_PUBLIC_NIFTORY_ADDRESS
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const flowTokenAddress = process.env.NEXT_PUBLIC_FLOW_TOKEN_ADDRESS //${flowTokenAddress}
const fungibleTokenAddress = process.env.NEXT_PUBLIC_FUNGIBLE_TOKEN //${fungibleTokenAddress}
const storefrontAddress = process.env.NEXT_PUBLIC_NFT_STOREFRONT_ADDRESS //${storefrontAddress}

const CREATE_MARKETPLACE_LISTING_SCRIPT = `import {contractName} from {contractAddress}
import NiftoryNonFungibleToken from ${niftoryAddress}
import NonFungibleToken from ${nonFungibleTokenAddress}
import MetadataViews from ${nonFungibleTokenAddress}
import FlowToken from ${flowTokenAddress}
import FungibleToken from ${fungibleTokenAddress}
import NFTStorefrontV2 from ${storefrontAddress}
// This transaction was auto-generated with the NFT Catalog (https://github.com/dapperlabs/nft-catalog)
//
// This transaction facilitates the listing of an NFT with the StorefrontV2 contract
// 
// Collection Identifier: {contractName}
// Vault Identifier: flow
//
// Version: 0.1.1

transaction(saleItemID: UInt64, saleItemPrice: UFix64, customID: String?, commissionAmount: UFix64, expiry: UInt64, marketplacesAddress: [Address]) {
    /// "saleItemID" - ID of the NFT that is put on sale by the seller.
    /// "saleItemPrice" - Amount of tokens (FT) buyer needs to pay for the purchase of listed NFT.
    /// "customID" - Optional string to represent identifier of the dapp.
    /// "commissionAmount" - Commission amount that will be taken away by the purchase facilitator.
    /// "expiry" - Unix timestamp at which created listing become expired.
    /// "marketplacesAddress" - List of addresses that are allowed to get the commission.
    let ftReceiver: Capability<&AnyResource{FungibleToken.Receiver}>
    let nftProvider: Capability<&AnyResource{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefrontV2.Storefront
    var saleCuts: [NFTStorefrontV2.SaleCut]
    var marketplacesCapability: [Capability<&AnyResource{FungibleToken.Receiver}>]

    prepare(acct: AuthAccount) {
        self.saleCuts = []
        self.marketplacesCapability = []

        // Set up FT to make sure this account can receive the proper currency
        if acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) == nil {
            let vault <- FlowToken.createEmptyVault()
            acct.save(<-vault, to: /storage/flowTokenVault)
        }

        if acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver,FungibleToken.Balance}>(/public/flow).borrow() == nil {
            acct.unlink(/public/flow)
            acct.link<&FlowToken.Vault{FungibleToken.Receiver,FungibleToken.Balance}>(/public/flow,target: /storage/flowTokenVault)
        }
        
        // Set up NFT to make sure this account has NFT setup correctly
        if acct.borrow<&{contractName}.Collection>(from: /storage/${clientId}_{contractName}_nft_collection) == nil {
            let collection <- {contractName}.createEmptyCollection()
            acct.save(<-collection, to: /storage/${clientId}_{contractName}_nft_collection)
        }
        if (acct.getCapability<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/${clientId}_{contractName}_nft_collection).borrow() == nil) {
            acct.unlink(/public/${clientId}_{contractName}_nft_collection)
            acct.link<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/${clientId}_{contractName}_nft_collection, target: /storage/${clientId}_{contractName}_nft_collection)
        }

        if (acct.getCapability<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/${clientId}_{contractName}_nft_collection).borrow() == nil) {
            acct.unlink(/private/${clientId}_{contractName}_nft_collection)
            acct.link<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/${clientId}_{contractName}_nft_collection, target: /storage/${clientId}_{contractName}_nft_collection)
        }

        // Receiver for the sale cut.
        self.ftReceiver = acct.getCapability<&{FungibleToken.Receiver}>(/public/flow)!
        assert(self.ftReceiver.borrow() != nil, message: "Missing or mis-typed Fungible Token receiver")

        self.nftProvider = acct.getCapability<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(/private/${clientId}_{contractName}_nft_collection)!
        let collectionRef = acct
            .getCapability(/public/${clientId}_{contractName}_nft_collection)
            .borrow<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>()
            ?? panic("Could not borrow a reference to the collection")
        var totalRoyaltyCut = 0.0
        let effectiveSaleItemPrice = saleItemPrice - commissionAmount

        let nft = collectionRef.borrowViewResolver(id: saleItemID)!       
        if (nft.getViews().contains(Type<MetadataViews.Royalties>())) {
            let royaltiesRef = nft.resolveView(Type<MetadataViews.Royalties>()) ?? panic("Unable to retrieve the royalties")
            let royalties = (royaltiesRef as! MetadataViews.Royalties).getRoyalties()
            for royalty in royalties {
                // TODO - Verify the type of the vault and it should exists
                self.saleCuts.append(NFTStorefrontV2.SaleCut(receiver: royalty.receiver, amount: royalty.cut * effectiveSaleItemPrice))
                totalRoyaltyCut = totalRoyaltyCut + royalty.cut * effectiveSaleItemPrice
            }
        }

        // Append the cut for the seller.
        self.saleCuts.append(NFTStorefrontV2.SaleCut(
            receiver: self.ftReceiver,
            amount: effectiveSaleItemPrice - totalRoyaltyCut
        ))
        assert(self.nftProvider.borrow() != nil, message: "Missing or mis-typed nftProvider")


        if acct.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) == nil {
            // Create a new empty Storefront
            let storefront <- NFTStorefrontV2.createStorefront() as! @NFTStorefrontV2.Storefront
            // save it to the account
            acct.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)
            // create a public capability for the Storefront
            acct.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath, target: NFTStorefrontV2.StorefrontStoragePath)
        }
        self.storefront = acct.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath)
            ?? panic("Missing or mis-typed NFTStorefront Storefront")

        for marketplace in marketplacesAddress {
            self.marketplacesCapability.append(getAccount(marketplace).getCapability<&{FungibleToken.Receiver}>(/public/flow))
        }
    }

    execute {
        // Create listing
        self.storefront.createListing(
            nftProviderCapability: self.nftProvider,
            nftType: Type<@{contractName}.NFT>(),
            nftID: saleItemID,
            salePaymentVaultType: Type<@FlowToken.Vault>(),
            saleCuts: self.saleCuts,
            marketplacesCapability: self.marketplacesCapability.length == 0 ? nil : self.marketplacesCapability,
            customID: customID,
            commissionAmount: commissionAmount,
            expiry: expiry
        )
    }
}`

const PURCHASE_MARKETPLACE_LISTING_SCRIPT = `import {contractName} from {contractAddress}
import NiftoryNonFungibleToken from ${niftoryAddress}
import NonFungibleToken from ${nonFungibleTokenAddress}
import MetadataViews from ${nonFungibleTokenAddress}
import FlowToken from ${flowTokenAddress}
import FungibleToken from ${fungibleTokenAddress}
import NFTStorefrontV2 from ${storefrontAddress}
// This transaction was auto-generated with the NFT Catalog (https://github.com/dapperlabs/nft-catalog)
//
// This transaction facilitates the purchase of a listed NFT with the StorefrontV2 contract 
// 
// Collection Identifier: {contractName}
// Vault Identifier: flow
//
// Version: 0.1.1

transaction(listingResourceID: UInt64, storefrontAddress: Address, commissionRecipient: Address?) {
    /// "listingResourceID" - ID of the Storefront listing resource
    /// "storefrontAddress" - The address that owns the storefront listing
    /// "commissionRecipient" - Optional recipient for transaction commission if comission exists.
    let paymentVault: @FungibleToken.Vault
    let nftCollection: &{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}
    let storefront: &NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}
    let listing: &NFTStorefrontV2.Listing{NFTStorefrontV2.ListingPublic}
    var commissionRecipientCap: Capability<&{FungibleToken.Receiver}>?

    prepare(acct: AuthAccount) {
        self.commissionRecipientCap = nil

        // Set up NFT to make sure this account has NFT setup correctly
        if acct.borrow<&{contractName}.Collection>(from: /storage/${clientId}_{contractName}_nft_collection) == nil {
            let collection <- {contractName}.createEmptyCollection()
            acct.save(<-collection, to: /storage/${clientId}_{contractName}_nft_collection)
            }
        if (acct.getCapability<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/${clientId}_{contractName}_nft_collection).borrow() == nil) {
            acct.unlink(/public/${clientId}_{contractName}_nft_collection)
            acct.link<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/${clientId}_{contractName}_nft_collection, target: /storage/${clientId}_{contractName}_nft_collection)
        }

        if (acct.getCapability<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/${clientId}_{contractName}_nft_collection).borrow() == nil) {
            acct.unlink(/private/${clientId}_{contractName}_nft_collection)
            acct.link<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(/private/${clientId}_{contractName}_nft_collection, target: /storage/${clientId}_{contractName}_nft_collection)
        }
        
        // Access the storefront public resource of the seller to purchase the listing.
        self.storefront = getAccount(storefrontAddress)
            .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
                NFTStorefrontV2.StorefrontPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow Storefront from provided address")

        // Borrow the listing
        self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
                    ?? panic("No Offer with that ID in Storefront")
        let price = self.listing.getDetails().salePrice

        // Access the vault of the buyer to pay the sale price of the listing.
        let mainFTVault = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow Fungible Token vault from acct storage")
        self.paymentVault <- mainFTVault.withdraw(amount: price)

        // Access the buyer's NFT collection to store the purchased NFT.
        self.nftCollection = acct.borrow<&{contractName}.Collection{NiftoryNonFungibleToken.CollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(
            from: /storage/${clientId}_{contractName}_nft_collection
        ) ?? panic("Cannot borrow NFT collection receiver from account")

        // Fetch the commission amt.
        let commissionAmount = self.listing.getDetails().commissionAmount

        if commissionRecipient != nil && commissionAmount != 0.0 {
            // Access the capability to receive the commission.
            let _commissionRecipientCap = getAccount(commissionRecipient!).getCapability<&{FungibleToken.Receiver}>(/public/flow)
            assert(_commissionRecipientCap.check(), message: "Commission Recipient doesn't have flowtoken receiving capability")
            self.commissionRecipientCap = _commissionRecipientCap
        } else if commissionAmount == 0.0 {
            self.commissionRecipientCap = nil
        } else {
            panic("Commission recipient can not be empty when commission amount is non zero")
        }
    }

    execute {
        // Purchase the NFT
        let item <- self.listing.purchase(
            payment: <-self.paymentVault,
            commissionRecipient: self.commissionRecipientCap
        )
        // Deposit the NFT in the buyer's collection.
        self.nftCollection.deposit(token: <-item)
    }
}`

const CANCEL_MARKETPLACE_LISTING_SCRIPT = `import NFTStorefrontV2 from ${storefrontAddress}
// This transaction was auto-generated with the NFT Catalog (https://github.com/dapperlabs/nft-catalog)
//
// This transaction facilitates the removal of a listing with the StorefrontV2 contract
// 
// Collection Identifier: {contractName}
//
// Version: 0.1.1

transaction(listingResourceID: UInt64) {
    /// "listingResourceID" - ID of the Storefront listing resource
    
    let storefront: &NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontManager}

    prepare(acct: AuthAccount) {
        self.storefront = acct.borrow<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontManager}>(from: NFTStorefrontV2.StorefrontStoragePath)
            ?? panic("Missing or mis-typed NFTStorefrontV2.Storefront")
    }

    execute {
        self.storefront.removeListing(listingResourceID: listingResourceID)
    }
}`

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

    createMarketplaceListing = (nftId, blockchainId, price) =>
      handleCreateListing(createMarketplaceListingScript, nftId, blockchainId, price)

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
