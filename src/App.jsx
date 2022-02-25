import s from './App.module.scss';
import Button from './components/Button';
import NearService from './services/near';
import { useEffect, useState } from 'react';

const Near = new NearService({ networkId: 'testnet' });

const App = () => {

  const [wallet, setWallet] = useState();
  const [account, setAccount] = useState();

  const handleConnect = async () => {
    try {
      const newWallet = await Near.connect();
      setWallet(newWallet);
      if (!newWallet.isSignedIn()) return;
      console.log('App connect:', newWallet);
      const newAccount = await newWallet.account();
      setAccount(newAccount);
      console.log(newAccount);
    } catch (e) {
      console.error(e);
    }
  }

  const handleSignIn = async () => {
    try {
      const newWallet = await Near.signIn(wallet);
      console.log(newWallet);
    } catch (e) {
      console.error(e);
    }
  }

  const handleDisconnect = async () => {
    try {
      wallet.signOut();
      setAccount(null);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    handleConnect();
  }, []);

  return (
  <div className={s.app}>
    <section className={s.section}>
      <div>
        Connect to NEAR
      </div>
      {!!account && <div>Connected to: {account.accountId}</div>}
      {account ?
      <Button text="Disconnect" onClick={handleDisconnect} /> :
      <Button text="Connect" onClick={handleSignIn} />
      }
    </section>
  </div>
  );
}

export default App;
