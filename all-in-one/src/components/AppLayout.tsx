import { Box, Flex } from "@chakra-ui/layout"

import { Footer } from "../ui/Footer"
import { Navbar } from "../ui/Navbar/Nav"
type Props = {
  children: React.ReactNode
  showSidebar?: boolean
  title?: string
}

export default function AppLayout({ children, showSidebar = false }: Props) {

  return (
    <>
      <Flex direction="column" minH="90vh" w="full">
        <Navbar />
        <Flex bg="page.background" flexGrow={1}>
          <Box
            w="100%"
            p={showSidebar ? "1rem" : 0}
            paddingTop={{ base: "60px", md: "90px" }}
            position="relative"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}
