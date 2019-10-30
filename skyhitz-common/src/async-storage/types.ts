export type TAsyncStorage = {
  setItem: (key: string, value: string) => Promise<void>,
  getItem: (key: string) => Promise<string>,
  clear: () => Promise<void>,
  getAllKeys: () => Promise<Array<string>>,
  multiGet: (keys: Array<string>) => Promise<Array<[string, string]>>,
  multiSet: (kvPairs: Array<[string, string]>) => Promise<void>,
  multiMerge: (kvPairs: Array<[string, string]>) => Promise<void>,
  multiRemove: (keys: Array<string>) => Promise<void>,
  removeItem: (key: string) => Promise<void>,
  mergeItem: (key: string, value: string) => Promise<void>,
  flushGetRequests: () => void,
  isAvailable?: () => boolean
};
