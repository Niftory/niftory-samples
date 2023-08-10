import React from 'react';
import { useQuery } from 'urql';

import { Nft, UserNftsDocument, UserNftsQuery } from '../../../../generated/graphql';
import AppLayout from '../../../components/AppLayout';
import { CollectionGrid } from '../../../components/collection/CollectionGrid';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Subset } from '../../../lib/types';
import { UpcomingDrop } from '../../../ui/marketing/UpcomingDrop';
import { SectionHeader } from '../../../ui/SectionHeader';

const CollectionPage = () => {
  const { session } = useAuthContext()
  const userId = session?.userId
  const [userNftsResponse] = useQuery<UserNftsQuery>({
    query: UserNftsDocument,
    variables: { id: userId },
  })

  const nfts: Subset<Nft>[] = userNftsResponse.data?.nfts?.items

  return (
    <AppLayout>
      <SectionHeader text="My Collection" />
      <CollectionGrid nfts={nfts} isLoading={userNftsResponse.fetching} />
      <UpcomingDrop />
    </AppLayout>
  )
}

CollectionPage.requireAuth = true
export default CollectionPage
