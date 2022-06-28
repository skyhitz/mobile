import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, DefaultValue } from 'recoil';
import { client } from '../api/client';
import { userDataKey } from '../config/constants';
import { UserData } from '../models';

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  setSelf(
    AsyncStorage.getItem(key).then((savedValue) =>
      savedValue != null ? JSON.parse(savedValue) : new DefaultValue()
    )
  );

  onSet((newValue, _, isReset) => {
    isReset
      ? AsyncStorage.removeItem(key)
      : AsyncStorage.setItem(key, JSON.stringify(newValue));
  });
};

const headersEffect = () => ({ setSelf, onSet }) => {
  onSet((newValue, _, isReset) => {
    isReset
      ? client.setHeader('authorization', '')
      : client.setHeader('authorization', `Bearer ${newValue.jwt}`);
  });
};

export const userAtom = atom<null | UserData>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [localStorageEffect(userDataKey), headersEffect()],
});
