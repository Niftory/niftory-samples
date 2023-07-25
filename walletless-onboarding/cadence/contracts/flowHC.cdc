/*
flowHC

This is the contract for flowHC NFTs! 

This was implemented using Niftory interfaces. For full details on how this
contract functions, please see the Niftory and NFTRegistry contracts.
*/
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20

import MutableMetadata from 0x04f74f0252479aed
import MutableMetadataTemplate from 0x04f74f0252479aed
import MutableMetadataSet from 0x04f74f0252479aed
import MutableMetadataSetManager from 0x04f74f0252479aed
import MetadataViewsManager from 0x04f74f0252479aed

import NiftoryNonFungibleToken from 0x04f74f0252479aed
import NiftoryNFTRegistry from 0x04f74f0252479aed

import NiftoryMetadataViewsResolvers from 0x04f74f0252479aed

import NiftoryNonFungibleTokenProxy from 0x04f74f0252479aed

pub contract flowHC: NonFungibleToken {

  // ========================================================================
  // Constants 
  // ========================================================================

  // Suggested paths where collection could be stored
  pub let COLLECTION_PRIVATE_PATH: PrivatePath
  pub let COLLECTION_PUBLIC_PATH: PublicPath
  pub let COLLECTION_STORAGE_PATH: StoragePath

  // Accessor token to be used with NiftoryNFTRegistry to retrieve
  // meta-information about this NFT project
  pub let REGISTRY_ADDRESS: Address
  pub let REGISTRY_BRAND: String

  // ========================================================================
  // Attributes
  // ========================================================================

  // Arbitrary metadata for this NFT contract
  pub var metadata: AnyStruct?

  // Number of NFTs created
  pub var totalSupply: UInt64

  // ========================================================================
  // Contract Events
  // ========================================================================

  // This contract was initialized
  pub event ContractInitialized()

  // A withdrawal of NFT `id` has occurred from the `from` Address
  pub event Withdraw(id: UInt64, from: Address?)

  // A deposit of an NFT `id` has occurred to the `to` Address
  pub event Deposit(id: UInt64, to: Address?)

  // An NFT being minted from a given Template within a given Set
  pub event NFTMinted(id: UInt64, setId: Int, templateId: Int, serial: UInt64)

  // An NFT was minted

  // An NFT was burned

  // ========================================================================
  // NFT
  // ========================================================================

  pub resource NFT:
    NonFungibleToken.INFT,
    MetadataViews.Resolver,
    NiftoryNonFungibleToken.NFTPublic
  {
    pub let id: UInt64
    pub let setId: Int
    pub let templateId: Int
    pub let serial: UInt64

    pub fun contract(): &{NiftoryNonFungibleToken.ManagerPublic} {
      return flowHC.contract()
    }

    pub fun set(): &MutableMetadataSet.Set{MutableMetadataSet.Public} {
      return self
        .contract()
        .getSetManagerPublic()
        .getSet(self.setId)
    }
  
    pub fun metadata(): &MutableMetadata.Metadata{MutableMetadata.Public} {
      return self
        .set()
        .getTemplate(self.templateId)
        .metadata()
    }

    pub fun getViews(): [Type] {
      return self
        .contract()
        .getMetadataViewsManagerPublic()
        .getViews()
    }

    pub fun resolveView(_ view: Type): AnyStruct? {
      let nftRef = &self as &{NiftoryNonFungibleToken.NFTPublic}
      return self
        .contract()
        .getMetadataViewsManagerPublic()
        .resolveView(view: view, nftRef: nftRef)
    }

    init(setId: Int, templateId: Int, serial: UInt64) {
      self.id = flowHC.totalSupply
      flowHC.totalSupply =
        flowHC.totalSupply + 1
      self.setId = setId
      self.templateId = templateId
      self.serial = serial
    }
  }

  // ========================================================================
  // Collection
  // ========================================================================

  pub resource Collection:
    NonFungibleToken.Provider,
    NonFungibleToken.Receiver,
    NonFungibleToken.CollectionPublic,
    MetadataViews.ResolverCollection,
    NiftoryNonFungibleToken.CollectionPublic,
    NiftoryNonFungibleToken.CollectionPrivate
  {
    pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

    pub fun contract(): &{NiftoryNonFungibleToken.ManagerPublic} {
      return flowHC.contract()
    }

    pub fun getIDs(): [UInt64] {
      return self.ownedNFTs.keys
    }

    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
      pre {
        self.ownedNFTs[id] != nil : "NFT "
          .concat(id.toString())
          .concat(" does not exist in collection.")
      }
      return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
    }
  
    pub fun borrow(id: UInt64): &NFT{NiftoryNonFungibleToken.NFTPublic} {
      pre {
        self.ownedNFTs[id] != nil : "NFT does not exist in collection."
      }
      let nftRef = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
      let fullNft = nftRef as! &NFT
      return fullNft as &NFT{NiftoryNonFungibleToken.NFTPublic}
    }
  
    pub fun borrowViewResolver(id: UInt64): &{MetadataViews.Resolver} {
      pre {
        self.ownedNFTs[id] != nil : "NFT does not exist in collection."
      }
      let nftRef = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
      let fullNft = nftRef as! &NFT
      return fullNft as &{MetadataViews.Resolver}
    }

    pub fun deposit(token: @NonFungibleToken.NFT) {
      let token <- token as! @flowHC.NFT
      let id: UInt64 = token.id
      let oldToken <- self.ownedNFTs[id] <- token
      emit Deposit(id: id, to: self.owner?.address)
      destroy oldToken
    }

    pub fun depositBulk(tokens: @[NonFungibleToken.NFT]) {
      while tokens.length > 0 {
        let token <- tokens.removeLast() as! @flowHC.NFT
        self.deposit(token: <-token)
      }
      destroy tokens
    }

    pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
      pre {
        self.ownedNFTs[withdrawID] != nil
          : "NFT "
            .concat(withdrawID.toString())
            .concat(" does not exist in collection.")
      }
      let token <-self.ownedNFTs.remove(key: withdrawID)!
      emit Withdraw(id: token.id, from: self.owner?.address)
      return <-token
    }

    pub fun withdrawBulk(withdrawIDs: [UInt64]): @[NonFungibleToken.NFT] {
      let tokens: @[NonFungibleToken.NFT] <- []
      while withdrawIDs.length > 0 {
        tokens.append(<- self.withdraw(withdrawID: withdrawIDs.removeLast()))
      }
      return <-tokens
    }
    init() {
      self.ownedNFTs <- {}
    }
    
    destroy() {
      destroy self.ownedNFTs
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <-create Collection()
  }

  // ========================================================================
  // Manager
  // ========================================================================

  pub resource Manager:
    NiftoryNonFungibleToken.ManagerPublic,
    NiftoryNonFungibleToken.ManagerPrivate 
  {

    pub fun metadata(): AnyStruct? {
      return flowHC.metadata
    }

    pub fun getSetManagerPublic():
      &MutableMetadataSetManager.Manager{MutableMetadataSetManager.Public}
    {
      return NiftoryNFTRegistry
        .getSetManagerPublic(
          flowHC.REGISTRY_ADDRESS,
          flowHC.REGISTRY_BRAND
        )
    }

    pub fun getMetadataViewsManagerPublic():
      &MetadataViewsManager.Manager{MetadataViewsManager.Public}
    {
      return NiftoryNFTRegistry
        .getMetadataViewsManagerPublic(
          flowHC.REGISTRY_ADDRESS,
          flowHC.REGISTRY_BRAND
        )
    }

    pub fun getNFTCollectionData(): MetadataViews.NFTCollectionData {
      return NiftoryNFTRegistry
        .buildNFTCollectionData(
          flowHC.REGISTRY_ADDRESS,
          flowHC.REGISTRY_BRAND,
          (fun (): @NonFungibleToken.Collection {
            return <-flowHC.createEmptyCollection()
          })
        )
    }

    ////////////////////////////////////////////////////////////////////////////

    pub fun modifyContractMetadata(): auth &AnyStruct {
      let maybeMetadata = flowHC.metadata
      if maybeMetadata == nil {
        let blankMetadata: {String: String} = {}
        flowHC.metadata = blankMetadata
      }
      return (&flowHC.metadata as auth &AnyStruct?)!
    }

    pub fun replaceContractMetadata(_ metadata: AnyStruct?) {
      flowHC.metadata = metadata
    }

    ////////////////////////////////////////////////////////////////////////////

    access(self) fun _getMetadataViewsManagerPrivate():
      &MetadataViewsManager.Manager{MetadataViewsManager.Private}
    {
      let record = 
        NiftoryNFTRegistry.getRegistryRecord(
          flowHC.REGISTRY_ADDRESS,
          flowHC.REGISTRY_BRAND
        )
      let manager = 
        flowHC.account
          .getCapability<&MetadataViewsManager.Manager{MetadataViewsManager.Private}>(
            record.metadataViewsManager.paths.private
          ).borrow()!
      return manager
    }

    pub fun lockMetadataViewsManager() {
      self._getMetadataViewsManagerPrivate().lock()
    }

    pub fun setMetadataViewsResolver(
      _ resolver: {MetadataViewsManager.Resolver}
    ) {
      self._getMetadataViewsManagerPrivate().addResolver(resolver)
    }
    
    pub fun removeMetadataViewsResolver(_ type: Type) {
      self._getMetadataViewsManagerPrivate().removeResolver(type)
    }

    ////////////////////////////////////////////////////////////////////////////

    access(self) fun _getSetManagerPrivate():
      &MutableMetadataSetManager.Manager{MutableMetadataSetManager.Public, MutableMetadataSetManager.Private}
    {
      let record = 
        NiftoryNFTRegistry.getRegistryRecord(
          flowHC.REGISTRY_ADDRESS,
          flowHC.REGISTRY_BRAND
        )
      let setManager = 
        flowHC.account
          .getCapability<&MutableMetadataSetManager.Manager{MutableMetadataSetManager.Public, MutableMetadataSetManager.Private}>(
            record.setManager.paths.private
          ).borrow()!
      return setManager
    }

    pub fun setMetadataManagerName(_ name: String) {
      self._getSetManagerPrivate().setName(name)
    }

    pub fun setMetadataManagerDescription(_ description: String) {
      self._getSetManagerPrivate().setDescription(description)
    }

    pub fun addSet(_ set: @MutableMetadataSet.Set) {
      self._getSetManagerPrivate().addSet(<-set)
    }

    ////////////////////////////////////////////////////////////////////////////

    access(self) fun _getSetMutable(_ setId: Int): 
      &MutableMetadataSet.Set{MutableMetadataSet.Private} {
      return self._getSetManagerPrivate().getSetMutable(setId)
    }

    pub fun lockSet(setId: Int) {
      self._getSetMutable(setId).lock()
    }
    
    pub fun lockSetMetadata(setId: Int) {
      self._getSetMutable(setId).metadataMutable().lock()
    }

    pub fun modifySetMetadata(setId: Int): auth &AnyStruct {
      return self._getSetMutable(setId).metadataMutable().getMutable()
    }
    
    pub fun replaceSetMetadata(setId: Int, new: AnyStruct) {
      self._getSetMutable(setId).metadataMutable().replace(new)
    }

    pub fun addTemplate(setId: Int, template: @MutableMetadataTemplate.Template) {
      self._getSetMutable(setId).addTemplate(<-template)
    }
    
    ////////////////////////////////////////////////////////////////////////////

    access(self) fun _getTemplateMutable(_ setId: Int, _ templateId: Int):
      &MutableMetadataTemplate.Template{MutableMetadataTemplate.Public, MutableMetadataTemplate.Private} {
      return self._getSetMutable(setId).getTemplateMutable(templateId)
    }
    
    pub fun lockTemplate(setId: Int, templateId: Int) {
      self._getTemplateMutable(setId, templateId).lock()
    }

    pub fun setTemplateMaxMint(setId: Int, templateId: Int, max: UInt64) {
      self._getTemplateMutable(setId, templateId).setMaxMint(max)
    }
    
    pub fun mint(setId: Int, templateId: Int): @NonFungibleToken.NFT {
      let template = self._getTemplateMutable(setId, templateId)
      template.registerMint()
      let serial = template.minted()
      let nft <-create NFT(
        setId: setId,
        templateId: templateId,
        serial: serial
      )
      emit NFTMinted(id: nft.id, setId: setId, templateId: templateId, serial: serial)
      return <-nft
    }

    pub fun mintBulk(
      setId: Int,
      templateId: Int,
      numToMint: UInt64,
    ): @[NonFungibleToken.NFT] {
      let template = self._getTemplateMutable(setId, templateId)
      let nfts: @[NonFungibleToken.NFT] <- []
      var leftToMint = numToMint
      while leftToMint > 0 {
        template.registerMint()
        let serial = template.minted()
        let nft <-create NFT(
          setId: setId,
          templateId: templateId,
          serial: serial
        )
        emit NFTMinted(id: nft.id, setId: setId, templateId: templateId, serial: serial)
        nfts.append(<-nft)
        leftToMint = leftToMint - 1
      }
      return <-nfts
    }

    ////////////////////////////////////////////////////////////////////////////

    access(self) fun _getNFTMetadata(_ setId: Int, _ templateId: Int):
      &MutableMetadata.Metadata{MutableMetadata.Public, MutableMetadata.Private} {
        return self._getTemplateMutable(setId, templateId).metadataMutable()
      }
    
    pub fun lockNFTMetadata(setId: Int, templateId: Int) {
      self._getNFTMetadata(setId, templateId).lock()
    }

    pub fun modifyNFTMetadata(setId: Int, templateId: Int): auth &AnyStruct {
      return self._getNFTMetadata(setId, templateId).getMutable()
    }
    
    pub fun replaceNFTMetadata(setId: Int, templateId: Int, new: AnyStruct) {
      self._getNFTMetadata(setId, templateId).replace(new)
    }
  }

  // ========================================================================
  // Contract functions
  // ========================================================================

  pub fun contract(): &{NiftoryNonFungibleToken.ManagerPublic} {
    return NiftoryNFTRegistry
      .getNFTManagerPublic(
        flowHC.REGISTRY_ADDRESS,
        flowHC.REGISTRY_BRAND
      )
  }

  // ========================================================================
  // Init
  // ========================================================================

  init(
    nftManagerProxy: &{
      NiftoryNonFungibleTokenProxy.Public,
      NiftoryNonFungibleTokenProxy.Private
    }
  ) {

    let record = NiftoryNFTRegistry.generateRecord(
      account: self.account.address,
      project: "clk7528xu001nl80vvt2q9gck_flowHC"
    )

    self.REGISTRY_ADDRESS = 0x6085ae87e78e1433
    self.REGISTRY_BRAND = "clk7528xu001nl80vvt2q9gck_flowHC"

    self.COLLECTION_PUBLIC_PATH = record.collectionPaths.public
    self.COLLECTION_PRIVATE_PATH = record.collectionPaths.private
    self.COLLECTION_STORAGE_PATH = record.collectionPaths.storage

    // No metadata to start with
    self.metadata = nil

    // Initialize the total supply to 0.
    self.totalSupply = 0

    // The Manager for this NFT
    //
    // NFT Manager storage
    let nftManager <- create Manager()

    // Save a MutableSetManager to this contract's storage, as the source of
    // this NFT contract's metadata.
    //
    // MutableMetadataSetManager storage
    self
      .account
      .save<@MutableMetadataSetManager.Manager>(
        <-MutableMetadataSetManager.create(
          name: "flowHC",
          description: "The set manager for flowHC."
        ),
        to: record.setManager.paths.storage
      )

    // MutableMetadataSetManager public
    self
      .account
      .link<&MutableMetadataSetManager.Manager{MutableMetadataSetManager.Public}>(
        record.setManager.paths.public,
        target: record.setManager.paths.storage
      )
    
    // MutableMetadataSetManager private
    self
      .account
      .link<&
        MutableMetadataSetManager.Manager{MutableMetadataSetManager.Public,
        MutableMetadataSetManager.Private
      }>(
        record.setManager.paths.private,
        target: record.setManager.paths.storage
      )

    // Save a MetadataViewsManager to this contract's storage, which will
    // allow observers to inspect standardized metadata through any of its
    // configured MetadataViews resolvers.
    //
    // MetadataViewsManager storage
    self
      .account
      .save<@MetadataViewsManager.Manager>(
        <-MetadataViewsManager.create(),
        to: record.metadataViewsManager.paths.storage
      )

    // MetadataViewsManager public
    self
      .account
      .link<&MetadataViewsManager.Manager{MetadataViewsManager.Public}>(
        record.metadataViewsManager.paths.public,
        target: record.metadataViewsManager.paths.storage
      )

    // MetadataViewsManager private
    self
      .account
      .link<&
        MetadataViewsManager.Manager{MetadataViewsManager.Private, 
        MetadataViewsManager.Public
      }>(
        record.metadataViewsManager.paths.private,
        target: record.metadataViewsManager.paths.storage
      )

    let contractName = "flowHC"

    // Royalties
    let royaltiesResolver = NiftoryMetadataViewsResolvers.RoyaltiesResolver(
        royalties: MetadataViews.Royalties([])
    )
    nftManager.setMetadataViewsResolver(royaltiesResolver)

    // Collection Data
    let collectionDataResolver
        = NiftoryMetadataViewsResolvers.NFTCollectionDataResolver()
    nftManager.setMetadataViewsResolver(collectionDataResolver)

    // Display
    let displayResolver = NiftoryMetadataViewsResolvers.DisplayResolver(
        "title",
        contractName.concat("NFT"),
        "description",
        contractName.concat(" NFT"),
        "mediaUrl",
        "ipfs://",
        "ipfs://bafybeig6la3me5x3veull7jzxmwle4sfuaguou2is3o3z44ayhe7ihlqpa/NiftoryBanner.png"
    )
    nftManager.setMetadataViewsResolver(displayResolver)

    // Collection Display
    let collectionResolver = NiftoryMetadataViewsResolvers.NFTCollectionDisplayResolver(
        "title",
        contractName,
        "description",
        contractName.concat(" Collection"),
        "domainUrl",
        "https://",
        "https://niftory.com",
        "squareImage",
        "ipfs://",
        "ipfs://bafybeihc76uodw2at2xi2l5jydpvscj5ophfpqgblbrmsfpeffhcmgdtl4/squareImage.png",
        "squareImageMediaType",
        "image/png",
        "bannerImage",
        "ipfs://",
        "ipfs://bafybeig6la3me5x3veull7jzxmwle4sfuaguou2is3o3z44ayhe7ihlqpa/NiftoryBanner.png",
        "bannerImageMediaType",
        "image/png",
        []
    )
    nftManager.setMetadataViewsResolver(collectionResolver)

    // ExternalURL
    let externalURLResolver = NiftoryMetadataViewsResolvers.ExternalURLResolver(
        "domainUrl",
        "https://",
        "https://niftory.com"
    )
    nftManager.setMetadataViewsResolver(externalURLResolver)

    // Save NFT Manager
    self
      .account
      .save<@Manager>(
        <-nftManager,
        to: record.nftManager.paths.storage
      )
    
    // NFT Manager public
    self
      .account
      .link<&{NiftoryNonFungibleToken.ManagerPublic}>(
        record.nftManager.paths.public,
        target: record.nftManager.paths.storage
      )
    
    // NFT Manager private
    self
      .account
      .link<&
        Manager{NiftoryNonFungibleToken.ManagerPublic,
        NiftoryNonFungibleToken.ManagerPrivate
      }>(
        record.nftManager.paths.private,
        target: record.nftManager.paths.storage
      )

      nftManagerProxy.add(
        registryAddress: self.REGISTRY_ADDRESS,
        brand: self.REGISTRY_BRAND,
        cap: self.account
              .getCapability<&{
                NiftoryNonFungibleToken.ManagerPrivate,
                NiftoryNonFungibleToken.ManagerPublic
              }>(
                record.nftManager.paths.private
              )
      )
  }
}
 