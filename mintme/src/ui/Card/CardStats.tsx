import { Box, HStack, Icon, StackProps, Text, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"
import { HiBadgeCheck, HiStar } from "react-icons/hi"

interface CardStatProps extends StackProps {
  serial: string
  shader: string
  rarity: string
  updatedAt?: Date
}

export const CardStats = (props: CardStatProps) => {
  const { serial, rarity, updatedAt, ...stackProps } = props

  return (
    <HStack
      spacing="1"
      fontSize="sm"
      bg="black"
      color={useColorModeValue("gray.200", "gray.300")}
      {...stackProps}
      py="1em"
      justifyContent="center"
    >
      <Icon as={HiStar} />
      <Text title={updatedAt ? updatedAt.toLocaleDateString() : ""}>{rarity}</Text>
      <Box w={{ base: "2em", md: "4em" }}></Box>
      <Icon as={HiBadgeCheck} />
      <Text title={updatedAt ? updatedAt.toLocaleDateString() : ""}>Serial: {serial}</Text>
    </HStack>
  )
}
