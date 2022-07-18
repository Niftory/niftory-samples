declare module "@onflow" {}

// Add type definitions from https://docs.onflow.org/fcl/reference/api/ on a use-by-use basis
declare module "@onflow/fcl" {
  type ConfigInstance = {
    put: (key: string, value: any) => ConfigInstance
    get: (key: string, fallback: string) => any
  }

  /** https://docs.onflow.org/fcl/reference/api/#Builder */
  type Builder = unknown

  /** https://docs.onflow.org/fcl/reference/api/#KeyObject */
  type KeyObject = {
    index: number
    publicKey: string
    signAlgo: number
    hashAlgo: number
    weight: number
    sequenceNumber: number
  }

  /** https://docs.onflow.org/fcl/reference/api/#AccountObject */
  type AccountObject = {
    address: Address
    code: string
    keys: KeyObject[]
    contracts?: { [c: Contract]: string }
    balance?: number
  }

  /** https://docs.onflow.org/fcl/reference/api/#Address */
  type Address = string

  /** https://docs.onflow.org/fcl/reference/api/#Contract */
  type Contract = string

  /** https://docs.onflow.org/fcl/reference/api/#ArgumentObject */
  type ArgumentObject = {
    value: any
    xform: FType
  }

  /** https://docs.onflow.org/fcl/reference/api/#FType */
  type FType = unknown

  /** https://docs.onflow.org/fcl/reference/api/#ResponseObject */
  type ResponseObject = {
    tag: number
    transaction?: unknown
    transactionStatus?: unknown
    transactionId?: unknown
    encodedData?: unknown
    events?: unknown
    account?: AccountObject
    block?: unknown
    blockHeader?: unknown
    collection?: unknown
  }

  /** https://docs.onflow.org/fcl/reference/api/#authorizationobject */
  type AuthorizationObject = {
    addr: Address
    signingFunction: unknown
    keyId: number
    sequenceNum: number
  }

  /** https://docs.onflow.org/fcl/reference/api/#authorization-function */
  type AuthorizationFunction = (account: AccountObject) => Promise<AuthorizationObject>

  /** https://docs.onflow.org/fcl/reference/api/#Interaction */
  type Interaction = Builder
  type PartialInteraction = Interaction

  type ServiceObject = unknown

  /** https://docs.onflow.org/fcl/reference/api/#currentuserobject */
  type CurrentUserObject = {
    addr?: Address
    cid?: string
    expiresAt?: number
    f_type: string
    f_vsn: string
    loggedIn?: boolean
    services: [ServiceObject]
    subscribe: (callback: (obj: CurrentUserObject, ...args: unknown[]) => void) => void
    authorization: AuthorizationFunction
    signUserMessage: (message: string) => Promise<CompositeSignature[]>
  }

  /** https://docs.onflow.org/fcl/reference/api/#mutate */
  type MutateParams = {
    cadence: string
    args?: ArgumentFunction
    limit?: number
    proposer?: AuthorizationFunction
  }

  /** https://docs.onflow.org/fcl/reference/api/#mutate */
  type QueryParams = {
    cadence: string
    args?: ArgumentFunction
    limit?: number
  }

  type Arg = unknown

  /** https://docs.onflow.org/fcl/reference/api/#argumentfunction */
  type ArgumentFunction = (arg: () => ArgumentObject, t: any) => Array<Arg>

  /** https://github.com/onflow/fcl-js/blob/master/packages/fcl/src/wallet-provider-spec/draft-v2.md#compositesignature */
  type CompositeSignature = {
    addr: string
    keyId: number
    signature: string
  }

  /** https://docs.onflow.org/fcl/reference/api/#config */
  export function config(): ConfigInstance

  /** https://docs.onflow.org/fcl/reference/api/#withPrefix */
  export function withPrefix(address: Address): Address

  /** https://docs.onflow.org/fcl/reference/api/#arg */
  export function arg(value: any, type: FType): ArgumentObject

  /** https://docs.onflow.org/fcl/reference/api/#args */
  export function args(args: ArgumentObject[]): PartialInteraction

  /** https://docs.onflow.org/fcl/reference/api/#send */
  export function send(builders: Builder[]): Promise<ResponseObject>

  /** https://docs.onflow.org/fcl/reference/api/#getAccount */
  export function getAccount(address: Address): AccountObject

  /** https://docs.onflow.org/fcl/reference/api/#transaction */
  export function transaction(code: string): PartialInteraction

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-payer.js */
  export function proposer(authz: AuthorizationFunction): Builder

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-proposer.js */
  export function payer(authz: AuthorizationFunction): Builder

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-authorizations.js */
  export function authorizations(ax: [AuthorizationFunction]): Builder

  /** Compute (Gas) limit for query/transaction */
  export function limit(limit: number): Builder

  /**
   * https://docs.onflow.org/fcl/reference/api/#tx
   * @description Implementation here: https://github.com/onflow/fcl-js/blob/master/packages/fcl/src/transaction/index.js#L94*/
  export function tx(transactionId: string | ResponseObject): {
    snapshot: () => Promise<unknown>

    // Returns an unsubscribe function
    subscribe: (callback: unknown) => () => void

    onceFinalized: () => Promise<unknown>
    onceExecuted: () => Promise<unknown>
    onceSealed: () => Promise<unknown>
  }

  /** https://docs.onflow.org/fcl/reference/api/#script */
  export function script(code: string): Interaction

  /** https://docs.onflow.org/fcl/reference/api/#decode */
  export function decode(response: ResponseObject): Promise<any>

  /** https://docs.onflow.org/fcl/reference/api/#currentusersubscribe */
  export const currentUser: CurrentUserObject

  /** https://docs.onflow.org/fcl/reference/api/#login */
  export function logIn(): void

  /** https://docs.onflow.org/fcl/reference/api/#unauthenticate */
  export function unauthenticate(): void

  /** https://docs.onflow.org/fcl/reference/api/#mutate */
  export function mutate(params: MutateParams): Promise<string>

  /** https://docs.onflow.org/fcl/reference/api/#query */
  export function query(params: QueryParams): Promise<any>

  /** https://docs.onflow.org/fcl/reference/api/#getblock */
  export function getBlock(): unknown

  /** https://docs.onflow.org/fcl/reference/api/#getblockheader */
  export function getBlockHeader(): unknown

  /** https://docs.onflow.org/fcl/reference/api/#atblockheight */
  export function atBlockHeight(blockHeight: number): unknown

  /** https://docs.onflow.org/fcl/reference/api/#atblockid */
  export function atBlockId(blockId: string): unknown

  /** https://docs.onflow.org/fcl/reference/api/#geteventsatblockheightrange */
  export function getEventsAtBlockHeightRange(
    eventName: string,
    fromBlockHeight: number,
    toBlockHeight: number
  ): unknown[]

  /** https://docs.onflow.org/fcl/reference/api/#getcollection */
  export function getCollection(collectionID: string): unknown

  export const AppUtils: {
    /** https://docs.onflow.org/fcl/reference/api/#apputilsverifyusersignatures */
    verifyUserSignatures: (
      message: string,
      compositeSignatures: CompositeSignature[],
      opts?: { fclCryptoContract?: string }
    ) => boolean
  }
}

declare module "@onflow/sdk" {
  export function send(args: unknown): Promise<any>
  export function build(args: unknown[]): unknown
  export function getBlock(arg: boolean): unknown
  export function decode(block: unknown): Promise<any>
}

// Add type definitions from https://docs.onflow.org/fcl/reference/api/#ftype
// Seealso: https://github.com/onflow/fcl-js/blob/master/packages/types/src/types.js
declare module "@onflow/types" {
  type Type = {
    label: "UInt" | "Int"
    asArgument: (v: any) => { type: string; value: any }
    asInjection: (v: any) => any
  }

  export const UInt: Type
  export const Int: Type
  export const UInt8: Type
  export const Int8: Type
  export const UInt16: Type
  export const Int16: Type
  export const UInt32: Type
  export const Int32: Type
  export const UInt64: Type
  export const Int64: Type
  export const UInt128: Type
  export const Int128: Type
  export const UInt256: Type
  export const Int256: Type
  export const Word8: Type
  export const Word16: Type
  export const Word32: Type
  export const Word64: Type
  export const UFix64: Type
  export const Fix64: Type
  export const String: Type
  export const Character: Type
  export const Bool: Type
  export const Address: Type
  export const Void: Type
  export function Optional(children: Type): Type
  export const Reference: Type
  export function Array(children: Type | Type[]): Type
  export function Dictionary(
    children: { key: Type; value: Type } | { key: Type; value: Type }[]
  ): Type

  // TODO: saqadri - validate these typings
  export function Event(id: any, fields: { value: Type } | { value: Type }[]): Type
  export function Resource(id: any, fields: { value: Type } | { value: Type }[]): Type
  export function Struct(id: any, fields: { value: Type } | { value: Type }[]): Type

  export const Path: Type
}

declare module "@onflow/transport-grpc" {
  export function send(): void
}
