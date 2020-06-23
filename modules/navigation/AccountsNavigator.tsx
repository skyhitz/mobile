import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from 'app/modules/accounts/AuthScreen';
import SignUpScreen from 'app/modules/accounts/SignUpScreen';
import SignInScreen from 'app/modules/accounts/SignInScreen';
import ResetPasswordScreen from 'app/modules/accounts/ResetPasswordScreen';
import UpdatePasswordScreen from 'app/modules/accounts/UpdatePasswordScreen';
import { Platform } from 'react-native';
import WebApp from '../marketing/web/Home';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Colors from 'app/constants/Colors';

const AccountsStack = createStackNavigator();

export default () => {
  const [headerShown, setHeaderShown] = useState(true);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  useEffect(() => {
    if (isDesktop) {
      setHeaderShown(false);
    }
  }, []);
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
      <AccountsStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: headerShown,
          headerTitleStyle: { color: Colors.white },
          headerTintColor: Colors.white,
          title: 'Sign Up',
          headerTransparent: true,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      />
      <AccountsStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: headerShown,
          headerTitleStyle: { color: Colors.white },
          headerTintColor: Colors.white,
          title: 'Log In',
          headerTransparent: true,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      />
      <AccountsStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          headerShown: headerShown,
          headerTitleStyle: { color: Colors.white },
          headerTintColor: Colors.white,
          title: 'Reset Password',
          headerTransparent: true,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      />
      <AccountsStack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
        options={{
          headerShown: headerShown,
          headerTitleStyle: { color: Colors.white },
          headerTintColor: Colors.white,
          title: 'Update Password',
          headerTransparent: true,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      />
    </AccountsStack.Navigator>
  );
};
