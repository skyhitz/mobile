import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useMediaQuery } from 'react-responsive';
import Colors from 'app/src/constants/Colors';
import { Platform } from 'react-native';
import CancelEditBtn from '../ui/CancelEditBtn';
import DoneEditBtn from '../ui/DoneEditBtn';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../atoms/atoms';
import SignInScreen from 'app/src/accounts/SignInScreen';
import MainTabNavigator from 'app/src/navigation/MainTabNavigator';
import EditProfileModal from 'app/src/profile/EditProfileScreen';
import EntryOptionsModal from 'app/src/search/EntryOptionsModal';
import PricingOptionsModal from 'app/src/search/PricingOptionsModal';
import PaymentModal from 'app/src/profile/PaymentModal';
import LowBalanceModal from 'app/src/profile/LowBalanceModal';
import WithdrawalModal from 'app/src/profile/WithdrawalModal';
import BuyOptionsModal from 'app/src/ui/BuyOptionsModal';
import AuthScreen from 'app/src/accounts/AuthScreen';
import SignUpScreen from 'app/src/accounts/SignUpScreen';
import WebApp from 'app/src/marketing/web/Home';
import Privacy from 'app/src/marketing/web/Privacy';
import Terms from 'app/src/marketing/web/Terms';

const modalOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.1, 0.3, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp',
      }),
    },
  }),
};

export const AppStack = createStackNavigator();

const appTitle = 'Skyhitz - Music NFTs on Stellar';

export function AppStackNavigator() {
  const user = useRecoilValue(userAtom);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const headerShown = !isDesktop;
  return (
    <AppStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <AppStack.Group>
        {user ? (
          <>
            <AppStack.Screen
              name="Main"
              getComponent={() => MainTabNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            {Platform.OS === 'web' ? (
              <AppStack.Screen
                name="WebApp"
                getComponent={() => WebApp}
                options={{
                  headerShown: false,
                  title: appTitle,
                }}
              />
            ) : (
              <AppStack.Screen
                name="AuthScreen"
                getComponent={() => AuthScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  title: appTitle,
                }}
              />
            )}
            <AppStack.Screen
              name="SignUp"
              getComponent={() => SignUpScreen}
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
            <AppStack.Screen
              name="SignIn"
              getComponent={() => SignInScreen}
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
            <AppStack.Screen
              name="Privacy"
              getComponent={() => Privacy}
              options={{
                headerShown: headerShown,
                headerTitleStyle: { color: Colors.white },
                headerTintColor: Colors.white,
                title: 'Privacy',
                headerTransparent: true,
                headerStyle: {
                  borderBottomWidth: 0,
                },
              }}
            />
            <AppStack.Screen
              name="Terms"
              getComponent={() => Terms}
              options={{
                headerShown: headerShown,
                headerTitleStyle: { color: Colors.white },
                headerTintColor: Colors.white,
                title: 'Terms',
                headerTransparent: true,
                headerStyle: {
                  borderBottomWidth: 0,
                },
              }}
            />
          </>
        )}
      </AppStack.Group>
      <AppStack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <AppStack.Screen
          name="EditProfileModal"
          getComponent={() => EditProfileModal}
          options={{
            gestureEnabled: false,
            title: 'Edit Profile',
            headerTitleStyle: { color: Colors.white },
            headerStyle: {
              backgroundColor: Colors.headerBackground,
              borderBottomWidth: 0,
              shadowColor: 'transparent',
            },
            headerLeft: () => <CancelEditBtn />,
            headerRight: () => <DoneEditBtn />,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <AppStack.Screen
          name="PaymentModal"
          getComponent={() => PaymentModal}
          options={modalOptions}
        />
        <AppStack.Screen
          name="WithdrawalModal"
          getComponent={() => WithdrawalModal}
          options={modalOptions}
        />
        <AppStack.Screen
          name="BuyOptionsModal"
          getComponent={() => BuyOptionsModal}
          options={modalOptions}
        />
        <AppStack.Screen
          name="EntryOptionsModal"
          getComponent={() => EntryOptionsModal}
          options={modalOptions}
        />
        <AppStack.Screen
          name="PricingOptionsModal"
          getComponent={() => PricingOptionsModal}
          options={modalOptions}
        />
        <AppStack.Screen
          name="LowBalanceModal"
          getComponent={() => LowBalanceModal}
          options={modalOptions}
        />
      </AppStack.Group>
    </AppStack.Navigator>
  );
}
