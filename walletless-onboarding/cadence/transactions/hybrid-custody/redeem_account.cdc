import "FungibleToken"
import "NonFungibleToken"
import "MetadataViews"

import "HybridCustody"

/// This transaction redeems a published
transaction(childAddress: Address) {
    prepare(parent: AuthAccount) {
        /* --- Redeem HybridCustody ChildAccount --- */
        //
        // Configure a HybridCustody Manager if needed
        if parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath) == nil {
            let m <- HybridCustody.createManager(filter: nil)
            parent.save(<- m, to: HybridCustody.ManagerStoragePath)

            parent.unlink(HybridCustody.ManagerPublicPath)
            parent.unlink(HybridCustody.ManagerPrivatePath)

            parent.link<&HybridCustody.Manager{HybridCustody.ManagerPrivate, HybridCustody.ManagerPublic}>(HybridCustody.ManagerPrivatePath, target: HybridCustody.ManagerStoragePath)
            parent.link<&HybridCustody.Manager{HybridCustody.ManagerPublic}>(HybridCustody.ManagerPublicPath, target: HybridCustody.ManagerStoragePath)
        }
        // Get a reference to the Manager
        let manager = parent.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
            ?? panic("Manager not found in signing account!")

        // Get the published ChildAccount Capability name & claim it
        let inboxName = HybridCustody.getChildAccountIdentifier(parent.address)
        let cap = parent.inbox.claim<&HybridCustody.ChildAccount{HybridCustody.AccountPrivate, HybridCustody.AccountPublic, MetadataViews.Resolver}>(inboxName, provider: childAddress)
            ?? panic("ChildAccount not available for claiming!")

        // Add the claimed Capability to the Manager as a child account
        manager.addAccount(cap: cap)

        // // Create display from the known contract association
        // let display = MetadataViews.Display(
        //         name: "Flow HC",
        //         description: "Flow Niftery HC",
        //         thumbnail: MetadataViews.HTTPFile(
        //           "https://avatars.githubusercontent.com/u/62387156"
        //         )
        // )
        // // Set parent-managed Display on the added account
        // manager.setChildAccountDisplay(address: childAddress, display)
    }
}