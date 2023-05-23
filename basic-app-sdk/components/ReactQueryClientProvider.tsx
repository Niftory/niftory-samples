import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export const ReactQueryClientProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
