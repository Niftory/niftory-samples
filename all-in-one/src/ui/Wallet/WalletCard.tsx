import { Box, Flex, Tag, Text } from "@chakra-ui/react"

import { getColorFromWalletState, getReadableWalletState } from "utils/wallet"

import { WalletSwitcherButton } from "./WalletSwitcherButton"
import { Wallet, useSetPrimaryWalletMutation } from "@niftory/sdk/react"

interface Props {
  wallet: Wallet
  onClick?: () => void
}

export const WalletCard = ({ wallet, onClick }: Props) => {
  const [_, setPrimaryWallet] = useSetPrimaryWalletMutation()
  let setWallet: Function
  if (onClick) {
    setWallet = onClick
  }
  else {
    setWallet = async () => {
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
        setWallet()
      }}
    >
      <Flex flexDir="column">
        <Flex gap="0.4rem" alignItems="center">
          {wallet?.address === wallet?.appUser?.primaryWallet.address && (
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
          {wallet?.walletType === "NIFTORY" && (
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
    </Flex>
  )
}
