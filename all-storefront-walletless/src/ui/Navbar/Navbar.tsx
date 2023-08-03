import { BackgroundProps, Box, Flex, Stack, VisuallyHidden, Divider } from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"

import { IMenuItem, NavContent } from "./NavContent"

interface Props {
  useApi?: boolean
  background?: BackgroundProps["bg"]
  leftComponent?: React.ReactNode
  menu?: IMenuItem[]
}

export const Navbar: React.FunctionComponent<Props> = ({
  background = "navbar.background",
  leftComponent,
  menu,
}) => {
  return (
    <Box left="0" top="0" width="100%" shadow="base" position="fixed" zIndex="999">
      <Box as="header" height="100%" bg={background} position="relative">
        <Flex
          as="nav"
          aria-label="Site navigation"
          align="center"
          justify="space-between"
          height="100%"
        >
          <Box _hover={{ cursor: "pointer" }} as="a" rel="home" my={{ base: "0.2rem" }}>
            <Stack direction="row" gap={{ base: "0.7rem" }} ml={{ base: "0.4rem", md: "2rem" }}>
              <VisuallyHidden>niftory</VisuallyHidden>
              {leftComponent}
            </Stack>
          </Box>

          <NavContent.Desktop
            display="flex"
            alignItems="center"
            mr={{ base: "4", md: "10" }}
            menu={menu}
          />
        </Flex>
      </Box>
    </Box>
  )
}
