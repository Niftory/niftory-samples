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
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** An application in the Niftory ecosystem. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type App = Identifiable & {
  __typename?: 'App';
  /** The contract associated with this app. */
  contract?: Maybe<Contract>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
};

/** Represents a user of a particular Niftory [App]({{Types.App}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
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

/** A smart contract on the blockchain. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
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

/** An interface containing common data about files. */
export type File = {
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']>;
  /** A friendly name for the file. */
  name: Scalars['String'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL'];
};

/** The upload state of a File. */
export enum FileState {
  /** The file failed to ready. */
  Error = 'ERROR',
  /** Niftory has created a pre-signed URL where the file can be uploaded. */
  GeneratedUploadUrl = 'GENERATED_UPLOAD_URL',
  /** Niftory has created a file entry in the database table. */
  Pending = 'PENDING',
  /** The file is ready for use. */
  Ready = 'READY',
  /** The file has been uploaded to a cloud storage for fast retrieval. */
  UploadedToCloudStorage = 'UPLOADED_TO_CLOUD_STORAGE',
  /** The file (and potentially its corresponding metadata) have been uploaded to IPFS. */
  UploadedToIpfs = 'UPLOADED_TO_IPFS'
}

/** An interface representing objects with unique IDs */
export type Identifiable = {
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Marks a [Wallet]({{Types.Wallet}}) as ready, indicating that the wallet is ready to receive [NFT]({{Types.NFT}})s from the app's [Contract]({{Types.Contract}}). The wallet must be verified before this succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  readyWallet?: Maybe<Wallet>;
  /** Registers a [Wallet]({{Types.Wallet}}) to the currently signed-in user. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  registerWallet?: Maybe<Wallet>;
  /** Initiates the transfer of an [NFT]({{Types.NFT}}) to the currently-logged in [AppUser]({{Types.AppUser}}). The NFT is reserved for the user in database, and you can use the NFT.status field to check on the transfer progress. */
  transfer?: Maybe<Nft>;
  /** Verifies a [Wallet]({{Types.Wallet}}) to the currently signed-in user. If the signed verification code fails to decode with the wallet's public key or doesn't match the wallet's verification code, the request will fail. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
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
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationVerifyWalletArgs = {
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
};

/** Respresentation of a [non-fungible token](https://en.wikipedia.org/wiki/Non-fungible_token) in the Niftory ecosystem (it doesn't have to be minted on the blockchain yet). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
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
  status?: Maybe<TransferState>;
  /** The wallet containing this NFT, if it is owned by a user. */
  wallet?: Maybe<Wallet>;
};

/** The content for an NFT. */
export type NftContent = Identifiable & {
  __typename?: 'NFTContent';
  /** The file content in this NFT. */
  files?: Maybe<Array<Maybe<NftFile>>>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The poster file for this NFT's content */
  poster?: Maybe<SimpleFile>;
};

/** File (with ipfsContentUrl and ipfsMetadataUrl). A file to be included in an NFT. Extends [File]({{Types.File}}) to includes the IPFS addresses for the content and metadata. */
export type NftFile = File & {
  __typename?: 'NFTFile';
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID'];
  /** The IPFS address for the content of this file. */
  ipfsContentAddress: Scalars['String'];
  /** The IPFS address for the metadata of this file. */
  ipfsMetadataAddress: Scalars['String'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']>;
  /** A friendly name for the file. */
  name: Scalars['String'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL'];
};

/** Properties to filter [NFT]({{Types.NFT}})s by when querying them. */
export type NftFilterInput = {
  /** Blockchain IDs of the [NFT]({{Types.NFT}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFT]({{Types.NFT}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [NFTModel]({{Types.NFTModel}}) that the [NFT]({{Types.NFT}}) should belong to. */
  nftModelIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Transfer states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  transferStates?: InputMaybe<Array<InputMaybe<TransferState>>>;
};

/** A list of NFTs. */
export type NftList = Pageable & {
  __typename?: 'NFTList';
  /** The appId of the app these NFTs are from. */
  appId: Scalars['ID'];
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTs in this list. */
  items?: Maybe<Array<Maybe<Nft>>>;
  /** The userId of the user these NFTs belong to (if any). */
  userId?: Maybe<Scalars['ID']>;
};

/** The blueprint for an NFT, containing everything needed to mint one -- file content, blockchain metadata, etc. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
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

/** Properties to filter [NFTModel]({{Types.NFTModel}})s when querying them. */
export type NftModelFilterInput = {
  /** Blockchain IDs of the [NFTModel]({{Types.NFTModel}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFTModel]({{Types.NFTModel}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [NFTSet]({{Types.NFTSet}})s that the [NFTModel]({{Types.NFTModel}}) should belong to. */
  setIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter by [NFTModel]({{Types.NFTModel}}) status. */
  status?: InputMaybe<Status>;
};

/** A list of NFTModels. */
export type NftModelList = Pageable & {
  __typename?: 'NFTModelList';
  /** The appId of the app these NFT models are from. */
  appId: Scalars['ID'];
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTModels in this list. */
  items?: Maybe<Array<Maybe<NftModel>>>;
};

/** A set of NFTModels, to help you organize your NFTs. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
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
  /** Blockchain IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The title of the [NFTSet]({{Types.NFTSet}}) to find. */
  title?: InputMaybe<Scalars['String']>;
};

/** An interface representing lists that can be paginated with a cursor. */
export type Pageable = {
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Gets the [App]({{Types.App}}) for the current application context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  app?: Maybe<App>;
  /** Gets an [App]({{Types.App}}) by its ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appById?: Maybe<App>;
  /** Gets the currently logged-in [AppUser]({{Types.AppUser}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appUser?: Maybe<AppUser>;
  /** Gets an [AppUser]({{Types.AppUser}}) by its ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appUserById?: Maybe<AppUser>;
  /** Gets the [Contract]({{Types.Contract}}) from the currently authenticated app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
  contract?: Maybe<Contract>;
  /** Gets an [NFT]({{Types.NFT}}) by database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nft?: Maybe<Nft>;
  /** Gets an [NFTModel]({{Types.NFTModel}}) by database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftModel?: Maybe<NftModel>;
  /** Gets [NFTModel]({{Types.NFTModel}})s for the current [App]({{Types.App}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftModels?: Maybe<NftModelList>;
  /** Gets [NFT]({{Types.NFT}})s associated with the current [AppUser]({{Types.AppUser}}) context, including those that are transferring or failed to transfer. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nfts?: Maybe<NftList>;
  /** Gets an [NFTSet]({{Types.NFTSet}}) by database ID. */
  set?: Maybe<NftSet>;
  /** Gets [NFTSet]({{Types.NFTSet}})s for the current [App]({{Types.App}}) context. */
  sets?: Maybe<Array<Maybe<NftSet>>>;
  /** Gets the [Wallet]({{Types.Wallet}}) belonging to the current [AppUser]({{Types.AppUser}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  wallet?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its blockchain address. Wallet must be registered using [registerWallet]({{Mutations.registerWallet}}) before this request succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByAddress?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletById?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) for a given [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByUserId?: Maybe<Wallet>;
};


export type QueryAppByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryAppUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryNftArgs = {
  id: Scalars['ID'];
};


export type QueryNftModelArgs = {
  id: Scalars['ID'];
};


export type QueryNftModelsArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftModelFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryNftsArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QuerySetArgs = {
  id: Scalars['ID'];
};


export type QuerySetsArgs = {
  filter?: InputMaybe<NftSetFilterInput>;
};


export type QueryWalletByAddressArgs = {
  address: Scalars['String'];
  appId?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryWalletByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWalletByUserIdArgs = {
  userId: Scalars['ID'];
};

/** An interface representing properties common to all user-managed resources in the Niftory API. */
export type Resource = {
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** A mapping of tags for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Scalars['JSON']>;
};

/** A file uploaded to the Niftory API. */
export type SimpleFile = File & {
  __typename?: 'SimpleFile';
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']>;
  /** A friendly name for the file. */
  name: Scalars['String'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL'];
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

/** The state of an item being transferred. */
export enum TransferState {
  /** The item has been created, but not transferred. */
  Available = 'AVAILABLE',
  /** The item failed to transfer. */
  Error = 'ERROR',
  /** The item is being transferred. */
  InProgress = 'IN_PROGRESS',
  /** The item is reserved for a future transfer. */
  Reserved = 'RESERVED',
  /** The item has been transferred. */
  Success = 'SUCCESS'
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

/** Represents a blockchain wallet scoped to a particular [App]({{Types.App}}) and [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets). */
export type Wallet = Identifiable & {
  __typename?: 'Wallet';
  /** This wallet's address on the blockchain. */
  address: Scalars['String'];
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

export type ContractQueryVariables = Exact<{ [key: string]: never; }>;


export type ContractQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', name?: string | null, address?: string | null, blockchain?: Blockchain | null } | null };

export type UserNftsByUserQueryVariables = Exact<{
  userId: Scalars['ID'];
  nftModelId: Scalars['ID'];
}>;


export type UserNftsByUserQuery = { __typename?: 'Query', nfts?: { __typename?: 'NFTList', cursor?: string | null, items?: Array<{ __typename?: 'NFT', id: string } | null> | null } | null };

export type TransferNftToUserMutationVariables = Exact<{
  nftModelId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type TransferNftToUserMutation = { __typename?: 'Mutation', transfer?: { __typename?: 'NFT', id: string } | null };

export type NftQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, model?: { __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, metadata?: any | null, content?: { __typename?: 'NFTContent', poster?: { __typename?: 'SimpleFile', url: any } | null, files?: Array<{ __typename?: 'NFTFile', url: any, contentType?: string | null } | null> | null } | null } | null } | null };

export type UserNftsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']>;
}>;


export type UserNftsQuery = { __typename?: 'Query', nfts?: { __typename?: 'NFTList', cursor?: string | null, items?: Array<{ __typename?: 'NFT', id: string, model?: { __typename?: 'NFTModel', id: string, title: string } | null } | null> | null } | null };

export type NftModelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NftModelQuery = { __typename?: 'Query', nftModel?: { __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTFile', url: any, contentType?: string | null } | null> | null, poster?: { __typename?: 'SimpleFile', url: any } | null } | null } | null };

export type NftModelsQueryVariables = Exact<{
  appId?: InputMaybe<Scalars['ID']>;
}>;


export type NftModelsQuery = { __typename?: 'Query', nftModels?: { __typename?: 'NFTModelList', cursor?: string | null, items?: Array<{ __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTFile', url: any, contentType?: string | null } | null> | null, poster?: { __typename?: 'SimpleFile', url: any } | null } | null } | null> | null } | null };


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
export const ReactQuery_ContractDocument = `
    query contract {
  contract {
    name
    address
    blockchain
  }
}
    `;
export const useContractQuery = <
      TData = ContractQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ContractQueryVariables,
      options?: UseQueryOptions<ContractQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ContractQuery, TError, TData>(
      variables === undefined ? ['contract'] : ['contract', variables],
      fetcher<ContractQuery, ContractQueryVariables>(client, ReactQuery_ContractDocument, variables, headers),
      options
    );
export const ReactQuery_UserNftsByUserDocument = `
    query userNftsByUser($userId: ID!, $nftModelId: ID!) {
  nfts(userId: $userId, filter: {nftModelIds: [$nftModelId]}) {
    items {
      id
    }
    cursor
  }
}
    `;
export const useUserNftsByUserQuery = <
      TData = UserNftsByUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserNftsByUserQueryVariables,
      options?: UseQueryOptions<UserNftsByUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserNftsByUserQuery, TError, TData>(
      ['userNftsByUser', variables],
      fetcher<UserNftsByUserQuery, UserNftsByUserQueryVariables>(client, ReactQuery_UserNftsByUserDocument, variables, headers),
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
    query nft($id: ID!) {
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
          url
          contentType
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
    query userNfts($userId: ID) {
  nfts(userId: $userId) {
    items {
      id
      model {
        id
        title
      }
    }
    cursor
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
    query nftModel($id: ID!) {
  nftModel(id: $id) {
    id
    blockchainId
    title
    description
    quantity
    status
    content {
      files {
        url
        contentType
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
    query nftModels($appId: ID) {
  nftModels(appId: $appId) {
    items {
      id
      blockchainId
      title
      description
      quantity
      status
      rarity
      content {
        files {
          url
          contentType
        }
        poster {
          url
        }
      }
    }
    cursor
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
export const ContractDocument = gql`
    query contract {
  contract {
    name
    address
    blockchain
  }
}
    `;
export const UserNftsByUserDocument = gql`
    query userNftsByUser($userId: ID!, $nftModelId: ID!) {
  nfts(userId: $userId, filter: {nftModelIds: [$nftModelId]}) {
    items {
      id
    }
    cursor
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
    query nft($id: ID!) {
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
          url
          contentType
        }
      }
    }
  }
}
    `;
export const UserNftsDocument = gql`
    query userNfts($userId: ID) {
  nfts(userId: $userId) {
    items {
      id
      model {
        id
        title
      }
    }
    cursor
  }
}
    `;
export const NftModelDocument = gql`
    query nftModel($id: ID!) {
  nftModel(id: $id) {
    id
    blockchainId
    title
    description
    quantity
    status
    content {
      files {
        url
        contentType
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
    query nftModels($appId: ID) {
  nftModels(appId: $appId) {
    items {
      id
      blockchainId
      title
      description
      quantity
      status
      rarity
      content {
        files {
          url
          contentType
        }
        poster {
          url
        }
      }
    }
    cursor
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
    contract(variables?: ContractQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ContractQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ContractQuery>(ContractDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'contract', 'query');
    },
    userNftsByUser(variables: UserNftsByUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserNftsByUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserNftsByUserQuery>(UserNftsByUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userNftsByUser', 'query');
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