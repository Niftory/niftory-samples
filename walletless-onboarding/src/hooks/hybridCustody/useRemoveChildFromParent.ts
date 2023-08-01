import REMOVE_CHILD_ACCOUNT from "../../../cadence/transactions/hybrid-custody/remove_child_account.cdc"

export const useRemoveChildFromParent = (fcl) => {
  const removeChildFromParent = async ({ childAddress }) => {
    const parentAuthz = fcl.currentUser().authorization
    const transactionId = await fcl.mutate({
      cadence: REMOVE_CHILD_ACCOUNT,
      limit: 9999,
      payer: parentAuthz,
      proposer: parentAuthz,
      authorizations: [parentAuthz],
      args: (arg, t) => [arg(childAddress, t.Address)],
    } as any)

    await fcl.tx(transactionId).onceSealed()
  }

  return { removeChildFromParent }
}
