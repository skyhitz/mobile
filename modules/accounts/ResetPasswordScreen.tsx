import React, { useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import Colors from 'app/constants/Colors';
import { observer } from 'mobx-react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { NavStatelessComponent } from 'app/interfaces/Interfaces';
import { Stores } from 'app/functions/Stores';
import BackgroundImage from 'app/modules/ui/BackgroundImage';

const ResetPassword: NavStatelessComponent = observer((props) => {
  const { resetPasswordValidationStore, sessionStore } = Stores();
  const [email, setEmail] = useState('');
  const [buttonMessage, setButtonMessage] = useState('Send reset email');
  const [bottomCopy, setBottomCopy] = useState(
    "We'll send you an email to reset your password."
  );
  const [buttonColor, setButtonColor] = useState(Colors.lightBlueBtn);
  const [loading, setLoading] = useState(false);

  const updateEmail = ({ target }: any) => {
    setEmail(target.value);
    resetPasswordValidationStore.validateEmail(target.value);
  };

  const sendResetEmail = async () => {
    setLoading(true);
    try {
      await sessionStore.sendResetEmail(email);
      setButtonMessage('Reset email sent');
      setBottomCopy(
        'Check your email. We just sent you a link to reset your password.'
      );
      setButtonColor(Colors.valid);
    } catch (e) {
      resetPasswordValidationStore.setBackendError(e);
    }
    setLoading(false);
  };

  return (
    <BackgroundImage authBackground={true}>
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
            placeholderTextColor="white"
            value={email}
            onChange={updateEmail}
            maxLength={34}
          />
        </View>
        <View
          style={[
            styles.errorContainer,
            { opacity: resetPasswordValidationStore.error ? 1 : 0 },
          ]}
        >
          <Text style={styles.error}>{resetPasswordValidationStore.error}</Text>
        </View>
        <TouchableHighlight
          style={[
            styles.joinBtn,
            { opacity: resetPasswordValidationStore.validForm ? 1 : 0.5 },
            { backgroundColor: buttonColor },
          ]}
          onPress={sendResetEmail}
          underlayColor={Colors.underlayColor}
          disabled={!resetPasswordValidationStore.validForm}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              style={styles.loadingIndicator}
              color={Colors.white}
            />
          ) : (
            <Text style={styles.joinTextBtn}>{buttonMessage}</Text>
          )}
        </TouchableHighlight>
        <Text style={styles.forgotPassText}>{bottomCopy}</Text>
      </View>
    </BackgroundImage>
  );
});

ResetPassword.navigationOptions = ({ navigation }) => ({
  title: 'Forgot Password',
  headerTitleStyle: { color: Colors.white },
  headerStyle: {
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 0,
  },
  headerLeft: () => (
    <HeaderBackButton
      tintColor={Colors.white}
      onPress={() => navigation.goBack()}
    />
  ),
});

export default ResetPassword;

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
