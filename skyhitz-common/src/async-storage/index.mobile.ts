import { TAsyncStorage } from './types';
let AsyncStorage: TAsyncStorage | null;
try {
  AsyncStorage = require('react-native').AsyncStorage;
} catch (e) {
  AsyncStorage = null;
}

const API: TAsyncStorage = {
  getItem: async key => {
    if (!AsyncStorage) return '';
    return AsyncStorage.getItem(key);
  },
  setItem: async (key, value) => {
    if (!AsyncStorage) return;
    return AsyncStorage.setItem(key, value);
  },
  clear: async () => {
    if (!AsyncStorage) return;
    return AsyncStorage.clear();
  },
  getAllKeys: async () => {
    if (!AsyncStorage) return [];

    return AsyncStorage.getAllKeys();
  },
  multiGet: async keys => {
    if (!AsyncStorage) return [];
    return AsyncStorage.multiGet(keys);
  },
  removeItem: async key => {
    if (!AsyncStorage) return;
    return AsyncStorage.removeItem(key);
  },
  mergeItem: async (key, value) => {
    if (!AsyncStorage) return;

    return AsyncStorage.mergeItem(key, value);
  },
  flushGetRequests: () => {
    let asyncStorage: any = AsyncStorage;
    return asyncStorage.flushGetRequests();
  },
  multiSet: async kvPairs => {
    if (!AsyncStorage) return;

    return AsyncStorage.multiSet(kvPairs);
  },
  multiRemove: async keys => {
    if (!AsyncStorage) return;

    return AsyncStorage.multiRemove(keys);
  },
  multiMerge: async kvPairs => {
    if (!AsyncStorage) return;

    return AsyncStorage.multiMerge(kvPairs);
  },
  isAvailable: () => {
    let available = true;
    try {
      if (!AsyncStorage) return false;

      let keys = AsyncStorage.getAllKeys();
    } catch (e) {
      available = false;
    }
    return available;
  },
};

export default API;
