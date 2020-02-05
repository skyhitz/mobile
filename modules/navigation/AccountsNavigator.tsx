import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from 'app/modules/accounts/AuthScreen';
import SignUpScreen from 'app/modules/accounts/SignUpScreen';
import SignInScreen from 'app/modules/accounts/SignInScreen';
import ResetPasswordScreen from 'app/modules/accounts/ResetPasswordScreen';
import UpdatePasswordScreen from 'app/modules/accounts/UpdatePasswordScreen';
import ConfirmUsernameAndEmailScreen from 'app/modules/accounts/ConfirmUsernameAndEmailScreen';

const AccountsNavigator = createStackNavigator({
  AuthScreen: {
    screen: AuthScreen as any,
    navigationOptions: {
      headerShown: false,
      gestureEnabled: false,
    },
    path: `home`
  },
  SignUp: {
    screen: SignUpScreen as any,
    path: `sign-up`,
  },
  SignIn: {
    screen: SignInScreen as any,
    path: `sign-in`,
  },
  ResetPassword: {
    screen: ResetPasswordScreen as any,
    path: `reset-password`,
  },
  UpdatePassword: {
    screen: UpdatePasswordScreen as any,
    path: `update-password/:token`,
  },
  ConfirmUsernameAndEmail: {
    screen: ConfirmUsernameAndEmailScreen as any,
    path: `confirm-username-and-email`,
  },
});

export default AccountsNavigator;
