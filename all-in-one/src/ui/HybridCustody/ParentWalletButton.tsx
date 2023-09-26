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
import { Wallet, useNiftoryClient } from "@niftory/sdk/react"

import { useAddAccountMultisign } from "hooks/hybridCustody/useAddAccountMultiSign"

interface Props {
  wallet: Wallet
  childWalletAddress: string
}

export const ParentWalletButton = ({ wallet, childWalletAddress }: Props) => {
  const niftoryClient = useNiftoryClient()

  const { addAccountMultiSign } = useAddAccountMultisign(fcl, niftoryClient)

  return (
    <Button px="4" py="2" size="sm" onClick={() => addAccountMultiSign({childAddress: childWalletAddress})} color="black">
      Link wallet
    </Button>

  )
}
