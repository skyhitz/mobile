import React, { useState, useEffect } from 'react';
import { HeaderBackButton } from 'react-navigation-stack';
import { goBack, navigate } from 'app/modules/navigation/Navigator';
import { observer } from 'mobx-react';
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
import * as stores from 'app/skyhitz-common';
import { Stores } from 'app/functions/Stores';
import { NavStatelessComponent } from 'app/interfaces/Interfaces';
import { useMediaQuery } from 'react-responsive';
type Stores = typeof stores;

const SignIn: NavStatelessComponent = observer(props => {
  const { signInValidationStore, sessionStore } = Stores();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (isDesktop && !props.navigation.getParam('web')) {
      props.navigation.setParams({ web: true });
    }
  });

  const signIn = async () => {
    setLoading(true);
    try {
      await sessionStore.signIn({
        usernameOrEmail: usernameOrEmail,
        password: password,
      });
      setLoading(false);
      return navigate('ProfileSettings');
    } catch (e) {
      signInValidationStore.setBackendError(e);
    }
    return setLoading(false);
  };

  const updatePassword = (text: any) => {
    setPassword(text);
    signInValidationStore.validatePassword(password);
  };

  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
      }}
      resizeMode="cover"
      source={AuthBackground2}
    >
      <View
        style={[
          styles.errorContainer,
          { opacity: signInValidationStore.error ? 1 : 0 },
        ]}
      >
        <Text style={styles.error}>{signInValidationStore.error}</Text>
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
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
            onBlur={() =>
              signInValidationStore.validateUsernameOrEmail(usernameOrEmail)
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
            value={password}
            onChangeText={updatePassword}
            onBlur={() => signInValidationStore.validatePassword(password)}
          />
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
            <Text style={styles.joinTextBtn}>LOG IN</Text>
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
    </ImageBackground>
  );
});

SignIn.navigationOptions = ({ navigation }) => ({
  title: 'Log In',
  headerTitleStyle: { color: Colors.white },
  headerStyle: {
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 0,
  },
  headerShown: navigation.state.params ? !navigation.state.params.web : true,
  headerLeft: () => (
    <HeaderBackButton tintColor={Colors.white} onPress={() => goBack()} />
  ),
});

export default SignIn;

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
