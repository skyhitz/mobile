import WalletConnect, { CLIENT_EVENTS } from '@walletconnect/client';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import { observable } from 'mobx';

const stellarMeta = {
  chainName: 'stellar:pubnet',
  methods: ['stellar_signAndSubmitXDR', 'stellar_signXDR'],
};

export class WalletConnectStore {
  client: null | WalletConnect;
  session: any;
  proposals: Map<any, any>;
  @observable uri: null | string;
  @observable state:
    | 'disconnected'
    | 'paring-proposal'
    | 'paring-created'
    | 'session-proposal'
    | 'session-created';
  @observable publicKey: string = '';
  sessions: any;

  constructor() {
    this.state = 'disconnected';
    this.client = null;
    this.session = null;
    this.uri = null;
    this.proposals = new Map();
    WalletConnect.init({
      projectId: '7ba6184fa9faecd936a314cf61945da8',
      relayUrl: 'wss://relay.walletconnect.org',
      metadata: {
        name: 'Skyhitz',
        description: 'Skyhitz',
        url: 'https://skyhitz.io',
        icons: ['https://skyhitz.io/img/icon-512.png'],
      },
      // storageOptions: {
      //   asyncStorage: AsyncStorage as any,
      // },
    }).then(async (result) => {
      this.client = result;
      const itemsStored = await this.client?.storage.keyValueStorage.getItem(
        'wc@2:client:0.2//session:settled'
      );
      if (itemsStored) {
        const [session] = itemsStored;
        this.setSession(session);
      }

      this.subscribeToEvents();
    });
  }

  clearState() {
    this.state = 'disconnected';
    this.publicKey = '';
    this.session = null;
  }

  setSession(session) {
    this.session = session;
    const { state } = session;
    const [stellarAccount] = state.accounts;
    this.publicKey = stellarAccount.replace(`${stellarMeta.chainName}:`, '');
    this.state = 'session-created';
    return this.publicKey;
  }

  async connect() {
    try {
      return this.setSession(
        await this.client?.connect({
          permissions: {
            blockchain: {
              chains: [stellarMeta.chainName],
            },
            jsonrpc: {
              methods: stellarMeta.methods,
            },
          },
        })
      );
    } catch (e) {
      console.log('catched error on reject:', e);
      this.state = 'disconnected';
    }

    return this.publicKey;
  }

  subscribeToEvents() {
    console.log('subscribed to events');
    this.client?.on(CLIENT_EVENTS.pairing.proposal, async (proposal) => {
      const { uri } = proposal.signal.params;
      console.log('pairing proposal');
      this.uri = uri;
      this.state = 'paring-proposal';
    });

    this.client?.on(CLIENT_EVENTS.pairing.created, async (proposal) => {
      this.uri = null;
      this.state = 'paring-created';
    });

    this.client?.on(CLIENT_EVENTS.session.proposal, async (proposal) => {
      this.state = 'session-proposal';
    });

    this.client?.on(CLIENT_EVENTS.session.created, async (proposal) => {
      this.state = 'session-created';
    });

    this.client?.on(CLIENT_EVENTS.session.deleted, (session) => {
      console.log(session);
      this.clearState();
    });
  }
}
