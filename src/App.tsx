import './App.css';
//import { createHashPackSigner, useHashConnect, HashportClientProviderWithRainbowKit } from "@hashport/react-client";
import HashConnectService from './services/HashConnectService.tsx';
//import './AmountInput.tsx'
//import './SelectSource.tsx'
//import './SelectTarget.tsx'
//import './RecipientInput.tsx'

const App = () => {
  //const { hashConnect, pairingData } = useHashConnect({ mode: 'testnet' });
  //const hederaSigner = pairingData && createHashPackSigner(hashConnect, pairingData);
  //const accountId = pairingData?.accountIds[0];

  return (
    <HashConnectService>
      <div className="container">
        Lynxify
      </div>
    </HashConnectService>
  )
}
export default App