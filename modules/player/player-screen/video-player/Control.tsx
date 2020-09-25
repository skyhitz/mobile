import React from 'react';
import { View, Pressable } from 'react-native';

const centeredContentWidth = 60;

export default ({ callback, center, children, ...otherProps }: any) => (
  <Pressable
    {...otherProps}
    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
    onPress={() => {
      callback();
    }}
  >
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
      }
    >
      {children}
    </View>
  </Pressable>
);
