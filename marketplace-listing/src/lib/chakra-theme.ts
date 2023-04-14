import '@fontsource/roboto';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    title: "Roboto",
    heading: "Roboto",
    body: "Roboto",
  },
  colors: {
    brand: {
      100: "#171923", // black.900
      200: "#2D3748", // black.700
    },
    content: {
      100: "white",
      200: "#E2E8F0", // gray.200
      300: "#2D3748", // gray.700
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
      text: "white",
      accent: "white",
      buttons: "#B6A45D",
    },
    footer: {
      background: "black",
      text: "white",
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
