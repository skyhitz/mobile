import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, selector, DefaultValue } from 'recoil';
import { client } from '../api/client';
import { userDataKey } from '../config/constants';
import { User } from '../models';
import { ProfileEdit } from '../models/profile';

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  console.log('localstorage effect');
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

export const userAtom = atom<null | User>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [localStorageEffect(userDataKey), headersEffect()],
});

export const profileAtom = atom<ProfileEdit>({
  key: 'profileEdit',
  default: selector({
    key: 'user',
    get: ({ get }) => {
      const user = get(userAtom);
      if (!user)
        return {
          avatarUrl: '',
          displayName: '',
          description: '',
          username: '',
          email: '',
          loadingAvatar: false,
          uploadError: '',
        };
      const {
        avatarUrl,
        displayName,
        description,
        username,
        email,
      } = (user as unknown) as ProfileEdit;
      return {
        avatarUrl,
        displayName,
        description,
        username,
        email,
        loadingAvatar: false,
        uploadError: '',
      };
    },
  }),
});

export const profileValidationErrorAtom = selector<string | null>({
  key: 'profileError',
  get: ({ get }) => {
    const { avatarUrl, displayName, description, username, email } = get(
      profileAtom
    );
    if (!avatarUrl) {
      return 'Upload a profile picture.';
    }

    if (!displayName) {
      return 'Add a display name.';
    }

    if (!description) {
      return 'Add a description.';
    }

    if (!username) {
      return 'Add a username.';
    }

    if (!email) {
      return 'Add an email.';
    }
    return null;
  },
});

export const canUpdateProfileAtom = selector<boolean>({
  key: 'profileError',
  get: ({ get }) => {
    const { avatarUrl, displayName, description, username, email } = get(
      profileAtom
    );
    return (
      !!avatarUrl && !!displayName && !!description && !!username && !!email
    );
  },
});
