import { PlayerStore } from './player.store';

export const playerStore = new PlayerStore();

export type Stores = {
  playerStore: PlayerStore;
};
