import { useRouter } from 'next/router';
import { useNftQuery } from "@niftory/sdk/react"

import { Nft } from '@niftory/sdk'
import AppLayout from '../../../components/AppLayout';
import { NftDetail } from '../../../components/collection/NftDetail';
import { Subset } from '../../../lib/types';
import { LoginSkeleton } from '../../../ui/Skeleton';

const ProductDropPage = () => {
  const router = useRouter()
  const nftId: string = router.query["nftId"]?.toString()

  const [nftResponse] = useNftQuery({ variables: { id: nftId } })
  const nft: Subset<Nft> = nftResponse?.data?.nft

  if (!nftId || nftResponse.fetching) {
    return <LoginSkeleton />
  }

  return (
    <AppLayout>
      {nft && <NftDetail nft={nft} />}
    </AppLayout>
  )
}

export default ProductDropPage
