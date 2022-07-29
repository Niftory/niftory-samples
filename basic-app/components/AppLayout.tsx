import { Box, Flex } from "@chakra-ui/layout"
import { VStack } from "@chakra-ui/react"
import { AppHeader } from "./AppHeader"

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <Flex direction="column" minHeight="100vh" minW="320">
      <Box bg="gray.800" flexGrow={1}>
        <Box w="100%" mt="5vh">
          <AppHeader />
          <Box mx="auto" color="white">
            <VStack>{children}</VStack>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
