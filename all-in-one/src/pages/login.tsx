import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { LoginSkeleton } from "../ui/Skeleton"

const HomePage = () => {
  const { session, signIn, isLoading } = useAuthContext()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function signInOrRedirect() {
      if (!isLoading && !session) {
        setIsAuthenticating(true)
        await signIn()
      }

      if (session) {
        setIsAuthenticating(false)

        if (router?.query?.from) {
          router.push(router.query.from.toString())
        } else {
          router.push("/")
        }
      }
    }

    if (!isAuthenticating) signInOrRedirect()
  }, [session, signIn, isLoading, isAuthenticating, router])

  return <LoginSkeleton />
}

export default HomePage
