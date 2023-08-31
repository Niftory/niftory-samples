import React from "react"
import * as fcl from "@onflow/fcl"
import {
  Button,
  SimpleGrid,
  GridItem,
  Text,
  Box,
  Stack,
  Heading,
  StackDivider,
} from "@chakra-ui/react"

import "../../lib/fcl/config"
import { useFlowUser, useNiftoryClient, useWalletQuery } from "@niftory/sdk/react"

import { useSetupFilterAndFactoryManager } from "hooks/hybridCustody/useSetupFilterAndFactoryManager"
import { useRemoveParentFromChild } from "hooks/hybridCustody/useRemoveParentFromChild"
import { useRemoveChildFromParent } from "hooks/hybridCustody/useRemoveChildFromParent"
import { useHybridCustodyQueries } from "hooks/hybridCustody/useHybridCustodyQueries"
import { useAddAccountMultisign } from "hooks/hybridCustody/useAddAccountMultiSign"

export const ParentWallet = () => {
  const flowUser = useFlowUser()
  const niftoryClient = useNiftoryClient()
  const [{ data, fetching: walletFetching }] = useWalletQuery()

  const wallet = data?.wallet

  const { setupFilterAndFactoryManager, setupFilterAndFactoryManagerState } =
    useSetupFilterAndFactoryManager(fcl, niftoryClient)

  const { removeParentFromChild, removeParentFromChildState } =
    useRemoveParentFromChild(niftoryClient)

  const { removeChildFromParent } = useRemoveChildFromParent(fcl)

  const { fetchParentFromChild, fetchChildrenFromParent, fetchNfts, nfts, parent, children } =
    useHybridCustodyQueries(fcl)

  const { addAccountMultiSign } = useAddAccountMultisign(fcl, niftoryClient)

  if (walletFetching) {
    return <Text>loading ...</Text>
  }

  if (!flowUser?.addr) {
    return <Button onClick={fcl.logIn}>Login into parent wallet</Button>
  }

  return (
    <SimpleGrid>
      <GridItem>
        <Stack>
          <Text color="white">Parent wallet address {flowUser?.addr}</Text>
          <SimpleGrid columns={2} spacing={10}>
            <Button onClick={() => setupFilterAndFactoryManager({ address: wallet.address })}>
              Setup filter and factory manager
            </Button>
            <Text color="white">{setupFilterAndFactoryManagerState}</Text>
          </SimpleGrid>

          <SimpleGrid columns={2} spacing={10}>
            <Button
              onClick={() =>
                addAccountMultiSign({
                  childAddress: wallet.address,
                })
              }
            >
              Publish and redeem account multi sign
            </Button>
          </SimpleGrid>
          
          <SimpleGrid columns={2} spacing={10}>
            <Button
              onClick={() =>
                fetchParentFromChild({
                  childAddress: wallet.address,
                })
              }
            >
              Get parent account
            </Button>

            <Text color="white">{JSON.stringify(parent, null, 2)}</Text>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={10}>
            <Button
              onClick={() =>
                removeParentFromChild({
                  address: wallet.address,
                  parent: flowUser.addr,
                })
              }
            >
              Remove parent from child
            </Button>
            <Text color="white">{removeParentFromChildState}</Text>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={10}>
              <Button
                onClick={() =>
                  fetchChildrenFromParent({
                    parentAddress: flowUser.addr,
                  })
                }
              >
                Get children accounts
              </Button>
            <Text color="white">{JSON.stringify(children, null, 2)}</Text>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={10}>
            <Button
              onClick={() =>
                removeChildFromParent({
                  childAddress: wallet.address,
                })
              }
            >
              Remove child from parent
            </Button>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={10}>
            <Button onClick={() => fetchNfts({ parentAddress: flowUser.addr })}>get NFTs</Button>
            <Stack divider={<StackDivider />} spacing="4">
              {nfts &&
                Object.entries(nfts).map(([address, mintedNfts]) => (
                  <Stack key={address}>
                    <Heading size="md" color="white">{address}</Heading>
                    <Box>
                      <Text color="white">NFTs</Text>
                      {mintedNfts.map(({ name, resourceID, thumbnail }) => (
                        <Box key={resourceID}>
                          <Heading size="xs" textTransform="uppercase">
                            {name}
                          </Heading>
                          <img
                            src={thumbnail.replace("ipfs://", "https://ipfs.io/ipfs/")}
                            height={200}
                            width={200}
                            alt={name}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                ))}
            </Stack>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={10}>
            <Button onClick={fcl.unauthenticate}>logout</Button>
          </SimpleGrid>
        </Stack>
      </GridItem>
      <GridItem></GridItem>
    </SimpleGrid>
  )
}
