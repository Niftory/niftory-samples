import { useCallback } from "react"
import ADD_ACCOUNT_MULTI_SIGN from "../../../cadence/transactions/hybrid-custody/add_account_multi_sign.cdc"
import {NiftoryClient} from "@niftory/sdk"
import { replaceCadencePlaceholders } from "utils/replaceCadencePlaceholders"

export const useAddAccountMultisign = (fcl: any, niftoryClient: NiftoryClient) => {
  const signTransaction = useCallback(async (transaction: string, address: string) => {
    return await niftoryClient.signTransaction({transaction, address})
  }, [])

  const addAccountMultiSign = async ({ childAddress }) => {
    const signerKeyId = 0
    const { name: nftContractName } = await niftoryClient.getContract()
    const cadence = replaceCadencePlaceholders(ADD_ACCOUNT_MULTI_SIGN, {CONTRACT_NAME: nftContractName })
    const tx = await fcl.mutate({
      // resolveCadenceImports converts explicit imports for Niftory sign operation
      cadence,
      args: (arg, t) => [
        arg(childAddress, t.Address),
        arg(childAddress, t.Address),
      ],
      authorizations: [
        async (account) => ({
          ...account,
          addr: childAddress,
          tempId: `${childAddress}-${signerKeyId}`,
          keyId: signerKeyId,
          signingFunction: async (signable) => {
            console.log(signable.message)
            return {
              keyId: signerKeyId,
              addr: childAddress,
              signature: await signTransaction(signable.message, childAddress),
            }
          },
        }),
        fcl.authz,
      ],
      limit: 9999,
    })

    await fcl.tx(tx).onceSealed()
  }

  return { addAccountMultiSign }
}
