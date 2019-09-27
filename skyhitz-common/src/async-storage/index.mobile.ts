import { TAsyncStorage } from './types';
let AsyncStorage: TAsyncStorage;
try {
  AsyncStorage = require('react-native').AsyncStorage;
} catch (e) {
  AsyncStorage = null;
}

const API: TAsyncStorage = {
  getItem: key => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key, value) => {
    return AsyncStorage.setItem(key, value);
  },
  clear: () => {
    return AsyncStorage.clear();
  },
  getAllKeys: () => {
    return AsyncStorage.getAllKeys();
  },
  multiGet: keys => {
    return AsyncStorage.multiGet(keys);
  },
  removeItem: key => {
    return AsyncStorage.removeItem(key);
  },
  mergeItem: (key, value) => {
    return AsyncStorage.mergeItem(key, value);
  },
  flushGetRequests: () => {
    let asyncStorage: any = AsyncStorage;
    return asyncStorage.flushGetRequests();
  },
  multiSet: kvPairs => {
    return AsyncStorage.multiSet(kvPairs);
  },
  multiRemove: keys => {
    return AsyncStorage.multiRemove(keys);
  },
  multiMerge: kvPairs => {
    return AsyncStorage.multiMerge(kvPairs);
  },
  isAvailable: () => {
    let available = true;
    try {
      let keys = AsyncStorage.getAllKeys();
    } catch (e) {
      available = false;
    }
    return available;
  }
};

export default API;
