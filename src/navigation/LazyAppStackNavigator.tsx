import React, { lazy } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useMediaQuery } from 'react-responsive';
import { SuspenseLoading } from './SuspenseLoading';
import Colors from 'app/src/constants/Colors';
import { Platform } from 'react-native';
import CancelEditBtn from '../ui/CancelEditBtn';
import DoneEditBtn from '../ui/DoneEditBtn';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../atoms/atoms';

const MainTabNavigator = lazy(() =>
  import('app/src/navigation/MainTabNavigator')
);

const MainTabNavigatorSuspense = (props) => (
  <SuspenseLoading>
    <MainTabNavigator {...props} />
  </SuspenseLoading>
);

const EditProfileScreen = lazy(() =>
  import('app/src/profile/EditProfileScreen')
);

const EditProfileScreenSuspense = (props) => (
  <SuspenseLoading>
    <EditProfileScreen {...props} />
  </SuspenseLoading>
);
const EntryOptionsModal = lazy(() =>
  import('app/src/search/EntryOptionsModal')
);

const EntryOptionsModalSuspense = (props) => (
  <SuspenseLoading>
    <EntryOptionsModal {...props} />
  </SuspenseLoading>
);
const PricingOptionsModal = lazy(() =>
  import('app/src/search/PricingOptionsModal')
);
const PricingOptionsModalSuspense = (props) => (
  <SuspenseLoading>
    <PricingOptionsModal {...props} />
  </SuspenseLoading>
);

const PaymentModal = lazy(() => import('app/src/profile/PaymentModal'));
const PaymentModalSuspense = (props) => (
  <SuspenseLoading>
    <PaymentModal {...props} />
  </SuspenseLoading>
);

const LowBalanceModal = lazy(() => import('app/src/profile/LowBalanceModal'));
const LowBalanceModalSuspense = (props) => (
  <SuspenseLoading>
    <LowBalanceModal {...props} />
  </SuspenseLoading>
);

const WithdrawalModal = lazy(() => import('app/src/profile/WithdrawalModal'));
const WithdrawalModalSuspense = (props) => (
  <SuspenseLoading>
    <WithdrawalModal {...props} />
  </SuspenseLoading>
);
const BuyOptionsModal = lazy(() => import('app/src/ui/BuyOptionsModal'));
const BuyOptionsModalSuspense = (props) => (
  <SuspenseLoading>
    <BuyOptionsModal {...props} />
  </SuspenseLoading>
);
const AuthScreen = lazy(() => import('app/src/accounts/AuthScreen'));
const AuthScreenSuspense = (props) => (
  <SuspenseLoading>
    <AuthScreen {...props} />
  </SuspenseLoading>
);
const SignUpScreen = lazy(() => import('app/src/accounts/SignUpScreen'));
const SignUpScreenSuspense = (props) => (
  <SuspenseLoading>
    <SignUpScreen {...props} />
  </SuspenseLoading>
);
const SignInScreen = lazy(() => import('app/src/accounts/SignInScreen'));
const SignInScreenSuspense = (props) => (
  <SuspenseLoading>
    <SignInScreen {...props} />
  </SuspenseLoading>
);
const WebApp = lazy(() => import('app/src/marketing/web/Home'));
const WebAppSuspense = (props) => (
  <SuspenseLoading>
    <WebApp {...props} />
  </SuspenseLoading>
);
const Privacy = lazy(() => import('app/src/marketing/web/Privacy'));
const PrivacySuspense = (props) => (
  <SuspenseLoading>
    <Privacy {...props} />
  </SuspenseLoading>
);
const Terms = lazy(() => import('app/src/marketing/web/Terms'));
const TermsSuspense = (props) => (
  <SuspenseLoading>
    <Terms {...props} />
  </SuspenseLoading>
);

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

export function LazyAppStackNavigator() {
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
              getComponent={() => MainTabNavigatorSuspense}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            {Platform.OS === 'web' ? (
              <AppStack.Screen
                name="WebApp"
                getComponent={() => WebAppSuspense}
                options={{
                  headerShown: false,
                  title: appTitle,
                }}
              />
            ) : (
              <AppStack.Screen
                name="AuthScreen"
                getComponent={() => AuthScreenSuspense}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  title: appTitle,
                }}
              />
            )}
            <AppStack.Screen
              name="SignUp"
              getComponent={() => SignUpScreenSuspense}
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
              getComponent={() => SignInScreenSuspense}
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
              getComponent={() => PrivacySuspense}
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
              getComponent={() => TermsSuspense}
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
          getComponent={() => EditProfileScreenSuspense}
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
          getComponent={() => PaymentModalSuspense}
          options={modalOptions}
        />
        <AppStack.Screen
          name="WithdrawalModal"
          getComponent={() => WithdrawalModalSuspense}
          options={modalOptions}
        />
        <AppStack.Screen
          name="BuyOptionsModal"
          getComponent={() => BuyOptionsModalSuspense}
          options={modalOptions}
        />
        <AppStack.Screen
          name="EntryOptionsModal"
          getComponent={() => EntryOptionsModalSuspense}
          options={modalOptions}
        />
        <AppStack.Screen
          name="PricingOptionsModal"
          getComponent={() => PricingOptionsModalSuspense}
          options={modalOptions}
        />
        <AppStack.Screen
          name="LowBalanceModal"
          getComponent={() => LowBalanceModalSuspense}
          options={modalOptions}
        />
      </AppStack.Group>
    </AppStack.Navigator>
  );
}
