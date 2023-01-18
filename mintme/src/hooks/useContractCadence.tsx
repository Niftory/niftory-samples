import { gql } from "graphql-request"
import { useGraphQLQuery } from "graphql/useGraphQLQuery"
import { ContractQuery, ContractQueryVariables, ContractDocument } from "../../generated/graphql"

const nonFungibleTokenAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS
const metadataViewsAddress = process.env.NEXT_PUBLIC_METADATA_VIEWS_ADDRESS
const niftoryAddress = process.env.NEXT_PUBLIC_NIFTORY_ADDRESS
const registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const contractVersion = process.env.NEXT_PUBLIC_CONTRACT_VERSION
const IS_ACCOUNT_CONFIGURED__SCRIPT = `
    import {contractName} from {contractAddress}
    import NonFungibleToken from ${nonFungibleTokenAddress}

    pub fun main(account: Address): Bool {

        let acct = getAccount(account)

        return acct.getCapability<&{{contractName}.{contractName}CollectionPublic}>({contractName}.CollectionPublicPath).check()

    }`

const IS_ACCOUNT_CONFIGURED_V2__SCRIPT = `
    import NonFungibleToken from ${nonFungibleTokenAddress}
    import MetadataViews from ${metadataViewsAddress}
    import NiftoryNonFungibleToken from ${niftoryAddress}
    import NiftoryNFTRegistry from ${niftoryAddress}
    import {contractName} from {contractAddress}

    pub fun main(account: Address): Bool {

        let paths = NiftoryNFTRegistry.getCollectionPaths(${registryAddress}, "${clientId}_{contractName}")

        let acct = getAccount(account)

        return acct.getCapability<&{
            NonFungibleToken.Receiver,
            NonFungibleToken.CollectionPublic,
            MetadataViews.ResolverCollection,
            NiftoryNonFungibleToken.CollectionPublic
        }>(paths.public).check()

    }`

const CONFIGURE_ACCOUNT__TRANSACTION = `
    import {contractName} from {contractAddress}
    import NonFungibleToken from ${nonFungibleTokenAddress}
    import MetadataViews from ${nonFungibleTokenAddress}

    // This transaction sets up an account to collect Collectibles
    // by storing an empty collectible collection and creating
    // a public capability for it

    transaction {

        prepare(acct: AuthAccount) {

            // First, check to see if a collectible collection already exists
            if acct.borrow<&{contractName}.Collection>(from: {contractName}.CollectionStoragePath) == nil {

                // create a new {contractName} Collection
                let collection <- {contractName}.createEmptyCollection() as! @{contractName}.Collection

                // Put the new Collection in storage
                acct.save(<-collection, to: {contractName}.CollectionStoragePath)
            }

            // create a public capability for the collection
            acct.unlink({contractName}.CollectionPublicPath)
            acct.link<&{
                {contractName}.{contractName}CollectionPublic,
                NonFungibleToken.Receiver,
                NonFungibleToken.CollectionPublic,
                MetadataViews.ResolverCollection
            }>({contractName}.CollectionPublicPath, target: {contractName}.CollectionStoragePath)
        }
    }`

const CONFIGURE_ACCOUNT_V2__TRANSACTION = `
    import NonFungibleToken from ${nonFungibleTokenAddress}
    import MetadataViews from ${metadataViewsAddress}
    import NiftoryNonFungibleToken from ${niftoryAddress}
    import NiftoryNFTRegistry from ${niftoryAddress}
    import {contractName} from {contractAddress}
    
    transaction {
        prepare(acct: AuthAccount) {
            let paths = NiftoryNFTRegistry.getCollectionPaths(${registryAddress}, "${clientId}_{contractName}")
            
            if acct.borrow<&NonFungibleToken.Collection>(from: paths.storage) == nil {
                let nftManager = NiftoryNFTRegistry.getNFTManagerPublic(${registryAddress}, "${clientId}_{contractName}")
                let collection <- nftManager.getNFTCollectionData().createEmptyCollection()
                acct.save(<-collection, to: paths.storage)
    
                acct.unlink(paths.public)
                acct.link<&{
                    NonFungibleToken.Receiver,
                    NonFungibleToken.CollectionPublic,
                    MetadataViews.ResolverCollection,
                    NiftoryNonFungibleToken.CollectionPublic
                }>(paths.public, target: paths.storage)
    
                acct.unlink(paths.private)
                acct.link<&{
                    NonFungibleToken.Provider,
                    NiftoryNonFungibleToken.CollectionPrivate
                }>(paths.private, target: paths.storage)
            }
        }
    }`

function prepareCadence(script: string, contractName: string, address: string) {
  return script.replaceAll("{contractName}", contractName).replaceAll("{contractAddress}", address)
}

export function useContractCadence() {
  const { contract, fetching } = useGraphQLQuery<ContractQuery, ContractQueryVariables>({
    query: ContractDocument,
  })

  let isAccountConfigured_script: string
  let configureAccount_transaction: string

  if (contract && !fetching) {
    const { name, address } = contract

    isAccountConfigured_script = prepareCadence(
      contractVersion === "V2" ? IS_ACCOUNT_CONFIGURED_V2__SCRIPT : IS_ACCOUNT_CONFIGURED__SCRIPT,
      name,
      address
    )

    configureAccount_transaction = prepareCadence(
      contractVersion === "V2" ? CONFIGURE_ACCOUNT_V2__TRANSACTION : CONFIGURE_ACCOUNT__TRANSACTION,
      name,
      address
    )
  }

  return {
    isAccountConfigured_script,
    configureAccount_transaction,
    isLoading: fetching,
  }
}
