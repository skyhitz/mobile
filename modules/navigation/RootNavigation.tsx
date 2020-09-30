import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import MainTabNavigator from 'app/modules/navigation/MainTabNavigator';
import AccountsNavigator from 'app/modules/navigation/AccountsNavigator';
import EditProfileScreen from 'app/modules/profile/EditProfileScreen';
import EntryOptionsModal from 'app/modules/search/EntryOptionsModal';
import PricingOptionsModal from 'app/modules/search/PricingOptionsModal';
import UploadMusicModal from 'app/modules/profile/UploadMusicModal';
import PaymentModal from 'app/modules/profile/PaymentModal';
import WithdrawalModal from 'app/modules/profile/WithdrawalModal';
import BuyOptionsModal from 'app/modules/ui/BuyOptionsModal';
import LoadingScreen from 'app/modules/accounts/LoadingScreen';
import { Stores } from 'app/functions/Stores';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import CancelEditBtn from 'app/modules/ui/CancelEditBtn';
import DoneEditBtn from 'app/modules/ui/DoneEditBtn';
import Colors from 'app/constants/Colors';
import LinkingConfiguration from './LinkingConfiguration';

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

  if (loaded) {
    return (
      <NavigationContainer linking={LinkingConfiguration} theme={Theme}>
        {sessionStore.user ? (
          <AppStack.Navigator mode="modal">
            <AppStack.Screen
              name="Main"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
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
        ) : (
          <AccountsNavigator />
        )}
      </NavigationContainer>
    );
  }
  return <LoadingScreen />;
});
