import REDEEM_ACCOUNT from "../../../cadence/transactions/hybrid-custody/redeem_account.cdc"

export const useRedeemAccount = (fcl) => {
  const redeemAccount = async ({ childAddress }) => {
    const parentAuthz = fcl.currentUser().authorization
    const transactionId = await fcl.mutate({
      cadence: REDEEM_ACCOUNT,
      limit: 9999,
      payer: parentAuthz,
      proposer: parentAuthz,
      authorizations: [parentAuthz],
      args: (arg, t) => [arg(childAddress, t.Address)],
    } as any)

    const result = await fcl.tx(transactionId).onceSealed()
    console.log(result)
  }

  return { redeemAccount }
}
