import { PlayerStore } from './player.store';
import { WalletConnectStore } from './wallet-connect.store';

export const playerStore = new PlayerStore();
export const walletConnectStore = new WalletConnectStore();

export type Stores = {
  walletConnectStore: WalletConnectStore;
  playerStore: PlayerStore;
};
