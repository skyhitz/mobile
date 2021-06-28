import React, { useState, useEffect, lazy } from 'react';
import { StatusBar, Platform } from 'react-native';
import { observer } from 'mobx-react';
import { useMediaQuery } from 'react-responsive';
import { Stores } from 'app/functions/Stores';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import CancelEditBtn from 'app/modules/ui/CancelEditBtn';
import DoneEditBtn from 'app/modules/ui/DoneEditBtn';
import Colors from 'app/constants/Colors';
import LinkingConfiguration from './LinkingConfiguration';
import LoadingScreen from 'app/modules/accounts/LoadingScreen';

const MainTabNavigator = lazy(() =>
  import('app/modules/navigation/MainTabNavigator')
);
const EditProfileScreen = lazy(() =>
  import('app/modules/profile/EditProfileScreen')
);
const EntryOptionsModal = lazy(() =>
  import('app/modules/search/EntryOptionsModal')
);
const PricingOptionsModal = lazy(() =>
  import('app/modules/search/PricingOptionsModal')
);
const UploadMusicModal = lazy(() =>
  import('app/modules/profile/UploadMusicModal')
);
const PaymentModal = lazy(() => import('app/modules/profile/PaymentModal'));
const WithdrawalModal = lazy(() =>
  import('app/modules/profile/WithdrawalModal')
);
const BuyOptionsModal = lazy(() => import('app/modules/ui/BuyOptionsModal'));
const AuthScreen = lazy(() => import('app/modules/accounts/AuthScreen'));
const SignUpScreen = lazy(() => import('app/modules/accounts/SignUpScreen'));
const SignInScreen = lazy(() => import('app/modules/accounts/SignInScreen'));
const WebApp = lazy(() => import('app/modules/marketing/web/Home'));
const Privacy = lazy(() => import('app/modules/marketing/web/Privacy'));
const Terms = lazy(() => import('app/modules/marketing/web/Terms'));

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: Colors.darkBlue,
    background: Colors.darkBlue,
  },
};

const AppStack = createStackNavigator();

export default observer(() => {
  const [loaded, setLoaded] = useState(false);
  const { sessionStore } = Stores();

  StatusBar.setBarStyle('light-content');

  const loadAll = async () => {
    await sessionStore.loadSession();
    setLoaded(true);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const [headerShown, setHeaderShown] = useState(true);
  const isDesktop = useMediaQuery({ minWidth: 768 });
  useEffect(() => {
    if (isDesktop) {
      setHeaderShown(false);
    }
  }, []);

  if (loaded) {
    return (
      <NavigationContainer linking={LinkingConfiguration} theme={Theme}>
        <AppStack.Navigator mode="modal">
          {sessionStore.user ? (
            <>
              <AppStack.Screen
                name="Main"
                component={MainTabNavigator}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              {Platform.OS === 'web' ? (
                <AppStack.Screen
                  name="WebApp"
                  component={WebApp}
                  options={{ headerShown: false }}
                />
              ) : (
                <AppStack.Screen
                  name="AuthScreen"
                  component={AuthScreen}
                  options={{ headerShown: false, gestureEnabled: false }}
                />
              )}
              <AppStack.Screen
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
              <AppStack.Screen
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
              <AppStack.Screen
                name="Privacy"
                component={Privacy}
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
                component={Terms}
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
          <AppStack.Screen
            name="EditProfileModal"
            component={EditProfileScreen}
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
            }}
          />
          <AppStack.Screen
            name="UploadMusicModal"
            component={UploadMusicModal}
            options={{
              headerShown: false,
              gestureEnabled: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />

          <AppStack.Screen
            name="PaymentModal"
            component={PaymentModal}
            options={{
              headerShown: false,
              gestureEnabled: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <AppStack.Screen
            name="WithdrawalModal"
            component={WithdrawalModal}
            options={{
              headerShown: false,
              gestureEnabled: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <AppStack.Screen
            name="BuyOptionsModal"
            component={BuyOptionsModal}
            options={{
              headerShown: false,
              gestureEnabled: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <AppStack.Screen
            name="EntryOptionsModal"
            component={EntryOptionsModal}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
          <AppStack.Screen
            name="PricingOptionsModal"
            component={PricingOptionsModal}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
  return <LoadingScreen />;
});
