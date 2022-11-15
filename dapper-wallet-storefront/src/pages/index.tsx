import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import AppLayout from '../components/AppLayout';
import { Hero } from '../ui/Hero';

const HomePage = () => {
  const router = useRouter()

  return (
    <AppLayout>
      <Hero
        heading="YOUR NFT STOREFRONT"
        content={`Create and sell NFTs in your own custom storefront in minutes`}
        button={
          <Button p="8" borderRadius="0" onClick={() => router.push("/app/drops")}>
            Get Drops
          </Button>
        }
      />
    </AppLayout>
  )
}

export default HomePage
