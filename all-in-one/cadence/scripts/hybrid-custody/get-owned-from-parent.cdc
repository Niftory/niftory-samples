import "HybridCustody"

pub fun main(parent: Address): [Address] {
    let acct = getAuthAccount(parent)
    let o = acct.borrow<&HybridCustody.Manager>(from: HybridCustody.ManagerStoragePath)
        ?? panic("parent account not found")

    return o.getOwnedAddresses()
}
