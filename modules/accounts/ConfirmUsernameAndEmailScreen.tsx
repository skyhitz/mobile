import React from 'react';
import Layout from 'app/constants/Layout';
import Colors from 'app/constants/Colors';
import { AuthBackground2 } from 'app/assets/images/Images';
import { HeaderBackButton } from 'react-navigation';
import { goBack, navigate } from 'app/modules/navigation/Navigator';
import { inject } from 'mobx-react';
import { MaterialIcons } from '@expo/vector-icons';
import ValidationIcon from 'app/modules/accounts/ValidationIcon';
import { identifyUser } from 'app/analytics/Analytics';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Stores } from 'skyhitz-common';

@inject((stores:Stores) => ({
  validateUsername: stores.usernameAndEmailValidationStore.validateUsername.bind(
    stores.usernameAndEmailValidationStore
  ),
  usernameValid: stores.usernameAndEmailValidationStore.usernameValid,
  validateEmail: stores.usernameAndEmailValidationStore.validateEmail.bind(
    stores.usernameAndEmailValidationStore
  ),
  emailValid: stores.usernameAndEmailValidationStore.emailValid,
  setBackendError: stores.usernameAndEmailValidationStore.setBackendError.bind(
    stores.usernameAndEmailValidationStore
  ),
  validForm: stores.usernameAndEmailValidationStore.validForm,
  error: stores.usernameAndEmailValidationStore.error,
  confirmUsernameAndEmail: stores.sessionStore.confirmUsernameAndEmail.bind(
    stores.sessionStore
  ),
}))
export default class ConfirmUsernameAndEmail extends React.Component<any, any> {
  static navigationOptions = () => ({
    title: 'Confirm',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerLeft: (
      <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
    ),
  });
  constructor(props) {
    let { token, email, username } = props.navigation.state.params;
    super(props);
    this.state = {
      email: email,
      username: username,
      token: token,
      loading: false,
    };
  }
  componentDidMount() {
    this.validateFields();
  }
  async confirmUsernameAndEmail() {
    this.setState({ loading: true });
    try {
      const user = await this.props.confirmUsernameAndEmail(
        this.state.username,
        this.state.email,
        this.state.token
      );
      identifyUser(user);
      this.setState({ loading: false });
      return navigate('Main');
    } catch (e) {
      this.props.setBackendError(e);
    }
    this.setState({ loading: false });
  }
  updateEmail(text) {
    this.setState({ email: text });
    this.props.validateEmail(text);
  }
  updateUsername(text) {
    this.setState({ username: text });
    this.props.validateUsername(text);
  }
  validateFields() {
    this.props.validateUsername(this.state.username);
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
          <TouchableHighlight
            style={[
              styles.joinBtn,
              { opacity: this.props.validForm ? 1 : 0.5 },
            ]}
            onPress={this.confirmUsernameAndEmail.bind(this)}
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
    return <Text style={styles.joinTextBtn}>CONFIRM</Text>;
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
