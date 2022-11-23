import { Badge, Heading, StackProps, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import * as React from "react"

interface CardContentProps extends StackProps {
  name: string
  set: string
  text: string
}

export const CardContent = (props: CardContentProps) => {
  const { name, set, text, ...stackProps } = props
  return (
    <VStack spacing="1" flex="1" {...stackProps} bg="black" color="white">
      <Heading fontWeight="bold" fontSize="2xl">
        {name}
      </Heading>

      <Badge px="1em" variant="outline" colorScheme="red" rounded="none" fontSize="xs">
        {set}
      </Badge>
      <Text
        fontSize="xs"
        textAlign="center"
        noOfLines={3}
        color={useColorModeValue("gray.400", "gray.200")}
        pt="1em"
      >
        {text}
      </Text>
    </VStack>
  )
}
