import React from 'react';
import { useQuery } from 'urql';

import { Nft, NftsDocument, NftsQuery } from '@niftory/sdk'
import AppLayout from '../../../components/AppLayout';
import { CollectionGrid } from '../../../components/collection/CollectionGrid';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Subset } from '../../../lib/types';
import { SectionHeader } from '../../../ui/SectionHeader';

const CollectionPage = () => {
  const { session } = useAuthContext()
  const userId = session?.userId
  const [userNftsResponse] = useQuery<NftsQuery>({
    query: NftsDocument,
    variables: { id: userId },
  })

  const nfts: Subset<Nft>[] = userNftsResponse.data?.nfts?.items

  return (
    <AppLayout>
      <SectionHeader standardText="My Collection" />
      <CollectionGrid nfts={nfts} isLoading={userNftsResponse.fetching} />
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
