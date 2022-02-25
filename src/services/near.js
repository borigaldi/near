import { connect, keyStores, WalletConnection } from 'near-api-js';

import { NetworksRPCs } from '../config/networks';

class NearService {

  constructor(props) {
    const { networkId = 'testnet' } = props;
    this.config = {
      // keyStore: new keyStores.BrowserLocalStorageKeyStore(window.localStorage, 'nearlib:keystore:'),
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      networkId,
      nodeUrl: NetworksRPCs[networkId],
      explorerUrl: 'https://explorer.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org'
    };
  }

  async connect (props = {}) {
    try {
      const { accountName } = props;
      const near = await connect(this.config);
      const wallet = new WalletConnection(near);
      console.log('NearService connect:', near);
      return wallet;
    } catch (e) {
      console.error('NearService connect:', e);
    }
  }

  async signIn (wallet) {
    try {
      const account = await wallet.requestSignIn(
      "test.near", // contract requesting access
      );
      return account;
    } catch (e) {
      console.error('NearService connect:', e);
    }
  }

  async getBalance (account) {
    try {
      return account.getAccountBalance();
    } catch (e) {
      console.error('NearService connect:', e);
    }
  }

}

export default NearService;