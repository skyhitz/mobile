import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Foundation, MaterialIcons, EvilIcons } from '@expo/vector-icons';

const ICON_COLOR = '#FFFFFF';
const CENTER_ICON_SIZE = 36;
const BOTTOM_BAR_ICON_SIZE = 30;

export const PlayIcon = () => (
  <Foundation
    name={'play'}
    size={CENTER_ICON_SIZE}
    color={ICON_COLOR}
    style={{ textAlign: 'center' }}
  />
);

export const PauseIcon = () => (
  <Foundation
    name={'pause'}
    size={CENTER_ICON_SIZE}
    color={ICON_COLOR}
    style={{ textAlign: 'center' }}
  />
);

export const LoadingCircle = () => (
  <EvilIcons
    name={'spinner-3'}
    size={130}
    color={ICON_COLOR}
    style={{ textAlign: 'center', marginTop: 12 }}
  />
);

export const Spinner = ({ size = CENTER_ICON_SIZE }) => (
  <ActivityIndicator color={ICON_COLOR} size={size} />
);

export const FullscreenEnterIcon = () => (
  <MaterialIcons
    name={'fullscreen'}
    size={BOTTOM_BAR_ICON_SIZE}
    color={ICON_COLOR}
    style={{ textAlign: 'center' }}
  />
);

export const FullscreenExitIcon = () => (
  <MaterialIcons
    name={'fullscreen-exit'}
    size={BOTTOM_BAR_ICON_SIZE}
    color={ICON_COLOR}
    style={{ textAlign: 'center' }}
  />
);

export const ReplayIcon = ({ size = CENTER_ICON_SIZE }) => (
  <MaterialIcons
    name={'replay'}
    size={size}
    color={ICON_COLOR}
    style={{ textAlign: 'center' }}
  />
);
