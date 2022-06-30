import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { observer } from 'mobx-react';
import Colors from 'app/src/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import ValidationIcon from 'app/src/accounts/ValidationIcon';
import { Stores } from 'app/src/functions/Stores';
import BackgroundImage from 'app/src/ui/BackgroundImage';
import WalletConnectBtn from 'app/src/accounts/WalletConnectBtn';
import tw from 'twin.macro';
import { SessionStore } from '../stores/session';
import {
  displayNameValidationErrorAtom,
  emailValidationErrorAtom,
  signUpBackendErrorAtom,
  usernameValidationErrorAtom,
  signUpValidAtom,
  signUpErrorAtom,
} from '../atoms/atoms';

export default observer(() => {
  const { walletConnectStore } = Stores();
  const { signUp } = SessionStore();
  const [usernameValidation, setUsernameValidation] = useRecoilState(
    usernameValidationErrorAtom
  );
  const [displayNameValidation, setDisplayNameValidation] = useRecoilState(
    displayNameValidationErrorAtom
  );
  const [emailValidation, setEmailValidation] = useRecoilState(
    emailValidationErrorAtom
  );

  const setBackendError = useSetRecoilState(signUpBackendErrorAtom);
  const validForm = useRecoilValue(signUpValidAtom);
  const error = useRecoilValue(signUpErrorAtom);

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const linkTo = useLinkTo();

  const validateUsername = (username: string) => {
    if (!username) {
      setUsernameValidation('Username is required.');
      return;
    }

    if (username.length < 2) {
      setUsernameValidation('Username is minimum 2 characters.');
      return;
    }

    let validRegex = /^[a-zA-Z0-9_-]+$/.test(username);
    if (!validRegex) {
      setUsernameValidation(
        'Usernames cannot have spaces or special characters.'
      );
      return;
    }

    setUsernameValidation('');
  };

  const updateUsername = ({ target }: any) => {
    setUsername(target.value);
    validateUsername(target.value);
  };

  const validateDisplayName = (displayName: string) => {
    if (!displayName) {
      setDisplayNameValidation('Display name is required.');
      return;
    }

    if (displayName.length < 2) {
      setDisplayNameValidation('Display name is minimum 2 characters.');
      return;
    }

    setDisplayNameValidation('');
  };

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailValidation('Email is required.');
      return;
    }

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setEmailValidation('Please enter a valid email.');
      return;
    }

    setEmailValidation('');
  };

  const updateDisplayName = ({ target }: any) => {
    setDisplayName(target.value);
    validateDisplayName(target.value);
  };

  const updateEmail = ({ target }: any) => {
    setEmail(target.value);
    validateEmail(target.value);
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUp({
        username: username,
        displayName: displayName,
        email: email,
        publicKey: walletConnectStore.publicKey,
      });
      setLoading(false);
      return linkTo('/');
    } catch (e) {
      if (typeof e === 'string') {
        setBackendError(e);
      }
    }
    return setLoading(false);
  };

  const onSubmit = (e) => {
    if (e.nativeEvent.key == 'Enter') {
      handleSignUp();
    }
  };

  return (
    <BackgroundImage authBackground={true}>
      <View style={styles.inputContainer}>
        <WalletConnectBtn />
        <View style={tw`flex my-8`}>
          <View style={styles.line} />
        </View>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Username"
            autoCorrect={false}
            autoFocus={true}
            style={[
              styles.input,
              Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
            ]}
            placeholderTextColor="white"
            value={username}
            onChange={updateUsername}
            maxLength={30}
          />
          <ValidationIcon isFieldValid={!usernameValidation} />
        </View>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Display Name"
            autoCorrect={false}
            style={[
              styles.input,
              Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
            ]}
            placeholderTextColor="white"
            value={displayName}
            onChange={updateDisplayName}
            onChangeText={(value) =>
              updateDisplayName({ target: { value: value } })
            }
            maxLength={30}
          />
          <ValidationIcon isFieldValid={!displayNameValidation} />
        </View>
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
            placeholderTextColor="white"
            value={email}
            onChange={updateEmail}
            onChangeText={(value) => updateEmail({ target: { value: value } })}
            maxLength={34}
            onKeyPress={onSubmit}
          />
          <ValidationIcon isFieldValid={!emailValidation} />
        </View>
        <View style={[styles.errorContainer, { opacity: error ? 1 : 0 }]}>
          <Text style={styles.error}>{error}</Text>
        </View>
        <TouchableHighlight
          style={[styles.joinBtn, { opacity: validForm ? 1 : 0.5 }]}
          onPress={handleSignUp}
          underlayColor={Colors.underlayColor}
          disabled={!validForm}
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
    </BackgroundImage>
  );
});

var styles = StyleSheet.create({
  line: {
    flexGrow: 1,
    height: 1,
    backgroundColor: Colors.white,
  },
  orDivider: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orText: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 16,
    padding: 10,
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
    height: 310,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.white,
    fontSize: 14,
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
