import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: any;
  JSON: any;
  PositiveFloat: any;
  PositiveInt: any;
  URL: any;
  Upload: any;
};

/** Current Prisma Mapping: User (with role >= MARKETER). A user of the Niftory admin portal and APIs. */
export type AdminUser = Identifiable & UserData & {
  __typename?: 'AdminUser';
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']>;
  /** This user's orgs and its roles there. */
  orgs?: Maybe<Array<Maybe<UserRoleMapping>>>;
};

/** Current Prisma Mapping: Airdrop. An airdrop used to send NFTs to users. */
export type Airdrop = Resource & {
  __typename?: 'Airdrop';
  /** A description for this airdrop. */
  description?: Maybe<Scalars['String']>;
  /** The users who will receive this airdrop, and the packaged items we're sending. */
  recipients?: Maybe<Array<Maybe<PackagedItemToUserMapping>>>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
  /** A user-friendly title for this airdrop. */
  title?: Maybe<Scalars['String']>;
};

/** Current Prisma Mapping: Org.appClient. An app in the Niftory API. */
export type App = Identifiable & {
  __typename?: 'App';
  /** The contract associated with this app. */
  contract?: Maybe<Contract>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The org this app belongs to. */
  org?: Maybe<Org>;
};

/** Current Prisma Mapping: User (with role = COLLECTOR). Represents an individual user within a particular Niftory app. */
export type AppUser = Identifiable & UserData & {
  __typename?: 'AppUser';
  /** The app this user is scoped to. */
  app?: Maybe<App>;
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']>;
  /** The wallet owned by this user. */
  wallet?: Maybe<Wallet>;
};

/** The blockchains supported by Niftory. */
export enum Blockchain {
  /** The Ethereum blockchain. https://ethereum.org/en/ */
  Ethereum = 'ETHEREUM',
  /** The Flow blockchain. https://www.onflow.org/ */
  Flow = 'FLOW',
  /** The Polygon blockchain. https://polygon.technology/ */
  Polygon = 'POLYGON'
}

/** An interface representing properties common to all objects that exist on the blockchain */
export type BlockchainEntity = {
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSON']>;
};

/** An interface representing properties common to all objects that exist on the blockchain */
export type BlockchainResource = {
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSON']>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
};

/** Current Prisma Mapping: SmartContractType. A contract on the blockchain */
export type Contract = Identifiable & {
  __typename?: 'Contract';
  /** The address at which this contract is deployed. */
  address?: Maybe<Scalars['String']>;
  /** The blockchain in which this contract is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
};

/** The input to create a [listing]({{Types.Listing}}). */
export type CreateListingInput = {
  /** The Ids of the packages to include in the [listing]({{Types.Listing}}). */
  packages: Array<InputMaybe<Scalars['ID']>>;
  /** The price in USD of the packages in the [listing]({{Types.Listing}}). */
  price: Scalars['PositiveFloat'];
};

/** A currency that can be accepted for payment. */
export enum Currency {
  /** The United States dollar. */
  Usd = 'USD'
}

/** An interface containing common data about files. */
export type File = {
  /** The MIME content type for this file. */
  contentType: Scalars['String'];
  /** The main URL for this file. */
  url: Scalars['URL'];
};

/** An interface representing objects with unique IDs */
export type Identifiable = {
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
};

/** The response from initiating a purchase checkout. */
export type InitiateCheckoutResponse = {
  __typename?: 'InitiateCheckoutResponse';
  /** The URL to redirect the user to. */
  redirectUrl?: Maybe<Scalars['URL']>;
};

/** Current Prisma Mapping: PackListing. A listing of NFTs for sale. */
export type Listing = Identifiable & Resource & {
  __typename?: 'Listing';
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The packages available in this listing */
  packages?: Maybe<Array<Maybe<Package>>>;
  /** The pricing for this listing */
  pricing?: Maybe<Pricing>;
  /** The state of this listing. */
  state?: Maybe<ListingState>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
};

/** The state of a listing. */
export enum ListingState {
  /** The listing is active and available for sale. */
  Active = 'ACTIVE',
  /** All packages in this listing have been sold. */
  Completed = 'COMPLETED',
  /** The listing is inactive, so it's not open for sale. */
  Inactive = 'INACTIVE'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Sets an inactive [listing]({{Types.Listing}}) to active, meaning that it's available for sale. */
  activateListing?: Maybe<Listing>;
  /** Initiates checkout for a reserved package. */
  checkout?: Maybe<InitiateCheckoutResponse>;
  /** Creates a new [listing]({{Types.Listing}}). */
  createListing?: Maybe<Listing>;
  /** Creates a new [NFT model]({{Types.NFTModel}}). */
  createModel?: Maybe<NftModel>;
  /** Creates a new [packaging model]({{Types.PackagingModel}}). */
  createPackagingModel?: Maybe<PackagingModel>;
  /** Creates a new [NFTSet]({{Types.NFTSet}}). */
  createSet?: Maybe<NftSet>;
  /** Sets an active [listing]({{Types.Listing}}) to inactive, meaning that it's not available for sale. */
  deactivateListing?: Maybe<Listing>;
  /** Initiates minting for a given [NFT model]({{Types.NFTmodel}}). */
  mintModel?: Maybe<NftModel>;
  /** Initiates minting for a given [NFT]({{Types.NFT}}). */
  mintNFT?: Maybe<Nft>;
  /** Packages NFTs from an existing [packaging model]({{Types.PackagingModel}}). */
  package?: Maybe<PackagingModel>;
  /** Marks a wallet as ready for the given contract, indicating that the wallet is ready to receive NFTs from the current app. The wallet must be verified before this succeeds. */
  readyWallet?: Maybe<Wallet>;
  /** Registers a wallet to the signed in user. */
  registerWallet?: Maybe<Wallet>;
  /** Reserves a package from a [listing]({{Types.Listing}}) for purchase. */
  reserve?: Maybe<Package>;
  /** Initiates the transfer of an [NFT]({{Types.NFT}}) to the currently-logged in [AppUser]({{Types.AppUser}}). The NFT is reserved for the user in database, and you can use the NFT.status field to check on the transfer progress. */
  transfer?: Maybe<Nft>;
  /** Updates an existing [listing]({{Types.Listing}}). */
  updateListing?: Maybe<Listing>;
  /** Updates an existing [NFT model]({{Types.NFTModel}}). */
  updateModel?: Maybe<NftModel>;
  /** Creates a new [packaging model]({{Types.PackagingModel}}). */
  updatePackagingModel?: Maybe<PackagingModel>;
  /** Updates an existing [NFTSet]({{Types.NFTSet}}). */
  updateSet?: Maybe<NftSet>;
  /** Verifies a wallet to the signed in user. If the verification code fails verification against the wallet's verification code and its public key, the request will fail. */
  verifyWallet?: Maybe<Wallet>;
};


export type MutationActivateListingArgs = {
  id: Scalars['ID'];
};


export type MutationCheckoutArgs = {
  failureRedirectUrl: Scalars['String'];
  packageId: Scalars['ID'];
  successRedirectUrl: Scalars['String'];
};


export type MutationCreateListingArgs = {
  data: CreateListingInput;
};


export type MutationCreateModelArgs = {
  data: NftModelCreateInput;
};


export type MutationCreatePackagingModelArgs = {
  data: PackagingModelCreateInput;
};


export type MutationCreateSetArgs = {
  data: NftSetCreateInput;
};


export type MutationDeactivateListingArgs = {
  id: Scalars['ID'];
};


export type MutationMintModelArgs = {
  modelId: Scalars['ID'];
  quantity?: InputMaybe<Scalars['PositiveInt']>;
};


export type MutationMintNftArgs = {
  id: Scalars['ID'];
};


export type MutationPackageArgs = {
  packagingModelId: Scalars['ID'];
};


export type MutationReadyWalletArgs = {
  address: Scalars['String'];
};


export type MutationRegisterWalletArgs = {
  address: Scalars['String'];
};


export type MutationReserveArgs = {
  listingId: Scalars['ID'];
};


export type MutationTransferArgs = {
  id?: InputMaybe<Scalars['ID']>;
  nftModelId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateListingArgs = {
  data: UpdateListingInput;
};


export type MutationUpdateModelArgs = {
  data: NftModelUpdateInput;
  id: Scalars['ID'];
};


export type MutationUpdatePackagingModelArgs = {
  data: PackagingModelCreateInput;
};


export type MutationUpdateSetArgs = {
  data: NftSetCreateInput;
  id: Scalars['ID'];
};


export type MutationVerifyWalletArgs = {
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
};

/** Current Prisma Mapping: Entity. A non-fungible token on the blockchain. */
export type Nft = BlockchainEntity & Identifiable & {
  __typename?: 'NFT';
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSON']>;
  /** The model from which this NFT was created. */
  model?: Maybe<NftModel>;
  /** The serial number for this NFT within its model. */
  serialNumber?: Maybe<Scalars['Int']>;
  /** The status of this NFT (e.g. if it is available or being transferred to a user */
  status?: Maybe<SaleProcessingState>;
  /** The wallet containing this NFT, if it is owned by a user. */
  wallet?: Maybe<Wallet>;
};

/** Current Prisma Mapping: CollectibleContent. Current Prisma Mapping: CollectibleContent. The content for an NFT. */
export type NftContent = {
  __typename?: 'NFTContent';
  /** The file content in this NFT. */
  files?: Maybe<Array<Maybe<NftMedia>>>;
  /** The poster file for this NFT's content */
  poster?: Maybe<NftFile>;
};

/** The input to create or update NFT content. */
export type NftContentInput = {
  /** Additional files for this NFT content */
  files?: InputMaybe<Array<InputMaybe<Scalars['Upload']>>>;
  /** The poster for this content. */
  poster?: InputMaybe<Scalars['Upload']>;
};

/** Current Prisma Mapping: File (with ipfsContentUrl and ipfsMetadataUrl). A file to be included in an NFT. Extends [File]({{Types.File}}) to includes the IPFS addresses for the content and metadata. */
export type NftFile = File & {
  __typename?: 'NFTFile';
  /** The MIME content type for this file. */
  contentType: Scalars['String'];
  /** The IPFS address for the content of this file. */
  ipfsContentAddress: Scalars['String'];
  /** The IPFS address for the metadata of this file. */
  ipfsMetadataAddress: Scalars['String'];
  /** The main URL for this file. */
  url: Scalars['URL'];
};

/** Properties to filter NFT's when querying them. */
export type NftFilterInput = {
  /** Blockchain IDs of the [NFT]({{Types.NFT}})'s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFT]({{Types.NFT}})'s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The IDs of the [NFTModel]({{Types.NFTModel}}) that the NFT should belong to. */
  nftModelIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Current Prisma Mapping: CollectibleListing. A listing of NFTs for sale. */
export type NftListing = Identifiable & {
  __typename?: 'NFTListing';
  /** The appId of the app that created this listing */
  appId: Scalars['String'];
  /** The metadata for this NFTlisting.These will be stored in the Niftory API but will not be added to the blockchain.  */
  attributes?: Maybe<Scalars['JSON']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** All the NFT Models in this NFTListing */
  nftModels?: Maybe<Array<Maybe<NftModel>>>;
  /** A poster image for this listing */
  poster?: Maybe<File>;
  /** The pricing for this listing */
  pricing?: Maybe<Pricing>;
  /** The state of this listing. */
  state?: Maybe<ListingState>;
  /** The thumbnail image for this listing */
  thumbnail?: Maybe<File>;
  /** The title of this listing. */
  title: Scalars['String'];
};

export type NftListingFilterInput = {
  /** The IDs of the NFTListing. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The ID of the NFTModel that the NFTListing should belong to. */
  state?: InputMaybe<ListingState>;
  /** The title of the NFTListing. */
  title?: InputMaybe<Scalars['String']>;
};

/** Current Prisma Mapping: CollectibleFile. Media content to be included in an NFT. */
export type NftMedia = {
  __typename?: 'NFTMedia';
  /** The content of this NFT. */
  media: NftFile;
  /** A thumbnail for this content. */
  thumbnail?: Maybe<File>;
};

/** Current Prisma Mapping: Collectible. The definition of a type of NFT. */
export type NftModel = BlockchainEntity & BlockchainResource & Identifiable & Resource & {
  __typename?: 'NFTModel';
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** This NFT model's content. */
  content?: Maybe<NftContent>;
  /** The user-friendly description for this model. */
  description: Scalars['String'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSON']>;
  /** The NFTs created using this model. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The total quantity of NFTs that will be available for this model. */
  quantity?: Maybe<Scalars['PositiveInt']>;
  /** The rarity of the NFTs in this model. */
  rarity?: Maybe<SimpleRarityLevel>;
  /** The NFT model set containing this model. */
  set: NftSet;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
  /** The user-friendly title for this model. */
  title: Scalars['String'];
};

/** The input to create an NFT model. */
export type NftModelCreateInput = {
  /** The user-friendly description for this model. */
  description: Scalars['String'];
  /** The content for this model. */
  nftContent?: InputMaybe<NftContentInput>;
  /** The total quantity of NFTs that will be available for this model. */
  quantity: Scalars['PositiveInt'];
  /** The rarity level of this model. */
  rarity: SimpleRarityLevel;
  /** The ID of the NFT set that this model belongs to. */
  setId: Scalars['ID'];
  /** The status of the NFT model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Scalars['JSON']>;
  /** The user-friendly title for this model. */
  title: Scalars['String'];
};

/** Properties to filter NFTModel's when querying them. */
export type NftModelFilterInput = {
  /** Blockchain IDs of the [NFTModel]({{Types.NFTModel}})'s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFTModel]({{Types.NFTModel}})'s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The IDs of the [NFTSet]({{Types.NFTSet}})'s that the [NFTModel]({{Types.NFTModel}}) should belong to. */
  setIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter by [NFTModel]({{Types.NFTModel}}) status. */
  status?: InputMaybe<Status>;
};

/** The input to update an NFT model. */
export type NftModelUpdateInput = {
  /** The user-friendly description for this model. */
  description?: InputMaybe<Scalars['String']>;
  /** The content for this model. */
  nftContent?: InputMaybe<NftContentInput>;
  /** The total quantity of NFTs that will be available for this model. */
  quantity?: InputMaybe<Scalars['Int']>;
  /** The rarity level of this model. */
  rarity?: InputMaybe<SimpleRarityLevel>;
  /** The status of the NFT model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Scalars['JSON']>;
  /** The user-friendly title for this model. */
  title?: InputMaybe<Scalars['String']>;
};

/** Current Prisma Mapping: Set. A set of NFT models. */
export type NftSet = BlockchainEntity & BlockchainResource & Identifiable & Resource & {
  __typename?: 'NFTSet';
  /** The app this set belongs to. */
  app?: Maybe<App>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The image to represent this set. */
  image?: Maybe<Scalars['URL']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Models contained in this set. */
  models?: Maybe<Array<Maybe<NftModel>>>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
  /** The display image for this set. */
  title: Scalars['String'];
};

/** The input to create an NFT set. */
export type NftSetCreateInput = {
  /** The display image for this set */
  image?: InputMaybe<Scalars['Upload']>;
  /** The status of the NFT model. */
  status?: InputMaybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Scalars['JSON']>;
  /** The user-friendly title for this model. */
  title: Scalars['String'];
};

export type NftSetFilterInput = {
  /** Blockchain IDs of the [NFTSet]({{Types.NFTSet}})'s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFTSet]({{Types.NFTSet}})'s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The title of the [NFTSet]({{Types.NFTSet}}) to find. */
  title?: InputMaybe<Scalars['String']>;
};

/** The input to update an NFT model. */
export type NftSetUpdateInput = {
  /** The display image for this set */
  image?: InputMaybe<Scalars['Upload']>;
  /** The status of the NFT model. */
  status?: InputMaybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Scalars['JSON']>;
  /** The user-friendly title for this model. */
  title?: InputMaybe<Scalars['String']>;
};

/** Current Prisma Mapping: Org. An org within the Niftory API. */
export type Org = Identifiable & {
  __typename?: 'Org';
  /** The apps this org has. */
  apps?: Maybe<Array<Maybe<App>>>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** This org's members. */
  members?: Maybe<Array<Maybe<AdminUser>>>;
};

/** Current Prisma Mapping: Pack. One or more NFTs packaged for sale. */
export type Package = Identifiable & {
  __typename?: 'Package';
  /** The buyer of this packaged item, if it was purchased in a Niftory app. NOTE: we may add a seller field as well when secondary marketplace is enabled. */
  buyer?: Maybe<AppUser>;
  /** The NFTs in this packaged item. */
  contents?: Maybe<Array<Maybe<Nft>>>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The image that represents this package. */
  image?: Maybe<Scalars['String']>;
  /** This item's sale processing state. */
  saleProcessingState: SaleProcessingState;
};

/** A mapping from a packaged item to a user. */
export type PackagedItemToUserMapping = {
  __typename?: 'PackagedItemToUserMapping';
  /** The package to send. */
  package?: Maybe<Package>;
  /** The user to send it to. */
  user?: Maybe<AppUser>;
};

/** Current Prisma Mapping: PackListing. A model of how to select and package a group of NFTs. */
export type PackagingModel = Identifiable & Resource & {
  __typename?: 'PackagingModel';
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The number of NFTs to include in each pack. */
  nftsPerPack?: Maybe<Scalars['PositiveInt']>;
  /** The number of packs to create. */
  numberOfPacks?: Maybe<Scalars['PositiveInt']>;
  /** The packages created using this model. */
  packages?: Maybe<Array<Maybe<Package>>>;
  /** The packaging strategy for this model. Used to specify the distribution of NFTs in each package. */
  packaging?: Maybe<PackagingModelPackaging>;
  /** The selection strategy for this model. Used to specify the overall distribution of all NFTs that will be packaged. */
  selection?: Maybe<PackagingModelSelection>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
};

/** A condition to match NFTs against. */
export type PackagingModelCondition = {
  __typename?: 'PackagingModelCondition';
  /** The rarity level of the NFT. */
  rarity: SimpleRarityLevel;
};

/** The input to create a [packaging model condition]({{Types.PackagingModelCondition}}). */
export type PackagingModelConditionInput = {
  /** The rarity level of the NFT. */
  rarity: SimpleRarityLevel;
};

/** The input to create a [packaging model]({{Types.PackagingModel}}). */
export type PackagingModelCreateInput = {
  /** The number of NFTs to include in each pack. */
  nftsPerPack: Scalars['PositiveInt'];
  /** The number of packs to create. */
  numberOfPacks: Scalars['PositiveInt'];
  /** The packaging strategy for this model. Used to specify the distribution of NFTs in each package. */
  packaging?: InputMaybe<PackagingModelPackagingInput>;
  /** The selection strategy for this model. Used to specify the overall distribution of all NFTs that will be packaged. */
  selection: PackagingModelSelectionInput;
};

/** Current Prisma Mapping: PackListing.files, PackListing.packShape. Specifies the distribution of NFTs in each package created in a [PackagingModel]({{Types.PackagingModel}}). */
export type PackagingModelPackaging = {
  __typename?: 'PackagingModelPackaging';
  /** The image to represent this packaging model, and the packages created by it. */
  image?: Maybe<Scalars['URL']>;
  /** The rules to apply when building each package in this model. For each rule, each package will contain at least the specified number of NFTs that match at least one of the conditions. */
  rules?: Maybe<Array<Maybe<PackagingModelRule>>>;
};

/** The input to create a [packaging model packaging]({{Types.PackagingModelPackaging}}). */
export type PackagingModelPackagingInput = {
  /** The image to use for this packaging. */
  image?: InputMaybe<Scalars['Upload']>;
  /** The rules to apply when building each package in this model. */
  rules?: InputMaybe<Array<InputMaybe<PackagingModelRuleInput>>>;
};

/** Current Prisma Mapping: PackListing.packShape. Specifies a group of NFTs that match one or more conditions */
export type PackagingModelRule = {
  __typename?: 'PackagingModelRule';
  /** Conditions to use to match NFTs for this rule. An NFT can be used by this rule if any of the conditions are satisfied. */
  conditions: Array<Maybe<PackagingModelCondition>>;
  /** The number of NFTs to select as part of this rule. */
  number: Scalars['PositiveInt'];
};

/** The input to create a [packaging model rule]({{Types.PackagingModelRule}}). */
export type PackagingModelRuleInput = {
  /** Conditions to use to match NFTs for this rule. */
  conditions: Array<InputMaybe<PackagingModelConditionInput>>;
  /** The number of NFTs to select as part of this rule. */
  number: Scalars['PositiveInt'];
};

/** Current Prisma Mapping: PackListing.packShape (rules), PackListing.collectibleIds, PackListing.setId (filters). Specifies the distribution of NFTs selected for packaging in a [PackagingModel]({{Types.PackagingModel}}). */
export type PackagingModelSelection = {
  __typename?: 'PackagingModelSelection';
  /** Filters to be applied to all NFTs selected in this [PackagingModel]({{Types.PackagingModel}}). Currently, only a single filter is supported. */
  filters: Array<Maybe<PackagingModelSelectionFilter>>;
  /** The rules to apply when selecting NFTs for this [PackagingModel]({{Types.PackagingModel}}). For each rule, the NFTs selected will contain at least the specified number of NFTs that match at least one of the conditions. */
  rules?: Maybe<Array<Maybe<PackagingModelRule>>>;
};

/** Current Prisma Mapping: PackListing.collectibleIds, PackListing.setId. Filters to apply to all NFTs selected in a [PackagingModel]({{Types.PackagingModel}}). */
export type PackagingModelSelectionFilter = {
  __typename?: 'PackagingModelSelectionFilter';
  /** The set ID to filter by. An NFT will match this filter if it is in the [NFTSet]({{Types.NFTSet}}) with this ID. */
  setId: Scalars['String'];
};

/** The input to create a [packaging model selection filter]({{Types.PackagingModelSelectionFilter}}). */
export type PackagingModelSelectionFilterInput = {
  /** The set ID to filter by. An NFT will match this filter if it is in the [NFTSet]({{Types.NFTSet}}) with this ID. */
  setId: Scalars['String'];
};

/** The input to select a packaging model selection spec. */
export type PackagingModelSelectionInput = {
  /** The filters to apply to the packaging models. */
  filters: Array<InputMaybe<PackagingModelSelectionFilterInput>>;
  /** The rules to apply when selecting NFTs. */
  rules?: InputMaybe<Array<InputMaybe<PackagingModelRuleInput>>>;
};

/** The input to update a [packaging model]({{Types.PackagingModel}}). */
export type PackagingModelUpdateInput = {
  /** The number of NFTs to include in each pack. */
  nftsPerPack?: InputMaybe<Scalars['PositiveInt']>;
  /** The number of packs to create. */
  numberOfPacks?: InputMaybe<Scalars['PositiveInt']>;
  /** The packaging strategy for this model. Used to specify the distribution of NFTs in each package. */
  packaging?: InputMaybe<PackagingModelPackagingInput>;
  /** The selection strategy for this model. Used to specify the overall distribution of all NFTs that will be packaged. */
  selection?: InputMaybe<PackagingModelSelectionInput>;
};

/** The pricing for a particular listing */
export type Pricing = SimplePricing;

export type Query = {
  __typename?: 'Query';
  /** Gets an [AdminUser]({{Types.AdminUser}}) by ID. */
  adminUser?: Maybe<AdminUser>;
  /** Gets the [App]({{Types.App}}) for the current application context. */
  app?: Maybe<App>;
  /** Gets an [App]({{Types.App}}) by ID. */
  appById?: Maybe<App>;
  /** Gets the currently logged-in [AppUser]({{Types.AppUser}}) context. */
  appUser?: Maybe<AppUser>;
  /** Gets an [AppUser]({{Types.AppUser}}) by ID. */
  appUserById?: Maybe<AppUser>;
  /** Gets a [Contract]({{Types.Contract}}) by its database ID. */
  contract?: Maybe<Contract>;
  /** Gets an [Listing]({{Types.Listing}}) by ID. */
  listing?: Maybe<Listing>;
  /** Gets an [NFT]({{Types.NFT}}) by database ID. */
  nft?: Maybe<Nft>;
  /** Gets an [NFTListing]({{Types.NFTListing}}) by ID. */
  nftListing?: Maybe<NftListing>;
  /** Gets a list of [NFTListings]({{Types.NFTListing}}) by IDs. */
  nftListings?: Maybe<Array<Maybe<NftListing>>>;
  /** Gets an [NFTModel]({{Types.NFTModel}}) by database ID. */
  nftModel?: Maybe<NftModel>;
  /** Gets [NFTModel]({{Types.NFTModel}})'s for the current [App]({{Types.App}}) context. */
  nftModels?: Maybe<Array<Maybe<NftModel>>>;
  /** Gets all [NFT]({{Types.NFT}})'s belonging to the current [AppUser]({{Types.AppUser}}) context. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** Gets the [Org]({{Types.Org}}) corresponding to the current [App]({{Types.App}}) context. */
  org?: Maybe<Org>;
  /** Gets an [Org]({{Types.Org}}) by ID. */
  orgById?: Maybe<Org>;
  /** Gets a [PackagingModel]({{Types.PackagingModel}}) by ID. */
  packagingModel?: Maybe<PackagingModel>;
  /** Previews packages that could be created by a [packaging model]({{Types.PackagingModel}}). */
  previewPackages?: Maybe<Array<Maybe<Package>>>;
  /** Gets an [NFTSet]({{Types.NFTSet}}) by database ID. */
  set?: Maybe<NftSet>;
  /** Gets [NFTSet]({{Types.NFTSet}})'s for the current [App]({{Types.App}}) context. */
  sets?: Maybe<Array<Maybe<NftSet>>>;
  /** Gets the [Wallet]({{Types.Wallet}}) belonging to the current [AppUser]({{Types.AppUser}}) context. */
  wallet?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its address. */
  walletByAddress?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its database ID. */
  walletById?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) for a given [AppUser]({{Types.AppUser}}). */
  walletByUserId?: Maybe<Wallet>;
};


export type QueryAdminUserArgs = {
  id: Scalars['String'];
};


export type QueryAppByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryAppUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryContractArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryListingArgs = {
  id: Scalars['String'];
};


export type QueryNftArgs = {
  id: Scalars['String'];
};


export type QueryNftListingArgs = {
  id: Scalars['String'];
};


export type QueryNftListingsArgs = {
  filter?: InputMaybe<NftListingFilterInput>;
};


export type QueryNftModelArgs = {
  id: Scalars['String'];
};


export type QueryNftModelsArgs = {
  filter?: InputMaybe<NftModelFilterInput>;
};


export type QueryNftsArgs = {
  filter?: InputMaybe<NftFilterInput>;
};


export type QueryOrgByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryPackagingModelArgs = {
  id: Scalars['String'];
};


export type QueryPreviewPackagesArgs = {
  id: Scalars['ID'];
};


export type QuerySetArgs = {
  id: Scalars['String'];
};


export type QuerySetsArgs = {
  filter?: InputMaybe<NftSetFilterInput>;
};


export type QueryWalletByAddressArgs = {
  address: Scalars['String'];
  appId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryWalletByIdArgs = {
  id: Scalars['String'];
};


export type QueryWalletByUserIdArgs = {
  id: Scalars['String'];
};

/** An interface representing properties common to all user-managed resources in the Niftory API. */
export type Resource = {
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
};

/** Roles for users of the Niftory admin portal and APIs. */
export enum Role {
  /** Can do anything a minter can, and manage users and permissions. */
  Administrator = 'ADMINISTRATOR',
  /** Can create blockchain objects like models and sets. */
  Creator = 'CREATOR',
  /** Can do anything a creator can, but also manage listings */
  Manager = 'MANAGER',
  /** Can do anything a manager can, and also perform blockchain actions like minting. */
  Minter = 'MINTER'
}

/** The state of an item for sale. */
export enum SaleProcessingState {
  /** This item is available for sale. */
  Available = 'AVAILABLE',
  /** This item was created, but not yet available for sale. */
  Created = 'CREATED',
  /** An error was encountered while selling this item. */
  Error = 'ERROR',
  /** The user has purchased the item, but it's not yet cleared for transfer to their wallet. */
  Locked = 'LOCKED',
  /** This item is reserved for a user, but not yet purchased. */
  Reserved = 'RESERVED',
  /** The item has been sold and transferred to a user's wallet. */
  Sold = 'SOLD',
  /** The item is in the process of being transferred to the user's wallet. */
  Transferring = 'TRANSFERRING'
}

/** Current Prisma Mapping: File. A file uploaded to the Niftory API. */
export type SimpleFile = File & {
  __typename?: 'SimpleFile';
  /** The MIME content type for this file. */
  contentType: Scalars['String'];
  /** The main URL for this file. */
  url: Scalars['URL'];
};

/** A simple pricing strategy for listings with fixed prices. */
export type SimplePricing = {
  __typename?: 'SimplePricing';
  /** The currency at which this price is set. */
  currency: Currency;
  /** The price in the specified currency at which this item is for sale. */
  price: Scalars['PositiveFloat'];
};

/** The default rarity levels in the Niftory API. */
export enum SimpleRarityLevel {
  /** The most common NFTs. */
  Common = 'COMMON',
  /** The rarest of the rare NFTs, for the most dedicated collectors. */
  Legendary = 'LEGENDARY',
  /** These are rarer, harder to get and more expensive. */
  Rare = 'RARE'
}

/** Status of this resource for user workflows. */
export enum Status {
  /** "Here you go!" */
  Done = 'DONE',
  /** "I'm just getting started." */
  Draft = 'DRAFT',
  /** "I'm working on it!" */
  InProgress = 'IN_PROGRESS',
  /** "I'll get to it eventually..." */
  ToDo = 'TO_DO'
}

/** The input to update a [listing]({{Types.Listing}}). */
export type UpdateListingInput = {
  /** The Ids of the packages to include in the [listing]({{Types.Listing}}). */
  packages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The price in USD of the packages in the [listing]({{Types.Listing}}). */
  price?: InputMaybe<Scalars['PositiveFloat']>;
};

/** An interface containing common data about users. */
export type UserData = {
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']>;
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']>;
};

/** Maps a user to a role in an org */
export type UserRoleMapping = {
  __typename?: 'UserRoleMapping';
  /** The org this mapping refers to. */
  org?: Maybe<Org>;
  /** The AdminUser's role in this org. */
  role?: Maybe<Role>;
  /** The ID of the AdminUser this mapping refers to. */
  userId: Scalars['String'];
};

/** Current Prisma Mapping: Wallet. Represents a single wallet on the blockchain scoped to a particular app and user. */
export type Wallet = Identifiable & {
  __typename?: 'Wallet';
  /** This wallet's address on the blockchain. */
  address: Scalars['String'];
  /** Wallet data as a JSON blob. */
  blob?: Maybe<Scalars['JSON']>;
  /** This wallet's cid. */
  cid?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The NFTs from the current app that are in this wallet. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The state of this wallet. */
  state: WalletState;
  /** The verification code that can be used to verify this wallet for this user. */
  verificationCode?: Maybe<Scalars['String']>;
};

/** The state of a wallet. */
export enum WalletState {
  /** The wallet is ready to receive NFTs from this app's contract. */
  Ready = 'READY',
  /** The wallet has been created, but not yet verified to belong to the signed-in user. */
  Unverified = 'UNVERIFIED',
  /** The wallet is verified to belong to the signed-in user, but not yet ready to receive NFTs from this app's contract. */
  Verified = 'VERIFIED'
}

export type RegisterWalletMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type RegisterWalletMutation = { __typename?: 'Mutation', registerWallet?: { __typename?: 'Wallet', id: string, address: string, verificationCode?: string | null, state: WalletState } | null };

export type VerifyWalletMutationVariables = Exact<{
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
}>;


export type VerifyWalletMutation = { __typename?: 'Mutation', verifyWallet?: { __typename?: 'Wallet', id: string, address: string, state: WalletState } | null };

export type ReadyWalletMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type ReadyWalletMutation = { __typename?: 'Mutation', readyWallet?: { __typename?: 'Wallet', id: string, address: string, state: WalletState } | null };

export type GetNftQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, model?: { __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, metadata?: any | null, content?: { __typename?: 'NFTContent', poster?: { __typename?: 'NFTFile', url: any } | null, files?: Array<{ __typename?: 'NFTMedia', media: { __typename?: 'NFTFile', url: any, contentType: string }, thumbnail?: { __typename?: 'NFTFile', url: any, contentType: string } | { __typename?: 'SimpleFile', url: any, contentType: string } | null } | null> | null } | null } | null } | null };

export type GetNftModelQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNftModelQuery = { __typename?: 'Query', nftModel?: { __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTMedia', media: { __typename?: 'NFTFile', url: any, contentType: string }, thumbnail?: { __typename?: 'NFTFile', url: any, contentType: string } | { __typename?: 'SimpleFile', url: any, contentType: string } | null } | null> | null, poster?: { __typename?: 'NFTFile', url: any } | null } | null } | null };

export type GetNftModelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNftModelsQuery = { __typename?: 'Query', nftModels?: Array<{ __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTMedia', media: { __typename?: 'NFTFile', url: any, contentType: string }, thumbnail?: { __typename?: 'NFTFile', url: any, contentType: string } | { __typename?: 'SimpleFile', url: any, contentType: string } | null } | null> | null, poster?: { __typename?: 'NFTFile', url: any } | null } | null } | null> | null };

export type GetUserNftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNftsQuery = { __typename?: 'Query', nfts?: Array<{ __typename?: 'NFT', id: string, model?: { __typename?: 'NFTModel', id: string, title: string } | null } | null> | null };

export type GetUserWalletQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserWalletQuery = { __typename?: 'Query', wallet?: { __typename?: 'Wallet', id: string, address: string, state: WalletState, verificationCode?: string | null } | null };

export type TransferNftToUserMutationVariables = Exact<{
  nftModelId: Scalars['ID'];
}>;


export type TransferNftToUserMutation = { __typename?: 'Mutation', transfer?: { __typename?: 'NFT', id: string } | null };


export const RegisterWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"verificationCode"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<RegisterWalletMutation, RegisterWalletMutationVariables>;
export const VerifyWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signedVerificationCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"signedVerificationCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signedVerificationCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<VerifyWalletMutation, VerifyWalletMutationVariables>;
export const ReadyWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"readyWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readyWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<ReadyWalletMutation, ReadyWalletMutationVariables>;
export const GetNftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rarity"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNftQuery, GetNftQueryVariables>;
export const GetNftModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNftModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rarity"}}]}}]}}]} as unknown as DocumentNode<GetNftModelQuery, GetNftModelQueryVariables>;
export const GetNftModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNftModels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftModels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rarity"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNftModelsQuery, GetNftModelsQueryVariables>;
export const GetUserNftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserNfts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserNftsQuery, GetUserNftsQueryVariables>;
export const GetUserWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"verificationCode"}}]}}]}}]} as unknown as DocumentNode<GetUserWalletQuery, GetUserWalletQueryVariables>;
export const TransferNftToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"transferNFTToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nftModelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transfer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nftModelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nftModelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TransferNftToUserMutation, TransferNftToUserMutationVariables>;