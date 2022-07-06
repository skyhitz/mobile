import { PlayerStore } from './player.store';
import { EntryStore } from './entry.store';
import { WalletConnectStore } from './wallet-connect.store';

export const playerStore = new PlayerStore();
export const entryStore = new EntryStore();
export const walletConnectStore = new WalletConnectStore();

export type Stores = {
  walletConnectStore: WalletConnectStore;
  entryStore: EntryStore;
  playerStore: PlayerStore;
};
