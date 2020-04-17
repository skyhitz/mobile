import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import Layout from 'app/constants/Layout';
import { navigate } from 'app/modules/navigation/Navigator';
import { AuthBackground, Logo } from 'app/assets/images/Images';
import TextWithLetterSpacing from 'app/modules/ui/TextWithLetterSpacing';
import Colors from 'app/constants/Colors';
import { NavStatelessComponent } from 'app/interfaces/Interfaces';
import { useMediaQuery } from 'react-responsive';

const AuthScreen: NavStatelessComponent = props => {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (isDesktop && !props.navigation.getParam('web')) {
      props.navigation.setParams({ web: true });
    }
  });

  return (
    <ImageBackground style={styles.bg} source={AuthBackground}>
      <View style={styles.contentWrap}>
        <View style={styles.brand}>
          <Image style={styles.logo} source={Logo} />
          <TextWithLetterSpacing
            spacing={16}
            viewStyle={styles.titleView}
            textStyle={styles.titleText}
          >
            SKYHITZ
          </TextWithLetterSpacing>
        </View>
        <View>
          <View style={styles.signInWrap}>
            <View style={styles.joinContainer}>
              <TouchableHighlight
                style={styles.joinBtn}
                onPress={() => navigate('SignUp')}
              >
                <Text style={styles.joinText}>JOIN</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.loginBtn}
                onPress={() => navigate('SignIn')}
              >
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By using Skyhitz, you agree to the{' '}
            </Text>
            <Text style={styles.footerText}>
              <Text style={styles.link}>Terms of Use</Text> and{' '}
              <Text style={styles.link}>Privacy Policy.</Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  blur: {
    height: Layout.window.height,
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Layout.window.width,
    height: Layout.window.height,
  },
  contentWrap: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    flex: 1,
  },
  brand: {
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    paddingBottom: 60,
  },
  logo: {
    width: 69,
    height: 53,
    marginTop: 8,
  },
  titleText: {
    fontSize: 32,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Raleway-Light',
  },
  titleView: {
    marginTop: 20,
    paddingLeft: 12,
  },
  signInWrap: {
    backgroundColor: Colors.transparent,
    paddingTop: 120,
    width: 275,
  },
  signInButton: {
    width: 118.5,
    height: 40,
  },
  loginFacebook: {
    backgroundColor: Colors.facebookBtnBackground,
    height: 50,
    borderRadius: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  loginFb: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 17,
    paddingTop: 2,
    letterSpacing: 2,
  },
  joinContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  joinBtn: {
    flex: 2,
    backgroundColor: Colors.joinBtnBackground,
    alignSelf: 'stretch',
    justifyContent: 'center',
    opacity: 0.8,
    borderRadius: 3,
    height: 50,
    marginRight: 5,
  },
  loginBtn: {
    backgroundColor: Colors.white,
    opacity: 0.8,
    borderRadius: 3,
    height: 50,
    flex: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: 5,
  },
  joinText: {
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 17,
    paddingTop: 2,
  },
  loginText: {
    color: Colors.loginTextColor,
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 17,
    paddingTop: 2,
  },
  footer: {
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
    paddingBottom: 25,
    paddingTop: 10,
  },
  footerText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  link: {
    fontWeight: 'bold',
  },
});
