import React from 'react';
import { H1, Main, P, A } from '@expo/html-elements';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import Colors from 'app/constants/Colors';
import ScreenShots from './Screenshots';
import { useMediaQuery } from 'react-responsive';
import { useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';

// https://apps.apple.com/us/app/skyhitz/id1105406020

export default function MainWrapper() {
  const isTablet = useMediaQuery({ query: '(max-width: 800px)' });
  const { navigate } = useNavigation();

  return (
    <Main
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <H1 style={isTablet ? styles.titleTablet : styles.titleDesktop}>
          Beats market for music creators
        </H1>
        <P
          style={
            isTablet ? styles.descriptionTablet : styles.descriptionDesktop
          }
        >
          Upload exclusive beats for sale and buy fresh songwriting ideas from
          other music producers. Join a music community of beatmakers!
        </P>
        <Pressable onPress={() => navigate('SignUp')}>
          <View
            style={[
              {
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
              },
              cursorPointer,
            ]}
          >
            <Text
              style={{
                fontFamily: 'Raleway-Light',
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              Sign up for free
            </Text>
          </View>
        </Pressable>
        <ScreenShots />
      </View>
    </Main>
  );
}

let styles = StyleSheet.create({
  titleDesktop: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Raleway-Light',
    fontSize: 65,
    fontWeight: '500',
    maxWidth: 600,
    marginBottom: '0.2em',
  },
  titleTablet: {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'Raleway-Light',
    fontSize: 35,
    fontWeight: '500',
    maxWidth: 300,
    marginBottom: '0.2em',
  },
  descriptionDesktop: {
    textAlign: 'center',
    color: Colors.white,
    maxWidth: 500,
    fontFamily: 'Raleway-Light',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 2,
    lineHeight: 25,
    marginBottom: '2.2em',
  },
  descriptionTablet: {
    textAlign: 'center',
    color: Colors.white,
    maxWidth: 300,
    fontFamily: 'Raleway-Light',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 2,
    lineHeight: 25,
    marginBottom: '2.2em',
  },
});
