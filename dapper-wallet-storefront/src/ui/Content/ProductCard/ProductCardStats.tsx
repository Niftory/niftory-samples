import { HStack, Icon, StackProps, Text, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"
import { HiBadgeCheck, HiStar, HiOutlineCollection } from "react-icons/hi"

interface CardStatProps extends StackProps {
  serial?: string
  rarity?: string
  quantity?: number
}

export const ProductCardStats = (stats: CardStatProps) => {
  return (
    <HStack
      fontSize="sm"
      color={useColorModeValue("gray.200", "gray.300")}
      justifyContent={stats.quantity || stats.rarity ? "space-between" : "center"}
    >
      <HStack>
        <Icon as={HiStar} />
        <Text>{stats.rarity}</Text>
      </HStack>
      {stats.serial && (
        <HStack>
          <Icon as={HiBadgeCheck} />
          <Text>Serial: {stats.serial}</Text>
        </HStack>
      )}
      {stats.quantity && (
        <HStack>
          <Icon as={HiOutlineCollection} />
          <Text>Total: {stats.quantity}</Text>
        </HStack>
      )}
    </HStack>
  )
}
