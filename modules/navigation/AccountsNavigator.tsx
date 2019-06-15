import { createStackNavigator } from 'react-navigation';
import AuthScreen from 'app/modules/accounts/AuthScreen';
import SignUpScreen from 'app/modules/accounts/SignUpScreen';
import SignInScreen from 'app/modules/accounts/SignInScreen';
import ResetPasswordScreen from 'app/modules/accounts/ResetPasswordScreen';
import UpdatePasswordScreen from 'app/modules/accounts/UpdatePasswordScreen';
import ConfirmUsernameAndEmailScreen from 'app/modules/accounts/ConfirmUsernameAndEmailScreen';

const AccountsNavigator = createStackNavigator({
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  SignUp: {
    screen: SignUpScreen,
    path: `sign-up`,
  },
  SignIn: {
    screen: SignInScreen,
    path: `sign-in`,
  },
  ResetPassword: {
    screen: ResetPasswordScreen,
    path: `reset-password`,
  },
  UpdatePassword: {
    screen: UpdatePasswordScreen,
    path: `update-password/:token`,
  },
  ConfirmUsernameAndEmail: {
    screen: ConfirmUsernameAndEmailScreen,
    path: `confirm-username-and-email`,
  },
});

export default AccountsNavigator;
