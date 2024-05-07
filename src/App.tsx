import './App.css';
import { createHashPackSigner, useHashConnect, HashportClientProviderWithRainbowKit } from "@hashport/react-client";
import './AmountInput.tsx'
import './SelectSource.tsx'
import './SelectTarget.tsx'
import './RecipientInput.tsx'
const App = () => {
  const { hashConnect, pairingData } = useHashConnect({ mode: 'testnet' });
  const hederaSigner = pairingData && createHashPackSigner(hashConnect, pairingData);
  const accountId = pairingData?.accountIds[0];

  return (
    <HashportClientProviderWithRainbowKit
      mode="testnet"
      hederaSigner={hederaSigner}
      renderConnectButton={(children, RainbowKitButton) => (
        <main>
          <h1>Lynxify</h1>
          <div className="button-group">
            <RainbowKitButton />
            <button onClick={() => hashConnect.connectToLocalWallet()}>
              {accountId ?? 'Connect HashPack'}
            </button>
          </div>
          {children}
        </main>
      )}
    >
      <div className="container">
        Lynxify
      </div>
    </HashportClientProviderWithRainbowKit>
  )
}
export default App