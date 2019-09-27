import React from 'react';
import { HeaderBackButton } from 'react-navigation';
import { goBack } from 'app/modules/navigation/Navigator';
import Layout from 'app/constants/Layout';
import Colors from 'app/constants/Colors';
import { AuthBackground2 } from 'app/assets/images/Images';
import { inject } from 'mobx-react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { trackResetPassword } from 'app/analytics/Tracking';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  validateEmail: stores.resetPasswordValidationStore.validateEmail.bind(
    stores.resetPasswordValidationStore
  ),
  emailValid: stores.resetPasswordValidationStore.emailValid,
  setBackendError: stores.resetPasswordValidationStore.setBackendError.bind(
    stores.resetPasswordValidationStore
  ),
  validForm: stores.resetPasswordValidationStore.validForm,
  error: stores.resetPasswordValidationStore.error,
  sendResetEmail: stores.sessionStore.sendResetEmail.bind(stores.sessionStore),
}))
export default class ResetPasswordScreen extends React.Component<any, any> {
  static navigationOptions = () => ({
    title: 'Forgot Password',
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
      email: '',
      loading: false,
      buttonMessage: 'SEND RESET EMAIL',
      bottomCopy: "We'll send you an email to reset your password.",
      buttonColor: Colors.lightBlueBtn,
    };
  }
  async sendResetEmail() {
    this.setState({ loading: true });
    try {
      await this.props.sendResetEmail(this.state.email);
      this.setState({
        buttonMessage: 'RESET EMAIL SENT',
        bottomCopy:
          'Check your email. We just sent you a link to reset your password.',
        buttonColor: Colors.valid,
      });
      trackResetPassword();
    } catch (e) {
      this.props.setBackendError(e);
    }
    this.setState({ loading: false });
  }
  updateEmail(text: any) {
    this.setState({ email: text });
    this.props.validateEmail(this.state.email);
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
          </View>
          <TouchableHighlight
            style={[
              styles.joinBtn,
              { opacity: this.props.validForm ? 1 : 0.5 },
              { backgroundColor: this.state.buttonColor },
            ]}
            onPress={this.sendResetEmail.bind(this)}
            underlayColor={Colors.underlayColor}
            disabled={!this.props.validForm}
          >
            {this.renderButtonMessage(this.state.loading)}
          </TouchableHighlight>
          <Text style={styles.forgotPassText}>{this.state.bottomCopy}</Text>
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
    return <Text style={styles.joinTextBtn}>{this.state.buttonMessage}</Text>;
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
