import {
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"
import { Navbar as NiftoryNavbar } from "./Navbar"

import { BsDiscord } from "react-icons/bs"

export const Navbar = ({ onOpen }) => {


  const menuItems = React.useMemo(() => {

    return [
      {
        href: "https://discord.gg/QAgDQXUGsU",
        component: (
          <ChakraLink
            href="https://discord.gg/QAgDQXUGsU"
            target="_blank"
          >
            <BsDiscord size="1.5rem" color="#2D3436" />
          </ChakraLink>
        ),
      },
    ]

  }, [])

  return (
    <>
      <NiftoryNavbar
        leftComponent={
          <>
            <Link href="/" passHref>
              <Heading p="4"> Web3 Onboarding Starter </Heading>
            </Link>
          </>
        }
        menu={menuItems}
      />
    </>
  )
}
