import React from 'react';
import { Nav, A } from '@expo/html-elements';
import SkyhitzLogo from './SkyhitzLogo';
import { View, Text, StyleSheet } from 'react-native';
let Anchor: React.ComponentType<any> = A;

const Navbar = () => (
  <Nav
    style={{
      borderColor: '#000',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: 56,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <Anchor
      href="/"
      target="_self"
      style={{
        height: 56,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 15,
        }}
      >
        <SkyhitzLogo />
        <Text style={styles.logo}>SKYHITZ</Text>
      </View>
    </Anchor>
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
      <Anchor href="/sign-in" target="_self">
        <Text style={styles.defaultText}>Log in</Text>
      </Anchor>
      <Anchor
        href="/sign-up"
        target="_self"
        style={{
          background: '#fff',
          height: 36,
          width: 98,
          borderRadius: 98,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          marginLeft: 15,
        }}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </Anchor>
    </View>
  </Nav>
);

let styles = StyleSheet.create({
  logo: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
    letterSpacing: 12,
    paddingLeft: 8,
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
});

export default Navbar;
