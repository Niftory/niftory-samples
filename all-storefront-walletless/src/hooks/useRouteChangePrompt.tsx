import { useRouter } from "next/router"
import { useEffect } from "react"

export const useRouteChangePrompt = (isActive) => {
  const router = useRouter()
  useEffect(() => {
    const confirmationMessage = "Changes you made may not be saved."
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      ;(e || window.event).returnValue = confirmationMessage
      return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
    }
    const beforeRouteHandler = (url: string) => {
      if (router.pathname !== url && !confirm(confirmationMessage)) {
        router.events.emit("routeChangeError")
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`
      }
    }
    if (isActive) {
      window.addEventListener("beforeunload", beforeUnloadHandler)
      router.events.on("routeChangeStart", beforeRouteHandler)
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler)
      router.events.off("routeChangeStart", beforeRouteHandler)
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler)
      router.events.off("routeChangeStart", beforeRouteHandler)
    }
  }, [isActive])
}
