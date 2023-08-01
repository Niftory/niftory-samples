import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"

const DesktopNavLink = ({ href = "", ...props }: HTMLChakraProps<"a">) => {
  return (
    <Link href={href} passHref>
      <chakra.a
        fontWeight="700"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s"
        color="navbar.text"
        borderColor="black"
        bg="navbar.background"
        _hover={{
          borderColor: "currentcolor",
          color: "page.buttons",
          bg: "gray.100",
          fontWeight: "725",
        }}
        {...props}
      />
    </Link>
  )
}

const MobileNavLink = ({ href = "", ...props }: HTMLChakraProps<"a">) => {
  return (
    <Link href={href} passHref>
      <chakra.a
        display="block"
        textAlign="center"
        fontWeight="460"
        py="5"
        fontSize="lg"
        bg="ßnavbar.background"
        color="navbar.text"
        w="full"
        _hover={{
          bg: "blackAlpha.200",
        }}
        {...props}
      />
    </Link>
  )
}

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
}
