import { resolveCadenceImports } from "utils/resolveCadenceImport"
import REMOVE_PARENT_FROM_CHILD from "../../../cadence/transactions/hybrid-custody/remove_parent_from_child.cdc";
import { usePollTransactionStatus } from "hooks/usePollTransactionStatus"

export const useRemoveParentFromChild = (niftoryClient) => {
  const pollTransaction = usePollTransactionStatus(niftoryClient)

  const removeParentFromChild = async ({address, parent}) => {

    const transaction = await niftoryClient.executeBlockchainTransaction({
      name: "REMOVE_PARENT_FROM_CHILD",
      transaction: await resolveCadenceImports(REMOVE_PARENT_FROM_CHILD),
      address,
      args: {
        parent,
      }
    })
    pollTransaction(transaction)
    console.log(transaction)
  }

  return { removeParentFromChild }
}