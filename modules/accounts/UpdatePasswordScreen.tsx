import React from 'react';
import { HeaderBackButton } from 'react-navigation';
import { inject } from 'mobx-react/native';
import { MaterialIcons } from '@expo/vector-icons';
import Layout from 'app/constants/Layout';
import Colors from 'app/constants/Colors';
import { AuthBackground2 } from 'app/assets/images/Images';
import { goBack, navigate } from 'app/modules/navigation/Navigator';
import ValidationIcon from 'app/modules/accounts/ValidationIcon';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { trackChangePassword } from 'app/analytics/Tracking';

@inject(stores => ({
  validatePassword: stores.updatePasswordValidationStore.validatePassword.bind(
    stores.updatePasswordValidationStore
  ),
  validatePasswordConfirmation: stores.updatePasswordValidationStore.validatePasswordConfirmation.bind(
    stores.updatePasswordValidationStore
  ),
  passwordValid: stores.updatePasswordValidationStore.passwordValid,
  passwordConfirmationValid:
    stores.updatePasswordValidationStore.passwordConfirmationValid,
  setBackendError: stores.updatePasswordValidationStore.setBackendError.bind(
    stores.updatePasswordValidationStore
  ),
  validForm: stores.updatePasswordValidationStore.validForm,
  error: stores.updatePasswordValidationStore.error,
  updatePassword: stores.sessionStore.updatePassword.bind(stores.sessionStore),
}))
export default class UpdatePasswordScreen extends React.Component<any, any> {
  static navigationOptions = () => ({
    title: 'Update Password',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerLeft: (
      <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
    ),
  });
  constructor(props) {
    let { token } = props.navigation.state.params;
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: '',
      token: token,
      loading: false,
    };
  }
  async updatePassword() {
    this.setState({ loading: true });
    try {
      await this.props.updatePassword(this.state.token, this.state.password);
      this.setState({ loading: false });
      trackChangePassword();
      return navigate('Main');
    } catch (e) {
      this.props.setBackendError(e);
    }
    this.setState({ loading: false });
  }
  updatePasswordInput(text) {
    this.setState({ password: text });
    this.props.validatePassword(text);
  }
  updatePasswordConfirmation(text) {
    this.setState({ passwordConfirmation: text });
    this.props.validatePasswordConfirmation(text, this.state.password);
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
              name="lock-outline"
              size={22}
              color={Colors.white}
              style={styles.placeholderIcon}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="New Password"
              autoCorrect={false}
              style={styles.input}
              secureTextEntry={true}
              placeholderTextColor="white"
              value={this.state.password}
              onChangeText={this.updatePasswordInput.bind(this)}
              onBlur={() => this.props.validatePassword(this.state.password)}
            />
            {ValidationIcon(this.props.passwordValid)}
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
              placeholder="Confirm New Password"
              autoCorrect={false}
              style={styles.input}
              secureTextEntry={true}
              placeholderTextColor="white"
              value={this.state.passwordConfirmation}
              onChangeText={this.updatePasswordConfirmation.bind(this)}
              onBlur={() =>
                this.props.validatePasswordConfirmation(
                  this.state.passwordConfirmation,
                  this.state.password
                )
              }
            />
            {ValidationIcon(this.props.passwordConfirmationValid)}
          </View>
          <TouchableHighlight
            style={[
              styles.joinBtn,
              { opacity: this.props.validForm ? 1 : 0.5 },
            ]}
            onPress={this.updatePassword.bind(this)}
            underlayColor={Colors.underlayColor}
            disabled={!this.props.validForm}
          >
            {this.renderButtonMessage(this.state.loading)}
          </TouchableHighlight>
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
    return <Text style={styles.joinTextBtn}>UPDATE PASSWORD</Text>;
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
