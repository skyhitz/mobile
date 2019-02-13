import { events, identifyUser, track } from 'app/analytics/Analytics';

export const trackSignUp = user => {
  identifyUser(user);
  track(events.USER_SIGNED_UP, user);
};

export const trackSignIn = user => {
  identifyUser(user);
  track(events.USER_SIGNED_IN, user);
};

export const trackSignOut = () => {
  track(events.USER_SIGNED_OUT);
};

export const trackResetPassword = () => {
  track(events.USER_RESET_PASSWORD);
};

export const trackChangePassword = () => {
  track(events.USER_CHANGED_PASSWORD);
};

export const trackPlayEntry = entry => {
  track(events.USER_PLAYED_ENTRY, entry);
};

export const trackOpenProfile = profile => {
  track(events.USER_OPENED_PROFILE, profile);
};

export const trackUpdateSettings = () => {
  track(events.USER_UPDATED_SETTINGS);
};
