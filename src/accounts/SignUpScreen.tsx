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
import { observer } from 'mobx-react';
import Colors from 'app/src/constants/Colors';
import { useLinkTo } from '@react-navigation/native';
import ValidationIcon from 'app/src/accounts/ValidationIcon';
import { Stores } from 'app/src/functions/Stores';
import BackgroundImage from 'app/src/ui/BackgroundImage';
import WalletConnectBtn from 'app/src/accounts/WalletConnectBtn';
import tw from 'twin.macro';
import { SessionStore } from '../stores/session';

export default observer(() => {
  const { signUpValidationStore, walletConnectStore } = Stores();
  const { signUp } = SessionStore();

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const linkTo = useLinkTo();

  const updateUsername = ({ target }: any) => {
    setUsername(target.value);
    signUpValidationStore.validateUsername(target.value);
  };

  const updateDisplayName = ({ target }: any) => {
    setDisplayName(target.value);
    signUpValidationStore.validateDisplayName(target.value);
  };

  const updateEmail = ({ target }: any) => {
    setEmail(target.value);
    signUpValidationStore.validateEmail(target.value);
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
        signUpValidationStore.setBackendError(e);
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
          <ValidationIcon isFieldValid={signUpValidationStore.usernameValid} />
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
          <ValidationIcon isFieldValid={signUpValidationStore.emailValid} />
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
          onPress={handleSignUp}
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
