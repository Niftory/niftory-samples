import { Box } from "@chakra-ui/react"
import React from "react"

import AppLayout from "../../../components/AppLayout"
import { DropDetailPage } from "../../../components/drops/DropDetailPage"

const ProductDropPage = () => {
  return (
    <AppLayout>
      <Box bg="page.background" pos="relative" width="100%" height="80px"></Box>
      <DropDetailPage />
    </AppLayout>
  )
}

export default ProductDropPage
