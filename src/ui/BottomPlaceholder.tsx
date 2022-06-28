import React from 'react';
import { View } from 'react-native';
import { useMediaQuery } from 'react-responsive';

function BottomPlaceholder() {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <View
      style={{
        height: isDesktop ? 80 : 40,
        backgroundColor: 'transparent',
        width: '100%',
      }}
    />
  );
}

export default BottomPlaceholder;
