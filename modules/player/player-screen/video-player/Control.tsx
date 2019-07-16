/**
 * @providesModule control
 * @flow
 */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const centeredContentWidth = 60;

const Control = ({ callback, center, children, ...otherProps }) => (
  <TouchableOpacity
    {...otherProps}
    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
    onPress={() => {
      callback();
    }}>
    <View
      style={
        center
          ? {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              justifyContent: 'center',
              width: centeredContentWidth,
              height: centeredContentWidth,
              borderRadius: centeredContentWidth,
            }
          : {}
      }>
      {children}
    </View>
  </TouchableOpacity>
);

export default Control;
