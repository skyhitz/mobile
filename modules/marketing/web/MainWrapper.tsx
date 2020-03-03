import React from 'react';
import { H1, Main, P } from '@expo/html-elements';
import { View } from 'react-native';
import Colors from 'app/constants/Colors';
import ScreenShots from './Screenshots';

export default class MainWrapper extends React.Component {
  render() {
    return (
      <Main
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <H1
            style={{
              textAlign: 'center',
              color: Colors.white,
              fontFamily: 'Raleway-Light',
              fontSize: 65,
              fontWeight: '500',
              maxWidth: 370,
            }}
          >
            Buy and sell beats
          </H1>
          <P
            style={{
              textAlign: 'center',
              color: Colors.white,
              maxWidth: 500,
              fontFamily: 'Raleway-Light',
              fontWeight: '600',
              fontSize: 18,
              letterSpacing: 2,
              lineHeight: '1.5em',
            }}
          >
            Join a decentralized music market for beatmakers. Upload exclusive
            beats for sale and buy fresh songwriting ideas from other producers.
            Connect with a worldwide community of music creators.
          </P>
          <ScreenShots />
        </View>
      </Main>
    );
  }
}
