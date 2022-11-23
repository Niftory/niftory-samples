import { Box, HStack, StackProps } from "@chakra-ui/react"
import Router from "next/router"
import * as React from "react"

import { NavLinkNormal } from "./NavLinkNormal"

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
interface DesktopNavProps {
  menu?: IMenuItem[]
}

const DesktopNavContent = ({ menu = [], ...props }: StackProps & DesktopNavProps) => {
  return (
    <HStack spacing={{ base: "2", md: "4" }} align="stretch" {...props}>
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
  Desktop: DesktopNavContent,
}
