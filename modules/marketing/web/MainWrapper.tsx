import React from 'react';
import { H1, Main, P, A } from '@expo/html-elements';
import { View, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import ScreenShots from './Screenshots';
import * as Device from 'expo-device';
let Anchor: React.ComponentType<any> = A;

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
              marginBottom: '0.2em',
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
              marginBottom: '2.2em',
            }}
          >
            Upload exclusive beats for sale and buy fresh songwriting ideas from
            other music producers. Join a music community of beatmakers!
          </P>
          <Anchor
            href={
              Device.osName == 'Android' || Device.osName == 'Windows'
                ? 'https://play.google.com/store/apps/details?id=com.skyhitz.skyhitz'
                : 'https://apps.apple.com/us/app/skyhitz/id1105406020'
            }
            target="_blank"
          >
            <View
              style={{
                minWidth: 200,
                backgroundColor: Colors.white,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 14,
                paddingRight: 14,
                borderColor: Colors.black,
                borderRadius: 30,
                height: 48,
                marginBottom: 60,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Raleway-Light',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                Get started ->
              </Text>
            </View>
          </Anchor>
          <ScreenShots />
        </View>
      </Main>
    );
  }
}
