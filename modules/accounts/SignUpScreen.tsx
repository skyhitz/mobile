import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react';
import { HeaderBackButton } from '@react-navigation/stack';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { goBack } from 'app/modules/navigation/Navigator';
import { AuthBackground2 } from 'app/assets/images/Images';
import ValidationIcon from 'app/modules/accounts/ValidationIcon';
import { Stores } from 'app/functions/Stores';
import { NavStatelessComponent } from 'app/interfaces/Interfaces';

const SignUp: NavStatelessComponent = observer(({ navigation }) => {
  const { signUpValidationStore, sessionStore } = Stores();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  const updateUsername = ({ target }: any) => {
    setUsername(target.value);
    signUpValidationStore.validateUsername(target.value);
  };

  const updatePassword = ({ target }: any) => {
    setPassword(target.value);
    signUpValidationStore.validatePassword(target.value);
  };

  const updateDisplayName = ({ target }: any) => {
    setDisplayName(target.value);
    signUpValidationStore.validateDisplayName(target.value);
  };

  const updateEmail = ({ target }: any) => {
    setEmail(target.value);
    signUpValidationStore.validateEmail(target.value);
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await sessionStore.signUp({
        username: username,
        displayName: displayName,
        email: email,
        password: password,
      });
      setLoading(false);
      return navigate('ProfileSettings');
    } catch (e) {
      signUpValidationStore.setBackendError(e);
    }
    return setLoading(false);
  };

  return (
    <ImageBackground style={styles.background} source={AuthBackground2}>
      <View style={styles.overlay} />
      <View style={styles.inputContainer}>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Username"
            autoCorrect={false}
            autoFocus={true}
            style={styles.input}
            placeholderTextColor="white"
            value={username}
            onChange={updateUsername}
            maxLength={30}
          />
          <ValidationIcon isFieldValid={signUpValidationStore.usernameValid} />
        </View>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Display Name"
            autoCorrect={false}
            style={styles.input}
            placeholderTextColor="white"
            value={displayName}
            onChange={updateDisplayName}
            maxLength={30}
          />
          <ValidationIcon
            isFieldValid={signUpValidationStore.displayNameValid}
          />
        </View>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Email address"
            autoCorrect={false}
            style={styles.input}
            placeholderTextColor="white"
            value={email}
            onChange={updateEmail}
            maxLength={34}
          />
          <ValidationIcon isFieldValid={signUpValidationStore.emailValid} />
        </View>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Password"
            autoCorrect={false}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="white"
            value={password}
            onChange={updatePassword}
          />
          <ValidationIcon isFieldValid={signUpValidationStore.passwordValid} />
        </View>
        <View
          style={[
            styles.errorContainer,
            { opacity: signUpValidationStore.error ? 1 : 0 },
          ]}
        >
          <Text style={styles.error}>{signUpValidationStore.error}</Text>
        </View>
        <TouchableHighlight
          style={[
            styles.joinBtn,
            { opacity: signUpValidationStore.validForm ? 1 : 0.5 },
          ]}
          onPress={signUp}
          underlayColor={Colors.underlayColor}
          disabled={!signUpValidationStore.validForm}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              style={styles.loadingIndicator}
              color={Colors.white}
            />
          ) : (
            <Text style={styles.joinTextBtn}>Join</Text>
          )}
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
});

SignUp.navigationOptions = ({ navigation }) => ({
  title: 'Join',
  headerTitleStyle: { color: Colors.white },
  headerStyle: {
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 0,
  },
  headerLeft: () => (
    <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
  ),
});

export default SignUp;

var styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0.4,
    backgroundColor: Colors.overlayBackground,
  },
  field: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.darkBlueFieldTransparent,
    borderRadius: 10,
    marginVertical: 10,
    paddingRight: 10,
  },
  inputContainer: {
    alignSelf: 'center',
    marginTop: 0,
    maxWidth: 380,
    width: '100%',
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
    padding: 10,
    outlineWidth: 0,
    width: '100%',
  },
  joinBtn: {
    height: 48,
    backgroundColor: Colors.lightBlueBtn,
    borderRadius: 24,
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  error: {
    color: Colors.errorBackground,
  },
});
