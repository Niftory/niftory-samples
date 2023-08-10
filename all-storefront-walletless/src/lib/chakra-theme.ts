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
      300: "#F5F5F5", //white gray
      400: "#D9D9D9", //very light gray
    },
    content: {
      100: "#DFE6E9", //very light gray
      200: "#BCBCBC", //light gray
      300: "#636E72", //dark gray with cyan tint
      400: "#2D3436", //very dark gray with cyan tint
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
      accent: "#FE2B2D", //red
    },
    page: {
      background: "black",
      text: "black",
      accent: "white",
      buttons: "#B6A45D", //dull gold
      gradientBg: "linear-gradient(180deg, black, grey)",
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
