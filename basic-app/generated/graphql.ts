// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
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
  /** The name of this contract. */
  name?: Maybe<Scalars['String']>;
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
  /** Marks a wallet as ready for the given contract, indicating that the wallet is ready to receive NFTs from the current app. The wallet must be verified before this succeeds. */
  readyWallet?: Maybe<Wallet>;
  /** Registers a wallet to the signed in user. */
  registerWallet?: Maybe<Wallet>;
  /** Initiates the transfer of an [NFT]({{Types.NFT}}) to the currently-logged in [AppUser]({{Types.AppUser}}). The NFT is reserved for the user in database, and you can use the NFT.status field to check on the transfer progress. */
  transfer?: Maybe<Nft>;
  /** Verifies a wallet to the signed in user. If the verification code fails verification against the wallet's verification code and its public key, the request will fail. */
  verifyWallet?: Maybe<Wallet>;
};


export type MutationReadyWalletArgs = {
  address: Scalars['String'];
};


export type MutationRegisterWalletArgs = {
  address: Scalars['String'];
};


export type MutationTransferArgs = {
  id?: InputMaybe<Scalars['ID']>;
  nftModelId?: InputMaybe<Scalars['ID']>;
  userId: Scalars['ID'];
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

export type NftSetFilterInput = {
  /** Blockchain IDs of the [NFTSet]({{Types.NFTSet}})'s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFTSet]({{Types.NFTSet}})'s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The title of the [NFTSet]({{Types.NFTSet}}) to find. */
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

/** Current Prisma Mapping: PackListing.files, PackListing.packShape. Specifies the distribution of NFTs in each package created in a [PackagingModel]({{Types.PackagingModel}}). */
export type PackagingModelPackaging = {
  __typename?: 'PackagingModelPackaging';
  /** The image to represent this packaging model, and the packages created by it. */
  image?: Maybe<Scalars['URL']>;
  /** The rules to apply when building each package in this model. For each rule, each package will contain at least the specified number of NFTs that match at least one of the conditions. */
  rules?: Maybe<Array<Maybe<PackagingModelRule>>>;
};

/** Current Prisma Mapping: PackListing.packShape. Specifies a group of NFTs that match one or more conditions */
export type PackagingModelRule = {
  __typename?: 'PackagingModelRule';
  /** Conditions to use to match NFTs for this rule. An NFT can be used by this rule if any of the conditions are satisfied. */
  conditions: Array<Maybe<PackagingModelCondition>>;
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

/** The pricing for a particular listing */
export type Pricing = SimplePricing;

export type Query = {
  __typename?: 'Query';
  /** Gets the [App]({{Types.App}}) for the current application context. */
  app?: Maybe<App>;
  /** Gets an [App]({{Types.App}}) by ID. */
  appById?: Maybe<App>;
  /** Gets the currently logged-in [AppUser]({{Types.AppUser}}) context. */
  appUser?: Maybe<AppUser>;
  /** Gets an [AppUser]({{Types.AppUser}}) by ID. */
  appUserById?: Maybe<AppUser>;
  /** Gets an [NFT]({{Types.NFT}}) by database ID. */
  nft?: Maybe<Nft>;
  /** Gets an [NFTModel]({{Types.NFTModel}}) by database ID. */
  nftModel?: Maybe<NftModel>;
  /** Gets [NFTModel]({{Types.NFTModel}})'s for the current [App]({{Types.App}}) context. */
  nftModels?: Maybe<Array<Maybe<NftModel>>>;
  /** Gets all [NFT]({{Types.NFT}})'s belonging to the current [AppUser]({{Types.AppUser}}) context. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
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


export type QueryAppByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryAppUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryNftArgs = {
  id: Scalars['String'];
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

export type ReadyWalletMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type ReadyWalletMutation = { __typename?: 'Mutation', readyWallet?: { __typename?: 'Wallet', id: string, address: string, state: WalletState } | null };

export type RegisterWalletMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type RegisterWalletMutation = { __typename?: 'Mutation', registerWallet?: { __typename?: 'Wallet', id: string, address: string, verificationCode?: string | null, state: WalletState } | null };

export type VerifyWalletMutationVariables = Exact<{
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
}>;


export type VerifyWalletMutation = { __typename?: 'Mutation', verifyWallet?: { __typename?: 'Wallet', id: string, address: string, state: WalletState } | null };

export type UserWalletQueryVariables = Exact<{ [key: string]: never; }>;


export type UserWalletQuery = { __typename?: 'Query', wallet?: { __typename?: 'Wallet', id: string, address: string, state: WalletState, verificationCode?: string | null } | null };

export type TransferNftToUserMutationVariables = Exact<{
  nftModelId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type TransferNftToUserMutation = { __typename?: 'Mutation', transfer?: { __typename?: 'NFT', id: string } | null };

export type NftQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, model?: { __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, metadata?: any | null, content?: { __typename?: 'NFTContent', poster?: { __typename?: 'NFTFile', url: any } | null, files?: Array<{ __typename?: 'NFTMedia', media: { __typename?: 'NFTFile', url: any, contentType: string }, thumbnail?: { __typename?: 'NFTFile', url: any, contentType: string } | { __typename?: 'SimpleFile', url: any, contentType: string } | null } | null> | null } | null } | null } | null };

export type UserNftsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNftsQuery = { __typename?: 'Query', nfts?: Array<{ __typename?: 'NFT', id: string, model?: { __typename?: 'NFTModel', id: string, title: string } | null } | null> | null };

export type NftModelQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type NftModelQuery = { __typename?: 'Query', nftModel?: { __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTMedia', media: { __typename?: 'NFTFile', url: any, contentType: string }, thumbnail?: { __typename?: 'NFTFile', url: any, contentType: string } | { __typename?: 'SimpleFile', url: any, contentType: string } | null } | null> | null, poster?: { __typename?: 'NFTFile', url: any } | null } | null } | null };

export type NftModelsQueryVariables = Exact<{ [key: string]: never; }>;


export type NftModelsQuery = { __typename?: 'Query', nftModels?: Array<{ __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTMedia', media: { __typename?: 'NFTFile', url: any, contentType: string }, thumbnail?: { __typename?: 'NFTFile', url: any, contentType: string } | { __typename?: 'SimpleFile', url: any, contentType: string } | null } | null> | null, poster?: { __typename?: 'NFTFile', url: any } | null } | null } | null> | null };


export const ReactQuery_ReadyWalletDocument = `
    mutation readyWallet($address: String!) {
  readyWallet(address: $address) {
    id
    address
    state
  }
}
    `;
export const useReadyWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ReadyWalletMutation, TError, ReadyWalletMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ReadyWalletMutation, TError, ReadyWalletMutationVariables, TContext>(
      ['readyWallet'],
      (variables?: ReadyWalletMutationVariables) => fetcher<ReadyWalletMutation, ReadyWalletMutationVariables>(client, ReactQuery_ReadyWalletDocument, variables, headers)(),
      options
    );
export const ReactQuery_RegisterWalletDocument = `
    mutation registerWallet($address: String!) {
  registerWallet(address: $address) {
    id
    address
    verificationCode
    state
  }
}
    `;
export const useRegisterWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterWalletMutation, TError, RegisterWalletMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterWalletMutation, TError, RegisterWalletMutationVariables, TContext>(
      ['registerWallet'],
      (variables?: RegisterWalletMutationVariables) => fetcher<RegisterWalletMutation, RegisterWalletMutationVariables>(client, ReactQuery_RegisterWalletDocument, variables, headers)(),
      options
    );
export const ReactQuery_VerifyWalletDocument = `
    mutation verifyWallet($address: String!, $signedVerificationCode: JSON!) {
  verifyWallet(address: $address, signedVerificationCode: $signedVerificationCode) {
    id
    address
    state
  }
}
    `;
export const useVerifyWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<VerifyWalletMutation, TError, VerifyWalletMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<VerifyWalletMutation, TError, VerifyWalletMutationVariables, TContext>(
      ['verifyWallet'],
      (variables?: VerifyWalletMutationVariables) => fetcher<VerifyWalletMutation, VerifyWalletMutationVariables>(client, ReactQuery_VerifyWalletDocument, variables, headers)(),
      options
    );
export const ReactQuery_UserWalletDocument = `
    query userWallet {
  wallet {
    id
    address
    state
    verificationCode
  }
}
    `;
export const useUserWalletQuery = <
      TData = UserWalletQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserWalletQueryVariables,
      options?: UseQueryOptions<UserWalletQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserWalletQuery, TError, TData>(
      variables === undefined ? ['userWallet'] : ['userWallet', variables],
      fetcher<UserWalletQuery, UserWalletQueryVariables>(client, ReactQuery_UserWalletDocument, variables, headers),
      options
    );
export const ReactQuery_TransferNftToUserDocument = `
    mutation transferNFTToUser($nftModelId: ID!, $userId: ID!) {
  transfer(nftModelId: $nftModelId, userId: $userId) {
    id
  }
}
    `;
export const useTransferNftToUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<TransferNftToUserMutation, TError, TransferNftToUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<TransferNftToUserMutation, TError, TransferNftToUserMutationVariables, TContext>(
      ['transferNFTToUser'],
      (variables?: TransferNftToUserMutationVariables) => fetcher<TransferNftToUserMutation, TransferNftToUserMutationVariables>(client, ReactQuery_TransferNftToUserDocument, variables, headers)(),
      options
    );
export const ReactQuery_NftDocument = `
    query nft($id: String!) {
  nft(id: $id) {
    id
    blockchainId
    serialNumber
    model {
      id
      blockchainId
      title
      description
      rarity
      quantity
      metadata
      content {
        poster {
          url
        }
        files {
          media {
            url
            contentType
          }
          thumbnail {
            url
            contentType
          }
        }
      }
    }
  }
}
    `;
export const useNftQuery = <
      TData = NftQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: NftQueryVariables,
      options?: UseQueryOptions<NftQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NftQuery, TError, TData>(
      ['nft', variables],
      fetcher<NftQuery, NftQueryVariables>(client, ReactQuery_NftDocument, variables, headers),
      options
    );
export const ReactQuery_UserNftsDocument = `
    query userNfts {
  nfts {
    id
    model {
      id
      title
    }
  }
}
    `;
export const useUserNftsQuery = <
      TData = UserNftsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserNftsQueryVariables,
      options?: UseQueryOptions<UserNftsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserNftsQuery, TError, TData>(
      variables === undefined ? ['userNfts'] : ['userNfts', variables],
      fetcher<UserNftsQuery, UserNftsQueryVariables>(client, ReactQuery_UserNftsDocument, variables, headers),
      options
    );
export const ReactQuery_NftModelDocument = `
    query nftModel($id: String!) {
  nftModel(id: $id) {
    id
    blockchainId
    title
    description
    quantity
    status
    content {
      files {
        media {
          url
          contentType
        }
        thumbnail {
          url
          contentType
        }
      }
      poster {
        url
      }
    }
    rarity
  }
}
    `;
export const useNftModelQuery = <
      TData = NftModelQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: NftModelQueryVariables,
      options?: UseQueryOptions<NftModelQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NftModelQuery, TError, TData>(
      ['nftModel', variables],
      fetcher<NftModelQuery, NftModelQueryVariables>(client, ReactQuery_NftModelDocument, variables, headers),
      options
    );
export const ReactQuery_NftModelsDocument = `
    query nftModels {
  nftModels {
    id
    blockchainId
    title
    description
    quantity
    status
    rarity
    content {
      files {
        media {
          url
          contentType
        }
        thumbnail {
          url
          contentType
        }
      }
      poster {
        url
      }
    }
  }
}
    `;
export const useNftModelsQuery = <
      TData = NftModelsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: NftModelsQueryVariables,
      options?: UseQueryOptions<NftModelsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<NftModelsQuery, TError, TData>(
      variables === undefined ? ['nftModels'] : ['nftModels', variables],
      fetcher<NftModelsQuery, NftModelsQueryVariables>(client, ReactQuery_NftModelsDocument, variables, headers),
      options
    );

export const ReadyWalletDocument = gql`
    mutation readyWallet($address: String!) {
  readyWallet(address: $address) {
    id
    address
    state
  }
}
    `;
export const RegisterWalletDocument = gql`
    mutation registerWallet($address: String!) {
  registerWallet(address: $address) {
    id
    address
    verificationCode
    state
  }
}
    `;
export const VerifyWalletDocument = gql`
    mutation verifyWallet($address: String!, $signedVerificationCode: JSON!) {
  verifyWallet(address: $address, signedVerificationCode: $signedVerificationCode) {
    id
    address
    state
  }
}
    `;
export const UserWalletDocument = gql`
    query userWallet {
  wallet {
    id
    address
    state
    verificationCode
  }
}
    `;
export const TransferNftToUserDocument = gql`
    mutation transferNFTToUser($nftModelId: ID!, $userId: ID!) {
  transfer(nftModelId: $nftModelId, userId: $userId) {
    id
  }
}
    `;
export const NftDocument = gql`
    query nft($id: String!) {
  nft(id: $id) {
    id
    blockchainId
    serialNumber
    model {
      id
      blockchainId
      title
      description
      rarity
      quantity
      metadata
      content {
        poster {
          url
        }
        files {
          media {
            url
            contentType
          }
          thumbnail {
            url
            contentType
          }
        }
      }
    }
  }
}
    `;
export const UserNftsDocument = gql`
    query userNfts {
  nfts {
    id
    model {
      id
      title
    }
  }
}
    `;
export const NftModelDocument = gql`
    query nftModel($id: String!) {
  nftModel(id: $id) {
    id
    blockchainId
    title
    description
    quantity
    status
    content {
      files {
        media {
          url
          contentType
        }
        thumbnail {
          url
          contentType
        }
      }
      poster {
        url
      }
    }
    rarity
  }
}
    `;
export const NftModelsDocument = gql`
    query nftModels {
  nftModels {
    id
    blockchainId
    title
    description
    quantity
    status
    rarity
    content {
      files {
        media {
          url
          contentType
        }
        thumbnail {
          url
          contentType
        }
      }
      poster {
        url
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    readyWallet(variables: ReadyWalletMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ReadyWalletMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReadyWalletMutation>(ReadyWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'readyWallet', 'mutation');
    },
    registerWallet(variables: RegisterWalletMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterWalletMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterWalletMutation>(RegisterWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'registerWallet', 'mutation');
    },
    verifyWallet(variables: VerifyWalletMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifyWalletMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyWalletMutation>(VerifyWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verifyWallet', 'mutation');
    },
    userWallet(variables?: UserWalletQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserWalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserWalletQuery>(UserWalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userWallet', 'query');
    },
    transferNFTToUser(variables: TransferNftToUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TransferNftToUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TransferNftToUserMutation>(TransferNftToUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'transferNFTToUser', 'mutation');
    },
    nft(variables: NftQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NftQuery>(NftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'nft', 'query');
    },
    userNfts(variables?: UserNftsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserNftsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserNftsQuery>(UserNftsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userNfts', 'query');
    },
    nftModel(variables: NftModelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NftModelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NftModelQuery>(NftModelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'nftModel', 'query');
    },
    nftModels(variables?: NftModelsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NftModelsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NftModelsQuery>(NftModelsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'nftModels', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;