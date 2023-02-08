import {
  Image,
  Link as ChakraLink,
  Button,
  useBreakpointValue,
  IconButton,
  Box,
  Hide,
  Show,
} from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"
import { Navbar as NiftoryNavbar } from "./Navbar"
import { FiMenu } from "react-icons/fi"

import { FaGoogle, FaRegUser as UserIcon } from "react-icons/fa"
import { IoIosAddCircleOutline as AddIcon } from "react-icons/io"
import { useAuthContext } from "../../hooks/useAuthContext"
import { BsDiscord } from "react-icons/bs"
import posthog from "posthog-js"
import { useRouter } from "next/router"
export const Navbar = ({ onOpen }) => {
  const { session, signIn, isLoading } = useAuthContext()
  let onClick = () => {
    signIn("/app/collection")
    posthog.capture("HEADER_LOGIN", {
      posthogEventDetail: "Sign In with Google invoked from top banner",
    })
  }
  const isMobile = useBreakpointValue({ base: true, md: false })
  const router = useRouter()

  const menuItems = React.useMemo(() => {
    if (!session) {
      return [
        {
          title: "Get In",
          component: (
            <Button
              rounded="3xl"
              isLoading={isLoading}
              cursor="pointer"
              onClick={onClick}
              colorScheme="white"
              minWidth={{ base: "100px", md: "180px" }}
              fontWeight={400}
              p={{ base: "1rem", md: "1.2rem 1rem" }}
              background="content.400"
              fontSize={{ base: "12px", md: "14px" }}
              ml="1rem"
              h={{ base: "8", md: "10" }}
              my="0.2rem"
              leftIcon={<FaGoogle />}
            >
              Sign in with Google
            </Button>
          ),
        },
        {
          href: "https://discord.gg/QAgDQXUGsU",
          component: (
            <ChakraLink
              href="https://discord.gg/QAgDQXUGsU"
              target="_blank"
              color="content.400"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              mt="0.1rem"
              onClick={() => {
                posthog.capture("HEADER_LAUNCH_DISCORD", {
                  posthogEventDetail: "Opened Discord from top banner",
                })
              }}
            >
              <BsDiscord size="2rem" color="#2D3436" />
            </ChakraLink>
          ),
        },
      ]
    } else {
      return [
        {
          title: "New Collection",
          href: "/",
          component: (
            <Link href="/app/collection" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.400"
                gap="0.3rem"
                onClick={() =>
                  posthog.capture("HEADER_VIEW_COLLECTION", {
                    posthogEventDetail: "Opened My Collection from top banner",
                  })
                }
              >
                <Image src="/grid-icon.svg" alt="new collection" w="30px" />
                <Hide below="md"> My Collection</Hide>
              </ChakraLink>
            </Link>
          ),
        },
        {
          title: "New Item",
          href: "/app/new-item",
          component: (
            <Link href="/app/new-item" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.400"
                gap="0.3rem"
                onClick={() =>
                  posthog.capture("HEADER_NEW_ITEM", {
                    posthogEventDetail: "Create new item from button",
                  })
                }
              >
                <AddIcon size={25} />
                <Hide below="md"> Create</Hide>
              </ChakraLink>
            </Link>
          ),
        },
        {
          href: "/app/account",
          component: (
            <Link href="/app/account" passHref>
              <ChakraLink
                fontWeight="bold"
                display="flex"
                alignItems="center"
                color="content.400"
                gap="0.3rem"
              >
                <UserIcon size={20} />
                <Hide below="md">Account</Hide>
              </ChakraLink>
            </Link>
          ),
        },
        {
          href: "https://discord.gg/QAgDQXUGsU",
          component: (
            <ChakraLink
              ml={{ md: "1rem" }}
              mt="0.1rem"
              href="https://discord.gg/QAgDQXUGsU"
              target="_blank"
              color="content.400"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap="0.3rem"
            >
              <BsDiscord size="1.5rem" color="#2D3436" />
            </ChakraLink>
          ),
        },
      ]
    }
  }, [session])

  return (
    <>
      <NiftoryNavbar
        leftComponent={
          <>
            {isMobile && session && (
              <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
              />
            )}
            <Link href="/" passHref>
              <Image
                boxSize={{ md: "70" }}
                src="/mintme-logo-header.svg"
                alt="logo"
                zIndex="1000"
                w={{ base: "6rem", md: "13rem" }}
                py="4px"
              />
            </Link>
          </>
        }
        menu={menuItems}
      />
    </>
  )
}
