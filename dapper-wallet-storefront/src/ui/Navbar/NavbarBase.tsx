import { BackgroundProps, Box, Flex, Stack, VisuallyHidden } from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"

import { IMenuItem, NavContent } from "./NavContent"

interface Props {
  useApi?: boolean
  background?: BackgroundProps["bg"]
  leftComponent?: React.ReactNode
  menu?: IMenuItem[]
  homeUrl?: string
}

export const NavbarBase: React.FunctionComponent<Props> = ({
  background = "navbar.background",
  leftComponent,
  menu,
  homeUrl = "/",
}) => {
  return (
    <Box left="0" top="0" minHeight="1em" width="100%" position="fixed" zIndex="999">
      <Box as="header" height="16" bg={background} position="relative">
        <Box height="100%" mx="auto" pe={{ base: "5", md: "0" }}>
          <Flex
            as="nav"
            aria-label="Site navigation"
            align="center"
            justify="space-between"
            height="100%"
          >
            <Link href={homeUrl} passHref>
              <Box as="a" rel="home" ml={{ base: "none", sm: "10", md: "20" }}>
                <Stack direction="row">
                  <VisuallyHidden>niftory</VisuallyHidden>
                  {leftComponent}
                </Stack>
              </Box>
            </Link>
            <NavContent.Desktop display={{ base: "none", lg: "flex" }} mr="20" menu={menu} />
            <NavContent.Mobile
              display={{ base: "flex", lg: "none" }}
              mr={{ base: "0", sm: "5", md: "10" }}
              menu={menu}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
