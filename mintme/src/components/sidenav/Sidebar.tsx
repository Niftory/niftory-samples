import React, { ReactNode } from "react"
import {
  Box,
  CloseButton,
  Flex,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
} from "@chakra-ui/react"
import { MobileNav } from "./MobileNav"
import { SideNav } from "./SideNav"
import { Navbar } from "../../ui/Navbar/Navbar"

export function Sidebar({
  children,
  showSidebar = false,
  onOpen,
  onClose,
  isOpen,
}: {
  children: ReactNode
  showSidebar?: boolean
  onOpen?: () => void
  onClose?: () => void
  isOpen?: boolean
}) {
  return (
    <Box bg="page.background" minH="100vh">
      {showSidebar && (
        <>
          <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
        </>
      )}
      {/* <NavBar /> */}

      <Box ml={{ base: 0, md: showSidebar ? "60" : "0" }}>{children}</Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box h="full" w={{ base: "full", md: 60 }} pos="fixed" {...rest} bgColor="white" shadow="lg">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold"></Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <SideNav onChange={onClose} />
    </Box>
  )
}
