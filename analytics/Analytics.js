import * as Amplitude from 'expo-analytics-amplitude';
import Environment from 'app/environment/Environment';

export const events = {
  USER_SIGNED_IN: 'USER_SIGNED_IN',
  USER_SIGNED_OUT: 'USER_SIGNED_OUT',
  USER_SIGNED_UP: 'USER_SIGNED_UP',
  USER_RESET_PASSWORD: 'USER_RESET_PASSWORD',
  USER_CHANGED_PASSWORD: 'USER_CHANGED_PASSWORD',
  USER_PLAYED_ENTRY: 'USER_PLAYED_ENTRY',
  USER_OPENED_PROFILE: 'USER_OPENED_PROFILE',
  USER_UPDATED_SETTINGS: 'USER_UPDATED_SETTINGS',
};

let isInitialized = false;
const apiKey = Environment.AMPLITUDE_API_KEY;
const initialize = () => {
  Amplitude.initialize(apiKey);
  isInitialized = true;
};

const maybeInitialize = () => {
  if (apiKey && !isInitialized) {
    initialize();
  }
};

const identify = (id: ?string, options?: ?Object = null) => {
  maybeInitialize();

  if (id) {
    Amplitude.setUserId(id);
    if (options) {
      Amplitude.setUserProperties(options);
    }
  } else {
    Amplitude.clearUserProperties();
  }
};

export const identifyUser = user => {
  identify(user.id, user);
};

export const track = (event: string, options: any = null) => {
  maybeInitialize();

  if (options) {
    Amplitude.logEventWithProperties(event, options);
  } else {
    Amplitude.logEvent(event);
  }
};
