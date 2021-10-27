import React from 'react';
import { ActivityIndicator } from 'react-native';
import FullScreenIcon from 'app/modules/ui/icons/fullscreen';
import FullScreenExitIcon from 'app/modules/ui/icons/fullscreen-exit';
import LoopIcon from 'app/modules/ui/icons/repeat';

const ICON_COLOR = '#FFFFFF';
const CENTER_ICON_SIZE = 36;
const BOTTOM_BAR_ICON_SIZE = 30;

export const Spinner = ({ size = CENTER_ICON_SIZE }) => (
  <ActivityIndicator color={ICON_COLOR} size={size} />
);

export const FullscreenEnterIcon = () => (
  <FullScreenIcon size={BOTTOM_BAR_ICON_SIZE} color={ICON_COLOR} />
);

export const FullscreenExitIcon = () => (
  <FullScreenExitIcon size={BOTTOM_BAR_ICON_SIZE} color={ICON_COLOR} />
);

export const ReplayIcon = ({ size = CENTER_ICON_SIZE }) => (
  <LoopIcon size={size} color={ICON_COLOR} />
);
