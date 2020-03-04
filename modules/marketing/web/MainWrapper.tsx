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
              maxWidth: 600,
            }}
          >
            Beats market for music creators
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
            Upload exclusive beats for sale and buy fresh songwriting ideas from
            other music producers. Join a music community of beatmakers.
          </P>
          <ScreenShots />
        </View>
      </Main>
    );
  }
}
