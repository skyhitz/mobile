import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from 'app/modules/accounts/AuthScreen';
import SignUpScreen from 'app/modules/accounts/SignUpScreen';
import SignInScreen from 'app/modules/accounts/SignInScreen';
import ResetPasswordScreen from 'app/modules/accounts/ResetPasswordScreen';
import UpdatePasswordScreen from 'app/modules/accounts/UpdatePasswordScreen';

const AccountsStack = createStackNavigator();

const AccountsStackNavigator = () => {
  return (
    <AccountsStack.Navigator>
      <AccountsStack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <AccountsStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AccountsStack.Screen name="SignInScreen" component={SignInScreen} />
      <AccountsStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <AccountsStack.Screen
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
      />
    </AccountsStack.Navigator>
  );
};

export default AccountsStackNavigator;
