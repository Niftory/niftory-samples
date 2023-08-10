import "@fontsource/inter"

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    title: "inter",
    heading: "inter",
    body: "inter",
  },
  colors: {
    brand: {
      100: "gray.100",
      200: "gray.200",
      300: "#F5F5F5",
      400: "#D9D9D9",
    },
    content: {
      100: "#DFE6E9",
      200: "#BCBCBC",
      300: "#636E72",
      400: "#2D3436",
    },
    purple: {
      100: "#A01CF0",
    },
    navbar: {
      background: "black",
      text: "white",
    },
    header: {
      background: "black",
      text: "white",
      accent: "#FE2B2D",
    },
    page: {
      background: "black",
      text: "black",
      accent: "white",
      buttons: "#B6A45D",
      gradientBg: "linear-gradient(95deg, black, gray)",
    },
    footer: {
      background: "gray",
      text: "black",
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "gray",
        color: "black",
        fontSize: "md",
      },
    },
  },
})

export default theme
