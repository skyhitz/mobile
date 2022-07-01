import { PlayerStore } from './player.store';
import { PaymentsStore } from './payments.store';
import { EntryStore } from './entry.store';
import { WalletConnectStore } from './wallet-connect.store';

export const playerStore = new PlayerStore();
export const paymentsStore = new PaymentsStore();
export const entryStore = new EntryStore();
export const walletConnectStore = new WalletConnectStore();

export type Stores = {
  playerStore: PlayerStore;
  paymentsStore: PaymentsStore;
  entryStore: EntryStore;
  walletConnectStore: WalletConnectStore;
};
