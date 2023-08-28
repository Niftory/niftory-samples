import { HStack, Icon, StackProps, Text, useColorModeValue } from "@chakra-ui/react"
import { HiBadgeCheck, HiStar } from "react-icons/hi"

interface CardStatProps extends StackProps {
  quantity?: number
  rarity?: string
}

export const ProductCardStats = (stats: CardStatProps) => {
  return (
    <HStack
      fontSize="sm"
      color={useColorModeValue("gray.200", "gray.300")}
      justifyContent={stats.quantity && stats.rarity ? "space-between" : "center"}
    >
      <HStack>
        <Icon as={HiStar} />
        <Text>{stats.rarity}</Text>
      </HStack>
      {stats.quantity && (
        <HStack>
          <Icon as={HiBadgeCheck} />
          <Text>Quantity: {stats.quantity}</Text>
        </HStack>
      )}
    </HStack>
  )
}
