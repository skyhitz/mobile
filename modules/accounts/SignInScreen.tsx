import React, { useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { goBack } from 'app/modules/navigation/Navigator';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Stores } from 'app/functions/Stores';
import { NavStatelessComponent } from 'app/interfaces/Interfaces';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from 'app/modules/ui/BackgroundImage';

const SignIn: NavStatelessComponent = observer(props => {
  const { signInValidationStore, sessionStore } = Stores();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      await sessionStore.signIn({
        usernameOrEmail: usernameOrEmail,
        password: password,
      });
      setLoading(false);
      return navigate('Main', {
        screen: 'ProfileSettings',
      });
    } catch (e) {
      signInValidationStore.setBackendError(e);
    }
    return setLoading(false);
  };

  const updateUsernameOrEmail = ({ target }: any) => {
    setUsernameOrEmail(target.value);
    signInValidationStore.validateUsernameOrEmail(target.value);
  };

  const updatePassword = ({ target }: any) => {
    setPassword(target.value);
    signInValidationStore.validatePassword(target.value);
  };

  return (
    <BackgroundImage authBackground={true}>
      <View style={styles.inputContainer}>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Username or email address"
            autoCorrect={false}
            style={styles.input}
            autoFocus={true}
            placeholderTextColor="white"
            value={usernameOrEmail}
            onChange={updateUsernameOrEmail}
          />
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
        </View>
        <View style={styles.errorContainer}>
          <Text
            style={[
              styles.error,
              { opacity: signInValidationStore.error ? 1 : 0 },
            ]}
          >
            {signInValidationStore.error}
          </Text>
        </View>
        <TouchableHighlight
          style={[
            styles.joinBtn,
            { opacity: signInValidationStore.validForm ? 1 : 0.5 },
          ]}
          onPress={signIn}
          underlayColor={Colors.underlayColor}
          disabled={!signInValidationStore.validForm}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              style={styles.loadingIndicator}
              color={Colors.white}
            />
          ) : (
            <Text style={styles.joinTextBtn}>Log In</Text>
          )}
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.forgotPass}
          onPress={() => navigate('ResetPassword')}
          activeOpacity={0.8}
        >
          <Text style={styles.forgotPassText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
});

SignIn.navigationOptions = ({ navigation }) => ({
  title: 'Log In',
  headerTitleStyle: { color: Colors.white },
  headerStyle: {
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 0,
  },
  headerLeft: () => (
    <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
  ),
});

export default SignIn;

let styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignSelf: 'center',
    marginTop: 0,
    maxWidth: 380,
    width: '100%',
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
  errorContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  error: {
    color: Colors.errorBackground,
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
