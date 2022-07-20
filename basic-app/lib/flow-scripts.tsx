const contractName = process.env.NEXT_PUBLIC_CONTRACT_NAME;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const nonFungibleTokenAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;

const collectionInterfaceName = `${contractName}CollectionPublic`;

export const isConfiguredScript = `
    import ${contractName} from ${contractAddress}
    import NonFungibleToken from ${nonFungibleTokenAddress}

    pub fun main(account: Address): Bool {

        let acct = getAccount(account)
    
        return acct.getCapability<&{${contractName}.${collectionInterfaceName}}>(${contractName}.CollectionPublicPath).check()
    
    }`;

export const configureAccountTransaction = `
    import ${contractName} from ${contractAddress}
    import NonFungibleToken from ${nonFungibleTokenAddress}
    import MetadataViews from ${nonFungibleTokenAddress}

    // This transaction sets up an account to collect Collectibles
    // by storing an empty collectible collection and creating
    // a public capability for it

    transaction {

        prepare(acct: AuthAccount) {

            // First, check to see if a collectible collection already exists
            if acct.borrow<&${contractName}.Collection>(from: ${contractName}.CollectionStoragePath) == nil {

                // create a new ${contractName} Collection
                let collection <- ${contractName}.createEmptyCollection() as! @${contractName}.Collection

                // Put the new Collection in storage
                acct.save(<-collection, to: ${contractName}.CollectionStoragePath)
            }

            // create a public capability for the collection
            acct.unlink(${contractName}.CollectionPublicPath)
            acct.link<&{
                ${contractName}.${collectionInterfaceName},
                NonFungibleToken.Receiver,
                NonFungibleToken.CollectionPublic,
                MetadataViews.ResolverCollection
            }>(${contractName}.CollectionPublicPath, target: ${contractName}.CollectionStoragePath)
        }
    }`;
