import AppLayout from "../../components/AppLayout"
import { WalletSetup } from "../../components/wallet/WalletSetup"
import { ComponentWithAuth } from "../../components/ComponentWithAuth"

const WalletPage: ComponentWithAuth = () => (
  <AppLayout>
    <WalletSetup />
  </AppLayout>
)

WalletPage.requireAuth = true
export default WalletPage
