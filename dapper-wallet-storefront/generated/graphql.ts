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
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
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
  /** The primary wallet used by this user. */
  primaryWallet?: Maybe<Wallet>;
  /**
   * The wallet owned by this user.
   * @deprecated Use primaryWallet or wallets instead.
   */
  wallet?: Maybe<Wallet>;
  /** All wallets owned by this user. */
  wallets?: Maybe<Array<Maybe<Wallet>>>;
};

/** Represents a list of [AppUser]({{Types.AppUser}})s of a particular Niftory [App]({{Types.App}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type AppUserList = Pageable & {
  __typename?: 'AppUserList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The AppUsers in this list. */
  items?: Maybe<Array<Maybe<AppUser>>>;
};

/** An interface representing objects that have attributes property for non-blockchain property storage. */
export type Attributable = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
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
  metadata?: Maybe<Scalars['JSONObject']>;
};

/** An interface representing properties common to all objects that exist on the blockchain */
export type BlockchainResource = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
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

export type CreateFileOptionsInput = {
  /** The Content-Type (MIME type) of the file to be uploaded. This must match the Content-Type header you will use to upload the file to the returned URL. If this is left empty, your Content-Type header must also be empty. */
  contentType?: InputMaybe<Scalars['String']>;
  /** Required if the file to be uploaded is a video, and uploadToIPFS=true. In that case a poster must have already been uploaded (so it can be used as the image on IPFS). */
  posterFileId?: InputMaybe<Scalars['ID']>;
  /** Whether to asynchronously trigger an IPFS upload after the file has been uploaded to the returned cloud storage URL. */
  uploadToIPFS?: InputMaybe<Scalars['Boolean']>;
};

/** The input to create a custodial Niftory [Wallet]({{Types.Wallet}}). */
export type CreateNiftoryWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
};

/** A currency that can be accepted for payment. */
export enum Currency {
  /** The United States dollar. */
  Usd = 'USD'
}

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

/** A simple pricing strategy for listings with fixed prices. */
export type FixedPricing = {
  __typename?: 'FixedPricing';
  /** The currency at which this price is set. */
  currency: Currency;
  /** The price in the specified currency at which this item is for sale. */
  price: Scalars['PositiveFloat'];
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
  /** The status of the payment */
  status?: Maybe<Scalars['String']>;
  /** A message to display to the user which contains checkout information */
  statusMessage?: Maybe<Scalars['String']>;
};

/** A purchase invoice for an NFT. The invoice is created when an NFT is reserved using reserve, and updated when a payment is initiated with checkout */
export type Invoice = Identifiable & {
  __typename?: 'Invoice';
  /** The ID of the Niftory invoice for an NFT purchase */
  id: Scalars['ID'];
  /** The listing associated with this invoice */
  listingId?: Maybe<Scalars['String']>;
  /** The state of this invoice */
  state?: Maybe<InvoiceState>;
  /** The total spent in USD in this invoice */
  total?: Maybe<Scalars['PositiveFloat']>;
  /** The user id associated with this invoice */
  userId?: Maybe<Scalars['String']>;
};

/** A list of completed invoices for this app */
export type InvoiceList = Pageable & {
  __typename?: 'InvoiceList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The invoices in this list. */
  items?: Maybe<Array<Maybe<Invoice>>>;
};

/** The state of an invoice. */
export enum InvoiceState {
  /** This invoice is completed. */
  Completed = 'COMPLETED',
  /** This invoice was created and ready for payment. */
  Created = 'CREATED',
  /** An error was encountered while performing this payment. */
  Error = 'ERROR',
  /** This invoice is pending payment. */
  Pending = 'PENDING'
}

/** The state of a listing. */
export enum ListingState {
  /** The listing is active and available for sale. */
  Active = 'ACTIVE',
  /** The listing is inactive, so it's not open for sale. */
  Inactive = 'INACTIVE',
  /** All NFTs in this listing have been sold. */
  Sold = 'SOLD'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Initiates checkout for a reserved NFT. */
  checkout?: Maybe<InitiateCheckoutResponse>;
  /** Generates a pre-signed URL that can then be used to upload a file. Once the file has been uploaded to the URL, it will automatically be uploaded to IPFS (if desired). Use the returned [File]({{Types.SimpleFile}}).state to track the upload. */
  createFileUploadUrl?: Maybe<File>;
  /** Creates a new [NFTModel]({{Types.NFTModel}}). */
  createNFTModel?: Maybe<NftModel>;
  /** Creates a new [NFTSet]({{Types.NFTSet}}). */
  createNFTSet?: Maybe<NftSet>;
  /** Provisions a custodial Niftory [Wallet]({{Types.Wallet}}) and, if specified, associates it with the given [AppUser]({{Types.AppUser}}). Note: The call fails if the user already has a wallet. */
  createNiftoryWallet?: Maybe<Wallet>;
  /** Initiates minting for a given [NFTModel]({{Types.NFTmodel}}). */
  mintNFTModel?: Maybe<NftModel>;
  /** Marks a [Wallet]({{Types.Wallet}}) as ready, indicating that the wallet is ready to receive [NFT]({{Types.NFT}})s from the app's [Contract]({{Types.Contract}}). The wallet must be verified before this succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  readyWallet?: Maybe<Wallet>;
  /** Registers a [Wallet]({{Types.Wallet}}), associating it with the currently signed-in [AppUser]({{Types.AppUser}}) if specified. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  registerWallet?: Maybe<Wallet>;
  /** Reserves an [NFT]({{Types.NFT}}) for an [AppUser]({{Types.AppUser}}) and returns an [Invoice]({{Types.Invoice}}) for purchase. */
  reserve?: Maybe<Invoice>;
  /** Initiates the transfer of an [NFT]({{Types.NFT}}) to the currently-logged in [AppUser]({{Types.AppUser}}). The NFT is reserved for the user in database, and you can use the NFT.status field to check on the transfer progress. */
  transfer?: Maybe<Nft>;
  /** Updates an existing [NFTModel]({{Types.NFTModel}}). Note that if this NFTModel has already been used to mint an NFT, the update operation will fail for any properties that affect the blockchain (such as 'quantity', 'title', 'metadata', etc.), whereas updating 'attributes' will succeed. */
  updateNFTModel?: Maybe<NftModel>;
  /** Updates an existing [NFTSet]({{Types.NFTSet}}). */
  updateNFTSet?: Maybe<NftSet>;
  /** Update a [Wallet]({{Types.Wallet}}) of the currently signed-in user. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  updateWallet?: Maybe<Wallet>;
  /** Creates an [NFTContent]({{Types.NFTContent}}) object containing pre-signed URLs that can then be used to upload a file and poster. The primary file will automatically be uploaded to IPFS once it's been uploaded to the pre-signed URL. Each returned [File]({{Types.SimpleFile}}) has a 'state' property to track the upload. */
  uploadNFTContent?: Maybe<NftContent>;
  /** Verifies a [Wallet]({{Types.Wallet}}) to the currently signed-in user. If the signed verification code fails to decode with the wallet's public key or doesn't match the wallet's verification code, the request will fail. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  verifyWallet?: Maybe<Wallet>;
};


export type MutationCheckoutArgs = {
  invoiceId: Scalars['String'];
  onError: Scalars['String'];
  onSuccess: Scalars['String'];
};


export type MutationCreateFileUploadUrlArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  options?: InputMaybe<CreateFileOptionsInput>;
};


export type MutationCreateNftModelArgs = {
  data: NftModelCreateInput;
  setId: Scalars['ID'];
};


export type MutationCreateNftSetArgs = {
  data: NftSetCreateInput;
};


export type MutationCreateNiftoryWalletArgs = {
  data?: InputMaybe<CreateNiftoryWalletInput>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationMintNftModelArgs = {
  id: Scalars['ID'];
  quantity?: InputMaybe<Scalars['PositiveInt']>;
};


export type MutationReadyWalletArgs = {
  address: Scalars['String'];
};


export type MutationRegisterWalletArgs = {
  address: Scalars['String'];
  data?: InputMaybe<RegisterWalletInput>;
};


export type MutationReserveArgs = {
  listingId: Scalars['ID'];
};


export type MutationTransferArgs = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  nftModelId?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
  walletId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNftModelArgs = {
  data: NftModelUpdateInput;
  id: Scalars['ID'];
};


export type MutationUpdateNftSetArgs = {
  data: NftSetUpdateInput;
  id: Scalars['ID'];
};


export type MutationUpdateWalletArgs = {
  address: Scalars['String'];
  data?: InputMaybe<UpdateWalletInput>;
};


export type MutationUploadNftContentArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  posterContentType?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyWalletArgs = {
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
};

/** Respresentation of a [non-fungible token](https://en.wikipedia.org/wiki/Non-fungible_token) in the Niftory ecosystem (it doesn't have to be minted on the blockchain yet). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type Nft = BlockchainEntity & Identifiable & SellableEntity & {
  __typename?: 'NFT';
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** The state of this NFT on the blockchain */
  blockchainState: NftBlockchainState;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** The model from which this NFT was created. */
  model?: Maybe<NftModel>;
  /** This state of this object's sale. */
  saleState?: Maybe<SaleState>;
  /** The serial number for this NFT within its model. */
  serialNumber?: Maybe<Scalars['Int']>;
  /**
   * The status of this NFT (e.g. if it is available or being transferred to a user
   * @deprecated Use blockchainState or saleState instead.
   */
  status?: Maybe<TransferState>;
  /** The wallet containing this NFT, if it is owned by a user. */
  wallet?: Maybe<Wallet>;
};

/** The state of an NFT on the blockchain. */
export enum NftBlockchainState {
  /** An error occurred with this item's last blockchain operation. */
  Error = 'ERROR',
  /** The item is minted, and are no pending operations on it. */
  Minted = 'MINTED',
  /** The item is being minted. */
  Minting = 'MINTING',
  /** The item has already been transferred to a user's wallet. */
  Transferred = 'TRANSFERRED',
  /** The item is being transferred. */
  Transferring = 'TRANSFERRING',
  /** The item hasn't been minted yet. */
  Unminted = 'UNMINTED'
}

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

/** The input to create or update [NFTContent]({{Types.NFTContent}}). */
export type NftContentInput = {
  /** The ID of the [NFTFile]({{Types.NFTFile}}) content. This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  fileId: Scalars['ID'];
  /** The ID of the poster [File]({{Types.File}}). This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  posterId?: InputMaybe<Scalars['ID']>;
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
  /** Blockchain states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  blockchainStates?: InputMaybe<Array<InputMaybe<NftBlockchainState>>>;
  /** Database IDs of the [NFT]({{Types.NFT}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [NFTModel]({{Types.NFTModel}}) that the [NFT]({{Types.NFT}}) should belong to. */
  nftModelIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Sale states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  saleStates?: InputMaybe<Array<InputMaybe<SaleState>>>;
  /** Transfer states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  transferStates?: InputMaybe<Array<InputMaybe<TransferState>>>;
};

/** A list of NFTs. */
export type NftList = Pageable & {
  __typename?: 'NFTList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTs in this list. */
  items?: Maybe<Array<Maybe<Nft>>>;
};

/** A listing of NFTs for sale. */
export type NftListing = Attributable & Identifiable & {
  __typename?: 'NFTListing';
  /** The appId of the app this NFTListing belongs to. */
  appId: Scalars['ID'];
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** The description of the listing. */
  description?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The NFT Model for this listing, NFTs from this model will be sold when a user checks out with this listing */
  nftModel: NftModel;
  /** The pricing for this listing */
  pricing: FixedPricing;
  /** The state of this listing. */
  state: ListingState;
  /** The title of the listing. */
  title?: Maybe<Scalars['String']>;
};

export type NftListingFilterInput = {
  /** The IDs of the NFTListing. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The ID of the NFTModel that the NFTListing should belong to. */
  state?: InputMaybe<ListingState>;
  /** The title of the NFTListing. */
  title?: InputMaybe<Scalars['String']>;
};

/** A list of NFTListings. */
export type NftListingList = Pageable & {
  __typename?: 'NFTListingList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTListings in this list. */
  items?: Maybe<Array<Maybe<NftListing>>>;
};

/** The blueprint for an NFT, containing everything needed to mint one -- file content, blockchain metadata, etc. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type NftModel = Attributable & BlockchainEntity & BlockchainResource & Identifiable & Resource & {
  __typename?: 'NFTModel';
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** This NFT model's content. */
  content?: Maybe<NftContent>;
  /** The user-friendly description for this model. */
  description: Scalars['String'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** The NFTs created using this model. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The total quantity of NFTs that will be available for this model. */
  quantity?: Maybe<Scalars['PositiveInt']>;
  /** The rarity of the NFTs in this model. */
  rarity?: Maybe<SimpleRarityLevel>;
  /** The NFT model set containing this model. */
  set: NftSet;
  /** The state of this NFT Model on the blockchain */
  state: NftModelBlockchainState;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** The user-friendly title for this model. */
  title: Scalars['String'];
};

/** The state of an NFT Model on the blockchain. */
export enum NftModelBlockchainState {
  /** All NFTs in this model have been transferred to users. */
  Completed = 'COMPLETED',
  /** An error occurred with this item's last blockchain operation. */
  Error = 'ERROR',
  /** The item is minted, and are no pending operations on it. */
  Minted = 'MINTED',
  /** The item is being minted. */
  Minting = 'MINTING',
  /** The item hasn't been minted yet. */
  Unminted = 'UNMINTED'
}

/** The input to create an [NFTModel]({{Types.NFTModel}}). */
export type NftModelCreateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The file content for this model. Either 'content' or 'contentId' must be specified. */
  content?: InputMaybe<NftContentInput>;
  /** The ID of the [NFTContent]({{Types.NFTContent}}) for this model. Either 'content' or 'contentId' must be specified. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** The user-friendly details about this model. This will be added to the blockchain metadata when an NFT is minted. */
  description?: InputMaybe<Scalars['String']>;
  /** Metadata that will be added to the blockchain for any NFTs minted from this model. */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** The total supply of NFTs that can be available for this model. This can be updated until the NFTModel is minted. */
  quantity?: InputMaybe<Scalars['PositiveInt']>;
  /** The status of the model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. This will be added to the blockchain metadata when an NFT is minted. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** String labels to tag this [NFTModel]({{Types.NFTModel}}) with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this model. This will be added to the blockchain metadata when an NFT is minted. */
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
  /** The tags in the [NFTModel]({{Types.NFTModel}}) to find. The models returned will contain every tag specified. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** A list of NFTModels. */
export type NftModelList = Pageable & {
  __typename?: 'NFTModelList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTModels in this list. */
  items?: Maybe<Array<Maybe<NftModel>>>;
};

/** The input to update an NFT model. */
export type NftModelUpdateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The file content for this model. This can be updated until the NFTModel is minted. */
  content?: InputMaybe<NftContentInput>;
  /** The ID of the [NFTContent]({{Types.NFTContent}}) for this model. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** The user-friendly details about this model. This will be added to the blockchain metadata when an NFT is minted. */
  description?: InputMaybe<Scalars['String']>;
  /** Metadata that will be added to the blockchain for any NFTs minted from this model. This can be updated until the NFTModel is minted */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** The total supply of NFTs that can be available for this model. This can be updated until the NFTModel is minted. */
  quantity?: InputMaybe<Scalars['PositiveInt']>;
  /** The status of the model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. This will be added to the blockchain metadata when an NFT is minted. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** String labels to tag this [NFTModel]({{Types.NFTModel}}) with. These will be stored in the Niftory API but will not be added to the blockchain. Updating this will replace the existing tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this model. This will be added to the blockchain metadata when an NFT is minted. */
  title?: InputMaybe<Scalars['String']>;
};

/** A set of NFTModels, to help you organize your NFTs. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type NftSet = Attributable & BlockchainEntity & BlockchainResource & Identifiable & Resource & {
  __typename?: 'NFTSet';
  /** The app this set belongs to. */
  app?: Maybe<App>;
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The image to represent this set. */
  image?: Maybe<Scalars['URL']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** Models contained in this set. */
  models?: Maybe<Array<Maybe<NftModel>>>;
  /** The state of this NFT Set on the blockchain */
  state: NftSetBlockchainState;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** The display image for this set. */
  title: Scalars['String'];
};

/** The state of an NFT Set on the blockchain. */
export enum NftSetBlockchainState {
  /** An error occurred with this item's last blockchain operation. */
  Error = 'ERROR',
  /** The item is minted, and are no pending operations on it. */
  Minted = 'MINTED',
  /** The item is being minted. */
  Minting = 'MINTING',
  /** The item hasn't been minted yet. */
  Unminted = 'UNMINTED'
}

/** The input to create an [NFTSet]({{Types.NFTSet}}). */
export type NftSetCreateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** String labels to tag this [NFTSet]({{Types.NFTSet}}) with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this model. */
  title: Scalars['String'];
};

export type NftSetFilterInput = {
  /** Blockchain IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The tags in the [NFTSet]({{Types.NFTSet}}) to find. The sets returned will contain every tag specified. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The title of the [NFTSet]({{Types.NFTSet}}) to find. */
  title?: InputMaybe<Scalars['String']>;
};

/** The input to update an [NFTSet]({{Types.NFTSet}}). */
export type NftSetUpdateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** String labels to tag this [NFTSet]({{Types.NFTSet}}) with. These will be stored in the Niftory API but will not be added to the blockchain. Updating this will replace the existing tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this set. */
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
  /** Gets the list of users for your app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appUsers?: Maybe<AppUserList>;
  /** Gets the [Contract]({{Types.Contract}}) from the currently authenticated app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
  contract?: Maybe<Contract>;
  /** Gets a [File]({{Types.File}}) by its ID. */
  file?: Maybe<SimpleFile>;
  /** Gets the list of invoices for your app. */
  invoices?: Maybe<InvoiceList>;
  /** Gets an [NFT]({{Types.NFT}}) by database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nft?: Maybe<Nft>;
  /** Gets an [NFTListing]({{Types.NFTListing}}) by ID. */
  nftListing?: Maybe<NftListing>;
  /** Gets [NFTListing]({{Types.NFTListing}})s for the current [App]({{Types.App}}) context */
  nftListings?: Maybe<NftListingList>;
  /** Gets an [NFTModel]({{Types.NFTModel}}) by database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftModel?: Maybe<NftModel>;
  /** Gets [NFTModel]({{Types.NFTModel}})s for the current [App]({{Types.App}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftModels?: Maybe<NftModelList>;
  /** Gets [NFT]({{Types.NFT}})s associated with the current [AppUser]({{Types.AppUser}}) context, including those that are transferring or failed to transfer. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nfts?: Maybe<NftList>;
  /** Gets [NFT]({{Types.NFT}})s associated with the current wallet, including those that are transferring or failed to transfer. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftsByWallet?: Maybe<NftList>;
  /** Gets an [NFTSet]({{Types.NFTSet}}) by database ID. */
  set?: Maybe<NftSet>;
  /** Gets [NFTSet]({{Types.NFTSet}})s for the current [App]({{Types.App}}) context. */
  sets?: Maybe<Array<Maybe<NftSet>>>;
  /** Gets the primary [Wallet]({{Types.Wallet}}) belonging to the current [AppUser]({{Types.AppUser}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  wallet?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its blockchain address. Wallet must be registered using [registerWallet]({{Mutations.registerWallet}}) before this request succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByAddress?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletById?: Maybe<Wallet>;
  /** Gets the primary [Wallet]({{Types.Wallet}}) for a given [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByUserId?: Maybe<Wallet>;
  /** Gets all [Wallet]({{Types.Wallet}})s for a given app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  wallets?: Maybe<WalletList>;
};


export type QueryAppByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryAppUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAppUsersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryFileArgs = {
  id: Scalars['ID'];
};


export type QueryInvoicesArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  cursor?: InputMaybe<Scalars['String']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryNftArgs = {
  id: Scalars['ID'];
};


export type QueryNftListingArgs = {
  id: Scalars['ID'];
};


export type QueryNftListingsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftListingFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
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


export type QueryNftsByWalletArgs = {
  address?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
  walletId?: InputMaybe<Scalars['ID']>;
};


export type QuerySetArgs = {
  id: Scalars['ID'];
};


export type QuerySetsArgs = {
  filter?: InputMaybe<NftSetFilterInput>;
};


export type QueryWalletByAddressArgs = {
  address: Scalars['String'];
};


export type QueryWalletByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWalletByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryWalletsArgs = {
  appId: Scalars['ID'];
  cursor?: InputMaybe<Scalars['String']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};

/** The input to register a [Wallet]({{Types.Wallet}}). */
export type RegisterWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
};

/** An interface representing properties common to all user-managed resources in the Niftory API. */
export type Resource = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
};

/** The state of an item being sold. */
export enum SaleState {
  /** The item has not been reserved or purchased yet. */
  Available = 'AVAILABLE',
  /** The item has been delivered. */
  Fulfilled = 'FULFILLED',
  /** The item has been paid for and is being fulfilled. */
  Paid = 'PAID',
  /** The item is reserved for a future purchase. */
  Reserved = 'RESERVED'
}

/** An interface representing properties common to all objects that can be bought and sold */
export type SellableEntity = {
  /** This state of this object's sale. */
  saleState?: Maybe<SaleState>;
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

/** The input to update [Wallet]({{Types.Wallet}}) data. */
export type UpdateWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
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

/** Represents a blockchain wallet scoped to a particular [App]({{Types.App}}) and [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets). */
export type Wallet = Attributable & Identifiable & {
  __typename?: 'Wallet';
  /** This wallet's address on the blockchain. */
  address: Scalars['String'];
  /** The User who owns the wallet */
  appUser?: Maybe<AppUser>;
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The NFTs from the current app that are in this wallet. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The state of this wallet. */
  state: WalletState;
  /** The verification code that can be used to verify this wallet for this user. */
  verificationCode?: Maybe<Scalars['String']>;
};

/** A list of Wallets. */
export type WalletList = Pageable & {
  __typename?: 'WalletList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The Wallets in this list. */
  items?: Maybe<Array<Maybe<Wallet>>>;
};

/** The state of a wallet. */
export enum WalletState {
  /** (Custodial Wallet Only) The Niftory custodial wallet failed to be created on the blockchain. */
  CreationFailed = 'CREATION_FAILED',
  /** (Custodial Wallet Only) The Niftory custodial wallet is in the process of being created on-chain. The address and state of the Wallet object will be updated once complete. */
  PendingCreation = 'PENDING_CREATION',
  /** The wallet is ready to receive NFTs from this app's contract. */
  Ready = 'READY',
  /** The wallet has been registered with Niftory, but not yet verified to belong to the signed-in user. */
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

export type TransferNftToWalletMutationVariables = Exact<{
  nftModelId: Scalars['ID'];
  address: Scalars['String'];
}>;


export type TransferNftToWalletMutation = { __typename?: 'Mutation', transfer?: { __typename?: 'NFT', id: string } | null };

export type VerifyWalletMutationVariables = Exact<{
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
}>;


export type VerifyWalletMutation = { __typename?: 'Mutation', verifyWallet?: { __typename?: 'Wallet', id: string, address: string, state: WalletState } | null };

export type ContractQueryVariables = Exact<{ [key: string]: never; }>;


export type ContractQuery = { __typename?: 'Query', contract?: { __typename?: 'Contract', name?: string | null, address?: string | null } | null };

export type NftQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', blockchainId?: string | null, metadata?: any | null, id: string, serialNumber?: number | null, status?: TransferState | null, model?: { __typename?: 'NFTModel', id: string, attributes?: any | null, status?: Status | null, blockchainId?: string | null, metadata?: any | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null } | null } | null };

export type NftModelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NftModelQuery = { __typename?: 'Query', nftModel?: { __typename?: 'NFTModel', id: string, attributes?: any | null, status?: Status | null, blockchainId?: string | null, metadata?: any | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null, set: { __typename?: 'NFTSet', id: string } } | null };

export type NftModelsQueryVariables = Exact<{
  appId?: InputMaybe<Scalars['ID']>;
}>;


export type NftModelsQuery = { __typename?: 'Query', nftModels?: { __typename?: 'NFTModelList', cursor?: string | null, items?: Array<{ __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTFile', url: any, contentType?: string | null } | null> | null, poster?: { __typename?: 'SimpleFile', url: any } | null } | null } | null> | null } | null };

export type NftsByWalletQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
}>;


export type NftsByWalletQuery = { __typename?: 'Query', nftsByWallet?: { __typename?: 'NFTList', cursor?: string | null, items?: Array<{ __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, blockchainState: NftBlockchainState, status?: TransferState | null, model?: { __typename?: 'NFTModel', id: string, title: string, description: string, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null } | null } | null } | null> | null } | null };

export type WalletByAddressQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type WalletByAddressQuery = { __typename?: 'Query', walletByAddress?: { __typename?: 'Wallet', id: string, address: string, state: WalletState, verificationCode?: string | null } | null };


export const ReadyWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"readyWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readyWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<ReadyWalletMutation, ReadyWalletMutationVariables>;
export const RegisterWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"verificationCode"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<RegisterWalletMutation, RegisterWalletMutationVariables>;
export const TransferNftToWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"transferNFTToWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nftModelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transfer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nftModelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nftModelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TransferNftToWalletMutation, TransferNftToWalletMutationVariables>;
export const VerifyWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signedVerificationCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"signedVerificationCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signedVerificationCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<VerifyWalletMutation, VerifyWalletMutationVariables>;
export const ContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<ContractQuery, ContractQueryVariables>;
export const NftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nft"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rarity"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<NftQuery, NftQueryVariables>;
export const NftModelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nftModel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftModel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rarity"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"set"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<NftModelQuery, NftModelQueryVariables>;
export const NftModelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nftModels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"appId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftModels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"appId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"appId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"rarity"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]} as unknown as DocumentNode<NftModelsQuery, NftModelsQueryVariables>;
export const NftsByWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nftsByWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nftsByWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainId"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"blockchainState"}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rarity"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}}]}}]} as unknown as DocumentNode<NftsByWalletQuery, NftsByWalletQueryVariables>;
export const WalletByAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"walletByAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletByAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"verificationCode"}}]}}]}}]} as unknown as DocumentNode<WalletByAddressQuery, WalletByAddressQueryVariables>;