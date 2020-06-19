import { NavigationActions, StackActions } from '@react-navigation/compat';

export const instance: any = {};

export function goBack() {
  if (instance.navigator) {
    let action = NavigationActions.back({});
    instance.navigator.dispatch(action);
  }
}
