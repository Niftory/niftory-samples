import { gql } from "graphql-request"
import { useQuery } from "urql"
import { ContractDocument, ContractQuery } from "../../generated/graphql"

gql`
  query contract {
    contract {
      name
      address
    }
  }
`

const nonFungibleTokenAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS
const metadataViewsAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS
const niftoryAddress = process.env.NEXT_PUBLIC_NIFTORY_ADDRESS
const registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

const IS_ACCOUNT_CONFIGURED_SCRIPT = `
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

const CONFIGURE_ACCOUNT_TRANSACTION = `
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
  const [contractResponse] = useQuery<ContractQuery>({ query: ContractDocument })
  const { data, fetching: isFetching, error } = contractResponse
  const isFetched = !isFetching && !error

  let isAccountConfigured_script: string
  let configureAccount_transaction: string
  if (isFetched) {
    const { name, address } = data?.contract

    isAccountConfigured_script = prepareCadence(IS_ACCOUNT_CONFIGURED_SCRIPT, name, address)

    configureAccount_transaction = prepareCadence(CONFIGURE_ACCOUNT_TRANSACTION, name, address)
  }

  return {
    isAccountConfigured_script,
    configureAccount_transaction,
    isLoading: !isFetched,
  }
}
