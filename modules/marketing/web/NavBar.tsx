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
      justifyContent: 'flex-start',
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
});

export default Navbar;
