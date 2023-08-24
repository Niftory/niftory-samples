import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"

import AppLayout from "../components/AppLayout"
import { Hero } from "../ui/Hero"
import { useMarketplace } from "../hooks/useMarketplace"

const HomePage = () => {
  const router = useRouter()
  useMarketplace()

  return (
    <AppLayout>
      <Hero
        heading="YOUR NFT Marketplace"
        content={`Buy and sell NFTs in on the marketplace in minutes`}
        button={
          <Button p="8" borderRadius="0" onClick={() => router.push("/app/marketplace")}>
            Goto Marketplace
          </Button>
        }
      />
    </AppLayout>
  )
}

export default HomePage
