import { BoxProps, HStack, Icon, Text, Tooltip } from "@chakra-ui/react"

interface Props extends BoxProps {
  description: React.ReactNode
  title: string
  icon: any
  suffix?: React.ReactNode
  onClick?: () => void
  showTooltop?: boolean
}

export const WalletGridBox = ({
  description,
  title,
  icon,
  suffix,
  onClick,
  showTooltop,
}: Props) => {
  return (
    <HStack
      spacing="4"
      p={{ base: "1rem", md: "2rem 3.5rem" }}
      shadow="base"
      flex="50%"
      rounded="md"
      flexDir={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-start", md: "center" }}
      justifyContent={{ base: "flex-start", md: "space-between" }}
      bgColor="white"
      w="full"
      _hover={{ bgColor: onClick && "gray.100" }}
      onClick={onClick}
    >
      <HStack spacing="4" w="fit-content">
        <Icon color="blackAlpha.700" boxSize="6" as={icon} />
        <Text fontSize="md" textColor="blackAlpha.700" fontWeight="semibold" whiteSpace="pre-wrap">
          {title}
        </Text>
      </HStack>

      <HStack spacing="4" alignItems={"center"} maxW="50%">
        <Tooltip label={description} isDisabled={!showTooltop} hasArrow placement="top">
          <Text fontSize="md" fontWeight="black" noOfLines={1}>
            {description}
          </Text>
        </Tooltip>
        {suffix}
      </HStack>
    </HStack>
  )
}
