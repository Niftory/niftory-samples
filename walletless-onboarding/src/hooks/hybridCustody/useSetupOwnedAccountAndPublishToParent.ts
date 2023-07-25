import { resolveCadenceImports } from "utils/resolveCadenceImport"
import SETUP_OWNED_ACCOUNT_AND_PUBLISH_TO_PARENT from "../../../cadence/transactions/hybrid-custody/setup_owned_account_and_publish_to_parent.cdc"
import { usePollTransactionStatus } from "hooks/usePollTransactionStatus"

export const useSetupOwnedAccountAndPublishToParent = (niftoryClient) => {
  const { pollTransaction, transactionState } = usePollTransactionStatus(niftoryClient)

  const setupOwnedAccountAndPublishToParent = async ({
    address,
    parent,
    factoryAddress,
    filterAddress,
  }) => {
    const transaction = await niftoryClient.executeBlockchainTransaction({
      name: "SETUP_OWNED_ACCOUNT_AND_PUBLISH_TO_PARENT",
      transaction: await resolveCadenceImports(SETUP_OWNED_ACCOUNT_AND_PUBLISH_TO_PARENT),
      address,
      args: {
        parent,
        factoryAddress,
        filterAddress,
      },
    })
    pollTransaction(transaction)
  }

  return {
    setupOwnedAccountAndPublishToParent,
    setupOwnedAccountAndPublishToParentState: transactionState,
  }
}
