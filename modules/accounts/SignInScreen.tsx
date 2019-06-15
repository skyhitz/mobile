import React from 'react';
import { HeaderBackButton } from 'react-navigation';
import { goBack, navigate } from 'app/modules/navigation/Navigator';
import { inject } from 'mobx-react/native';
import { MaterialIcons } from '@expo/vector-icons';
import Layout from 'app/constants/Layout';
import Colors from 'app/constants/Colors';
import { AuthBackground2 } from 'app/assets/images/Images';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { trackSignIn } from 'app/analytics/Tracking';

@inject(stores => ({
  validateUsernameOrEmail: stores.signInValidationStore.validateUsernameOrEmail.bind(
    stores.signInValidationStore
  ),
  usernameOrEmailValid: stores.signInValidationStore.usernameOrEmailValid,
  validatePassword: stores.signInValidationStore.validatePassword.bind(
    stores.signInValidationStore
  ),
  passwordValid: stores.signInValidationStore.passwordValid,
  setBackendError: stores.signInValidationStore.setBackendError.bind(
    stores.signInValidationStore
  ),
  validForm: stores.signInValidationStore.validForm,
  error: stores.signInValidationStore.error,
  signIn: stores.sessionStore.signIn.bind(stores.sessionStore),
  loadUserLikes: stores.likesStore.refreshLikes.bind(stores.likesStore),
  loadPlaylists: stores.playlistsStore.refreshPlaylists.bind(
    stores.playlistsStore
  ),
}))
export default class SignInScreen extends React.Component<any, any> {
  static navigationOptions = () => ({
    title: 'Log In',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerLeft: (
      <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
    ),
  });
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
      password: '',
      loading: false,
    };
  }
  async signIn() {
    this.setState({ loading: true });
    try {
      let user = await this.props.signIn({
        usernameOrEmail: this.state.usernameOrEmail,
        password: this.state.password,
      });
      trackSignIn(user);
      this.setState({ loading: false });
      return navigate('Main');
    } catch (e) {
      this.props.setBackendError(e);
    }
    return this.setState({ loading: false });
  }
  goToResetPassword() {
    navigate('ResetPassword');
  }
  updateUsernameOrEmail(text) {
    this.setState({ usernameOrEmail: text });
  }
  updatePassword(text) {
    this.setState({ password: text });
    this.props.validatePassword(this.state.password);
  }
  render() {
    return (
      <ImageBackground style={styles.bg} source={AuthBackground2}>
        <View
          style={[styles.errorContainer, { opacity: this.props.error ? 1 : 0 }]}
        >
          <Text style={styles.error}>{this.props.error}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.field}>
            <MaterialIcons
              name="person-outline"
              size={24}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Username or email"
              autoCorrect={false}
              style={styles.input}
              autoFocus={true}
              placeholderTextColor="white"
              value={this.state.usernameOrEmail}
              onChangeText={this.updateUsernameOrEmail.bind(this)}
              onBlur={() =>
                this.props.validateUsernameOrEmail(this.state.usernameOrEmail)
              }
            />
          </View>
          <View style={styles.field}>
            <MaterialIcons
              name="lock-outline"
              size={22}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Password"
              autoCorrect={false}
              style={styles.input}
              secureTextEntry={true}
              placeholderTextColor="white"
              value={this.state.password}
              onChangeText={this.updatePassword.bind(this)}
              onBlur={() => this.props.validatePassword(this.state.password)}
            />
          </View>
          <TouchableHighlight
            style={[
              styles.joinBtn,
              { opacity: this.props.validForm ? 1 : 0.5 },
            ]}
            onPress={this.signIn.bind(this)}
            underlayColor={Colors.underlayColor}
            disabled={!this.props.validForm}
          >
            {this.renderButtonMessage(this.state.loading)}
          </TouchableHighlight>
          <TouchableOpacity
            style={styles.forgotPass}
            onPress={this.goToResetPassword.bind(this)}
            activeOpacity={0.8}
          >
            <Text style={styles.forgotPassText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  renderButtonMessage(loading) {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          style={styles.loadingIndicator}
          color={Colors.white}
        />
      );
    }
    return <Text style={styles.joinTextBtn}>LOG IN</Text>;
  }
}

const formPadding = 20;

let styles = StyleSheet.create({
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
  field: {
    maxHeight: 50,
    flex: 1,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    marginLeft: formPadding,
    marginRight: formPadding,
    marginTop: 40,
    flex: 1,
  },
  placeholderIcon: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    backgroundColor: Colors.transparent,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 36,
    bottom: 8,
  },
  joinBtn: {
    height: 48,
    backgroundColor: Colors.lightBlueBtn,
    borderRadius: 3,
    marginTop: 40,
  },
  joinTextBtn: {
    textAlign: 'center',
    color: Colors.white,
    paddingTop: 15,
    letterSpacing: 2,
    fontSize: 16,
  },
  errorContainer: {
    maxHeight: 40,
    backgroundColor: Colors.errorBackground,
    paddingLeft: formPadding,
    paddingRight: formPadding,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: Colors.white,
  },
  forgotPass: {
    backgroundColor: 'transparent',
  },
  forgotPassText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    paddingTop: 30,
    fontSize: 16,
  },
  loadingIndicator: {
    paddingTop: 15,
  },
});
