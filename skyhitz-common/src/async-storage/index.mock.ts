const merge = require('lodash.merge');
const localStorage = require('./localstorage');

import { TAsyncStorage } from './types';

const API: TAsyncStorage = {
  getItem: key => {
    return API.multiGet([key]).then(values => values[0][1]);
  },
  setItem: (key, value) => {
    return API.multiSet([[key, value]]);
  },
  clear: () => {
    return new Promise(resolve => {
      localStorage.clear();
      resolve();
    });
  },
  getAllKeys: () => {
    return new Promise(resolve => {
      resolve(Object.keys(localStorage));
    });
  },
  removeItem: key => {
    return API.multiRemove([key]);
  },
  mergeItem: (key, value) => {
    return API.multiMerge([[key, value]]);
  },
  multiGet: keys => {
    return new Promise(resolve => {
      const keyValues = keys.reduce(
        (acc, key) => acc.concat([[key, localStorage.getItem(key)]]),
        []
      );
      resolve(keyValues);
    });
  },
  multiSet: kvPairs => {
    return new Promise((resolve, reject) => {
      const errors: any[] = [];

      kvPairs.forEach(([key, value]) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          errors.push(error);
        }
      });

      return errors.length > 0 ? reject(errors) : resolve();
    });
  },
  multiMerge: kvPairs => {
    return new Promise((resolve, reject) => {
      const errors: any[] = [];

      kvPairs.forEach(([key, value]) => {
        const rawValue = localStorage.getItem(key);

        if (!rawValue) {
          return;
        }

        try {
          localStorage.setItem(
            key,
            JSON.stringify(merge(JSON.parse(rawValue), JSON.parse(value)))
          );
        } catch (error) {
          errors.push(error);
        }
      });

      return errors.length > 0 ? reject(errors) : resolve();
    });
  },
  multiRemove: keys => {
    return new Promise(resolve => {
      keys.forEach(key => localStorage.removeItem(key));
      resolve();
    });
  },
  flushGetRequests: () => {
    console.warn('AsyncStorage.flushGetRequests: Not supported');
  }
};

export default API;
