import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    WebApp: '',
    SignUp: 'accounts/sign-up',
    SignIn: 'accounts/sign-in',
    ResetPassword: 'accounts/reset-password',
    UpdatePassword: 'accounts/update-password',
    Privacy: 'accounts/privacy',
    Terms: 'accounts/terms',
    Main: {
      screens: {
        SearchNavigator: {
          screens: {
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
          screens: {
            ProfileSettingsScreen: 'profile',
            LikesScreen: 'likes',
            MyMusicScreen: 'my-music',
          },
        },
      },
    },
    EditProfileModal: 'edit-profile',
    UploadMusicModal: 'upload',
    EntryOptionsModal: 'options',
    PaymentModal: 'payment',
  },
};
