import {
  Avatar,
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react"
import Link from "next/link"
import { Navbar as NiftoryNavbar } from "./Navbar"

import { BsDiscord } from "react-icons/bs"
import { useAuthContext } from "hooks/useAuthContext"
import React from "react"


export const Navbar = () => {
  const { session } = useAuthContext()

  const menuItems = React.useMemo(() => {
    const items = [
      {
      title: "Drops",
      href: "/app/drops"
      },
      {
        title: "Collection",
        href: "/apps/collection"
      }
  ] as Array<Object>

    if (!session) {
      items.push(
        {
          title: "Log In",
          href: "/login"
        })
    }
    else {
      items.push(
        {
          href: "/app/account",
          component: (
            <Link href="/app/account" passHref>
              <ChakraLink>
                <Avatar size="sm" ></Avatar>
              </ChakraLink>
            </Link>
          ),
          hideOnMobile: true,
        },
        {
          title: "Account",
          href: "/app/account",
          hideOnWeb: true,
        },
      )
    }
    items.push({
      href: "https://discord.gg/QAgDQXUGsU",
      component: (
        <ChakraLink
          href="https://discord.gg/QAgDQXUGsU"
          target="_blank"
        >
          <BsDiscord size="1.5rem" color="white" />
        </ChakraLink>
      ),
    })
    return items

  }, [session])

  return (
    <>
      <NiftoryNavbar
        leftComponent={
          <>
            <Link href="/" passHref>
              <Heading p="4" textColor="header.text"> All-In-One Sample </Heading>
            </Link>
          </>
        }
        menu={menuItems}
      />
    </>
  )
}
