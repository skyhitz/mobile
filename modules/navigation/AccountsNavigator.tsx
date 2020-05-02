import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from 'app/modules/accounts/AuthScreen';
import SignUpScreen from 'app/modules/accounts/SignUpScreen';
import SignInScreen from 'app/modules/accounts/SignInScreen';
import ResetPasswordScreen from 'app/modules/accounts/ResetPasswordScreen';
import UpdatePasswordScreen from 'app/modules/accounts/UpdatePasswordScreen';
import { Platform } from 'react-native';
import WebApp from '../marketing/web/Home';

const AccountsStack = createStackNavigator();

const AccountsStackNavigator = () => {
  return (
    <AccountsStack.Navigator>
      {Platform.OS === 'web' ? (
        <AccountsStack.Screen
          name="WebApp"
          component={WebApp}
          options={{ headerShown: false }}
        />
      ) : (
        <AccountsStack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      )}
      <AccountsStack.Screen name="SignUp" component={SignUpScreen} />
      <AccountsStack.Screen name="SignIn" component={SignInScreen} />
      <AccountsStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
      <AccountsStack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
      />
    </AccountsStack.Navigator>
  );
};

export default AccountsStackNavigator;
