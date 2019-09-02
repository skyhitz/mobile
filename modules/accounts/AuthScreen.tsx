import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { inject } from 'mobx-react';
import { Facebook, Constants } from 'expo';
import Layout from 'app/constants/Layout';
import { navigate } from 'app/modules/navigation/Navigator';
import { AuthBackground, Logo } from 'app/assets/images/Images';
import TextWithLetterSpacing from 'app/modules/ui/TextWithLetterSpacing';
import Colors from 'app/constants/Colors';
import { identifyUser } from 'app/analytics/Analytics';
import { Stores } from 'skyhitz-common';

@inject((stores: Stores) => ({
  signInWithFacebook: stores.sessionStore.signInWithFacebook.bind(
    stores.sessionStore
  ),
}))
export default class AuthScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  async handleFacebookSignIn() {
    this.setState({ loading: true });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      Constants.manifest.facebookAppId,
      { permissions: ['email', 'public_profile', 'user_friends'] }
    );
    if (type === 'success') {
      let user = await this.props.signInWithFacebook(token);
      this.setState({ loading: false });
      if (user && !user.id) {
        return navigate('ConfirmUsernameAndEmail', {
          token: token,
          email: user.email,
          username: user.username,
        });
      }
      if (user && user.id) {
        identifyUser(user);
        return navigate('ProfileSettings');
      }
    }
    this.setState({ loading: false });
  }
  render() {
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
              {/* <TouchableHighlight
                style={styles.loginFacebook}
                onPress={this.handleFacebookSignIn.bind(this)}
              >
                {this.renderButtonMessage(this.state.loading)}
              </TouchableHighlight> */}
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
  }
  renderButtonMessage(loading) {
    if (loading) {
      return <ActivityIndicator size="small" color={Colors.white} />;
    }
    return <Text style={styles.loginFb}>LOGIN WITH FACEBOOK</Text>;
  }
}

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
