import { Nft } from '@niftory/sdk'
import AppLayout from 'components/AppLayout';
import { CollectionGrid } from 'components/collection/CollectionGrid';
import { Subset } from 'lib/types';
import { SectionHeader } from 'ui/SectionHeader';
import { useNftsQuery } from  "@niftory/sdk/react"
import { useAuthContext } from 'hooks/useAuthContext';

const CollectionPage = () => {
  const { session } = useAuthContext()
  const userId: string = session?.userId as string
  const [{ data, fetching: isFetching }] = useNftsQuery({ variables: { userId: userId } })
  const nfts: Subset<Nft>[] = data?.nfts?.items

  return (
    <AppLayout>
      <SectionHeader standardText="My Collection" />
      <CollectionGrid nfts={nfts} isLoading={isFetching} />
    </AppLayout>
  )
}

export default CollectionPage
