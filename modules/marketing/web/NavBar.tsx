import React from 'react';
import { Nav } from '@expo/html-elements';
import SkyhitzLogo from './SkyhitzLogo';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Navbar = () => {
  const { navigate } = useNavigation();

  return (
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
      <TouchableOpacity
        onPress={() => navigate('WebApp')}
        style={styles.logoWrap}
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
      </TouchableOpacity>
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
        <Text onPress={() => navigate('SignIn')} style={styles.defaultText}>
          Log in
        </Text>
        <TouchableOpacity
          onPress={() => navigate('SignUp')}
          style={styles.signUpWrap}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Nav>
  );
};

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

export default Navbar;
