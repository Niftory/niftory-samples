import { ErrorProps } from 'next/error';

import AppLayout from '../components/AppLayout';
import Error from '../ui/Error';

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <AppLayout>
      <Error statusCode={statusCode}></Error>
    </AppLayout>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
