import { Center, Heading, Tag } from "@chakra-ui/react"
import * as React from "react"

import { NavbarBase } from "./NavbarBase"

export const Navbar = () => {
  const menuItems = React.useMemo(() => {
    return [
      {
        title: "Marketplace",
        href: "/app/marketplace",
      },
      {
        title: "Drops",
        href: "/app/drops",
      },
      {
        title: "My Collection",
        href: "/app/collection",
      },
      {
        title: "My Account",
        href: "/app/account",
      },
    ]
  }, [])

  return (
    <NavbarBase
      leftComponent={
        <>
          <Heading color="white">NFT Marketplace Demo</Heading>
        </>
      }
      menu={menuItems}
    />
  )
}
