import { useRouter } from "next/router"
import React, { useMemo, useState } from "react"
import { useMutation, useQuery } from "urql"

import {
  CheckoutDocument,
  CheckoutMutation,
  NftListingDocument,
  NftListingQuery,
  ReserveDocument,
  ReserveMutation,
  WalletDocument,
  WalletQuery,
  WalletState,
} from "@niftory/sdk"
import { useAuthContext } from "../../hooks/useAuthContext"
import { DropDetail } from "./DropDetail"

export const DropDetailPage = () => {
  const { session, signIn } = useAuthContext()

  const router = useRouter()
  const dropId: string = router.query["dropId"]?.toString()

  const [isLoading, setIsLoading] = useState(false)

  const [nftListingResponse] = useQuery<NftListingQuery>({
    query: NftListingDocument,
    variables: { id: dropId },
    pause: !dropId,
  })

  const [userWalletResponse] = useQuery<WalletQuery>({
    query: WalletDocument,
    pause: !session,
  })

  const [reserveResponse, reserve] = useMutation<ReserveMutation>(ReserveDocument)
  const [checkoutResponse, checkout] = useMutation<CheckoutMutation>(CheckoutDocument)

  const { data: reserveData, fetching: reserveLoading } = reserveResponse

  const fetchingListing = nftListingResponse.fetching
  const fetchingWallet = userWalletResponse?.fetching

  const wallet = userWalletResponse?.data?.wallet
  const nftListing = nftListingResponse?.data?.nftListing
  const invoiceId = reserveData?.reserve?.id

  // If signed in and there's no ready wallet, finish wallet setup
  if (session && !fetchingWallet && wallet?.state !== WalletState.Ready) {
    router.push({ pathname: "/app/account", query: { from: router.asPath } })
  }

  useMemo(() => {
    if (nftListing == null || wallet?.state !== WalletState.Ready || session?.user == null) {
      return undefined
    }

    reserve({ id: nftListing?.id, pause: !session })
  }, [nftListing, wallet?.state, session, reserve]) // Reserving the NFT as soon as the user opens the page.

  const performCheckout = async (invoiceId: string, onErrorUrl: string, onSuccessUrl: string) => {
    if (!session) {
      signIn()
      return
    }

    if (!invoiceId) {
      return
    }

    setIsLoading(true)
    const { data: checkoutData } = await checkout({
      invoiceId: invoiceId,
      onError: onErrorUrl,
      onSuccess: onSuccessUrl,
    })
    setIsLoading(false)

    const redirectUrl = checkoutData?.checkout?.redirectUrl

    //Do I redirect?
    if (redirectUrl) {
      window.location.href = redirectUrl
    } else {
      console.log("checkout response " + JSON.stringify(checkoutData))
    }
  }

  return (
    <>
      {nftListing && (
        <DropDetail
          nftListing={nftListing}
          onStripeClick={
            () =>
              performCheckout(
                invoiceId,
                window.location.href.toString(),
                window.location.origin.toString() + "/app/collection"
              ) // change these URLS to your own
          }
          isLoading={isLoading || reserveLoading}
          isSignedIn={session ? true : false}
        />
      )}
    </>
  )
}
