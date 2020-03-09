import { TAsyncStorage } from './types';
import MobileLocalStorage from './index.mobile';
import WebLocalStorage from './index.web';
import MockLocalStorage from './index.mock';
let LocalStorage: TAsyncStorage;
interface MyWindow extends Window {
  localStorage: any;
}

declare var window: MyWindow;

if (
  typeof window !== 'undefined' &&
  typeof window.localStorage !== 'undefined'
) {
  LocalStorage = WebLocalStorage;
} else {
  let isMobileStorageAvailable = MobileLocalStorage.isAvailable!();
  if (isMobileStorageAvailable) {
    LocalStorage = MobileLocalStorage;
  } else {
    LocalStorage = MockLocalStorage;
  }
}

export default LocalStorage;
