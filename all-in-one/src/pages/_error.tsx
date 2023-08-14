import { ErrorProps } from "next/error"
import Error from "../ui/Error"
import AppLayout from "../components/AppLayout"
function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <>
      <div>
        <AppLayout>
          <Error statusCode={statusCode}></Error>
        </AppLayout>
      </div>
    </>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
