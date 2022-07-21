import { gql } from "graphql-request";
import { useContractQuery } from "../generated/graphql";
import { useGraphQLClient } from "./useGraphQLClient";

gql`
  query contract {
    contract {
      name
      address
    }
  }
`;

const nonFungibleTokenAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const IS_ACCOUNT_CONFIGURED__SCRIPT = `
    import {contractName} from {contractAddress}
    import NonFungibleToken from ${nonFungibleTokenAddress}

    pub fun main(account: Address): Bool {

        let acct = getAccount(account)
    
        return acct.getCapability<&{{contractName}.{contractName}CollectionPublic}>({contractName}.CollectionPublicPath).check()
    
    }`;

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
    }`;

function prepareCadence(script: string, contractName: string, address: string) {
  return script
    .replaceAll("{contractName}", contractName)
    .replaceAll("{contractAddress}", address);
}

export function useContractCadence() {
  const client = useGraphQLClient();

  const { data, isFetched } = useContractQuery(client, {});

  let isAccountConfigured_script: string;
  let configureAccount_transaction: string;
  if (isFetched) {
    const { name, address } = data?.contract;

    isAccountConfigured_script = prepareCadence(
      IS_ACCOUNT_CONFIGURED__SCRIPT,
      name,
      address
    );

    configureAccount_transaction = prepareCadence(
      CONFIGURE_ACCOUNT__TRANSACTION,
      name,
      address
    );
  }

  console.log(isAccountConfigured_script);

  return {
    isAccountConfigured_script,
    configureAccount_transaction,
    isLoading: !isFetched,
  };
}
