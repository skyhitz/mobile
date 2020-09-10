import React from 'react';
import { Footer, A } from '@expo/html-elements';
import SocialLinks from './SocialLinks';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
let Anchor: React.ComponentType<any> = A;
import { Text } from 'react-native';

export default () => {
  const { navigate } = useNavigation();

  return (
    <Footer
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 60,
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
        width: '94%',
        alignSelf: 'center',
      }}
    >
      <Text
        onPress={() => navigate('Terms')}
        style={{
          color: Colors.white,
        }}
      >
        Terms of Use
      </Text>
      <Text
        onPress={() => navigate('Privacy')}
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
