import React from 'react'
import * as fcl from "@onflow/fcl"
import { Button, SimpleGrid, GridItem, Text, Box, Stack } from '@chakra-ui/react';

import "../../lib/fcl/config"
import { useFlowUser, useNiftoryClient, useWalletQuery } from '@niftory/sdk/react';

import { useSetupOwnedAccountAndPublishToParent } from 'hooks/hybridCustody/useSetupOwnedAccountAndPublishToParent';
import { useSetupFilterAndFactoryManager } from 'hooks/hybridCustody/useSetupFilterAndFactoryManager';
import { useRemoveParentFromChild } from 'hooks/hybridCustody/useRemoveParentFromChild';
import { useRedeemAccount } from 'hooks/hybridCustody/useRedeemAccount';
import { useRemoveChildFromParent } from 'hooks/hybridCustody/useRemoveChildFromParent';
import { useHybridCustodyQueries } from 'hooks/hybridCustody/useHybridCustodyQueries';
import { useAddAccountMultisign } from 'hooks/hybridCustody/useAddAccountMultiSign';


export const ParentWallet = () => {
  const flowUser = useFlowUser()
  const niftoryClient = useNiftoryClient()
  const [{ data, fetching: walletFetching }] = useWalletQuery()

  const wallet = data?.wallet

  const { setupFilterAndFactoryManager } = useSetupFilterAndFactoryManager(niftoryClient)
  const { setupOwnedAccountAndPublishToParent } = useSetupOwnedAccountAndPublishToParent(niftoryClient)
  const { redeemAccount } = useRedeemAccount(fcl)
  const { removeParentFromChild } = useRemoveParentFromChild(niftoryClient)
  const { removeChildFromParent } = useRemoveChildFromParent(fcl)
  const { getParentFromChild, getChildrenFromParent, getNfts } = useHybridCustodyQueries(fcl)
  const { addAccountMultiSign } = useAddAccountMultisign(fcl)

  if (walletFetching) {
    return 'loading ...'
  }

  if (!flowUser?.addr) {
    return <Button onClick={fcl.logIn}>Login into parent wallet</Button>
  }

  return <SimpleGrid>
    <GridItem>
      <Stack>
        <Text>parent wallet address {flowUser?.addr}</Text>
        <Button onClick={() => setupFilterAndFactoryManager({address: wallet.address})}>setupFilterAndFactoryManager</Button>
        <Button onClick={() => setupOwnedAccountAndPublishToParent({address: wallet.address, parent: flowUser.addr, factoryAddress: wallet.address, filterAddress: wallet.address})}>Set up child account & publish to parent</Button>
        <Button onClick={() => redeemAccount({
          childAddress: wallet.address,
        })}>redeem account</Button>
        <Button onClick={() => getParentFromChild({
          childAddress: wallet.address,
        })}>
          get parent account
        </Button>
        <Button onClick={() => getChildrenFromParent({
          parentAddress: flowUser.addr,
        })}>
          get children accounts
        </Button>

        <Button onClick={() => removeChildFromParent({
          childAddress: wallet.address,
        })}>
          Remove child
        </Button>

        <Button onClick={() => removeParentFromChild({
          address: wallet.address,
          parent: flowUser.addr,
        })}>
          Remove parent from child
        </Button>

        <Button onClick={() => addAccountMultiSign({
          childAddress: wallet.address,
        })}>
          multisig
        </Button>
        <Button onClick={() => getNfts({parentAddress: flowUser.addr})}>get NFTs</Button>

        <Button onClick={fcl.unauthenticate}>logout</Button>
      </Stack>
    </GridItem>
    <GridItem>


    </GridItem>
  </SimpleGrid>
}