import { Box, Flex } from "@chakra-ui/layout"
import { useBreakpointValue, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import Head from "next/head"
import { DEFAULT_TITLE } from "../constants/title"

import { Footer } from "../ui/Footer/Footer"
import { Navbar } from "../ui/Navbar/Nav"
import { Sidebar } from "./sidenav/Sidebar"
type Props = {
  children: React.ReactNode
  showSidebar?: boolean
  title?: string
}

export default function AppLayout({ children, showSidebar = false, title = DEFAULT_TITLE }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery("(max-width: 48em)")

  // Always enable sidebar on mobile
  if (isMobile) {
    showSidebar = true
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Sidebar showSidebar={showSidebar} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <Flex direction="column" minH="90vh" w="full">
          <Navbar onOpen={onOpen} />
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
      </Sidebar>
      <Footer />
    </>
  )
}
