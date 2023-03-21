import {
  Box,
  BoxProps,
  Center,
  HStack,
  Stack,
  StackDivider,
  StackProps,
  useDisclosure,
} from "@chakra-ui/react"
import Router from "next/router"
import * as React from "react"
import { HiOutlineMenu, HiX } from "react-icons/hi"

import { NavLink } from "./NavLink"
import { NavLinkNormal } from "./NavLinkNormal"
import { MobileMenuListProps, NavListTransition } from "./Transition"

const handleClick = (value) => () => {
  Router.push(value)
}

export interface IMenuItem {
  title?: string
  href?: string
  target?: string
  component?: React.ReactNode
  onClick?: () => void
  hideOnMobile?: boolean
  hideOnWeb?: boolean
}

interface MobileNavProps {
  menu?: IMenuItem[]
  menuProps?: MobileMenuListProps
}

interface DesktopNavProps {
  menu?: IMenuItem[]
}

const MobileNavContent = ({ menu = [], menuProps, ...props }: BoxProps & MobileNavProps) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Box bg="navbar.background" {...props}>
      <Center as="button" fontSize="2xl" color="content.100" onClick={onToggle}>
        {isOpen ? <HiX /> : <HiOutlineMenu />}
      </Center>
      <NavListTransition
        pos="absolute"
        insetX="0"
        bg="navbar.background"
        top="64px"
        animate={isOpen ? "enter" : "exit"}
        {...menuProps}
      >
        <Stack spacing="0" divider={<StackDivider borderColor="purple.200" />}>
          {menu
            .filter((item) => !item.hideOnMobile)
            .map(({ title, ...menuItem }, index) => (
              <NavLink.Mobile key={index} {...menuItem}>
                {title}
              </NavLink.Mobile>
            ))}
        </Stack>
      </NavListTransition>
    </Box>
  )
}

const DesktopNavContent = ({ menu = [], ...props }: StackProps & DesktopNavProps) => {
  return (
    <HStack spacing="8" align="stretch" {...props}>
      {menu
        .filter((item) => !item.hideOnWeb)
        .map(({ title, href, target, component, onClick }, index) =>
          component ? (
            <Box key={index}>{component}</Box>
          ) : (
            React.createElement(
              NavLinkNormal.Desktop,
              {
                key: index,
                href: href,
                target: target,
                bg: "transparent",
                borderWidth: "0px",
                onClick: onClick || handleClick(href),
              },
              <>{title}</>
            )
          )
        )}
    </HStack>
  )
}

export const NavContent = {
  Mobile: MobileNavContent,
  Desktop: DesktopNavContent,
}
