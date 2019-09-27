import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { inject } from 'mobx-react';
import { HeaderBackButton } from 'react-navigation';
import Layout from 'app/constants/Layout';
import Colors from 'app/constants/Colors';
import { goBack, navigate } from 'app/modules/navigation/Navigator';
import { AuthBackground2 } from 'app/assets/images/Images';
import ValidationIcon from 'app/modules/accounts/ValidationIcon';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { trackSignUp } from 'app/analytics/Tracking';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  validateUsername: stores.signUpValidationStore.validateUsername.bind(
    stores.signUpValidationStore
  ),
  usernameValid: stores.signUpValidationStore.usernameValid,
  validateDisplayName: stores.signUpValidationStore.validateDisplayName.bind(
    stores.signUpValidationStore
  ),
  displayNameValid: stores.signUpValidationStore.displayNameValid,
  validateEmail: stores.signUpValidationStore.validateEmail.bind(
    stores.signUpValidationStore
  ),
  emailValid: stores.signUpValidationStore.emailValid,
  validatePassword: stores.signUpValidationStore.validatePassword.bind(
    stores.signUpValidationStore
  ),
  setBackendError: stores.signUpValidationStore.setBackendError.bind(
    stores.signUpValidationStore
  ),
  passwordValid: stores.signUpValidationStore.passwordValid,
  validForm: stores.signUpValidationStore.validForm,
  error: stores.signUpValidationStore.error,
  signUp: stores.sessionStore.signUp.bind(stores.sessionStore),
}))
export default class SignUpScreen extends React.Component<any, any> {
  static navigationOptions = () => ({
    title: 'Join',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
      borderBottomWidth: 0,
    },
    headerLeft: (
      <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
    ),
  });

  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      displayName: '',
      email: '',
      password: '',
      loading: false,
    };
  }
  async signUp() {
    this.setState({ loading: true });
    try {
      let user = await this.props.signUp({
        username: this.state.username,
        displayName: this.state.displayName,
        email: this.state.email,
        password: this.state.password,
      });
      trackSignUp(user);
      this.setState({ loading: false });
      return navigate('ProfileSettings');
    } catch (e) {
      this.props.setBackendError(e);
    }
    return this.setState({ loading: false });
  }
  updateDisplayName(text: any) {
    this.setState({ displayName: text });
  }
  updateUsername(text: any) {
    this.setState({ username: text });
  }
  updateEmail(text: any) {
    this.setState({ email: text });
  }
  updatePassword(text: any) {
    this.setState({ password: text });
    this.props.validatePassword(this.state.password);
  }
  render() {
    return (
      <ImageBackground style={styles.bg} source={AuthBackground2}>
        <View style={styles.overlay} />
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
              placeholder="Username"
              autoCorrect={false}
              autoFocus={true}
              style={styles.input}
              placeholderTextColor="white"
              value={this.state.username}
              onChangeText={this.updateUsername.bind(this)}
              onBlur={() => this.props.validateUsername(this.state.username)}
              maxLength={30}
            />
            {ValidationIcon(this.props.usernameValid)}
          </View>
          <View style={styles.field}>
            <MaterialCommunityIcons
              name="account-card-details"
              size={20}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Display Name"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="white"
              value={this.state.displayName}
              onChangeText={this.updateDisplayName.bind(this)}
              onBlur={() =>
                this.props.validateDisplayName(this.state.displayName)
              }
              maxLength={30}
            />
            {ValidationIcon(this.props.displayNameValid)}
          </View>
          <View style={styles.field}>
            <MaterialIcons
              name="mail-outline"
              size={22}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Email address"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="white"
              value={this.state.email}
              onChangeText={this.updateEmail.bind(this)}
              onBlur={() => this.props.validateEmail(this.state.email)}
              maxLength={34}
            />
            {ValidationIcon(this.props.emailValid)}
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
            {ValidationIcon(this.props.passwordValid)}
          </View>
          <TouchableHighlight
            style={[
              styles.joinBtn,
              { opacity: this.props.validForm ? 1 : 0.5 },
            ]}
            onPress={this.signUp.bind(this)}
            underlayColor={Colors.underlayColor}
            disabled={!this.props.validForm}
          >
            {this.renderButtonMessage(this.state.loading)}
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }

  renderButtonMessage(loading: any) {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          style={styles.loadingIndicator}
          color={Colors.white}
        />
      );
    }
    return <Text style={styles.joinTextBtn}>JOIN</Text>;
  }
}

const formPadding = 20;

var styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Layout.window.width,
    height: Layout.window.height,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Layout.window.width,
    height: Layout.window.height,
    opacity: 0.4,
    backgroundColor: Colors.overlayBackground,
  },
  field: {
    maxHeight: 50,
    flex: 1,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
  },
  placeholderIcon: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    backgroundColor: Colors.transparent,
  },
  inputContainer: {
    marginLeft: formPadding,
    marginRight: formPadding,
    marginTop: 40,
    flex: 1,
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
  loadingIndicator: {
    paddingTop: 15,
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
});
