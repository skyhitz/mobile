import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Stores } from 'app/functions/Stores';
import { useLinkTo } from '@react-navigation/native';
import BackgroundImage from 'app/modules/ui/BackgroundImage';
import cursorPointer from 'app/constants/CursorPointer';
import { openEmail } from './OpenEmail';
import * as Linking from 'expo-linking';
import { Config } from 'app/skyhitz-common/src/config';
import * as Device from 'expo-device';
import WalletConnectBtn from 'app/modules/accounts/WalletConnectBtn';
import tw from 'twin.macro';

export default observer(({ route, navigation }) => {
  const { signInValidationStore, sessionStore } = Stores();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailLink, setShowEmailLink] = useState(false);
  const { token, uid } = route.params || {};
  const linkTo = useLinkTo();

  const signIn = async () => {
    setLoading(true);
    try {
      await sessionStore.requestToken(usernameOrEmail, '');
      // check your email to access your account
      setLoading(false);
      setShowEmailLink(true);
      return;
    } catch (e) {
      signInValidationStore.setBackendError(e as any);
    }
    return setLoading(false);
  };

  const signInWithXDR = async (xdr) => {
    setLoading(true);
    try {
      await sessionStore.signIn(undefined, undefined, xdr);
      // check your email to access your account
      setLoading(false);
      return;
    } catch (e) {
      signInValidationStore.setBackendError(e as any);
      linkTo('/accounts/sign-up');
    }
    return setLoading(false);
  };

  const handleOpenEmail = () => {
    openEmail();
  };

  const updateUsernameOrEmail = ({ target }: any) => {
    setUsernameOrEmail(target.value);
    signInValidationStore.validateUsernameOrEmail(target.value);
  };

  const onSubmit = (e) => {
    if (e.nativeEvent.key == 'Enter') {
      signIn();
    }
  };

  const handleAuth = async () => {
    const device = await Device.getDeviceTypeAsync();

    if (
      Platform.OS === 'web' &&
      Device.osName === 'Android' &&
      (device === Device.DeviceType.PHONE ||
        device === Device.DeviceType.TABLET)
    ) {
      await Linking.openURL(
        `${Config.SCHEMA}accounts/sign-in?token=${token}&uid=${uid}`
      );
      return;
    }
    const res = await sessionStore.signIn(token, uid);
    if (res) {
      return linkTo('/');
    }

    navigation.setParams({ token: undefined, uid: undefined });
    return;
  };

  useEffect(() => {
    // prevent bug where deep links don't handle auth even if token and uid are set
    if (token && uid) {
      handleAuth();
    }
  }, [token, uid]);

  return (
    <BackgroundImage authBackground={true}>
      {token && uid ? (
        <View style={styles.inputContainer}>
          <View style={styles.field}>
            <Text style={styles.signingIn}>Authenticating...</Text>
          </View>
        </View>
      ) : showEmailLink ? (
        <View style={styles.inputContainer}>
          <View style={styles.field}>
            <Text style={styles.signingIn}>
              We sent you an email to access your account!
            </Text>
          </View>

          <TouchableHighlight
            style={[styles.joinBtn]}
            onPress={handleOpenEmail}
            underlayColor={Colors.underlayColor}
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                style={styles.loadingIndicator}
                color={Colors.white}
              />
            ) : (
              <Text style={[styles.joinTextBtn, cursorPointer]}>
                Open Email
              </Text>
            )}
          </TouchableHighlight>
        </View>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <WalletConnectBtn signInWithXDR={signInWithXDR} />
            <View style={tw`flex-row my-8 justify-center items-center`}>
              <View style={styles.line} />
              <Text style={tw`text-white px-5`}>or</Text>
              <View style={styles.line} />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.field}>
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Email address"
                autoCorrect={false}
                style={[
                  styles.input,
                  Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
                ]}
                autoFocus={true}
                placeholderTextColor="white"
                value={usernameOrEmail}
                onChange={updateUsernameOrEmail}
                onChangeText={(value) =>
                  updateUsernameOrEmail({ target: { value: value } })
                }
                onKeyPress={onSubmit}
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
                <Text style={[styles.joinTextBtn, cursorPointer]}>Log In</Text>
              )}
            </TouchableHighlight>
          </View>
        </>
      )}
    </BackgroundImage>
  );
});

let styles = StyleSheet.create({
  line: {
    flexGrow: 1,
    height: 1,
    backgroundColor: Colors.white,
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
    width: '100%',
  },
  signingIn: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 16,
    padding: 10,
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
