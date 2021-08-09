import React from 'react';
import { Footer } from '@expo/html-elements';
import SocialLinks from './SocialLinks';
import Colors from 'app/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import { Text } from 'react-native';

export default () => {
  const linkTo = useLinkTo();

  return (
    <Footer
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 60,
        marginTop: 20,
        alignItems: 'center',
        width: '94%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Text
        onPress={() => linkTo('/accounts/terms')}
        style={{
          color: Colors.white,
        }}
      >
        Terms of Use
      </Text>
      <Text
        onPress={() => linkTo('/accounts/privacy')}
        style={{
          color: Colors.white,
          paddingHorizontal: 20,
        }}
      >
        Privacy Policy
      </Text>
      <SocialLinks />
    </Footer>
  );
};
