import { HStack, Icon, StackProps, Text, useColorModeValue } from "@chakra-ui/react"
import { HiBadgeCheck, HiStar } from "react-icons/hi"

interface CardStatProps extends StackProps {
  serial?: number
  rarity?: string
}

export const ProductCardStats = (stats: { rarity?: string; serial?: string }) => {
  return (
    <HStack
      fontSize="sm"
      color={useColorModeValue("gray.200", "gray.300")}
      justifyContent={stats.serial && stats.rarity ? "space-between" : "center"}
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
    </HStack>
  )
}
