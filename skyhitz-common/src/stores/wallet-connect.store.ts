import SignClient from '@walletconnect/sign-client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { observable } from 'mobx';

const stellarMeta = {
  chainName: 'stellar:pubnet',
  methods: ['stellar_signAndSubmitXDR', 'stellar_signXDR'],
};

export class WalletConnectStore {
  client: null | SignClient;
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
    SignClient.init({
      projectId: '422a527ddc3ed4c5fff60954fcc8ed83',
      metadata: {
        name: 'Skyhitz',
        description: 'Skyhitz',
        url: 'https://skyhitz.io',
        icons: ['https://skyhitz.io/img/icon-512.png'],
      },
    })
      .then(async (result) => {
        this.client = result;

        this.subscribeToEvents();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  clearState() {
    this.state = 'disconnected';
    this.publicKey = '';
    this.session = null;
    this.client = null;
    return AsyncStorage.clear();
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
    if (!this.client) return { uri: '' };
    return await this.client.connect({
      requiredNamespaces: {
        stellar: {
          chains: [stellarMeta.chainName],
          methods: stellarMeta.methods,
          events: [],
        },
        // blockchain: {
        //   chains: [stellarMeta.chainName],
        // },
        // jsonrpc: {
        //   methods: stellarMeta.methods,
        // },
      },
    });
  }

  async disconnect() {
    await this.client?.disconnect({
      topic: this.session.topic,
      reason: {
        code: 1,
        message: 'Logged out',
      },
    });
    await this.clearState();
  }

  subscribeToEvents() {
    console.log('subscribed to events');
    if (!this.client) return;
    this.client.on('session_update', ({ topic, params }) => {
      this.state = 'session-created';
      if (!this.client) return;
      const { namespaces } = params;
      const _session = this.client.session.get(topic);
      // Overwrite the `namespaces` of the existing session with the incoming one.
      const updatedSession = { ..._session, namespaces };
      // Integrate the updated session state into your dapp state.
      this.setSession(updatedSession);
    });

    // this.client.on(CLIENT_EVENTS.pairing.proposal, async (proposal) => {
    //   const { uri } = proposal.signal.params;
    //   console.log('pairing proposal');
    //   this.uri = uri;
    //   this.state = 'paring-proposal';
    // });

    // this.client.on(CLIENT_EVENTS.pairing.created, async (proposal) => {
    //   this.uri = null;
    //   this.state = 'paring-created';
    // });

    this.client.on('session_proposal', async (proposal) => {
      this.state = 'session-proposal';
    });

    this.client.on('session_delete', (session) => {
      console.log(session);
      this.clearState();
    });
  }

  signXdr(xdr): Promise<{ signedXDR: string }> {
    return this.client?.request({
      topic: this.session.topic,
      chainId: stellarMeta.chainName,
      request: {
        method: 'stellar_signXDR',
        params: {
          xdr,
        },
      },
    }) as any;
  }

  signAndSubmitXdr(xdr) {
    return this.client?.request({
      topic: this.session.topic,
      chainId: stellarMeta.chainName,
      request: {
        jsonrpc: '2.0',
        method: 'stellar_signAndSubmitXDR',
        params: {
          xdr,
        },
      } as any,
    });
  }
}
