#allowAccountLinking

import "NonFungibleToken"
import "NiftoryNonFungibleToken"
import "MetadataViews"

import "CapabilityFactory"
import "CapabilityDelegator"
import "CapabilityFilter"
import "HybridCustody"

import "<CONTRACT_NAME>"

/// Links the signing accounts as labeled, with the child's AuthAccount Capability maintained in the parent's 
/// HybridCustody.Manager. Signing parent is also configured with <CONTRACT_NAME>.Collection and TicketToken.Vault.
///
transaction(childAccountFactoryAddress: Address, childAccountFilterAddress: Address) {
    
    let manager: &HybridCustody.Manager
    let childAccountCapability: Capability<&HybridCustody.ChildAccount{HybridCustody.AccountPrivate, HybridCustody.AccountPublic, MetadataViews.Resolver}>
    
    prepare(child: AuthAccount, parent: AuthAccount) {
    
        // --------------------- Begin HybridCustody setup of child account ---------------------
        //
        var acctCap = child.getCapability<&AuthAccount>(HybridCustody.LinkedAccountPrivatePath)
        if !acctCap.check() {
            acctCap = child.linkAccount(HybridCustody.LinkedAccountPrivatePath)!
        }

        if child.borrow<&HybridCustody.OwnedAccount>(from: HybridCustody.OwnedAccountStoragePath) == nil {
            let ownedAccount <- HybridCustody.createOwnedAccount(acct: acctCap)
            child.save(<-ownedAccount, to: HybridCustody.OwnedAccountStoragePath)
        }

        // check that paths are all configured properly
        child.unlink(HybridCustody.OwnedAccountPrivatePath)
        child.link<&HybridCustody.OwnedAccount{HybridCustody.BorrowableAccount, HybridCustody.OwnedAccountPublic, MetadataViews.Resolver}>(HybridCustody.OwnedAccountPrivatePath, target: HybridCustody.OwnedAccountStoragePath)

        child.unlink(HybridCustody.OwnedAccountPublicPath)
        child.link<&HybridCustody.OwnedAccount{HybridCustody.OwnedAccountPublic, MetadataViews.Resolver}>(HybridCustody.OwnedAccountPublicPath, target: HybridCustody.OwnedAccountStoragePath)

        // --------------------- End HybridCustody setup of child account ---------------------

        // --------------------- Begin HybridCustody setup of parent account ---------------------
        //
        if parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath) == nil {
            let m <- HybridCustody.createManager(filter: nil)
            parent.save(<- m, to: HybridCustody.ManagerStoragePath)
        }

        parent.unlink(HybridCustody.ManagerPublicPath)
        parent.unlink(HybridCustody.ManagerPrivatePath)

        parent.link<&HybridCustody.Manager{HybridCustody.ManagerPrivate, HybridCustody.ManagerPublic}>(HybridCustody.ManagerPrivatePath, target: HybridCustody.ManagerStoragePath)
        parent.link<&HybridCustody.Manager{HybridCustody.ManagerPublic}>(HybridCustody.ManagerPublicPath, target: HybridCustody.ManagerStoragePath)
        
        // --------------------- End HybridCustody setup of parent account ---------------------
        
        // --------------------- Begin HybridCustody redeem ---------------------
        //
        // Publish account to parent
        let owned = child.borrow<&HybridCustody.OwnedAccount>(from: HybridCustody.OwnedAccountStoragePath)
            ?? panic("owned account not found")

        let factory = getAccount(childAccountFactoryAddress).getCapability<&CapabilityFactory.Manager{CapabilityFactory.Getter}>(CapabilityFactory.PublicPath)
        assert(factory.check(), message: "factory address is not configured properly")

        let filterForChild = getAccount(childAccountFilterAddress).getCapability<&{CapabilityFilter.Filter}>(CapabilityFilter.PublicPath)
        assert(filterForChild.check(), message: "capability filter is not configured properly")

        owned.publishToParent(parentAddress: parent.address, factory: factory, filter: filterForChild)

        // claim the account on the parent
        let inboxName = HybridCustody.getChildAccountIdentifier(parent.address)
        self.childAccountCapability = parent.inbox.claim<&HybridCustody.ChildAccount{HybridCustody.AccountPrivate, HybridCustody.AccountPublic, MetadataViews.Resolver}>(inboxName, provider: child.address)
            ?? panic("child account cap not found")

        self.manager = parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
            ?? panic("manager no found")

        // --------------------- End HybridCustody redeem ---------------------

        // --------------------- Begin <CONTRACT_NAME> setup of parent account ---------------------
        //
        // Set up <CONTRACT_NAME>.Collection if it doesn't exist
        if parent.borrow<&<CONTRACT_NAME>.Collection>(from: <CONTRACT_NAME>.COLLECTION_STORAGE_PATH) == nil {
            // Create a new empty collection
            let collection <- <CONTRACT_NAME>.createEmptyCollection()
            // save it to the account
            parent.save(<-collection, to: <CONTRACT_NAME>.COLLECTION_STORAGE_PATH)
        }
        // Check for public capabilities
        if !parent.getCapability<
                &<CONTRACT_NAME>.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}
            >(
                <CONTRACT_NAME>.COLLECTION_PUBLIC_PATH
            ).check() {
            // create a public capability for the collection
            parent.unlink(<CONTRACT_NAME>.COLLECTION_PUBLIC_PATH)
            parent.link<
                &<CONTRACT_NAME>.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}
            >(
                <CONTRACT_NAME>.COLLECTION_PUBLIC_PATH,
                target: <CONTRACT_NAME>.COLLECTION_STORAGE_PATH
            )
        }
            // create private capability for the collection
            parent.unlink(<CONTRACT_NAME>.COLLECTION_PRIVATE_PATH)
            parent.link<
                &<CONTRACT_NAME>.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NiftoryNonFungibleToken.CollectionPrivate}
            >(
                <CONTRACT_NAME>.COLLECTION_PRIVATE_PATH,
                target: <CONTRACT_NAME>.COLLECTION_STORAGE_PATH
            )
        // --------------------- End <CONTRACT_NAME> setup of parent account ---------------------
    }
    execute {
        self.manager.addAccount(cap: self.childAccountCapability)
    }
}