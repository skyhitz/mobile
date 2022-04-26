import * as Linking from 'expo-linking';

const config = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      WebApp: '',
      AuthScreen: 'accounts',
      SignUp: 'accounts/sign-up',
      SignIn: 'accounts/sign-in',
      Privacy: 'accounts/privacy',
      Terms: 'accounts/terms',
      Main: {
        path: 'dashboard',
        screens: {
          SearchNavigator: {
            path: 'search',
            screens: {
              path: '',
              Search: {
                screens: {
                  Beats: 'beats',
                  Beatmakers: 'beatmakers',
                },
              },
            },
          },
          ChartsView: 'charts',
          ProfileSettings: {
            path: 'profile',
            screens: {
              ProfileSettingsScreen: '',
              LikesScreen: 'likes',
              CollectionScreen: 'collection',
              MintNFT: 'mint-nft',
            },
          },
        },
      },
      EditProfileModal: 'edit-profile',
      EntryOptionsModal: 'options',
      PricingOptionsModal: 'pricing-options',
      PaymentModal: 'payment',
      LowBalanceModal: 'low-balance',
    },
  },
};

export default config;
