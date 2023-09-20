import { Box, Flex, Tag, Text } from "@chakra-ui/react"
import * as fcl from "@onflow/fcl"

import { getColorFromWalletState, getReadableWalletState } from "utils/wallet"

import { WalletSwitcherButton } from "./WalletSwitcherButton"
import { Wallet, useSetPrimaryWalletMutation } from "@niftory/sdk/react"
import { ParentWalletButton } from "ui/HybridCustody/ParentWalletButton"
import { useHybridCustodyQueries } from "hooks/hybridCustody/useHybridCustodyQueries"
import { useEffect } from "react"
import { WalletType } from "@niftory/sdk"

interface Props {
  wallet: Wallet
  primaryWalletAddress: string
  niftoryWalletAddress: string
  onClick?: () => void
}

export const WalletCard = ({ wallet, primaryWalletAddress, niftoryWalletAddress, onClick }: Props) => {
  const [_, setPrimaryWallet] = useSetPrimaryWalletMutation()
  const { fetchChildrenFromParent, children } = useHybridCustodyQueries(fcl)

  useEffect(() => {
    fetchChildrenFromParent({ parentAddress: wallet.address })
  }, [])

  let clickHandler: Function
  if (onClick) {
    clickHandler = onClick
  }
  else {
    clickHandler = async () => {
      setPrimaryWallet({
        address: wallet.address, 
        walletId: wallet.id
      })
    }
  }
  
  return (
    <Flex
      key={wallet.address}
      w="full"
      h="70px"
      alignItems="center"
      justifyContent="space-between"
      cursor={"pointer"}
      _hover={{ bgColor: "gray.100"}}
      fontWeight="bold"
      shadow="base"
      rounded="lg"
      borderColor="gray.200"
      p="1rem"
      onClick={() => {
        clickHandler()
      }}
    >
      <Flex flexDir="column">
        <Flex gap="0.4rem" alignItems="center">
          {wallet?.address == primaryWalletAddress && (
            <Box
              height="0.7rem"
              width="0.7rem"
              bgColor="green.400"
              rounded="full"
              title="Current Wallet"
            >
            </Box>
          )}
          <Text color={""}>{wallet.address} </Text>{" "}
          {wallet?.walletType === WalletType.Niftory && (
            <Tag bgColor="purple.400" color="white">
              Niftory Wallet
            </Tag>
          )}
        </Flex>
        <Flex gap="0.2rem" fontSize="0.8rem">
          Wallet State:{" "}
          {
            <Tag
              size="sm"
              fontSize="0.7rem"
              bgColor={getColorFromWalletState(wallet.state)}
              color="white"
            >
              {getReadableWalletState(wallet.state)}
            </Tag>
          }
        </Flex>
      </Flex>
      <WalletSwitcherButton wallet={wallet} />
      {wallet?.walletType !== WalletType.Niftory && <ParentWalletButton wallet={wallet} childWalletAddress={niftoryWalletAddress} />}
    </Flex>
  )
}
