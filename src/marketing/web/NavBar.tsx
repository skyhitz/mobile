import React from 'react';
import { Nav } from '@expo/html-elements';
import SkyhitzLogo from './SkyhitzLogo';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import { observer } from 'mobx-react';
import { Stores } from 'app/src/functions/Stores';

export default observer(() => {
  const { sessionStore } = Stores();

  const linkTo = useLinkTo();

  return (
    <Nav
      style={{
        borderColor: '#000',
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Pressable onPress={() => linkTo('/')} style={styles.logoWrap}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
          }}
        >
          <SkyhitzLogo />
          <Text style={styles.logo}>SKYHITZ</Text>
        </View>
      </Pressable>
      <View
        style={{
          height: 56,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 20,
        }}
      >
        {sessionStore.user ? null : (
          <>
            <Text
              onPress={() => linkTo('/accounts/sign-in')}
              style={styles.defaultText}
            >
              Log in
            </Text>
            <Pressable
              onPress={() => linkTo('/accounts/sign-up')}
              style={[styles.signUpWrap, cursorPointer]}
            >
              <Text style={[styles.signUpText, cursorPointer]}>Sign Up</Text>
            </Pressable>
          </>
        )}
      </View>
    </Nav>
  );
});

let styles = StyleSheet.create({
  logo: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    letterSpacing: 12,
    paddingLeft: 20,
    fontFamily: 'Raleway-Light',
    fontWeight: '200',
  },
  defaultText: {
    color: 'rgb(255,255,255)',
    fontSize: 14,
    letterSpacing: 2,
    fontFamily: 'Raleway-Light',
    fontWeight: 'bold',
  },
  signUpText: {
    color: 'rgb(0, 0, 0)',
    fontSize: 14,
    letterSpacing: 2,
    fontFamily: 'Raleway-Light',
    fontWeight: 'bold',
  },
  signUpWrap: {
    backgroundColor: '#fff',
    height: 36,
    width: 98,
    borderRadius: 98,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginLeft: 15,
  },
  logoWrap: {
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
