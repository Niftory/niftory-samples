import FungibleToken from 0xf233dcee88fe0abe
import FlowToken from 0x1654653399040a61
import NonFungibleToken from 0x1d7e57aa55817448
import MetadataViews from 0x1d7e57aa55817448

import NFTStorefrontV2 from 0x4eb8a10cb9f87357
import TokenForwarding from 0xe544175ee0461c4b
import DapperUtilityCoin from 0xead892083b3e2c6c

import NiftoryNonFungibleToken from 0x7ec1f607f0872a9e
import NiftoryNFTRegistry from 0x7ec1f607f0872a9e
import NiftoryNonFungibleTokenProxy from 0x7ec1f607f0872a9e

transaction(
  merchantAccountAddress: Address,
  registryAddress: Address,
  brand: String,
  nftId: UInt64?,
  nftTypeRef: String,
  setId: Int?,
  templateId: Int?,
  price: UFix64,
  expiry: UInt64
) {

  // Static params - change these to customize these transactions statically
  let forwarderStoragePath: StoragePath
  let forwarderReceiverPath: PublicPath
  let dapperStoragePath: StoragePath
  let dapperReceiverPath: PublicPath
  let dapperAddress: Address
  let nftType: Type
  let salePaymentVaultType: Type

  // Niftory assets
  let nftManager:
    &{NiftoryNonFungibleToken.ManagerPublic,
      NiftoryNonFungibleToken.ManagerPrivate
    }
  let storefront:
    &NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic,
      NFTStorefrontV2.StorefrontManager
    }
  let sellerPaymentReceiver: Capability<&{FungibleToken.Receiver}>
  let niftoryCollection: &{NonFungibleToken.Receiver}
  let nftProvider: Capability<&{
    NonFungibleToken.Provider,
    NonFungibleToken.CollectionPublic
  }>

  // Dapper assets
  let mainUtilityCoinVault: &FungibleToken.Vault
  let balanceBeforeTransfer: UFix64
  let paymentVault: @FungibleToken.Vault

  // Buyer assets
  let buyerCollection: &{NonFungibleToken.Receiver}

  prepare(
    niftory: AuthAccount,
    dapper: AuthAccount,
    buyer: AuthAccount
  ) {

    ////////////
    // Params //
    ////////////

    self.forwarderStoragePath = /storage/dapperUtilityCoinReceiver
    self.forwarderReceiverPath = /public/dapperUtilityCoinReceiver
    self.dapperStoragePath = /storage/dapperUtilityCoinVault
    self.dapperReceiverPath = /public/dapperUtilityCoinReceiver
    self.dapperAddress = Address(0xead892083b3e2c6c)
    self.nftType = CompositeType(nftTypeRef)!
    self.salePaymentVaultType = Type<@DapperUtilityCoin.Vault>()

    /////////////////
    // NFT Manager //
    /////////////////

    let record = NiftoryNFTRegistry.getRegistryRecord(registryAddress, brand)
    self.nftManager = niftory
                      .getCapability<&{
                        NiftoryNonFungibleTokenProxy.Private,
                        NiftoryNonFungibleTokenProxy.Public
                      }>(
                        NiftoryNonFungibleTokenProxy.PRIVATE_PATH
                      ).borrow()!.access(
                        registryAddress: registryAddress,
                        brand: brand
                      )!
    let paths = NiftoryNFTRegistry
      .getCollectionPaths(registryAddress, brand)

    ////////////////
    // Storefront //
    ////////////////

    if niftory.borrow<&NFTStorefrontV2.Storefront>(
      from: NFTStorefrontV2.StorefrontStoragePath
    ) == nil {
      let storefront <- NFTStorefrontV2.createStorefront()
      niftory.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)
      niftory.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
        NFTStorefrontV2.StorefrontPublicPath,
        target: NFTStorefrontV2.StorefrontStoragePath
      )
    }

    self.storefront = niftory.borrow
      <&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic,
        NFTStorefrontV2.StorefrontManager
      } >(from: NFTStorefrontV2.StorefrontStoragePath)!

    /////////////////////////////
    // Dapper Token Forwarding //
    /////////////////////////////

    if niftory.borrow<&TokenForwarding.Forwarder>(
      from: self.forwarderStoragePath
    ) == nil {
      let dapper = getAccount(self.dapperAddress)
      let receiver = dapper.getCapability(self.dapperReceiverPath)
      let forwarder <- TokenForwarding.createNewForwarder(recipient: receiver)
      niftory.save(<-forwarder, to: self.forwarderStoragePath)
      niftory.link<&{FungibleToken.Receiver}>(
        self.forwarderReceiverPath,
        target: self.forwarderStoragePath
      )
    }

    self.sellerPaymentReceiver = niftory
      .getCapability<&{FungibleToken.Receiver}>(self.forwarderReceiverPath)
    assert(
      self.sellerPaymentReceiver.borrow() != nil,
      message: "Missing or mis-typed UtilityCoin receiver"
    )

    //////////////////////////
    // Collection (Niftory) //
    //////////////////////////

    if niftory.borrow<&NonFungibleToken.Collection>(
      from: paths.storage
    ) == nil {
      let collection <- self.nftManager
        .getNFTCollectionData()
        .createEmptyCollection()
      niftory.save(<-collection, to: paths.storage)
    }

    if (niftory.getCapability
      <&{
        NonFungibleToken.Receiver,
        NonFungibleToken.CollectionPublic,
        MetadataViews.ResolverCollection,
        NiftoryNonFungibleToken.CollectionPublic
      }>(paths.public).borrow() == nil)
    {
      niftory.unlink(paths.public)
      niftory.link
        <&{
          NonFungibleToken.Receiver,
          NonFungibleToken.CollectionPublic,
          MetadataViews.ResolverCollection,
          NiftoryNonFungibleToken.CollectionPublic
        }>(
          paths.public,
          target: paths.storage
        )
    }

    if (niftory.getCapability
      <&{
        NonFungibleToken.Provider,
        NonFungibleToken.CollectionPublic,
        MetadataViews.ResolverCollection,
        NiftoryNonFungibleToken.CollectionPrivate,
        NiftoryNonFungibleToken.CollectionPublic
      }>(
        paths.private
      ).borrow() == nil)
    {
      niftory.unlink(paths.private)
      niftory.link
        <&{
          NonFungibleToken.Provider,
          NonFungibleToken.CollectionPublic,
          MetadataViews.ResolverCollection,
          NiftoryNonFungibleToken.CollectionPrivate,
          NiftoryNonFungibleToken.CollectionPublic
        }>(
          paths.private,
          target: paths.storage
        )
    }

    self.niftoryCollection = niftory.borrow
      <&{NonFungibleToken.Receiver}>(
        from: paths.storage
      ) ?? panic("Cannot borrow NFT collection receiver from account")

    self.nftProvider = niftory.getCapability<&{
      NonFungibleToken.Provider,
      NonFungibleToken.CollectionPublic
    }>(paths.private)
    assert(
      self.nftProvider.borrow() != nil,
      message: "Missing or mis-typed collection provider"
    )

    ////////////
    // Dapper //
    ////////////

    self.mainUtilityCoinVault = dapper.borrow<&FungibleToken.Vault>(
      from: self.dapperStoragePath
    )
      ?? panic("Cannot borrow UtilityCoin vault from account storage")
    self.balanceBeforeTransfer = self.mainUtilityCoinVault.balance
    self.paymentVault <- self.mainUtilityCoinVault.withdraw(
      amount: price
    )

    ////////////////////////
    // Collection (Buyer) //
    ////////////////////////

    if buyer.borrow<&NonFungibleToken.Collection>(
      from: paths.storage
    ) == nil {
      let collection <- self.nftManager
        .getNFTCollectionData()
        .createEmptyCollection()
      buyer.save(<-collection, to: paths.storage)
    }

    if (buyer.getCapability
      <&{
        NonFungibleToken.Receiver,
        NonFungibleToken.CollectionPublic,
        MetadataViews.ResolverCollection,
        NiftoryNonFungibleToken.CollectionPublic
      }>(paths.public).borrow() == nil)
    {
      buyer.unlink(paths.public)
      buyer.link
        <&{
          NonFungibleToken.Receiver,
          NonFungibleToken.CollectionPublic,
          MetadataViews.ResolverCollection,
          NiftoryNonFungibleToken.CollectionPublic
        }>(
          paths.public,
          target: paths.storage
        )
    }

    if (buyer.getCapability
      <&{
        NonFungibleToken.Provider,
        NonFungibleToken.CollectionPublic,
        MetadataViews.ResolverCollection,
        NiftoryNonFungibleToken.CollectionPrivate,
        NiftoryNonFungibleToken.CollectionPublic
      }>(
        paths.private
      ).borrow() == nil)
    {
      buyer.unlink(paths.private)
      buyer.link
        <&{
          NonFungibleToken.Provider,
          NonFungibleToken.CollectionPublic,
          MetadataViews.ResolverCollection,
          NiftoryNonFungibleToken.CollectionPrivate,
          NiftoryNonFungibleToken.CollectionPublic
        }>(
          paths.private,
          target: paths.storage
        )
    }

    // Get the collection from the buyer so the NFT can be deposited into it
    self.buyerCollection = buyer.borrow
      <&{NonFungibleToken.Receiver}>(
        from: paths.storage
      ) ?? panic("Cannot borrow NFT collection receiver from account")
  }

  pre {
    (nftId == nil && setId != nil && templateId != nil)
      || (nftId != nil)
      : "Either nftId or (setId and templateId) must be provided, but not both"
  }

  execute {

    //////////
    // Mint //
    //////////

    var actualNftId: UInt64 = 0
    if nftId != nil {
      actualNftId = nftId!
    } else {
      let nft <-! self.nftManager.mint(setId: setId!, templateId: templateId!)
      actualNftId = nft.id
      self.niftoryCollection.deposit(token: <-nft)
    }

    //////////
    // List //
    //////////

    let saleCut = NFTStorefrontV2.SaleCut(
      receiver: self.sellerPaymentReceiver,
      amount: price
    )

    let listingResourceID = self.storefront.createListing(
      nftProviderCapability: self.nftProvider,
      nftType: self.nftType,
      nftID: actualNftId,
      salePaymentVaultType: self.salePaymentVaultType,
      saleCuts: [saleCut],
      marketplacesCapability: [],
      customID: nil,
      commissionAmount: 0.0,
      expiry: expiry
    )

    //////////////
    // Purchase //
    //////////////

    let listing = self.storefront
      .borrowListing(listingResourceID: listingResourceID)
      ?? panic("No Offer with that ID in Storefront")

    let item <- listing.purchase(
      payment: <-self.paymentVault,
      commissionRecipient: nil
    )

    self.buyerCollection.deposit(token: <-item)
  }

  // Check that all utilityCoin was routed back to Dapper
  post {
    self.mainUtilityCoinVault.balance ==
      self.balanceBeforeTransfer: "UtilityCoin leakage"
  }
}
