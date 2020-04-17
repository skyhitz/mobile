import React, { useState, useEffect } from 'react';
import { HeaderBackButton } from 'react-navigation-stack';
import { observer } from 'mobx-react';
import Colors from 'app/constants/Colors';
import { AuthBackground2 } from 'app/assets/images/Images';
import { goBack } from 'app/modules/navigation/Navigator';
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
import { NavStatelessComponent } from 'app/interfaces/Interfaces';
import { Stores } from 'app/functions/Stores';
import { useMediaQuery } from 'react-responsive';
import { useNavigation } from 'react-navigation-hooks';

const UpdatePassword: NavStatelessComponent = observer(props => {
  const { updatePasswordValidationStore, sessionStore } = Stores();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { token } = props.navigation.state.params;
  const { navigate } = useNavigation();

  useEffect(() => {
    if (isDesktop && !props.navigation.getParam('web')) {
      props.navigation.setParams({ web: true });
    }
  });

  const updatePasswordText = (text: any) => {
    setPassword(text);
    updatePasswordValidationStore.validatePassword(password);
  };

  const updatePasswordConfirmation = (text: any) => {
    setPasswordConfirmation(text);
    updatePasswordValidationStore.validatePasswordConfirmation(text, password);
  };

  const updatePassword = async () => {
    setLoading(true);
    try {
      await sessionStore.updatePassword(token, password);
      setLoading(false);
      return navigate('ProfileSettings');
    } catch (e) {
      updatePasswordValidationStore.setBackendError(e);
    }
    setLoading(false);
  };

  return (
    <ImageBackground style={styles.background} source={AuthBackground2}>
      <View style={styles.inputContainer}>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="New Password"
            autoCorrect={false}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="white"
            value={password}
            onChangeText={updatePasswordText}
          />
          <ValidationIcon
            isFieldValid={updatePasswordValidationStore.passwordValid}
          />
        </View>
        <View style={styles.field}>
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Confirm New Password"
            autoCorrect={false}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="white"
            value={passwordConfirmation}
            onChangeText={updatePasswordConfirmation}
          />
          <ValidationIcon
            isFieldValid={
              updatePasswordValidationStore.passwordConfirmationValid
            }
          />
        </View>
        <View
          style={[
            styles.errorContainer,
            { opacity: updatePasswordValidationStore.error ? 1 : 0 },
          ]}
        >
          <Text style={styles.error}>
            {updatePasswordValidationStore.error}
          </Text>
        </View>
        <TouchableHighlight
          style={[
            styles.joinBtn,
            { opacity: updatePasswordValidationStore.validForm ? 1 : 0.5 },
          ]}
          onPress={updatePassword}
          underlayColor={Colors.underlayColor}
          disabled={!updatePasswordValidationStore.validForm}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              style={styles.loadingIndicator}
              color={Colors.white}
            />
          ) : (
            <Text style={styles.joinTextBtn}>Update Password</Text>
          )}
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
});

UpdatePassword.navigationOptions = ({ navigation }) => ({
  title: 'Update Password',
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

export default UpdatePassword;

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
    paddingRight: 10,
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
