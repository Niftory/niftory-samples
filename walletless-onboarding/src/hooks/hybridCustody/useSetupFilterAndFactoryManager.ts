import { resolveCadenceImports } from "utils/resolveCadenceImport"
import SETUP_FILTER_AND_FACTORY_MANAGER from '../../../cadence/transactions/hybrid-custody/dev/setup_filter_and_factory_manager.cdc'
import { usePollTransactionStatus } from "hooks/usePollTransactionStatus"

export const useSetupFilterAndFactoryManager = (niftoryClient) => {
  const pollTransaction = usePollTransactionStatus(niftoryClient)

  const setupFilterAndFactoryManager = async ({address}) => {
    const {address: nftContractAddress, name: nftContractName} = await niftoryClient.getContract()
    const transaction = await niftoryClient.executeBlockchainTransaction({
      name: "SETUP_FILTER_AND_FACTORY_MANAGER",
      transaction: await resolveCadenceImports(SETUP_FILTER_AND_FACTORY_MANAGER),
      address,
      args: {
        nftContractAddress,
        nftContractName,
      },
    })
    pollTransaction(transaction)
  }

  return { setupFilterAndFactoryManager }
}