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
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import ValidationIcon from 'app/modules/accounts/ValidationIcon';
import { Stores } from 'app/functions/Stores';
import BackgroundImage from 'app/modules/ui/BackgroundImage';

export default observer(() => {
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
      return navigate('Main', {
        screen: 'ProfileSettings',
      });
    } catch (e) {
      signUpValidationStore.setBackendError(e);
    }
    return setLoading(false);
  };

  const onSubmit = (e) => {
    if (e.nativeEvent.key == 'Enter') {
      signUp();
    }
  };

  return (
    <BackgroundImage authBackground={true}>
      <View style={styles.inputContainer}>
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
          />
          <ValidationIcon isFieldValid={signUpValidationStore.emailValid} />
        </View>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Password"
            autoCorrect={false}
            style={[
              styles.input,
              Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
            ]}
            secureTextEntry={true}
            placeholderTextColor="white"
            value={password}
            onChange={updatePassword}
            onChangeText={(value) =>
              updatePassword({ target: { value: value } })
            }
            onKeyPress={onSubmit}
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
    </BackgroundImage>
  );
});

var styles = StyleSheet.create({
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
