declare module "@onflow" {}

// Add type definitions from https://docs.onflow.org/fcl/reference/api/ on a use-by-use basis
declare module "@onflow/fcl" {
  type ConfigInstance = {
    put: (key: string, value: any) => ConfigInstance
    get: (key: string, fallback: string) => any
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
  type FType = t.type

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

  type SignableObject = {
    addr: Address
    keyId: number
    signature: string
  }

  type SigningFunctionPayload = {
    message: string
    addr: string
    keyId: string
    roles: string
    voucher: unknown
  }

  /** https://developers.flow.com/tools/fcl-js/reference/api#signing-function */
  type SigningFunction = (payload: SigningFunctionPayload) => Promise<SignableObject>

  /** https://docs.onflow.org/fcl/reference/api/#authorizationobject */
  type AuthorizationObject = {
    addr: Address
    signingFunction: SigningFunction
    tempId: string
    keyId: number
    sequenceNum?: number
  }

  /** https://developers.flow.com/tools/fcl-js/reference/api#keyobject */
  type KeyObject = {
    index: number
    publicKey: string
    signAlgo: number
    hashAlgo: number
    weight: number
    sequenceNumber: number
    revoked: boolean
  }

  /** https://developers.flow.com/tools/fcl-js/reference/api#accountobject */
  type AccountObject = {
    address: Address
    balance: number
    code: unknown
    contracts: Record<string, string>
    keys: KeyObject[]
  }

  /** https://docs.onflow.org/fcl/reference/api/#authorization-function */
  type AuthorizationFunction = (account: AccountObject) => Promise<AuthorizationObject>

  /** https://docs.onflow.org/fcl/reference/api/#Interaction */
  type Interaction = Builder
  type PartialInteraction = Interaction

  type ServiceObject = unknown

  /** https://docs.onflow.org/fcl/reference/api/#currentuserobject */
  export type CurrentUserObject = {
    addr?: Address
    cid?: string
    expiresAt?: number
    f_type: string
    f_vsn: string
    loggedIn?: boolean
    services: [ServiceObject]
  }

  /** https://developers.flow.com/tools/fcl-js/reference/api#currentusersubscribe */
  export type CurrentUser = {
    subscribe: (callback: (obj: CurrentUserObject, ...args: unknown[]) => void) => void
    authorization: AuthorizationFunction
    signUserMessage: (message: string) => Promise<CompositeSignature[]>
    snapshot: () => Promise<CurrentUserObject>
  }

  /** https://docs.onflow.org/fcl/reference/api/#mutate */
  export type MutateParams = {
    cadence: string
    args?: ArgumentFunction
    limit?: number
    proposer?: AuthorizationFunction | AuthorizationObject
    payer?: AuthorizationFunction | AuthorizationObject
    authorizations?: (AuthorizationFunction | AuthorizationObject)[]
  }

  /** https://developers.flow.com/tools/fcl-js/reference/api#eventname */
  export type EventName = string

  /** https://developers.flow.com/tools/fcl-js/reference/api#event-object */
  export type EventObject = {
    blockId: string
    blockHeight: number
    blockTimestamp: string
    type: EventName
    transactionId: string
    transactionIndex: number
    eventIndex: number
    data: any
  }

  export type TransactionStatus = number
  export type GRPCStatus = number

  /** https://developers.flow.com/tools/fcl-js/reference/api#transactionstatusobject */
  export type TransactionStatusObject = {
    blockId: string
    events: EventObject[]
    status: TransactionStatus
    statusString: string
    errorMessage: string
    statusCode: GRPCStatus
  }

  /** https://docs.onflow.org/fcl/reference/api/#mutate */
  type QueryParams = {
    cadence: string
    args?: ArgumentFunction
    limit?: number
  }

  type Arg = unknown

  /** https://docs.onflow.org/fcl/reference/api/#argumentfunction */
  type ArgumentFunction = (arg: function, t: FType) => Array<Arg>

  /** https://github.com/onflow/fcl-js/blob/master/packages/fcl/src/wallet-provider-spec/draft-v2.md#compositesignature */
  type CompositeSignature = {
    addr: string
    keyId: number
    signature: string
  }

  /** https://docs.onflow.org/fcl/reference/api/#config */
  export function config(config?: Record<string, string>): ConfigInstance
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

  /** https://docs.onflow.org/fcl/reference/api/#currentusersubscribe */
  export const currentUser: CurrentUser

  /** https://docs.onflow.org/fcl/reference/api/#login */
  export function logIn(): void

  /** https://docs.onflow.org/fcl/reference/api/#unauthenticate */
  export function unauthenticate(): void

  /** https://docs.onflow.org/fcl/reference/api/#mutate */
  export function mutate(params: MutateParams): Promise<string>

  /** https://docs.onflow.org/fcl/reference/api/#query */
  export function query(params: QueryParams): Promise<any>

  export const AppUtils: {
    /** https://docs.onflow.org/fcl/reference/api/#apputilsverifyusersignatures */
    verifyUserSignatures: (
      message: string,
      compositeSignatures: CompositeSignature[],
      opts?: { fclCryptoContract?: string }
    ) => boolean
  }

  /** https://docs.onflow.org/fcl/reference/api/#transaction */
  export function transaction(code: string): PartialInteraction

  /** https://developers.flow.com/tools/fcl-js/reference/api#gettransactionstatus */
  export function getTransactionStatus(transactionId: string): TransactionStatusObject

  /** https://docs.onflow.org/fcl/reference/api/#arg */
  export function arg(value: any, type: FType): ArgumentObject

  /** https://docs.onflow.org/fcl/reference/api/#args */
  export function args(args: ArgumentObject[]): PartialInteraction

  /** https://docs.onflow.org/fcl/reference/api/#send */
  export function send(builders: Builder[]): Promise<ResponseObject>

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-payer.js */
  export function proposer(authz: AuthorizationObject | AuthorizationFunction): Builder

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-proposer.js */
  export function payer(authz: AuthorizationObject | AuthorizationFunction): Builder

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-authorizations.js */
  export function authorizations(ax: (AuthorizationObject | AuthorizationFunction)[]): Builder

  /** https://developers.flow.com/tools/fcl-js/reference/api#authz */
  export const authz: AuthorizationObject

  export * as t from "@onflow/types"
}

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
}

declare module "@onflow/transport-grpc" {
  export function send(): void
}
